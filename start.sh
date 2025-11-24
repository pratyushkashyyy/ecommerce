#!/bin/bash

# E-Commerce Website Startup Script
# This script builds the frontend, starts the backend, and configures nginx

set -e  # Exit on error

echo "🚀 Starting E-Commerce Website Deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Configuration
FRONTEND_DIR="$SCRIPT_DIR/frontend"
BACKEND_DIR="$SCRIPT_DIR/backend"
NGINX_CONF="$SCRIPT_DIR/nginx.conf"
DEPLOY_DIR="/var/www/e-commerce"

echo -e "${BLUE}📁 Working directory: $SCRIPT_DIR${NC}"

# Step 1: Install backend dependencies
echo -e "\n${BLUE}📦 Installing backend dependencies...${NC}"
cd "$BACKEND_DIR"
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ requirements.txt not found${NC}"
    exit 1
fi

# Step 2: Build frontend
echo -e "\n${BLUE}🔨 Building frontend...${NC}"
cd "$FRONTEND_DIR"
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi
npm run build
echo -e "${GREEN}✅ Frontend built successfully${NC}"

# Step 3: Create deployment directory
echo -e "\n${BLUE}📂 Setting up deployment directory...${NC}"
sudo mkdir -p "$DEPLOY_DIR/frontend"
sudo mkdir -p "$DEPLOY_DIR/backend"

# Step 4: Copy files to deployment directory
echo -e "\n${BLUE}📋 Copying files to deployment directory...${NC}"
sudo cp -r "$FRONTEND_DIR/dist" "$DEPLOY_DIR/frontend/"
sudo cp -r "$BACKEND_DIR"/* "$DEPLOY_DIR/backend/"
echo -e "${GREEN}✅ Files copied${NC}"

# Step 5: Set permissions
echo -e "\n${BLUE}🔐 Setting permissions...${NC}"
sudo chown -R www-data:www-data "$DEPLOY_DIR"
sudo chmod -R 755 "$DEPLOY_DIR"
echo -e "${GREEN}✅ Permissions set${NC}"

# Step 6: Configure nginx
echo -e "\n${BLUE}🌐 Configuring nginx...${NC}"
if [ -f "$NGINX_CONF" ]; then
    sudo cp "$NGINX_CONF" /etc/nginx/sites-available/e-commerce
    sudo ln -sf /etc/nginx/sites-available/e-commerce /etc/nginx/sites-enabled/
    
    # Test nginx configuration
    sudo nginx -t
    if [ $? -eq 0 ]; then
        sudo systemctl reload nginx
        echo -e "${GREEN}✅ Nginx configured and reloaded${NC}"
    else
        echo -e "${RED}❌ Nginx configuration test failed${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ nginx.conf not found${NC}"
    exit 1
fi

# Step 7: Start backend with gunicorn
echo -e "\n${BLUE}🐍 Starting backend server...${NC}"
cd "$DEPLOY_DIR/backend"

# Install gunicorn if not present
pip install gunicorn

# Create systemd service file
sudo tee /etc/systemd/system/ecommerce-backend.service > /dev/null <<EOF
[Unit]
Description=E-Commerce Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=$DEPLOY_DIR/backend
Environment="PATH=$DEPLOY_DIR/backend/venv/bin"
ExecStart=/usr/bin/gunicorn --workers 4 --bind 127.0.0.1:5000 app:app

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and start service
sudo systemctl daemon-reload
sudo systemctl enable ecommerce-backend
sudo systemctl restart ecommerce-backend

echo -e "${GREEN}✅ Backend service started${NC}"

# Step 8: Check status
echo -e "\n${BLUE}📊 Checking service status...${NC}"
sudo systemctl status ecommerce-backend --no-pager

echo -e "\n${GREEN}✅ Deployment complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🌐 Website is now running!${NC}"
echo -e "${BLUE}Frontend: http://localhost${NC}"
echo -e "${BLUE}Backend API: http://localhost/api${NC}"
echo -e "${BLUE}Admin Panel: http://localhost/admin/login${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "\n${BLUE}📝 Useful commands:${NC}"
echo -e "  - View backend logs: sudo journalctl -u ecommerce-backend -f"
echo -e "  - Restart backend: sudo systemctl restart ecommerce-backend"
echo -e "  - Restart nginx: sudo systemctl restart nginx"
echo -e "  - Stop all: sudo systemctl stop ecommerce-backend nginx"
