# Deployment Guide for Notes Wiki v3.4.0

## Offline GitLab Pages Deployment

This release includes everything needed for complete offline hosting on GitLab Pages.

### ✅ Included for Offline Deployment

#### Core Application Files
- `index.html` - Main application entry point
- `script.js` - Complete application logic (11,376+ lines)
- `style.css` - All styles including new features (7,016+ lines)
- `build.py` - Python script to generate search index

#### Self-Contained Dependencies
- `libs/js-yaml.min.js` - YAML frontmatter parsing
- `libs/marked.min.js` - Markdown rendering  
- `libs/prism.min.js` - Syntax highlighting
- **No external CDN dependencies**

#### Theme System
- `themes/` directory with 70 complete themes
- All theme files are self-contained CSS

#### Build & Deployment
- `.gitlab-ci.yml` - Complete CI/CD configuration
- Automated search index generation
- Static file deployment
- 404.html handling for client-side routing

### 🚀 GitLab Pages Setup Instructions

1. **Fork or Import Repository**
   ```bash
   # Option 1: Fork on GitLab
   # Go to: https://github.com/Real-Fruit-Snacks/Wiki
   # Click "Fork" and import to GitLab
   
   # Option 2: Clone and push to GitLab
   git clone https://github.com/Real-Fruit-Snacks/Wiki.git
   cd Wiki
   git remote add gitlab https://gitlab.com/yourusername/wiki.git
   git push gitlab main --tags
   ```

2. **Enable GitLab Pages**
   - Go to your GitLab project
   - Navigate to Settings → Pages
   - The CI/CD pipeline will automatically build and deploy

3. **Add Your Content**
   - Place markdown files in `/notes/` directory
   - Follow the frontmatter format:
     ```yaml
     ---
     title: "Your Note Title"
     tags: ["tag1", "tag2"]
     author: "Your Name"
     created: "2025-06-17"
     description: "Brief description"
     ---
     ```

4. **Build Search Index**
   ```bash
   python3 build.py
   ```

### 📱 Features Available Offline

#### Core Functionality
- ✅ Full-text search with operators
- ✅ Tag-based filtering
- ✅ Theme switching (70 themes)
- ✅ Tab management with drag-and-drop
- ✅ Keyboard shortcuts

#### New in v3.4.0
- ✅ **Responsive Context Filtering** - Smart dropdown that adapts to screen size
- ✅ **Mobile Optimization** - Touch-friendly interface for all devices
- ✅ **Enhanced Memory Management** - Proper cleanup for all UI components
- ✅ **Professional UI/UX** - Improved visual consistency and highlighting

#### Advanced Features
- ✅ Table of Contents (toggleable)
- ✅ Reading progress tracking
- ✅ Focus mode
- ✅ Recent files tracking
- ✅ Bookmarks system
- ✅ Settings persistence

### 🔧 Technical Requirements

#### Server Requirements
- **Static file server** (no backend needed)
- **Python 3.x** (for build script only)
- **No database** required

#### Browser Support
- Chrome 66+, Firefox 63+, Edge 79+, Safari 13.1+
- Mobile responsive design
- Progressive Web App features

### 🎯 Self-Hosting Verification

To verify complete offline functionality:

1. **Check Dependencies**
   ```bash
   # No external URLs should be found
   grep -r "https://" --exclude-dir=.git . | grep -v "data:image/svg"
   ```

2. **Test Offline**
   - Disconnect from internet
   - Serve locally: `python3 -m http.server 8000`
   - Visit: `http://localhost:8000`
   - All features should work

3. **Verify Build**
   ```bash
   python3 build.py
   # Should output: "Build complete!" with statistics
   ```

### 📝 Customization

#### Adding Notes
- Create `.md` files in `/notes/` subdirectories
- Use YAML frontmatter for metadata
- Run `python3 build.py` to update search index

#### Theming
- Modify existing themes in `/themes/`
- Add custom CSS in Settings → Advanced → Custom CSS

#### Configuration
- Modify default settings in `script.js` (lines 81-100)
- Update build script `build.py` for custom processing

### 🔒 Security & Privacy

- ✅ **No external requests** after initial load
- ✅ **No analytics or tracking**
- ✅ **No user data collection**
- ✅ **Air-gap compatible**
- ✅ **GDPR compliant by design**

### 📞 Support

- **GitHub Issues**: https://github.com/Real-Fruit-Snacks/Wiki/issues
- **Documentation**: See `CLAUDE.md` for development details
- **Version**: v3.4.0 (Released 2025-06-22)

---

**Note**: This application is designed for complete offline functionality and requires no internet connection once deployed.