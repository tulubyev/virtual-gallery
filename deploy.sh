#!/bash
# Deployment script for Ubuntu
echo "Starting Virtual Art Gallery Deployment..."

# 1. Update and install Docker
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# 2. Build and start services
docker-compose up -d --build

echo "Deployment complete! App is running on port 5000"
