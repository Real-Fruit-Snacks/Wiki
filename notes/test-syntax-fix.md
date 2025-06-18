---
title: Test Syntax Highlighting Fix
tags: [test]
created: 2025-01-18
---

# Test Syntax Highlighting Fix

Testing if the syntax highlighting works correctly after the fix:

```javascript
// This is a comment
const message = "Hello, world!";
console.log(message); // Should display properly

// Special characters test
const html = '<div class="test">Content</div>';
const comparison = 5 > 3 && 10 < 20;
const quotes = 'Single quotes' + "Double quotes";
```

```python
# Python test
def hello_world():
    """Docstring with special chars: <>&"""
    print("Hello, world!")
    return True

# Special operators
if x > 5 and y < 10:
    result = "Valid range"
```

```html
<!-- HTML test -->
<div class="container">
    <h1>Title with special chars: &amp; &lt; &gt;</h1>
    <p>Content here</p>
</div>
```

The code blocks above should display with proper syntax highlighting, not showing escaped HTML entities.