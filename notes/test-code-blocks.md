---
title: Code Block Features Demo
tags: [demo, code-blocks, syntax-highlighting, line-numbers, programming]
created: 2025-01-06
author: Wiki Admin
description: Comprehensive demonstration of ALL code block features including syntax highlighting for 100+ languages, line numbers, word wrap, collapsible blocks, copy functionality, and advanced formatting
updated: 2025-06-18
---

# Code Block Features Demo

This page demonstrates **every advanced code block feature** available in the Notes Wiki system, including CSS counter-based line numbers, comprehensive syntax highlighting, collapsible sections, and professional formatting options.

## 🎯 Quick Feature Overview

The wiki supports these code block features:
- **100+ programming languages** with syntax highlighting
- **CSS counter line numbers** that align perfectly with word wrap
- **Collapsible code sections** for better organization
- **Custom titles** for better documentation
- **One-click copy** with proper formatting preservation
- **Word wrap support** with maintained line alignment
- **Multiple size options** and layout controls
- **Theme-aware styling** across all 50+ themes

## 🚀 Basic Code Block Syntax

### Standard Markdown Format
````markdown
```language
code goes here
```
````

### With Title
````markdown
```language title:"Your Custom Title"
code with descriptive title
```
````

### Collapsible Block
````markdown
```language title:"Collapsible Example" collapse:"true"
code that starts collapsed
```
````

## 📚 Programming Languages Showcase

### JavaScript - Full Feature Demo

```javascript title:"Advanced JavaScript Example"
/**
 * Advanced JavaScript demonstrating modern ES6+ features
 * including classes, async/await, destructuring, and modules
 */

// Modern class with static methods and private fields
class DataProcessor {
    #privateData = new Map();
    static instances = new Set();

    constructor(config = {}) {
        this.config = { 
            timeout: 5000, 
            retries: 3, 
            debug: false,
            ...config 
        };
        DataProcessor.instances.add(this);
    }

    // Async method with error handling
    async processData(input) {
        try {
            const { data, metadata } = await this.validateInput(input);
            
            // Destructuring and spread operator
            const processed = await Promise.all([
                this.transformData(data),
                this.enrichMetadata({ ...metadata, processed: Date.now() }),
                this.validateOutput(data)
            ]);

            return { 
                success: true, 
                result: processed,
                timing: performance.now()
            };
            
        } catch (error) {
            console.error(`Processing failed: ${error.message}`);
            throw new ProcessingError('Data processing failed', { cause: error });
        }
    }

    // Generator function
    *batchProcessor(items, batchSize = 10) {
        for (let i = 0; i < items.length; i += batchSize) {
            yield items.slice(i, i + batchSize);
        }
    }

    // Arrow functions and template literals
    createLogger = (prefix) => (message) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${prefix}: ${message}`);
    };

    // Optional chaining and nullish coalescing
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => 
            current?.[key] ?? null, obj
        );
    }
}

// Module exports (ES6)
export { DataProcessor };
export default DataProcessor;

// Usage examples
const processor = new DataProcessor({ debug: true });
const logger = processor.createLogger('APP');

// Top-level await (ES2022)
try {
    const result = await processor.processData({
        input: 'sample data',
        options: { format: 'json', validate: true }
    });
    logger('Processing completed successfully');
} catch (error) {
    logger(`Error: ${error.message}`);
}
```

### Python - Data Science & Web Development

```python title:"Python Data Science & Web API Example"
"""
Comprehensive Python example demonstrating data science, web development,
async programming, and modern Python features (3.9+)
"""

import asyncio
import dataclasses
from datetime import datetime, timezone
from typing import Dict, List, Optional, Union, TypeVar, Generic
from pathlib import Path
import json

import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, validator
import matplotlib.pyplot as plt
import seaborn as sns


# Type hints and generics
T = TypeVar('T')
DataType = Union[int, float, str, bool]

@dataclasses.dataclass
class DataPoint:
    """Represents a single data observation with metadata."""
    timestamp: datetime
    value: DataType
    category: str
    confidence: float = 1.0
    metadata: Optional[Dict] = None
    
    def __post_init__(self):
        if self.metadata is None:
            self.metadata = {}
        
        # Validate confidence score
        if not 0 <= self.confidence <= 1:
            raise ValueError("Confidence must be between 0 and 1")


class DataAnalyzer(Generic[T]):
    """Generic data analyzer with async capabilities."""
    
    def __init__(self, data_source: str, cache_size: int = 1000):
        self.data_source = Path(data_source)
        self.cache: Dict[str, T] = {}
        self.cache_size = cache_size
        self._stats = {
            'processed': 0,
            'errors': 0,
            'cache_hits': 0
        }
    
    async def load_data_async(self, 
                            file_pattern: str = "*.csv",
                            chunk_size: int = 10000) -> List[DataPoint]:
        """Asynchronously load and process data files."""
        data_points = []
        
        # Use pathlib for robust file handling
        files = list(self.data_source.glob(file_pattern))
        
        for file_path in files:
            try:
                # Async file processing simulation
                await asyncio.sleep(0.01)  # Simulate I/O delay
                
                # Pandas with chunking for large files
                for chunk in pd.read_csv(file_path, chunksize=chunk_size):
                    processed_chunk = await self._process_chunk(chunk)
                    data_points.extend(processed_chunk)
                    
                self._stats['processed'] += len(chunk)
                
            except Exception as e:
                self._stats['errors'] += 1
                print(f"Error processing {file_path}: {e}")
                continue
        
        return data_points
    
    async def _process_chunk(self, chunk: pd.DataFrame) -> List[DataPoint]:
        """Process a data chunk with validation and transformation."""
        processed = []
        
        for _, row in chunk.iterrows():
            try:
                # Data validation and transformation
                data_point = DataPoint(
                    timestamp=pd.to_datetime(row['timestamp']),
                    value=self._validate_value(row['value']),
                    category=str(row.get('category', 'unknown')),
                    confidence=float(row.get('confidence', 1.0)),
                    metadata={'source_file': row.get('source', 'unknown')}
                )
                processed.append(data_point)
                
            except (ValueError, KeyError) as e:
                self._stats['errors'] += 1
                continue
        
        return processed
    
    def _validate_value(self, value) -> DataType:
        """Validate and convert data values."""
        if pd.isna(value):
            raise ValueError("Null value not allowed")
        
        # Try numeric conversion
        try:
            return float(value) if '.' in str(value) else int(value)
        except ValueError:
            return str(value)
    
    def analyze_trends(self, data: List[DataPoint]) -> Dict:
        """Perform statistical analysis on the data."""
        if not data:
            return {'error': 'No data to analyze'}
        
        # Convert to DataFrame for analysis
        df = pd.DataFrame([
            {
                'timestamp': dp.timestamp,
                'value': dp.value if isinstance(dp.value, (int, float)) else 0,
                'category': dp.category,
                'confidence': dp.confidence
            }
            for dp in data if isinstance(dp.value, (int, float))
        ])
        
        if df.empty:
            return {'error': 'No numeric data found'}
        
        # Statistical analysis
        analysis = {
            'total_points': len(df),
            'date_range': {
                'start': df['timestamp'].min().isoformat(),
                'end': df['timestamp'].max().isoformat()
            },
            'value_stats': {
                'mean': float(df['value'].mean()),
                'median': float(df['value'].median()),
                'std': float(df['value'].std()),
                'min': float(df['value'].min()),
                'max': float(df['value'].max())
            },
            'category_counts': df['category'].value_counts().to_dict(),
            'confidence_avg': float(df['confidence'].mean())
        }
        
        return analysis
    
    def create_visualization(self, data: List[DataPoint], 
                           output_path: str = 'analysis.png'):
        """Create data visualization using matplotlib and seaborn."""
        # Convert to DataFrame
        df = pd.DataFrame([
            {
                'timestamp': dp.timestamp,
                'value': dp.value if isinstance(dp.value, (int, float)) else 0,
                'category': dp.category
            }
            for dp in data if isinstance(dp.value, (int, float))
        ])
        
        if df.empty:
            print("No data available for visualization")
            return
        
        # Create subplots
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        fig.suptitle('Data Analysis Dashboard', fontsize=16)
        
        # Time series plot
        df.set_index('timestamp')['value'].plot(ax=axes[0,0], 
                                               title='Value Over Time')
        axes[0,0].set_ylabel('Value')
        
        # Category distribution
        df['category'].value_counts().plot(kind='bar', ax=axes[0,1], 
                                          title='Category Distribution')
        axes[0,1].set_ylabel('Count')
        
        # Value distribution
        df['value'].hist(bins=30, ax=axes[1,0], title='Value Distribution')
        axes[1,0].set_xlabel('Value')
        axes[1,0].set_ylabel('Frequency')
        
        # Box plot by category
        sns.boxplot(data=df, x='category', y='value', ax=axes[1,1])
        axes[1,1].set_title('Value Distribution by Category')
        axes[1,1].tick_params(axis='x', rotation=45)
        
        plt.tight_layout()
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"Visualization saved to {output_path}")


# FastAPI Web Application
app = FastAPI(title="Data Analysis API", version="1.0.0")

class AnalysisRequest(BaseModel):
    """Request model for analysis endpoint."""
    data_source: str
    file_pattern: str = "*.csv"
    chunk_size: int = 10000
    
    @validator('chunk_size')
    def validate_chunk_size(cls, v):
        if v <= 0 or v > 100000:
            raise ValueError('Chunk size must be between 1 and 100000')
        return v

@app.post("/analyze")
async def analyze_data(request: AnalysisRequest):
    """Analyze data from specified source."""
    try:
        analyzer = DataAnalyzer(request.data_source)
        data_points = await analyzer.load_data_async(
            file_pattern=request.file_pattern,
            chunk_size=request.chunk_size
        )
        
        analysis = analyzer.analyze_trends(data_points)
        
        return {
            "status": "success",
            "analysis": analysis,
            "stats": analyzer._stats,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Example usage and testing
if __name__ == "__main__":
    async def main():
        # Create sample data
        sample_data = [
            DataPoint(
                timestamp=datetime.now(),
                value=np.random.normal(100, 15),
                category=np.random.choice(['A', 'B', 'C']),
                confidence=np.random.uniform(0.8, 1.0)
            )
            for _ in range(1000)
        ]
        
        # Analyze data
        analyzer = DataAnalyzer("./data")
        analysis = analyzer.analyze_trends(sample_data)
        analyzer.create_visualization(sample_data)
        
        print("Analysis Results:")
        print(json.dumps(analysis, indent=2))
    
    # Run async main
    asyncio.run(main())
```

### TypeScript - Modern Web Development

```typescript title:"TypeScript React Component with Advanced Types"
/**
 * Advanced TypeScript React component demonstrating:
 * - Generic types and constraints
 * - Union and intersection types  
 * - Conditional types and utility types
 * - React hooks with proper typing
 * - Error boundaries and async handling
 */

import React, { 
    useState, 
    useEffect, 
    useCallback, 
    useMemo, 
    useRef,
    createContext,
    useContext
} from 'react';

// Advanced type definitions
type Status = 'idle' | 'loading' | 'success' | 'error';

interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface User extends BaseEntity {
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    preferences: UserPreferences;
}

interface UserPreferences {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    language: string;
}

// Generic API response type
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    metadata?: Record<string, unknown>;
}

// Conditional types for different data shapes
type EntityList<T extends BaseEntity> = {
    items: T[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
};

type EntityDetail<T extends BaseEntity> = T & {
    relationships: Record<string, BaseEntity[]>;
    permissions: string[];
};

// Utility types for form handling
type FormData<T> = {
    [K in keyof T]: T[K] extends Date 
        ? string 
        : T[K] extends boolean 
            ? boolean 
            : string;
};

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

// Context for global state management
interface AppContextType {
    user: User | null;
    theme: UserPreferences['theme'];
    setTheme: (theme: UserPreferences['theme']) => void;
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Custom hook with proper typing
function useApi<T>(url: string, dependencies: unknown[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<Error | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchData = useCallback(async () => {
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setStatus('loading');
        setError(null);

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result: ApiResponse<T> = await response.json();
            setData(result.data);
            setStatus('success');
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                setError(err);
                setStatus('error');
            }
        }
    }, [url]);

    useEffect(() => {
        fetchData();
        
        // Cleanup function
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData, ...dependencies]);

    return { data, status, error, refetch: fetchData };
}

// Generic form hook
function useForm<T extends Record<string, unknown>>(
    initialValues: T,
    validationSchema?: (values: T) => ValidationErrors<T>
) {
    const [values, setValues] = useState<FormData<T>>(
        initialValues as FormData<T>
    );
    const [errors, setErrors] = useState<ValidationErrors<T>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

    const setValue = useCallback(<K extends keyof T>(
        field: K, 
        value: FormData<T>[K]
    ) => {
        setValues(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    const setFieldTouched = useCallback(<K extends keyof T>(field: K) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    const validate = useCallback(() => {
        if (!validationSchema) return true;
        
        const validationErrors = validationSchema(values as T);
        setErrors(validationErrors);
        
        return Object.keys(validationErrors).length === 0;
    }, [values, validationSchema]);

    const reset = useCallback(() => {
        setValues(initialValues as FormData<T>);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    return {
        values,
        errors,
        touched,
        setValue,
        setFieldTouched,
        validate,
        reset,
        isValid: Object.keys(errors).length === 0,
        isDirty: JSON.stringify(values) !== JSON.stringify(initialValues)
    };
}

// Main component with advanced patterns
interface UserManagementProps {
    userId?: string;
    onUserUpdate?: (user: User) => void;
    className?: string;
}

const UserManagement: React.FC<UserManagementProps> = ({
    userId,
    onUserUpdate,
    className = ''
}) => {
    // Context usage with null checking
    const appContext = useContext(AppContext);
    if (!appContext) {
        throw new Error('UserManagement must be used within AppContext');
    }

    const { user: currentUser, addNotification } = appContext;

    // API data fetching
    const { 
        data: users, 
        status: usersStatus, 
        error: usersError,
        refetch: refetchUsers
    } = useApi<EntityList<User>>('/api/users');

    const { 
        data: userDetail, 
        status: userDetailStatus 
    } = useApi<EntityDetail<User>>(
        userId ? `/api/users/${userId}` : '',
        [userId]
    );

    // Form management
    const userForm = useForm<Partial<User>>({
        name: '',
        email: '',
        role: 'user' as const
    }, (values) => {
        const errors: ValidationErrors<Partial<User>> = {};
        
        if (!values.name?.trim()) {
            errors.name = 'Name is required';
        }
        
        if (!values.email?.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
        }
        
        return errors;
    });

    // Memoized computations
    const filteredUsers = useMemo(() => {
        if (!users?.items) return [];
        
        return users.items.filter(user => 
            user.role !== 'guest' || currentUser?.role === 'admin'
        );
    }, [users?.items, currentUser?.role]);

    const userStats = useMemo(() => {
        if (!users?.items) return null;
        
        const roleCount = users.items.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        return {
            total: users.items.length,
            byRole: roleCount,
            activePercentage: Math.round(
                (users.items.filter(u => u.role !== 'guest').length / users.items.length) * 100
            )
        };
    }, [users?.items]);

    // Event handlers
    const handleSaveUser = useCallback(async () => {
        if (!userForm.validate()) {
            addNotification({
                type: 'error',
                message: 'Please fix form errors before saving',
                timestamp: new Date()
            });
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userForm.values)
            });

            if (!response.ok) throw new Error('Failed to save user');

            const savedUser: User = await response.json();
            
            onUserUpdate?.(savedUser);
            userForm.reset();
            refetchUsers();
            
            addNotification({
                type: 'success',
                message: 'User saved successfully',
                timestamp: new Date()
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date()
            });
        }
    }, [userForm, onUserUpdate, refetchUsers, addNotification]);

    // Render loading state
    if (usersStatus === 'loading') {
        return (
            <div className={`user-management loading ${className}`}>
                <div className="spinner" />
                <p>Loading users...</p>
            </div>
        );
    }

    // Render error state
    if (usersStatus === 'error') {
        return (
            <div className={`user-management error ${className}`}>
                <h3>Error Loading Users</h3>
                <p>{usersError?.message}</p>
                <button onClick={refetchUsers}>Retry</button>
            </div>
        );
    }

    return (
        <div className={`user-management ${className}`}>
            <header className="user-management-header">
                <h2>User Management</h2>
                {userStats && (
                    <div className="user-stats">
                        <span>Total: {userStats.total}</span>
                        <span>Active: {userStats.activePercentage}%</span>
                    </div>
                )}
            </header>

            <section className="user-form">
                <h3>Add New User</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSaveUser(); }}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={userForm.values.name}
                            onChange={(e) => userForm.setValue('name', e.target.value)}
                            onBlur={() => userForm.setFieldTouched('name')}
                            className={userForm.errors.name ? 'error' : ''}
                        />
                        {userForm.touched.name && userForm.errors.name && (
                            <span className="error-message">{userForm.errors.name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={userForm.values.email}
                            onChange={(e) => userForm.setValue('email', e.target.value)}
                            onBlur={() => userForm.setFieldTouched('email')}
                            className={userForm.errors.email ? 'error' : ''}
                        />
                        {userForm.touched.email && userForm.errors.email && (
                            <span className="error-message">{userForm.errors.email}</span>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={!userForm.isValid || usersStatus === 'loading'}
                    >
                        Save User
                    </button>
                </form>
            </section>

            <section className="users-list">
                <h3>Users ({filteredUsers.length})</h3>
                <div className="users-grid">
                    {filteredUsers.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            isSelected={userId === user.id}
                            onSelect={() => {/* handle selection */}}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

// Supporting component with proper typing
interface UserCardProps {
    user: User;
    isSelected: boolean;
    onSelect: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isSelected, onSelect }) => (
    <div 
        className={`user-card ${isSelected ? 'selected' : ''}`}
        onClick={onSelect}
    >
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <span className={`role-badge role-${user.role}`}>
            {user.role}
        </span>
    </div>
);

export default UserManagement;
```

### Rust - Systems Programming

```rust title:"Rust Concurrent Web Server with Error Handling"
use std::collections::HashMap;
use std::sync::{Arc, Mutex, RwLock};
use std::time::{Duration, Instant};
use std::thread;

use tokio::net::{TcpListener, TcpStream};
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use serde::{Deserialize, Serialize};
use anyhow::{Context, Result};

/// Custom error types for better error handling
#[derive(Debug, thiserror::Error)]
pub enum ServerError {
    #[error("Network error: {0}")]
    Network(#[from] std::io::Error),
    
    #[error("Serialization error: {0}")]
    Serialization(#[from] serde_json::Error),
    
    #[error("Configuration error: {message}")]
    Config { message: String },
    
    #[error("Rate limit exceeded for client {client_id}")]
    RateLimit { client_id: String },
}

/// Configuration for the web server
#[derive(Debug, Clone, Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
    pub max_connections: usize,
    pub request_timeout: Duration,
    pub rate_limit_per_minute: u32,
    pub enable_logging: bool,
}

impl Default for ServerConfig {
    fn default() -> Self {
        Self {
            host: "127.0.0.1".to_string(),
            port: 8080,
            max_connections: 1000,
            request_timeout: Duration::from_secs(30),
            rate_limit_per_minute: 60,
            enable_logging: true,
        }
    }
}

/// HTTP request representation
#[derive(Debug, Clone)]
pub struct HttpRequest {
    pub method: String,
    pub path: String,
    pub headers: HashMap<String, String>,
    pub body: Vec<u8>,
    pub client_ip: String,
}

/// HTTP response representation
#[derive(Debug, Clone, Serialize)]
pub struct HttpResponse {
    pub status: u16,
    pub headers: HashMap<String, String>,
    pub body: Vec<u8>,
}

impl HttpResponse {
    pub fn new(status: u16) -> Self {
        let mut headers = HashMap::new();
        headers.insert("Server".to_string(), "RustServer/1.0".to_string());
        headers.insert("Content-Type".to_string(), "application/json".to_string());
        
        Self {
            status,
            headers,
            body: Vec::new(),
        }
    }
    
    pub fn json<T: Serialize>(status: u16, data: &T) -> Result<Self> {
        let mut response = Self::new(status);
        response.body = serde_json::to_vec(data)?;
        Ok(response)
    }
    
    pub fn to_bytes(&self) -> Vec<u8> {
        let mut result = Vec::new();
        
        // Status line
        let status_line = format!("HTTP/1.1 {} OK\r\n", self.status);
        result.extend_from_slice(status_line.as_bytes());
        
        // Headers
        for (key, value) in &self.headers {
            let header_line = format!("{}: {}\r\n", key, value);
            result.extend_from_slice(header_line.as_bytes());
        }
        
        // Content-Length
        let content_length = format!("Content-Length: {}\r\n", self.body.len());
        result.extend_from_slice(content_length.as_bytes());
        
        // Empty line and body
        result.extend_from_slice(b"\r\n");
        result.extend_from_slice(&self.body);
        
        result
    }
}

/// Rate limiting implementation
#[derive(Debug)]
struct RateLimiter {
    requests: Arc<RwLock<HashMap<String, Vec<Instant>>>>,
    limit: u32,
    window: Duration,
}

impl RateLimiter {
    pub fn new(limit: u32, window: Duration) -> Self {
        Self {
            requests: Arc::new(RwLock::new(HashMap::new())),
            limit,
            window,
        }
    }
    
    pub fn check_rate_limit(&self, client_id: &str) -> bool {
        let now = Instant::now();
        let mut requests = self.requests.write().unwrap();
        
        let client_requests = requests.entry(client_id.to_string()).or_insert_with(Vec::new);
        
        // Remove old requests outside the window
        client_requests.retain(|&time| now.duration_since(time) < self.window);
        
        // Check if we're under the limit
        if client_requests.len() >= self.limit as usize {
            false
        } else {
            client_requests.push(now);
            true
        }
    }
}

/// Connection statistics
#[derive(Debug, Clone, Serialize)]
pub struct ConnectionStats {
    pub active_connections: usize,
    pub total_requests: u64,
    pub successful_requests: u64,
    pub error_count: u64,
    pub uptime: Duration,
}

/// Main web server implementation
pub struct WebServer {
    config: ServerConfig,
    rate_limiter: RateLimiter,
    stats: Arc<Mutex<ConnectionStats>>,
    start_time: Instant,
    routes: HashMap<String, Box<dyn Fn(&HttpRequest) -> Result<HttpResponse> + Send + Sync>>,
}

impl WebServer {
    pub fn new(config: ServerConfig) -> Self {
        let rate_limiter = RateLimiter::new(
            config.rate_limit_per_minute,
            Duration::from_secs(60),
        );
        
        let stats = Arc::new(Mutex::new(ConnectionStats {
            active_connections: 0,
            total_requests: 0,
            successful_requests: 0,
            error_count: 0,
            uptime: Duration::from_secs(0),
        }));
        
        Self {
            config,
            rate_limiter,
            stats,
            start_time: Instant::now(),
            routes: HashMap::new(),
        }
    }
    
    /// Add a route handler
    pub fn add_route<F>(&mut self, path: String, handler: F)
    where
        F: Fn(&HttpRequest) -> Result<HttpResponse> + Send + Sync + 'static,
    {
        self.routes.insert(path, Box::new(handler));
    }
    
    /// Start the server
    pub async fn start(&self) -> Result<()> {
        let addr = format!("{}:{}", self.config.host, self.config.port);
        let listener = TcpListener::bind(&addr)
            .await
            .context(format!("Failed to bind to {}", addr))?;
            
        if self.config.enable_logging {
            println!("Server starting on {}", addr);
            println!("Configuration: {:#?}", self.config);
        }
        
        loop {
            match listener.accept().await {
                Ok((stream, addr)) => {
                    if self.config.enable_logging {
                        println!("New connection from: {}", addr);
                    }
                    
                    // Clone necessary data for the task
                    let config = self.config.clone();
                    let rate_limiter = self.rate_limiter.clone();
                    let stats = Arc::clone(&self.stats);
                    let routes = self.routes.clone();
                    
                    // Spawn a task to handle the connection
                    tokio::spawn(async move {
                        if let Err(e) = Self::handle_connection(
                            stream, 
                            addr.ip().to_string(), 
                            config, 
                            rate_limiter, 
                            stats,
                            routes
                        ).await {
                            eprintln!("Connection error: {}", e);
                        }
                    });
                }
                Err(e) => {
                    eprintln!("Failed to accept connection: {}", e);
                }
            }
        }
    }
    
    /// Handle a single connection
    async fn handle_connection(
        mut stream: TcpStream,
        client_ip: String,
        config: ServerConfig,
        rate_limiter: RateLimiter,
        stats: Arc<Mutex<ConnectionStats>>,
        routes: HashMap<String, Box<dyn Fn(&HttpRequest) -> Result<HttpResponse> + Send + Sync>>,
    ) -> Result<()> {
        // Update connection count
        {
            let mut stats = stats.lock().unwrap();
            stats.active_connections += 1;
        }
        
        // Ensure connection count is decremented when done
        let _guard = ConnectionGuard::new(Arc::clone(&stats));
        
        // Read the request with timeout
        let mut buffer = vec![0; 4096];
        let bytes_read = tokio::time::timeout(
            config.request_timeout,
            stream.read(&mut buffer)
        ).await??;
        
        buffer.truncate(bytes_read);
        
        // Parse the HTTP request
        let request = Self::parse_request(buffer, client_ip.clone())?;
        
        // Update request count
        {
            let mut stats = stats.lock().unwrap();
            stats.total_requests += 1;
        }
        
        // Check rate limit
        if !rate_limiter.check_rate_limit(&client_ip) {
            let response = HttpResponse::json(429, &serde_json::json!({
                "error": "Rate limit exceeded",
                "client": client_ip
            }))?;
            
            stream.write_all(&response.to_bytes()).await?;
            return Ok(());
        }
        
        // Route the request
        let response = match routes.get(&request.path) {
            Some(handler) => {
                match handler(&request) {
                    Ok(resp) => {
                        // Update success count
                        {
                            let mut stats = stats.lock().unwrap();
                            stats.successful_requests += 1;
                        }
                        resp
                    }
                    Err(e) => {
                        // Update error count
                        {
                            let mut stats = stats.lock().unwrap();
                            stats.error_count += 1;
                        }
                        HttpResponse::json(500, &serde_json::json!({
                            "error": "Internal server error",
                            "message": e.to_string()
                        }))?
                    }
                }
            }
            None => {
                HttpResponse::json(404, &serde_json::json!({
                    "error": "Not found",
                    "path": request.path
                }))?
            }
        };
        
        // Send response
        stream.write_all(&response.to_bytes()).await?;
        stream.flush().await?;
        
        Ok(())
    }
    
    /// Parse an HTTP request from raw bytes
    fn parse_request(data: Vec<u8>, client_ip: String) -> Result<HttpRequest> {
        let request_str = String::from_utf8_lossy(&data);
        let mut lines = request_str.lines();
        
        // Parse request line
        let request_line = lines.next()
            .ok_or_else(|| ServerError::Config {
                message: "Empty request".to_string()
            })?;
            
        let parts: Vec<&str> = request_line.split_whitespace().collect();
        if parts.len() < 2 {
            return Err(ServerError::Config {
                message: "Invalid request line".to_string()
            }.into());
        }
        
        let method = parts[0].to_string();
        let path = parts[1].to_string();
        
        // Parse headers
        let mut headers = HashMap::new();
        let mut body_start = 0;
        
        for (i, line) in lines.enumerate() {
            if line.is_empty() {
                body_start = i + 1;
                break;
            }
            
            if let Some(colon_pos) = line.find(':') {
                let key = line[..colon_pos].trim().to_string();
                let value = line[colon_pos + 1..].trim().to_string();
                headers.insert(key, value);
            }
        }
        
        // Extract body (simplified)
        let body = if body_start > 0 {
            request_str.lines()
                .skip(body_start)
                .collect::<Vec<_>>()
                .join("\n")
                .into_bytes()
        } else {
            Vec::new()
        };
        
        Ok(HttpRequest {
            method,
            path,
            headers,
            body,
            client_ip,
        })
    }
    
    /// Get current server statistics
    pub fn get_stats(&self) -> ConnectionStats {
        let mut stats = self.stats.lock().unwrap();
        stats.uptime = self.start_time.elapsed();
        stats.clone()
    }
}

/// RAII guard for connection counting
struct ConnectionGuard {
    stats: Arc<Mutex<ConnectionStats>>,
}

impl ConnectionGuard {
    fn new(stats: Arc<Mutex<ConnectionStats>>) -> Self {
        Self { stats }
    }
}

impl Drop for ConnectionGuard {
    fn drop(&mut self) {
        let mut stats = self.stats.lock().unwrap();
        stats.active_connections = stats.active_connections.saturating_sub(1);
    }
}

/// Example usage and setup
#[tokio::main]
async fn main() -> Result<()> {
    let config = ServerConfig {
        port: 3000,
        rate_limit_per_minute: 100,
        ..Default::default()
    };
    
    let mut server = WebServer::new(config);
    
    // Add routes
    server.add_route("/health".to_string(), |_req| {
        HttpResponse::json(200, &serde_json::json!({
            "status": "healthy",
            "timestamp": chrono::Utc::now()
        }))
    });
    
    server.add_route("/stats".to_string(), |_req| {
        // This would need access to server stats in a real implementation
        HttpResponse::json(200, &serde_json::json!({
            "message": "Stats endpoint"
        }))
    });
    
    server.add_route("/api/users".to_string(), |req| {
        match req.method.as_str() {
            "GET" => {
                HttpResponse::json(200, &serde_json::json!({
                    "users": [
                        {"id": 1, "name": "Alice"},
                        {"id": 2, "name": "Bob"}
                    ]
                }))
            }
            "POST" => {
                // Parse body and create user
                HttpResponse::json(201, &serde_json::json!({
                    "message": "User created",
                    "id": 3
                }))
            }
            _ => {
                HttpResponse::json(405, &serde_json::json!({
                    "error": "Method not allowed"
                }))
            }
        }
    });
    
    // Start the server
    server.start().await
}
```

## 🌍 More Programming Languages

### Go - Concurrency and Web Services

```go title:"Go Microservice with Graceful Shutdown"
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "os/signal"
    "sync"
    "syscall"
    "time"

    "github.com/gorilla/mux"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

// Metrics collection
var (
    requestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total number of HTTP requests",
        },
        []string{"method", "endpoint", "status"},
    )
    
    requestDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "http_request_duration_seconds",
            Help: "HTTP request duration in seconds",
        },
        []string{"method", "endpoint"},
    )
)

func init() {
    prometheus.MustRegister(requestsTotal)
    prometheus.MustRegister(requestDuration)
}

// User represents a user in our system
type User struct {
    ID        string    `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

// UserService handles user-related operations
type UserService struct {
    users sync.Map
    mu    sync.RWMutex
}

func NewUserService() *UserService {
    return &UserService{}
}

func (s *UserService) CreateUser(user User) error {
    user.CreatedAt = time.Now()
    s.users.Store(user.ID, user)
    return nil
}

func (s *UserService) GetUser(id string) (User, bool) {
    if value, ok := s.users.Load(id); ok {
        return value.(User), true
    }
    return User{}, false
}

func (s *UserService) GetAllUsers() []User {
    var users []User
    s.users.Range(func(key, value interface{}) bool {
        users = append(users, value.(User))
        return true
    })
    return users
}

// HTTP handlers with middleware
type Server struct {
    userService *UserService
    router      *mux.Router
}

func NewServer() *Server {
    s := &Server{
        userService: NewUserService(),
        router:      mux.NewRouter(),
    }
    s.setupRoutes()
    return s
}

func (s *Server) setupRoutes() {
    // Middleware chain
    s.router.Use(s.loggingMiddleware)
    s.router.Use(s.metricsMiddleware)
    s.router.Use(s.corsMiddleware)

    // API routes
    api := s.router.PathPrefix("/api/v1").Subrouter()
    api.HandleFunc("/users", s.handleCreateUser).Methods("POST")
    api.HandleFunc("/users", s.handleGetUsers).Methods("GET")
    api.HandleFunc("/users/{id}", s.handleGetUser).Methods("GET")
    
    // Health check
    s.router.HandleFunc("/health", s.handleHealth).Methods("GET")
    
    // Metrics endpoint
    s.router.Handle("/metrics", promhttp.Handler())
}

func (s *Server) loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf(
            "%s %s %s %v",
            r.Method,
            r.RequestURI,
            r.RemoteAddr,
            time.Since(start),
        )
    })
}

func (s *Server) metricsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        
        // Wrap ResponseWriter to capture status code
        wrapped := &responseWriter{ResponseWriter: w, statusCode: 200}
        
        next.ServeHTTP(wrapped, r)
        
        duration := time.Since(start).Seconds()
        route := mux.CurrentRoute(r)
        template, _ := route.GetPathTemplate()
        
        requestsTotal.WithLabelValues(
            r.Method, 
            template, 
            fmt.Sprintf("%d", wrapped.statusCode),
        ).Inc()
        
        requestDuration.WithLabelValues(
            r.Method, 
            template,
        ).Observe(duration)
    })
}

func (s *Server) corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }
        
        next.ServeHTTP(w, r)
    })
}

type responseWriter struct {
    http.ResponseWriter
    statusCode int
}

func (rw *responseWriter) WriteHeader(code int) {
    rw.statusCode = code
    rw.ResponseWriter.WriteHeader(code)
}

// HTTP handlers
func (s *Server) handleCreateUser(w http.ResponseWriter, r *http.Request) {
    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }
    
    if user.ID == "" || user.Name == "" || user.Email == "" {
        http.Error(w, "Missing required fields", http.StatusBadRequest)
        return
    }
    
    if err := s.userService.CreateUser(user); err != nil {
        http.Error(w, "Failed to create user", http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}

func (s *Server) handleGetUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    
    user, found := s.userService.GetUser(id)
    if !found {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func (s *Server) handleGetUsers(w http.ResponseWriter, r *http.Request) {
    users := s.userService.GetAllUsers()
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "users": users,
        "count": len(users),
    })
}

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
    health := map[string]interface{}{
        "status":    "healthy",
        "timestamp": time.Now().UTC(),
        "uptime":    time.Since(startTime).String(),
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(health)
}

var startTime = time.Now()

func main() {
    server := NewServer()
    
    // HTTP server configuration
    srv := &http.Server{
        Addr:         ":8080",
        Handler:      server.router,
        ReadTimeout:  15 * time.Second,
        WriteTimeout: 15 * time.Second,
        IdleTimeout:  60 * time.Second,
    }
    
    // Channel to listen for interrupt signal
    c := make(chan os.Signal, 1)
    signal.Notify(c, os.Interrupt, syscall.SIGTERM)
    
    // Start server in a goroutine
    go func() {
        log.Printf("Server starting on %s", srv.Addr)
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("Server failed to start: %v", err)
        }
    }()
    
    log.Println("Server started successfully")
    
    // Block until we receive a signal
    <-c
    log.Println("Shutting down server...")
    
    // Create a deadline for shutdown
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    
    // Graceful shutdown
    if err := srv.Shutdown(ctx); err != nil {
        log.Fatalf("Server forced to shutdown: %v", err)
    }
    
    log.Println("Server exited")
}
```

### SQL - Database Operations

```sql title:"Advanced PostgreSQL Queries with CTEs and Window Functions"
-- Complex SQL demonstrating advanced PostgreSQL features
-- Including CTEs, window functions, JSON operations, and performance optimization

-- Create tables for e-commerce analytics
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    user_metadata JSONB DEFAULT '{}'::jsonb,
    subscription_tier VARCHAR(20) DEFAULT 'free'
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipping_address JSONB,
    order_metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    product_data JSONB
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_user_metadata_gin ON users USING GIN(user_metadata);

-- Complex analytics query with multiple CTEs
WITH user_stats AS (
    -- Calculate user metrics
    SELECT 
        u.id,
        u.name,
        u.email,
        u.subscription_tier,
        u.created_at,
        EXTRACT(days FROM (CURRENT_DATE - u.created_at::date)) as days_since_signup,
        u.user_metadata->>'acquisition_channel' as acquisition_channel,
        COUNT(o.id) as total_orders,
        COALESCE(SUM(o.total_amount), 0) as total_spent,
        COALESCE(AVG(o.total_amount), 0) as avg_order_value,
        MAX(o.created_at) as last_order_date,
        MIN(o.created_at) as first_order_date
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
    GROUP BY u.id, u.name, u.email, u.subscription_tier, u.created_at, u.user_metadata
),

user_segments AS (
    -- Segment users based on behavior
    SELECT 
        *,
        CASE 
            WHEN total_orders = 0 THEN 'never_purchased'
            WHEN total_orders = 1 THEN 'one_time_buyer'
            WHEN total_orders BETWEEN 2 AND 5 THEN 'regular_customer'
            WHEN total_orders > 5 THEN 'loyal_customer'
        END as customer_segment,
        
        CASE 
            WHEN total_spent = 0 THEN 'no_value'
            WHEN total_spent < 100 THEN 'low_value'
            WHEN total_spent BETWEEN 100 AND 500 THEN 'medium_value'
            WHEN total_spent > 500 THEN 'high_value'
        END as value_segment,
        
        CASE 
            WHEN last_order_date IS NULL THEN 'never_ordered'
            WHEN last_order_date > CURRENT_DATE - INTERVAL '30 days' THEN 'active'
            WHEN last_order_date > CURRENT_DATE - INTERVAL '90 days' THEN 'at_risk'
            ELSE 'churned'
        END as activity_segment
    FROM user_stats
),

monthly_cohorts AS (
    -- Cohort analysis by signup month
    SELECT 
        DATE_TRUNC('month', created_at) as cohort_month,
        COUNT(*) as cohort_size,
        COUNT(*) FILTER (WHERE total_orders > 0) as purchasers,
        ROUND(
            COUNT(*) FILTER (WHERE total_orders > 0) * 100.0 / COUNT(*), 
            2
        ) as conversion_rate,
        AVG(total_spent) FILTER (WHERE total_orders > 0) as avg_revenue_per_purchaser
    FROM user_segments
    GROUP BY DATE_TRUNC('month', created_at)
    ORDER BY cohort_month
),

product_performance AS (
    -- Product sales analysis with window functions
    SELECT 
        oi.product_id,
        oi.product_data->>'name' as product_name,
        oi.product_data->>'category' as category,
        COUNT(*) as times_ordered,
        SUM(oi.quantity) as total_quantity_sold,
        SUM(oi.quantity * oi.unit_price) as total_revenue,
        AVG(oi.unit_price) as avg_unit_price,
        
        -- Window functions for ranking and percentiles
        ROW_NUMBER() OVER (ORDER BY SUM(oi.quantity * oi.unit_price) DESC) as revenue_rank,
        PERCENT_RANK() OVER (ORDER BY SUM(oi.quantity * oi.unit_price)) as revenue_percentile,
        
        -- Running totals
        SUM(SUM(oi.quantity * oi.unit_price)) OVER (
            ORDER BY SUM(oi.quantity * oi.unit_price) DESC 
            ROWS UNBOUNDED PRECEDING
        ) as cumulative_revenue,
        
        -- Category comparisons
        SUM(oi.quantity * oi.unit_price) / SUM(SUM(oi.quantity * oi.unit_price)) OVER (
            PARTITION BY oi.product_data->>'category'
        ) * 100 as category_revenue_share
        
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE o.status = 'completed'
    GROUP BY oi.product_id, oi.product_data->>'name', oi.product_data->>'category'
),

advanced_analytics AS (
    -- Advanced business metrics
    SELECT 
        'overall_metrics' as metric_type,
        jsonb_build_object(
            'total_users', COUNT(*),
            'total_purchasers', COUNT(*) FILTER (WHERE total_orders > 0),
            'overall_conversion_rate', ROUND(
                COUNT(*) FILTER (WHERE total_orders > 0) * 100.0 / COUNT(*), 
                2
            ),
            'total_revenue', SUM(total_spent),
            'avg_ltv', ROUND(AVG(total_spent) FILTER (WHERE total_orders > 0), 2),
            'median_ltv', PERCENTILE_CONT(0.5) WITHIN GROUP (
                ORDER BY total_spent
            ) FILTER (WHERE total_orders > 0)
        ) as metrics
    FROM user_segments
    
    UNION ALL
    
    -- Segment breakdown
    SELECT 
        'segment_breakdown' as metric_type,
        jsonb_object_agg(
            customer_segment,
            jsonb_build_object(
                'count', segment_count,
                'avg_spent', avg_spent,
                'total_revenue', total_revenue
            )
        ) as metrics
    FROM (
        SELECT 
            customer_segment,
            COUNT(*) as segment_count,
            ROUND(AVG(total_spent), 2) as avg_spent,
            SUM(total_spent) as total_revenue
        FROM user_segments
        GROUP BY customer_segment
    ) segment_stats
)

-- Main query combining all CTEs
SELECT 
    'User Segmentation Report' as report_type,
    CURRENT_TIMESTAMP as generated_at,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'segment', customer_segment,
                'value_tier', value_segment,
                'activity', activity_segment,
                'count', cnt,
                'percentage', ROUND(cnt * 100.0 / SUM(cnt) OVER (), 2)
            )
        )
        FROM (
            SELECT 
                customer_segment,
                value_segment,
                activity_segment,
                COUNT(*) as cnt
            FROM user_segments
            GROUP BY customer_segment, value_segment, activity_segment
        ) seg
    ) as user_segments,
    
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'month', cohort_month,
                'size', cohort_size,
                'conversion_rate', conversion_rate,
                'avg_revenue', ROUND(avg_revenue_per_purchaser, 2)
            )
        )
        FROM monthly_cohorts
    ) as cohort_analysis,
    
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'product_id', product_id,
                'name', product_name,
                'category', category,
                'revenue', total_revenue,
                'rank', revenue_rank,
                'percentile', ROUND(revenue_percentile * 100, 2)
            )
        )
        FROM product_performance
        WHERE revenue_rank <= 10
    ) as top_products,
    
    (
        SELECT jsonb_object_agg(metric_type, metrics)
        FROM advanced_analytics
    ) as business_metrics;

-- Stored procedure for user lifecycle events
CREATE OR REPLACE FUNCTION update_user_lifecycle(
    p_user_id INTEGER,
    p_event_type VARCHAR(50),
    p_event_data JSONB DEFAULT '{}'::jsonb
) RETURNS VOID AS $$
DECLARE
    current_metadata JSONB;
    event_entry JSONB;
BEGIN
    -- Get current metadata
    SELECT user_metadata INTO current_metadata
    FROM users 
    WHERE id = p_user_id;
    
    -- Create event entry
    event_entry := jsonb_build_object(
        'timestamp', CURRENT_TIMESTAMP,
        'event_type', p_event_type,
        'data', p_event_data
    );
    
    -- Update user metadata with new event
    UPDATE users 
    SET user_metadata = jsonb_set(
        COALESCE(current_metadata, '{}'::jsonb),
        '{lifecycle_events}',
        COALESCE(current_metadata->'lifecycle_events', '[]'::jsonb) || event_entry
    )
    WHERE id = p_user_id;
    
    -- Update last_login if it's a login event
    IF p_event_type = 'login' THEN
        UPDATE users 
        SET last_login = CURRENT_TIMESTAMP 
        WHERE id = p_user_id;
    END IF;
    
    -- Log the event
    INSERT INTO user_events (user_id, event_type, event_data, created_at)
    VALUES (p_user_id, p_event_type, p_event_data, CURRENT_TIMESTAMP)
    ON CONFLICT DO NOTHING;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Log error and re-raise
        RAISE NOTICE 'Error updating user lifecycle for user %: %', p_user_id, SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

-- Performance optimization query
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT 
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 100;
```

### Shell/Bash - Advanced Scripting

```bash title:"DevOps Deployment Script with Error Handling"
#!/bin/bash

# Advanced deployment script with comprehensive error handling,
# logging, configuration management, and rollback capabilities

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Configuration and constants
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="${SCRIPT_DIR}/logs/deploy-$(date +%Y%m%d-%H%M%S).log"
readonly CONFIG_FILE="${SCRIPT_DIR}/deploy.conf"
readonly BACKUP_DIR="${SCRIPT_DIR}/backups"
readonly LOCK_FILE="/tmp/${SCRIPT_NAME}.lock"

# Default configuration
DEPLOY_ENV="staging"
APP_NAME="notes-wiki"
VERSION="latest"
HEALTH_CHECK_URL=""
ROLLBACK_ON_FAILURE="true"
NOTIFICATION_WEBHOOK=""
MAX_DEPLOY_TIME=600  # 10 minutes
PARALLEL_JOBS=4

# Color codes for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Logging functions
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo -e "${timestamp} [${level}] ${message}" | tee -a "$LOG_FILE"
}

log_info() {
    log "INFO" "${BLUE}$*${NC}"
}

log_warn() {
    log "WARN" "${YELLOW}$*${NC}"
}

log_error() {
    log "ERROR" "${RED}$*${NC}"
}

log_success() {
    log "SUCCESS" "${GREEN}$*${NC}"
}

# Error handling
error_exit() {
    log_error "$1"
    cleanup
    exit "${2:-1}"
}

cleanup() {
    log_info "Cleaning up..."
    
    # Remove lock file
    [[ -f "$LOCK_FILE" ]] && rm -f "$LOCK_FILE"
    
    # Kill background jobs
    jobs -p | xargs -r kill 2>/dev/null || true
    
    # Remove temporary files
    find /tmp -name "${SCRIPT_NAME}-*" -type f -mtime +1 -delete 2>/dev/null || true
}

# Signal handlers
trap 'error_exit "Script interrupted by user" 130' INT
trap 'error_exit "Script terminated" 143' TERM
trap 'cleanup' EXIT

# Utility functions
check_dependencies() {
    local deps=("curl" "jq" "docker" "git" "rsync")
    local missing=()
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            missing+=("$dep")
        fi
    done
    
    if [[ ${#missing[@]} -gt 0 ]]; then
        error_exit "Missing dependencies: ${missing[*]}"
    fi
}

load_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        log_info "Loading configuration from $CONFIG_FILE"
        # Source config file safely
        while IFS='=' read -r key value; do
            # Skip comments and empty lines
            [[ $key =~ ^[[:space:]]*# ]] && continue
            [[ -z $key ]] && continue
            
            # Remove quotes and export
            value="${value%\"}"
            value="${value#\"}"
            declare -g "$key=$value"
        done < "$CONFIG_FILE"
    else
        log_warn "Configuration file not found: $CONFIG_FILE"
    fi
}

acquire_lock() {
    if [[ -f "$LOCK_FILE" ]]; then
        local lock_pid
        lock_pid=$(cat "$LOCK_FILE" 2>/dev/null || echo "unknown")
        
        if kill -0 "$lock_pid" 2>/dev/null; then
            error_exit "Another deployment is already running (PID: $lock_pid)"
        else
            log_warn "Stale lock file found, removing it"
            rm -f "$LOCK_FILE"
        fi
    fi
    
    echo $$ > "$LOCK_FILE"
    log_info "Acquired deployment lock"
}

validate_environment() {
    local valid_envs=("development" "staging" "production")
    
    if [[ ! " ${valid_envs[*]} " =~ " $DEPLOY_ENV " ]]; then
        error_exit "Invalid environment: $DEPLOY_ENV. Valid options: ${valid_envs[*]}"
    fi
    
    # Environment-specific validations
    case "$DEPLOY_ENV" in
        production)
            if [[ "$VERSION" == "latest" ]]; then
                error_exit "Cannot deploy 'latest' to production. Specify a version tag."
            fi
            ;;
        staging)
            if [[ -z "$HEALTH_CHECK_URL" ]]; then
                log_warn "No health check URL specified for staging"
            fi
            ;;
    esac
}

# Docker operations
build_image() {
    log_info "Building Docker image for $APP_NAME:$VERSION"
    
    local build_args=""
    case "$DEPLOY_ENV" in
        production)
            build_args="--build-arg NODE_ENV=production --build-arg OPTIMIZE=true"
            ;;
        staging)
            build_args="--build-arg NODE_ENV=staging"
            ;;
        development)
            build_args="--build-arg NODE_ENV=development --build-arg DEBUG=true"
            ;;
    esac
    
    if ! docker build \
        $build_args \
        --tag "$APP_NAME:$VERSION" \
        --tag "$APP_NAME:latest" \
        --cache-from "$APP_NAME:latest" \
        . 2>&1 | tee -a "$LOG_FILE"; then
        error_exit "Docker build failed"
    fi
    
    log_success "Docker image built successfully"
}

# Health check function
health_check() {
    local url="$1"
    local max_attempts="${2:-30}"
    local attempt=1
    
    log_info "Performing health check: $url"
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -sf "$url" >/dev/null 2>&1; then
            log_success "Health check passed (attempt $attempt)"
            return 0
        fi
        
        log_info "Health check failed (attempt $attempt/$max_attempts), retrying in 10s..."
        sleep 10
        ((attempt++))
    done
    
    log_error "Health check failed after $max_attempts attempts"
    return 1
}

# Backup functions
create_backup() {
    local backup_name="${APP_NAME}-backup-$(date +%Y%m%d-%H%M%S)"
    local backup_path="$BACKUP_DIR/$backup_name"
    
    log_info "Creating backup: $backup_name"
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup database if applicable
    if [[ -n "${DATABASE_URL:-}" ]]; then
        pg_dump "$DATABASE_URL" > "$backup_path.sql" 2>/dev/null || {
            log_warn "Database backup failed"
        }
    fi
    
    # Backup application files
    if [[ -d "/opt/$APP_NAME" ]]; then
        tar -czf "$backup_path.tar.gz" -C "/opt" "$APP_NAME" 2>/dev/null || {
            log_warn "Application backup failed"
        }
    fi
    
    # Store backup metadata
    cat > "$backup_path.json" << EOF
{
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "environment": "$DEPLOY_ENV",
    "version": "$VERSION",
    "backup_type": "pre_deploy"
}
EOF
    
    echo "$backup_name"
}

# Deployment functions
deploy_application() {
    log_info "Deploying $APP_NAME:$VERSION to $DEPLOY_ENV"
    
    # Create backup before deployment
    local backup_name
    backup_name=$(create_backup)
    
    # Stop existing containers
    docker-compose -f "docker-compose.$DEPLOY_ENV.yml" down 2>/dev/null || true
    
    # Deploy new version
    if ! docker-compose -f "docker-compose.$DEPLOY_ENV.yml" up -d --remove-orphans; then
        log_error "Deployment failed, attempting rollback..."
        rollback_deployment "$backup_name"
        error_exit "Deployment failed and rollback completed"
    fi
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 30
    
    # Perform health checks
    if [[ -n "$HEALTH_CHECK_URL" ]]; then
        if ! health_check "$HEALTH_CHECK_URL"; then
            if [[ "$ROLLBACK_ON_FAILURE" == "true" ]]; then
                log_error "Health check failed, attempting rollback..."
                rollback_deployment "$backup_name"
                error_exit "Deployment failed health check and rollback completed"
            else
                log_error "Health check failed, but rollback is disabled"
                return 1
            fi
        fi
    fi
    
    log_success "Deployment completed successfully"
}

rollback_deployment() {
    local backup_name="$1"
    
    log_warn "Rolling back deployment using backup: $backup_name"
    
    # Stop current deployment
    docker-compose down 2>/dev/null || true
    
    # Restore from backup
    if [[ -f "$BACKUP_DIR/$backup_name.tar.gz" ]]; then
        tar -xzf "$BACKUP_DIR/$backup_name.tar.gz" -C "/opt" 2>/dev/null || {
            log_error "Failed to restore application files"
        }
    fi
    
    # Restore database if backup exists
    if [[ -f "$BACKUP_DIR/$backup_name.sql" && -n "${DATABASE_URL:-}" ]]; then
        psql "$DATABASE_URL" < "$BACKUP_DIR/$backup_name.sql" 2>/dev/null || {
            log_error "Failed to restore database"
        }
    fi
    
    log_success "Rollback completed"
}

# Notification functions
send_notification() {
    local status="$1"
    local message="$2"
    
    if [[ -n "$NOTIFICATION_WEBHOOK" ]]; then
        local payload
        payload=$(jq -n \
            --arg app "$APP_NAME" \
            --arg env "$DEPLOY_ENV" \
            --arg version "$VERSION" \
            --arg status "$status" \
            --arg message "$message" \
            --arg timestamp "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
            '{
                app: $app,
                environment: $env,
                version: $version,
                status: $status,
                message: $message,
                timestamp: $timestamp
            }'
        )
        
        curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "$payload" \
            "$NOTIFICATION_WEBHOOK" >/dev/null || {
            log_warn "Failed to send notification"
        }
    fi
}

# Main deployment workflow
main() {
    log_info "Starting deployment of $APP_NAME:$VERSION to $DEPLOY_ENV"
    
    # Setup
    mkdir -p "$(dirname "$LOG_FILE")"
    acquire_lock
    check_dependencies
    load_config
    validate_environment
    
    # Deployment process with timeout
    timeout "$MAX_DEPLOY_TIME" bash -c '
        build_image
        deploy_application
    ' || error_exit "Deployment timed out after $MAX_DEPLOY_TIME seconds"
    
    # Success notification
    send_notification "success" "Deployment completed successfully"
    log_success "Deployment of $APP_NAME:$VERSION to $DEPLOY_ENV completed successfully"
}

# Command line argument parsing
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            DEPLOY_ENV="$2"
            shift 2
            ;;
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -a|--app)
            APP_NAME="$2"
            shift 2
            ;;
        --no-rollback)
            ROLLBACK_ON_FAILURE="false"
            shift
            ;;
        --health-check)
            HEALTH_CHECK_URL="$2"
            shift 2
            ;;
        -h|--help)
            cat << EOF
Usage: $SCRIPT_NAME [OPTIONS]

Options:
    -e, --environment ENV    Deployment environment (development|staging|production)
    -v, --version VERSION    Version to deploy (default: latest)
    -a, --app APP_NAME       Application name (default: notes-wiki)
    --no-rollback           Disable automatic rollback on failure
    --health-check URL      Health check URL
    -h, --help              Show this help message

Examples:
    $SCRIPT_NAME -e staging -v v1.2.3
    $SCRIPT_NAME -e production -v v1.2.3 --health-check https://api.example.com/health
EOF
            exit 0
            ;;
        *)
            error_exit "Unknown option: $1"
            ;;
    esac
done

# Run main function
main "$@"
```

## 🎛️ Advanced Code Block Features

### Collapsible Code Sections

```javascript title:"Advanced Theme Manager" collapse:"true"
// This code block demonstrates the collapsible feature
// Click the arrow to expand/collapse the content

class AdvancedThemeManager {
    constructor(options = {}) {
        this.themes = new Map();
        this.currentTheme = null;
        this.observers = new Set();
        this.autoDetect = options.autoDetect ?? true;
        this.persistSettings = options.persist ?? true;
        
        // Initialize system theme detection
        if (this.autoDetect) {
            this.initializeSystemThemeDetection();
        }
    }
    
    initializeSystemThemeDetection() {
        // Check for system theme preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Set initial theme based on system preference
        this.handleSystemThemeChange(mediaQuery);
        
        // Listen for system theme changes
        mediaQuery.addListener(this.handleSystemThemeChange.bind(this));
    }
    
    handleSystemThemeChange(mediaQuery) {
        const prefersDark = mediaQuery.matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        
        if (this.autoDetect && !this.hasUserPreference()) {
            this.applyTheme(systemTheme);
        }
        
        this.notifyObservers('system-theme-changed', { prefersDark, systemTheme });
    }
    
    registerTheme(id, theme) {
        if (!theme.name || !theme.css) {
            throw new Error('Theme must have name and css properties');
        }
        
        this.themes.set(id, {
            id,
            ...theme,
            registered: new Date().toISOString()
        });
        
        this.notifyObservers('theme-registered', { id, theme });
    }
    
    async applyTheme(themeId) {
        const theme = this.themes.get(themeId);
        if (!theme) {
            throw new Error(`Theme '${themeId}' not found`);
        }
        
        try {
            // Remove existing theme
            if (this.currentTheme) {
                document.documentElement.removeAttribute('data-theme');
                this.removeThemeCSS(this.currentTheme.id);
            }
            
            // Apply new theme
            await this.injectThemeCSS(theme);
            document.documentElement.setAttribute('data-theme', themeId);
            
            this.currentTheme = theme;
            
            // Persist user preference
            if (this.persistSettings) {
                localStorage.setItem('user-theme-preference', themeId);
            }
            
            this.notifyObservers('theme-changed', { 
                from: this.currentTheme?.id,
                to: themeId,
                theme
            });
            
            return { success: true, theme };
            
        } catch (error) {
            console.error('Failed to apply theme:', error);
            throw new Error(`Theme application failed: ${error.message}`);
        }
    }
    
    async injectThemeCSS(theme) {
        return new Promise((resolve, reject) => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = theme.css;
            linkElement.id = `theme-${theme.id}`;
            
            linkElement.onload = () => resolve();
            linkElement.onerror = () => reject(new Error(`Failed to load theme CSS: ${theme.css}`));
            
            document.head.appendChild(linkElement);
        });
    }
    
    removeThemeCSS(themeId) {
        const existingLink = document.getElementById(`theme-${themeId}`);
        if (existingLink) {
            existingLink.remove();
        }
    }
    
    hasUserPreference() {
        return localStorage.getItem('user-theme-preference') !== null;
    }
    
    addObserver(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Observer must be a function');
        }
        
        this.observers.add(callback);
        
        // Return unsubscribe function
        return () => this.observers.delete(callback);
    }
    
    notifyObservers(event, data) {
        this.observers.forEach(observer => {
            try {
                observer(event, data);
            } catch (error) {
                console.error('Observer error:', error);
            }
        });
    }
    
    getAvailableThemes() {
        return Array.from(this.themes.entries()).map(([id, theme]) => ({
            id,
            name: theme.name,
            type: theme.type || 'unknown',
            description: theme.description
        }));
    }
    
    getCurrentTheme() {
        return this.currentTheme ? { ...this.currentTheme } : null;
    }
    
    resetToSystemDefault() {
        localStorage.removeItem('user-theme-preference');
        
        if (this.autoDetect) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme(prefersDark ? 'dark' : 'light');
        }
    }
}

// Usage example
const themeManager = new AdvancedThemeManager({
    autoDetect: true,
    persist: true
});

// Register themes
themeManager.registerTheme('dark-pro', {
    name: 'Dark Pro',
    type: 'dark',
    description: 'Professional dark theme',
    css: '/themes/dark-pro.css'
});

// Listen for theme changes
const unsubscribe = themeManager.addObserver((event, data) => {
    console.log(`Theme event: ${event}`, data);
});

// Apply theme
themeManager.applyTheme('dark-pro').then(result => {
    console.log('Theme applied successfully:', result);
});
```

## 🧪 More Language Examples

### C++ - Modern Systems Programming

```cpp title:"C++20 Coroutines and Modern Features"
#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>
#include <ranges>
#include <coroutine>
#include <chrono>
#include <format>
#include <concepts>
#include <span>

// C++20 Concepts
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<typename T>
concept Printable = requires(T t) {
    std::cout << t;
};

// Coroutine example with C++20
struct Task {
    struct promise_type {
        Task get_return_object() {
            return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
    };
    
    std::coroutine_handle<promise_type> coro;
    
    Task(std::coroutine_handle<promise_type> h) : coro(h) {}
    ~Task() { if (coro) coro.destroy(); }
    
    // Move semantics
    Task(Task&& other) noexcept : coro(std::exchange(other.coro, {})) {}
    Task& operator=(Task&& other) noexcept {
        if (this != &other) {
            if (coro) coro.destroy();
            coro = std::exchange(other.coro, {});
        }
        return *this;
    }
    
    // Delete copy operations
    Task(const Task&) = delete;
    Task& operator=(const Task&) = delete;
};

// Modern C++ class with RAII and smart pointers
class DataProcessor {
private:
    std::unique_ptr<std::vector<double>> data_;
    std::string name_;
    mutable std::mutex mutex_;
    
public:
    // Constructor with perfect forwarding
    template<typename String>
    explicit DataProcessor(String&& name) 
        : data_(std::make_unique<std::vector<double>>())
        , name_(std::forward<String>(name)) {
        std::cout << std::format("Created DataProcessor: {}\n", name_);
    }
    
    // Variadic template for adding multiple values
    template<Numeric... Args>
    void addValues(Args... values) {
        std::lock_guard<std::mutex> lock(mutex_);
        (data_->push_back(static_cast<double>(values)), ...);
    }
    
    // Range-based processing with C++20 ranges
    auto getProcessedData() const -> std::vector<double> {
        std::lock_guard<std::mutex> lock(mutex_);
        
        auto filtered = *data_ 
                      | std::views::filter([](double x) { return x > 0.0; })
                      | std::views::transform([](double x) { return x * 2.0; });
        
        return std::vector<double>(filtered.begin(), filtered.end());
    }
    
    // Coroutine function
    Task processAsync() const {
        std::cout << "Starting async processing...\n";
        
        // Simulate async work
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        
        auto processed = getProcessedData();
        std::cout << std::format("Processed {} items\n", processed.size());
        
        co_return;
    }
    
    // Operator overloading with concepts
    template<Printable T>
    friend auto operator<<(std::ostream& os, const T& processor) -> std::ostream& {
        return os << std::format("DataProcessor[{}]: {} items", 
                                processor.name_, processor.data_->size());
    }
    
    // Span usage for memory-safe array access
    void processSpan(std::span<const double> input) {
        std::lock_guard<std::mutex> lock(mutex_);
        data_->insert(data_->end(), input.begin(), input.end());
    }
    
    // Move semantics
    DataProcessor(DataProcessor&& other) noexcept 
        : data_(std::move(other.data_))
        , name_(std::move(other.name_)) {}
    
    DataProcessor& operator=(DataProcessor&& other) noexcept {
        if (this != &other) {
            data_ = std::move(other.data_);
            name_ = std::move(other.name_);
        }
        return *this;
    }
    
    // Deleted copy operations (move-only type)
    DataProcessor(const DataProcessor&) = delete;
    DataProcessor& operator=(const DataProcessor&) = delete;
    
    ~DataProcessor() {
        std::cout << std::format("Destroyed DataProcessor: {}\n", name_);
    }
};

// CRTP (Curiously Recurring Template Pattern) example
template<typename Derived>
class Cacheable {
protected:
    mutable std::optional<std::string> cache_;
    
public:
    const std::string& getValue() const {
        if (!cache_) {
            cache_ = static_cast<const Derived*>(this)->computeValue();
        }
        return *cache_;
    }
    
    void invalidateCache() { cache_.reset(); }
};

class ExpensiveComputation : public Cacheable<ExpensiveComputation> {
    int value_;
    
public:
    explicit ExpensiveComputation(int v) : value_(v) {}
    
    std::string computeValue() const {
        // Simulate expensive computation
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
        return std::format("Computed result: {}", value_ * value_);
    }
};

// Template specialization
template<typename T>
struct TypeTraits {
    static constexpr bool is_numeric = false;
    static constexpr const char* name = "unknown";
};

template<>
struct TypeTraits<int> {
    static constexpr bool is_numeric = true;
    static constexpr const char* name = "integer";
};

template<>
struct TypeTraits<double> {
    static constexpr bool is_numeric = true;
    static constexpr const char* name = "double";
};

// Modern factory pattern with perfect forwarding
class ProcessorFactory {
public:
    template<typename... Args>
    static auto createProcessor(Args&&... args) -> std::unique_ptr<DataProcessor> {
        return std::make_unique<DataProcessor>(std::forward<Args>(args)...);
    }
};

int main() {
    try {
        // Modern C++20 features demonstration
        auto processor = ProcessorFactory::createProcessor("MainProcessor");
        
        // Variadic templates
        processor->addValues(1.5, 2.7, -1.2, 4.8, 0.0, 3.3);
        
        // Span usage
        std::array<double, 3> additional_data{5.5, 6.6, 7.7};
        processor->processSpan(additional_data);
        
        // Ranges and views
        auto processed = processor->getProcessedData();
        
        std::cout << "Processed data: ";
        for (const auto& value : processed | std::views::take(5)) {
            std::cout << std::format("{:.1f} ", value);
        }
        std::cout << "\n";
        
        // Coroutines
        auto task = processor->processAsync();
        
        // CRTP example
        ExpensiveComputation computation(42);
        std::cout << "First call: " << computation.getValue() << "\n";
        std::cout << "Second call (cached): " << computation.getValue() << "\n";
        
        // Concepts and type traits
        if constexpr (TypeTraits<int>::is_numeric) {
            std::cout << std::format("int is numeric: {}\n", TypeTraits<int>::name);
        }
        
        // Structured bindings with ranges
        std::vector<std::pair<std::string, int>> data{
            {"apple", 5}, {"banana", 3}, {"cherry", 8}
        };
        
        for (const auto& [fruit, count] : data) {
            std::cout << std::format("{}: {}\n", fruit, count);
        }
        
        // Lambda with capture and concepts
        auto process_numeric = []<Numeric T>(T value) -> T {
            std::cout << std::format("Processing numeric value: {}\n", value);
            return value * 2;
        };
        
        auto result = process_numeric(42);
        std::cout << std::format("Result: {}\n", result);
        
    } catch (const std::exception& e) {
        std::cerr << std::format("Exception: {}\n", e.what());
        return 1;
    }
    
    return 0;
}
```

### PHP - Modern Web Development

```php title:"PHP 8+ Modern Web Application"
<?php
declare(strict_types=1);

namespace App;

use Attribute;
use JsonSerializable;
use InvalidArgumentException;
use RuntimeException;

// PHP 8 Attributes
#[Attribute(Attribute::TARGET_CLASS)]
class Entity
{
    public function __construct(
        public readonly string $table,
        public readonly ?string $primaryKey = 'id'
    ) {}
}

#[Attribute(Attribute::TARGET_PROPERTY)]
class Column
{
    public function __construct(
        public readonly string $name,
        public readonly string $type = 'string',
        public readonly bool $nullable = false
    ) {}
}

// Enums (PHP 8.1+)
enum UserRole: string
{
    case ADMIN = 'admin';
    case USER = 'user';
    case MODERATOR = 'moderator';
    
    public function getPermissions(): array
    {
        return match($this) {
            self::ADMIN => ['create', 'read', 'update', 'delete', 'manage'],
            self::MODERATOR => ['create', 'read', 'update'],
            self::USER => ['read'],
        };
    }
    
    public function getLabel(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::MODERATOR => 'Moderator',
            self::USER => 'Regular User',
        };
    }
}

enum Status: int
{
    case ACTIVE = 1;
    case INACTIVE = 0;
    case PENDING = 2;
    
    public function isActive(): bool
    {
        return $this === self::ACTIVE;
    }
}

// Modern PHP class with typed properties and constructor promotion
#[Entity(table: 'users', primaryKey: 'id')]
class User implements JsonSerializable
{
    public function __construct(
        #[Column(name: 'id', type: 'int')]
        public readonly int $id,
        
        #[Column(name: 'email', type: 'string')]
        public readonly string $email,
        
        #[Column(name: 'name', type: 'string')]
        public string $name,
        
        #[Column(name: 'role', type: 'enum')]
        public UserRole $role = UserRole::USER,
        
        #[Column(name: 'status', type: 'enum')]
        public Status $status = Status::ACTIVE,
        
        #[Column(name: 'created_at', type: 'datetime')]
        public readonly \DateTimeImmutable $createdAt = new \DateTimeImmutable(),
        
        #[Column(name: 'metadata', type: 'json', nullable: true)]
        public ?array $metadata = null
    ) {
        $this->validateEmail($email);
        $this->validateName($name);
    }
    
    private function validateEmail(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Invalid email format: {$email}");
        }
    }
    
    private function validateName(string $name): void
    {
        if (strlen(trim($name)) < 2) {
            throw new InvalidArgumentException('Name must be at least 2 characters long');
        }
    }
    
    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->role->getPermissions(), true);
    }
    
    public function isActive(): bool
    {
        return $this->status->isActive();
    }
    
    public function updateName(string $newName): self
    {
        $this->validateName($newName);
        $this->name = $newName;
        return $this;
    }
    
    public function promoteToRole(UserRole $newRole): self
    {
        $this->role = $newRole;
        return $this;
    }
    
    // Named arguments and union types
    public function updateMetadata(
        string|array|null $key = null,
        mixed $value = null,
        bool $merge = true
    ): self {
        if (is_string($key) && $value !== null) {
            // Single key-value update
            $this->metadata ??= [];
            $this->metadata[$key] = $value;
        } elseif (is_array($key)) {
            // Array update
            $this->metadata = $merge 
                ? array_merge($this->metadata ?? [], $key)
                : $key;
        } elseif ($key === null && $value === null) {
            // Clear metadata
            $this->metadata = null;
        }
        
        return $this;
    }
    
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'role' => $this->role->value,
            'role_label' => $this->role->getLabel(),
            'status' => $this->status->value,
            'is_active' => $this->isActive(),
            'permissions' => $this->role->getPermissions(),
            'created_at' => $this->createdAt->format('c'),
            'metadata' => $this->metadata,
        ];
    }
}

// Repository pattern with modern PHP features
class UserRepository
{
    public function __construct(
        private readonly \PDO $pdo,
        private readonly \Psr\Log\LoggerInterface $logger
    ) {}
    
    public function findById(int $id): ?User
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = ?');
        $stmt->execute([$id]);
        $data = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        return $data ? $this->hydrate($data) : null;
    }
    
    public function findByEmail(string $email): ?User
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $data = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        return $data ? $this->hydrate($data) : null;
    }
    
    /**
     * @return User[]
     */
    public function findByRole(UserRole $role, int $limit = 100): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE role = ? LIMIT ?');
        $stmt->execute([$role->value, $limit]);
        
        return array_map(
            fn(array $data) => $this->hydrate($data),
            $stmt->fetchAll(\PDO::FETCH_ASSOC)
        );
    }
    
    public function save(User $user): void
    {
        try {
            $this->pdo->beginTransaction();
            
            $stmt = $this->pdo->prepare(
                'INSERT INTO users (email, name, role, status, created_at, metadata) 
                 VALUES (?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 name = VALUES(name), 
                 role = VALUES(role), 
                 status = VALUES(status),
                 metadata = VALUES(metadata)'
            );
            
            $stmt->execute([
                $user->email,
                $user->name,
                $user->role->value,
                $user->status->value,
                $user->createdAt->format('Y-m-d H:i:s'),
                json_encode($user->metadata),
            ]);
            
            $this->pdo->commit();
            $this->logger->info('User saved successfully', ['user_id' => $user->id]);
            
        } catch (\Exception $e) {
            $this->pdo->rollBack();
            $this->logger->error('Failed to save user', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            throw new RuntimeException('Failed to save user', 0, $e);
        }
    }
    
    private function hydrate(array $data): User
    {
        return new User(
            id: (int) $data['id'],
            email: $data['email'],
            name: $data['name'],
            role: UserRole::from($data['role']),
            status: Status::from((int) $data['status']),
            createdAt: new \DateTimeImmutable($data['created_at']),
            metadata: $data['metadata'] ? json_decode($data['metadata'], true) : null
        );
    }
}

// Service class with dependency injection
class UserService
{
    public function __construct(
        private readonly UserRepository $repository,
        private readonly \Psr\EventDispatcher\EventDispatcherInterface $eventDispatcher,
        private readonly \Psr\Log\LoggerInterface $logger
    ) {}
    
    public function createUser(
        string $email,
        string $name,
        UserRole $role = UserRole::USER,
        ?array $metadata = null
    ): User {
        // Check if user already exists
        if ($this->repository->findByEmail($email)) {
            throw new InvalidArgumentException("User with email {$email} already exists");
        }
        
        $user = new User(
            id: $this->generateId(),
            email: $email,
            name: $name,
            role: $role,
            metadata: $metadata
        );
        
        $this->repository->save($user);
        
        // Dispatch event
        $this->eventDispatcher->dispatch(new UserCreatedEvent($user));
        
        $this->logger->info('User created', [
            'user_id' => $user->id,
            'email' => $user->email,
            'role' => $user->role->value
        ]);
        
        return $user;
    }
    
    public function promoteUser(int $userId, UserRole $newRole): User
    {
        $user = $this->repository->findById($userId);
        if (!$user) {
            throw new InvalidArgumentException("User with ID {$userId} not found");
        }
        
        $oldRole = $user->role;
        $user->promoteToRole($newRole);
        $this->repository->save($user);
        
        $this->eventDispatcher->dispatch(new UserRoleChangedEvent($user, $oldRole, $newRole));
        
        return $user;
    }
    
    // Match expression (PHP 8.0+)
    public function getUsersByStatus(Status $status): array
    {
        $users = match($status) {
            Status::ACTIVE => $this->repository->findByRole(UserRole::USER),
            Status::PENDING => $this->repository->findByRole(UserRole::MODERATOR),
            Status::INACTIVE => [],
        };
        
        return array_filter($users, fn(User $user) => $user->status === $status);
    }
    
    private function generateId(): int
    {
        return random_int(100000, 999999);
    }
}

// Event classes
readonly class UserCreatedEvent
{
    public function __construct(public User $user) {}
}

readonly class UserRoleChangedEvent
{
    public function __construct(
        public User $user,
        public UserRole $oldRole,
        public UserRole $newRole
    ) {}
}

// Modern controller with attributes and typed properties
#[Route('/api/users')]
class UserController
{
    public function __construct(
        private readonly UserService $userService,
        private readonly \Psr\Http\Message\ResponseFactoryInterface $responseFactory
    ) {}
    
    #[Route('/', methods: ['POST'])]
    public function create(\Psr\Http\Message\ServerRequestInterface $request): \Psr\Http\Message\ResponseInterface
    {
        $data = json_decode($request->getBody()->getContents(), true);
        
        try {
            $user = $this->userService->createUser(
                email: $data['email'] ?? throw new InvalidArgumentException('Email is required'),
                name: $data['name'] ?? throw new InvalidArgumentException('Name is required'),
                role: isset($data['role']) ? UserRole::from($data['role']) : UserRole::USER,
                metadata: $data['metadata'] ?? null
            );
            
            return $this->jsonResponse($user, 201);
            
        } catch (InvalidArgumentException $e) {
            return $this->jsonResponse(['error' => $e->getMessage()], 400);
        }
    }
    
    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): \Psr\Http\Message\ResponseInterface
    {
        $user = $this->userService->findById($id);
        
        return $user 
            ? $this->jsonResponse($user)
            : $this->jsonResponse(['error' => 'User not found'], 404);
    }
    
    private function jsonResponse(mixed $data, int $status = 200): \Psr\Http\Message\ResponseInterface
    {
        $response = $this->responseFactory->createResponse($status);
        $response->getBody()->write(json_encode($data));
        
        return $response->withHeader('Content-Type', 'application/json');
    }
}

// Usage example
function demonstrateModernPHP(): void
{
    // Create PDO connection
    $pdo = new \PDO('sqlite::memory:');
    $pdo->exec('CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        role TEXT,
        status INTEGER,
        created_at TEXT,
        metadata TEXT
    )');
    
    // Setup dependencies
    $logger = new class implements \Psr\Log\LoggerInterface {
        public function log($level, string|\Stringable $message, array $context = []): void {
            echo "[{$level}] {$message} " . json_encode($context) . "\n";
        }
        // Implement other methods...
        public function emergency($message, array $context = []): void { $this->log('emergency', $message, $context); }
        public function alert($message, array $context = []): void { $this->log('alert', $message, $context); }
        public function critical($message, array $context = []): void { $this->log('critical', $message, $context); }
        public function error($message, array $context = []): void { $this->log('error', $message, $context); }
        public function warning($message, array $context = []): void { $this->log('warning', $message, $context); }
        public function notice($message, array $context = []): void { $this->log('notice', $message, $context); }
        public function info($message, array $context = []): void { $this->log('info', $message, $context); }
        public function debug($message, array $context = []): void { $this->log('debug', $message, $context); }
    };
    
    $eventDispatcher = new class implements \Psr\EventDispatcher\EventDispatcherInterface {
        public function dispatch(object $event): object {
            echo "Event dispatched: " . get_class($event) . "\n";
            return $event;
        }
    };
    
    // Create services
    $repository = new UserRepository($pdo, $logger);
    $userService = new UserService($repository, $eventDispatcher, $logger);
    
    // Demonstrate features
    try {
        // Create users with different roles
        $admin = $userService->createUser(
            email: 'admin@example.com',
            name: 'Admin User',
            role: UserRole::ADMIN,
            metadata: ['department' => 'IT', 'level' => 'senior']
        );
        
        $user = $userService->createUser(
            email: 'user@example.com',
            name: 'Regular User'
        );
        
        // Demonstrate enum methods
        echo "Admin permissions: " . implode(', ', $admin->role->getPermissions()) . "\n";
        echo "User can delete: " . ($user->hasPermission('delete') ? 'Yes' : 'No') . "\n";
        
        // Demonstrate match expression
        $activeUsers = $userService->getUsersByStatus(Status::ACTIVE);
        echo "Active users count: " . count($activeUsers) . "\n";
        
        // Demonstrate JSON serialization
        echo "Admin JSON: " . json_encode($admin, JSON_PRETTY_PRINT) . "\n";
        
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Run demonstration
demonstrateModernPHP();
```

## 🔧 Code Block Settings & Configuration

### Line Number Options

The wiki supports multiple line number configurations:

```css title:"Line Number CSS Implementation"
/* CSS Counter-based Line Numbers */
.code-block {
    counter-reset: line-number;
    position: relative;
}

.code-block .line {
    counter-increment: line-number;
    position: relative;
    padding-left: 3em;
}

.code-block .line::before {
    content: counter(line-number);
    position: absolute;
    left: 0;
    width: 2.5em;
    text-align: right;
    color: var(--line-number-color);
    font-size: 0.875em;
    line-height: inherit;
    padding-right: 0.5em;
}

/* Word wrap support - line numbers stay aligned */
.code-block.word-wrap .line {
    white-space: pre-wrap;
    word-break: break-all;
}

/* Different line number styles */
.code-block.minimal .line::before {
    color: var(--text-muted);
    font-weight: 300;
}

.code-block.highlighted .line::before {
    background: var(--line-number-bg);
    border-right: 1px solid var(--border-color);
}
```

### Copy Button Implementation

```javascript title:"Copy Button Functionality"
// Enhanced copy functionality with proper HTML entity handling
function initializeCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
        if (block.querySelector('.copy-button')) return; // Already initialized
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
        `;
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', async () => {
            try {
                // Get the code content, handling HTML entities properly
                const codeElement = block.querySelector('code') || block.querySelector('pre');
                let textContent = '';
                
                if (codeElement) {
                    // Handle HTML entities and preserve formatting
                    textContent = codeElement.textContent || codeElement.innerText || '';
                    
                    // Clean up any extra whitespace but preserve intentional formatting
                    textContent = textContent.replace(/^\n+|\n+$/g, '');
                }
                
                // Use modern clipboard API with fallback
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textContent);
                } else {
                    // Fallback for older browsers or non-HTTPS
                    const textArea = document.createElement('textarea');
                    textArea.value = textContent;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                
                // Visual feedback
                const originalHTML = copyButton.innerHTML;
                copyButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" style="color: var(--success-color)">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                `;
                copyButton.title = 'Copied!';
                
                setTimeout(() => {
                    copyButton.innerHTML = originalHTML;
                    copyButton.title = 'Copy code';
                }, 2000);
                
            } catch (error) {
                console.error('Failed to copy code:', error);
                
                // Error feedback
                copyButton.style.color = 'var(--error-color)';
                copyButton.title = 'Copy failed';
                
                setTimeout(() => {
                    copyButton.style.color = '';
                    copyButton.title = 'Copy code';
                }, 2000);
            }
        });
        
        // Position the button
        block.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '0.5rem';
        copyButton.style.right = '0.5rem';
        copyButton.style.zIndex = '10';
        
        block.appendChild(copyButton);
    });
}

// Initialize copy buttons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCopyButtons);
} else {
    initializeCopyButtons();
}

// Re-initialize when new content is added dynamically
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const codeBlocks = node.querySelectorAll 
                    ? node.querySelectorAll('.code-block')
                    : [];
                
                if (codeBlocks.length > 0) {
                    initializeCopyButtons();
                }
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
```

## 🎨 Theme Integration

Code blocks automatically inherit styling from the current theme:

### Theme Variables

```css title:"Theme-Aware Code Block Variables"
:root {
    /* Code block colors - automatically adjusted per theme */
    --code-bg: var(--bg-secondary);
    --code-text: var(--text-primary);
    --code-border: var(--border-primary);
    --line-number-color: var(--text-muted);
    --line-number-bg: var(--bg-tertiary);
    
    /* Syntax highlighting colors */
    --syntax-keyword: var(--accent-primary);
    --syntax-string: var(--success-color);
    --syntax-number: var(--warning-color);
    --syntax-comment: var(--text-muted);
    --syntax-function: var(--info-color);
    --syntax-operator: var(--text-secondary);
}

/* Theme-specific overrides */
[data-theme="dark"] {
    --code-bg: #1e1e1e;
    --syntax-keyword: #569cd6;
    --syntax-string: #ce9178;
    --syntax-number: #b5cea8;
    --syntax-comment: #6a9955;
}

[data-theme="dracula"] {
    --code-bg: #282a36;
    --syntax-keyword: #ff79c6;
    --syntax-string: #f1fa8c;
    --syntax-number: #bd93f9;
    --syntax-comment: #6272a4;
}
```

## 📱 Responsive Design

Code blocks adapt to different screen sizes:

```css title:"Responsive Code Block Styles"
/* Mobile-first responsive design */
.code-block {
    font-size: 0.875rem;
    overflow-x: auto;
    max-width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
    .code-block {
        font-size: 0.9rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .code-block {
        font-size: 1rem;
    }
}

/* Large screens */
@media (min-width: 1440px) {
    .code-block {
        font-size: 1.1rem;
    }
}

/* Mobile-specific optimizations */
@media (max-width: 767px) {
    .code-block {
        margin-left: -1rem;
        margin-right: -1rem;
        border-radius: 0;
        border-left: none;
        border-right: none;
    }
    
    .copy-button {
        top: 0.25rem;
        right: 0.25rem;
        padding: 0.25rem;
    }
    
    /* Collapsible blocks more touch-friendly */
    .code-block[data-collapsible] .code-header {
        padding: 0.75rem 1rem;
        min-height: 44px; /* iOS minimum touch target */
    }
}
```

## 🔍 Search Integration

Code blocks are fully searchable and indexed:

- **Content Indexing**: All code content is included in the search index
- **Language Filtering**: Search by programming language with `code:javascript`
- **In-Note Search**: Ctrl+F highlights code content within notes
- **Copy-Friendly**: Search results preserve code formatting when copied

## ⚡ Performance Optimizations

- **Lazy Loading**: Syntax highlighting applied only when blocks are visible
- **Efficient Rendering**: CSS counters for line numbers (no DOM manipulation)
- **Memory Management**: Proper cleanup of event listeners and observers
- **Theme Caching**: Prism.js themes loaded once and cached
- **Debounced Updates**: Copy button feedback and resize events are debounced

## 🧪 Testing Code Blocks

This comprehensive demo includes examples of:
- ✅ **15+ Programming Languages** with professional syntax highlighting
- ✅ **Collapsible Sections** with expand/collapse functionality  
- ✅ **Custom Titles** with descriptive headers
- ✅ **Copy Functionality** with HTML entity handling
- ✅ **Line Numbers** with word-wrap alignment
- ✅ **Theme Integration** across all 50+ themes
- ✅ **Responsive Design** for all device sizes
- ✅ **Performance Optimization** for large codebases
- ✅ **Accessibility** with proper ARIA labels and keyboard navigation

The code block system is production-ready and handles edge cases gracefully while maintaining excellent performance across all themes and devices.
        this.currentTheme = null;
        this.observers = new Set();
        this.autoDetect = options.autoDetect ?? true;
        this.persistSettings = options.persist ?? true;
        
        // Initialize system theme detection
        if (this.autoDetect) {
            this.initializeSystemThemeDetection();
        }
    }
    
    initializeSystemThemeDetection() {
        // Check for system theme preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Set initial theme based on system preference
        this.handleSystemThemeChange(mediaQuery);
        
        // Listen for system theme changes
        mediaQuery.addListener(this.handleSystemThemeChange.bind(this));
    }
    
    handleSystemThemeChange(mediaQuery) {
        const prefersDark = mediaQuery.matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        
        if (this.autoDetect && !this.hasUserPreference()) {
            this.applyTheme(systemTheme);
        }
        
        this.notifyObservers('system-theme-changed', { prefersDark, systemTheme });
    }
    
    registerTheme(id, theme) {
        if (!theme.name || !theme.css) {
            throw new Error('Theme must have name and css properties');
        }
        
        this.themes.set(id, {
            id,
            ...theme,
            registered: new Date().toISOString()
        });
        
        this.notifyObservers('theme-registered', { id, theme });
    }
    
    async applyTheme(themeId) {
        const theme = this.themes.get(themeId);
        if (!theme) {
            throw new Error(`Theme '${themeId}' not found`);
        }
        
        try {
            // Remove existing theme
            if (this.currentTheme) {
                document.documentElement.removeAttribute('data-theme');
                this.removeThemeCSS(this.currentTheme.id);
            }
            
            // Apply new theme
            await this.injectThemeCSS(theme);
            document.documentElement.setAttribute('data-theme', themeId);
            
            this.currentTheme = theme;
            
            // Persist user preference
            if (this.persistSettings) {
                localStorage.setItem('user-theme-preference', themeId);
            }
            
            this.notifyObservers('theme-changed', { 
                from: this.currentTheme?.id,
                to: themeId,
                theme
            });
            
            return { success: true, theme };
            
        } catch (error) {
            console.error('Failed to apply theme:', error);
            throw new Error(`Theme application failed: ${error.message}`);
        }
    }
    
    async injectThemeCSS(theme) {
        return new Promise((resolve, reject) => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = theme.css;
            linkElement.id = `theme-${theme.id}`;
            
            linkElement.onload = () => resolve();
            linkElement.onerror = () => reject(new Error(`Failed to load theme CSS: ${theme.css}`));
            
            document.head.appendChild(linkElement);
        });
    }
    
    removeThemeCSS(themeId) {
        const existingLink = document.getElementById(`theme-${themeId}`);
        if (existingLink) {
            existingLink.remove();
        }
    }
    
    hasUserPreference() {
        return localStorage.getItem('user-theme-preference') !== null;
    }
    
    addObserver(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Observer must be a function');
        }
        
        this.observers.add(callback);
        
        // Return unsubscribe function
        return () => this.observers.delete(callback);
    }
    
    notifyObservers(event, data) {
        this.observers.forEach(observer => {
            try {
                observer(event, data);
            } catch (error) {
                console.error('Observer error:', error);
            }
        });
    }
    
    getAvailableThemes() {
        return Array.from(this.themes.entries()).map(([id, theme]) => ({
            id,
            name: theme.name,
            type: theme.type || 'unknown',
            description: theme.description
        }));
    }
    
    getCurrentTheme() {
        return this.currentTheme ? { ...this.currentTheme } : null;
    }
    
    resetToSystemDefault() {
        localStorage.removeItem('user-theme-preference');
        
        if (this.autoDetect) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme(prefersDark ? 'dark' : 'light');
        }
    }
}

// Usage example
const themeManager = new AdvancedThemeManager({
    autoDetect: true,
    persist: true
});

// Register themes
themeManager.registerTheme('dark-pro', {
    name: 'Dark Pro',
    type: 'dark',
    description: 'Professional dark theme',
    css: '/themes/dark-pro.css'
});

// Listen for theme changes
const unsubscribe = themeManager.addObserver((event, data) => {
    console.log(`Theme event: ${event}`, data);
});

// Apply theme
themeManager.applyTheme('dark-pro').then(result => {
    console.log('Theme applied successfully:', result);
});
```

### Code Block with Special Characters

```javascript title:"Special Characters & Regex" 
const special = "This has 'quotes' and \"double quotes\" and <html> entities";
const regex = /test\s+pattern/gi;
const template = `
    <div class="code-block">
        <pre><code>${escapeHtml(code)}</code></pre>
    </div>
`;
const obj = { 
    key: "value", 
    nested: { deep: true, symbols: "@#$%^&*()" },
    unicode: "🎨🚀📝✨"
};

// Function to escape HTML entities
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### Long Lines Test (Word Wrap)

```python title:"Word Wrap Demonstration"
# Short line
def example():
    pass

# This is an extremely long line that should wrap when word wrap is enabled - it demonstrates how the new CSS counter-based line numbers stay properly aligned with the logical line even when the text content wraps across multiple visual lines on the screen
def very_long_function_name_that_demonstrates_word_wrapping_behavior_in_code_blocks(parameter_one, parameter_two, parameter_three, parameter_four, parameter_five):
    """
    This function has a very long signature and docstring to test word wrapping behavior.
    The line numbers should remain aligned with the logical lines even when text wraps.
    """
    very_long_variable_name_for_testing = "This is a very long string literal that contains lots of text and should definitely cause line wrapping when word wrap is enabled, testing whether the line number stays aligned with this logical line"
    
    complex_data_structure = {"key1": "value1", "key2": "value2", "key3": "value3", "key4": "value4", "key5": "value5", "key6": "value6", "key7": "value7", "key8": "value8", "key9": "value9", "key10": "value10"}
    
    return very_long_variable_name_for_testing

# Short line again  
print("Done")
```