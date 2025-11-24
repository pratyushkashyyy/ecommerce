import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WebsiteSettings() {
    const [settings, setSettings] = useState({
        website_name: '',
        company_address: '',
        company_ein: '',
        company_phone: '',
        company_email: '',
        privacy_policy: '',
        terms_and_conditions: '',
        refund_policy: '',
        about_us: '',
        meta_description: '',
        meta_keywords: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/settings', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            } else if (response.status === 401) {
                navigate('/admin/login');
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/admin/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                setMessage('Settings updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update settings.');
            }
        } catch (err) {
            console.error('Error updating settings:', err);
            setMessage('Error updating settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="text-gray-600 hover:text-gray-800 transition"
                        >
                            ← Back
                        </button>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Website Settings
                        </h1>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="text-3xl mr-3">🏢</span>
                            General Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.website_name}
                                    onChange={(e) => setSettings({ ...settings, website_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.company_email}
                                    onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Phone
                                </label>
                                <input
                                    type="text"
                                    value={settings.company_phone}
                                    onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company EIN
                                </label>
                                <input
                                    type="text"
                                    value={settings.company_ein}
                                    onChange={(e) => setSettings({ ...settings, company_ein: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Address
                                </label>
                                <input
                                    type="text"
                                    value={settings.company_address}
                                    onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="text-3xl mr-3">🔍</span>
                            SEO Settings
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    value={settings.meta_description}
                                    onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    rows="2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Keywords (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={settings.meta_keywords}
                                    onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Us */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="text-3xl mr-3">ℹ️</span>
                            About Us
                        </h2>

                        <textarea
                            value={settings.about_us}
                            onChange={(e) => setSettings({ ...settings, about_us: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows="4"
                        />
                    </div>

                    {/* Privacy Policy */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="text-3xl mr-3">🔒</span>
                            Privacy Policy
                        </h2>

                        <textarea
                            value={settings.privacy_policy}
                            onChange={(e) => setSettings({ ...settings, privacy_policy: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows="8"
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="text-3xl mr-3">📜</span>
                            Terms and Conditions
                        </h2>

                        <textarea
                            value={settings.terms_and_conditions}
                            onChange={(e) => setSettings({ ...settings, terms_and_conditions: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows="8"
                        />
                    </div>

                    {/* Refund Policy */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="text-3xl mr-3">💰</span>
                            Refund Policy
                        </h2>

                        <textarea
                            value={settings.refund_policy}
                            onChange={(e) => setSettings({ ...settings, refund_policy: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows="8"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="sticky bottom-4 bg-white rounded-xl shadow-lg p-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving Changes...' : 'Save All Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WebsiteSettings;
