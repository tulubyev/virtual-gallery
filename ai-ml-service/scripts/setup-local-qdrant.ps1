# PowerShell script to setup Qdrant locally on Windows

Write-Host "🚀 Setting up Qdrant locally on Windows..." -ForegroundColor Green

# Check if Docker is installed
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found! Please install Docker Desktop first." -ForegroundColor Red
    Write-Host "📥 Download from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

# Create qdrant directory
$qdrantDir = ".\qdrant-local"
if (!(Test-Path $qdrantDir)) {
    New-Item -ItemType Directory -Path $qdrantDir | Out-Null
    Write-Host "📁 Created directory: $qdrantDir" -ForegroundColor Blue
}

# Create docker-compose.yml for local Qdrant
$dockerCompose = @"
version: '3.8'
services:
  qdrant:
    image: qdrant/qdrant:v1.7.4
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - ./qdrant_data:/qdrant/storage
    environment:
      - QDRANT__SERVICE__HTTP_PORT=6333
      - QDRANT__SERVICE__GRPC_PORT=6334
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:6333/health"]
      interval: 30s
      timeout: 10s
      retries: 3
"@

Set-Content -Path "$qdrantDir\docker-compose.yml" -Value $dockerCompose
Write-Host "📝 Created docker-compose.yml" -ForegroundColor Blue

# Navigate to qdrant directory and start
Set-Location $qdrantDir
Write-Host "📂 Starting Qdrant..." -ForegroundColor Yellow
docker-compose up -d

# Wait for Qdrant to start
Start-Sleep -Seconds 10

# Test connection
try {
    $response = Invoke-WebRequest -Uri "http://localhost:6333/health" -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Qdrant is running successfully!" -ForegroundColor Green
        Write-Host "🌐 Dashboard: http://localhost:6333/dashboard" -ForegroundColor Cyan
        Write-Host "📊 REST API: http://localhost:6333" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Qdrant health check failed!" -ForegroundColor Red
    Write-Host "🔍 Check logs: docker-compose logs qdrant" -ForegroundColor Yellow
}

# Create test script
$testScript = @'
# Test Qdrant connection
Write-Host "Testing Qdrant connection..." -ForegroundColor Blue

try {
    # Install qdrant-client if not installed
    pip install qdrant-client

    # Test Python connection
    python -c "
from qdrant_client import QdrantClient
client = QdrantClient('localhost', port=6333)
collections = client.get_collections()
print('✅ Python client connected successfully!')
print('Collections:', len(collections.collections))
"
} catch {
    Write-Host "❌ Python test failed" -ForegroundColor Red
}

Write-Host "📋 Useful commands:" -ForegroundColor Cyan
Write-Host "  Start:  docker-compose up -d" -ForegroundColor White
Write-Host "  Stop:   docker-compose down" -ForegroundColor White
Write-Host "  Logs:   docker-compose logs -f qdrant" -ForegroundColor White
Write-Host "  Reset:  docker-compose down -v" -ForegroundColor White
'@

Set-Content -Path "$qdrantDir\test-qdrant.ps1" -Value $testScript
Write-Host "📝 Created test script: test-qdrant.ps1" -ForegroundColor Blue

# Go back to original directory
Set-Location ..

Write-Host "" -ForegroundColor White
Write-Host "🎯 Qdrant local setup complete!" -ForegroundColor Green
Write-Host "📂 Location: $qdrantDir" -ForegroundColor Cyan
Write-Host "🌐 URL: http://localhost:6333" -ForegroundColor Cyan
Write-Host "🧪 Test: .\$qdrantDir\test-qdrant.ps1" -ForegroundColor Cyan