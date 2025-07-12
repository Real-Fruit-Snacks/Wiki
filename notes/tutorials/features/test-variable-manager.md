---
title: Variable Manager Test
tags: [test, variable-manager]
author: Test Author
created: 2025-01-21
description: Test note for Variable Manager functionality
---

# Variable Manager Test

This note contains variables that should be detected and replaceable by the Variable Manager.

## Code Example 1

```javascript
const apiUrl = '$API_URL';
const apiKey = '$API_KEY';
const timeout = $TIMEOUT;

fetch(apiUrl, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'timeout': timeout
    }
});
```

## Code Example 2

```bash
curl -X GET "$API_URL/users" \
  -H "Authorization: Bearer $API_KEY" \
  --timeout $TIMEOUT
```

## Configuration Example

```yaml
database:
  host: $DB_HOST
  port: $DB_PORT
  username: $DB_USER
  password: $DB_PASSWORD
```

The variables in this note are:
- `$API_URL` - The base URL for the API
- `$API_KEY` - Authentication key
- `$TIMEOUT` - Request timeout in seconds
- `$DB_HOST` - Database hostname
- `$DB_PORT` - Database port
- `$DB_USER` - Database username
- `$DB_PASSWORD` - Database password

Test the Variable Manager by:
1. Opening this note
2. Clicking the Variable Manager button (📝 with horizontal lines icon)
3. Setting values for the variables
4. Observing the real-time replacement in code blocks 