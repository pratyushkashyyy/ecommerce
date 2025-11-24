import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: '',
        stock: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/products', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else if (response.status === 401) {
                navigate('/admin/login');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload PNG, JPG, JPEG, GIF, or WEBP images.');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File too large. Maximum size is 5MB.');
            return;
        }

        setUploading(true);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('image', file);

            const response = await fetch('http://localhost:5000/api/admin/upload-image', {
                method: 'POST',
                credentials: 'include',
                body: formDataUpload
            });

            if (response.ok) {
                const data = await response.json();
                const fullImageUrl = `http://localhost:5000${data.image_url}`;
                setFormData({ ...formData, image_url: fullImageUrl });
                setImagePreview(fullImageUrl);
            } else {
                const error = await response.json();
                alert(error.error || 'Upload failed');
            }
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editingProduct
            ? `http://localhost:5000/api/admin/products/${editingProduct.id}`
            : 'http://localhost:5000/api/admin/products';

        const method = editingProduct ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchProducts();
                closeModal();
            }
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                fetchProducts();
            }
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
            setImagePreview(product.image_url);
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                image_url: '',
                category: '',
                stock: ''
            });
            setImagePreview('');
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setImagePreview('');
        setFormData({
            name: '',
            description: '',
            price: '',
            image_url: '',
            category: '',
            stock: ''
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
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
                            Product Management
                        </h1>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-medium"
                    >
                        + Add Product
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => openModal(product)}
                                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found. Add your first product!</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Image
                                </label>

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mb-3">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                                        />
                                    </div>
                                )}

                                {/* Upload Button */}
                                <div className="flex items-center space-x-3">
                                    <label className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            disabled={uploading}
                                        />
                                        <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition cursor-pointer text-center font-medium">
                                            {uploading ? 'Uploading...' : '📁 Upload Image'}
                                        </div>
                                    </label>

                                    <span className="text-gray-500">or</span>

                                    <input
                                        type="url"
                                        value={formData.image_url}
                                        onChange={(e) => {
                                            setFormData({ ...formData, image_url: e.target.value });
                                            setImagePreview(e.target.value);
                                        }}
                                        placeholder="Enter image URL"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Max file size: 5MB. Supported: PNG, JPG, JPEG, GIF, WEBP
                                </p>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-medium disabled:opacity-50"
                                >
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;
