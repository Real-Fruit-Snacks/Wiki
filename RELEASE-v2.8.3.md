# Notes Wiki v2.8.3 Release Notes

**Release Date:** June 14, 2025  
**Compatibility:** All modern browsers, GitHub Pages, GitLab Pages, Static hosting

## 🎯 What's New in v2.8.3

### ✨ Enhanced Folder Controls UI
- **Seamless Visual Integration**: Folder expand/collapse buttons now form one cohesive control group with Filter by Tags
- **Perfect Alignment**: Buttons match the exact height of Filter by Tags for smooth visual flow
- **Connected Design**: Removed visual gaps between buttons with connected borders
- **Improved Accessibility**: Larger buttons (40px × full height) with 16px icons for better visibility

### 🎨 UI Improvements  
- **Unified Button Group**: Filter by Tags and folder controls appear as one seamless element
- **Smart Border Radius**: Left side rounded on Filter by Tags, right side rounded on folder controls
- **Consistent Styling**: Same background colors, borders, and hover effects across all buttons
- **Professional Appearance**: Clean, modern design that enhances the sidebar experience

### 🔧 Technical Enhancements
- **CSS Optimization**: Improved layout with flexbox for perfect alignment
- **Hover State Refinements**: Enhanced border transitions on hover for visual continuity
- **Responsive Design**: Buttons scale properly across different screen sizes
- **Performance**: Optimized CSS for smooth transitions and interactions

## 📦 Complete Offline Package

This release includes everything needed for **fully offline operation**:

### Core Application Files
- `index.html` - Main application entry point
- `script.js` - Complete application logic with folder management
- `style.css` - Enhanced styles with improved button designs
- `notes-index.json` - Search index for all demo content
- `build.py` - Python script to rebuild search index

### Bundled Libraries (No CDN Dependencies)
- `libs/marked.min.js` - Markdown parser (v4.3.0)
- `libs/prism.min.js` - Syntax highlighting (v1.29.0) 
- `libs/js-yaml.min.js` - YAML frontmatter parser (v4.1.0)

### Complete Theme Collection (50 Themes)
- **Default**: Ayu Mirage - Modern, elegant dark theme
- **Dark Themes**: VSCode Dark Plus, Dracula, One Dark Pro, Tokyo Night
- **Light Themes**: GitHub Light, Atom One Light, Solarized Light, Ayu Light
- **Colorful Themes**: Cyberpunk, Matrix, Vaporwave, Shades of Purple
- **Minimal Themes**: Nord, Gruvbox, Everforest
- All themes work offline with CSS custom properties

### Demo Content & Documentation
- Welcome page with getting started guide
- Comprehensive feature demonstrations
- Keyboard shortcuts reference
- Theme showcase with all 50 themes
- Code block examples with syntax highlighting
- Search functionality demos
- Tab management guide

### Deployment Configurations
- `.gitlab-ci.yml` - GitLab Pages automatic deployment
- `.github/workflows/static.yml` - GitHub Pages deployment  
- `_config.yml` - Jekyll/GitHub Pages configuration
- `.gitignore` - Properly configured exclusions

## 🚀 Deployment Options

### Option 1: GitLab Pages (Zero Configuration)
```yaml
# .gitlab-ci.yml included - just push to GitLab!
1. Import to GitLab: Create new project from this repo
2. GitLab CI automatically builds and deploys
3. Access at: https://[username].gitlab.io/[repo-name]/
```

The included `.gitlab-ci.yml` file:
- Builds the search index automatically
- Copies all files to public directory
- Creates 404.html for client-side routing
- Deploys to GitLab Pages on every push

### Option 2: GitHub Pages
1. Fork this repository
2. Enable Pages: Settings → Pages → GitHub Actions
3. Automatic deployment via included workflow

### Option 3: Fully Offline Usage
```bash
# Download the release
wget https://github.com/Real-Fruit-Snacks/Wiki/archive/refs/tags/v2.8.3.zip
unzip v2.8.3.zip
cd Wiki-2.8.3

# Open directly in browser
open index.html

# Or serve locally
python3 -m http.server 8000
```

### Option 4: Static Hosting
Upload all files to any static hosting service:
- Netlify (drag & drop deployment)
- Vercel (git-based deployment)
- AWS S3 (static website hosting)
- Any web server (Apache, Nginx, etc.)

## 🎯 Key Features

### Core Features
- ✅ **Markdown Support** with YAML frontmatter
- ✅ **Advanced Search** with operators and real-time results
- ✅ **50 Professional Themes** with live preview
- ✅ **Fully Responsive** design for all devices
- ✅ **Zero Dependencies** - works completely offline
- ✅ **Alphabetical Sidebar** with smart sorting by display names

### Enhanced Features  
- ✅ **Folder Management** - Expand/collapse all with one click
- ✅ **Tab Management** - Multiple tabs with drag-and-drop
- ✅ **Pomodoro Timer** - Built-in productivity timer
- ✅ **Recent Files** - Pin important files with context grouping
- ✅ **Keyboard Shortcuts** - Comprehensive shortcuts (press `?`)
- ✅ **Context Filtering** - Filter by top-level folders
- ✅ **Persistent Settings** - All preferences saved locally

### Code Features
- ✅ **Syntax Highlighting** - 100+ programming languages
- ✅ **Line Numbers** - With proper word-wrap alignment  
- ✅ **Copy to Clipboard** - One-click code copying
- ✅ **Collapsible Code Blocks** - Save space with large code
- ✅ **Word Wrap Toggle** - Maintained line number alignment

## 📋 What's Included

```
notes-wiki-v2.8.3/
├── index.html              # Main application
├── script.js               # Core functionality  
├── style.css               # Styles with v2.8.3 improvements
├── build.py                # Search index builder
├── notes-index.json        # Pre-built search index
├── .gitlab-ci.yml          # GitLab Pages config
├── .github/workflows/      # GitHub Actions config
├── README.md               # Setup guide
├── libs/                   # Bundled libraries
│   ├── marked.min.js       
│   ├── prism.min.js        
│   └── js-yaml.min.js      
├── themes/                 # 50 theme files
│   ├── ayu-mirage.css      # Default theme
│   ├── dracula.css         
│   ├── tokyo-night.css     
│   └── ... (47 more)       
├── notes/                  # Demo content
│   ├── index.md            
│   ├── *.md                # Feature demos
│   └── */                  # Organized categories
└── images/                 # Demo images
```

## 🔄 Migration from Previous Versions

### From v2.8.x
- **Seamless Upgrade**: Just replace files, settings preserved
- **Visual Changes**: Folder controls have new connected design
- **No Breaking Changes**: All existing notes work unchanged

### From Earlier Versions  
- **Theme Update**: Ayu Mirage is now default (changeable in settings)
- **New Features**: Enjoy folder management and improved sorting
- **Search Index**: Run `python3 build.py` after adding notes

## 🐛 Bug Fixes & Improvements

- **Enhanced**: Folder control buttons now visually connected to Filter by Tags
- **Improved**: Button alignment and sizing for better accessibility
- **Fixed**: Hover states maintain visual continuity across button group
- **Optimized**: CSS structure for cleaner, more maintainable code

## 🌟 Why This Release

### Complete Offline Solution
- **No Internet Required**: All dependencies bundled
- **No CDN Calls**: Everything loads locally
- **Portable**: Run from USB, local drive, or network share
- **Private**: Your notes never leave your device

### GitLab Pages Ready
- **Zero Configuration**: Push and it deploys
- **CI/CD Included**: Automatic builds on every commit
- **Professional URL**: Your own GitLab Pages domain
- **Free Hosting**: No costs for public or private repos

### Production Ready
- **Battle Tested**: Refined through multiple iterations
- **Cross Browser**: Works on Chrome, Firefox, Safari, Edge
- **Performance**: Optimized for large note collections
- **Maintainable**: Clean code structure with documentation

## 📞 Support & Resources

- **Live Demo**: https://real-fruit-snacks.github.io/Wiki/
- **Repository**: https://github.com/Real-Fruit-Snacks/Wiki
- **Issues**: https://github.com/Real-Fruit-Snacks/Wiki/issues
- **Documentation**: Included in `/notes/` directory

## 🚀 Quick Start Commands

```bash
# Clone and run locally
git clone https://github.com/Real-Fruit-Snacks/Wiki.git
cd Wiki
python3 -m http.server 8000
# Open http://localhost:8000

# Add your notes
cp your-notes.md notes/
python3 build.py
# Refresh browser

# Deploy to GitLab
git remote add gitlab git@gitlab.com:username/wiki.git
git push gitlab main
# Auto-deploys via CI/CD
```

## 📄 License

MIT License - Free for personal and commercial use

---

**Download v2.8.3 now** for the best offline wiki experience with enhanced folder management UI! 

*Built with ❤️ for the documentation community*