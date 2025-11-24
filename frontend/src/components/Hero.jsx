import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-700 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
                        Welcome to <span className="text-secondary">ToyWonderland</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-primary-100 max-w-2xl mx-auto mb-10 font-medium">
                        Spark joy and imagination with our curated collection of magical toys for every little dreamer.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-50 hover:scale-105 transition-all flex items-center gap-2">
                            Shop Now <ArrowRight className="h-5 w-5" />
                        </button>
                        <button className="bg-primary-600 text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all">
                            New Arrivals
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-secondary rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent rounded-full blur-xl opacity-50 animate-bounce delay-700"></div>
        </div>
    );
};

export default Hero;
