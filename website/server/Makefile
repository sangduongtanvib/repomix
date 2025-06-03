# Makefile for Repomix API Docker management

.PHONY: help build run stop logs shell clean restart health

# Default target
help:
	@echo "Repomix API Docker Management"
	@echo "============================="
	@echo ""
	@echo "Available commands:"
	@echo "  make build    - Build Docker image"
	@echo "  make run      - Build and run container"
	@echo "  make stop     - Stop and remove container"
	@echo "  make restart  - Restart container"
	@echo "  make logs     - Show container logs"
	@echo "  make shell    - Open shell in container"
	@echo "  make health   - Check container health"
	@echo "  make clean    - Remove image and container"
	@echo ""

# Build Docker image
build:
	@echo "🚀 Building Repomix API Docker image..."
	docker build -t repomix-api:latest .
	@echo "✅ Image built successfully!"

# Run container
run:
	@echo "🔄 Starting Repomix API container..."
	@chmod +x docker-run.sh
	./docker-run.sh

# Stop container
stop:
	@echo "🛑 Stopping Repomix API container..."
	@chmod +x docker-stop.sh
	./docker-stop.sh

# Restart container
restart: stop run

# Show logs
logs:
	@echo "📋 Container logs:"
	docker logs repomix-api -f

# Open shell in container
shell:
	@echo "🐚 Opening shell in container..."
	docker exec -it repomix-api /bin/sh

# Check health
health:
	@echo "🏥 Checking container health..."
	@curl -f http://localhost:3001/health && echo "✅ API is healthy!" || echo "❌ API is not responding"

# Clean up everything
clean:
	@echo "🧹 Cleaning up Docker resources..."
	-docker stop repomix-api
	-docker rm repomix-api
	-docker rmi repomix-api:latest
	@echo "✅ Cleanup complete!"

# Docker compose commands
compose-up:
	@echo "🚀 Starting with Docker Compose..."
	docker-compose up -d

compose-down:
	@echo "🛑 Stopping Docker Compose..."
	docker-compose down

compose-logs:
	@echo "📋 Docker Compose logs:"
	docker-compose logs -f
