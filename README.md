# Notes Wiki

A self-contained static notes/wiki system with advanced features including 50 built-in themes, real-time search, and metadata support. Perfect for documentation, personal knowledge management, or team wikis.

## 🆕 Latest Updates (v2.6.1)
- **Fixed Line Number Alignment**: Line numbers now properly align with their code lines even when word wrap is enabled
- **Improved Code Display**: CSS counter-based line numbers for better performance and reliability
- **Alphabetical Sidebar**: Categories in the sidebar are now sorted alphabetically for better organization

🔗 **Live Demo**: https://real-fruit-snacks.github.io/Wiki/

## ✨ Features

### Core Features
- 📝 **Markdown Support** - Write notes in standard Markdown with YAML frontmatter
- 🔍 **Advanced Search** - Full-text search with operators (`"exact"`, `-exclude`, `tag:`, `author:`)
- 🎨 **50 Professional Themes** - Including VSCode, Catppuccin, Dracula, Material, and more
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🚀 **Zero Dependencies** - All libraries bundled locally for offline use
- 🏷️ **Tag System** - Multi-select filtering with OR/AND logic

### Enhanced Features
- 📑 **Tab Management** - Multiple tabs with drag-and-drop reordering
- ⏱️ **Pomodoro Timer** - Built-in productivity timer with customizable sessions
- 📌 **Recent Files** - Pin important files, grouped by context
- ⌨️ **Keyboard Shortcuts** - Customizable shortcuts (press `?` for cheatsheet)
- 🎯 **Context Filtering** - Filter by top-level folders
- 💾 **Persistent Settings** - All preferences saved in localStorage

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Enable GitHub Pages in Settings → Pages → Source: GitHub Actions
3. Your wiki will be available at `https://[username].github.io/[repository-name]/`

### Option 2: GitLab Pages
1. Fork this repository
2. The included `.gitlab-ci.yml` will automatically deploy to GitLab Pages
3. Your wiki will be available at `https://[username].gitlab.io/[repository-name]/`

### Option 3: Local Development
```bash
# Clone the repository
git clone https://github.com/Real-Fruit-Snacks/Wiki.git
cd Wiki

# Start a local server
python3 -m http.server 8000
# Or use any static server like nginx, apache, etc.

# Open in browser
open http://localhost:8000
```

## 📁 Project Structure

```
Wiki/
├── index.html          # Main HTML entry point
├── script.js           # Core application logic
├── style.css           # Base styles
├── build.py            # Search index generator
├── notes-index.json    # Generated search index
├── libs/               # Bundled libraries
│   ├── marked.min.js   # Markdown parser
│   ├── prism.min.js    # Syntax highlighting
│   └── js-yaml.min.js  # YAML frontmatter parser
├── themes/             # 50 theme files
└── notes/              # Your markdown notes
```

## 📝 Writing Notes

### Basic Structure
Create markdown files in the `/notes/` directory with YAML frontmatter:

```markdown
---
title: My Note Title
tags: [javascript, tutorial, web]
created: 2024-01-15
author: Your Name
description: Brief description of the note
---

# My Note Title

Your markdown content here...
```

### Code Blocks
Enhanced code blocks with special features:

````markdown
```javascript title:"Example Code" collapse:true
function hello() {
  console.log("Hello, World!");
}
```
````

Features:
- **Line Numbers** - Toggle line numbers for all code blocks with proper word-wrap alignment
- **Word Wrap** - Enable/disable word wrapping with maintained line number alignment
- **Copy Button** - Copy code with HTML entity handling
- **Syntax Highlighting** - Support for 100+ programming languages
- **Collapsible Blocks** - Use `collapse:true` to create collapsible code sections
- **Title Support** - Add titles to code blocks with `title:"Your Title"`

### Callouts
Use special blockquotes for callouts:

```markdown
> [!WARNING]
> This is a warning message

> [!TIP] Pro Tip
> This is a helpful tip with a custom title
```

Available types: WARNING, INFO, TIP, NOTE, DANGER, IMPORTANT, CAUTION, SUCCESS, QUESTION, EXAMPLE, QUOTE, BUG, TODO

## 🔧 Configuration

### Building Search Index
After adding or modifying notes, rebuild the search index:

```bash
python3 build.py
```

This generates `notes-index.json` with all note metadata and content for search.

### Customizing Themes
Themes are located in `/themes/`. Each theme is a CSS file defining color variables:

```css
:root {
  --bg-primary: #1e1e1e;
  --text-primary: #d4d4d4;
  --accent-color: #569cd6;
  /* ... more variables ... */
}
```

### Settings
Access settings with `Ctrl+,` or the gear icon:
- Theme selection with live preview
- Font size and family
- Keyboard shortcuts customization
- Pomodoro timer configuration
- Custom CSS injection
- Default home page behavior

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+T` | New tab |
| `Ctrl+K` | Search |
| `Ctrl+,` | Settings |
| `Ctrl+F` | Filter notes |
| `Ctrl+W` | Close tab |
| `Ctrl+Shift+W` | Close all tabs |
| `Ctrl+1-9` | Switch to tab |
| `?` | Show shortcuts cheatsheet |
| `Escape` | Close modals |

## 🎨 Available Themes

50 professional themes including:
- **Dark**: VSCode Dark, Dracula, Monokai, One Dark Pro, Tokyo Night
- **Light**: GitHub Light, Solarized Light, Atom One Light
- **Colorful**: Cyberpunk, Matrix, Vaporwave, Shades of Purple
- **Minimal**: Nord, Gruvbox, Everforest
- **Brand**: Catppuccin (Mocha/Latte), Rosé Pine, Material themes

## 🔍 Search Operators

- `"exact phrase"` - Search for exact phrase
- `-exclude` - Exclude terms
- `tag:javascript` - Search by tag
- `author:name` - Search by author
- Combine operators: `javascript -jquery tag:tutorial`

## 🚀 Deployment

### GitHub Pages
Already configured! Just push to main branch and GitHub Actions will deploy automatically.

### GitLab Pages
`.gitlab-ci.yml` is included for automatic GitLab Pages deployment.

### Static Hosting
Upload all files to any static hosting service (Netlify, Vercel, AWS S3, etc.).

### Docker
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

## 🛠️ Development

### Requirements
- Python 3.x (for build script only)
- Any modern web browser
- Local web server for development

### Building for Production
1. Add/modify your notes in `/notes/`
2. Run `python3 build.py` to update search index
3. Deploy all files to your hosting service

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

- Report issues: [GitHub Issues](https://github.com/Real-Fruit-Snacks/Wiki/issues)
- Live demo: [GitHub Pages](https://real-fruit-snacks.github.io/Wiki/)

---

Built with ❤️ for the documentation community