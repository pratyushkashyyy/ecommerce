#!/bin/bash

# Pre-Production Security Hardening Script
# Run this script to apply security best practices before deployment

set -e

echo "🔒 E-Commerce Security Hardening Script"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${YELLOW}1. Updating system packages...${NC}"
apt update && apt upgrade -y
echo -e "${GREEN}✅ System updated${NC}"
echo ""

echo -e "${YELLOW}2. Installing security tools...${NC}"
apt install -y ufw fail2ban unattended-upgrades
echo -e "${GREEN}✅ Security tools installed${NC}"
echo ""

echo -e "${YELLOW}3. Configuring firewall (UFW)...${NC}"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable
echo -e "${GREEN}✅ Firewall configured${NC}"
echo ""

echo -e "${YELLOW}4. Configuring Fail2Ban...${NC}"
cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = 22
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
EOF

systemctl enable fail2ban
systemctl restart fail2ban
echo -e "${GREEN}✅ Fail2Ban configured${NC}"
echo ""

echo -e "${YELLOW}5. Enabling automatic security updates...${NC}"
cat > /etc/apt/apt.conf.d/50unattended-upgrades <<EOF
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

cat > /etc/apt/apt.conf.d/20auto-upgrades <<EOF
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF

echo -e "${GREEN}✅ Automatic updates enabled${NC}"
echo ""

echo -e "${YELLOW}6. Securing SSH...${NC}"
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
systemctl restart sshd
echo -e "${GREEN}✅ SSH secured${NC}"
echo ""

echo -e "${YELLOW}7. Setting up log rotation...${NC}"
cat > /etc/logrotate.d/ecommerce <<EOF
/var/www/e-commerce/backend/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
EOF
echo -e "${GREEN}✅ Log rotation configured${NC}"
echo ""

echo -e "${YELLOW}8. Creating backup script...${NC}"
mkdir -p /opt/backups
cat > /opt/backups/backup-ecommerce.sh <<'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_FILE="/var/www/e-commerce/backend/toys_v2.db"
UPLOADS_DIR="/var/www/e-commerce/backend/uploads"

# Create backup directory
mkdir -p "$BACKUP_DIR/db"
mkdir -p "$BACKUP_DIR/uploads"

# Backup database
if [ -f "$DB_FILE" ]; then
    cp "$DB_FILE" "$BACKUP_DIR/db/toys_v2_$DATE.db"
    echo "Database backed up: toys_v2_$DATE.db"
fi

# Backup uploads (weekly)
if [ $(date +%u) -eq 7 ]; then
    tar -czf "$BACKUP_DIR/uploads/uploads_$DATE.tar.gz" -C "$UPLOADS_DIR" .
    echo "Uploads backed up: uploads_$DATE.tar.gz"
fi

# Keep only last 30 days of backups
find "$BACKUP_DIR/db" -name "*.db" -mtime +30 -delete
find "$BACKUP_DIR/uploads" -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /opt/backups/backup-ecommerce.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/backups/backup-ecommerce.sh >> /var/log/ecommerce-backup.log 2>&1") | crontab -

echo -e "${GREEN}✅ Backup script created and scheduled${NC}"
echo ""

echo -e "${YELLOW}9. Generating strong SECRET_KEY...${NC}"
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_hex(32))")
echo -e "${GREEN}✅ New SECRET_KEY generated${NC}"
echo -e "${YELLOW}Add this to your .env file:${NC}"
echo "SECRET_KEY=$SECRET_KEY"
echo ""

echo -e "${YELLOW}10. Setting file permissions...${NC}"
if [ -d "/var/www/e-commerce" ]; then
    chown -R www-data:www-data /var/www/e-commerce
    chmod -R 755 /var/www/e-commerce
    
    # Secure .env file if it exists
    if [ -f "/var/www/e-commerce/backend/.env" ]; then
        chmod 600 /var/www/e-commerce/backend/.env
    fi
    
    echo -e "${GREEN}✅ Permissions set${NC}"
else
    echo -e "${YELLOW}⚠️  /var/www/e-commerce not found, skipping${NC}"
fi
echo ""

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Security hardening complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Create .env file with the SECRET_KEY above"
echo "2. Change default admin password"
echo "3. Configure SSL certificate"
echo "4. Update CORS origins in app.py"
echo "5. Review PRE-PRODUCTION-CHECKLIST.md"
echo ""
echo -e "${YELLOW}Firewall status:${NC}"
ufw status
echo ""
echo -e "${YELLOW}Fail2Ban status:${NC}"
fail2ban-client status
echo ""
