import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/orders', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else if (response.status === 401) {
                navigate('/admin/login');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchOrders();
                if (selectedOrder && selectedOrder.id === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
            }
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
            'Processing': 'bg-blue-100 text-blue-800 border-blue-300',
            'Shipped': 'bg-purple-100 text-purple-800 border-purple-300',
            'Delivered': 'bg-green-100 text-green-800 border-green-300',
            'Cancelled': 'bg-red-100 text-red-800 border-red-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading orders...</p>
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
                            Order Management
                        </h1>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {order.customer_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {order.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {order.phone}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-purple-600">
                                            ${order.total_price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No orders found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Order #{selectedOrder.id} Details
                            </h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-lg mb-3 text-gray-800">Customer Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="font-medium text-gray-800">{selectedOrder.customer_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium text-gray-800">{selectedOrder.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-medium text-gray-800">{selectedOrder.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">City</p>
                                        <p className="font-medium text-gray-800">{selectedOrder.city}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="font-medium text-gray-800">{selectedOrder.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Zip Code</p>
                                        <p className="font-medium text-gray-800">{selectedOrder.zip_code}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-bold text-lg mb-3 text-gray-800">Order Items</h3>
                                <div className="space-y-2">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.product_name}</p>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-purple-600">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                    <p className="font-bold text-lg text-gray-800">Total</p>
                                    <p className="font-bold text-2xl text-purple-600">${selectedOrder.total_price.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Status Update */}
                            <div>
                                <h3 className="font-bold text-lg mb-3 text-gray-800">Update Status</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateOrderStatus(selectedOrder.id, status)}
                                            className={`px-4 py-2 rounded-lg font-medium transition ${selectedOrder.status === status
                                                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderManagement;
