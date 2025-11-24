# E-Commerce Application Setup Guide

## 🚀 Quick Start

### Windows
```bash
# Simply run the startup script
start.bat
```

### Linux/Ubuntu (Production Deployment)
```bash
# Make the script executable
chmod +x start.sh

# Run the deployment script
sudo ./start.sh
```

---

## 📦 Virtual Environment Setup

Both startup scripts now automatically create and manage Python virtual environments to isolate project dependencies.

### What Happens Automatically:

#### Windows (`start.bat`)
1. **Checks** if `backend/venv` exists
2. **Creates** virtual environment if missing using `python -m venv venv`
3. **Activates** the virtual environment
4. **Installs/Updates** all dependencies from `requirements.txt`
5. **Starts** the backend server using the venv Python

#### Linux (`start.sh`)
1. **Creates** virtual environment in `backend/venv` if missing
2. **Activates** the virtual environment
3. **Installs** backend dependencies
4. **Builds** the frontend
5. **Deploys** to `/var/www/e-commerce`
6. **Creates** a systemd service using the venv's gunicorn
7. **Configures** nginx as reverse proxy

---

## 🔧 Manual Virtual Environment Setup

If you need to manually manage the virtual environment:

### Create Virtual Environment
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
```

### Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Deactivate Virtual Environment
```bash
deactivate
```

---

## 📁 Project Structure

```
e-commerce/
├── backend/
│   ├── venv/              # Virtual environment (auto-created, gitignored)
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   └── .gitignore         # Excludes venv/
├── frontend/
│   ├── node_modules/      # NPM dependencies
│   ├── src/               # React source code
│   └── package.json       # NPM dependencies
├── start.bat              # Windows startup script
├── start.sh               # Linux deployment script
└── stop.bat               # Windows shutdown script
```

---

## 🌐 Access Points

After starting the application:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin/login

---

## ✅ Benefits of Virtual Environment

1. **Isolation**: Dependencies don't conflict with other Python projects
2. **Reproducibility**: Exact same environment on different machines
3. **Clean**: Easy to delete and recreate if issues arise
4. **Best Practice**: Industry standard for Python development

---

## 🛠️ Troubleshooting

### Virtual Environment Issues

**Problem**: Virtual environment won't activate
```bash
# Delete and recreate
cd backend
rm -rf venv  # Linux/Mac
rmdir /s venv  # Windows
python -m venv venv
```

**Problem**: Dependencies not installing
```bash
# Activate venv and upgrade pip
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate.bat  # Windows
pip install --upgrade pip
pip install -r requirements.txt
```

**Problem**: Wrong Python version
```bash
# Specify Python version explicitly
python3.11 -m venv venv  # Linux/Mac
py -3.11 -m venv venv    # Windows
```

---

## 📝 Notes

- The virtual environment folder (`venv/`) is automatically excluded from git via `.gitignore`
- First run will take longer as it creates the venv and installs dependencies
- Subsequent runs will be faster as the venv already exists
- Dependencies are checked and updated on each run

---

## 🔄 Updating Dependencies

To add new Python packages:

1. Activate the virtual environment
2. Install the package: `pip install package-name`
3. Update requirements.txt: `pip freeze > requirements.txt`
4. Commit the updated requirements.txt

---

## 🚨 Important

- **Never commit** the `venv/` folder to git
- **Always use** the virtual environment when developing
- **Update** `requirements.txt` when adding new dependencies
- **Test** the startup scripts after making changes
