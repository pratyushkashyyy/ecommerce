# E-Commerce Application - Production Ready

A full-featured e-commerce web application with admin panel, built with React and Flask.

## 🚀 Features

### Customer Features
- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 💳 Cash on Delivery (COD) checkout
- 📱 Responsive design for all devices
- 📄 Privacy Policy, Terms & Conditions, Refund Policy pages

### Admin Features
- 🔐 Secure admin authentication
- 📦 Product management (CRUD operations)
- 📸 Image upload for products
- 📋 Order management and tracking
- ⚙️ Website settings configuration
- 📊 Dashboard with statistics
- 📝 Content management (policies, about us, etc.)

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router
- Tailwind CSS
- Vite

**Backend:**
- Python 3.10+
- Flask
- SQLAlchemy
- SQLite (development) / PostgreSQL (production recommended)

**Deployment:**
- Nginx (reverse proxy)
- Gunicorn (WSGI server)
- Systemd (process management)

## 📋 Quick Start

### Development (Windows)

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd e-commerce
```

2. **Start the application**
```batch
start.bat
```

This will:
- Start the backend server on http://localhost:5000
- Start the frontend server on http://localhost:5173
- Open the website in your browser

3. **Access the admin panel**
- URL: http://localhost:5173/admin/login
- Username: `admin`
- Password: `admin123`

### Production (Linux/Ubuntu)

1. **Prepare the server**
```bash
sudo apt update
sudo apt install -y nginx python3 python3-pip nodejs npm
```

2. **Run security hardening** (recommended)
```bash
chmod +x security-hardening.sh
sudo ./security-hardening.sh
```

3. **Deploy the application**
```bash
chmod +x start.sh
sudo ./start.sh
```

4. **Configure SSL** (highly recommended)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[PRE-PRODUCTION-CHECKLIST.md](PRE-PRODUCTION-CHECKLIST.md)** - Pre-launch checklist
- **[ADMIN_PANEL_README.md](ADMIN_PANEL_README.md)** - Admin panel documentation

## 🔒 Security

Before deploying to production:

1. ✅ Change default admin password
2. ✅ Generate new SECRET_KEY
3. ✅ Configure SSL/HTTPS
4. ✅ Update CORS origins
5. ✅ Set up firewall (UFW)
6. ✅ Enable Fail2Ban
7. ✅ Configure automated backups

See [PRE-PRODUCTION-CHECKLIST.md](PRE-PRODUCTION-CHECKLIST.md) for complete security checklist.

## 📁 Project Structure

```
e-commerce/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin panel pages
│   │   │   └── ...         # Public pages
│   │   └── App.jsx         # Main app component
│   └── package.json
│
├── backend/                 # Flask backend
│   ├── admin_models.py     # Admin & settings models
│   ├── admin_routes.py     # Admin API routes
│   ├── models.py           # Product & order models
│   ├── routes.py           # Public API routes
│   ├── app.py              # Flask application
│   ├── database.py         # Database configuration
│   ├── uploads/            # Uploaded product images
│   └── requirements.txt
│
├── nginx.conf              # Nginx configuration
├── start.sh                # Production deployment script
├── start.bat               # Development start script (Windows)
├── stop.bat                # Stop script (Windows)
├── security-hardening.sh   # Security setup script
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create `backend/.env`:

```env
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
DEBUG=False
CORS_ORIGINS=https://yourdomain.com
SESSION_COOKIE_SECURE=True
```

See `backend/.env.example` for all available options.

### Nginx Configuration

Edit `nginx.conf` to:
- Update `server_name` to your domain
- Configure SSL certificates
- Adjust upload size limits

## 📊 Admin Panel

Access the admin panel at `/admin/login`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ IMPORTANT:** Change the default password immediately after first login!

### Admin Features:

1. **Dashboard** - View statistics and quick actions
2. **Product Management** - Add, edit, delete products with image upload
3. **Order Management** - View and update order statuses
4. **Website Settings** - Configure company info, SEO, and policies

## 🚀 Deployment

### Option 1: Automated Deployment

```bash
sudo ./start.sh
```

### Option 2: Manual Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔄 Updating the Application

```bash
# Pull latest changes
git pull

# Rebuild frontend
cd frontend
npm run build

# Restart backend
sudo systemctl restart ecommerce-backend

# Reload nginx
sudo systemctl reload nginx
```

## 📝 API Endpoints

### Public API

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/orders` - Create new order
- `GET /api/settings` - Get website settings

### Admin API (Authentication Required)

- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/upload-image` - Upload product image
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/settings` - Get settings
- `PUT /api/admin/settings` - Update settings
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## 🐛 Troubleshooting

### Backend not starting

```bash
# Check logs
sudo journalctl -u ecommerce-backend -n 50

# Test manually
cd /var/www/e-commerce/backend
python app.py
```

### Frontend not loading

```bash
# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Rebuild frontend
cd frontend
npm run build
```

### Database issues

```bash
# Reset database (WARNING: deletes all data)
cd backend
rm toys_v2.db
python app.py  # Recreates database
```

## 📞 Support

For issues or questions:
- Check the documentation in the `docs/` folder
- Review [DEPLOYMENT.md](DEPLOYMENT.md)
- Check [PRE-PRODUCTION-CHECKLIST.md](PRE-PRODUCTION-CHECKLIST.md)

## 📄 License

[Your License Here]

## 👥 Contributors

[Your Name/Team]

---

**Built with ❤️ using React and Flask**
