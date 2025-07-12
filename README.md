# Notes Wiki

A self-contained, offline-first personal knowledge management system built with vanilla JavaScript. Features 74 themes, advanced search, multi-tab interface, and powerful productivity tools with zero external dependencies.

![Version](https://img.shields.io/badge/version-4.2.0-blue)
![Size](https://img.shields.io/badge/size-~15MB-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## ✨ Features

### 🎯 Core Features
- **Offline-First**: Works completely offline with no external dependencies
- **Multi-Tab Interface**: Browser-style tabs with drag-and-drop, pinning, and split view
- **74 Themes**: Professional themes organized in 10 categories with favorites system
- **Advanced Search**: Full-text search with operators (`tag:`, `author:`, `"exact phrase"`, `-exclude`)
- **Markdown Support**: Full CommonMark spec with syntax highlighting and Mermaid diagrams
- **Self-Contained**: All assets bundled - fonts, libraries, themes

### 🛠️ Productivity Tools
- **Variable Manager**: Define `$Variables` in code blocks and manage their values per note
- **Split View**: Dual-pane interface for viewing multiple notes simultaneously  
- **Quick Notes**: Temporary note-taking panel for jotting down quick thoughts
- **Focus Mode**: Distraction-free reading with customizable width settings
- **Text Analyzer**: Character-by-character text analysis with hash generation
- **Pomodoro Timer**: Built-in time management with work/break cycles

### 🎨 User Experience
- **Context Menus**: Right-click menus throughout the interface for quick actions
- **Bookmarks System**: Save and organize favorite notes for quick access
- **Reading Progress**: Visual progress indicators and estimated reading time
- **Table of Contents**: Auto-generated TOC for easy navigation
- **Callouts/Admonitions**: Special formatted blocks (warning, info, tip, etc.)
- **Recent Files**: Track and quickly access recently opened notes

### 🔧 Advanced Features
- **Tag Filtering**: Powerful tag-based filtering with inclusion/exclusion modes
- **File Tree Navigation**: Hierarchical folder structure with expand/collapse
- **Keyboard Shortcuts**: Comprehensive shortcut system for power users
- **Custom CSS**: Theme customization and personal styling options
- **Export/Import**: Settings backup and restore functionality

## 🚀 Quick Start

### Deploy to GitHub Pages

1. Fork this repository
2. Enable GitHub Pages: Settings → Pages → Source: GitHub Actions
3. Your wiki will be available at: `https://[username].github.io/Wiki/`

### Run Locally

```bash
git clone https://github.com/Real-Fruit-Snacks/Wiki.git
cd Wiki
python3 -m http.server 8000
# Open http://localhost:8000
```

### Deploy to Other Platforms

Download the [latest release](https://github.com/Real-Fruit-Snacks/Wiki/releases) which includes configurations for GitLab Pages and other platforms.

## 📝 Usage

### Adding Notes

1. Create markdown files in the `/notes/` directory:

```markdown
---
title: My Note
tags: [topic, category]
author: Your Name
created: 2025-06-24
---

# My Note

Your content here...

## Using Variables in Code Blocks

```javascript
const apiUrl = '$API_URL';
const apiKey = '$API_KEY';
```

Use the Variable Manager ($) to set values for `$API_URL` and `$API_KEY`.
```

2. Rebuild the search index:

```bash
npm run build
# or
python3 build.py
```

### Variable Manager

The Variable Manager allows you to define variables in your code blocks and manage their values:

1. **Define Variables**: Use `$VariableName` in any code block
2. **Open Variable Manager**: Click the `$` button or press `Ctrl+Shift+V`
3. **Set Values**: Enter values for each variable
4. **Auto-Replace**: Variables are automatically replaced in all code blocks
5. **Per-Note Storage**: Each note maintains its own variable values

**Variable Manager Controls**:
- 🔄 **Refresh**: Re-scan note for new variables
- 🗑️ **Reset**: Clear all variable values
- ❓ **Help**: Show usage instructions

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `?` | Show all shortcuts |
| `Ctrl+K` | Quick search |
| `Ctrl+T` | New tab |
| `Ctrl+W` | Close current tab |
| `Ctrl+Shift+T` | Reopen closed tab |
| `F` | Toggle focus mode |
| `Ctrl+Shift+S` | Quick notes panel |
| `Ctrl+Shift+V` | Variable Manager |
| `Ctrl+B` | Bookmark current note |
| `Ctrl+,` | Open settings |
| `Alt+1-9` | Switch to tab 1-9 |
| `Alt+PageUp/PageDown` | Previous/Next tab |

## 🔧 Development

### Prerequisites

- Python 3.x (for building search index)
- Node.js (optional, for npm scripts)

### Commands

```bash
# Build search index
npm run build

# Validate JavaScript
npm run validate  

# Validate themes
npm run validate-themes

# Run all validations
npm run validate-all

# Create release package
npm run package

# Serve locally
npm run serve
```

### Project Structure

```
├── index.html          # Single-page application entry
├── script.js           # Core application (16,700+ lines)
├── style.css           # Base styles and theme system
├── build.py            # Search index generator
├── notes/              # Markdown content
├── themes/             # 74 CSS theme files
├── libs/               # Bundled dependencies
├── fonts/              # Self-hosted web fonts
├── _config.yml         # Jekyll configuration for GitHub Pages
├── .nojekyll           # Disable Jekyll processing
└── 404.html            # Custom 404 page
```

## 📚 Documentation

Comprehensive documentation is available in the `/notes/` directory:

### 🎯 Getting Started
- `/notes/tutorials/getting-started/welcome.md` - Introduction and overview
- `/notes/tutorials/getting-started/installation-setup.md` - Setup instructions
- `/notes/tutorials/getting-started/creating-notes.md` - Note creation guide
- `/notes/tutorials/getting-started/best-practices.md` - Tips and best practices

### 🚀 Features
- `/notes/tutorials/features/variable-manager.md` - Variable Manager guide
- `/notes/tutorials/features/split-view.md` - Split view functionality
- `/notes/tutorials/features/quick-notes.md` - Quick notes panel
- `/notes/tutorials/features/focus-mode.md` - Focus mode settings
- `/notes/tutorials/features/search-guide.md` - Advanced search features
- `/notes/tutorials/features/themes.md` - Theme system and customization
- `/notes/tutorials/features/keyboard-shortcuts.md` - Complete shortcuts list
- `/notes/tutorials/features/context-menus.md` - Right-click menu reference

### ⚡ Advanced
- `/notes/tutorials/advanced/performance-optimization.md` - Performance tips
- `/notes/tutorials/advanced/search-index-management.md` - Search optimization
- `/notes/tutorials/advanced/combined-code-blocks.md` - Advanced code features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with vanilla JavaScript and no frameworks. Includes bundled versions of:
- [Marked.js](https://marked.js.org/) - Markdown parsing
- [Prism.js](https://prismjs.com/) - Syntax highlighting  
- [js-yaml](https://github.com/nodeca/js-yaml) - YAML frontmatter parsing

## 🔗 Links

- **Live Demo**: [View Demo](https://real-fruit-snacks.github.io/Wiki/)
- **Documentation**: [Full Documentation](https://real-fruit-snacks.github.io/Wiki/notes/tutorials/)
- **Issues**: [Report Bugs](https://github.com/Real-Fruit-Snacks/Wiki/issues)
- **Releases**: [Download Latest](https://github.com/Real-Fruit-Snacks/Wiki/releases)