---
title: "Variable Manager - Programming Examples"
tags: ["examples", "variables", "programming", "configuration"]
created: 2024-01-15
modified: 2024-01-15
---

# Variable Manager - Programming Examples

This note demonstrates how to use the Variable Manager with programming code blocks. Click the **$** button in the header to open the Variable Manager panel.

## 🐍 Python Configuration

### Database Connection
```python
import sqlite3
import os

# Database configuration
DB_HOST = "$DatabaseHost"
DB_PORT = $DatabasePort
DB_NAME = "$DatabaseName"
DB_USER = "$DatabaseUser"
DB_PASSWORD = "$DatabasePassword"

# Connection string
connection_string = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# SQLite fallback
sqlite_path = os.path.join("$ProjectPath", "data", f"{DB_NAME}.db")
```

### API Configuration
```python
# API Settings
API_BASE_URL = "$ApiBaseUrl"
API_VERSION = "$ApiVersion"
API_KEY = "$ApiKey"
TIMEOUT_SECONDS = $RequestTimeout

# Request headers
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "User-Agent": f"MyApp/{API_VERSION}"
}

# Full endpoint URL
endpoint = f"{API_BASE_URL}/v{API_VERSION}/users"
```

## 🌐 JavaScript/Node.js

### Environment Configuration
```javascript
// Environment variables
const config = {
    NODE_ENV: "$Environment",
    PORT: $ServerPort,
    HOST: "$ServerHost",
    
    // Database
    DB_URL: "$DatabaseUrl",
    DB_POOL_SIZE: $DatabasePoolSize,
    
    // Security
    JWT_SECRET: "$JwtSecret",
    JWT_EXPIRY: "$JwtExpiry",
    
    // External APIs
    STRIPE_KEY: "$StripeApiKey",
    SENDGRID_KEY: "$SendgridApiKey"
};

// Server startup
const express = require('express');
const app = express();

app.listen(config.PORT, config.HOST, () => {
    console.log(`Server running on ${config.HOST}:${config.PORT} in ${config.NODE_ENV} mode`);
});
```

## 🐳 Docker Configuration

### Dockerfile
```dockerfile
FROM node:$NodeVersion-alpine

# Set working directory
WORKDIR /app

# Environment
ENV NODE_ENV=$Environment
ENV PORT=$ContainerPort

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

# Create user
RUN addgroup -g $UserId -S appgroup && \
    adduser -u $UserId -S appuser -G appgroup

# Switch to user
USER appuser

# Expose port
EXPOSE $ContainerPort

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$ContainerPort/health || exit 1

# Start application
CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "$HostPort:$ContainerPort"
    environment:
      - NODE_ENV=$Environment
      - DATABASE_URL=$DatabaseUrl
      - REDIS_URL=$RedisUrl
    volumes:
      - $DataVolume:/app/data
    depends_on:
      - database
      - redis

  database:
    image: postgres:$PostgresVersion
    environment:
      - POSTGRES_DB=$DatabaseName
      - POSTGRES_USER=$DatabaseUser
      - POSTGRES_PASSWORD=$DatabasePassword
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "$PostgresPort:5432"

  redis:
    image: redis:$RedisVersion-alpine
    ports:
      - "$RedisPort:6379"
    command: redis-server --requirepass $RedisPassword

volumes:
  postgres_data:
```

## 🔧 Shell Scripts

### Deployment Script
```bash
#!/bin/bash

# Deployment configuration
PROJECT_NAME="$ProjectName"
ENVIRONMENT="$Environment"
VERSION="$Version"
DEPLOY_USER="$DeployUser"
DEPLOY_HOST="$DeployHost"
DEPLOY_PATH="$DeployPath"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Deploying ${PROJECT_NAME} v${VERSION} to ${ENVIRONMENT}${NC}"

# Build application
echo "📦 Building application..."
npm run build:$Environment

# Create deployment archive
ARCHIVE_NAME="${PROJECT_NAME}-${VERSION}-${ENVIRONMENT}.tar.gz"
tar -czf ${ARCHIVE_NAME} dist/ package.json

# Upload to server
echo "📤 Uploading to ${DEPLOY_HOST}..."
scp ${ARCHIVE_NAME} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/

# Deploy on server
ssh ${DEPLOY_USER}@${DEPLOY_HOST} << EOF
    cd ${DEPLOY_PATH}
    tar -xzf ${ARCHIVE_NAME}
    pm2 restart ${PROJECT_NAME}-${ENVIRONMENT}
    pm2 save
EOF

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
```

## 💡 Usage Tips

1. **Open Variable Manager**: Click the **$** button in the header
2. **Set Values**: Enter values for each variable (they persist per note)
3. **Refresh Variables**: Click 🔄 to scan for new variables
4. **Reset Values**: Click 🗑️ to clear all variable values
5. **Real-time Updates**: Code blocks update instantly as you type

## 🎯 Try These Variables

**Database Settings:**
- `DatabaseHost`: localhost, production-db.company.com
- `DatabasePort`: 5432, 3306
- `DatabaseName`: myapp_dev, myapp_prod
- `DatabaseUser`: developer, app_user

**API Configuration:**
- `ApiBaseUrl`: http://localhost:3000, https://api.company.com
- `ApiVersion`: v1, v2, latest
- `RequestTimeout`: 5000, 30000

**Container Settings:**
- `NodeVersion`: 18, 20, latest
- `ContainerPort`: 3000, 8080
- `Environment`: development, staging, production 