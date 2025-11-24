"""
Script to update company information in the database
"""
from app import app
from admin_models import WebsiteSettings
from database import db

def update_company_info():
    with app.app_context():
        # Update company information
        updates = {
            'website_name': 'UNICORNKART LLC',
            'company_address': '30 N GOULD ST STE 4000, SHERIDAN, WY 82801, United States',
            'company_ein': '38-4362997',
            'company_phone': '+1 (555) 123-4567',
            'company_email': 'info@unicornkart.com',
            'about_us': 'Welcome to UNICORNKART LLC - Your trusted source for quality toys and products!',
            'meta_description': 'Shop the best toys and products at UNICORNKART LLC',
            'meta_keywords': 'toys, kids toys, educational toys, fun toys, unicornkart'
        }
        
        for key, value in updates.items():
            setting = WebsiteSettings.query.filter_by(key=key).first()
            if setting:
                setting.value = value
                print(f"✅ Updated {key}")
            else:
                setting = WebsiteSettings(key=key, value=value)
                db.session.add(setting)
                print(f"✅ Created {key}")
        
        db.session.commit()
        print("\n✅ Company information updated successfully!")
        print("The admin settings panel now shows the correct UNICORNKART LLC information.")

if __name__ == '__main__':
    update_company_info()
