---
title: Search Test Note
tags: [test, search, debugging]
created: 2025-01-06
author: Debug
description: Testing search functionality with code blocks
---

# Search Test Note

This note is designed to test search functionality, especially searching within code blocks.

## Simple Text

This is some simple text that should be searchable. Let's include some unique words: UNIQUETEXT123

## Code Block Test

Here's a JavaScript code block with a unique function name:

```javascript
function searchTestFunction123() {
    console.log('This is a unique search test');
    const uniqueVariable456 = 'test';
    return uniqueVariable456;
}
```

## Python Code Block

```python
def unique_python_function789():
    print("Another unique search term")
    unique_var = "PYTHONUNIQUE999"
    return unique_var
```

## Testing Search Terms

The following unique terms should be searchable:
- UNIQUETEXT123 (in plain text)
- searchTestFunction123 (in JavaScript code block)
- uniqueVariable456 (in JavaScript code block)
- unique_python_function789 (in Python code block)
- PYTHONUNIQUE999 (in Python code block)

If search is working correctly, searching for any of these terms should find this note.