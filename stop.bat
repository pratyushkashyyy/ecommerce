@echo off
REM E-Commerce Website Stop Script for Windows

echo ========================================
echo   Stopping E-Commerce Servers
echo ========================================
echo.

echo Stopping Backend Server (Python)...
taskkill /F /FI "WINDOWTITLE eq Backend Server*" >nul 2>&1
if %errorlevel% equ 0 (
    echo Backend server stopped.
) else (
    echo No backend server found running.
)

echo.
echo Stopping Frontend Server (Node)...
taskkill /F /FI "WINDOWTITLE eq Frontend Server*" >nul 2>&1
if %errorlevel% equ 0 (
    echo Frontend server stopped.
) else (
    echo No frontend server found running.
)

echo.
echo ========================================
echo   All Servers Stopped
echo ========================================
echo.
pause
