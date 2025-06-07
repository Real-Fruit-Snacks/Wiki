# Notes Wiki

A modern, self-contained static notes and documentation system designed for GitLab Pages with advanced features including 50 built-in themes, real-time search, metadata parsing, and complete offline functionality.

![Wiki Screenshot](https://img.shields.io/badge/Status-Ready-green) ![No Dependencies](https://img.shields.io/badge/Dependencies-None-blue) ![Themes](https://img.shields.io/badge/Themes-50-purple) ![Version](https://img.shields.io/badge/Version-2.4.0-blue)

## 🌟 Features

### 📝 **Rich Content Support**
- **Markdown Rendering**: Full GitHub-flavored markdown support with marked.js
- **Syntax Highlighting**: Code blocks with Prism.js for 150+ languages
- **Callouts**: 13 different callout types (Warning, Info, Tip, Note, etc.)
- **YAML Frontmatter**: Metadata support for tags, authors, categories, and more
- **Image Support**: Embed images with alignment, sizing, captions, and hover effects

### 🎨 **Theme System**
- **50 Professional Themes**: Including VSCode, Catppuccin, Rosé Pine, Material, Ayu, Matrix, Cyberpunk, Cobalt2, Atom One, Winter Is Coming, ProtonMail, and more
- **Auto Theme Detection**: Automatically switch based on system preferences
- **Live Theme Previews**: Each theme card shows its actual colors and syntax highlighting
- **Consistent Styling**: All themes support both UI and syntax highlighting

### 🔍 **Advanced Search**
- **Real-time Search**: Instant fuzzy search across all content
- **Multi-field Search**: Search titles, content, tags, and authors
- **Tag Filtering**: Filter notes by multiple tags with OR logic
- **Sticky Search**: Optionally preserve search queries between sessions

### 🗂️ **Smart Organization**
- **Context Folders**: Organize notes into logical groups (Personal, Technical, Projects, etc.)
- **Dynamic Navigation**: Collapsible file tree with context filtering
- **Enhanced Recent Files**: 
  - Pin frequently used files to the top
  - Grouped by context with collapsible sections
  - Quick actions menu (pin/unpin, remove)
  - Visual organization with context badges
- **Cross-linking**: Support for internal note links and heading anchors

### ⚙️ **Customization**
- **Code Block Features**: Line numbers, word wrap, copy buttons, collapse functionality
- **Content Width**: Choose between narrow, normal, wide, or full-width layouts
- **Font Settings**: Adjustable font size (small/normal/large/extra-large) and font family (system/sans-serif/serif/monospace)
- **Navigation Options**: Set default home page, control external link behavior
- **Custom CSS**: Add your own CSS rules for advanced customization
- **Keyboard Shortcuts**: Customize shortcuts for common actions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Offline First**: All assets bundled locally - no external dependencies

### ⏱️ **Productivity Features**
- **Pomodoro Timer**: Full-featured Pomodoro technique implementation
  - Customizable work sessions (default 25 minutes)
  - Short breaks (default 5 minutes) and long breaks (default 15 minutes)
  - Automatic session progression with 3-second countdown
  - Visual progress bars and mode indicators
  - Sound notifications on completion
  - Auto-start next session option
  - Theme-aware design adapts to all 50 themes
- **Built-in Timer**: Standard timer with play/pause/reset functionality
- **Long-press Reset**: Hold reset button for 3 seconds with visual feedback
- **Tab Management**: Multiple tabs with drag-and-drop reordering and cached content
- **Keyboard Shortcuts**: Customizable shortcuts (default: Ctrl+T new tab, Ctrl+K search, Ctrl+, settings, Ctrl+F filter)
- **Keyboard Shortcuts Cheatsheet**: Press `?` to view all shortcuts in a organized modal
- **Modal Interactions**: Escape key and click-outside to close modals
- **Quick Access**: Set specific notes as default home page for instant access

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
├── libs/                   # JavaScript libraries
│   ├── marked.min.js       # Markdown parser
│   ├── prism.min.js        # Syntax highlighter
│   └── js-yaml.min.js      # YAML frontmatter parser
├── themes/                 # 50 built-in themes
│   ├── light.css
│   ├── dark.css
│   ├── vscode-dark-plus.css
│   └── ...
├── images/                 # Image assets
│   ├── notes/              # General note images
│   ├── tutorials/          # Tutorial screenshots
│   └── reference/          # Reference diagrams
└── notes/                  # Your markdown content
    ├── index.md            # Welcome page
    ├── images-demo.md      # Image usage guide
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

### Images
Add images with various alignment and sizing options:

```markdown
![Basic image](/images/example.jpg)
![left small: Left-aligned small image](/images/example.jpg)
![right medium: Right-aligned medium image](/images/example.jpg)

<figure>
  <img src="/images/example.jpg" alt="Description">
  <figcaption>Image with caption</figcaption>
</figure>
```

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
Access settings via the gear icon (or Ctrl+,) to configure:

**General Settings**
- Auto-theme based on system preferences
- Recent files tracking
- Sticky search queries

**Editor Settings**
- Code block line numbers toggle
- Word wrap for long lines
- Default code language for unmarked blocks

**Appearance**
- Content width (narrow/normal/wide/full)
- 50 professional themes with live previews

**Navigation & Behavior**
- Default home page (home/last viewed/specific note)
- External links behavior (new tab/same tab)

**Reading & Display**
- Font size adjustment (small/normal/large/extra-large)
- Font family selection (system/sans-serif/serif/monospace)

**Advanced**
- Custom CSS editor for personal styling
- Keyboard shortcut customization (click to edit)

**Files & History**
- Maximum recent files limit (10/20/30/50)
- Clear recent files history

**Pomodoro Timer**
- Enable/disable Pomodoro mode
- Customize work session duration (1-60 minutes)
- Customize short break duration (1-30 minutes)
- Customize long break duration (1-60 minutes)
- Sessions before long break (2-10)
- Auto-start next session toggle
- Sound notifications toggle

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
3. Test across all 50 themes
4. Update documentation as needed

### Theme Development
- Use CSS custom properties for consistency
- Test with various content types
- Ensure accessibility compliance
- Validate syntax highlighting colors

### Available Themes (50)
**Classic**: Light, Dark, Monokai, Dracula, Solarized (Light/Dark)  
**Modern**: VSCode Dark+, One Dark Pro, Tokyo Night, Nord, Palenight, Tomorrow Night  
**GitHub**: GitHub Light, GitHub Dark  
**Gruvbox**: Gruvbox Light, Gruvbox Dark  
**Material**: Material Ocean, Material Darker, Material Palenight  
**Catppuccin**: Mocha, Latte  
**Rosé Pine**: Main, Dawn  
**Ayu**: Light, Dark  
**Nature**: Everforest Dark, Kanagawa  
**Atom**: Atom One Light  
**Bluloco**: Light, Dark  
**Cobalt**: Cobalt2  
**Winter**: Winter Is Coming Light, Winter Is Coming Dark  
**Professional**: Oxocarbon, Spacegray, Flatland, Lucario, Nordic, Noctis  
**Brand-Inspired**: ProtonMail  
**Unique**: Hotdog Stand, Matrix, Cyberpunk, Vaporwave, HackTheBox, ThinkUltra, Witch Hazel, 2077, Zenburn, Shades of Purple

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
- Review the codebase documentation

## 📋 Changelog

### v2.4.0 (Latest)
- **Enhanced Recent Files** with advanced features:
  - Pin/unpin files to keep them at the top
  - Grouped display by context with collapsible sections
  - Quick actions menu for each file
  - Visual organization with context badges
- **Keyboard Shortcuts Cheatsheet** - Press `?` key to view all shortcuts
  - Organized into 6 categories (Navigation, Tab Management, Search, Content, Mouse, Timer)
  - Shows current custom key bindings
  - Interactive tips and visual layout
- **Pomodoro Timer Mode** for focused work sessions:
  - Configurable work/break durations
  - Automatic session progression
  - Visual progress bars and mode indicators
  - Sound notifications on completion
  - Persistent settings across sessions
- **Fixed timer pause icon** rendering issue
- **Removed redundant timer settings button**

### v2.3.0
- **Enhanced Settings Modal** with new customization options:
  - Font size adjustment (small/normal/large/extra-large)
  - Font family selection (system/sans-serif/serif/monospace)
  - Default home page configuration
  - External links behavior control
  - Custom CSS editor for advanced styling
  - Customizable keyboard shortcuts
  - Default code language setting
- **Improved .gitignore** with test file patterns

### v2.2.0
- **Added 16 new themes** bringing total to 50
- **Live theme previews** - Each theme card shows actual colors and syntax highlighting
- **Alphabetical theme sorting** for easier navigation
- **Fixed recent files** - Now shows all categories with context badges
- **Fixed duplicate tab bug** when Ctrl+clicking links
- **Improved tab management** - Closing last tab creates fresh Home tab
- **Simplified keyboard shortcuts** to essential commands only
- **Enhanced modal interactions** - Escape key and click-outside to close
- **Added keyboard shortcut tooltips** on hover

### v2.1.0
- Added 6 unique themes: Matrix, Witch Hazel, Vaporwave, Cyberpunk, HackTheBox, ThinkUltra
- Implemented tab management system
- Added productivity timer widget
- Enhanced search functionality

---

**Built with ❤️ for knowledge workers who value simplicity and functionality.**