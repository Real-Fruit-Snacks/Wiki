---
title: Todo App Project
tags: [projects, web-development, react, typescript]
created: 2024-02-05
author: Project Team
description: Full-stack todo application with React and Node.js
updated: 2024-03-02
category: projects
status: published
---

# Todo App Project

## Project Overview

Building a modern, full-stack todo application with the following features:
- User authentication
- Real-time updates
- Drag-and-drop functionality
- Tags and categories
- Due dates and reminders

### Tech Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Zustand (state management)

**Backend:**
- Node.js with Express
- PostgreSQL
- Prisma ORM
- JWT authentication
- Socket.io

## Project Structure

```
todo-app/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
└── docker-compose.yml
```

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Todos table
CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    due_date TIMESTAMP,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(name, user_id)
);

-- Todo-Tags junction table
CREATE TABLE todo_tags (
    todo_id UUID REFERENCES todos(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (todo_id, tag_id)
);
```

## API Endpoints

### Authentication
```typescript
POST   /api/auth/register    // Register new user
POST   /api/auth/login       // Login user
POST   /api/auth/refresh     // Refresh token
POST   /api/auth/logout      // Logout user
```

### Todos
```typescript
GET    /api/todos           // Get all todos
POST   /api/todos           // Create new todo
GET    /api/todos/:id       // Get single todo
PUT    /api/todos/:id       // Update todo
DELETE /api/todos/:id       // Delete todo
PATCH  /api/todos/:id/toggle // Toggle completion
```

### Tags
```typescript
GET    /api/tags            // Get all tags
POST   /api/tags            // Create new tag
PUT    /api/tags/:id        // Update tag
DELETE /api/tags/:id        // Delete tag
```

## Frontend Components

### TodoItem Component
```tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-white rounded-lg shadow-md ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="cursor-move">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor">
            {/* Drag handle icon */}
          </svg>
        </div>
        
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5"
        />
        
        <div className="flex-1">
          <h3 className={`font-medium ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-sm text-gray-600">{todo.description}</p>
          )}
          <div className="flex gap-2 mt-2">
            {todo.tags.map(tag => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs rounded-full"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
```

### Custom Hook - useTodos
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAll,
  });

  const createTodo = useMutation({
    mutationFn: todoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      todoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos: todos || [],
    isLoading,
    createTodo: createTodo.mutate,
    updateTodo: updateTodo.mutate,
    deleteTodo: deleteTodo.mutate,
  };
};
```

## Backend Implementation

### Todo Controller
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const todoController = {
  async getAll(req: Request, res: Response) {
    try {
      const todos = await prisma.todo.findMany({
        where: { userId: req.user.id },
        include: { tags: true },
        orderBy: { createdAt: 'desc' },
      });
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title, description, dueDate, tagIds } = req.body;
      
      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          dueDate,
          userId: req.user.id,
          tags: {
            connect: tagIds?.map((id: string) => ({ id })) || [],
          },
        },
        include: { tags: true },
      });
      
      // Emit real-time update
      req.io.to(req.user.id).emit('todo:created', todo);
      
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, completed, dueDate, tagIds } = req.body;
      
      const todo = await prisma.todo.update({
        where: { id, userId: req.user.id },
        data: {
          title,
          description,
          completed,
          dueDate,
          tags: tagIds ? {
            set: tagIds.map((id: string) => ({ id })),
          } : undefined,
        },
        include: { tags: true },
      });
      
      req.io.to(req.user.id).emit('todo:updated', todo);
      
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  },
};
```

## Deployment

### Docker Configuration
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
```

### CI/CD Pipeline
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        run: |
          # Deployment script
```

## Current Status

### Completed ✅
- Project setup and configuration
- Database schema design
- Basic CRUD operations
- Authentication system
- Frontend components

### In Progress 🔄
- Real-time updates with Socket.io
- Drag-and-drop functionality
- Email notifications

### Todo 📋
- Mobile app version
- Offline support
- Data export functionality
- Analytics dashboard