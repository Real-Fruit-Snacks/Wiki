# Notes Wiki - Installation Guide

## 📦 Offline Installation

This archive contains everything you need to run Notes Wiki locally on any computer with a web browser.

### 🚀 Quick Start (3 Steps)

1. **Extract the archive** to any folder on your computer
2. **Open a terminal** in the extracted folder
3. **Start a local web server**:

#### Python (Recommended)
```bash
# Python 3 (most systems)
python3 -m http.server 8000

# Python 2 (older systems)  
python -m SimpleHTTPServer 8000
```

#### Alternative Methods
```bash
# Node.js (if installed)
npx serve . -l 8000

# PHP (if installed)
php -S localhost:8000

# Ruby (if installed)
ruby -run -e httpd . -p 8000
```

4. **Open your browser** and go to: http://localhost:8000

## 📁 What's Included

```
notes-wiki/
├── index.html              # Main application
├── script.js               # Core functionality  
├── style.css               # Main styles
├── build.py                # Index generator (optional)
├── notes-index.json        # Pre-built search index
├── INSTALL.md              # This file
├── README.md               # Full documentation
├── libs/                   # JavaScript libraries
│   ├── marked.min.js       # Markdown parser
│   ├── prism.min.js        # Syntax highlighter
│   └── js-yaml.min.js      # YAML parser
├── themes/                 # 16 built-in themes
│   ├── light.css
│   ├── dark.css
│   ├── vscode-dark-plus.css
│   └── ... (13 more themes)
└── notes/                  # Sample content
    ├── index.md            # Welcome page
    ├── personal/           # Personal notes
    ├── technical/          # Technical docs
    ├── projects/           # Project notes
    └── reference/          # Reference materials
```

## ✨ Features Available Offline

✅ **Full Functionality**
- All 16 themes with live preview
- Real-time search across all content
- Context-based organization 
- 13 callout types (Warning, Info, Tip, etc.)
- Code syntax highlighting (150+ languages)
- Tag filtering and navigation
- Recent files tracking
- Responsive design (mobile-friendly)

✅ **No Internet Required**
- All assets bundled locally
- Works completely offline
- No external dependencies

## 📝 Adding Your Own Content

### Creating Notes
1. Add `.md` files to the `notes/` folder
2. Use YAML frontmatter for metadata:

```markdown
---
title: My Note
tags: [example, tutorial]
created: 2024-01-15
author: Your Name
description: Brief description
---

# My Note Content

Your markdown content here...
```

### Rebuilding Search Index
After adding/modifying notes:

```bash
python3 build.py
```

This updates `notes-index.json` with your new content.

## 🎨 Customizing Themes

1. Copy an existing theme from `themes/`
2. Modify the CSS custom properties
3. Save with a new name
4. Add to the themes array in `script.js`

## 🔧 Troubleshooting

### "No notes found" or search not working
- Make sure you're using an HTTP server (not opening file:// directly)
- Check that `notes-index.json` exists and is valid

### Themes not loading
- Verify you're running from an HTTP server
- Check browser console for errors

### Notes not displaying
- Ensure markdown files have proper frontmatter
- Rebuild the search index with `python3 build.py`

## 🆘 Support

- Read the full documentation in `README.md`
- Check the sample notes in `notes/` for examples
- Visit: https://github.com/Real-Fruit-Snacks/Wiki

## 📄 License

MIT License - Free for personal and commercial use.

---

**Enjoy your offline Notes Wiki! 📚✨**