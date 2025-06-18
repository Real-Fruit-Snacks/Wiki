---
title: Wiki-Style Links
tags: [tutorial, navigation, links]
author: Wiki Team
created: 2025-01-18
description: Create connections between notes using wiki-style [[Note Title]] links
---

# Wiki-Style Links

Connect your notes together using wiki-style links with the `[[Note Title]]` syntax. This powerful feature helps you build a interconnected knowledge base.

## 🔗 Basic Usage

### Creating Links
Simply wrap any note title in double square brackets:
```markdown
Check out my thoughts in [[Daily Journal]]
```

This creates a clickable link to the "Daily Journal" note.

### How It Works
1. Type `[[` to start a link
2. Add the note title
3. Close with `]]`
4. The link is automatically created when the note renders

## 📝 Link Formats

### By Title
The most common format - just use the note's title:
```markdown
See also [[JavaScript Tips]] for more examples
```

### Case Insensitive
Links are case-insensitive for convenience:
- `[[javascript tips]]` 
- `[[JavaScript Tips]]`
- `[[JAVASCRIPT TIPS]]`

All link to the same note!

### Partial Matches
The system tries to find the best match:
- `[[React Guide]]` might match "React Development Guide"
- `[[Python]]` might match "Python Programming Basics"

## 🎯 Advanced Features

### Link Behavior
- **Click**: Opens in current tab
- **Ctrl+Click**: Opens in new tab
- **Middle-Click**: Opens in new tab

### Visual Indicators
- **Valid Links**: Appear in your theme's link color
- **Hover Effect**: Shows the full note path on hover
- **Active Styling**: Links to the current note are highlighted

## 💡 Best Practices

### Meaningful Titles
Give your notes clear, unique titles:
- ✅ "Docker Deployment Guide"
- ❌ "Guide" or "Notes"

### Create Link Networks
Build connections between related topics:
```markdown
After learning [[JavaScript Basics]], move on to [[Advanced JavaScript Patterns]] and explore [[React Framework Guide]].
```

### Use for Navigation
Create index pages with links:
```markdown
## My Learning Path
1. [[HTML Fundamentals]]
2. [[CSS Styling Guide]]
3. [[JavaScript Essentials]]
4. [[React Getting Started]]
```

## 🔍 Finding Linked Notes

### Search Integration
Search for notes that link to a specific note:
```
Search: "[[JavaScript Tips]]"
```

### Orphaned Notes
Notes without any incoming links can be found through search to help you connect them.

## ⚡ Workflow Tips

### Quick Note Creation
1. Write `[[New Topic]]` in your current note
2. Click the link (it will show as valid even if the note doesn't exist yet)
3. Create the new note with that exact title

### Refactoring Links
When renaming a note:
1. Update the note's title in frontmatter
2. Search for the old `[[Title]]` across all notes
3. Update links to use the new title

## 🎨 Styling

Wiki links inherit your theme's link styling:
- **Color**: Matches theme's primary link color
- **Hover**: Standard hover effects apply
- **Visited**: May show different color if theme supports it

## 🔧 Troubleshooting

### Link Not Working?
1. Check the exact note title (view the note's frontmatter)
2. Ensure the note exists in the index
3. Try rebuilding the index: `npm run build`

### Multiple Matches?
If multiple notes have similar titles:
- The system picks the best match
- Use more specific titles to avoid ambiguity

---

Wiki-style links are essential for building a connected knowledge base. Start linking your notes today to create a powerful personal wiki!