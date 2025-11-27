# Quick Deploy Guide

## Usage

### Deploy Changes

Whenever you make changes to your code and want to deploy them:

```bash
# On your server
cd /var/www/e-commerce
chmod +x quick-deploy.sh
./quick-deploy.sh
```

This will:
1. Pull latest changes from Git (if applicable)
2. Rebuild the frontend
3. Stop existing backend
4. Start backend with gunicorn on port 5000
5. Reload Nginx

### Stop Backend

```bash
./stop-backend.sh
```

### View Logs

```bash
# Backend logs
tail -f backend/gunicorn.log

# Follow logs in real-time
tail -f backend/gunicorn.log | grep -i error
```

### Check Status

```bash
# Check if backend is running
ps aux | grep gunicorn

# Or check the PID
cat backend/gunicorn.pid
ps -p $(cat backend/gunicorn.pid)

# Test API
curl http://localhost:5000/api/settings
```

## Workflow

### Local Development → Server Deployment

1. **Make changes locally** on Windows
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "your changes"
   git push origin main
   ```

3. **SSH to server**:
   ```bash
   ssh root@91.218.246.100
   ```

4. **Run quick deploy**:
   ```bash
   cd /var/www/e-commerce
   ./quick-deploy.sh
   ```

5. **Verify**: Open `http://91.218.246.100` in browser

## Troubleshooting

### Backend won't start

```bash
# Check logs
cat backend/gunicorn.log

# Check if port 5000 is in use
netstat -tlnp | grep 5000

# Kill any process on port 5000
fuser -k 5000/tcp
```

### Frontend not updating

```bash
# Clear browser cache (Ctrl + Shift + R)
# Or rebuild manually:
cd frontend
npm run build
```

### Permission errors

```bash
# Make scripts executable
chmod +x quick-deploy.sh stop-backend.sh

# Fix ownership
sudo chown -R $USER:$USER /var/www/e-commerce
```

## Files Created

- `quick-deploy.sh` - Main deployment script
- `stop-backend.sh` - Stop backend server
- `backend/gunicorn.log` - Backend logs (created automatically)
- `backend/gunicorn.pid` - Process ID file (created automatically)

## Notes

- Backend runs with 4 workers
- Binds to `0.0.0.0:5000` (accessible from outside)
- Runs in background with nohup
- Logs to `backend/gunicorn.log`
- PID saved to `backend/gunicorn.pid`
