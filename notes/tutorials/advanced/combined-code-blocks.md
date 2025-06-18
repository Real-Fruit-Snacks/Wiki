---
title: Combined Code Blocks - Automatic Code Aggregation
tags: [tutorial, code, advanced, automation]
author: Wiki Team
created: 2025-01-18
description: Automatically combine all code blocks from a page into a single, copyable block
combineCodeBlocks: true
combinedBlockLanguage: yaml
combinedBlockTitle: "Example Combined Configuration"
combinedBlockOptions:
  includeBlockTitles: true
---

# Combined Code Blocks - Automatic Code Aggregation

Transform your tutorials and documentation by automatically combining all code blocks into a single, complete code file at the end of your note.

## 🎯 What It Does

The combined code blocks feature:
- Collects all code blocks from your note
- Filters based on your criteria
- Combines them into one copyable block
- Adds section markers and comments
- Appears automatically at the note's end

## ⚙️ Basic Configuration

Add this to your note's frontmatter:

```yaml title:"Basic Setup"
---
title: My Tutorial
combineCodeBlocks: true
combinedBlockLanguage: javascript
---
```

This will combine all code blocks into a JavaScript code block at the bottom.

## 🛠️ Advanced Configuration

### Full Options Example

```yaml title:"Advanced Configuration"
---
title: React Tutorial
combineCodeBlocks: true
combinedBlockLanguage: javascript
combinedBlockTitle: "Complete React App"
combinedBlockOptions:
  includeBlockTitles: true      # Add section comments
  includeOnlyLanguage: javascript  # Only JavaScript blocks
  skipEmptyBlocks: true         # Ignore empty blocks
  separator: "\n// ---\n"       # Between sections
  excludePatterns: ["test", "example"]  # Skip these
---
```

### Configuration Options Explained

| Option | Description | Default |
|--------|-------------|---------|
| `combineCodeBlocks` | Enable/disable feature | `false` |
| `combinedBlockLanguage` | Language for syntax highlighting | `text` |
| `combinedBlockTitle` | Custom title for combined block | Auto-generated |
| `includeBlockTitles` | Add titles as comments | `true` |
| `includeOnlyLanguage` | Filter by language | `null` (all) |
| `skipEmptyBlocks` | Skip empty code blocks | `true` |
| `separator` | Text between blocks | `\n// ---\n` |
| `excludePatterns` | Title patterns to exclude | `[]` |

## 📋 Real-World Examples

### Tutorial Pattern
Perfect for step-by-step tutorials:

1. **Setup** section with imports
2. **Implementation** with main code  
3. **Usage** examples
4. Combined complete code at the end

### API Documentation

```yaml title:"API Documentation Config"
---
combineCodeBlocks: true
combinedBlockLanguage: python
combinedBlockTitle: "Complete API Client"
combinedBlockOptions:
  includeOnlyLanguage: python
  excludePatterns: ["output", "response"]
---
```

## 🎨 Smart Features

### Language-Aware Comments
The system knows comment syntax for 30+ languages:
- JavaScript/Java: `// Comment`
- Python/Ruby: `# Comment`
- HTML/XML: `<!-- Comment -->`
- CSS: `/* Comment */`
- SQL: `-- Comment`

### Filtering Examples

**Include Only JavaScript:**
```yaml
combinedBlockOptions:
  includeOnlyLanguage: javascript
```

**Exclude Test Code:**
```yaml
combinedBlockOptions:
  excludePatterns: ["test", "mock", "example"]
```

**Custom Separators:**
```yaml
combinedBlockOptions:
  separator: "\n\n/* ==================== */\n\n"
```

## 💡 Best Practices

### Use Clear Titles
Give your code blocks descriptive titles:
```javascript title:"Database Connection"
const db = await connect(config);
```

### Organize by Purpose
Structure your tutorial logically:
1. Configuration
2. Core functions
3. Utilities
4. Main execution

### Language Consistency
When combining code:
- Keep the same language throughout
- Or use `includeOnlyLanguage` to filter
- Set appropriate `combinedBlockLanguage`

## 🎯 Use Cases

### Complete Applications
Build tutorials that result in a working app:
- Show pieces step-by-step
- Explain each section
- Provide complete code at end

### Configuration Files
Combine multiple config snippets:
- Environment variables
- Database settings  
- API configurations
- Complete config file at end

### Learning Paths
Progressive examples that build:
- Basic concepts first
- Advanced features next
- Full implementation at end

## 🔍 Visual Indicators

The combined code block has:
- **Distinctive Border**: Dashed line separator
- **Special Styling**: Stands out from regular blocks
- **Clear Title**: Shows number of blocks combined
- **Full Features**: Copy button, syntax highlighting, line numbers

## ⚡ Workflow Tips

1. **Plan Your Structure**: Organize code blocks logically
2. **Use Exclusions**: Filter out example/test code
3. **Test the Output**: Ensure combined code works
4. **Document Dependencies**: Note requirements in text

## 🔧 Troubleshooting

### Not Seeing Combined Block?
- Check `combineCodeBlocks: true` in frontmatter
- Ensure you have code blocks in the note
- Verify no syntax errors in YAML

### Wrong Blocks Included?
- Check your filter settings
- Use `excludePatterns` for unwanted blocks
- Verify language specifications

---

*Note: This very page has combined code blocks enabled! Check the bottom to see all the YAML configurations combined into one block.*