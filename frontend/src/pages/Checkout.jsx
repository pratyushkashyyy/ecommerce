import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, CreditCard, MapPin, Mail, User, Truck } from 'lucide-react';

const Checkout = ({ cartItems, clearCart }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customer_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip_code: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post('/api/orders', {
                ...formData,
                total_price: total,
                items: cartItems
            });

            clearCart();
            setOrderComplete(true);
        } catch (error) {
            console.error('Order failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-slate-50">
                <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full transform transition-all animate-fade-in-up">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Order Placed!</h1>
                    <p className="text-gray-600 mb-8 text-lg">Thank you for shopping with ToyWonderland. We'll send you a confirmation email shortly.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="text-center">
                    <p className="text-2xl text-gray-400 font-bold mb-6">Your cart is empty</p>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary-600 font-bold text-lg hover:text-primary-700 hover:underline"
                    >
                        Go back to store
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 font-medium transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Store
                </Link>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <Truck className="h-6 w-6 text-primary-600" />
                                    Shipping Information
                                </h2>
                            </div>
                            <div className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="customer_name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="customer_name"
                                                    required
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
                                                    placeholder="John Doe"
                                                    value={formData.customer_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
                                                    placeholder="+1 (555) 123-4567"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPin className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    required
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
                                                    placeholder="123 Toy Street"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
                                                placeholder="New York"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="zip_code" className="block text-sm font-bold text-gray-700 mb-2">ZIP Code</label>
                                            <input
                                                type="text"
                                                name="zip_code"
                                                required
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
                                                placeholder="10001"
                                                value={formData.zip_code}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center bg-primary-600 border border-transparent rounded-2xl shadow-lg py-4 px-4 text-lg font-bold text-white hover:bg-primary-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 mt-8"
                                    >
                                        {isSubmitting ? (
                                            'Processing...'
                                        ) : (
                                            <>
                                                <CreditCard className="mr-2 h-5 w-5" />
                                                Pay ${total.toFixed(2)}
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 mt-10 lg:mt-0">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 sticky top-24">
                            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                            </div>
                            <div className="p-8">
                                <ul className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="py-6 flex">
                                            <div className="flex-shrink-0 w-20 h-20 border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-center object-cover" />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex justify-between text-base font-bold text-gray-900">
                                                    <h3 className="line-clamp-1">{item.name}</h3>
                                                    <p className="ml-4 text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                <p className="mt-1 text-sm font-medium text-gray-500">Qty {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-gray-100 pt-6 mt-6">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <p>Total</p>
                                        <p className="text-2xl text-primary-600">${total.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500 text-center">
                                        Free shipping and returns on all orders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
