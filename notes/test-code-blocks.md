---
title: Code Block Test
tags: [test, debugging]
created: 2025-01-06
author: Debug
description: Testing various code block formats
---

# Code Block Test

This file tests various code block formats to debug the [object Object] issue.

## Simple JavaScript Code Block

```javascript
console.log('Hello, world!');
const x = 42;
function test() {
    return x * 2;
}
```

## Python Code Block with Title

```python title:"Example Python Script"
def hello():
    print("Hello from Python")
    return True

if __name__ == "__main__":
    hello()
```

## Plain Code Block (no language)

```
This is plain text
without any highlighting
just regular monospace
```

## Bash Code Block

```bash
#!/bin/bash
echo "Testing bash highlighting"
ls -la
grep "pattern" file.txt
```

## HTML Code Block

```html
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

## CSS Code Block

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.code-block {
    background: #282c34;
    padding: 1rem;
}
```

## Inline Code

Here's some inline code: `const inline = 'test';` within a paragraph.

## Empty Code Block

```javascript
```

## Code Block with Special Characters

```javascript collapse:"true"
const special = "This has 'quotes' and \"double quotes\"";
const regex = /test\s+pattern/gi;
const obj = { key: "value", nested: { deep: true } };
```