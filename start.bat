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

echo Starting Backend Server...
echo ----------------------------------------
start "Backend Server" cmd /k "cd backend && python app.py"

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
