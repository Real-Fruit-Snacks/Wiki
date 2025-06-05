---
title: Regular Expression Patterns
tags: [regex, patterns, reference, cheatsheet]
created: 2024-02-10
author: Dev Team
description: Common regex patterns and examples for various use cases
updated: 2024-03-01
category: reference
status: published
---

# Regular Expression Patterns

## Basic Syntax

### Character Classes
```regex
.       # Any character except newline
\d      # Digit (0-9)
\D      # Not a digit
\w      # Word character (a-z, A-Z, 0-9, _)
\W      # Not a word character
\s      # Whitespace (space, tab, newline)
\S      # Not whitespace
[abc]   # Any of a, b, or c
[^abc]  # Not a, b, or c
[a-z]   # Character between a and z
[a-zA-Z] # a-z or A-Z
```

### Quantifiers
```regex
*       # 0 or more
+       # 1 or more
?       # 0 or 1
{3}     # Exactly 3
{3,}    # 3 or more
{3,5}   # 3, 4, or 5
```

### Positions
```regex
^       # Start of string
$       # End of string
\b      # Word boundary
\B      # Not word boundary
\A      # Start of string (not line)
\Z      # End of string (not line)
```

## Common Patterns

### Email Validation
```regex
# Basic email pattern
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

# More comprehensive
^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$

# Examples:
# ✓ user@example.com
# ✓ john.doe+filter@company.co.uk
# ✗ invalid@.com
# ✗ @example.com
```

### URL Validation
```regex
# Basic URL
^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$

# With optional protocol
^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$

# Examples:
# ✓ https://www.example.com
# ✓ http://subdomain.example.com/path?query=1
# ✓ www.example.com
# ✗ htp://wrong-protocol.com
```

### Phone Numbers
```regex
# US Phone Number
^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$

# International format
^\+?[1-9]\d{1,14}$

# Examples:
# ✓ (555) 123-4567
# ✓ 555-123-4567
# ✓ 555.123.4567
# ✓ 5551234567
# ✓ +1 555 123 4567
```

### Password Validation
```regex
# At least 8 chars, 1 uppercase, 1 lowercase, 1 number
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$

# With special character requirement
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$

# Examples:
# ✓ Password123
# ✓ Str0ng@Pass
# ✗ weak
# ✗ NoNumbers!
```

## Data Extraction

### IPv4 Address
```regex
^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$

# Capture groups
^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$

# Examples:
# ✓ 192.168.1.1
# ✓ 10.0.0.255
# ✗ 256.1.1.1
# ✗ 192.168.1
```

### Credit Card Numbers
```regex
# Visa
^4[0-9]{12}(?:[0-9]{3})?$

# Mastercard
^5[1-5][0-9]{14}$

# American Express
^3[47][0-9]{13}$

# General (with optional spaces/dashes)
^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$
```

### Date Formats
```regex
# YYYY-MM-DD
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$

# DD/MM/YYYY or DD-MM-YYYY
^(0[1-9]|[12]\d|3[01])[/-](0[1-9]|1[0-2])[/-]\d{4}$

# MM/DD/YYYY
^(0[1-9]|1[0-2])[/-](0[1-9]|[12]\d|3[01])[/-]\d{4}$

# Examples:
# ✓ 2024-03-15
# ✓ 15/03/2024
# ✓ 03-15-2024
```

## Text Processing

### HTML Tags
```regex
# Match any HTML tag
<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)

# Match specific tag content
<div[^>]*>(.*?)</div>

# Remove all HTML tags
<[^>]*>

# Examples:
# ✓ <div class="container">Content</div>
# ✓ <img src="image.jpg" />
# ✓ <p>Paragraph</p>
```

### Whitespace Cleanup
```regex
# Multiple spaces to single space
\s+

# Trim leading/trailing whitespace
^\s+|\s+$

# Remove blank lines
^\s*$\n

# Normalize line endings
\r\n|\r|\n
```

## Programming Patterns

### Variable Names
```regex
# JavaScript/Python variable
^[a-zA-Z_$][a-zA-Z0-9_$]*$

# Camel case
^[a-z]+(?:[A-Z][a-z]+)*$

# Snake case
^[a-z]+(?:_[a-z]+)*$

# Constant (UPPER_SNAKE_CASE)
^[A-Z]+(?:_[A-Z]+)*$
```

### Function Extraction
```regex
# JavaScript function
function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{

# Python function
def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*:

# Class methods
(public|private|protected)?\s*function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)
```

## Lookarounds

### Positive Lookahead
```regex
# Password with at least one digit
^(?=.*\d).+$

# Match 'test' only if followed by 'ing'
test(?=ing)
```

### Negative Lookahead
```regex
# Match 'test' not followed by 'ing'
test(?!ing)

# Lines not containing 'error'
^((?!error).)*$
```

### Lookbehind
```regex
# Positive lookbehind - match 'world' preceded by 'hello '
(?<=hello )world

# Negative lookbehind - match 'world' not preceded by 'hello '
(?<!hello )world
```

## Practical Examples

### Log File Parsing
```regex
# Apache access log
^(\S+) \S+ \S+ \[([^\]]+)\] "([^"]+)" (\d{3}) (\d+|-) "([^"]*)" "([^"]*)"

# Error log timestamp
^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]

# Log level extraction
\[(ERROR|WARN|INFO|DEBUG)\]
```

### CSV Parsing
```regex
# Basic CSV
(?:^|,)("(?:[^"]|"")*"|[^,]*)

# With quoted fields
"([^"]*(?:""[^"]*)*)"|([^,]+)

# Split on comma but not in quotes
,(?=(?:[^"]*"[^"]*")*[^"]*$)
```

### Markdown Patterns
```regex
# Headers
^#{1,6}\s+(.+)$

# Links
\[([^\]]+)\]\(([^)]+)\)

# Bold text
\*\*([^*]+)\*\*|__([^_]+)__

# Code blocks
```(\w+)?\n([\s\S]*?)```
```

## Performance Tips

1. **Be specific**: Use `[0-9]` instead of `\d` when you only need digits
2. **Avoid backtracking**: Use possessive quantifiers when possible
3. **Anchor when possible**: Use `^` and `$` to limit search scope
4. **Order alternations**: Put most likely matches first
5. **Use non-capturing groups**: `(?:...)` when you don't need the capture

## Testing Resources

- [regex101.com](https://regex101.com) - Test with explanations
- [regexr.com](https://regexr.com) - Visual regex tester
- [regexpal.com](https://regexpal.com) - Simple tester