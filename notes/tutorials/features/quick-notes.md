---
title: Quick Notes Guide
tags: [quick-notes, productivity, temporary-notes, panel, workflow]
created: 2025-06-24
author: Wiki Admin
description: Master the Quick Notes panel for temporary notes, quick capture, and side-by-side workflows
---

# Quick Notes Guide

The Notes Wiki features a **Quick Notes panel** that slides out from the right side of the screen, providing instant access to temporary notes without leaving your current workspace.

## 📝 Quick Notes Basics

### What are Quick Notes?
Quick Notes are **temporary, lightweight notes** perfect for:
- **Quick capture** - Jot down ideas without interrupting your workflow
- **Temporary storage** - Hold information while working on main notes
- **Side-by-side reference** - Keep important info visible while reading
- **Draft snippets** - Write quick drafts before adding to main notes
- **Task lists** - Create quick to-do lists and reminders

### Key Features
- **Slide-out panel** - Appears from the right side of the screen
- **Persistent storage** - Notes saved automatically to localStorage
- **Multiple notes** - Create and manage multiple quick notes
- **Rich text support** - Full markdown formatting support
- **Context menus** - Right-click actions for management
- **Import/Export** - Backup and share your quick notes

## 🎯 Accessing Quick Notes

### Opening the Panel
**Primary Methods:**
- **Click the Quick Notes button** (📝) in the header
- **Keyboard shortcut** - Press `Ctrl+Shift+S` (Mac: `⌘+Shift+S`)
- **Right-click menu** - Right-click the Quick Notes button for options

**Panel Behavior:**
- **Slide animation** - Smooth slide-in from right edge
- **Overlay mode** - Panel appears over main content
- **Responsive width** - Adapts to screen size
- **Auto-focus** - Automatically focuses on note content

### Closing the Panel
- **Click outside** the panel to close
- **Press Escape** key
- **Click the Quick Notes button** again to toggle
- **Use the close button** (×) in the panel header

## ✏️ Creating and Managing Notes

### Adding New Notes
**Create a Quick Note:**
1. **Open the Quick Notes panel**
2. **Click the "Add Note" button** (+) at the top
3. **Start typing** - Note is created automatically
4. **Click outside** the note or press `Ctrl+Enter` to save

**Auto-Save Features:**
- **Real-time saving** - Changes saved automatically as you type
- **No manual save** required - Everything is persistent
- **Crash recovery** - Notes recovered if browser crashes

### Editing Notes
**Edit Existing Notes:**
- **Click any note** to edit it
- **Start typing** to modify content
- **Markdown support** - Use standard markdown formatting
- **Multi-line support** - Create longer notes with line breaks

**Formatting Support:**
```markdown
**Bold text**
*Italic text*
- Bullet points
1. Numbered lists
[Links](https://example.com)
`Code snippets`
```

### Deleting Notes
**Delete Individual Notes:**
- **Right-click the note** → "Delete Note"
- **Confirmation dialog** - Prevents accidental deletion
- **Permanent removal** - Deleted notes cannot be recovered

**Bulk Operations:**
- **Right-click panel header** → "Clear All Notes"
- **Confirmation required** - Multiple confirmations for safety
- **Export first** - Recommended before clearing all

## 🖱️ Quick Notes Context Menus

### Panel Context Menu
**Right-click the Quick Notes button** in the header:

| Action | Description |
|--------|-------------|
| **Toggle Panel** | Show/hide the Quick Notes panel |
| **Import Notes** | Load quick notes from JSON file |
| **Export Notes** | Save all notes to JSON file |
| **Clear All Notes** | Remove all quick notes (with confirmation) |

### Individual Note Context Menu
**Right-click any quick note**:

| Action | Description |
|--------|-------------|
| **Edit Note** | Enter edit mode for the note |
| **Delete Note** | Remove the note (with confirmation) |
| **Duplicate Note** | Create a copy of the note |

## 💾 Import and Export

### Exporting Quick Notes
**Save Your Notes:**
1. **Right-click Quick Notes button** → "Export Notes"
2. **Choose filename** - Defaults to `quick-notes-YYYY-MM-DD.json`
3. **Download file** - JSON format with all note data
4. **Backup regularly** - Especially before major changes

**Export Format:**
```json
{
  "notes": [
    {
      "id": "note-1",
      "content": "My quick note content",
      "created": "2025-06-24T10:30:00Z",
      "modified": "2025-06-24T10:35:00Z"
    }
  ],
  "exported": "2025-06-24T10:40:00Z",
  "version": "1.0"
}
```

### Importing Quick Notes
**Restore or Load Notes:**
1. **Right-click Quick Notes button** → "Import Notes"
2. **Select JSON file** - Must be valid quick notes export
3. **Choose merge mode** - Replace all or add to existing
4. **Confirmation** - Review before importing

**Import Options:**
- **Replace All** - Removes existing notes, imports from file
- **Merge** - Adds imported notes to existing collection
- **Duplicate handling** - Automatically resolves ID conflicts

## 🚀 Quick Notes Workflows

### Capture Workflow
Perfect for rapid idea capture:

```
1. Reading main note → Idea occurs
2. Ctrl+Shift+S → Open Quick Notes
3. Type idea quickly → Auto-saves
4. Esc → Close panel, continue reading
5. Later: Review and organize captured ideas
```

### Research Workflow
Ideal for collecting information:

```
1. Open Quick Notes panel
2. Create note for each key point
3. Copy relevant quotes/URLs
4. Keep panel open during research
5. Export notes when research complete
```

### Task Management Workflow
Use for quick to-do lists:

```
Quick Note 1:
- [ ] Review project requirements
- [ ] Update documentation
- [ ] Schedule team meeting

Quick Note 2:
Ideas for next sprint:
- Feature X improvements
- Bug fixes for component Y
- Performance optimization
```

### Writing Workflow
Great for draft snippets:

```
Quick Note: "Introduction ideas"
- Hook: Statistics about productivity
- Problem: Information overload
- Solution: Quick Notes system

Quick Note: "Key points to cover"
- Workflow integration
- Context menu features
- Export capabilities
```

## ⌨️ Keyboard Integration

### Primary Shortcuts
- **`Ctrl+Shift+S`** - Toggle Quick Notes panel (Mac: `⌘+Shift+S`)
- **`Escape`** - Close panel when open
- **`Ctrl+Enter`** - Save current note and create new one
- **`Tab`** - Navigate between notes in panel

### Focus Management
- **Auto-focus** - New notes automatically receive focus
- **Tab navigation** - Move between notes using Tab key
- **Return focus** - Main content regains focus when panel closes

## 💡 Best Practices

### Effective Quick Notes Usage

**Keep Notes Atomic:**
- **One idea per note** - Easier to manage and organize
- **Clear, concise content** - Quick reference without scrolling
- **Use descriptive first lines** - Makes notes scannable

**Organize Regularly:**
```
Daily: Review and clean up old notes
Weekly: Export important notes to main documents
Monthly: Archive or delete obsolete quick notes
```

**Use for the Right Content:**
- ✅ **Temporary ideas** - Things you'll process later
- ✅ **Quick references** - URLs, quotes, snippets
- ✅ **Draft content** - Rough ideas before main notes
- ❌ **Permanent content** - Use main notes instead
- ❌ **Long documents** - Better suited for full notes

### Performance Tips

**Manage Note Count:**
- **Limit active notes** - Keep under 20 for best performance
- **Archive regularly** - Export and clear old notes
- **Use main notes** for permanent content

**Optimize Content:**
- **Avoid very long notes** - Split into multiple notes
- **Minimize formatting** - Focus on content over styling
- **Regular cleanup** - Remove notes no longer needed

### Privacy and Security

**Data Storage:**
- **Local storage only** - Notes stored in browser localStorage
- **No cloud sync** - All data remains on your device
- **Export for backup** - Regular exports recommended

**Sharing Considerations:**
- **Export selectively** - Only share notes you intend to
- **Review content** - Check for sensitive information
- **Use import/export** - For controlled sharing

## 🎨 Panel Customization

### Visual Appearance
The Quick Notes panel adapts to your current theme:
- **Theme integration** - Matches current color scheme
- **Responsive design** - Works on all screen sizes
- **Smooth animations** - Polished slide-in/out experience

### Panel Behavior
- **Persistent across sessions** - Panel state remembered
- **Auto-resize** - Adjusts to content length
- **Overlay positioning** - Never blocks main content access

## 🔧 Troubleshooting

### Common Issues

**Panel Not Opening:**
- Check keyboard shortcut conflicts
- Verify Quick Notes button is visible
- Try refreshing the page

**Notes Not Saving:**
- Ensure localStorage is enabled
- Check browser storage limits
- Try clearing old data

**Import/Export Problems:**
- Verify JSON file format
- Check file permissions
- Ensure valid quick notes export format

**Performance Issues:**
- Reduce number of active notes
- Clear browser cache
- Export and remove old notes

## 📱 Mobile Support

### Touch Interface
- **Tap to open** - Quick Notes button works on mobile
- **Swipe to close** - Gesture support for panel closing
- **Touch editing** - Native mobile text editing

### Mobile Considerations
- **Smaller panel** - Adapted for mobile screens
- **Simplified interface** - Optimized for touch
- **Limited context menus** - Some features desktop-only

---

## Quick Notes Mastery

Quick Notes transform how you capture and manage temporary information. Start with simple idea capture, develop your workflow patterns, and integrate the panel into your regular note-taking routine.

**Remember:** Quick Notes are for **temporary capture** - move important content to main notes for permanent storage.

**Get Started:** Press `Ctrl+Shift+S` right now to open the panel and create your first quick note! 🚀