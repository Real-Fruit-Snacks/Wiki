---
title: Combined Code Blocks Demo
tags: [demo, code, features]
created: 2025-01-18
combineCodeBlocks: true
combinedBlockLanguage: javascript
combinedBlockTitle: "Complete Tutorial Code"
combinedBlockOptions:
  includeBlockTitles: true
  includeOnlyLanguage: javascript
  skipEmptyBlocks: true
  separator: "\n\n// -------------------------\n"
  excludePatterns: ["test", "example"]
---

# Combined Code Blocks Demo

This page demonstrates the automatic code block combination feature. All JavaScript code blocks below will be automatically combined into a single block at the end of the page.

## Setup Configuration

First, let's set up our configuration:

```javascript title:"Configuration Setup"
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
    }
};

export default config;
```

## API Client Class

Now let's create our API client:

```javascript title:"API Client Implementation"
import config from './config';

class APIClient {
    constructor(baseConfig = config) {
        this.config = baseConfig;
        this.requestQueue = [];
    }
    
    async get(endpoint, options = {}) {
        return this.request('GET', endpoint, null, options);
    }
    
    async post(endpoint, data, options = {}) {
        return this.request('POST', endpoint, data, options);
    }
    
    async request(method, endpoint, data, options) {
        const url = `${this.config.apiUrl}${endpoint}`;
        const requestOptions = {
            method,
            headers: { ...this.config.headers, ...options.headers },
            ...options
        };
        
        if (data && method !== 'GET') {
            requestOptions.body = JSON.stringify(data);
        }
        
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

export default APIClient;
```

## Utility Functions

Here are some utility functions:

```javascript title:"Utility Functions"
// Date formatting utilities
export function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Deep clone utility
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    
    const clonedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    return clonedObj;
}
```

## Example Usage

Let's see how to use our API client:

```javascript title:"Usage Example"
import APIClient from './api-client';
import { formatDate, debounce } from './utils';

const api = new APIClient();

// Fetch user data
async function fetchUserData(userId) {
    try {
        const user = await api.get(`/users/${userId}`);
        console.log('User data:', user);
        console.log('Joined:', formatDate(user.createdAt));
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
}

// Search with debouncing
const searchUsers = debounce(async (query) => {
    try {
        const results = await api.get('/users/search', {
            params: { q: query }
        });
        console.log('Search results:', results);
    } catch (error) {
        console.error('Search failed:', error);
    }
}, 300);

// Example: Create a new post
async function createPost(title, content) {
    try {
        const post = await api.post('/posts', {
            title,
            content,
            publishedAt: new Date().toISOString()
        });
        console.log('Post created:', post);
        return post;
    } catch (error) {
        console.error('Failed to create post:', error);
    }
}
```

## Test Code (Should be Excluded)

This code block should be excluded because it has "test" in the title:

```javascript title:"Test Functions"
// This should not appear in the combined code
function testFunction() {
    console.log('This is a test');
}
```

## Python Code (Should be Excluded)

This Python code should be excluded because we're only including JavaScript:

```python title:"Python Example"
# This Python code should not be included
def hello_world():
    print("Hello from Python!")
```

## Empty Block (Should be Excluded)

```javascript title:"Empty Block"
```

---

The combined code block below is automatically generated from all the JavaScript code blocks above (excluding test blocks, empty blocks, and non-JavaScript code).