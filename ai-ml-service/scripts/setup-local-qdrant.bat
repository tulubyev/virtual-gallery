@echo off
REM Batch script to setup Qdrant locally on Windows

echo 🚀 Setting up Qdrant locally on Windows...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker not found! Please install Docker Desktop first.
    echo 📥 Download from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
) else (
    echo ✅ Docker found
)

REM Create qdrant directory
if not exist "qdrant-local" mkdir qdrant-local
cd qdrant-local
echo 📁 Created directory: qdrant-local

REM Create docker-compose.yml
echo version: '3.8' > docker-compose.yml
echo. >> docker-compose.yml
echo services: >> docker-compose.yml
echo   qdrant: >> docker-compose.yml
echo     image: qdrant/qdrant:v1.7.4 >> docker-compose.yml
echo     ports: >> docker-compose.yml
echo       - "6333:6333" >> docker-compose.yml
echo       - "6334:6334" >> docker-compose.yml
echo     volumes: >> docker-compose.yml
echo       - ./qdrant_data:/qdrant/storage >> docker-compose.yml
echo     environment: >> docker-compose.yml
echo       - QDRANT__SERVICE__HTTP_PORT=6333 >> docker-compose.yml
echo       - QDRANT__SERVICE__GRPC_PORT=6334 >> docker-compose.yml
echo     restart: unless-stopped >> docker-compose.yml
echo     healthcheck: >> docker-compose.yml
echo       test: ["CMD", "curl", "-f", "http://localhost:6333/health"] >> docker-compose.yml
echo       interval: 30s >> docker-compose.yml
echo       timeout: 10s >> docker-compose.yml
echo       retries: 3 >> docker-compose.yml

echo 📝 Created docker-compose.yml

REM Start Qdrant
echo 📂 Starting Qdrant...
docker-compose up -d

REM Wait for startup
timeout /t 10 /nobreak >nul

REM Test connection
curl -f http://localhost:6333/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Qdrant health check failed!
    echo 🔍 Check logs: docker-compose logs qdrant
) else (
    echo ✅ Qdrant is running successfully!
    echo 🌐 Dashboard: http://localhost:6333/dashboard
    echo 📊 REST API: http://localhost:6333
)

REM Create test batch file
echo @echo off > test-qdrant.bat
echo REM Test Qdrant connection >> test-qdrant.bat
echo echo Testing Qdrant connection... >> test-qdrant.bat
echo python -c " >> test-qdrant.bat
echo from qdrant_client import QdrantClient >> test-qdrant.bat
echo client = QdrantClient('localhost', port=6333) >> test-qdrant.bat
echo collections = client.get_collections() >> test-qdrant.bat
echo print('✅ Python client connected successfully!') >> test-qdrant.bat
echo print('Collections:', len(collections.collections)) >> test-qdrant.bat
echo " >> test-qdrant.bat
echo echo 📋 Useful commands: >> test-qdrant.bat
echo echo   Start:  docker-compose up -d >> test-qdrant.bat
echo echo   Stop:   docker-compose down >> test-qdrant.bat
echo echo   Logs:   docker-compose logs -f qdrant >> test-qdrant.bat
echo echo   Reset:  docker-compose down -v >> test-qdrant.bat
echo pause >> test-qdrant.bat

echo 📝 Created test script: test-qdrant.bat

REM Go back
cd ..

echo.
echo 🎯 Qdrant local setup complete!
echo 📂 Location: qdrant-local
echo 🌐 URL: http://localhost:6333
echo 🧪 Test: qdrant-local\test-qdrant.bat
pause