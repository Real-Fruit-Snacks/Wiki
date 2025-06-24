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
npm run validate

# Validate all themes exist
npm run validate-themes

# Run Puppeteer theme tests (requires npm install)
npm run test

# Validate both JS and themes
npm run validate-all

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
- **16,000+ lines** in a single `script.js` file
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
- QuickNotesManager.js (quick notes panel)
- SplitViewManager.js (split view)
- ContextMenuManager.js (right-click menus)
```

### Core Components

1. **Entry Point**: `index.html` - Single HTML file that loads all resources with dynamic base path detection for GitHub Pages compatibility
2. **Main Application**: `script.js` - Contains the monolithic `NotesWiki` class that handles:
   - Tab management with drag-and-drop and pinning
   - Advanced search with operators (`tag:`, `author:`, `"phrase"`, `-exclude`, etc.)
   - Theme switching (150 themes organized in 11 categories including complete Bearded Collection)
   - Settings persistence via localStorage
   - Pomodoro timer, keyboard shortcuts, responsive context filtering
   - Quick Notes panel (slide-out from right side for temporary notes)
   - Split view (side-by-side note viewing)
   - Context menus (10+ different menus for all UI elements)
   - Confirmation dialogs for closing tabs/sticky notes (enabled by default)

3. **Build System**: `build.py` - Python script that:
   - Scans `/notes/` directory recursively
   - Extracts frontmatter metadata (YAML)
   - Creates full-text searchable index including code blocks
   - Generates `notes-index.json` with all note metadata and content
   - Reports theme count and validates theme files

4. **Content Structure**:
   - `/notes/` - All markdown content organized by context (top-level folders)
   - `/images/` - Image assets organized by purpose
   - `/themes/` - 150 CSS theme files
   - `/libs/` - Bundled dependencies (Marked.js, Prism.js, Mermaid.js)
   - `/fonts/` - Self-contained font system (Inter, JetBrains Mono)

### Deployment Configuration

- **GitHub Pages**: 
  - GitHub Actions workflow in `.github/workflows/static.yml`
  - Automatic deployment on push to main branch
  - Jekyll bypass configured in `_config.yml` and `.nojekyll`
  
- **GitLab Pages**: 
  - Automatic deployment via `.gitlab-ci.yml`
  - Python 3.11-alpine image for builds
  - 30-day artifact retention for production
  - Preview environments for merge requests

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
    contentWidth: 'normal',
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

### Theme System Architecture

Themes are organized into 11 categories with 150 total themes:
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
11. **Bearded Collection** - Complete 76-theme Bearded Theme collection

### Context Menu System

The application features comprehensive right-click context menus:
- **Note context menus**: Open in tab, bookmark, share
- **Tab context menus**: Pin/unpin, close, close others
- **Timer context menu**: Pomodoro presets
- **Search context menu**: Clear, history, operators
- **Settings context menu**: Theme actions, import/export
- **Sidebar context menu**: Expand/collapse, refresh
- **Filter context menu**: Clear filters, popular tags
- **Tab bar context menu**: New tab, close all
- **Close all button menu**: Force close pinned tabs

### Recent Major Features (v3.6.0+)

1. **Universal Context Menus** - Right-click functionality everywhere
2. **Theme Favorites System** - Star themes for quick access
3. **Settings Import/Export** - Full backup/restore functionality
4. **Enhanced Badge Readability** - Improved contrast across all themes
5. **Conflict-Free Menu System** - Prevents overlapping context menus
6. **Quick Theme Switching** - Styled modal interface
7. **Pomodoro Presets** - Quick timer configuration

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

### Development Workflow

When making changes to this codebase:
1. **Test syntax**: `npm run validate` after any JavaScript changes
2. **Rebuild index**: `npm run build` after adding/modifying notes
3. **Local testing**: `npm run serve` for manual verification
4. **Help updates**: Update help modal content in `index.html` when adding features
5. **Memory management**: Implement proper event listener cleanup
6. **Context menu conflicts**: Use `dismissAllContextMenus()` before showing new menus

### Critical Implementation Notes

**Badge Styling**: Badge elements use `--badge-bg` and `--badge-text` CSS variables with fallbacks for contrast. All themes define these variables for optimal readability.

**Theme Favorite Stars**: Positioned at `bottom: 8px; left: 8px` with `!important` declarations to ensure consistent placement.

**Context Menu Icons**: Always use semantic, action-specific SVG icons. Avoid duplicate icons across menu items. Test rendering across themes to ensure visibility.

**Quick Notes vs Sticky Notes**: The application transitioned from floating sticky notes to a slide-out Quick Notes panel in v3.4.0. Any references to "sticky notes" in code should refer to the new panel system.

**Tab Context Menu**: Available actions are Pin/Unpin Tab, Close Tab, Close Other Tabs, and Close All Tabs. Duplicate Tab was removed in v3.4.0.

**SVG Icon Patterns**: Use `fill="currentColor"` for theme compatibility. Ensure 16x16 viewbox and proper path definitions. Test in context menus specifically as they have different rendering behavior than header icons.

### Key Methods to Know

**Tab Management**:
- `createNewTab(path, title)` - Creates a new tab
- `closeTab(tabId)` - Shows confirmation if enabled, then closes
- `switchToTab(tabId)` - Switches active tab
- `togglePinTab(tabId)` - Toggles pin state for a tab
- `closeOtherTabs(tabId)` - Closes all other non-pinned tabs

**Context Menu System**:
- `dismissAllContextMenus()` - Closes all open context menus
- `showNoteContextMenu(event, notePath, noteTitle)` - Note actions
- `showTabContextMenu(event, tabId)` - Tab actions
- `showTimerContextMenu(event)` - Timer presets
- `showSettingsButtonContextMenu(event)` - Settings actions

**Settings Management**:
- `loadSettings()` - Loads from localStorage
- `saveSettings()` - Persists to localStorage
- `showSettings()` - Opens settings modal
- `getDefaultSettings()` - Returns default settings object
- `importSettings(file)` - Imports settings from JSON file
- `exportSettings()` - Exports settings to JSON file

**Theme Management**:
- `applyTheme(themeId)` - Applies a theme
- `showQuickThemeMenu()` - Shows theme switcher modal
- `showThemeFavorites()` - Shows favorite themes modal
- `toggleThemeFavorite(themeId)` - Adds/removes theme from favorites
- `applyRandomTheme()` - Applies random theme from all 150 themes

**Search & Navigation**:
- `performSearch(query)` - Executes search with operator support
- `loadNote(path)` - Loads markdown file into active tab/pane
- `buildContextSwitcher()` - Creates responsive context filter
- `navigateToHome()` - Returns to index/welcome page

**UI Helpers**:
- `showToast(message, type)` - Shows temporary notification
- `showConfirmationDialog(title, message, onConfirm, onCancel)` - Shows confirmation modal

**Quick Notes Management**:
- `toggleQuickNotes()` - Shows/hides the Quick Notes panel
- `addQuickNote()` - Creates a new quick note
- `deleteQuickNote(id)` - Removes a quick note with confirmation
- `displayQuickNotes()` - Refreshes the notes list display
- `updateCurrentNote()` - Auto-saves current note content

**Memory Management**:
- `setupCleanupHandlers()` - Sets up page lifecycle cleanup
- `clearAllTimers()` - Cleans up all intervals/timeouts
- `removeAllEventListeners()` - Removes stored event listeners

### Theme Development

**Creating New Themes**:
1. Create CSS file in `/themes/` directory with complete color variables
2. Add theme to appropriate category in `script.js` theme configuration
3. Add preview colors in `getThemePreviewColors()` function
4. Add syntax colors in `getThemeSyntaxColors()` function  
5. Add decorative elements in `getThemeDecoration()` function
6. Ensure `--badge-text` and `--badge-bg` provide good contrast

**Required CSS Variables**:
- Background: `--bg-primary`, `--bg-secondary`, `--bg-sidebar`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`
- Accent: `--accent-primary`, `--accent-secondary`
- Badge: `--badge-bg`, `--badge-text`, `--badge-border`
- Border: `--border-primary`, `--border-secondary`

### Release Process
1. Update version in `package.json`
2. Run `npm run package` to create release bundle
3. Tag release in git with version number
4. Create GitHub release with `gh release create`