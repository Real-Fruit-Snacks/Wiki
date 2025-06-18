---
title: Context Filtering - Organize by Categories
tags: [tutorial, organization, navigation, contexts]
author: Wiki Team
created: 2025-01-18
description: Use contexts to organize and filter your notes by top-level categories
---

# Context Filtering - Organize by Categories

Contexts are top-level folders that help you organize notes into major categories like Personal, Work, Reference, etc. The context filtering system adapts to your screen size and number of categories.

## 📂 Understanding Contexts

### What Are Contexts?
Contexts are the **top-level folders** in your `/notes/` directory:
```
notes/
├── personal/     ← Context
├── work/         ← Context  
├── reference/    ← Context
└── tutorials/    ← Context
```

### Automatic Detection
The system automatically:
- Detects all top-level folders
- Counts notes in each context
- Creates filter buttons/dropdown
- Updates when notes are added

## 🎯 Using Context Filters

### Desktop View (Wide Screens)
On larger screens with few contexts:
- **Individual buttons** appear in the header
- **Click to filter** notes by that context
- **"All" button** shows everything
- **Active context** is highlighted

### Mobile/Dropdown View
On smaller screens or with many contexts:
- **Dropdown menu** replaces buttons
- **Click to open** context list
- **Select context** to filter
- **Current context** shown in button

### Automatic Switching
The UI switches between views based on:
- **Screen width**: Mobile < 768px
- **Context count**: 6+ forces dropdown
- **Dynamic resize**: Adapts as you resize

## 🔍 Filtering Behavior

### How It Works
When you select a context:
1. **Sidebar updates** to show only that context's notes
2. **File tree filters** to matching folders
3. **Search scope** adjusts to context (optional)
4. **URL updates** for bookmarking

### Combining with Other Filters
Context filtering works with:
- **Tag filtering**: Further refine within context
- **Search**: Search within selected context
- **Recent files**: Shows context-specific recents

## 💡 Organization Best Practices

### Recommended Contexts
Common context patterns:
- **personal/** - Private notes, journal, ideas
- **work/** - Professional documentation
- **reference/** - Quick lookup, cheatsheets
- **projects/** - Project-specific notes
- **learning/** - Courses, tutorials, books
- **archive/** - Old/completed items

### Naming Conventions
- Use **lowercase** for consistency
- Keep names **short and clear**
- Avoid special characters
- Use **singular or plural** consistently

### Context Limits
- **No hard limit** on contexts
- **6+ contexts** trigger dropdown view
- Consider **consolidating** if too many
- Use **subfolders** for further organization

## 🎨 Visual Design

### Button Appearance
- **Matches theme** colors
- **Subtle hover** effects
- **Active state** clearly visible
- **Responsive sizing**

### Dropdown Styling
- **Compact design** for mobile
- **Clear selection** indicator
- **Smooth animations**
- **Touch-friendly** targets

## ⚡ Workflow Tips

### Quick Context Switching
1. **Keyboard**: Use number keys (future feature)
2. **Mouse**: Click context buttons
3. **Touch**: Tap dropdown on mobile
4. **Bookmarks**: Save filtered URLs

### Project Organization
Create contexts by project phase:
```
notes/
├── active-projects/
├── planning/
├── completed/
└── ideas/
```

### Role-Based Contexts
Organize by your roles:
```
notes/
├── developer/
├── manager/
├── personal/
└── learning/
```

## 🔧 Advanced Usage

### URL Parameters
Direct links to contexts:
```
#/context/personal
#/context/work
```

### Persistent Selection
- Context selection is **remembered**
- Survives page refreshes
- Stored in localStorage
- Reset with "All" button

### Search Integration
When searching with context active:
- Results filtered to that context
- Context badge shown in results
- Clear context to search all

## 📱 Responsive Behavior

### Breakpoints
- **Mobile**: < 768px width
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Touch Interactions
- **Tap to open** dropdown
- **Tap outside** to close
- **Swipe** support (future)
- **Large touch targets**

## 🎯 Common Patterns

### Work/Personal Separation
```
notes/
├── work/
│   ├── meetings/
│   ├── projects/
│   └── documentation/
└── personal/
    ├── journal/
    ├── ideas/
    └── learning/
```

### Knowledge Base Structure
```
notes/
├── guides/
├── reference/
├── troubleshooting/
└── archive/
```

## 🔍 Troubleshooting

### Contexts Not Showing?
1. Ensure folders exist in `/notes/`
2. Folders must contain `.md` files
3. Rebuild index: `npm run build`
4. Check for typos in folder names

### Dropdown Not Working?
- Clear browser cache
- Check JavaScript console
- Verify no CSS conflicts
- Try different browser

---

Context filtering helps you focus on what matters. Organize your notes into meaningful categories and switch between them effortlessly!