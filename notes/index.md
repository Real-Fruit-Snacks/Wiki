---
title: Welcome to Notes Wiki
tags: [getting-started, documentation, wiki]
created: 2024-01-15
author: Wiki Admin
description: A self-contained notes and documentation system with advanced features like themes, search, and metadata support
updated: 2024-01-15
category: documentation
status: published
---

# Welcome to Notes Wiki

Welcome to your new self-contained notes wiki! This system is designed to be hosted on GitLab Pages and provides a powerful, feature-rich documentation platform with no external dependencies.

## 🚀 Getting Started

This wiki system offers a comprehensive set of features for managing and presenting your documentation:

- **📝 Markdown-based** - Write your notes in standard Markdown with YAML frontmatter
- **🎨 15+ Built-in Themes** - Including popular VSCode themes
- **🔍 Full-text Search** - Search by title, content, tags, and metadata
- **🏷️ Tag System** - Organize and filter notes by tags
- **📊 Recent Files Tracking** - Quickly access your recently viewed notes
- **🔗 Direct Sharing Links** - Share specific notes with direct URLs
- **📱 Responsive Design** - Works perfectly on all devices
- **🖨️ Print-friendly** - Optimized styles for printing

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

### Code Blocks with Titles

You can add descriptive titles to your code blocks:

```javascript title:"Example Function"
function greetUser(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome to the Notes Wiki`;
}
```

```python title:"Data Processing Example"
import pandas as pd

def process_data(file_path):
    """Process CSV data with pandas"""
    df = pd.read_csv(file_path)
    return df.describe()
```

### Navigation

- Use the **sidebar** to browse through your folder structure
- Click on **tags** to filter notes by topic
- Access **recent files** from the dropdown in the header
- Use the **search** feature (press `/`) to find notes quickly

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Open search |
| `Esc` | Close search/modals |
| `Ctrl+K` | Quick navigation (coming soon) |
| `Ctrl+Shift+T` | Open theme picker |

### URL Structure

The wiki supports various URL patterns for direct access:

- **Direct note links**: `#/notes/category/note-name`
- **Tag filtered views**: `#/tags/javascript,performance`
- **Search queries**: `#/search/your+search+term`
- **Deep linking**: `#/notes/path/to/note#specific-heading`

## Themes

Choose from multiple themes to match your preference:

- **Light** - Clean, bright theme for daytime use
- **Dark** - Easy on the eyes for night-time reading
- **VSCode Themes** - Popular themes from Visual Studio Code (coming soon)
- **Solarized** - The classic color scheme (coming soon)
- **Dracula** - Dark theme with vibrant colors (coming soon)

Access the theme picker using the sun/moon icon in the header.

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

### Recent Files

The system automatically tracks your recently viewed notes:

- Access from the clock icon in the header
- Shows up to 20 recent files (configurable)
- Displays last viewed time
- Can be cleared or disabled in settings

### Share Functionality

Each note has a share button that:

- Copies the direct link to your clipboard
- Supports deep linking to headings
- Works with all URL patterns
- Shows confirmation when copied

## Technical Details

This wiki is built with:

- **Pure JavaScript** - No framework dependencies
- **Local Libraries** - All dependencies included
- **GitLab Pages** - Static hosting compatible
- **Service Worker** - Offline support (coming soon)
- **Progressive Web App** - Install as an app (coming soon)

## Next Steps

1. **Create your first note** - Add a new `.md` file to the `/notes` directory
2. **Add frontmatter** - Include metadata at the top of your file
3. **Commit and push** - GitLab CI will build and deploy automatically
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
| Themes | 15+ built-in themes | ✅ Ready |
| Search | Full-text search | ✅ Ready |
| Tags | Tag-based filtering | ✅ Ready |
| Recent Files | Track viewed notes | ✅ Ready |

### Task Lists

- [x] Set up GitLab repository
- [x] Configure GitLab Pages
- [ ] Add your first note
- [ ] Customize themes
- [ ] Invite collaborators

### Inline Elements

You can use **bold text**, *italic text*, `inline code`, and ~~strikethrough~~. You can also add [links](https://gitlab.com) and keyboard shortcuts like <kbd>Ctrl</kbd>+<kbd>S</kbd>.

---

Happy documenting! 🎉