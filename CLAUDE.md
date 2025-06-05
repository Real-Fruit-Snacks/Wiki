# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A self-contained static notes/wiki website for GitLab Pages that displays markdown files with advanced features including 16 built-in themes, real-time search, metadata parsing, and no external dependencies. All assets are bundled locally to ensure complete offline functionality.

## Architecture

### Frontend Stack
- **Vanilla JavaScript** - No framework dependencies
- **Marked.js v15+** - Markdown parsing (bundled in libs/)
- **Prism.js** - Syntax highlighting (bundled in libs/)
- **js-yaml** - YAML frontmatter parsing (bundled in libs/)
- **CSS Custom Properties** - Theme system implementation

### Key Architectural Patterns

1. **Client-Side Routing**
   - Hash-based routing (#/notes/path/to/file)
   - Handles deep linking to headings
   - Browser history management via History API
   - Routes: `/notes/`, `/search/`, `/tags/`, `/recent`

2. **Theme System**
   - 16 VSCode-inspired themes in `/themes/`
   - Dynamic theme loading via CSS file switching
   - Preview functionality with save/cancel
   - Auto-theme detection based on system preferences
   - Theme affects both UI and syntax highlighting

3. **Search Implementation**
   - Client-side full-text search using notes-index.json
   - Fuzzy matching across title, content, tags, and author
   - Search results limited to 10 items with pagination potential
   - Includes term highlighting in results

4. **Metadata Processing**
   - YAML frontmatter parser extracts note metadata
   - Required fields: title, tags, created, author, description
   - Optional fields: updated, category, status
   - Metadata used for search, filtering, and navigation

## Development Commands

```bash
# Local development server
python3 -m http.server 8000

# Build search index (required after adding/modifying notes)
python3 build.py

# The build script will:
# - Scan all markdown files in /notes/
# - Parse YAML frontmatter
# - Generate notes-index.json with metadata and content
# - Output statistics about tags, authors, and categories
```

## Important Implementation Details

### Code Block Features
```markdown
```language title:"Your Title Here" collapse:true
code content
```
```
- Copy button on hover
- Line numbers toggle
- Word wrap toggle
- Collapse functionality (partially implemented)

### Note Frontmatter Structure
```yaml
---
title: Note Title
tags: [tag1, tag2, tag3]
created: 2024-01-15
author: Author Name
description: Brief description of the note
updated: 2024-02-01  # optional
category: technical  # optional
status: published    # optional
---
```

### URL Routing Patterns
- Notes: `#/notes/category/subcategory/note-name`
- Headings: `#/notes/path/to/note#heading-id`
- Tags: `#/tags/javascript` or `#/tags/javascript,performance`
- Search: `#/search/query+terms`
- Recent: `#/recent`

### localStorage Structure
```javascript
{
  "recentFiles": [...],              // Array of recently viewed notes
  "theme": "dark",                   // Current theme selection
  "preferences": {
    "showLineNumbers": true,         // Code block line numbers
    "wordWrap": false,               // Code block word wrap
    "autoTheme": true                // Follow system theme
  }
}
```

## Current Implementation Status

### Completed Features
- ✅ Full theme collection (16 themes)
- ✅ Search with fuzzy matching
- ✅ Recent files tracking
- ✅ Tag filtering system
- ✅ Share/copy link functionality
- ✅ Frontmatter parsing with js-yaml
- ✅ Theme preview mode
- ✅ Auto-theme detection
- ✅ Code block enhancements (copy, line numbers)
- ✅ Python build script

### Missing/TODO
- GitLab CI/CD configuration (.gitlab-ci.yml)
- Code block title rendering (parser exists, UI needs work)
- Code block collapse refinement
- Advanced keyboard shortcuts
- Search term highlighting in content preview
- Asset minification in build process
- Sitemap generation for SEO

## Key Files to Modify

1. **script.js** - Main application logic
   - Router, search, theme management
   - Markdown rendering pipeline
   - UI interactions and preferences

2. **style.css** - Core styles
   - Layout and responsive design
   - Base theme variables
   - Component styles

3. **build.py** - Build script
   - Generates notes-index.json
   - Add minification if needed
   - Could add sitemap generation

4. **themes/** - Theme files
   - Each theme defines CSS custom properties
   - Consistent variable naming across themes
   - Syntax highlighting color mappings

## Testing Considerations

When testing changes:
1. Run `python3 build.py` after modifying notes
2. Test all 16 themes for visual consistency
3. Verify search with special characters and multiple terms
4. Test deep linking to specific headings
5. Check localStorage persistence across sessions
6. Validate mobile responsive behavior
7. Test offline functionality (all assets are local)
8. Verify code block features (copy, line numbers, wrap)

## Security Notes

- Marked.js sanitizes markdown content by default
- File paths are validated to prevent directory traversal
- No JavaScript execution from markdown content
- All external assets are bundled locally
- Theme files are loaded dynamically but from trusted local source