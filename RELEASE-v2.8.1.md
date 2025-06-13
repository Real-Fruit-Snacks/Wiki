# Notes Wiki v2.8.1 Release Notes

**Release Date:** December 13, 2025  
**Compatibility:** All modern browsers, GitHub Pages, GitLab Pages, Static hosting

## 🎯 What's New

### ✅ Fixed Alphabetical Sorting
- **Sidebar Organization**: Files now appear in true alphabetical order based on their display names
- **Smart Sorting**: Uses note titles (metadata.title) instead of filenames for sorting
- **Consistent Experience**: Categories and files both sorted alphabetically for better navigation

### 🎨 Enhanced Default Experience  
- **Ayu Mirage Theme**: Beautiful new default theme with modern design
- **Professional Appearance**: Better visual appeal out-of-the-box
- **50 Theme Collection**: Complete theme library including Ayu family (Dark, Light, Mirage)

### 🧹 Improved Reliability
- **Clean Codebase**: Removed test artifacts and development files
- **Better Gitignore**: Enhanced exclusion patterns for cleaner repositories
- **Updated Documentation**: Comprehensive guides and current feature documentation

## 📦 Complete Offline Package

This release includes everything needed for **fully offline operation**:

### Core Application Files
- `index.html` - Main application entry point
- `script.js` - Complete application logic with all features
- `style.css` - Base styles and responsive design
- `notes-index.json` - Search index for all demo content

### Bundled Libraries (No CDN Dependencies)
- `libs/marked.min.js` - Markdown parser (v4.3.0)
- `libs/prism.min.js` - Syntax highlighting (v1.29.0) 
- `libs/js-yaml.min.js` - YAML frontmatter parser (v4.1.0)

### Complete Theme Collection (50 Themes)
- **Dark Themes**: VSCode Dark Plus, Dracula, One Dark Pro, Tokyo Night, **Ayu Mirage (Default)**
- **Light Themes**: GitHub Light, Atom One Light, Solarized Light, Ayu Light
- **Colorful Themes**: Cyberpunk, Matrix, Vaporwave, Shades of Purple
- **Minimal Themes**: Nord, Gruvbox, Everforest, Ayu Dark
- **Brand Themes**: Catppuccin (Mocha/Latte), Rosé Pine, Material variants

### Demo Content & Documentation
- **Comprehensive Guides**: Keyboard shortcuts, search features, tab management
- **Feature Demos**: Code blocks, themes, settings, Pomodoro timer
- **Example Notes**: Personal, technical, project, and reference categories
- **Getting Started**: Complete onboarding content

### Deployment Configurations
- `.gitlab-ci.yml` - GitLab Pages automatic deployment
- `.github/workflows/` - GitHub Pages deployment workflow
- `_config.yml` - Jekyll/GitHub Pages configuration

## 🚀 Deployment Options

### Option 1: GitLab Pages (Zero Configuration)
1. **Import to GitLab**: Create new project from this repository
2. **Automatic Build**: GitLab CI automatically deploys on push to main
3. **Live in Minutes**: Access at `https://[username].gitlab.io/[repo-name]/`

**Perfect for:**
- Team wikis and documentation
- Corporate environments
- Automatic CI/CD workflows

### Option 2: GitHub Pages
1. **Fork Repository**: Fork this repo to your GitHub account  
2. **Enable Pages**: Settings → Pages → GitHub Actions
3. **Automatic Deployment**: Pushes to main trigger automatic builds

### Option 3: Fully Offline Usage
1. **Download Release**: Get the complete zip package
2. **Extract Anywhere**: No installation or setup required
3. **Open index.html**: Works in any modern browser
4. **No Internet Required**: All dependencies bundled locally

**Perfect for:**
- Air-gapped environments  
- Offline documentation
- Portable knowledge bases
- Development environments

### Option 4: Static Hosting
Upload all files to any static hosting service:
- **Netlify**: Drag & drop deployment
- **Vercel**: Git-based deployment  
- **AWS S3**: Static website hosting
- **Your own server**: Apache, Nginx, etc.

## 🔧 Technical Improvements

### Performance Enhancements
- **Optimized Search**: Efficient indexing and query processing
- **Fast Theme Switching**: Instant theme changes with CSS custom properties
- **Responsive Design**: Smooth experience across all device sizes
- **Local Storage**: Persistent settings and recent files

### Developer Experience
- **Clean Architecture**: Well-organized codebase with clear separation of concerns
- **Comprehensive Documentation**: Detailed setup and customization guides
- **Extensible Theming**: Easy theme creation with CSS custom properties
- **Build System**: Python-based index generation for search functionality

## 📝 Usage Instructions

### Quick Start (Offline)
```bash
# Download and extract the release
wget https://github.com/Real-Fruit-Snacks/Wiki/releases/latest/download/notes-wiki-v2.8.1.zip
unzip notes-wiki-v2.8.1.zip
cd notes-wiki-v2.8.1

# Open in browser
open index.html
# or
python3 -m http.server 8000
```

### GitLab Pages Setup
1. Create new GitLab project
2. Import from GitHub: `https://github.com/Real-Fruit-Snacks/Wiki.git`
3. GitLab CI automatically deploys from `.gitlab-ci.yml`
4. Access your wiki at the Pages URL

### Adding Your Content
1. **Add Notes**: Place markdown files in `/notes/` directory
2. **Update Index**: Run `python3 build.py` to rebuild search index
3. **Organize Structure**: Use folders for categorization
4. **YAML Frontmatter**: Add metadata for enhanced search and organization

```markdown
---
title: My Note
tags: [tutorial, javascript]
author: Your Name
created: 2025-12-13
description: Brief description
---

# My Note Content
```

## 🎯 Key Features Summary

### Core Features
- ✅ **Markdown Support** with YAML frontmatter
- ✅ **Advanced Search** with operators and tag filtering  
- ✅ **50 Professional Themes** with live preview
- ✅ **Fully Responsive** design for all devices
- ✅ **Zero Dependencies** - works completely offline
- ✅ **Alphabetical Sidebar** with smart sorting

### Enhanced Features  
- ✅ **Tab Management** with drag-and-drop reordering
- ✅ **Pomodoro Timer** for productivity
- ✅ **Recent Files** with pinning and context grouping
- ✅ **Keyboard Shortcuts** (customizable, press `?` for help)
- ✅ **Settings Panel** with comprehensive customization
- ✅ **Context Filtering** by top-level folders

### Code Features
- ✅ **Syntax Highlighting** for 100+ programming languages
- ✅ **Line Numbers** with proper word-wrap alignment  
- ✅ **Copy to Clipboard** functionality
- ✅ **Collapsible Code Blocks** 
- ✅ **Word Wrap Toggle** with maintained line alignment

## 🔄 Migration from Previous Versions

### From v2.7.x
- **Automatic**: No changes needed, themes and settings preserved
- **New Features**: Enjoy improved alphabetical sorting and Ayu Mirage default

### From v2.6.x and Earlier  
- **Settings Reset**: Theme preference may reset to new Ayu Mirage default
- **Content Compatible**: All existing notes and structure work unchanged
- **Search Index**: Run `python3 build.py` to rebuild for optimal search

## 🐛 Bug Fixes

- **Fixed**: Sidebar alphabetical sorting now uses display names instead of filenames
- **Fixed**: Line numbers properly align with word-wrapped code lines
- **Improved**: Theme switching performance and reliability
- **Enhanced**: Mobile responsiveness across all themes

## 🎁 What's Included

### Essential Files
```
notes-wiki-v2.8.1/
├── index.html              # Main application 
├── script.js               # Core functionality
├── style.css               # Base styles
├── build.py                # Search index builder
├── notes-index.json        # Demo content search index
├── .gitlab-ci.yml          # GitLab Pages deployment
├── .github/workflows/      # GitHub Actions deployment
├── README.md               # Setup and usage guide
└── RELEASE-v2.8.1.md       # This release notes file
```

### Libraries Directory
```
libs/
├── marked.min.js           # Markdown parsing
├── prism.min.js           # Syntax highlighting  
└── js-yaml.min.js         # YAML frontmatter parsing
```

### Themes Directory (50 Themes)
```
themes/
├── ayu-mirage.css         # Default theme
├── ayu-dark.css           # Ayu family
├── ayu-light.css          
├── dracula.css            # Popular themes
├── tokyo-night.css
├── vscode-dark-plus.css
├── github-light.css
├── material-ocean.css
├── catppuccin-mocha.css
├── nord.css
└── ... (40 more themes)
```

### Demo Content
```
notes/
├── index.md                    # Welcome page
├── keyboard-shortcuts-demo.md  # Shortcuts guide
├── search-features-demo.md     # Search tutorial
├── tab-management-demo.md      # Tab features
├── theme-showcase.md           # All 50 themes
├── personal/                   # Example personal notes
├── technical/                  # Technical documentation
├── projects/                   # Project notes
├── reference/                  # Reference materials
└── tutorials/                  # Learning content
```

## 🏆 Perfect For

### Documentation Teams
- **Internal wikis** with no external dependencies
- **Team knowledge bases** with collaborative features
- **API documentation** with beautiful code highlighting
- **Process documentation** with search and organization

### Personal Use
- **Digital notebooks** with powerful search
- **Learning journals** with progress tracking  
- **Code snippets** with syntax highlighting
- **Research collections** with tagging and filtering

### Development Projects
- **Project documentation** alongside code
- **Technical specifications** with live examples
- **Code documentation** with embedded examples
- **Team onboarding** materials

## 🌟 Why Choose This Release

### ✅ Battle-Tested
- **Mature codebase** with comprehensive error handling
- **Cross-browser compatibility** tested on all major browsers
- **Mobile-optimized** responsive design
- **Performance optimized** for large note collections

### ✅ Complete Package  
- **No external dependencies** - works anywhere
- **All themes included** - 50 professional options
- **Demo content included** - ready to explore features
- **Documentation included** - comprehensive guides

### ✅ Future-Proof
- **Standard technologies** - HTML, CSS, JavaScript
- **No framework dependencies** - won't break with updates
- **Extensible architecture** - easy to customize and enhance
- **Active maintenance** - regular updates and improvements

## 📞 Support & Resources

- **Live Demo**: https://real-fruit-snacks.github.io/Wiki/
- **Source Code**: https://github.com/Real-Fruit-Snacks/Wiki
- **Issues & Support**: https://github.com/Real-Fruit-Snacks/Wiki/issues
- **Documentation**: Complete guides included in download

## 📄 License

MIT License - Free for personal and commercial use

---

**Download Now**: Get the complete v2.8.1 package and start building your knowledge base today! 🚀

*Built with ❤️ for the documentation community*