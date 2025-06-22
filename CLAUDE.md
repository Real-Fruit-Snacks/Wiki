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

# Validate all themes exist
npm run validate-themes

# Run Puppeteer theme tests (requires npm install)
npm run test

# Validate search index generation
python3 build.py  # Should output "Build complete!" with stats
```

### Release Packaging
```bash
npm run package
```
This creates a versioned zip file (`notes-wiki-v{version}-complete.zip`) with all necessary assets for offline deployment.

## Architecture Overview

This is a **single-page application (SPA)** built with vanilla JavaScript - no framework dependencies.

### Critical Architecture Issues

⚠️ **MONOLITHIC DESIGN WARNING**: The application currently suffers from severe architectural debt:
- **10,600+ lines** in a single `script.js` file
- **200+ methods** in one `NotesWiki` class
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
- StickyNotesManager.js (sticky notes)
- SplitViewManager.js (split view)
```

### Core Components

1. **Entry Point**: `index.html` - Single HTML file that loads all resources with dynamic base path detection for GitHub Pages compatibility
2. **Main Application**: `script.js` - Contains the monolithic `NotesWiki` class that handles:
   - Tab management with drag-and-drop
   - Advanced search with operators (`tag:`, `author:`, `"phrase"`, `-exclude`, etc.)
   - Theme switching (70 themes organized in 10 categories)
   - Settings persistence via localStorage
   - Pomodoro timer, keyboard shortcuts, responsive context filtering
   - Sticky notes (floating mini-notes with drag/resize)
   - Split view (side-by-side note viewing)
   - Confirmation dialogs for closing tabs/sticky notes (enabled by default)

3. **Build System**: `build.py` - Python script that:
   - Scans `/notes/` directory recursively
   - Extracts frontmatter metadata (YAML)
   - Creates full-text searchable index including code blocks
   - Generates `notes-index.json` with all note metadata and content
   - Reports theme count and validates theme files

4. **Content Structure**:
   - `/notes/` - All markdown content organized by context (top-level folders)
   - `/images/` - Image assets organized by purpose:
     - `/images/reference/` - Reference documentation images
     - `/images/tutorials/` - Tutorial screenshots and diagrams
   - Each context folder acts as a filterable category
   - Markdown files support frontmatter with: title, tags, author, created, updated, description

### Deployment Configuration

- **GitHub Pages**: 
  - Jekyll bypass configured in `_config.yml` and `.nojekyll`
  - Custom 404 page (`404.html`) with theme support
  - GitHub Actions workflow in `.github/workflows/static.yml`
- **GitLab Pages**: 
  - Automatic deployment via `.gitlab-ci.yml`
  - Python 3.11-alpine image for builds
  - 30-day artifact retention for production
  - Preview environments for merge requests
  - See `GITLAB-DEPLOYMENT.md` for detailed instructions
- **General Deployment**: 
  - See `DEPLOYMENT-GUIDE.md` for platform-agnostic instructions

### Key Design Principles

- **Zero runtime dependencies**: All libraries are bundled in `/libs/`
- **Offline-first**: Works completely offline after initial load
- **Static generation**: No server-side processing required
- **Search optimization**: Full content is indexed, including code blocks
- **Theme flexibility**: CSS-only themes that can be switched dynamically
- **Project-name agnostic**: Automatically detects and adjusts paths for any project name

### Important Settings Defaults

```javascript
this.settings = {
    trackRecent: true,
    showLineNumbers: true,
    enableWordWrap: true,
    recentLimit: 20,
    theme: 'ayu-mirage',
    autoTheme: false,
    confirmOnClose: true,  // Confirmation dialogs enabled by default
    contentWidth: 'narrow',
    focusMode: false,
    // ... other settings
};
```

### Memory Management Critical Patterns

⚠️ **MEMORY LEAK PREVENTION**: The application includes comprehensive memory management through `setupCleanupHandlers()` but requires careful event listener management when adding features.

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
   - Scroll handlers with timeouts (TOC, reading progress)
   - Modal escape handlers
   - Drag-and-drop handlers
   - AudioContext instances
   - Pomodoro timer intervals
   - Confirmation dialog handlers

### Security Considerations

🔒 **XSS Prevention**: Use `textContent` instead of `innerHTML` for user-controlled data:
```javascript
// SAFE:
element.textContent = userInput;

// UNSAFE:
element.innerHTML = userInput; // Only for trusted SVG/static content
```

### Theme Categories Structure

Themes are organized into 10 categories in the settings modal:
1. **Classic Dark** - Traditional dark themes
2. **Classic Light** - Traditional light themes
3. **Material Design** - Material design inspired themes
4. **Nature & Earth** - Natural color palettes
5. **Arctic & Winter** - Cool, icy color schemes
6. **Ocean & Sky** - Blue and aqua based themes
7. **Cyberpunk & Neon** - Futuristic neon themes
8. **Elegant & Pastel** - Soft, muted colors
9. **Professional** - Business-appropriate themes
10. **Special Effects** - Themes with unique visual effects

### Recent Major Features (v3.1.0 - v3.4.0)

1. **Split View Implementation** - Side-by-side note viewing with draggable pane resizing
2. **Sticky Notes Feature** - Floating mini-notes with drag, resize, and color options
3. **Dynamic Path Detection** - Works with any project name on GitHub/GitLab Pages
4. **Confirmation Dialogs** - Optional (now default) confirmations when closing tabs/sticky notes
5. **Enhanced Error Logging** - Comprehensive logging for theme loading and other operations
6. **Pinned Tabs** - Right-click tabs to pin them, preventing closure and navigation to different notes

### Combined Code Blocks Feature

The application can automatically combine all code blocks from a page into a single, copyable block at the end of the note.

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

### GitLab CI/CD Pipeline

The `.gitlab-ci.yml` configuration provides:
- **Build stage**: Python 3.11-alpine, installs PyYAML, builds search index
- **Deploy stage**: Automatic deployment to GitLab Pages
- **Preview environments**: Deploy previews for merge requests
- **Artifacts**: 30-day retention for production, 1 week for previews

### Development Workflow

When making changes to this codebase:
1. **Test syntax**: `npm run validate` after any JavaScript changes
2. **Rebuild index**: `npm run build` after adding/modifying notes
3. **Local testing**: `npm run serve` for manual verification
4. **Help updates**: Update help modal content in `index.html` when adding features
5. **Memory management**: Implement proper event listener cleanup
6. **Deployment**: Push to main branch for automatic deployment

### Key Methods to Know

**Tab Management**:
- `createNewTab(path, title)` - Creates a new tab
- `closeTab(tabId)` - Shows confirmation if enabled, then closes
- `switchToTab(tabId)` - Switches active tab
- `togglePinTab(tabId)` - Toggles pin state for a tab
- `duplicateTab(tabId)` - Creates a duplicate of the specified tab
- `closeOtherTabs(tabId)` - Closes all other non-pinned tabs

**Settings Management**:
- `loadSettings()` - Loads from localStorage
- `saveSettings()` - Persists to localStorage
- `showSettings()` - Opens settings modal

**Search & Navigation**:
- `performSearch(query)` - Executes search with operator support
- `loadNote(path)` - Loads markdown file into active tab/pane
- `buildContextSwitcher()` - Creates responsive context filter

**UI Helpers**:
- `showToast(message, type)` - Shows temporary notification
- `showConfirmationDialog(title, message, onConfirm, onCancel)` - Shows confirmation modal

**Memory Management**:
- `setupCleanupHandlers()` - Sets up page lifecycle cleanup
- `clearAllTimers()` - Cleans up all intervals/timeouts
- `removeAllEventListeners()` - Removes stored event listeners

### Release Process
1. Update version in `package.json`
2. Run `npm run package` to create release bundle
3. Tag release in git with version number
4. Create GitHub release with `gh release create`