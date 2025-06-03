#!/bin/bash

# Script to build and run Repomix API Docker container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Building Repomix API Docker container...${NC}"

# Build the Docker image
docker build -t repomix-api:latest .

echo -e "${GREEN}✅ Docker image built successfully!${NC}"

# Check if container is already running
if docker ps -a --format 'table {{.Names}}' | grep -q repomix-api; then
    echo -e "${YELLOW}⚠️  Stopping existing container...${NC}"
    docker stop repomix-api || true
    docker rm repomix-api || true
fi

echo -e "${GREEN}🔄 Starting Repomix API container...${NC}"

# Run the container
docker run -d \
    --name repomix-api \
    --restart unless-stopped \
    -p 3001:8080 \
    -e NODE_ENV=production \
    -e PORT=8080 \
    -v /tmp:/tmp \
    repomix-api:latest

echo -e "${GREEN}✅ Container started successfully!${NC}"
echo -e "${GREEN}📍 API is available at: http://localhost:3001${NC}"
echo -e "${GREEN}📖 Swagger documentation: http://localhost:3001/docs${NC}"
echo -e "${GREEN}🏥 Health check: http://localhost:3001/health${NC}"

# Wait a moment and check if container is running
sleep 3
if docker ps --format 'table {{.Names}}\t{{.Status}}' | grep -q repomix-api; then
    echo -e "${GREEN}🎉 Container is running successfully!${NC}"
    
    # Show container logs
    echo -e "${YELLOW}📋 Container logs:${NC}"
    docker logs repomix-api --tail 10
else
    echo -e "${RED}❌ Container failed to start. Check logs:${NC}"
    docker logs repomix-api
    exit 1
fi
