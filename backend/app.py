from flask import Flask, send_from_directory
from flask_cors import CORS
from database import db
from routes import api
from admin_routes import admin_api
import os
import secrets

def create_app():
    app = Flask(__name__)
    
    # Session config
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', secrets.token_hex(32))
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    
    # CORS config with credentials support
    CORS(app, supports_credentials=True, origins=['http://localhost:5173'])
    
    # Database config
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'toys_v2.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(api, url_prefix='/api')
    app.register_blueprint(admin_api, url_prefix='/api/admin')
    
    # Serve uploaded images
    @app.route('/uploads/<path:filename>')
    def serve_upload(filename):
        upload_dir = os.path.join(basedir, 'uploads')
        return send_from_directory(upload_dir, filename)

    with app.app_context():
        db.create_all()
        
        # Initialize default admin user
        from admin_models import Admin, WebsiteSettings
        
        if not Admin.query.filter_by(username='admin').first():
            admin = Admin(username='admin', email='admin@toywonderland.com')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            print("Default admin created - Username: admin, Password: admin123")
        
        # Initialize default website settings
        default_settings = {
            'website_name': 'UNICORNKART LLC',
            'company_address': '30 N GOULD ST STE 4000, SHERIDAN, WY 82801, United States',
            'company_ein': '38-4362997',
            'company_phone': '+1 (555) 123-4567',
            'company_email': 'info@unicornkart.com',
            'privacy_policy': 'Your privacy policy content here...',
            'terms_and_conditions': 'Your terms and conditions content here...',
            'refund_policy': 'Your refund policy content here...',
            'about_us': 'Welcome to UNICORNKART LLC - Your trusted source for quality toys and products!',
            'meta_description': 'Shop the best toys and products at UNICORNKART LLC',
            'meta_keywords': 'toys, kids toys, educational toys, fun toys, unicornkart'
        }
        
        for key, value in default_settings.items():
            if not WebsiteSettings.query.filter_by(key=key).first():
                setting = WebsiteSettings(key=key, value=value)
                db.session.add(setting)
        
        db.session.commit()

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
