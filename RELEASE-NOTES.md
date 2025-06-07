# Notes Wiki v2.1.0 - Release Notes

🎨 **Theme Expansion Update** - January 2025

## 📦 Download

**Offline Package**: `notes-wiki-v2.1.0.tar.gz` (~220 KB)

- Complete standalone application
- No internet connection required
- All features included
- 19 sample notes with rich content

## 🆕 What's New in v2.1.0

### 🎨 **Six New Themes**
- **Matrix** - Classic green terminal aesthetic with phosphor glow
- **Witch Hazel** - Purple-focused dark theme with mystical vibes
- **Vaporwave** - Retro 80s neon style with pink and cyan accents
- **Cyberpunk** - Futuristic theme with neon yellow highlights
- **HackTheBox** - Hacker-inspired green theme for security enthusiasts
- **ThinkUltra** - Clean minimal theme with subtle accents

### 🐛 **Bug Fixes**
- Fixed settings modal visibility issues
- Improved modal backdrop behavior
- Enhanced theme switching reliability

### 🔧 **Technical Improvements**
- Updated UI components for better consistency
- Enhanced build system performance
- Improved documentation and repository management
- Streamlined component architecture

---

## Previous Release: v2.0.0

🎉 **Major Update** - June 2025

## 📦 Download

**Offline Package**: `notes-wiki-v2.0.0.tar.gz` (~200 KB)

- Complete standalone application
- No internet connection required
- All features included
- 19 sample notes with rich content

## 🆕 What's New in v2.0.0

### 🎨 **Expanded Theme Collection**
- **27 professional themes** (up from 16)
- **New themes added**: Kanagawa, Everforest Dark, Zenburn, Tomorrow Night, Palenight, Rose Pine Dawn, Material Ocean, and more
- **Fixed dropdown transparency** issues in custom-named themes
- **Improved theme accuracy** with verified official color palettes

### ⏱️ **Integrated Timer Widget**
- **Built-in productivity timer** with play/pause/reset functionality
- **Long-press reset** (3 seconds) with visual feedback
- **Theme-aware design** that adapts to all 27 themes
- **Persistent state** between page reloads

### 🎯 **Enhanced Features**
- **Improved code block styling** with better theme integration
- **Fixed HTML code copying** with proper entity handling
- **Better tag filtering** UI with preview tag display
- **Enhanced share functionality** with floating buttons
- **Improved expand/collapse** controls for code blocks

### 🐛 **Bug Fixes**
- Fixed dropdown menu transparency in several themes
- Corrected color values for 12 themes to match official palettes
- Improved code block alignment and formatting
- Fixed HTML entity escaping in code copy functionality
- Resolved theme preview styling issues

### 🔧 **Technical Improvements**
- Optimized theme loading performance
- Better CSS variable mapping for consistent UI
- Improved build script with better error handling
- Enhanced search index generation

## ✨ All Features

### 🎨 **Theme System**
- **33 professional themes** with live preview
- **Auto theme detection** based on system preferences  
- **Theme categories**: Light, Dark, Nature, Terminal, Modern
- Consistent styling across UI and code blocks

### 🔍 **Advanced Search**
- **Real-time fuzzy search** across all content
- **Multi-field search**: titles, content, tags, authors
- **Tag filtering** with OR logic (multiple tag selection)
- **Sticky search** option to preserve queries

### 📝 **Rich Content Support**
- **GitHub-flavored Markdown** with marked.js
- **Syntax highlighting** for 150+ programming languages
- **13 Callout types**: Warning, Info, Tip, Note, Danger, etc.
- **YAML frontmatter** for metadata (tags, authors, categories)

### 🗂️ **Smart Organization**
- **Context folders**: Personal, Technical, Projects, Reference, Tutorials
- **Dynamic navigation** with collapsible file tree
- **Recent files** tracking with context filtering
- **Cross-linking** support for internal notes and headings

### ⚙️ **Customization**
- **Code block features**: line numbers, word wrap, copy buttons, collapse
- **Content width**: narrow, normal, wide, or full-width layouts
- **Responsive design** optimized for all screen sizes
- **Offline-first**: all assets bundled locally

### 🚀 **Deployment Ready**
- **GitLab Pages** CI/CD pipeline included
- **Static hosting** compatible (Netlify, Vercel, GitHub Pages)
- **Docker support** via simple HTTP server
- **Local development** with Python/Node.js/PHP servers

## 🛠️ Installation

### Quick Start
```bash
# Extract the archive
tar -xzf notes-wiki-v2.0.0.tar.gz
cd notes-wiki

# Start local server
python3 -m http.server 8000

# Open in browser
http://localhost:8000
```

### GitLab Pages Deployment
1. Push to GitLab repository
2. Enable Pages in Settings > Pages
3. CI/CD pipeline will auto-deploy
4. Access at: `https://username.gitlab.io/project-name`

## 🔄 Upgrading from v1.x

1. Backup your `/notes` folder
2. Replace all files except `/notes`
3. Run `python3 build.py` to rebuild index
4. Clear browser cache for theme updates

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x for local development (or any HTTP server)
- No internet connection required for operation

## 🤝 Credits

- **Marked.js** - Markdown parsing
- **Prism.js** - Syntax highlighting
- **js-yaml** - YAML frontmatter parsing
- Theme inspirations from VSCode, Catppuccin, Rosé Pine, and more

---

📝 **Note**: The Cobalt2 theme has been removed in this release due to maintenance considerations.

🐛 **Found a bug?** Please report issues on our GitHub repository.