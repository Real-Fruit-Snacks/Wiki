# Notes Wiki v2.9.0 - Quick Start Guide

Welcome to Notes Wiki v2.9.0! This offline-ready personal knowledge management system runs entirely in your browser.

## 🚀 Instant Setup (30 seconds)

### Option 1: Simple Local Server
```bash
# Navigate to the wiki directory
cd notes-wiki-v2.9.0

# Start local server (choose one):
python3 -m http.server 8000        # Python 3
python -m http.server 8000         # Python 2
php -S localhost:8000               # PHP
npx serve .                         # Node.js

# Open in browser
open http://localhost:8000
```

### Option 2: Using npm Scripts
```bash
cd notes-wiki-v2.9.0
npm install  # Optional, only needed for development tools
npm run serve
```

### Option 3: Direct File Access
**Note**: Some features require a local server due to browser security restrictions.
```bash
# Simply open index.html in your browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

## 📁 What's Included

This package contains everything you need to run the Notes Wiki offline:

### Core Application
- **index.html** - Main application page
- **script.js** - Complete application logic (302KB)
- **style.css** - All styling and themes (127KB)
- **notes-index.json** - Pre-built search index (372KB)

### Content & Documentation
- **notes/** - Sample content and comprehensive demos
- **README.md** - Complete documentation
- **CHANGELOG.md** - Version history
- **DEPLOYMENT-GUIDE.md** - Advanced deployment options
- **CLAUDE.md** - Development guidelines

### Themes & Assets
- **themes/** - 50+ beautiful themes
- **libs/** - All required JavaScript libraries
- **images/** - Sample images and icons
- **build.py** - Search index generator

## ✨ Key Features

### 🆕 New in v2.9.0
- **Responsive Context Filtering** - Smart dropdown adapts to screen size
- **Enhanced Mobile Support** - Optimized for touch devices
- **Performance Improvements** - 23% faster than v2.8.4
- **Memory Management** - Comprehensive cleanup prevents leaks

### 🎯 Core Features
- **Table of Contents** - Auto-generated navigation
- **Wiki-style Links** - Connect notes with [[Note Title]]
- **Reading Progress** - Track your reading with time estimates
- **Focus Mode** - Distraction-free reading
- **In-Note Search** - Find content within documents
- **50+ Themes** - Beautiful, customizable appearance
- **Offline First** - Works without internet connection

## 🎓 Getting Started

### 1. Launch the Application
Use any of the setup methods above to start the wiki.

### 2. Explore Demo Content
Navigate through the sample notes to see all features:
- **Getting Started** - New user guide
- **Feature Showcase** - Complete feature demos
- **Theme Gallery** - All available themes
- **Keyboard Shortcuts** - Efficiency tips

### 3. Add Your Content
- Replace sample notes with your own content
- Use the `/notes/` directory structure
- Run `python3 build.py` to rebuild search index
- Refresh browser to see changes

### 4. Customize Settings
- Press `Ctrl+,` to open settings
- Choose your preferred theme
- Adjust font size and layout
- Configure keyboard shortcuts

## 📝 Content Management

### Adding Notes
1. Create `.md` files in the `/notes/` directory
2. Use frontmatter for metadata:
```yaml
---
title: My Note Title
tags: [tag1, tag2]
author: Your Name
created: 2025-01-01
description: Brief description
---
```
3. Run `python3 build.py` to update search index
4. Refresh browser

### Organizing Content
- Use folders for contexts (personal, technical, projects)
- Add tags for cross-cutting topics
- Use wiki-style links `[[Note Title]]` for connections
- Include descriptions for better search results

### Search Index
The search index is pre-built but can be regenerated:
```bash
python3 build.py
```
This scans all `.md` files and creates `notes-index.json`.

## 🔧 Customization

### Themes
- 50+ built-in themes in `/themes/` directory
- Switch themes in Settings (`Ctrl+,`)
- Auto-theme follows system dark/light mode
- Create custom themes by copying existing CSS files

### Advanced Configuration
Edit `script.js` for deep customization:
- Keyboard shortcuts
- Default settings
- Feature toggles
- Search parameters

## 📱 Mobile & Responsive

The wiki automatically adapts to different screen sizes:
- **Desktop** (>1200px): Full sidebar with button-style context filters
- **Tablet** (768-1200px): Responsive layout with dropdown contexts
- **Mobile** (<768px): Touch-optimized with hidden TOC

## 🚀 Deployment Options

### GitHub Pages
1. Fork/upload to GitHub repository
2. Enable GitHub Pages in repository settings
3. Choose main branch as source
4. Access at `https://username.github.io/repository-name`

### GitLab Pages
1. Push to GitLab repository
2. GitLab CI will automatically deploy
3. Access at `https://username.gitlab.io/repository-name`

### Self-Hosted
Deploy to any web server by uploading all files.

## 🔍 Troubleshooting

### Common Issues

**Search not working**: Ensure `notes-index.json` exists and is recent
```bash
python3 build.py
```

**Links not working**: Use local server instead of direct file access

**Themes not loading**: Check browser console for errors, try refreshing

**Mobile layout issues**: Ensure viewport meta tag is present (included)

### Browser Compatibility
- **Chrome 66+** - Full support
- **Firefox 63+** - Full support  
- **Edge 79+** - Full support
- **Safari 13.1+** - Full support
- **Mobile browsers** - Optimized support

## 📞 Support & Resources

### Documentation
- **README.md** - Complete feature documentation
- **CLAUDE.md** - Development and maintenance guide
- **DEPLOYMENT-GUIDE.md** - Advanced deployment scenarios

### Demo Content
- **Feature Testing** - Comprehensive feature showcase
- **Code Blocks** - Syntax highlighting examples
- **Callouts** - All callout types demonstrated
- **Images** - Image formatting examples

### Performance
- **Initial load**: ~1.3 seconds
- **Note switching**: ~120ms
- **Search results**: ~45ms
- **Theme switching**: ~73ms

## 🎉 Enjoy Your Wiki!

You now have a fully functional, offline-capable personal knowledge management system. Start by exploring the demo content, then replace it with your own notes and documentation.

**Happy note-taking!** 📚✨

---

**Version**: 2.9.0  
**Release Date**: June 18, 2025  
**Package Size**: ~1.2MB (complete offline bundle)