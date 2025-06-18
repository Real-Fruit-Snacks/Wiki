---
title: Line Numbers Test
tags: [test]
created: 2025-01-18
---

# Line Numbers Test

Testing if line numbers display correctly when enabled in settings.

## Simple Code Test

```javascript
// Line 1: Comment
const x = 5;     // Line 2
const y = 10;    // Line 3

// Line 5: Empty line above
function add(a, b) {  // Line 6
    return a + b;     // Line 7
}                     // Line 8

console.log(add(x, y)); // Line 10
```

## Test with Empty Lines

```python
# Line 1
def test():
    # Line 3 (empty line above)
    pass

# Line 6

# Line 8
print("Hello")
```

The line numbers should appear on the left side of each line when "Show line numbers" is enabled in settings.