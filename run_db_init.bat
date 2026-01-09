@echo off
echo Running database initialization for Virtual Art Gallery...

rem Check if node is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed or not in PATH
    pause
    exit /b 1
)

rem Run the database initialization
echo Starting database initialization...
node src/database/initialize.js

if %errorlevel% equ 0 (
    echo Database initialization completed successfully!
) else (
    echo Error during database initialization
    echo Checking if modules are installed...
    if not exist node_modules (
        echo node_modules directory not found. Please run install_deps.bat first.
    )
)

pause