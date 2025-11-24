import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const [settings, setSettings] = useState({
        website_name: 'UNICORNKART LLC',
        company_address: '30 N GOULD ST STE 4000, SHERIDAN, WY 82801, United States',
        company_ein: '38-4362997',
        company_phone: '+1 (555) 123-4567',
        company_email: 'info@unicornkart.com'
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/settings');
            if (response.ok) {
                const data = await response.json();
                setSettings({
                    website_name: data.website_name || settings.website_name,
                    company_address: data.company_address || settings.company_address,
                    company_ein: data.company_ein || settings.company_ein,
                    company_phone: data.company_phone || settings.company_phone,
                    company_email: data.company_email || settings.company_email
                });
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    // Parse address into lines
    const addressLines = settings.company_address.split(',').map(line => line.trim());

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-white text-xl font-bold mb-4">{settings.website_name}</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                                <p className="text-sm">
                                    {addressLines.map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            {index < addressLines.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary-400" />
                                <p className="text-sm">{settings.company_phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary-400" />
                                <p className="text-sm">{settings.company_email}</p>
                            </div>
                            <p className="text-sm text-gray-400 mt-4">
                                EIN: {settings.company_ein}
                            </p>
                        </div>
                    </div>

                    {/* About Us */}
                    <div>
                        <h4 className="text-white font-bold mb-4">About Us</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-sm hover:text-primary-400 transition-colors">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm hover:text-primary-400 transition-colors">
                                    Mission & Vision
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm hover:text-primary-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Products/Services */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Products</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/?category=educational" className="text-sm hover:text-primary-400 transition-colors">
                                    Educational Toys
                                </Link>
                            </li>
                            <li>
                                <Link to="/?category=action" className="text-sm hover:text-primary-400 transition-colors">
                                    Action Figures
                                </Link>
                            </li>
                            <li>
                                <Link to="/?category=plush" className="text-sm hover:text-primary-400 transition-colors">
                                    Plush Toys
                                </Link>
                            </li>
                            <li>
                                <Link to="/?category=construction" className="text-sm hover:text-primary-400 transition-colors">
                                    Building Sets
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/privacy-policy" className="text-sm hover:text-primary-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund-policy" className="text-sm hover:text-primary-400 transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-and-conditions" className="text-sm hover:text-primary-400 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} {settings.website_name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
