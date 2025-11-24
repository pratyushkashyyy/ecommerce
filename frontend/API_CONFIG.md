# API Configuration Guide

## Overview
All API endpoints are now centralized in `src/config/api.js` for easy configuration and maintenance.

## Configuration Files

### Development Environment (`.env.development`)
Located at: `frontend/.env.development`

```env
VITE_API_URL=http://localhost:5000
```

**Note:** This file is used automatically when running `npm run dev`.

### Production Environment
In production, the API automatically uses the same origin as the frontend (served through nginx).

## Changing the Backend URL

### For Local Development
1. Open `frontend/.env.development`
2. Change `VITE_API_URL` to your backend URL:
   ```env
   VITE_API_URL=http://your-backend-url:port
   ```
3. Restart the development server (`npm run dev`)

### For Production
No changes needed - the app automatically uses the production server's URL.

## Available API Endpoints

The following endpoints are pre-configured in `src/config/api.js`:

### Public Endpoints
- `API_ENDPOINTS.SETTINGS` - Get website settings
- `API_ENDPOINTS.PRODUCTS` - Get products list

### Admin Endpoints
- `API_ENDPOINTS.ADMIN_LOGIN` - Admin login
- `API_ENDPOINTS.ADMIN_LOGOUT` - Admin logout
- `API_ENDPOINTS.ADMIN_CHECK_AUTH` - Check admin authentication
- `API_ENDPOINTS.ADMIN_DASHBOARD_STATS` - Get dashboard statistics
- `API_ENDPOINTS.ADMIN_SETTINGS` - Get/Update website settings
- `API_ENDPOINTS.ADMIN_PRODUCTS` - Manage products
- `API_ENDPOINTS.ADMIN_ORDERS` - Manage orders
- `API_ENDPOINTS.ADMIN_UPLOAD_IMAGE` - Upload product images

### Dynamic Endpoints
For endpoints that require IDs, use these helper functions:
- `getAdminProductUrl(id)` - Get product by ID
- `getAdminOrderStatusUrl(orderId)` - Update order status

## Usage Example

```javascript
import { API_ENDPOINTS, getAdminProductUrl } from './config/api';

// Fetch settings
const response = await fetch(API_ENDPOINTS.SETTINGS);

// Delete a product
const response = await fetch(getAdminProductUrl(productId), {
    method: 'DELETE',
    credentials: 'include'
});
```

## Troubleshooting

### Frontend can't connect to backend
1. Check if backend is running on the correct port
2. Verify `.env.development` has the correct URL
3. Restart the frontend development server
4. Check browser console for CORS errors

### CORS Errors
Make sure your backend allows requests from the frontend origin. The backend should include proper CORS headers.

## Files Modified
All components now use the centralized API configuration:
- `src/App.jsx`
- `src/components/Footer.jsx`
- `src/pages/PrivacyPolicy.jsx`
- `src/pages/RefundPolicy.jsx`
- `src/pages/TermsAndConditions.jsx`
- `src/pages/admin/AdminLogin.jsx`
- `src/pages/admin/AdminDashboard.jsx`
- `src/pages/admin/ProductManagement.jsx`
- `src/pages/admin/OrderManagement.jsx`
- `src/pages/admin/WebsiteSettings.jsx`
