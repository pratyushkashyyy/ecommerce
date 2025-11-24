import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/settings');
            if (response.ok) {
                const data = await response.json();
                setContent(data.privacy_policy || 'Privacy Policy content not available.');
            }
        } catch (err) {
            console.error('Error fetching privacy policy:', err);
            setContent('Unable to load privacy policy. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const renderContent = (text) => {
        if (!text) return null;

        return text.split('\n').map((line, index) => {
            // Handle headers
            if (line.startsWith('# ')) {
                return <h1 key={index} className="text-4xl font-extrabold text-gray-900 mb-6 mt-8">{line.substring(2)}</h1>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6">{line.substring(3)}</h2>;
            }

            // Handle list items
            if (line.startsWith('- ')) {
                return <li key={index} className="text-gray-600 ml-6">{line.substring(2)}</li>;
            }

            // Handle numbered lists
            const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
            if (numberedMatch) {
                return <li key={index} className="text-gray-600 ml-6">{numberedMatch[2]}</li>;
            }

            // Handle bold text
            if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={index} className="text-gray-800 font-bold mb-2">{line.replace(/\*\*/g, '')}</p>;
            }

            // Handle empty lines
            if (line.trim() === '') {
                return <br key={index} />;
            }

            // Regular paragraphs
            return <p key={index} className="text-gray-600 mb-4">{line}</p>;
        });
    };

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading privacy policy...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg max-w-none">
                        {renderContent(content)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
