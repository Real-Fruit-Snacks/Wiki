# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

### Build the Search Index
The application requires a search index to be generated from markdown files:
```bash
python3 build.py
```
This command scans all markdown files in the `/notes/` directory and generates `notes-index.json`.

### Local Development Server
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`

### Validation and Testing
```bash
# Check JavaScript syntax
node -c script.js

# Test locally before deployment
python3 -m http.server 8000

# Validate search index generation
python3 build.py  # Should output "Build complete!" with stats
```

### Deployment
- **GitHub Pages**: Automatic deployment via GitHub Actions on push to main branch
- **GitLab Pages**: Automatic deployment via `.gitlab-ci.yml` on push

## Architecture Overview

This is a **single-page application (SPA)** built with vanilla JavaScript - no framework dependencies.

### Critical Architecture Issues

⚠️ **MONOLITHIC DESIGN WARNING**: The application currently suffers from severe architectural debt:
- **6,598 lines** in a single `script.js` file
- **159 methods** in one `NotesWiki` class
- **Difficult to maintain, test, and extend**

When making significant changes, consider the modular refactoring plan:
```javascript
// Suggested structure:
- NoteManager.js (note loading, rendering)
- TabManager.js (tab system) 
- SearchManager.js (search functionality)
- SettingsManager.js (settings handling)
- ThemeManager.js (theme system)
- PomodoroManager.js (timer functionality)
```

### Core Components

1. **Entry Point**: `index.html` - Single HTML file that loads all resources
2. **Main Application**: `script.js` - Contains the monolithic `NotesWiki` class that handles:
   - Tab management with drag-and-drop
   - Advanced search with operators (`tag:`, `author:`, `code:`, etc.)
   - Theme switching (50+ themes in `/themes/`)
   - Settings persistence via localStorage
   - Pomodoro timer, keyboard shortcuts, context filtering

3. **Build System**: `build.py` - Python script that:
   - Scans `/notes/` directory recursively
   - Extracts frontmatter metadata (YAML)
   - Creates full-text searchable index including code blocks
   - Generates `notes-index.json` with all note metadata and content

4. **Content Structure**:
   - `/notes/` - All markdown content organized by context (top-level folders)
   - Each context folder (personal, technical, projects, etc.) acts as a filterable category
   - Markdown files support frontmatter with: title, tags, author, created, updated, description

### Key Design Principles

- **Zero runtime dependencies**: All libraries are bundled in `/libs/`
- **Offline-first**: Works completely offline after initial load
- **Static generation**: No server-side processing required
- **Search optimization**: Full content is indexed, including code blocks
- **Theme flexibility**: CSS-only themes that can be switched dynamically

### Browser Compatibility

✅ **Excellent cross-browser support**:
- **Chrome 66+, Firefox 63+, Edge 79+, Safari 13.1+** (for full clipboard API)
- **Chrome 57+, Firefox 52+, Edge 16+, Safari 10.1+** (for core functionality)
- All modern JavaScript features (ES6+, async/await) are well-supported
- CSS Grid and Flexbox have excellent support
- Only minor issue: Clipboard API requires HTTPS (affects local development only)

### Important Implementation Details

- The app uses hash-based routing (`#/notes/path/to/file.md`)
- Search index is loaded once on startup and kept in memory
- Each tab maintains its own state (note content, scroll position)
- Settings and recent files are persisted to localStorage
- Code syntax highlighting uses Prism.js with 20+ language support
- Markdown rendering supports custom callouts, collapsible sections, and code block titles

### Recently Added Features (v2.8.4+)

1. **Table of Contents** - Auto-generated from headings, collapsible, tracks reading position
2. **Wiki-style Links** - `[[Note Title]]` syntax creates internal links between notes
3. **Reading Progress** - Progress bar and time estimation based on word count
4. **Focus Mode** - Press 'F' to hide sidebar and center content for distraction-free reading
5. **In-Note Search** - Ctrl+F to search within current note with highlighting and navigation

### Memory Management Critical Patterns

⚠️ **MEMORY LEAK RISK**: The codebase has 111 `addEventListener` calls vs only 13 `removeEventListener` calls. **Always implement cleanup when modifying event handling.**

1. **Required cleanup patterns**:
   ```javascript
   // Store handler for cleanup
   this.someHandler = (e) => { /* handler code */ };
   element.addEventListener('event', this.someHandler);
   
   // REQUIRED: Cleanup later
   element.removeEventListener('event', this.someHandler);
   delete this.someHandler;
   ```

2. **Common leak sources**:
   - Scroll handlers with timeouts
   - Search key handlers
   - Tab hover timeouts
   - Modal escape handlers
   - Drag-and-drop handlers

3. **Error handling requirements**:
   ```javascript
   // ALWAYS wrap localStorage operations
   try {
       localStorage.setItem('key', JSON.stringify(data));
   } catch (error) {
       console.warn('Storage failed:', error);
       this.showToast('Settings could not be saved');
   }
   ```

### Security Considerations

🔒 **XSS Prevention**: Use `textContent` instead of `innerHTML` for user-controlled data:
```javascript
// SAFE:
element.textContent = userInput;

// UNSAFE:
element.innerHTML = userInput; // Only for trusted SVG/static content
```

### Recently Applied Fixes (v2.8.5+)

✅ **Critical fixes implemented**:
1. **Memory Leak**: Search key handler cleanup in `hideSearch()`
2. **Error Handling**: Application initialization with user-friendly error display  
3. **localStorage Safety**: Error handling for storage quota/disabled scenarios
4. **XSS Prevention**: Context name and action label sanitization
5. **Performance**: Search input debouncing (150ms)

### Browser Keyboard Shortcuts

🎯 **Browser conflict resolution**: 
- Primary shortcuts: `Alt+W`, `Alt+T`, `Alt+1-9` (browser-compatible)
- Legacy shortcuts: `Ctrl+W`, `Ctrl+T`, `Ctrl+1-9` (may conflict)
- The application includes dual shortcut support for maximum compatibility

### Recent Feature Additions (v2.8.4+)

1. **Table of Contents** - Auto-generated from headings, collapsible, tracks reading position
2. **Wiki-style Links** - `[[Note Title]]` syntax creates internal links between notes
3. **Reading Progress** - Progress bar and time estimation based on word count
4. **Focus Mode** - Press 'F' to hide sidebar and center content for distraction-free reading
5. **In-Note Search** - Ctrl+F to search within current note with highlighting and navigation