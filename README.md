# Notes Wiki

A modern, self-contained static notes and documentation system designed for GitLab Pages with advanced features including 16 built-in themes, real-time search, metadata parsing, and complete offline functionality.

![Wiki Screenshot](https://img.shields.io/badge/Status-Ready-green) ![No Dependencies](https://img.shields.io/badge/Dependencies-None-blue) ![Themes](https://img.shields.io/badge/Themes-16-purple)

## 🌟 Features

### 📝 **Rich Content Support**
- **Markdown Rendering**: Full GitHub-flavored markdown support with marked.js
- **Syntax Highlighting**: Code blocks with Prism.js for 150+ languages
- **Callouts**: 13 different callout types (Warning, Info, Tip, Note, etc.)
- **YAML Frontmatter**: Metadata support for tags, authors, categories, and more

### 🎨 **Theme System**
- **16 VSCode-Inspired Themes**: Light, Dark, Monokai, Dracula, GitHub, and more
- **Auto Theme Detection**: Automatically switch based on system preferences
- **Preview Mode**: Test themes before saving
- **Consistent Styling**: All themes support both UI and syntax highlighting

### 🔍 **Advanced Search**
- **Real-time Search**: Instant fuzzy search across all content
- **Multi-field Search**: Search titles, content, tags, and authors
- **Tag Filtering**: Filter notes by multiple tags with OR logic
- **Sticky Search**: Optionally preserve search queries between sessions

### 🗂️ **Smart Organization**
- **Context Folders**: Organize notes into logical groups (Personal, Technical, Projects, etc.)
- **Dynamic Navigation**: Collapsible file tree with context filtering
- **Recent Files**: Track and quickly access recently viewed notes
- **Cross-linking**: Support for internal note links and heading anchors

### ⚙️ **Customization**
- **Code Block Features**: Line numbers, word wrap, copy buttons, collapse functionality
- **Content Width**: Choose between narrow, normal, wide, or full-width layouts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Offline First**: All assets bundled locally - no external dependencies

## 🚀 Quick Start

### Option 1: Use with Python (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/notes-wiki.git
cd notes-wiki

# Start the development server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Option 2: GitLab Pages (Automated Deployment)
1. Push repository to GitLab
2. Enable GitLab Pages in project settings
3. The `.gitlab-ci.yml` will automatically build and deploy
4. Site will be available at `https://username.gitlab.io/repository-name`

### Option 3: Static File Hosting
Simply upload all files to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

### Option 4: Direct File Access (Limited)
You can open `index.html` directly in your browser, but **core features will be disabled** due to CORS restrictions:

❌ **Disabled Features:**
- Search functionality (no notes index)
- Note loading and navigation
- Dynamic content loading

✅ **Working Features:**  
- Basic UI and layout
- Settings and preferences
- Theme preview (limited)

**⚠️ For full functionality, use a local HTTP server (Option 1) instead.**

## 📁 Project Structure

```
notes-wiki/
├── index.html              # Main application entry point
├── script.js               # Core JavaScript functionality
├── style.css               # Main stylesheet
├── build.py                # Search index generator
├── notes-index.json        # Generated search index
├── CLAUDE.md               # Development documentation
├── libs/                   # JavaScript libraries
│   ├── marked.min.js       # Markdown parser
│   ├── prism.min.js        # Syntax highlighter
│   └── js-yaml.min.js      # YAML frontmatter parser
├── themes/                 # 16 built-in themes
│   ├── light.css
│   ├── dark.css
│   ├── vscode-dark-plus.css
│   └── ...
└── notes/                  # Your markdown content
    ├── index.md            # Welcome page
    ├── personal/           # Context folder
    ├── technical/          # Context folder
    ├── projects/           # Context folder
    └── ...
```

## ✍️ Writing Notes

### Basic Note Structure
Create markdown files in the `notes/` directory with YAML frontmatter:

```markdown
---
title: My Note Title
tags: [programming, javascript, tutorial]
created: 2024-01-15
author: Your Name
description: Brief description of the note
category: technical
---

# My Note Title

Your markdown content goes here...
```

### Frontmatter Fields
- **title** (required): Display title
- **tags** (required): Array of tags for filtering
- **created** (required): Creation date (YYYY-MM-DD)
- **author** (required): Author name
- **description** (required): Brief description for search
- **updated** (optional): Last update date
- **category** (optional): Content category
- **status** (optional): Publication status

### Callouts
Create visually distinctive callouts:

```markdown
> [!WARNING] Custom Title
> This is a warning callout with custom title.

> [!INFO]
> This is an info callout with default title.
```

Available types: WARNING, INFO, TIP, NOTE, DANGER, IMPORTANT, CAUTION, SUCCESS, QUESTION, EXAMPLE, QUOTE, BUG, TODO

### Code Blocks
Enhanced code blocks with additional features:

````markdown
```javascript title:"Example Function" collapse:true
function greetUser(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome to the Notes Wiki`;
}
```
````

## 🔧 Configuration

### Building the Search Index
After adding or modifying notes, rebuild the search index:

```bash
python3 build.py
```

This generates `notes-index.json` with metadata and search content for all notes.

### Customizing Themes
1. Copy an existing theme from `themes/`
2. Modify CSS custom properties
3. Save with a new filename
4. Add to the themes array in `script.js`

### Settings
Access settings via the gear icon to configure:
- Theme selection and auto-theme
- Code block line numbers and word wrap
- Content width preferences
- Recent files tracking
- Search behavior

## 🎯 Use Cases

- **Personal Knowledge Base**: Organize notes, ideas, and learning materials
- **Team Documentation**: Internal wikis and documentation sites
- **Project Documentation**: Technical docs with syntax highlighting
- **Blog/Portfolio**: Static site with rich content support
- **Learning Notes**: Study materials with advanced organization

## 🛠️ Development

### Adding New Features
1. Modify `script.js` for functionality
2. Update `style.css` for styling
3. Test across all 16 themes
4. Update `CLAUDE.md` for AI development context

### Theme Development
- Use CSS custom properties for consistency
- Test with various content types
- Ensure accessibility compliance
- Validate syntax highlighting colors

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across themes
5. Submit a pull request

## 🆘 Support

- Create an issue for bug reports
- Check existing issues for solutions
- Review `CLAUDE.md` for development context

---

**Built with ❤️ for knowledge workers who value simplicity and functionality.**