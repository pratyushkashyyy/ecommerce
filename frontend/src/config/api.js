// API Configuration
// This file centralizes all API endpoint configurations

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
    // Check if we're in production (deployed)
    if (import.meta.env.PROD) {
        // In production, API is served through nginx at /api
        return window.location.origin;
    }

    // In development, use environment variable or default to localhost:5000
    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const buildApiUrl = (path) => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
    // Public endpoints
    SETTINGS: buildApiUrl('api/settings'),
    PRODUCTS: buildApiUrl('api/products'),

    // Admin endpoints
    ADMIN_LOGIN: buildApiUrl('api/admin/login'),
    ADMIN_LOGOUT: buildApiUrl('api/admin/logout'),
    ADMIN_CHECK_AUTH: buildApiUrl('api/admin/check-auth'),
    ADMIN_DASHBOARD_STATS: buildApiUrl('api/admin/dashboard/stats'),
    ADMIN_SETTINGS: buildApiUrl('api/admin/settings'),
    ADMIN_PRODUCTS: buildApiUrl('api/admin/products'),
    ADMIN_ORDERS: buildApiUrl('api/admin/orders'),
    ADMIN_UPLOAD_IMAGE: buildApiUrl('api/admin/upload-image'),
};

// Helper function for dynamic endpoints (e.g., with IDs)
export const getAdminProductUrl = (id) => buildApiUrl(`api/admin/products/${id}`);
export const getAdminOrderStatusUrl = (orderId) => buildApiUrl(`api/admin/orders/${orderId}/status`);

export default {
    API_BASE_URL,
    buildApiUrl,
    API_ENDPOINTS,
    getAdminProductUrl,
    getAdminOrderStatusUrl,
};
