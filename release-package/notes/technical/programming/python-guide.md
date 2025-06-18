---
title: Python Best Practices Guide
tags: [python, programming, best-practices, guide]
created: 2024-01-12
author: Maria Rodriguez
description: Comprehensive guide to Python best practices and patterns
updated: 2024-03-01
category: technical
status: published
---

# Python Best Practices Guide

## Code Style and Structure

### The Zen of Python

```python
import this  # Run this to see the Zen of Python

# Key principles:
# - Explicit is better than implicit
# - Simple is better than complex
# - Readability counts
# - There should be one-- and preferably only one --obvious way to do it
```

### Project Structure

```
my_project/
├── src/
│   └── my_package/
│       ├── __init__.py
│       ├── core.py
│       └── utils.py
├── tests/
│   ├── __init__.py
│   └── test_core.py
├── docs/
├── requirements.txt
├── setup.py
├── README.md
└── .gitignore
```

## Type Hints and Annotations

```python
from typing import List, Dict, Optional, Union, Tuple, Callable
from dataclasses import dataclass

# Function with type hints
def process_data(
    items: List[str],
    transform: Callable[[str], str],
    max_length: Optional[int] = None
) -> Dict[str, int]:
    """Process list of items and return frequency count."""
    result: Dict[str, int] = {}
    
    for item in items:
        processed = transform(item)
        if max_length and len(processed) > max_length:
            processed = processed[:max_length]
        result[processed] = result.get(processed, 0) + 1
    
    return result

# Dataclass with type hints
@dataclass
class User:
    name: str
    email: str
    age: int
    is_active: bool = True
    tags: List[str] = None
    
    def __post_init__(self):
        if self.tags is None:
            self.tags = []
```

## Context Managers

```python
from contextlib import contextmanager
import time

# Custom context manager using decorator
@contextmanager
def timer(name: str):
    """Time a block of code."""
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{name} took {end - start:.2f} seconds")

# Class-based context manager
class DatabaseConnection:
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connection = None
    
    def __enter__(self):
        print(f"Connecting to {self.connection_string}")
        self.connection = self._connect()
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
        if self.connection:
            self.connection.close()
        if exc_type:
            print(f"Error occurred: {exc_val}")
        return False  # Don't suppress exceptions
    
    def _connect(self):
        # Simulate connection
        return {"connected": True}

# Usage
with timer("Data processing"):
    with DatabaseConnection("postgresql://localhost/mydb") as conn:
        # Process data
        time.sleep(1)
```

## Decorators

```python
import functools
import logging
from typing import Any, Callable

# Logging decorator
def log_calls(func: Callable) -> Callable:
    """Log function calls with arguments and return value."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        
        logging.info(f"Calling {func.__name__}({signature})")
        try:
            result = func(*args, **kwargs)
            logging.info(f"{func.__name__} returned {result!r}")
            return result
        except Exception as e:
            logging.error(f"{func.__name__} raised {e!r}")
            raise
    
    return wrapper

# Memoization decorator
def memoize(func: Callable) -> Callable:
    """Cache function results."""
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        key = str(args) + str(kwargs)
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]
    
    wrapper.cache_clear = cache.clear
    return wrapper

# Retry decorator
def retry(max_attempts: int = 3, delay: float = 1.0):
    """Retry function on exception."""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed: {e}")
                    time.sleep(delay * (2 ** attempt))  # Exponential backoff
        
        return wrapper
    return decorator
```

## Error Handling

```python
class ValidationError(Exception):
    """Custom validation error."""
    pass

class APIError(Exception):
    """API-related errors."""
    def __init__(self, message: str, status_code: int):
        super().__init__(message)
        self.status_code = status_code

def validate_email(email: str) -> str:
    """Validate email format."""
    import re
    
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(pattern, email):
        raise ValidationError(f"Invalid email format: {email}")
    
    return email.lower()

# Error handling patterns
def safe_divide(a: float, b: float) -> Optional[float]:
    """Safely divide two numbers."""
    try:
        return a / b
    except ZeroDivisionError:
        logging.warning("Division by zero attempted")
        return None
    except TypeError as e:
        logging.error(f"Type error in division: {e}")
        raise
```

## Generators and Iterators

```python
from typing import Generator, Iterator
import os

# Generator for reading large files
def read_large_file(file_path: str, chunk_size: int = 1024) -> Generator[str, None, None]:
    """Read large file in chunks."""
    with open(file_path, 'r') as file:
        while True:
            chunk = file.read(chunk_size)
            if not chunk:
                break
            yield chunk

# Generator with send() support
def running_average() -> Generator[float, float, None]:
    """Calculate running average of sent values."""
    total = 0.0
    count = 0
    average = 0.0
    
    while True:
        value = yield average
        if value is not None:
            total += value
            count += 1
            average = total / count

# Custom iterator class
class Fibonacci:
    """Fibonacci sequence iterator."""
    def __init__(self, max_count: int):
        self.max_count = max_count
        self.count = 0
        self.current = 0
        self.next = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.max_count:
            raise StopIteration
        
        result = self.current
        self.current, self.next = self.next, self.current + self.next
        self.count += 1
        return result
```

## Async Programming

```python
import asyncio
from typing import List
import aiohttp

# Async function with error handling
async def fetch_url(session: aiohttp.ClientSession, url: str) -> Dict[str, Any]:
    """Fetch URL asynchronously."""
    try:
        async with session.get(url) as response:
            return {
                'url': url,
                'status': response.status,
                'data': await response.text()
            }
    except Exception as e:
        return {
            'url': url,
            'error': str(e)
        }

# Concurrent execution
async def fetch_multiple_urls(urls: List[str]) -> List[Dict[str, Any]]:
    """Fetch multiple URLs concurrently."""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Async context manager
class AsyncDatabase:
    async def __aenter__(self):
        await self.connect()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.disconnect()
    
    async def connect(self):
        await asyncio.sleep(0.1)  # Simulate connection
        print("Connected to database")
    
    async def disconnect(self):
        await asyncio.sleep(0.1)  # Simulate disconnection
        print("Disconnected from database")
```

## Testing Best Practices

```python
import pytest
from unittest.mock import Mock, patch
from dataclasses import dataclass

# Fixtures
@pytest.fixture
def sample_user():
    return User(name="Test User", email="test@example.com", age=25)

# Parameterized tests
@pytest.mark.parametrize("input_value,expected", [
    ("hello", "HELLO"),
    ("World", "WORLD"),
    ("123", "123"),
    ("", ""),
])
def test_uppercase(input_value, expected):
    assert input_value.upper() == expected

# Testing with mocks
def test_api_call():
    with patch('requests.get') as mock_get:
        mock_get.return_value.json.return_value = {'status': 'ok'}
        
        # Your test code here
        result = make_api_call('https://api.example.com')
        
        assert result['status'] == 'ok'
        mock_get.assert_called_once_with('https://api.example.com')
```

## Performance Tips

1. **Use list comprehensions** instead of loops when possible
2. **Use generators** for large datasets
3. **Profile your code** with `cProfile` or `line_profiler`
4. **Use `__slots__`** in classes to reduce memory usage
5. **Leverage built-in functions** like `map()`, `filter()`, `zip()`
6. **Use `collections.deque`** for queue operations
7. **Consider `numpy` for numerical computations