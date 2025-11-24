@echo off
REM E-Commerce Website Startup Script for Windows
REM This script starts both frontend and backend servers for development

echo ========================================
echo   E-Commerce Website Startup
echo ========================================
echo.

REM Get the directory where the script is located
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo Checking Backend Virtual Environment...
echo ----------------------------------------
if not exist "backend\venv" (
    echo Creating virtual environment...
    cd backend
    python -m venv venv
    cd ..
    echo Virtual environment created!
)

echo Installing/Updating Backend Dependencies...
cd backend
call venv\Scripts\activate.bat
pip install -r requirements.txt >nul 2>&1
cd ..
echo Backend dependencies ready!

echo.
echo Starting Backend Server...
echo ----------------------------------------
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate.bat && python app.py"

timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
echo ----------------------------------------
start "Frontend Server" cmd /k "cd frontend && npm run dev"

timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo Admin:    http://localhost:5173/admin/login
echo.
echo Press any key to open the website...
pause >nul

start http://localhost:5173

echo.
echo To stop the servers, close the terminal windows.
echo.
