# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A self-contained static notes/wiki website for GitLab Pages that displays markdown files with advanced features including 50 built-in themes, real-time search, metadata parsing, and no external dependencies. All assets are bundled locally to ensure complete offline functionality.

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

# Testing fonts and themes in isolation
# Create a test HTML file and open it directly in browser
# See test-font-settings.html for an example
```

## Architecture

### Frontend Stack
- **Vanilla JavaScript** - No framework dependencies
- **Marked.js v15+** - Markdown parsing (bundled in libs/)
- **Prism.js** - Syntax highlighting (bundled in libs/)
- **js-yaml** - YAML frontmatter parsing (bundled in libs/)
- **CSS Custom Properties** - Theme system implementation

### Main Application Class

The `NotesWiki` class (in script.js) is the central controller that manages:
- Initialization and startup sequence
- Router configuration and navigation
- Theme management and preferences
- Search functionality
- Tab management
- Timer widget
- Event handling and state management

### Key Architectural Patterns

1. **Client-Side Routing**
   - Hash-based routing (#/notes/path/to/file)
   - Handles deep linking to headings
   - Browser history management via History API
   - Routes: `/notes/`, `/search/`, `/tags/`, `/recent`

2. **Theme System**
   - 50 professional themes in `/themes/` (VSCode, Catppuccin, Rosé Pine, Material, Ayu, Matrix, Cyberpunk, ProtonMail, etc.)
   - Dynamic theme loading via CSS file switching
   - Live theme preview cards showing actual colors and syntax highlighting
   - Alphabetical theme sorting for easier navigation
   - Auto-theme detection based on system preferences
   - Theme affects both UI and syntax highlighting
   - Themes are loaded by changing the href of the theme-stylesheet link element

3. **Search Implementation**
   - Client-side full-text search using notes-index.json
   - Fuzzy matching across title, content, tags, and author
   - Search includes full content and code blocks (not truncated)
   - Search results limited to 10 items with pagination potential
   - Includes term highlighting in results

4. **Metadata Processing**
   - YAML frontmatter parser extracts note metadata
   - Required fields: title, tags, created, author, description
   - Optional fields: updated, category, status
   - Metadata used for search, filtering, and navigation

5. **Context System**
   - Top-level folders in `/notes/` become "contexts" for filtering
   - Dynamic filtering: navigation, search, tags respect active context
   - Persistent context saved in localStorage

6. **Settings System**
   - Settings modal with multiple sections accessed via sidebar navigation
   - Settings include theme, font size/family, keyboard shortcuts, custom CSS
   - Font settings applied via CSS classes on body element
   - Custom CSS injected via dynamic style element
   - Keyboard shortcuts customizable with live capture functionality

## Important Implementation Details

### Code Block Features
```markdown
```language title:"Your Title Here" collapse:true
code content
```
```
- Copy button with HTML entity escaping (critical for HTML code)
- Line numbers toggle
- Word wrap toggle
- Collapse functionality
- Language label with separator line before title

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
    "autoTheme": true,               // Follow system theme
    "activeContext": "technical",    // Current context filter
    "stickySearch": false,           // Preserve search queries
    "contentWidth": "narrow",        // Content width preference
    "defaultHomePage": "home",       // 'home', 'last-viewed', 'specific'
    "specificHomeNote": "",          // Path to specific note if defaultHomePage is 'specific'
    "externalLinksNewTab": true,     // Open external links in new tab
    "fontSize": "normal",            // 'small', 'normal', 'large', 'extra-large'
    "fontFamily": "system",          // 'system', 'sans-serif', 'serif', 'monospace'
    "defaultCodeLanguage": "plaintext", // Default language for unmarked code blocks
    "customCSS": "",                 // User's custom CSS rules
    "keyboardShortcuts": {           // Customizable keyboard shortcuts
      "new-tab": "Ctrl+T",
      "search": "Ctrl+K",
      "settings": "Ctrl+,",
      "filter": "Ctrl+F"
    }
  }
}
```

## Critical Implementation Notes

### Tab Management
- Multiple tabs support with drag-and-drop reordering
- Tab contents are cached for performance
- Close all tabs functionality
- Tab state persists during navigation
- Fixed duplicate tab bug when Ctrl+clicking links
- Closing last tab creates fresh Home tab

### Keyboard Shortcuts
- **Ctrl+T**: New tab
- **Ctrl+K**: Search
- **Ctrl+,**: Settings
- **Ctrl+F**: Filter/find notes
- Tooltips show shortcuts on hover

### Timer Widget
- Integrated productivity timer in the header
- Play/pause/reset controls
- Long-press reset (3 seconds) with visual feedback
- Theme-aware design adapts to all 50 themes
- Timer state persists across navigation

### Code Block Copy Mechanism
The copy functionality for code blocks containing HTML requires special handling:
- HTML entities are escaped when storing in data attributes
- Uses `textarea` element (not `div`) to decode entities without HTML parsing
- Prevents angle brackets from being stripped when copying HTML code

### Search Index Generation
- `build.py` extracts full searchable content per note (no truncation)
- Combines regular text and code block content for search
- Generates context information from directory structure
- Must be run after any note modifications

### Callout Extension
- Custom marked.js extension for blockquote callouts
- 13 types: WARNING, INFO, TIP, NOTE, DANGER, IMPORTANT, CAUTION, SUCCESS, QUESTION, EXAMPLE, QUOTE, BUG, TODO
- Syntax: `> [!TYPE] Optional Title`
- Handles nested content including code blocks

### Performance Considerations
- Search index loaded entirely into memory
- Theme switching causes full page repaint
- No pagination for search results (hardcoded limit of 10)
- Tab contents cached for quick switching
- Lazy loading of markdown files

### Recent Files Feature
- Shows all files from all contexts with context badges
- Badge colors match context colors for visual consistency
- Recent files persist across sessions in localStorage
- Limit of 20 recent files by default (configurable in settings: 10/20/30/50)

### Font Settings Implementation
- Font size and family settings applied via CSS classes on body element
- Classes: `font-size-{small|normal|large|extra-large}`, `font-family-{system|sans-serif|serif|monospace}`
- CSS custom properties used: `--content-font-size`, `--content-line-height`, `--content-font-family`
- Content must have `content-view` class to inherit font settings

### Custom Marked.js Renderers
- Link renderer modified to respect `externalLinksNewTab` setting
- External links automatically open in new tab when enabled
- Internal links (starting with #) always open in same tab

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
2. Test all 50 themes for visual consistency
3. Verify search with special characters and multiple terms
4. Test deep linking to specific headings
5. Check localStorage persistence across sessions
6. Validate mobile responsive behavior
7. Test offline functionality (all assets are local)
8. Verify code block features (copy, line numbers, wrap)
9. Test HTML code copying specifically
10. Test timer functionality across theme changes
11. Verify tab management (create, close, reorder)
12. Test context filtering across navigation and search
13. Test keyboard shortcuts (Ctrl+T, Ctrl+K, Ctrl+,, Ctrl+F)
14. Verify modal interactions (Escape key, click-outside to close)
15. Test font size and font family changes apply to content
16. Verify custom CSS injection and removal
17. Test keyboard shortcut customization with various key combinations
18. Verify default home page settings (home/last-viewed/specific)
19. Test external links behavior with setting enabled/disabled

## Security Notes

- Marked.js sanitizes markdown content by default
- File paths are validated to prevent directory traversal
- No JavaScript execution from markdown content
- All external assets are bundled locally
- Theme files are loaded dynamically but from trusted local source

## Deployment Options

1. **GitLab Pages** - Use included `.gitlab-ci.yml` for automatic deployment
2. **Static Hosting** - Upload all files to Netlify, Vercel, GitHub Pages, etc.
3. **Direct File Access** - Limited functionality due to CORS (search disabled)

Note: Full functionality requires HTTP server due to JavaScript module loading and CORS restrictions.