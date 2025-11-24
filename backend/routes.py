from flask import Blueprint, jsonify, request
from models import Product, Order, OrderItem
from database import db

api = Blueprint('api', __name__)

@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@api.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@api.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    
    try:
        new_order = Order(
            customer_name=data['customer_name'],
            email=data['email'],
            phone=data.get('phone', ''),
            address=data['address'],
            city=data['city'],
            zip_code=data['zip_code'],
            total_price=data['total_price']
        )
        
        db.session.add(new_order)
        db.session.flush()

        for item in data['items']:
            order_item = OrderItem(
                order_id=new_order.id,
                product_id=item['id'],
                quantity=item['quantity'],
                price=item['price']
            )
            db.session.add(order_item)
            
            product = Product.query.get(item['id'])
            if product:
                product.stock -= item['quantity']

        db.session.commit()
        return jsonify({'message': 'Order placed successfully', 'order_id': new_order.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# Public endpoint for website settings (no authentication required)
@api.route('/settings', methods=['GET'])
def get_public_settings():
    from admin_models import WebsiteSettings
    settings = WebsiteSettings.query.all()
    settings_dict = {setting.key: setting.value for setting in settings}
    return jsonify(settings_dict), 200
