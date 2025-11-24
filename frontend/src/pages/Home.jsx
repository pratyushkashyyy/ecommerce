import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import { Loader2, Sparkles } from 'lucide-react';

const Home = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load toys. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary-50">
                <Loader2 className="h-12 w-12 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 bg-primary-50">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <span className="text-primary-600 font-bold tracking-wider uppercase text-sm bg-primary-100 px-4 py-1 rounded-full">Our Collection</span>
                    <h2 className="text-4xl font-extrabold text-gray-900 mt-3 mb-4 flex items-center justify-center gap-3">
                        <Sparkles className="h-8 w-8 text-secondary" />
                        Featured Toys
                        <Sparkles className="h-8 w-8 text-secondary" />
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Hand-picked favorites that guarantee hours of fun and learning.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
