import React from 'react';
import { ShoppingCart, Store, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, toggleCart }) => {
    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-primary-100 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                            <Store className="h-8 w-8 text-primary-600" />
                        </div>
                        <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            Toy<span className="text-primary-600">Wonderland</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for toys..."
                            className="bg-transparent border-none focus:ring-0 text-gray-700 w-full ml-2 placeholder-gray-400"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin/login"
                            className="hidden md:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition"
                        >
                            Admin
                        </Link>
                        <button
                            onClick={toggleCart}
                            className="relative p-3 rounded-full hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-all group"
                        >
                            <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm border-2 border-white transform translate-x-1 -translate-y-1">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
