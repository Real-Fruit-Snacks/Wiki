<div align="center">

# 📚 Wiki - Modern Knowledge Management System

<p align="center">
  <strong>Transform your documentation with a blazing-fast, offline-first wiki system featuring 50+ themes and enterprise-grade search capabilities</strong>
</p>

<p align="center">
  <a href="https://real-fruit-snacks.github.io/Wiki/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-3.1.0-green?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Themes-50+-purple?style=flat-square" alt="Themes">
  <img src="https://img.shields.io/badge/Dependencies-Zero-orange?style=flat-square" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/Offline-Ready-red?style=flat-square" alt="Offline Ready">
</p>

</div>

---

## 🎯 Why Wiki?

**Wiki** is not just another documentation tool – it's a complete knowledge management solution designed for modern teams and individuals who value **speed**, **privacy**, and **flexibility**.

### 🚀 Key Benefits

- **⚡ Lightning Fast**: Pure JavaScript with zero server dependencies means instant page loads
- **🔒 Privacy First**: Your data never leaves your device - perfect for sensitive documentation
- **🎨 Beautiful by Default**: 50+ professional themes including VSCode, Dracula, and Catppuccin
- **📱 Works Everywhere**: Desktop, tablet, mobile - even offline or in air-gapped environments
- **🔍 Enterprise Search**: Advanced operators, full-text search, and code-aware indexing
- **🛠️ Zero Configuration**: Deploy in minutes with GitHub/GitLab Pages or any static host

---

## ✨ Features That Set Us Apart

<table>
<tr>
<td width="50%">

### 🎯 Smart Organization
- **Multi-tab Interface** - Work on multiple documents simultaneously
- **Drag & Drop Tabs** - Organize your workspace effortlessly  
- **Split View Mode** - Compare documents side-by-side
- **Responsive Context Filtering** - Smart dropdown adapts to screen size
- **Smart Folders** - Expand/collapse with one click
- **Focus Mode** - Distraction-free reading with wide content display

</td>
<td width="50%">

### 🔍 Powerful Search
- **Full-Text Indexing** - Search content, not just titles
- **Code-Aware Search** - Find snippets across all languages
- **Advanced Operators** - `tag:`, `author:`, exact phrases, exclusions
- **In-Note Search** - Ctrl+F to search within current document
- **Real-Time Results** - Instant search as you type
- **Tag-Based Filtering** - Organize and filter by tags

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Customization
- **50+ Professional Themes** - From minimal to vibrant
- **Custom CSS Support** - Make it truly yours
- **Flexible Layouts** - Narrow, wide, or custom widths
- **Font Controls** - Size, family, and line spacing

</td>
<td width="50%">

### 💡 Productivity Tools
- **Pomodoro Timer** - Built-in focus sessions
- **Keyboard Shortcuts** - Fully customizable
- **Recent Files & Bookmarks** - Pin and access favorites quickly
- **Reading Progress** - Track your position and estimated time
- **Table of Contents** - Auto-generated navigation
- **Sticky Notes** - Quick notes overlay
- **Wiki Links** - `[[Link]]` style internal navigation
- **Persistent State** - Pick up where you left off

</td>
</tr>
</table>

---

## 🚀 Get Started in 60 Seconds

### Option 1: GitHub Pages (Recommended)

```bash
# 1. Fork this repository
# 2. Go to Settings → Pages → Source: GitHub Actions
# 3. Your wiki is live at: https://[username].github.io/Wiki/
```

### Option 2: GitLab Pages (Self-Hosted)

Perfect for private GitLab instances:

```bash
# 1. Clone or download this repository
git clone https://github.com/Real-Fruit-Snacks/Wiki.git
cd Wiki

# 2. Build the search index
python3 build.py

# 3. Push to your GitLab instance
git remote set-url origin https://your-gitlab.com/username/wiki.git
git push -u origin main

# 4. Enable GitLab Pages in your project settings
# Your wiki is now available at: https://username.your-gitlab.com/wiki/
```

### Option 3: Local Development

```bash
# Clone and run
git clone https://github.com/Real-Fruit-Snacks/Wiki.git
cd Wiki
python3 -m http.server 8000

# Open http://localhost:8000
```

### Option 4: Download & Go

1. [Download Latest Release](https://github.com/Real-Fruit-Snacks/Wiki/releases)
2. Extract anywhere
3. Open `index.html`
4. Start documenting!

---

## 🔒 Self-Contained Deployment Guide

This wiki is designed to work completely offline without external dependencies. Everything you need is included in this repository.

### 📦 What's Included for Self-Contained Operation

- **Zero External Dependencies**: All JavaScript libraries are bundled in `/libs/`
- **Complete Theme Collection**: 50+ themes in `/themes/` directory
- **Self-Contained Assets**: All icons, fonts, and resources are embedded
- **Local Search**: Full-text search index generated locally
- **GitLab CI/CD Ready**: `.gitlab-ci.yml` included for automated deployment

### 🚀 Complete Setup for GitLab Pages

#### Step 1: Prepare Your Environment

```bash
# Required: Python 3.6+ (for building search index)
python3 --version

# Optional: Git (for version control)
git --version
```

#### Step 2: Deploy to Private GitLab

```bash
# Download and extract the latest release
wget https://github.com/Real-Fruit-Snacks/Wiki/archive/refs/heads/main.zip
unzip main.zip
cd Wiki-main

# Build the search index from your notes
python3 build.py

# Initialize git repository (if not cloning)
git init
git add .
git commit -m "Initial wiki deployment"

# Push to your private GitLab instance
git remote add origin https://your-gitlab.domain.com/your-group/wiki.git
git push -u origin main
```

#### Step 3: Configure GitLab Pages

1. **Navigate to Project Settings** → **Pages**
2. **Set Source Branch**: `main` 
3. **Set Source Directory**: `/` (root directory)
4. **Enable Pages**: Your wiki will be available at `https://your-group.your-gitlab.domain.com/wiki/`

#### Step 4: Customize for Your Environment

```bash
# Add your content to /notes/ directory
mkdir -p notes/your-topic
echo "---
title: Your First Note
tags: [example]
---
# Welcome to Your Wiki" > notes/your-topic/example.md

# Rebuild search index after adding content
python3 build.py

# Commit and push changes
git add .
git commit -m "Add custom content"
git push
```

### 🔧 Self-Contained Environment Considerations

#### File Verification
```bash
# Verify all dependencies are present
ls libs/           # Should contain: js-yaml.min.js, marked.min.js, prism.min.js
ls themes/         # Should contain 50+ CSS theme files
ls -la index.html  # Main application file
```

#### Manual Deployment (No Git)
1. Copy the entire directory to your web server
2. Ensure Python is available for building search index
3. Run `python3 build.py` whenever you add/modify notes
4. Serve the directory with any web server

#### Security Notes
- **No Network Requests**: Application never contacts external servers
- **No Analytics**: Zero tracking or telemetry
- **Local Storage Only**: All data stored in browser's localStorage
- **Content Security**: All included libraries are minified and verified

### 📁 Directory Structure for Deployment

```
wiki/
├── index.html              # Main application
├── style.css              # Base styles
├── script.js              # Application logic
├── 404.html               # Custom error page
├── _config.yml            # Jekyll bypass config
├── .gitlab-ci.yml         # GitLab CI/CD pipeline
├── build.py               # Search index builder
├── libs/                  # JavaScript dependencies
│   ├── js-yaml.min.js
│   ├── marked.min.js
│   └── prism.min.js
├── themes/                # 50+ CSS themes
│   ├── tokyo-night.css
│   ├── dracula.css
│   └── [48 more themes]
├── notes/                 # Your content
│   ├── index.md
│   └── [your directories]
└── images/               # Assets
    ├── reference/
    └── tutorials/
```

### 🛠️ Maintenance Commands

```bash
# Rebuild search index (run after content changes)
python3 build.py

# Validate JavaScript syntax
node -c script.js

# Test locally
python3 -m http.server 8000

# Create deployment package
zip -r wiki-deployment.zip . -x "*.git*" "node_modules/*" "*.log"
```

### ⚠️ Troubleshooting

**Search Not Working?**
- Ensure `notes-index.json` exists and is up to date
- Run `python3 build.py` to regenerate

**Themes Not Loading?**
- Verify all CSS files exist in `/themes/` directory
- Check browser console for 404 errors

**GitLab Pages Not Updating?**
- Check CI/CD pipeline status in GitLab
- Ensure `.gitlab-ci.yml` is in repository root
- Verify GitLab Pages is enabled in project settings

---

## 📖 How It Works

Wiki uses a simple yet powerful architecture:

```
Your Notes (Markdown) → Build Script (Python) → Search Index → Beautiful Wiki
```

1. **Write** markdown files with YAML frontmatter
2. **Build** the search index with `python3 build.py`
3. **Deploy** anywhere - GitHub Pages, GitLab, Netlify, or locally
4. **Access** your knowledge base from any device

---

## 💻 Writing Content

### Basic Note Structure

```markdown
---
title: API Documentation
tags: [api, reference, backend]
author: John Doe
created: 2024-01-15
updated: 2024-01-20
description: Complete API reference guide
combineCodeBlocks: true
---

# API Documentation

Your content here with **full markdown support**...
```

**Frontmatter Options:**
- `combineCodeBlocks: true` - Automatically combine all code blocks at the end
- `combinedBlockLanguage: javascript` - Set language for combined block
- `combinedBlockTitle: "Complete Code"` - Custom title for combined block

### Advanced Features

<details>
<summary><strong>📝 Enhanced Code Blocks</strong></summary>

```markdown
```javascript title:"API Example" collapse:true
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}
```
```

Features line numbers, syntax highlighting, collapsible sections, and copy buttons.
</details>

<details>
<summary><strong>💬 Callout Blocks</strong></summary>

```markdown
> [!TIP] Pro Tip
> Use callouts to highlight important information

> [!WARNING]
> Critical warnings stand out visually
```

14 different callout types available: TIP, WARNING, INFO, NOTE, DANGER, SUCCESS, and more.
</details>

<details>
<summary><strong>🔍 Search Like a Pro</strong></summary>

- `"exact phrase"` - Find exact matches
- `javascript -jquery` - Include/exclude terms
- `tag:tutorial author:john` - Filter by metadata
- `term1 term2` - Multiple terms (AND logic)
</details>

---

## 🎨 Stunning Themes

Choose from 50+ professionally crafted themes:

| Dark Themes | Light Themes | Special Themes |
|------------|--------------|----------------|
| Ayu Mirage (Default) | GitHub Light | Matrix (Terminal Green) |
| VSCode Dark+ | Solarized Light | Cyberpunk 2077 |
| Dracula | Atom One Light | Vaporwave |
| Tokyo Night | Catppuccin Latte | Hot Dog Stand |
| One Dark Pro | Winter is Coming Light | ProtonMail |

---

## ⚙️ Configuration & Customization

### Global Settings (Ctrl+,)
- Theme selection with live preview
- Font size, family, and line height
- Custom CSS injection
- Keyboard shortcut customization
- Default homepage behavior
- External link handling

### Build Configuration
```bash
# Rebuild search index after adding notes
python3 build.py

# Output shows indexed content
✅ Build complete!
📊 Stats:
   - Total notes: 127
   - Total tags: 45
   - Total authors: 3
```

---

## 🌟 Use Cases

<table>
<tr>
<td align="center" width="33%">

### 📚 Personal Knowledge Base
Perfect for notes, journals, and learning resources

</td>
<td align="center" width="33%">

### 👥 Team Documentation
Collaborate on docs without complex infrastructure

</td>
<td align="center" width="33%">

### 🔒 Secure Documentation
Air-gapped environments and sensitive data

</td>
</tr>
<tr>
<td align="center" width="33%">

### 📖 Technical Writing
API docs, tutorials, and code examples

</td>
<td align="center" width="33%">

### 🎓 Educational Content
Course materials and interactive learning

</td>
<td align="center" width="33%">

### 💼 Project Management
Meeting notes, specs, and planning docs

</td>
</tr>
</table>

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 Make your changes
4. ✅ Test thoroughly
5. 📤 Submit a Pull Request

See our [Contributing Guide](CONTRIBUTING.md) for details.

---

## 📊 Project Stats

- **🚀 Zero Runtime Dependencies** - Everything is bundled
- **📦 ~44MB Total Package** - Including all themes, libraries, and documentation
- **🎨 50+ Professional Themes** - Carefully curated collection
- **📝 8,800+ Lines of Code** - Comprehensive single-page application
- **⚡ < 100ms Load Time** - Measured on average hardware
- **🌍 100% Offline Capable** - No internet required after initial load
- **📱 Mobile Responsive** - Touch-optimized interface
- **🛡️ Privacy-First** - No tracking, no external requests

---

## 🛡️ Security & Privacy

- **No Tracking** - Zero analytics or telemetry
- **No External Requests** - All resources are local
- **No Database** - Simple file-based structure
- **No Login Required** - Your data stays yours
- **Client-Side Only** - No server processing

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

## 🙏 Acknowledgments

Built with ❤️ using:
- [Marked.js](https://marked.js.org/) for Markdown parsing
- [Prism.js](https://prismjs.com/) for syntax highlighting  
- [js-yaml](https://github.com/nodeca/js-yaml) for frontmatter parsing

<br>

**[⬆ Back to Top](#-wiki---modern-knowledge-management-system)**

<br>

<p align="center">
  <a href="https://github.com/Real-Fruit-Snacks/Wiki/issues">Report Bug</a>
  ·
  <a href="https://github.com/Real-Fruit-Snacks/Wiki/issues">Request Feature</a>
  ·
  <a href="https://real-fruit-snacks.github.io/Wiki/">Live Demo</a>
</p>

</div>