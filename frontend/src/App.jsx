import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Contact from './pages/Contact';
import About from './pages/About';
import { API_ENDPOINTS } from './config/api';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import WebsiteSettings from './pages/admin/WebsiteSettings';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        checkAdminAuth();
    }, []);

    const checkAdminAuth = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_CHECK_AUTH, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.authenticated) {
                    setAdmin(data.admin);
                }
            }
        } catch (err) {
            console.error('Auth check error:', err);
        } finally {
            setCheckingAuth(false);
        }
    };

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const handleAdminLogin = (adminData) => {
        setAdmin(adminData);
    };

    const handleAdminLogout = () => {
        setAdmin(null);
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Protected Route Component
    const ProtectedAdminRoute = ({ children }) => {
        if (checkingAuth) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
                </div>
            );
        }
        return admin ? children : <Navigate to="/admin/login" />;
    };

    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={
                    admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={handleAdminLogin} />
                } />
                <Route path="/admin/dashboard" element={
                    <ProtectedAdminRoute>
                        <AdminDashboard admin={admin} onLogout={handleAdminLogout} />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/products" element={
                    <ProtectedAdminRoute>
                        <ProductManagement />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/orders" element={
                    <ProtectedAdminRoute>
                        <OrderManagement />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/settings" element={
                    <ProtectedAdminRoute>
                        <WebsiteSettings />
                    </ProtectedAdminRoute>
                } />

                {/* Public Routes */}
                <Route path="/*" element={
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                        <Navbar cartCount={cartCount} toggleCart={() => setIsCartOpen(true)} />

                        <Cart
                            isOpen={isCartOpen}
                            onClose={() => setIsCartOpen(false)}
                            cartItems={cartItems}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                        />

                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home addToCart={addToCart} />} />
                                <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
                                <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/refund-policy" element={<RefundPolicy />} />
                                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </main>

                        <Footer />
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
