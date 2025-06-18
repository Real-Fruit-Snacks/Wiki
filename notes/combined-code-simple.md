---
title: Simple Combined Code Example
tags: [demo, code]
created: 2025-01-18
combineCodeBlocks: true
combinedBlockLanguage: python
combinedBlockTitle: "Full Python Script"
---

# Simple Combined Code Example

This demonstrates a simple use case where all code blocks are combined into one.

## Import Section

```python
import os
import json
from datetime import datetime
```

## Configuration

```python
CONFIG = {
    'debug': True,
    'port': 8080,
    'host': 'localhost'
}
```

## Main Functions

```python
def load_data(filename):
    """Load data from JSON file"""
    with open(filename, 'r') as f:
        return json.load(f)

def save_data(data, filename):
    """Save data to JSON file"""
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)
```

## Application Entry Point

```python
if __name__ == '__main__':
    print(f"Starting server on {CONFIG['host']}:{CONFIG['port']}")
    data = load_data('data.json')
    print(f"Loaded {len(data)} items")
```

All the code blocks above are automatically combined below into a single, copyable Python script.