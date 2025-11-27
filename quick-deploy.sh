#!/bin/bash

# Quick Deploy Script for E-Commerce Application
# Run this from your Git repository directory (e.g., ~/e-commerce)
# It will build and deploy to /var/www/e-commerce

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Quick Deployment...${NC}"

# Get the directory where the script is located (your Git repo)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Configuration
DEPLOY_DIR="/var/www/e-commerce"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
BACKEND_DIR="$SCRIPT_DIR/backend"

echo -e "\n${BLUE}📁 Source directory: $SCRIPT_DIR${NC}"
echo -e "${BLUE}📁 Deploy directory: $DEPLOY_DIR${NC}"

# Step 1: Pull latest changes from Git
if [ -d ".git" ]; then
    echo -e "\n${BLUE}📥 Pulling latest changes from Git...${NC}"
    git pull origin main
    echo -e "${GREEN}✅ Git pull complete${NC}"
else
    echo -e "${YELLOW}⚠️  Not a Git repository${NC}"
fi

# Step 2: Build frontend
echo -e "\n${BLUE}🔨 Building frontend...${NC}"
cd "$FRONTEND_DIR"

# Install dependencies if needed
npm install

# Build frontend
npm run build
echo -e "${GREEN}✅ Frontend built successfully${NC}"

# Step 3: Copy files to deployment directory
echo -e "\n${BLUE}📋 Copying files to deployment directory...${NC}"

# Create deployment directory if it doesn't exist
sudo mkdir -p "$DEPLOY_DIR/frontend/dist"
sudo mkdir -p "$DEPLOY_DIR/backend"

# Copy frontend build
echo "Copying frontend..."
sudo cp -r "$FRONTEND_DIR/dist"/* "$DEPLOY_DIR/frontend/dist/"

# Copy backend files
echo "Copying backend..."
sudo cp -r "$BACKEND_DIR"/* "$DEPLOY_DIR/backend/"

# Copy nginx config if exists
if [ -f "$SCRIPT_DIR/nginx.conf" ]; then
    sudo cp "$SCRIPT_DIR/nginx.conf" /etc/nginx/sites-available/e-commerce
fi

echo -e "${GREEN}✅ Files copied${NC}"

# Step 4: Set up backend virtual environment in deployment directory
echo -e "\n${BLUE}🐍 Setting up backend in deployment directory...${NC}"
cd "$DEPLOY_DIR/backend"

# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate and install dependencies
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

echo -e "${GREEN}✅ Backend dependencies installed${NC}"

# Step 5: Stop existing backend
echo -e "\n${BLUE}🛑 Stopping existing backend...${NC}"
pkill -f "gunicorn.*app:app" || echo "No existing gunicorn process found"
sleep 2

# Step 6: Start backend with nohup
echo -e "\n${BLUE}🚀 Starting backend with gunicorn...${NC}"
cd "$DEPLOY_DIR/backend"
source venv/bin/activate

nohup gunicorn --workers 4 --bind 0.0.0.0:5000 app:app > gunicorn.log 2>&1 &

# Get the PID
GUNICORN_PID=$!
echo $GUNICORN_PID > gunicorn.pid

# Wait for it to start
sleep 3

# Check if it's running
if ps -p $GUNICORN_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend started successfully (PID: $GUNICORN_PID)${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    echo "Check $DEPLOY_DIR/backend/gunicorn.log for errors"
    exit 1
fi

# Step 7: Reload Nginx
if command -v nginx &> /dev/null; then
    echo -e "\n${BLUE}🌐 Reloading Nginx...${NC}"
    sudo nginx -t && sudo systemctl reload nginx
    echo -e "${GREEN}✅ Nginx reloaded${NC}"
fi

# Step 8: Verify deployment
echo -e "\n${BLUE}🔍 Verifying deployment...${NC}"
sleep 2

# Test backend
if curl -f http://localhost:5000/api/settings > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is responding${NC}"
else
    echo -e "${YELLOW}⚠️  Backend might not be responding yet${NC}"
    echo "Check logs: tail -f $DEPLOY_DIR/backend/gunicorn.log"
fi

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Backend PID: $GUNICORN_PID${NC}"
echo -e "${BLUE}Backend logs: $DEPLOY_DIR/backend/gunicorn.log${NC}"
echo -e "${BLUE}Website: http://your-server-ip${NC}"
echo ""
echo -e "${YELLOW}📝 Useful commands:${NC}"
echo -e "  - View logs: tail -f $DEPLOY_DIR/backend/gunicorn.log"
echo -e "  - Stop backend: kill \$(cat $DEPLOY_DIR/backend/gunicorn.pid)"
echo -e "  - Check status: ps -p \$(cat $DEPLOY_DIR/backend/gunicorn.pid)"
