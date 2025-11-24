import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const Contact = () => {
    const [settings, setSettings] = useState({
        website_name: 'UNICORNKART LLC',
        company_address: '30 N GOULD ST STE 4000, SHERIDAN, WY 82801, United States',
        company_phone: '+1 (555) 123-4567',
        company_email: 'info@unicornkart.com'
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.SETTINGS);
            if (response.ok) {
                const data = await response.json();
                setSettings({
                    website_name: data.website_name || settings.website_name,
                    company_address: data.company_address || settings.company_address,
                    company_phone: data.company_phone || settings.company_phone,
                    company_email: data.company_email || settings.company_email
                });
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this to your backend
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Home
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        Get in <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Info Cards */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <Mail className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-4">Send us an email anytime!</p>
                        <a href={`mailto:${settings.company_email}`} className="text-primary-600 hover:text-primary-700 font-medium">
                            {settings.company_email}
                        </a>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <Phone className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-600 mb-4">Mon-Fri from 8am to 5pm</p>
                        <a href={`tel:${settings.company_phone}`} className="text-primary-600 hover:text-primary-700 font-medium">
                            {settings.company_phone}
                        </a>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <MapPin className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600 mb-4">Come say hello</p>
                        <p className="text-primary-600 font-medium">
                            {settings.company_address}
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Send us a Message</h2>

                    {submitted && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center">
                            ✅ Thank you! Your message has been sent successfully.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                                placeholder="Tell us what's on your mind..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-8 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center space-x-2"
                        >
                            <Send className="h-5 w-5" />
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>

                {/* Business Hours */}
                <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div>
                            <p className="font-semibold">Monday - Friday</p>
                            <p className="text-purple-100">8:00 AM - 5:00 PM EST</p>
                        </div>
                        <div>
                            <p className="font-semibold">Saturday - Sunday</p>
                            <p className="text-purple-100">Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
