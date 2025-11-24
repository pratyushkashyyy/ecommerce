import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Star, Truck, ShieldCheck, Package } from 'lucide-react';

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!product) return null;

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Store
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="h-96 md:h-[600px] bg-gray-50 relative group">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="h-5 w-5 text-secondary fill-secondary" />
                                    ))}
                                </div>
                                <span className="text-gray-500 font-medium">(24 verified reviews)</span>
                            </div>

                            <p className="text-xl text-gray-600 mb-10 leading-relaxed">{product.description}</p>

                            <div className="flex items-center justify-between mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Price</p>
                                    <span className="text-4xl font-extrabold text-primary-600">${product.price.toFixed(2)}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">Availability</p>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Truck className="h-5 w-5 text-primary-500" />
                                    <span>Free shipping on orders over $50</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <ShieldCheck className="h-5 w-5 text-primary-500" />
                                    <span>2-year warranty included</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Package className="h-5 w-5 text-primary-500" />
                                    <span>30-day return policy</span>
                                </div>
                            </div>

                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                                className={`w-full flex items-center justify-center px-8 py-5 border border-transparent text-lg font-bold rounded-2xl text-white shadow-lg transition-all transform hover:-translate-y-1 ${product.stock > 0
                                        ? 'bg-primary-600 hover:bg-primary-700 hover:shadow-xl'
                                        : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <ShoppingCart className="mr-3 h-6 w-6" />
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
