import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';

function AdminDashboard({ admin, onLogout }) {
    const [stats, setStats] = useState({
        total_products: 0,
        total_orders: 0,
        pending_orders: 0,
        total_revenue: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_DASHBOARD_STATS, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(API_ENDPOINTS.ADMIN_LOGOUT, {
                method: 'POST',
                credentials: 'include'
            });
            onLogout();
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const StatCard = ({ title, value, icon, color, prefix = '' }) => (
        <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
                    <p className="text-3xl font-bold">{prefix}{value}</p>
                </div>
                <div className="text-5xl opacity-20">{icon}</div>
            </div>
        </div>
    );

    const QuickAction = ({ title, description, icon, onClick, color }) => (
        <button
            onClick={onClick}
            className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition text-left w-full border-2 border-transparent hover:border-${color}-500`}
        >
            <div className="flex items-start space-x-4">
                <div className={`text-4xl`}>{icon}</div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </button>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">Welcome back, {admin?.username}!</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Products"
                        value={stats.total_products}
                        icon="📦"
                        color="from-blue-500 to-blue-600"
                    />
                    <StatCard
                        title="Total Orders"
                        value={stats.total_orders}
                        icon="🛒"
                        color="from-green-500 to-green-600"
                    />
                    <StatCard
                        title="Pending Orders"
                        value={stats.pending_orders}
                        icon="⏳"
                        color="from-orange-500 to-orange-600"
                    />
                    <StatCard
                        title="Total Revenue"
                        value={stats.total_revenue.toFixed(2)}
                        icon="💰"
                        color="from-purple-500 to-purple-600"
                        prefix="$"
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <QuickAction
                            title="Manage Products"
                            description="Add, edit, or remove products"
                            icon="🎁"
                            onClick={() => navigate('/admin/products')}
                            color="purple"
                        />
                        <QuickAction
                            title="View Orders"
                            description="Manage customer orders"
                            icon="📋"
                            onClick={() => navigate('/admin/orders')}
                            color="blue"
                        />
                        <QuickAction
                            title="Website Settings"
                            description="Update site configuration"
                            icon="⚙️"
                            onClick={() => navigate('/admin/settings')}
                            color="green"
                        />
                    </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">📊 Analytics</h3>
                        <p className="text-gray-600 text-sm mb-4">View detailed reports and insights</p>
                        <button className="text-purple-600 font-medium hover:underline">Coming Soon →</button>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">👥 Customers</h3>
                        <p className="text-gray-600 text-sm mb-4">Manage customer information</p>
                        <button className="text-purple-600 font-medium hover:underline">Coming Soon →</button>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">📧 Marketing</h3>
                        <p className="text-gray-600 text-sm mb-4">Email campaigns and promotions</p>
                        <button className="text-purple-600 font-medium hover:underline">Coming Soon →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
