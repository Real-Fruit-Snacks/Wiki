---
title: JavaScript Tips and Tricks
tags: [javascript, programming, web-development, tips]
created: 2024-01-10
author: Alex Chen
description: Useful JavaScript patterns, tips, and best practices
updated: 2024-02-28
category: technical
status: published
---

# JavaScript Tips and Tricks

## Modern JavaScript Features

### Destructuring Magic ✨

```javascript
// Object destructuring with renaming and defaults
const user = { name: 'Alice', age: 30 };
const { name: userName, age, role = 'user' } = user;

// Array destructuring with skip
const [first, , third] = [1, 2, 3];

// Nested destructuring
const data = {
    user: {
        profile: {
            name: 'Bob',
            settings: { theme: 'dark' }
        }
    }
};
const { user: { profile: { name, settings: { theme } } } } = data;
```

### Async/Await Patterns

```javascript
// Parallel execution
async function fetchMultiple() {
    const [users, posts, comments] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
}

// Error handling with async/await
async function safeApiCall(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        return { error: error.message };
    }
}

// Retry pattern
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetch(url);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
    }
}
```

## Performance Optimization

### Debounce and Throttle

```javascript
// Debounce - delays execution until after wait time
function debounce(func, wait) {
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

// Throttle - limits execution to once per wait time
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(handleSearch, 300));

window.addEventListener('scroll', throttle(handleScroll, 100));
```

### Memoization

```javascript
// Simple memoization
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Example: Fibonacci with memoization
const fibonacci = memoize((n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});
```

## Useful Utilities

### Deep Clone

```javascript
// Deep clone using structured clone (modern browsers)
const deepClone = (obj) => structuredClone(obj);

// Fallback for older browsers
function deepCloneFallback(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepCloneFallback(item));
    if (obj instanceof Object) {
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepCloneFallback(obj[key]);
            }
        }
        return cloned;
    }
}
```

### Type Checking

```javascript
// Robust type checking
const typeCheck = {
    isArray: Array.isArray,
    isObject: (val) => val !== null && typeof val === 'object' && !Array.isArray(val),
    isFunction: (val) => typeof val === 'function',
    isString: (val) => typeof val === 'string',
    isNumber: (val) => typeof val === 'number' && !isNaN(val),
    isBoolean: (val) => typeof val === 'boolean',
    isNull: (val) => val === null,
    isUndefined: (val) => val === undefined,
    isPromise: (val) => val instanceof Promise || (val && typeof val.then === 'function')
};
```

## Array Methods Mastery

### Advanced Array Operations

```javascript
// Group by property
const groupBy = (arr, key) => {
    return arr.reduce((acc, item) => {
        const group = item[key];
        acc[group] = acc[group] ?? [];
        acc[group].push(item);
        return acc;
    }, {});
};

// Unique values
const unique = (arr) => [...new Set(arr)];

// Flatten nested arrays
const flatten = (arr, depth = 1) => {
    return depth > 0
        ? arr.reduce((acc, val) => 
            acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), [])
        : arr.slice();
};

// Chunk array
const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
};
```

## Browser APIs

### Intersection Observer

```javascript
// Lazy loading images
const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            lazyImageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    lazyImageObserver.observe(img);
});
```

### Web Storage with Expiry

```javascript
// LocalStorage with expiration
const storage = {
    set(key, value, expiryMinutes) {
        const now = new Date();
        const item = {
            value: value,
            expiry: expiryMinutes ? now.getTime() + expiryMinutes * 60000 : null
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    
    get(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        const now = new Date();
        
        if (item.expiry && now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        
        return item.value;
    }
};
```

## Quick Tips

1. **Use optional chaining**: `user?.profile?.name ?? 'Anonymous'`
2. **Convert NodeList to Array**: `[...document.querySelectorAll('.item')]`
3. **Dynamic property names**: `{ [key]: value }`
4. **Tagged template literals** for custom string processing
5. **WeakMap** for private properties in classes
6. **Proxy** for reactive objects
7. **Generator functions** for custom iterables