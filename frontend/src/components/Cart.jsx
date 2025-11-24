import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md transform transition-transform duration-500 ease-in-out">
                    <div className="h-full flex flex-col bg-white shadow-2xl overflow-y-scroll">
                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <ShoppingBag className="h-6 w-6 text-primary-600" />
                                    Your Cart
                                </h2>
                                <div className="ml-3 h-7 flex items-center">
                                    <button onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors">
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-20">
                                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <ShoppingBag className="h-10 w-10 text-gray-300" />
                                        </div>
                                        <p className="text-gray-500 text-xl font-medium mb-2">Your cart is empty</p>
                                        <p className="text-gray-400 mb-8">Looks like you haven't added any toys yet.</p>
                                        <button
                                            onClick={onClose}
                                            className="text-primary-600 font-bold hover:text-primary-700 text-lg"
                                        >
                                            Start Shopping &rarr;
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flow-root">
                                        <ul className="-my-6 divide-y divide-gray-100">
                                            {cartItems.map((item) => (
                                                <li key={item.id} className="py-6 flex">
                                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.name}
                                                            className="w-full h-full object-center object-cover"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-bold text-gray-900">
                                                                <h3>{item.name}</h3>
                                                                <p className="ml-4 text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                        </div>
                                                        <div className="flex-1 flex items-end justify-between text-sm">
                                                            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="p-2 hover:bg-white rounded-l-xl transition-colors text-gray-600"
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </button>
                                                                <span className="px-3 font-bold text-gray-900">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="p-2 hover:bg-white rounded-r-xl transition-colors text-gray-600"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </button>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1 bg-red-50 px-3 py-1 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-100 py-6 px-4 sm:px-6 bg-gray-50">
                                <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
                                    <p>Subtotal</p>
                                    <p className="text-primary-600">${total.toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                                <Link
                                    to="/checkout"
                                    onClick={onClose}
                                    className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-2xl shadow-lg text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
