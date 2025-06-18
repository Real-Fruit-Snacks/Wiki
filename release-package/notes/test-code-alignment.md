---
title: Code Block Alignment Test
tags: [test, code, alignment]
created: 2025-01-06
author: System
description: Test file for verifying code block header alignment
---

# Code Block Alignment Test

This page demonstrates how code blocks align when they have different languages and titles.

## Multiple Code Blocks

```javascript title:"Main Application Entry"
// JavaScript with a title
const app = {
    name: 'Notes Wiki',
    version: '1.0.0'
};
```

```python
# Python without a title
def hello_world():
    print("Hello, World!")
```

```html title:"Basic HTML Template"
<!DOCTYPE html>
<html>
    <head>
        <title>Test</title>
    </head>
    <body>
        <h1>Hello</h1>
    </body>
</html>
```

```css
/* CSS without a title */
.container {
    display: flex;
    align-items: center;
}
```

```bash title:"Build Script"
#!/bin/bash
echo "Building project..."
npm run build
```

```json title:"Package Configuration"
{
    "name": "notes-wiki",
    "version": "1.0.0"
}
```

## Language Variety

```rust title:"Rust Example"
fn main() {
    println!("Hello from Rust!");
}
```

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go!")
}
```

```typescript title:"TypeScript Interface"
interface User {
    id: number;
    name: string;
    email: string;
}
```

```yaml title:"Configuration File"
app:
  name: Notes Wiki
  version: 1.0.0
  features:
    - search
    - themes
    - markdown
```

All code blocks above should have their language labels and titles nicely aligned in columns!