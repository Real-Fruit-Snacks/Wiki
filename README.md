# Notes Wiki

A self-contained, offline-first personal knowledge management system built with vanilla JavaScript. Features 74 themes, advanced search, and multi-tab interface with zero external dependencies.

![Version](https://img.shields.io/badge/version-4.1.0-blue)
![Size](https://img.shields.io/badge/size-~15MB-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## Features

- **Offline-First**: Works completely offline with no external dependencies
- **Multi-Tab Interface**: Browser-style tabs with drag-and-drop, pinning, and split view
- **74 Themes**: Professional themes organized in 10 categories  
- **Advanced Search**: Full-text search with operators (`tag:`, `author:`, `"exact phrase"`, `-exclude`)
- **Markdown Support**: Full CommonMark spec with syntax highlighting and Mermaid diagrams
- **Self-Contained**: All assets bundled - fonts, libraries, themes

## Quick Start

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

## Usage

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
```

2. Rebuild the search index:

```bash
npm run build
# or
python3 build.py
```

### Keyboard Shortcuts

- `?` - Show all shortcuts
- `Ctrl+K` - Quick search
- `Ctrl+T` - New tab
- `F` - Focus mode
- `Ctrl+Shift+S` - Quick notes panel

## Development

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
├── script.js           # Core application (15,700+ lines)
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

## Documentation

- [CLAUDE.md](CLAUDE.md) - Development guide and architecture details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

Built with vanilla JavaScript and no frameworks. Includes bundled versions of:
- [Marked.js](https://marked.js.org/) - Markdown parsing
- [Prism.js](https://prismjs.com/) - Syntax highlighting  
- [js-yaml](https://github.com/nodeca/js-yaml) - YAML frontmatter parsing