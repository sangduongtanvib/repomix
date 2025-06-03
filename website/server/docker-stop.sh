#!/bin/bash

# Script to stop Repomix API Docker container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🛑 Stopping Repomix API container...${NC}"

# Stop the container
if docker ps --format 'table {{.Names}}' | grep -q repomix-api; then
    docker stop repomix-api
    echo -e "${GREEN}✅ Container stopped successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Container is not running${NC}"
fi

# Remove the container
if docker ps -a --format 'table {{.Names}}' | grep -q repomix-api; then
    docker rm repomix-api
    echo -e "${GREEN}✅ Container removed successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Container not found${NC}"
fi
