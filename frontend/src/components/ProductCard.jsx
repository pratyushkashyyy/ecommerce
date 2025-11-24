import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:-translate-y-1 relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm">
            {product.category}
          </div>
        </div>
      </Link>

      {/* Quick Add Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-white text-primary-600 px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 flex items-center gap-2 pointer-events-auto"
        >
          <Plus className="h-5 w-5" /> Quick Add
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-3 w-3 text-secondary fill-secondary" />
          ))}
          <span className="text-xs text-gray-400 ml-1">(24)</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-primary-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10 leading-relaxed">{product.description}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-extrabold text-primary-600">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-primary-50 text-primary-600 p-2 rounded-xl hover:bg-primary-600 hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
