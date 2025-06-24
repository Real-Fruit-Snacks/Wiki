---
title: Code Blocks & Syntax Highlighting
tags: [tutorial, code, markdown, syntax-highlighting]
author: Wiki Team
created: 2025-01-18
description: Master code blocks with syntax highlighting, line numbers, and advanced features
---

# Code Blocks & Syntax Highlighting

Display code beautifully with syntax highlighting for 100+ programming languages, line numbers, custom titles, and more.

## 📝 Basic Code Blocks

### Simple Code Block
Wrap code in triple backticks:

````markdown
```
function hello() {
    console.log("Hello, World!");
}
```
````

### With Language Specification
Add the language for syntax highlighting:

````markdown
```javascript
function hello() {
    console.log("Hello, World!");
}
```
````

## 🎨 Syntax Highlighting

### Supported Languages
The wiki supports 100+ languages including:
- **Web**: HTML, CSS, JavaScript, TypeScript
- **Backend**: Python, Java, Go, Rust, C++
- **Data**: SQL, JSON, YAML, XML
- **Scripting**: Bash, PowerShell, Ruby
- **And many more!**

### Examples

```python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

```sql
-- SQL example
SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id
HAVING order_count > 5;
```

## 🏷️ Advanced Features

### Custom Titles
Add descriptive titles to code blocks:

````markdown
```javascript title:"API Configuration"
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
};
```
````

Result:
```javascript title:"API Configuration"
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
};
```

### Collapsible Code Blocks
Make long code blocks collapsible:

````markdown
```python title:"Long Example" collapse:true
# This code block starts collapsed
def long_function():
    # ... lots of code ...
    pass
```
````

## 🔢 Line Numbers

### Enable Globally
1. Open Settings (`Ctrl+,`)
2. Toggle "Show line numbers"
3. All code blocks now display line numbers

### Benefits
- Easy reference to specific lines
- Better for tutorials and documentation
- Maintains alignment with word wrap

## 🔧 Code Block Actions

### Action Buttons
Every code block has built-in action buttons:

| Button | Function | Description |
|--------|----------|-------------|
| **📋 Copy** | Copy code to clipboard | Preserves formatting and newlines |
| **⋯ More Options** | Open dropdown menu | Access all code block actions |
| **▼/▲ Toggle** | Expand/collapse code | For collapsible blocks only |

### Dropdown Menu (⋯ Button)
**Click the three dots (⋯)** for these actions:

- **Copy Code** - Copy to clipboard with preserved formatting
- **Select All Code** - Select entire code block for manual copying
- **Language Info** - Shows the programming language
- **Download as File** - Save as structured markdown file
- **Wrap/Unwrap Lines** - Toggle line wrapping for long lines

### Right-Click Context Menu
**Right-click anywhere on a code block** for quick access to the same dropdown options.

### Enhanced Download Feature
**Download as File** creates a structured markdown file with:
- Note title as main heading
- Code block title as subheading (if present)
- Metadata (language, source note, export date)
- Code wrapped in proper markdown fences
- Smart filename based on code block title and date

### Line Wrapping Control
**Wrap/Unwrap Lines** feature:
- **Enable wrapping** - Long lines wrap to fit container
- **Disable wrapping** - Horizontal scroll for long lines
- **Per-block control** - Each code block can have different settings
- **Visual feedback** - Toast notification confirms the change

## 💡 Best Practices

### Choose the Right Language
Always specify the language for better highlighting:
- ✅ ` ```javascript`
- ❌ ` ```js` (might work but less reliable)
- ❌ ` ```text` (no highlighting)

### Use Descriptive Titles
Help readers understand the code's purpose:
```bash title:"Install Dependencies"
npm install express mongoose dotenv
```

### Organize Long Code
For lengthy examples:
1. Use collapsible blocks
2. Break into multiple blocks with explanations
3. Add titles to each section

## 🎯 Special Features

### File Names in Titles
Show file paths in titles:
```javascript title:"src/components/Header.jsx"
export function Header() {
    return <h1>My App</h1>;
}
```

### Terminal Output
Use `bash` or `shell` for command line:
```bash
$ npm run build
Building project...
✓ Build complete!
```

### Diff Highlighting
Show code changes:
```diff
- const old = "red";
+ const new = "green";
```

## ⚙️ Settings & Customization

### Line Numbers Toggle
- Global setting affects all code blocks
- Applies immediately without refresh
- CSS-based implementation (no JavaScript overhead)

### Theme Integration
- Syntax colors adapt to your chosen theme
- Dark themes have appropriate contrast
- Light themes remain readable

## 🚀 Pro Tips

1. **Language Aliases**: Both `yml` and `yaml` work
2. **No Language**: Use ` ```text` for plain text
3. **JSON Formatting**: JSON is automatically pretty-printed
4. **Copy Preserves Format**: Copied code maintains proper indentation

## 🔍 Troubleshooting

### No Syntax Highlighting?
- Check if language is specified correctly
- Some languages have multiple names (e.g., `c++`, `cpp`)
- Use ` ```text` if language isn't supported

### Line Numbers Not Showing?
- Verify setting is enabled
- Refresh the page if needed
- Check if theme supports line numbers

---

Code blocks are essential for technical documentation. Master these features to create beautiful, readable code examples!