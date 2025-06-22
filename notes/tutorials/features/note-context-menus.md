---
title: Note Context Menus
tags: [productivity, navigation, quick-actions]
author: Wiki Admin
created: 2025-06-22
description: Right-click any note for quick actions and enhanced productivity
---

# Note Context Menus

Context menus provide instant access to common note actions through a simple right-click. Available throughout the wiki interface, these menus streamline your workflow with quick access to essential features.

## 🖱️ How to Access

### Universal Access
Right-click on **any note link** throughout the interface:
- **Search results** - Right-click any search result
- **Sidebar navigation** - Right-click any note in the file tree
- **Recent files list** - Right-click any recent file
- **Bookmark list** - Right-click any bookmarked note
- **Wiki links** - Right-click any `[[wiki link]]` in content

### Visual Feedback
- **Hover effect** - Note links highlight when hovered
- **Context cursor** - Cursor changes to indicate context menu availability
- **Menu appearance** - Clean, themed menu appears at cursor position

## 📋 Available Actions

### 🆕 Open in New Tab
- **Action**: Opens the note in a new tab
- **Shortcut**: Also available via Ctrl+Click
- **Use case**: Keep current note open while exploring references
- **Tab behavior**: New tab becomes active immediately

### 🔖 Bookmark Note
- **Action**: Adds the note to your bookmarks list
- **Toggle behavior**: If already bookmarked, removes from bookmarks
- **Access bookmarks**: Header bookmarks icon or sidebar
- **Persistence**: Bookmarks saved in browser localStorage

### 📤 Share Note
- **Action**: Copies the note URL to clipboard
- **Format**: Full URL including anchor links if applicable
- **Feedback**: Toast notification confirms copy action
- **Use case**: Share specific notes with team members or save for later

## 🎯 Context-Aware Behavior

### Smart Menu Options
The context menu adapts based on note status:

**For Unbookmarked Notes:**
```
📄 Open in New Tab
🔖 Bookmark Note  
📤 Share Note
```

**For Already Bookmarked Notes:**
```
📄 Open in New Tab
🔖 Remove Bookmark
📤 Share Note
```

### Current Note Handling
- **Same note**: If right-clicking the currently open note, "Open in New Tab" still creates a duplicate tab
- **Split view**: Works independently in both panes
- **Tab context**: Actions respect current tab/pane focus

## 💡 Workflow Examples

### Research Workflow
1. **Search for topic** using Ctrl+K
2. **Right-click interesting results** → "Open in New Tab"
3. **Right-click key references** → "Bookmark Note"
4. **Right-click important findings** → "Share Note" to copy URLs

### Reference Building
1. **Browse sidebar** for related content
2. **Right-click useful notes** → "Bookmark Note"
3. **Access bookmarks** to build reading list
4. **Right-click bookmarks** → "Open in New Tab" for detailed review

### Team Collaboration
1. **Find relevant documentation**
2. **Right-click notes** → "Share Note"
3. **Paste URLs** in team chat/email
4. **Team members** can directly access shared content

## 🎨 Visual Design

### Menu Appearance
- **Theme integration** - Menu matches current theme colors
- **Clean layout** - Minimal, focused design
- **Clear icons** - Distinctive icons for each action
- **Typography** - Consistent with application fonts

### Animation & Feedback
- **Smooth appearance** - Menu fades in smoothly
- **Hover states** - Menu items highlight on hover
- **Click feedback** - Visual confirmation of actions
- **Auto-dismiss** - Menu closes on outside click or action

## 📱 Mobile Experience

### Touch Support
- **Long press** - Equivalent to right-click on touch devices
- **Touch targets** - Optimized button sizes for fingers
- **Menu positioning** - Adjusts to stay within screen bounds

### Responsive Behavior
- **Smaller screens** - Menu items may show icons only
- **Portrait/landscape** - Menu adapts to orientation changes
- **Safe areas** - Respects device safe areas and notches

## ⚙️ Settings & Customization

### Menu Behavior
Configure in **Settings** → **Advanced**:
- **Menu animation speed** - Fast/normal/slow
- **Auto-dismiss timeout** - How long menu stays open
- **Default actions** - Customize most common actions

### Accessibility
- **Keyboard navigation** - Arrow keys to navigate menu items
- **Screen reader support** - Proper ARIA labels and roles
- **High contrast** - Respects system accessibility settings

## 🔧 Technical Details

### Performance
- **Lazy loading** - Menus created only when needed
- **Memory efficient** - Cleaned up automatically after use
- **Event delegation** - Minimal event listener overhead

### Browser Compatibility
- **Modern browsers** - Full functionality in Chrome, Firefox, Safari, Edge
- **Progressive enhancement** - Graceful degradation in older browsers
- **Touch devices** - Full support via long-press gestures

## 💭 Tips & Best Practices

### Efficiency Tips
1. **Learn the shortcuts** - Right-click becomes second nature
2. **Bookmark strategically** - Use for reference materials you'll revisit
3. **Share frequently** - Build habit of sharing useful findings
4. **Combine with keyboard** - Right-click + keyboard navigation

### Workflow Integration
- **Use with search** - Right-click search results for quick actions
- **Combine with tabs** - Open multiple notes, bookmark the best ones
- **Team sharing** - Build shared knowledge base through URL sharing

### Organization
- **Bookmark categorically** - Use consistent bookmarking strategy
- **Clean up regularly** - Remove outdated bookmarks
- **Share meaningfully** - Include context when sharing note URLs

---

## Quick Reference

**Right-click any note for:**
- 📄 **Open in New Tab** - Keep current note open
- 🔖 **Bookmark Note** - Save for later access  
- 📤 **Share Note** - Copy URL to clipboard

**Available everywhere:**
- Search results
- Sidebar navigation  
- Recent files
- Bookmarks
- Wiki links in content

Context menus make note management effortless - right-click anywhere to boost your productivity!