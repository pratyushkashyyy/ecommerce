from flask import Blueprint, jsonify, request, session, send_from_directory
from models import Product, Order, OrderItem
from admin_models import Admin, WebsiteSettings
from database import db
from functools import wraps
import secrets
import os
from werkzeug.utils import secure_filename
from PIL import Image

admin_api = Blueprint('admin_api', __name__)

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads/products'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Simple session-based authentication
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Authentication Routes
@admin_api.route('/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    admin = Admin.query.filter_by(username=username).first()
    
    if admin and admin.check_password(password):
        session['admin_id'] = admin.id
        session['admin_username'] = admin.username
        return jsonify({
            'message': 'Login successful',
            'admin': admin.to_dict()
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

@admin_api.route('/logout', methods=['POST'])
@admin_required
def admin_logout():
    session.pop('admin_id', None)
    session.pop('admin_username', None)
    return jsonify({'message': 'Logout successful'}), 200

@admin_api.route('/check-auth', methods=['GET'])
def check_auth():
    if 'admin_id' in session:
        admin = Admin.query.get(session['admin_id'])
        if admin:
            return jsonify({
                'authenticated': True,
                'admin': admin.to_dict()
            }), 200
    return jsonify({'authenticated': False}), 200

# Image Upload Route
@admin_api.route('/upload-image', methods=['POST'])
@admin_required
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Allowed: PNG, JPG, JPEG, GIF, WEBP'}), 400
    
    try:
        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({'error': 'File too large. Maximum size is 5MB'}), 400
        
        # Generate secure filename
        original_filename = secure_filename(file.filename)
        file_extension = original_filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{secrets.token_hex(16)}.{file_extension}"
        
        # Create upload directory if it doesn't exist
        upload_path = os.path.join(os.path.dirname(__file__), UPLOAD_FOLDER)
        os.makedirs(upload_path, exist_ok=True)
        
        # Save file
        file_path = os.path.join(upload_path, unique_filename)
        file.save(file_path)
        
        # Optimize image
        try:
            img = Image.open(file_path)
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            # Resize if too large (max 1200px width)
            max_width = 1200
            if img.width > max_width:
                ratio = max_width / img.width
                new_size = (max_width, int(img.height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            # Save optimized image
            img.save(file_path, optimize=True, quality=85)
        except Exception as e:
            print(f"Image optimization error: {e}")
        
        # Return URL
        image_url = f"/uploads/products/{unique_filename}"
        
        return jsonify({
            'message': 'Image uploaded successfully',
            'image_url': image_url,
            'filename': unique_filename
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500

# Product Management Routes
@admin_api.route('/products', methods=['GET'])
@admin_required
def get_all_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@admin_api.route('/products', methods=['POST'])
@admin_required
def create_product():
    data = request.json
    
    try:
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=float(data['price']),
            image_url=data['image_url'],
            category=data['category'],
            stock=int(data.get('stock', 0))
        )
        
        db.session.add(new_product)
        db.session.commit()
        
        return jsonify({
            'message': 'Product created successfully',
            'product': new_product.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_api.route('/products/<int:id>', methods=['PUT'])
@admin_required
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.json
    
    try:
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = float(data.get('price', product.price))
        product.image_url = data.get('image_url', product.image_url)
        product.category = data.get('category', product.category)
        product.stock = int(data.get('stock', product.stock))
        
        db.session.commit()
        
        return jsonify({
            'message': 'Product updated successfully',
            'product': product.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_api.route('/products/<int:id>', methods=['DELETE'])
@admin_required
def delete_product(id):
    product = Product.query.get_or_404(id)
    
    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# Order Management Routes
@admin_api.route('/orders', methods=['GET'])
@admin_required
def get_all_orders():
    orders = Order.query.order_by(Order.id.desc()).all()
    orders_data = []
    
    for order in orders:
        order_dict = {
            'id': order.id,
            'customer_name': order.customer_name,
            'email': order.email,
            'phone': order.phone,
            'address': order.address,
            'city': order.city,
            'zip_code': order.zip_code,
            'total_price': order.total_price,
            'status': order.status,
            'items': []
        }
        
        for item in order.items:
            product = Product.query.get(item.product_id)
            order_dict['items'].append({
                'id': item.id,
                'product_name': product.name if product else 'Unknown',
                'quantity': item.quantity,
                'price': item.price
            })
        
        orders_data.append(order_dict)
    
    return jsonify(orders_data), 200

@admin_api.route('/orders/<int:id>/status', methods=['PUT'])
@admin_required
def update_order_status(id):
    order = Order.query.get_or_404(id)
    data = request.json
    
    try:
        order.status = data.get('status', order.status)
        db.session.commit()
        
        return jsonify({
            'message': 'Order status updated successfully',
            'order_id': order.id,
            'status': order.status
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# Website Settings Routes
@admin_api.route('/settings', methods=['GET'])
@admin_required
def get_settings():
    settings = WebsiteSettings.query.all()
    settings_dict = {setting.key: setting.value for setting in settings}
    return jsonify(settings_dict), 200

@admin_api.route('/settings', methods=['PUT'])
@admin_required
def update_settings():
    data = request.json
    
    try:
        for key, value in data.items():
            setting = WebsiteSettings.query.filter_by(key=key).first()
            if setting:
                setting.value = value
            else:
                new_setting = WebsiteSettings(key=key, value=value)
                db.session.add(new_setting)
        
        db.session.commit()
        return jsonify({'message': 'Settings updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# Dashboard Statistics
@admin_api.route('/dashboard/stats', methods=['GET'])
@admin_required
def get_dashboard_stats():
    total_products = Product.query.count()
    total_orders = Order.query.count()
    pending_orders = Order.query.filter_by(status='Pending').count()
    total_revenue = db.session.query(db.func.sum(Order.total_price)).scalar() or 0
    
    return jsonify({
        'total_products': total_products,
        'total_orders': total_orders,
        'pending_orders': pending_orders,
        'total_revenue': float(total_revenue)
    }), 200
