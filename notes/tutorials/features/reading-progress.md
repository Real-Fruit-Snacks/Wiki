---
title: Reading Progress & Time Estimation
tags: [tutorial, reading, navigation]
author: Wiki Team
created: 2025-01-18
description: Track your reading progress and get time estimates for notes
---

# Reading Progress & Time Estimation

Stay informed about your reading progress with visual indicators and time estimates based on average reading speed.

## 📊 Progress Bar

### Visual Indicator
A thin progress bar appears at the top of each note showing:
- **Current position** as you scroll
- **Smooth animation** for better UX
- **Theme-matched colors** for consistency

### How It Works
- Calculates based on scroll position
- Updates in real-time as you read
- Accounts for entire document length
- Hidden when at the very top

## ⏱️ Reading Time Estimation

### Automatic Calculation
Each note shows estimated reading time based on:
- **Word count** of the entire note
- **Average reading speed** (200 words/minute)
- **Formatted display** (e.g., "5 min read")

### Where It Appears
Find reading time in:
- Note header metadata
- Search results preview
- Recent files list

## 📈 Progress Tracking Features

### Scroll Position Memory
The wiki remembers where you left off:
- Position saved when switching tabs
- Restored when returning to a note
- Per-tab basis for multiple instances

### Visual Feedback
- **Progress percentage** shown in some themes
- **Smooth scrolling** to positions
- **Clear indicators** of document boundaries

## 🎯 Use Cases

### Long Document Navigation
Perfect for:
- 📚 Lengthy tutorials
- 📖 Documentation reading
- 📝 Research papers
- 📋 Meeting minutes

### Time Management
- Plan reading sessions
- Estimate documentation review time
- Track learning progress
- Schedule breaks appropriately

## ⚙️ How Reading Time Works

### Calculation Method
```
Words in document ÷ 200 WPM = Reading time in minutes
```

### Factors Considered
- **Text content** only (not code blocks)
- **Headings and paragraphs** included
- **Average adult reading speed**
- **Rounded to nearest minute**

### Examples
- 500 words = ~3 min read
- 1000 words = ~5 min read
- 2000 words = ~10 min read

## 🎨 Visual Styling

### Progress Bar Appearance
- **Height**: Thin 3-4px bar
- **Color**: Matches theme accent
- **Position**: Fixed at viewport top
- **Z-index**: Above content, below modals

### Theme Integration
Different themes style the progress bar:
- **Dark themes**: Subtle glow effect
- **Light themes**: Clean solid color
- **Custom themes**: Uses CSS variables

## 💡 Reading Tips

### Effective Reading
1. **Check time estimate** before starting
2. **Use TOC** for long documents
3. **Monitor progress** for breaks
4. **Combine with focus mode** for immersion

### Navigation Helpers
- **Home key**: Jump to start
- **End key**: Jump to end  
- **Page Up/Down**: Smooth scrolling
- **Space bar**: Page down

## 🔧 Technical Details

### Performance
- Lightweight implementation
- No impact on scrolling performance
- Throttled updates for efficiency
- CSS-based animations

### Accessibility
- Respects reduced motion preferences
- Keyboard navigation friendly
- Screen reader compatible
- High contrast support

## 📱 Responsive Behavior

### Mobile Devices
- Progress bar remains visible
- Touch scrolling supported
- Optimized for small screens
- Same features as desktop

### Tablet Experience  
- Full progress tracking
- Comfortable reading width
- Touch-friendly interface
- Landscape/portrait support

## 🎯 Pro Tips

1. **Quick Progress Check**: Glance at bar to see position
2. **Time Budgeting**: Use estimates to plan reading
3. **Break Planning**: Take breaks at section boundaries
4. **Speed Reading**: Actual time may vary with familiarity

## 🔍 Related Features

### Complements These Features
- **Table of Contents**: Navigate to specific sections
- **Focus Mode**: Immersive reading experience
- **In-Note Search**: Find specific content
- **Bookmarks**: Save important notes

---

This note is approximately a 3-minute read. Watch the progress bar fill as you scroll through this content!