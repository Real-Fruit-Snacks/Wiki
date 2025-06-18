---
title: Welcome to Notes Wiki
tags: [getting-started, documentation, wiki]
created: 2024-01-15
author: Wiki Admin
description: A self-contained notes and documentation system with advanced features like themes, search, and metadata support
updated: 2025-01-07
category: documentation
status: published
---

# Welcome to Notes Wiki

Welcome to your new self-contained notes wiki! This system is designed to be hosted on GitHub Pages and provides a powerful, feature-rich documentation platform with no external dependencies.

## 🚀 Getting Started

This wiki system offers a comprehensive set of features for managing and presenting your documentation:

- **📝 Markdown-based** - Write your notes in standard Markdown with YAML frontmatter
- **🎨 50 Professional Themes** - VSCode, Catppuccin, Material, Tokyo Night, and more
- **🔍 Advanced Search** - Full-text search with operators (`"exact"`, `-exclude`, `tag:`, `author:`)
- **🏷️ Tag System** - Multi-select filtering with OR/AND logic and exclusions
- **📌 Enhanced Recent Files** - Pin important files, grouped by context with quick actions
- **⏱️ Pomodoro Timer** - Built-in productivity timer with customizable work/break sessions
- **⌨️ Keyboard Shortcuts** - Customizable shortcuts with comprehensive cheatsheet (press `?`)
- **📑 Tab Management** - Multiple tabs with drag-and-drop reordering
- **🔗 Direct Sharing Links** - Share specific notes with deep linking to headings
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **💾 Offline First** - All assets bundled locally, no internet required
- **🔢 Line Numbers** - Toggle line numbers for code blocks with proper word-wrap alignment
- **🔄 Alphabetical Sidebar** - Categories automatically sorted for better organization
- **📋 Smart Context Filtering** - Responsive dropdown adapts to screen size and category count

## Key Features

### Writing Notes

All notes are written in Markdown format with YAML frontmatter for metadata. Here's an example:

```yaml title:"Note Template"
---
title: Your Note Title
tags: [tag1, tag2, tag3]
created: 2024-01-15
author: Your Name
description: Brief description of your note
---

# Your Content Here

Write your content using standard Markdown syntax...
```

### Enhanced Code Blocks

Code blocks support advanced features:

```javascript title:"Example Function" collapse:true
function greetUser(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome to the Notes Wiki`;
}
```

**Features:**
- **Titles**: Add descriptive headers with `title:"Your Title"`
- **Collapsible**: Use `collapse:true` to start collapsed
- **Line Numbers**: Toggle with proper word-wrap alignment using CSS counters
- **Word Wrap**: Enable for long lines with maintained line number alignment
- **Copy Button**: One-click code copying with HTML entity handling
- **Syntax Highlighting**: Support for 100+ programming languages
- **Expand/Collapse**: Plus/minus icons for easy toggling

### Navigation

- Use the **sidebar** to browse through your folder structure
- Click on **tags** to filter notes by topic
- Access **recent files** from the dropdown in the header
- Use the **search** feature (press `/`) to find notes quickly

### Keyboard Shortcuts

Press `?` to see all shortcuts, or use these common ones:

| Shortcut | Action |
|----------|--------|
| `Ctrl+T` | New tab |
| `Ctrl+K` | Open search |
| `Ctrl+,` | Open settings |
| `Ctrl+F` | Filter by tags |
| `Ctrl+W` | Close current tab |
| `?` | Show shortcuts cheatsheet |
| `Esc` | Close modals/overlays |

### URL Structure

The wiki supports various URL patterns for direct access:

- **Direct note links**: `#/notes/category/note-name`
- **Tag filtered views**: `#/tags/javascript,performance`
- **Search queries**: `#/search/your+search+term`
- **Deep linking**: `#/notes/path/to/note#specific-heading`

## 🎨 Themes

Choose from **50 professional themes** to match your preference:

**Popular Choices:**
- **VSCode Dark+** - The classic VS Code dark theme
- **Tokyo Night** - Inspired by Tokyo's neon lights
- **Catppuccin Mocha/Latte** - Soothing pastel themes
- **One Dark Pro** - Atom's iconic dark theme
- **Material Ocean/Palenight** - Google's Material Design
- **Dracula** - Dark theme with vibrant colors
- **Nord** - Arctic, north-bluish color palette
- **Rosé Pine** - All natural pine, faux fur and a bit of soho

**Unique Themes:**
- **Matrix** - Enter the digital rain
- **Cyberpunk** - Neon-soaked future aesthetic
- **Vaporwave** - 80s retro-futuristic vibes
- **HackTheBox** - Hacker terminal style

Access themes in Settings (Ctrl+,) → Appearance. Themes include live preview cards!

## Organization Tips

### Using Tags Effectively

Tags help you categorize and quickly find related notes:

- Use consistent tag naming (e.g., `javascript` not `js`)
- Apply multiple tags for better categorization
- Click tags to filter the navigation tree
- Combine tags for more specific filtering

### Folder Structure

Organize your notes hierarchically:

```
notes/
├── personal/
│   ├── daily-notes.md
│   └── ideas.md
├── technical/
│   ├── javascript/
│   │   ├── tips.md
│   │   └── frameworks.md
│   └── python/
│       └── data-science.md
└── projects/
    ├── project-1.md
    └── project-2.md
```

## Advanced Features

### 🍅 Pomodoro Timer

Boost your productivity with the built-in Pomodoro timer:

- **Work Sessions** - Default 25 minutes of focused work
- **Short Breaks** - 5-minute breaks between sessions
- **Long Breaks** - 15-minute break after 4 sessions
- **Customizable** - Adjust all durations in settings
- **Auto-progression** - Automatically switch between work/break
- **Sound Notifications** - Audio alerts when sessions complete
- **Visual Progress** - Progress bar shows time remaining

Enable in Settings → Pomodoro Timer

### Advanced Search

Use search operators for precise results:

- `"exact phrase"` - Search for exact matches
- `-exclude` - Exclude terms from results
- `tag:javascript` - Filter by specific tag
- `author:name` - Find notes by author
- Combine operators: `tag:python -django "machine learning"`

### Metadata System

Every note can include rich metadata in the frontmatter:

- **title**: The display title of your note
- **tags**: Array of tags for categorization
- **created**: Creation date (YYYY-MM-DD)
- **author**: Note author's name
- **description**: Brief summary for search results
- **updated**: Last update date (optional)
- **category**: Primary category (optional)
- **status**: draft/published (optional)

### Recent Files & Pinning

The enhanced recent files system helps you stay organized:

- **Pin Important Files** - Click the pin icon to keep files at the top
- **Grouped by Context** - Files organized by their folders (Personal, Technical, etc.)
- **Quick Actions** - Hover for pin/unpin and remove options
- **Collapsible Sections** - Expand/collapse context groups
- **Smart Limits** - Configure max files (10/20/30/50) in settings
- **Visual Badges** - Context badges show file location at a glance

### Share Functionality

Each note has a share button that:

- Copies the direct link to your clipboard
- Supports deep linking to headings
- Works with all URL patterns
- Shows confirmation when copied

## Settings & Customization

Access comprehensive settings via the gear icon or `Ctrl+,`:

**Available Settings:**
- **General** - Auto-theme, recent files tracking
- **Editor** - Line numbers, word wrap
- **Appearance** - 50 themes, content width
- **Navigation** - Default home page, link behavior
- **Reading** - Font size and family
- **Code** - Default language for unmarked blocks
- **Advanced** - Custom CSS, keyboard shortcuts
- **Pomodoro** - Timer durations and behavior
- **Files & History** - Recent files limits

## Technical Details

This wiki is built with:

- **Pure JavaScript** - No framework dependencies
- **Local Libraries** - All dependencies bundled (Marked.js, Prism.js, JS-YAML)
- **GitHub Pages** - Automatic CI/CD deployment with GitHub Actions
- **Zero External Deps** - Everything works offline
- **50 Professional Themes** - All included, no downloads required
- **Fast Search** - Client-side full-text indexing with advanced operators
- **CSS Counter Line Numbers** - Modern line numbering with word-wrap support

## Next Steps

1. **Create your first note** - Add a new `.md` file to the `/notes` directory
2. **Add frontmatter** - Include metadata at the top of your file
3. **Commit and push** - GitHub Actions will build and deploy automatically
4. **Explore themes** - Try different themes to find your favorite
5. **Organize with tags** - Start building your tag taxonomy

## Example Content

Here's a quick demonstration of various Markdown elements:

### Lists

**Unordered List:**
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

**Ordered List:**
1. First step
2. Second step
3. Third step

### Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

### Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Themes | 50 professional themes | ✅ Ready |
| Search | Advanced operators | ✅ Ready |
| Recent Files | Pinning & grouping | ✅ Ready |
| Pomodoro Timer | Productivity mode | ✅ Ready |
| Keyboard Shortcuts | Customizable | ✅ Ready |
| Tab Management | Multi-tab support | ✅ Ready |

### Task Lists

- [x] Set up GitLab repository
- [x] Configure GitLab Pages
- [ ] Add your first note
- [ ] Customize themes
- [ ] Invite collaborators

### Inline Elements

You can use **bold text**, *italic text*, `inline code`, and ~~strikethrough~~. You can also add [links](https://gitlab.com) and keyboard shortcuts like <kbd>Ctrl</kbd>+<kbd>K</kbd> for search or press <kbd>?</kbd> for help.

### Callouts

> [!TIP] Pro Tip
> Press `?` at any time to see all available keyboard shortcuts!

> [!INFO] Promodor Feature
> The Pomodoro timer helps you stay focused with timed work sessions.

---

Happy documenting! 🎉