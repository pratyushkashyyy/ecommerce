import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Award, Users, Sparkles } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const About = () => {
    const [settings, setSettings] = useState({
        website_name: 'UNICORNKART LLC',
        about_us: ''
    });

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
                    about_us: data.about_us || ''
                });
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    const values = [
        {
            icon: <Heart className="h-8 w-8" />,
            title: 'Customer First',
            description: 'We put our customers at the heart of everything we do, ensuring satisfaction with every purchase.',
            color: 'from-red-500 to-pink-500'
        },
        {
            icon: <Award className="h-8 w-8" />,
            title: 'Quality Products',
            description: 'We carefully curate our selection to bring you only the best toys that inspire creativity and joy.',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: 'Community',
            description: 'Building lasting relationships with families and creating memorable experiences together.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Sparkles className="h-8 w-8" />,
            title: 'Innovation',
            description: 'Constantly evolving to bring you the latest and most exciting toys on the market.',
            color: 'from-purple-500 to-pink-500'
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Home
                </Link>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Our <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Story</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Welcome to {settings.website_name}, where imagination meets reality and every toy tells a story.
                    </p>
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16">
                    <div className="prose prose-lg max-w-none">
                        {settings.about_us ? (
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {settings.about_us}
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Founded with a passion for bringing joy to children and families, {settings.website_name} has grown from a small dream into a trusted destination for quality toys and games. We believe that play is essential to childhood development, creativity, and happiness.
                                </p>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Our journey began when we noticed a gap in the market for a toy store that truly cared about the quality, safety, and educational value of the products it offered. We set out to create a place where parents could shop with confidence, knowing that every item has been carefully selected with their child's best interests in mind.
                                </p>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Today, we're proud to serve thousands of happy families, offering everything from classic toys that stand the test of time to the latest innovations in educational play. Our commitment to excellence, customer service, and community engagement remains as strong as ever.
                                </p>

                                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Our Mission</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    To inspire wonder, creativity, and learning through carefully curated toys that bring families together and create lasting memories. We strive to make every shopping experience delightful, every product exceptional, and every customer a part of our growing family.
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-2">
                                <div className={`bg-gradient-to-br ${value.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl shadow-2xl p-12 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-extrabold mb-2">10K+</div>
                            <div className="text-purple-100 text-lg">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-5xl font-extrabold mb-2">500+</div>
                            <div className="text-purple-100 text-lg">Quality Products</div>
                        </div>
                        <div>
                            <div className="text-5xl font-extrabold mb-2">99%</div>
                            <div className="text-purple-100 text-lg">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Journey</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Be part of our story. Explore our collection and discover the perfect toys for your loved ones.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-bold text-lg hover:bg-purple-50 transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
