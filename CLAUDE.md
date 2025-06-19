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

# Validate search index generation
python3 build.py  # Should output "Build complete!" with stats
```

### Release Packaging
```bash
npm run package
```
This creates a versioned zip file (`notes-wiki-v3.1.0-complete.zip`) with all necessary assets for offline deployment including:
- Complete application files (HTML, CSS, JS)
- All 50+ theme files
- Bundled JavaScript libraries
- Documentation and tutorials
- Build tools and configuration files

## Architecture Overview

This is a **single-page application (SPA)** built with vanilla JavaScript - no framework dependencies.

### Critical Architecture Issues

⚠️ **MONOLITHIC DESIGN WARNING**: The application currently suffers from severe architectural debt:
- **7,000+ lines** in a single `script.js` file
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

1. **Entry Point**: `index.html` - Single HTML file that loads all resources with dynamic base path detection for GitHub Pages compatibility
2. **Main Application**: `script.js` - Contains the monolithic `NotesWiki` class that handles:
   - Tab management with drag-and-drop
   - Advanced search with operators (`tag:`, `author:`, `"phrase"`, `-exclude`, etc.)
   - Theme switching (50 themes in `/themes/`)
   - Settings persistence via localStorage
   - Pomodoro timer, keyboard shortcuts, responsive context filtering with dropdown

3. **Build System**: `build.py` - Python script that:
   - Scans `/notes/` directory recursively
   - Extracts frontmatter metadata (YAML)
   - Creates full-text searchable index including code blocks
   - Generates `notes-index.json` with all note metadata and content

4. **Content Structure**:
   - `/notes/` - All markdown content organized by context (top-level folders)
   - `/images/` - Image assets organized by purpose:
     - `/images/reference/` - Reference documentation images
     - `/images/tutorials/` - Tutorial screenshots and diagrams
   - Each context folder acts as a filterable category
   - Markdown files support frontmatter with: title, tags, author, created, updated, description

### Deployment Configuration

- **GitHub Pages**: 
  - Jekyll bypass configured in `_config.yml`
  - Custom 404 page (`404.html`) with theme support
  - Note: GitHub Actions workflow referenced but not implemented
- **GitLab Pages**: 
  - Automatic deployment via `.gitlab-ci.yml`
  - See `GITLAB-DEPLOYMENT.md` for detailed instructions
- **General Deployment**: 
  - See `DEPLOYMENT-GUIDE.md` for platform-agnostic instructions

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
- Jekyll bypass prevents GitHub Pages from processing the site
- Code blocks support line numbers via CSS counters (toggle in settings)

### Recent Features (v3.1.0)

1. **Table of Contents** - Auto-generated from headings, collapsible, tracks reading position
2. **Wiki-style Links** - `[[Note Title]]` syntax creates internal links between notes
3. **Reading Progress** - Progress bar and time estimation based on word count
4. **Focus Mode** - Press 'F' to hide sidebar and center content for distraction-free reading
5. **In-Note Search** - Ctrl+F to search within current note with highlighting and navigation
6. **Enhanced Navigation** - Improved UI/UX for file tree and responsive context switching
7. **Responsive Context Filtering** - Dynamic dropdown for category selection that adapts to screen size and category count
8. **GitHub Pages Path Fix** - Dynamic base path detection for proper resource loading
9. **Combined Code Blocks** - Automatically combine all code blocks from a page into a single copyable block
10. **Custom 404 Page** - Themed error page for missing routes

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
   - Context dropdown handlers - ✅ proper cleanup implemented with stored references

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

### Recently Applied Fixes (v3.1.0)

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
13. **Context Switcher Enhancement**: Implemented responsive dropdown system for context filtering with proper overflow detection, active state highlighting, and memory-efficient event handling
14. **GitHub Pages Compatibility**: Added dynamic base path detection in `getBasePath()` method for proper resource loading
15. **PDF Export Removal**: Removed PDF export functionality per user request
16. **Line Numbers for Code Blocks**: Implemented CSS counter-based line numbers with proper Prism.js integration
17. **Multi-Search Tool Removal**: Removed the multi-search feature to simplify the codebase
18. **Enhanced Combined Code Blocks Styling**: Added theme-aware colored borders and visual effects for better distinction
19. **Split View Implementation**: Added side-by-side note viewing with draggable pane resizing
20. **Sticky Notes Feature**: Implemented floating mini-notes with drag, resize, and color options

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

### Testing Infrastructure

⚠️ **Current Testing Status**: While test scripts are defined in package.json, the actual test files are not implemented. The referenced test files (test-puppeteer.js, comprehensive-audit.js, extended-comprehensive-audit.js) do not exist.

Available validation commands:
```bash
npm run validate      # Check JavaScript syntax
python3 build.py      # Validate and build search index
```

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
combineCodeBlocks: true  # Optional: enable code block combination
---
```

The build system (`build.py`) processes these files to create a searchable index with full-text content, code blocks, and metadata.

### Asset Organization

```
/images/
├── reference/      # Reference documentation images
├── tutorials/      # Tutorial screenshots and guides
└── [other]/       # Additional image categories as needed
```

## Context Switching Implementation (v3.1.0)

### Overview
The context switcher provides responsive category filtering that adapts to screen size and available space:
- **Button view**: Shows individual category buttons on larger screens with adequate space
- **Dropdown view**: Compact dropdown menu for mobile devices or when many categories exist
- **Positioned next to search**: Located in header navigation area for consistent UX

### Technical Implementation

#### Key Methods in `script.js`:
- `buildContextSwitcher()` - Main method that determines view type and builds appropriate UI
- `setupContextDropdownHandlers()` - Event handling for dropdown interactions with proper cleanup
- `updateContextHighlighting()` - Synchronized highlighting across both view types

#### CSS Classes in `style.css`:
```css
.context-dropdown          /* Dropdown container */
.context-dropdown-toggle    /* Dropdown button with active state support */
.context-dropdown-menu      /* Dropdown menu with proper z-index and positioning */
.context-buttons           /* Button container for normal view */
```

#### Responsive Logic:
```javascript
const isMobile = window.innerWidth <= 768;
const needsDropdown = isMobile || this.contexts.length > 6;
```

#### Memory Management:
- Event handlers are stored as class properties for proper cleanup
- ResizeObserver properly removes listeners on component destruction
- Dropdown click handlers use event delegation to prevent memory leaks

### Configuration Parameters:
- **Mobile breakpoint**: 768px width triggers dropdown view
- **Category threshold**: 6+ categories force dropdown even on desktop
- **Dropdown width**: 200px max-width on desktop, 120px on mobile
- **Active highlighting**: Uses `--accent-primary` and `--accent-primary-light` CSS variables

### Error Handling:
- Graceful fallback if ResizeObserver is unsupported
- Safe DOM manipulation with existence checks
- localStorage errors handled for context persistence

This implementation replaces the previous complex dual-structure approach with a single, maintainable system that provides excellent UX across all device sizes.

## GitHub Pages Dynamic Path Resolution

The application includes dynamic base path detection to work correctly when hosted on GitHub Pages subdirectories:

### Implementation in `script.js`:
```javascript
getBasePath() {
    // Detect if we're running on GitHub Pages or locally
    const pathname = window.location.pathname;
    // GitHub Pages serves from /repository-name/
    if (pathname.includes('/Wiki/') || pathname.includes('/wiki/')) {
        const match = pathname.match(/\/(Wiki|wiki)\//);
        if (match) {
            return pathname.substring(0, pathname.indexOf(match[0]) + match[0].length);
        }
    }
    return '';
}
```

### Resource Loading:
- All resources (themes, scripts, notes, images) use the detected base path
- Initial theme loading handled by inline script in `index.html`
- Script and style loading dynamically adjusted for correct paths

### Affected Resources:
- Theme CSS files: `themes/${themeId}.css`
- Search index: `notes-index.json`
- Note markdown files: `notes/**/*.md`
- JavaScript libraries: `libs/*.js`
- Base stylesheet: `style.css`

## Custom 404 Page

The application includes a custom 404.html page that:
- Maintains theme consistency with user's selected theme
- Provides helpful navigation options
- Works with dynamic base path detection
- Automatically served by GitHub Pages and GitLab Pages for missing routes

## Combined Code Blocks Feature

The application can automatically combine all code blocks from a page into a single, copyable block at the end of the note.

### Configuration
Add to your note's frontmatter:

```yaml
---
title: Your Note Title
combineCodeBlocks: true
combinedBlockLanguage: javascript  # Language for syntax highlighting
combinedBlockTitle: "Complete Code"  # Optional custom title
combinedBlockOptions:
  includeBlockTitles: true      # Add section comments with block titles
  includeOnlyLanguage: javascript  # Filter by specific language
  skipEmptyBlocks: true         # Ignore empty code blocks
  separator: "\n// ---\n"       # Custom separator between blocks
  excludePatterns: ["test", "example"]  # Skip blocks with these patterns in title
---
```

### How It Works
1. When a note with `combineCodeBlocks: true` is loaded, all code blocks are collected
2. Filters are applied based on the configuration options
3. A new code block is generated at the end of the note containing all matching code
4. The combined block includes proper syntax highlighting and copy functionality
5. Block titles are preserved as comments using language-appropriate syntax

### Supported Comment Prefixes
The feature automatically detects the correct comment syntax for 30+ languages:
- JavaScript, Java, C++: `//`
- Python, Ruby, Bash: `#`
- HTML, XML: `<!--`
- CSS: `/*`
- SQL, Lua: `--`
- And many more...

### Use Cases
- **Tutorials**: Combine step-by-step code into a complete working example
- **Documentation**: Create a single copyable implementation from multiple examples
- **Learning**: Aggregate related code snippets for easy reference
- **Development**: Quickly combine modular code blocks into a full script

## Development Workflow

When making changes to this codebase:
1. **Test syntax**: `npm run validate` after any JavaScript changes
2. **Rebuild index**: `npm run build` after adding/modifying notes
3. **Local testing**: `npm run serve` for manual verification
4. **Help updates**: Update help modal content when adding features
5. **Memory management**: Implement proper event listener cleanup
6. **Deployment**: Push to main branch for automatic deployment

### Release Process
1. Update version in `package.json`
2. Run `npm run package` to create release bundle
3. Tag release in git with version number
4. Upload release zip to GitHub/GitLab releases