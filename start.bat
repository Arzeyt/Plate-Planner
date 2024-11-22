@echo off
setlocal enabledelayedexpansion

echo ====================================
echo        Plate Planner Startup
echo ====================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Set the working directory to the script's location
cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo This may take a few moments...
    echo.
    call npm install
    if !errorlevel! neq 0 (
        echo.
        echo Error: Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo Starting development server...
echo The application will open in your default browser...
echo.
echo Note: To stop the server, close this window or press Ctrl+C
echo.

:: Wait a moment before opening browser
timeout /t 2 > nul

:: Start browser and server
start http://localhost:5173
npm run dev

endlocal
