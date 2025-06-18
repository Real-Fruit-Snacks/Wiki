---
title: Docker Fundamentals
tags: [docker, devops, containers, deployment]
created: 2024-01-18
author: DevOps Team
description: Essential Docker concepts and practical examples
updated: 2024-02-22
category: technical
status: published
---

# Docker Fundamentals

## Introduction to Containers

Docker containers are lightweight, standalone, executable packages that include everything needed to run software:
- Code
- Runtime
- System tools
- Libraries
- Settings

### Docker vs Virtual Machines

| Feature | Docker | Virtual Machine |
|---------|---------|-----------------|
| Size | MB | GB |
| Startup | Seconds | Minutes |
| Performance | Near native | Overhead |
| Isolation | Process level | Hardware level |

## Essential Docker Commands

### Image Management

```bash
# Pull an image
docker pull nginx:latest

# List images
docker images

# Build an image
docker build -t myapp:1.0 .

# Tag an image
docker tag myapp:1.0 myregistry/myapp:1.0

# Push to registry
docker push myregistry/myapp:1.0

# Remove an image
docker rmi myapp:1.0
```

### Container Operations

```bash
# Run a container
docker run -d --name webserver -p 80:80 nginx

# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop webserver

# Start a container
docker start webserver

# Remove a container
docker rm webserver

# Execute command in running container
docker exec -it webserver bash

# View logs
docker logs -f webserver
```

## Dockerfile Best Practices

### Multi-stage Build Example

```dockerfile
# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:16-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

USER nodejs
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Python Application

```dockerfile
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_HOME=/app

# Create app directory
WORKDIR $APP_HOME

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -u 1001 appuser && chown -R appuser:appuser $APP_HOME
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/health')"

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "app:application"]
```

## Docker Compose

### Web Application Stack

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
      - redis
    networks:
      - app-network
    volumes:
      - ./uploads:/app/uploads
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - web
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
```

### Development Environment

```yaml
version: '3.8'

services:
  dev:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - node_modules:/app/node_modules
    ports:
      - "3000:3000"
      - "9229:9229"  # Node.js debugger
    environment:
      - NODE_ENV=development
    command: npm run dev

volumes:
  node_modules:
```

## Container Networking

```bash
# Create custom network
docker network create myapp-network

# Run container in network
docker run -d --name app1 --network myapp-network myapp

# Connect existing container to network
docker network connect myapp-network existing-container

# Inspect network
docker network inspect myapp-network

# List networks
docker network ls
```

## Volume Management

```bash
# Create named volume
docker volume create app-data

# Run with volume
docker run -v app-data:/data myapp

# Bind mount (development)
docker run -v $(pwd):/app myapp

# List volumes
docker volume ls

# Inspect volume
docker volume inspect app-data

# Remove unused volumes
docker volume prune
```

## Security Best Practices

### 1. Non-root User
```dockerfile
RUN adduser -D -u 1001 appuser
USER appuser
```

### 2. Minimal Base Images
```dockerfile
# Use alpine or distroless
FROM gcr.io/distroless/nodejs:16
```

### 3. Multi-stage Builds
- Separate build and runtime
- Reduce attack surface
- Smaller images

### 4. Scan for Vulnerabilities
```bash
# Using Docker Scout
docker scout quickview myapp:latest

# Using Trivy
trivy image myapp:latest
```

### 5. Secret Management
```yaml
# docker-compose with secrets
version: '3.8'
services:
  app:
    image: myapp
    secrets:
      - db_password
      
secrets:
  db_password:
    file: ./secrets/db_password.txt
```

## Monitoring and Logging

### Container Stats
```bash
# Real-time stats
docker stats

# One-time stats
docker stats --no-stream
```

### Logging Drivers
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/health || exit 1
```

## Useful Tips

1. **Clean up resources**
   ```bash
   docker system prune -a
   ```

2. **Export/Import containers**
   ```bash
   docker export container > backup.tar
   docker import backup.tar
   ```

3. **Save/Load images**
   ```bash
   docker save -o myapp.tar myapp:latest
   docker load -i myapp.tar
   ```

4. **Debug containers**
   ```bash
   docker run -it --rm --pid=container:myapp --cap-add SYS_PTRACE alpine sh
   ```

5. **Resource limits**
   ```bash
   docker run -m 512m --cpus="1.5" myapp
   ```