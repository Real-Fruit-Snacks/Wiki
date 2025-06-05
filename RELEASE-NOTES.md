# Notes Wiki v1.0.0 - Release Notes

🎉 **Initial Release** - December 2024

## 📦 Download

**Offline Package**: `notes-wiki-v1.0.0.tar.gz` (154 KB)

- Complete standalone application
- No internet connection required
- All features included
- 17 sample notes with rich content

## ✨ Features

### 🎨 **Theme System**
- **16 VSCode-inspired themes** with live preview
- **Auto theme detection** based on system preferences  
- **Theme categories**: Light, Dark, Retro, Modern, and Fun
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
- **Code block features**: line numbers, word wrap, copy buttons
- **Content width**: narrow, normal, wide, or full-width layouts
- **Responsive design** optimized for all screen sizes
- **Offline-first**: all assets bundled locally

### 🚀 **Deployment Ready**
- **GitLab Pages** CI/CD pipeline included
- **Static hosting** compatible (Netlify, Vercel, GitHub Pages)
- **Docker support** via simple HTTP server
- **Local development** with Python/Node.js/PHP servers

## 📊 **Statistics**

- **Languages**: JavaScript, CSS, Python, Markdown
- **Total files**: 44 (application + content)
- **Themes**: 16 complete theme files
- **Sample content**: 17 notes across 5 contexts
- **Dependencies**: 3 minified JS libraries (all local)
- **Size**: 154 KB compressed, ~500 KB extracted

## 🎯 **Use Cases**

- **Personal knowledge base** for notes and learning
- **Team documentation** with advanced organization
- **Project documentation** with syntax highlighting  
- **Blog/portfolio** as a static site generator
- **Educational content** with rich formatting

## 🔧 **Technical Details**

### **Frontend Stack**
- Vanilla JavaScript (no framework dependencies)
- CSS custom properties for theming
- marked.js v15+ for Markdown parsing
- Prism.js for syntax highlighting
- js-yaml for frontmatter parsing

### **Architecture**
- Client-side routing with hash navigation
- Local storage for settings and preferences
- Dynamic search index generation
- Modular CSS with theme inheritance

### **Browser Support**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used (async/await, modules)
- CSS Grid and Flexbox for layouts
- Responsive design with mobile support

## 📋 **Installation**

### **Quick Start**
1. Extract `notes-wiki-v1.0.0.tar.gz`
2. Run: `python3 -m http.server 8000`
3. Open: http://localhost:8000

### **Requirements**
- Web browser (Chrome/Firefox/Safari/Edge)
- Local HTTP server (Python/Node.js/PHP/Ruby)
- No database or complex setup required

## 🔮 **Future Roadmap**

- **Plugin system** for custom extensions
- **Export functionality** (PDF, HTML, etc.)
- **Advanced search** with regex and filters
- **Theme editor** with visual customization
- **Collaboration features** for team usage

## 🤝 **Contributing**

- Fork the repository on GitHub
- Review the `CLAUDE.md` file for development context
- Submit pull requests with clear descriptions
- Test across all 16 themes before submitting

## 📄 **License**

MIT License - Free for personal and commercial use.

---

**Thank you for using Notes Wiki! 🚀**

*Built with ❤️ for knowledge workers who value simplicity and functionality.*