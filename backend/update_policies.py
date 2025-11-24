"""
Script to extract policy content and update the database with actual policy text
Run this once to populate the database with the full policy content
"""
from app import app
from admin_models import WebsiteSettings
from database import db

# Privacy Policy Content
privacy_policy_content = """# Privacy Policy

## 1. Information We Collect

At ToyWonderland, we collect information that you provide directly to us when you:

- Create an account or place an order
- Subscribe to our newsletter
- Contact our customer service
- Participate in surveys or promotions

This information may include your name, email address, phone number, shipping address, and payment information.

## 2. How We Use Your Information

We use the information we collect to:

- Process and fulfill your orders
- Send you order confirmations and shipping updates
- Respond to your comments and questions
- Send you marketing communications (with your consent)
- Improve our website and customer service
- Detect and prevent fraud

## 3. Information Sharing

We do not sell, trade, or rent your personal information to third parties. We may share your information with:

- Service providers who help us operate our business (e.g., payment processors, shipping companies)
- Law enforcement when required by law
- Business partners with your explicit consent

## 4. Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.

## 5. Cookies

We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.

## 6. Your Rights

You have the right to:

- Access the personal information we hold about you
- Request correction of inaccurate information
- Request deletion of your personal information
- Opt-out of marketing communications
- Object to processing of your personal information

## 7. Children's Privacy

Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.

## 8. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.

## 9. Contact Us

If you have any questions about this Privacy Policy, please contact us at:

**ToyWonderland**
Email: contact@toywonderland.com
Phone: +1 (555) 123-4567
Address: 123 Toy Street, Wonderland City, WL 12345
EIN: 12-3456789
"""

# Terms and Conditions Content
terms_content = """# Terms and Conditions

## 1. Agreement to Terms

By accessing and using ToyWonderland's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.

## 2. Use of Website

You agree to use our website only for lawful purposes. You must not:

- Use the website in any way that violates any applicable laws or regulations
- Attempt to gain unauthorized access to our systems
- Transmit any viruses, malware, or harmful code
- Engage in any activity that interferes with or disrupts our services
- Use automated systems to access the website without our permission

## 3. Account Registration

When you create an account with us, you must provide accurate and complete information. You are responsible for:

- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Notifying us immediately of any unauthorized use of your account

## 4. Product Information and Pricing

We strive to provide accurate product descriptions and pricing. However:

- We do not warrant that product descriptions, colors, or other content is accurate or complete
- Prices are subject to change without notice
- We reserve the right to limit quantities purchased
- We reserve the right to refuse or cancel any order

## 5. Orders and Payment

By placing an order, you agree to:

- Provide current, complete, and accurate purchase information
- Pay all charges at the prices in effect when your order is placed
- Pay applicable taxes and shipping fees

We reserve the right to refuse or cancel orders that appear fraudulent or violate our terms.

## 6. Shipping and Delivery

We will make reasonable efforts to deliver products within the estimated timeframe. However, we are not responsible for delays caused by shipping carriers, customs, or events beyond our control. Title and risk of loss pass to you upon delivery to the carrier.

## 7. Intellectual Property

All content on this website, including text, graphics, logos, images, and software, is the property of ToyWonderland and is protected by copyright and trademark laws. You may not:

- Reproduce, distribute, or create derivative works from our content
- Use our trademarks without written permission
- Remove any copyright or proprietary notices

## 8. Product Warranties

Products are covered by manufacturer warranties where applicable. We make no additional warranties, express or implied, regarding product quality, merchantability, or fitness for a particular purpose beyond those provided by the manufacturer.

## 9. Limitation of Liability

To the maximum extent permitted by law, ToyWonderland shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product in question.

## 10. Indemnification

You agree to indemnify and hold harmless ToyWonderland from any claims, damages, losses, or expenses arising from your violation of these Terms or your use of our services.

## 11. Dispute Resolution

Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive your right to participate in class action lawsuits.

## 12. Governing Law

These Terms shall be governed by and construed in accordance with the laws of the State of Wyoming, United States, without regard to its conflict of law provisions.

## 13. Changes to Terms

We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified Terms.

## 14. Severability

If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.

## 15. Contact Information

For questions about these Terms and Conditions, please contact us:

**ToyWonderland**
Email: contact@toywonderland.com
Phone: +1 (555) 123-4567
Address: 123 Toy Street, Wonderland City, WL 12345
EIN: 12-3456789
"""

# Refund Policy Content
refund_policy_content = """# Refund Policy

## 1. 30-Day Return Policy

At ToyWonderland, we want you to be completely satisfied with your purchase. If you're not happy with your order, you may return it within 30 days of delivery for a full refund or exchange.

## 2. Eligibility for Returns

To be eligible for a return, items must meet the following conditions:

- Items must be unused and in the same condition that you received them
- Items must be in their original packaging
- Items must have all tags and labels attached
- Proof of purchase (receipt or order confirmation) must be provided

## 3. Non-Returnable Items

The following items cannot be returned:

- Items marked as "Final Sale"
- Opened or used toys for safety and hygiene reasons
- Personalized or custom-made items
- Gift cards
- Downloadable products

## 4. How to Initiate a Return

To start a return:

1. Contact our customer service at contact@toywonderland.com or call +1 (555) 123-4567
2. Provide your order number and reason for return
3. We will send you a return authorization and shipping label
4. Pack the item securely in its original packaging
5. Ship the item back to us using the provided label

## 5. Return Shipping Costs

**Free Returns:** If the item is defective, damaged, or we sent you the wrong item, we will cover the return shipping costs.

**Customer Returns:** If you're returning an item for any other reason (e.g., change of mind), you will be responsible for the return shipping costs.

## 6. Refund Processing

Once we receive your returned item, we will inspect it and process your refund within 5-7 business days. Refunds will be issued to the original payment method.

Please note that it may take an additional 5-10 business days for the refund to appear in your account, depending on your bank or credit card company.

## 7. Exchanges

If you need to exchange an item for a different size, color, or product, please contact us. We'll be happy to help you find the perfect replacement. Exchanges are subject to product availability.

## 8. Damaged or Defective Items

If you receive a damaged or defective item, please contact us immediately with photos of the damage. We will arrange for a replacement or full refund at no cost to you.

## 9. Late or Missing Refunds

If you haven't received your refund within the expected timeframe:

- Check your bank account again
- Contact your credit card company (it may take some time before your refund is officially posted)
- Contact your bank (there is often processing time before a refund is posted)
- If you've done all of this and still haven't received your refund, please contact us at contact@toywonderland.com

## 10. Contact Us

If you have any questions about our Refund Policy, please contact us:

**ToyWonderland**
Email: contact@toywonderland.com
Phone: +1 (555) 123-4567
Address: 123 Toy Street, Wonderland City, WL 12345
EIN: 12-3456789
"""

# About Us Content
about_us_content = """Welcome to ToyWonderland - Your Magical Destination for Quality Toys!

At ToyWonderland, we believe that every child deserves access to safe, educational, and fun toys that spark imagination and creativity. Founded with a passion for bringing joy to families, we carefully curate our selection to include only the best toys from trusted manufacturers.

Our mission is to provide parents with a one-stop shop for all their children's toy needs, offering everything from educational games to outdoor play equipment, all at competitive prices with exceptional customer service.

We're committed to:
- Quality: Every product is carefully selected and tested
- Safety: All toys meet or exceed safety standards
- Education: We prioritize toys that promote learning and development
- Fun: Because childhood should be filled with joy and wonder

Thank you for choosing ToyWonderland. We're honored to be part of your family's journey!
"""

def update_settings():
    with app.app_context():
        # Update Privacy Policy
        setting = WebsiteSettings.query.filter_by(key='privacy_policy').first()
        if setting:
            setting.value = privacy_policy_content
        else:
            setting = WebsiteSettings(key='privacy_policy', value=privacy_policy_content)
            db.session.add(setting)
        
        # Update Terms and Conditions
        setting = WebsiteSettings.query.filter_by(key='terms_and_conditions').first()
        if setting:
            setting.value = terms_content
        else:
            setting = WebsiteSettings(key='terms_and_conditions', value=terms_content)
            db.session.add(setting)
        
        # Update Refund Policy
        setting = WebsiteSettings.query.filter_by(key='refund_policy').first()
        if setting:
            setting.value = refund_policy_content
        else:
            setting = WebsiteSettings(key='refund_policy', value=refund_policy_content)
            db.session.add(setting)
        
        # Update About Us
        setting = WebsiteSettings.query.filter_by(key='about_us').first()
        if setting:
            setting.value = about_us_content
        else:
            setting = WebsiteSettings(key='about_us', value=about_us_content)
            db.session.add(setting)
        
        db.session.commit()
        print("✅ Settings updated successfully!")
        print("Privacy Policy, Terms and Conditions, Refund Policy, and About Us content have been populated.")

if __name__ == '__main__':
    update_settings()
