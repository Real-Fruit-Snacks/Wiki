---
title: Microservices Architecture Guide
tags: [microservices, architecture, docker, kubernetes, advanced]
created: 2024-02-12
author: Architecture Team
description: Comprehensive guide to designing and implementing microservices
updated: 2024-03-10
category: tutorials
status: published
---

# Microservices Architecture Guide

## Introduction

Microservices architecture is a design pattern where applications are structured as a collection of loosely coupled, independently deployable services. Each service is responsible for a specific business capability.

### Monolith vs Microservices

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Deployment | Single unit | Independent services |
| Scalability | Vertical | Horizontal per service |
| Technology | Single stack | Polyglot |
| Team Structure | Centralized | Decentralized |
| Complexity | Lower initial | Higher operational |

## Core Principles

### 1. Single Responsibility
Each microservice should handle one business capability.

### 2. Autonomous Teams
Teams own their services end-to-end.

### 3. Decentralized Data
Each service manages its own data.

### 4. Smart Endpoints, Dumb Pipes
Communication through simple protocols (REST, messaging).

### 5. Design for Failure
Services should handle failures gracefully.

## Architecture Patterns

### API Gateway Pattern

```typescript
// API Gateway implementation with Express
import express from 'express';
import httpProxy from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Service routing
const services = {
  users: 'http://users-service:3001',
  products: 'http://products-service:3002',
  orders: 'http://orders-service:3003',
};

Object.keys(services).forEach(path => {
  app.use(
    `/${path}`,
    authenticate,
    httpProxy({
      target: services[path],
      changeOrigin: true,
      onError: (err, req, res) => {
        res.status(503).json({ error: 'Service unavailable' });
      }
    })
  );
});

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
```

### Service Discovery

```yaml
# Consul service registration
services:
  - name: users-service
    port: 3001
    tags:
      - primary
      - v1
    check:
      http: http://localhost:3001/health
      interval: 10s
      timeout: 5s
```

```javascript
// Service discovery client
import Consul from 'consul';

const consul = new Consul({
  host: 'consul',
  port: 8500,
});

class ServiceDiscovery {
  async getService(serviceName) {
    try {
      const services = await consul.health.service(serviceName);
      
      if (services.length === 0) {
        throw new Error(`No healthy instances of ${serviceName}`);
      }
      
      // Load balancing - random selection
      const randomIndex = Math.floor(Math.random() * services.length);
      const service = services[randomIndex];
      
      return {
        address: service.Service.Address,
        port: service.Service.Port,
      };
    } catch (error) {
      console.error(`Service discovery error: ${error.message}`);
      throw error;
    }
  }
  
  async registerService(name, port, healthCheckUrl) {
    const registration = {
      name,
      port,
      check: {
        http: healthCheckUrl,
        interval: '10s',
        timeout: '5s',
      },
    };
    
    await consul.agent.service.register(registration);
    
    // Deregister on shutdown
    process.on('SIGINT', async () => {
      await consul.agent.service.deregister(name);
      process.exit(0);
    });
  }
}

export default new ServiceDiscovery();
```

### Event-Driven Architecture

```javascript
// Event bus using RabbitMQ
import amqp from 'amqplib';

class EventBus {
  constructor() {
    this.connection = null;
    this.channel = null;
  }
  
  async connect() {
    this.connection = await amqp.connect('amqp://rabbitmq');
    this.channel = await this.connection.createChannel();
  }
  
  async publish(event, data) {
    const exchange = 'events';
    
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    
    const message = Buffer.from(JSON.stringify({
      event,
      data,
      timestamp: new Date().toISOString(),
      correlationId: generateCorrelationId(),
    }));
    
    this.channel.publish(exchange, event, message, { persistent: true });
    console.log(`Published event: ${event}`);
  }
  
  async subscribe(pattern, handler) {
    const exchange = 'events';
    const queue = `${process.env.SERVICE_NAME}-${pattern}`;
    
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, pattern);
    
    this.channel.consume(queue, async (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        
        try {
          await handler(content);
          this.channel.ack(msg);
        } catch (error) {
          console.error(`Error processing event: ${error.message}`);
          // Implement retry logic or dead letter queue
          this.channel.nack(msg, false, false);
        }
      }
    });
  }
}

// Usage example
const eventBus = new EventBus();
await eventBus.connect();

// Order service publishes event
await eventBus.publish('order.created', {
  orderId: '12345',
  userId: 'user-123',
  items: [...],
  total: 99.99
});

// Inventory service subscribes
await eventBus.subscribe('order.created', async (event) => {
  console.log('Updating inventory for order:', event.data.orderId);
  // Update inventory logic
});
```

### Circuit Breaker Pattern

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 60000; // 1 minute
    this.resetTimeout = options.resetTimeout || 30000; // 30 seconds
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failures = 0;
    this.nextAttempt = Date.now();
  }
  
  async call(fn, ...args) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await this.execute(fn, ...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  async execute(fn, ...args) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, this.timeout);
      
      fn(...args)
        .then(result => {
          clearTimeout(timer);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timer);
          reject(error);
        });
    });
  }
  
  onSuccess() {
    this.failures = 0;
    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED';
    }
  }
  
  onFailure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }
}

// Usage
const circuitBreaker = new CircuitBreaker({
  failureThreshold: 3,
  timeout: 5000,
  resetTimeout: 30000
});

async function callExternalService() {
  try {
    const result = await circuitBreaker.call(
      fetch,
      'https://api.external-service.com/data'
    );
    return result.json();
  } catch (error) {
    console.error('Service call failed:', error.message);
    // Return cached data or default response
    return getCachedData();
  }
}
```

## Container Orchestration

### Docker Compose for Development

```yaml
version: '3.8'

services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - users-service
      - products-service
      - orders-service
    networks:
      - microservices

  users-service:
    build: ./users-service
    environment:
      - DATABASE_URL=postgresql://user:pass@users-db:5432/users
      - RABBITMQ_URL=amqp://rabbitmq
    depends_on:
      - users-db
      - rabbitmq
    networks:
      - microservices

  products-service:
    build: ./products-service
    environment:
      - DATABASE_URL=postgresql://user:pass@products-db:5432/products
      - REDIS_URL=redis://redis:6379
    depends_on:
      - products-db
      - redis
    networks:
      - microservices

  orders-service:
    build: ./orders-service
    environment:
      - DATABASE_URL=postgresql://user:pass@orders-db:5432/orders
      - RABBITMQ_URL=amqp://rabbitmq
    depends_on:
      - orders-db
      - rabbitmq
    networks:
      - microservices

  # Databases
  users-db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=users
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - users-data:/var/lib/postgresql/data
    networks:
      - microservices

  products-db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=products
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - products-data:/var/lib/postgresql/data
    networks:
      - microservices

  orders-db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=orders
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - orders-data:/var/lib/postgresql/data
    networks:
      - microservices

  # Infrastructure
  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    networks:
      - microservices

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    networks:
      - microservices

  consul:
    image: consul:latest
    ports:
      - "8500:8500"
    command: agent -server -bootstrap-expect=1 -ui -client=0.0.0.0
    networks:
      - microservices

networks:
  microservices:
    driver: bridge

volumes:
  users-data:
  products-data:
  orders-data:
  rabbitmq-data:
  redis-data:
```

### Kubernetes Deployment

```yaml
# Deployment for users-service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: users-service
  labels:
    app: users-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: users-service
  template:
    metadata:
      labels:
        app: users-service
    spec:
      containers:
      - name: users-service
        image: myregistry/users-service:1.0.0
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: users-db-secret
              key: connection-string
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5

---
# Service
apiVersion: v1
kind: Service
metadata:
  name: users-service
spec:
  selector:
    app: users-service
  ports:
    - protocol: TCP
      port: 3001
      targetPort: 3001
  type: ClusterIP

---
# HorizontalPodAutoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: users-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: users-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## Monitoring and Observability

### Distributed Tracing

```javascript
// OpenTelemetry setup
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION,
  }),
});

const jaegerExporter = new JaegerExporter({
  endpoint: 'http://jaeger:14268/api/traces',
});

provider.addSpanProcessor(new BatchSpanProcessor(jaegerExporter));
provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

// Custom span
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('my-service');

async function processOrder(orderId) {
  const span = tracer.startSpan('process-order');
  span.setAttributes({
    'order.id': orderId,
    'order.processing.start': Date.now(),
  });
  
  try {
    // Process order logic
    const result = await performOrderProcessing(orderId);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
    throw error;
  } finally {
    span.end();
  }
}
```

### Centralized Logging

```javascript
// Winston logger with ELK stack
import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: process.env.SERVICE_NAME,
    version: process.env.SERVICE_VERSION,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new ElasticsearchTransport({
      level: 'info',
      clientOpts: { node: 'http://elasticsearch:9200' },
      index: 'microservices-logs',
    }),
  ],
});

// Correlation ID middleware
export const correlationMiddleware = (req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || generateId();
  res.setHeader('x-correlation-id', req.correlationId);
  
  // Add correlation ID to logger
  req.logger = logger.child({ correlationId: req.correlationId });
  
  next();
};

// Usage
app.use(correlationMiddleware);

app.post('/orders', async (req, res) => {
  req.logger.info('Creating new order', { body: req.body });
  
  try {
    const order = await createOrder(req.body);
    req.logger.info('Order created successfully', { orderId: order.id });
    res.json(order);
  } catch (error) {
    req.logger.error('Failed to create order', { error: error.message });
    res.status(500).json({ error: 'Order creation failed' });
  }
});
```

## Best Practices

### 1. Service Design
- Keep services small and focused
- Design around business capabilities
- Ensure loose coupling
- Version your APIs

### 2. Data Management
- Database per service
- Eventual consistency
- Saga pattern for distributed transactions
- CQRS for complex queries

### 3. Security
- Service-to-service authentication (mTLS)
- API Gateway for external access
- Secrets management
- Regular security audits

### 4. Testing
- Unit tests per service
- Integration tests
- Contract testing
- End-to-end tests
- Chaos engineering

### 5. Deployment
- CI/CD pipelines
- Blue-green deployments
- Canary releases
- Feature flags
- Rollback strategies

## Common Pitfalls

1. **Starting too big** - Begin with a modular monolith
2. **Ignoring data consistency** - Plan for eventual consistency
3. **Insufficient monitoring** - Implement comprehensive observability
4. **Network latency** - Minimize inter-service calls
5. **Lack of standards** - Establish clear conventions

## Conclusion

Microservices architecture offers flexibility and scalability but comes with complexity. Success requires careful planning, robust infrastructure, and strong operational practices.