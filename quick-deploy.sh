#!/bin/bash

# Quick Deploy Script for E-Commerce Application
# This script rebuilds frontend and restarts backend with gunicorn

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Quick Deployment...${NC}"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Configuration
FRONTEND_DIR="$SCRIPT_DIR/frontend"
BACKEND_DIR="$SCRIPT_DIR/backend"
DEPLOY_DIR="/var/www/e-commerce"

echo -e "\n${BLUE}📁 Working directory: $SCRIPT_DIR${NC}"

# Step 1: Pull latest changes (if in git repo)
if [ -d ".git" ]; then
    echo -e "\n${BLUE}📥 Pulling latest changes from Git...${NC}"
    git pull origin main || echo "Git pull failed or not needed"
fi

# Step 2: Build frontend
echo -e "\n${BLUE}🔨 Building frontend...${NC}"
cd "$FRONTEND_DIR"

# Install dependencies if package.json changed
if [ -f "package.json" ]; then
    npm install
fi

# Build frontend
npm run build
echo -e "${GREEN}✅ Frontend built successfully${NC}"

# Step 3: Copy frontend to deployment directory (if different)
if [ "$SCRIPT_DIR" != "$DEPLOY_DIR" ] && [ -d "$DEPLOY_DIR" ]; then
    echo -e "\n${BLUE}📋 Copying frontend to deployment directory...${NC}"
    sudo mkdir -p "$DEPLOY_DIR/frontend/dist"
    sudo cp -r dist/* "$DEPLOY_DIR/frontend/dist/"
    echo -e "${GREEN}✅ Frontend copied${NC}"
fi

# Step 4: Restart backend with gunicorn
echo -e "\n${BLUE}🐍 Restarting backend...${NC}"
cd "$BACKEND_DIR"

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo -e "${YELLOW}⚠️  No virtual environment found, creating one...${NC}"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    pip install gunicorn
fi

# Kill existing gunicorn processes
echo "Stopping existing backend processes..."
pkill -f "gunicorn.*app:app" || echo "No existing gunicorn process found"
sleep 2

# Start gunicorn with nohup
echo "Starting gunicorn on port 5000..."
nohup gunicorn --workers 4 --bind 0.0.0.0:5000 app:app > gunicorn.log 2>&1 &

# Get the PID
GUNICORN_PID=$!
echo $GUNICORN_PID > gunicorn.pid

# Wait a moment for it to start
sleep 3

# Check if it's running
if ps -p $GUNICORN_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend started successfully (PID: $GUNICORN_PID)${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    echo "Check gunicorn.log for errors"
    exit 1
fi

# Step 5: Reload Nginx (if configured)
if command -v nginx &> /dev/null; then
    echo -e "\n${BLUE}🌐 Reloading Nginx...${NC}"
    sudo nginx -t && sudo systemctl reload nginx || echo "Nginx reload failed"
fi

# Step 6: Verify deployment
echo -e "\n${BLUE}🔍 Verifying deployment...${NC}"
sleep 2

# Test backend
if curl -f http://localhost:5000/api/settings > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is responding${NC}"
else
    echo -e "${YELLOW}⚠️  Backend might not be responding yet${NC}"
fi

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Backend PID: $GUNICORN_PID${NC}"
echo -e "${BLUE}Backend logs: $BACKEND_DIR/gunicorn.log${NC}"
echo ""
echo -e "${YELLOW}📝 Useful commands:${NC}"
echo -e "  - View logs: tail -f $BACKEND_DIR/gunicorn.log"
echo -e "  - Stop backend: kill \$(cat $BACKEND_DIR/gunicorn.pid)"
echo -e "  - Check status: ps -p \$(cat $BACKEND_DIR/gunicorn.pid)"
