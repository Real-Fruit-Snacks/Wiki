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

### Deployment
- **GitHub Pages**: Automatic deployment via GitHub Actions on push to main branch
- **GitLab Pages**: Automatic deployment via `.gitlab-ci.yml` on push

## Architecture Overview

This is a **single-page application (SPA)** built with vanilla JavaScript - no framework dependencies.

### Core Components

1. **Entry Point**: `index.html` - Single HTML file that loads all resources
2. **Main Application**: `script.js` - Contains the `NotesWiki` class (4000+ lines) that handles:
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

### Best Practices for Event Listeners

1. **Always clean up event listeners** when features are removed/regenerated:
   - Store handler references (e.g., `window.tocScrollHandler`)
   - Remove listeners before removing DOM elements
   - Use `delete` to clean up stored references

2. **Prevent duplicate listeners** by:
   - Checking if handler already exists before adding
   - Using data attributes to mark elements with listeners
   - Removing existing elements before recreating

3. **Common patterns used**:
   ```javascript
   // Store handler for cleanup
   this.someHandler = (e) => { /* handler code */ };
   element.addEventListener('event', this.someHandler);
   
   // Cleanup later
   element.removeEventListener('event', this.someHandler);
   delete this.someHandler;
   ```

### Known Bugs Fixed (v2.8.4+)

1. **Note Search Memory Leak** - Escape handler wasn't removed when closing via X button
2. **Modal Ctrl+F Conflict** - Search would open even with other modals active  
3. **TOC Event Cleanup** - Toggle button listeners weren't cleaned up on regeneration