# Repomix API Docker Container

This guide explains how to containerize and run the Repomix API backend using Docker.

## 🚀 Quick Start

### Option 1: Using Make (Recommended)

```bash
# Build and run the container
make run

# Check if it's working
make health

# View logs
make logs

# Stop the container
make stop
```

### Option 2: Using Scripts

```bash
# Run the container
./docker-run.sh

# Stop the container
./docker-stop.sh
```

### Option 3: Using Docker Compose

```bash
# Start the service
docker-compose up -d

# Stop the service
docker-compose down

# View logs
docker-compose logs -f
```

### Option 4: Manual Docker Commands

```bash
# Build the image
docker build -t repomix-api:latest .

# Run the container
docker run -d \
  --name repomix-api \
  --restart unless-stopped \
  -p 3001:8080 \
  -e NODE_ENV=production \
  -e PORT=8080 \
  repomix-api:latest
```

## 📡 API Endpoints

Once the container is running, you can access:

- **API Base URL**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Swagger Documentation**: http://localhost:3001/docs
- **API Documentation**: http://localhost:3001/api-docs
- **OpenAPI Spec**: http://localhost:3001/openapi.json

## 🐳 Container Details

- **Base Image**: `node:23-alpine`
- **Port**: 8080 (mapped to 3001 on host)
- **Health Check**: Automated health monitoring
- **Auto-restart**: Container restarts automatically on failure
- **Multi-stage Build**: Optimized image size

## 📋 Available Make Commands

```bash
make help      # Show all available commands
make build     # Build Docker image
make run       # Build and run container
make stop      # Stop and remove container
make restart   # Restart container
make logs      # Show container logs
make shell     # Open shell in container
make health    # Check container health
make clean     # Remove image and container
```

## 🔧 Environment Variables

- `NODE_ENV`: Set to `production` in container
- `PORT`: Internal port (8080)
- Custom environment variables can be added to docker-compose.yml

## 📊 Monitoring

### Check Container Status
```bash
docker ps --filter name=repomix-api
```

### View Logs
```bash
docker logs repomix-api -f
```

### Check Health
```bash
curl http://localhost:3001/health
```

## 🛠 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker logs repomix-api

# Rebuild image
make clean && make build
```

### Port Already in Use
```bash
# Check what's using port 3001
lsof -i :3001

# Use different port
docker run -p 3002:8080 repomix-api:latest
```

### Performance Issues
```bash
# Check container resources
docker stats repomix-api
```

## 🚢 Production Deployment

### Docker Hub
```bash
# Tag for Docker Hub
docker tag repomix-api:latest username/repomix-api:latest

# Push to registry
docker push username/repomix-api:latest
```

### Environment-specific Configuration
Create different compose files for different environments:
- `docker-compose.yml` (development)
- `docker-compose.prod.yml` (production)
- `docker-compose.staging.yml` (staging)

## 📁 File Structure

```
website/server/
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore           # Files to ignore in build
├── docker-run.sh          # Script to run container
├── docker-stop.sh         # Script to stop container
├── Makefile               # Make commands
└── DOCKER.md              # This documentation
```

## 🔐 Security Considerations

- Container runs as non-root user
- Only necessary ports are exposed
- Environment variables for sensitive data
- Regular base image updates recommended
- Health checks for service monitoring
