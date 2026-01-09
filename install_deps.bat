@echo off
echo Installing dependencies for Virtual Art Gallery...

rem Check if node is available
node --version
if %errorlevel% neq 0 (
    echo Node.js is not installed or not in PATH
    pause
    exit /b 1
)

rem Check if npm is available
npm --version
if %errorlevel% neq 0 (
    echo npm is not installed or not in PATH
    pause
    exit /b 1
)

echo Installing dependencies from package.json...
npm install

if %errorlevel% equ 0 (
    echo Dependencies installed successfully!
) else (
    echo Error installing dependencies
)

pause