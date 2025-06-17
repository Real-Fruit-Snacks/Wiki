# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

### Build the Search Index
The application requires a search index to be generated from markdown files:
```bash
python3 build.py
# or use npm script:
npm run build
```
This command scans all markdown files in the `/notes/` directory and generates `notes-index.json`.

### Local Development Server
```bash
python3 -m http.server 8000
# or use npm script:
npm run serve
```
Then navigate to `http://localhost:8000`

### Testing and Validation
```bash
# Check JavaScript syntax
node -c script.js
# or use npm script:
npm run validate

# Run comprehensive Puppeteer tests
npm test

# Run tests with debug output
npm run test:debug

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
- **7,284 lines** in a single `script.js` file (reduced from 7,355 after recent cleanup)
- **~180+ methods** in one `NotesWiki` class
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
   - Advanced search with operators (`tag:`, `author:`, `"phrase"`, `-exclude`, etc.)
   - Theme switching (50 themes in `/themes/`)
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

### Recent Features (v2.9.0)

1. **Table of Contents** - Auto-generated from headings, collapsible, tracks reading position
2. **Wiki-style Links** - `[[Note Title]]` syntax creates internal links between notes
3. **Reading Progress** - Progress bar and time estimation based on word count
4. **Focus Mode** - Press 'F' to hide sidebar and center content for distraction-free reading
5. **In-Note Search** - Ctrl+F to search within current note with highlighting and navigation
6. **PDF Export** - Print-optimized styles with breadcrumb navigation
7. **Enhanced Navigation** - Improved UI/UX for file tree and context switching

### Memory Management Critical Patterns

⚠️ **MEMORY LEAK PREVENTION**: The application now includes comprehensive memory management through `setupCleanupHandlers()` but still requires careful event listener management. **Always implement cleanup when modifying event handling.**

1. **Required cleanup patterns**:
   ```javascript
   // Store handler for cleanup
   this.someHandler = (e) => { /* handler code */ };
   element.addEventListener('event', this.someHandler);
   
   // REQUIRED: Cleanup later
   element.removeEventListener('event', this.someHandler);
   delete this.someHandler;
   ```

2. **Common leak sources** (now addressed but require vigilance):
   - Scroll handlers with timeouts (TOC, reading progress) - ✅ cleanup implemented
   - Search key handlers - ✅ cleanup implemented  
   - Modal escape handlers - ✅ cleanup implemented
   - Drag-and-drop handlers - ⚠️ still requires manual cleanup
   - AudioContext instances - ✅ now reused and properly closed
   - Pomodoro timer intervals - ✅ cleaned up on page lifecycle
   - Tab preview handlers - ✅ removed entirely

3. **Error handling requirements** (now implemented throughout):
   ```javascript
   // ALWAYS wrap localStorage operations (pattern used throughout app)
   try {
       localStorage.setItem('key', JSON.stringify(data));
   } catch (error) {
       console.warn('Storage failed:', error);
       this.showToast('Settings could not be saved', 'error');
   }
   
   // ALWAYS wrap DOM manipulation in functions that could fail
   try {
       // DOM operations that could fail
       const element = document.getElementById('required-element');
       if (!element) {
           console.error('Required element not found');
           return;
       }
   } catch (error) {
       console.error('DOM operation failed:', error);
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

### Recently Applied Fixes (v2.9.0)

✅ **Critical fixes and improvements implemented**:
1. **Syntax Highlighting**: Fixed Prism.js integration with proper `Prism.highlightAll()` calls after DOM injection
2. **Tab Creation**: Fixed Ctrl+T shortcut by adding legacy handler and correcting configuration inconsistency  
3. **Theme System**: Enhanced error handling with CSS loading validation, fallback mechanisms, and toast notifications
4. **Navigation (TOC)**: Comprehensive error handling for Table of Contents generation, scroll handlers, and DOM manipulation
5. **Bookmarks**: Added data validation, localStorage error handling, and corruption recovery mechanisms
6. **Pomodoro Timer**: Fixed AudioContext memory leaks, input validation, and page lifecycle cleanup
7. **Focus Mode**: Enhanced state management with comprehensive error handling and UI consistency validation
8. **Memory Management**: Added page lifecycle cleanup handlers (`setupCleanupHandlers()`) to prevent memory leaks
9. **Error Handling**: Application initialization with user-friendly error display and graceful degradation
10. **localStorage Safety**: Comprehensive error handling for storage quota/disabled scenarios across all features
11. **Tab Preview Removal**: Eliminated problematic tab hover preview system that caused `tabElement is null` errors
12. **Help Menu Accuracy**: Corrected all keyboard shortcuts and functionality descriptions in the help modal (? key)

### Layout and Styling Architecture

The application uses a flexbox-based layout:
- **Main Layout**: `.main-layout` contains sidebar and main content
- **Sidebar**: Fixed 280px width (`--sidebar-width` CSS variable)
- **Content**: Auto-centered with `margin: 0 auto` in `.content-wrapper`
- **Responsive**: Transforms to mobile layout at 768px breakpoint

⚠️ **Content Centering**: The content is automatically centered. Avoid adding transforms or margin adjustments that could offset the natural centering.

### Browser Keyboard Shortcuts

🎯 **Browser conflict resolution**: 
- Primary shortcuts: `Alt+W`, `Alt+T`, `Alt+1-9` (browser-compatible)
- Legacy shortcuts: `Ctrl+W`, `Ctrl+T`, `Ctrl+1-9` (may conflict with browser)
- Focus mode: `F` key (no conflicts)
- Help menu: `?` key (no conflicts)
- The application includes dual shortcut support for maximum compatibility

### Help System

The application includes a comprehensive help modal accessible via the `?` key:
- **Dynamic shortcut display**: Shows current custom shortcuts from settings
- **Accurate functionality**: All descriptions match actual implementation
- **Professional styling**: Consistent with app design system
- **Organized sections**: Navigation, Search, Content Actions, Mouse Actions, Timer
- **Browser warnings**: Clear notes about potential shortcut conflicts

⚠️ **Help Menu Maintenance**: When adding new functionality, update both the implementation AND the help content in `index.html` (shortcuts-modal section).

### Testing and Quality Assurance

The project includes comprehensive testing infrastructure:

#### **Automated Testing**
- **`test-puppeteer.js`** - Main comprehensive test suite
- **`comprehensive-audit.js`** - Normal vs incognito browser testing
- **`extended-comprehensive-audit.js`** - Advanced feature testing
- **Layout verification** and content centering validation
- **Cross-browser compatibility** testing (normal vs private modes)
- **Screenshot generation** for visual regression testing

#### **Manual Validation**
```bash
# Syntax validation
npm run validate

# Build verification  
npm run build  # Should output "Build complete!" with stats

# Local testing
npm run serve  # Test at http://localhost:8000
```

#### **Quality Metrics**
The recent comprehensive audit showed:
- **100% functional parity** between normal and private browsing modes
- **Zero critical differences** in 13 major test categories
- **90+ screenshots** captured for verification
- **Exceptional quality rating** with robust error handling

### Content Management

Notes are organized in `/notes/` with frontmatter support:
```yaml
---
title: Note Title
tags: [tag1, tag2]
author: Author Name
created: 2024-01-01
updated: 2024-01-02
description: Brief description
---
```

The build system (`build.py`) processes these files to create a searchable index with full-text content, code blocks, and metadata.

## Recent Development Notes

### Completed Bug Fixes (Latest Session)
All major issues identified in comprehensive testing have been resolved:
- ✅ **Syntax highlighting** fully functional with Prism.js
- ✅ **Tab creation** (Ctrl+T) working correctly
- ✅ **Theme switching** with robust error handling
- ✅ **Navigation features** (TOC, bookmarks, focus mode) stable
- ✅ **Memory management** comprehensive cleanup implemented
- ✅ **Tab preview removal** eliminated console errors
- ✅ **Help documentation** accurate and professional

### Development Workflow
When making changes to this codebase:
1. **Test syntax**: `npm run validate` after any JavaScript changes
2. **Rebuild index**: `npm run build` after adding/modifying notes
3. **Local testing**: `npm run serve` for manual verification
4. **Help updates**: Update help modal content when adding features
5. **Memory management**: Implement proper event listener cleanup