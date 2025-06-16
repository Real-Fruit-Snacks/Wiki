---
title: Testing New Wiki Features
tags: [test, features, documentation]
author: Claude
created: 2025-06-16
description: A comprehensive test of all the new features added to the Wiki system
---

# Testing New Wiki Features

This note tests all 5 new features that were implemented.

## Table of Contents Test

The Table of Contents should appear on the right side of the screen for this note since it has multiple headings. You can click on any heading to jump to that section.

### Feature 1: Table of Contents
- Automatically generated from headings
- Shows current reading position
- Collapsible sidebar
- Click to navigate

### Feature 2: Wiki-style Links
Here's a wiki-style link to another note: [[Keyboard Shortcuts Demo]]

And here's a broken link that doesn't exist: [[Non-existent Note]]

### Feature 3: Reading Progress
Look at the top of the page - you should see:
- Reading time estimate (based on word count)
- Progress bar at the very top showing scroll position
- Time updates as you read

## Advanced Features

### Feature 4: Focus Mode
Press the 'F' key or click the eye icon in the note header to toggle focus mode:
- Hides the sidebar
- Centers content
- Increases font size
- Better reading experience

### Feature 5: Search Within Note
Press Ctrl+F (or Cmd+F on Mac) to search within this note:
- Highlights all matches
- Shows match count
- Navigate with Enter/Shift+Enter
- Close with Escape

## Code Examples

Here's some code to make the note longer and test the TOC with code blocks:

```javascript title:"Example JavaScript"
function testFeatures() {
    // Table of Contents
    const toc = document.getElementById('table-of-contents');
    console.log('TOC generated:', toc !== null);
    
    // Wiki links
    const wikiLinks = document.querySelectorAll('.wiki-link');
    console.log('Wiki links found:', wikiLinks.length);
    
    // Reading progress
    const progressBar = document.querySelector('.reading-progress-bar');
    console.log('Progress bar active:', progressBar !== null);
    
    // Focus mode
    const focusMode = document.body.classList.contains('focus-mode');
    console.log('Focus mode enabled:', focusMode);
    
    // Note search
    const searchUI = document.getElementById('note-search-ui');
    console.log('Search UI visible:', searchUI !== null);
}
```

```python title:"Python Example"
def analyze_features():
    """Analyze the new Wiki features."""
    features = {
        'table_of_contents': True,
        'wiki_links': True,
        'reading_progress': True,
        'focus_mode': True,
        'note_search': True
    }
    
    for feature, enabled in features.items():
        print(f"{feature}: {'✓' if enabled else '✗'}")
    
    return all(features.values())
```

## Testing Instructions

1. **Table of Contents**: Check that the TOC appears on the right side
2. **Wiki Links**: Click on [[Keyboard Shortcuts Demo]] - it should navigate to that note
3. **Reading Progress**: Scroll down and watch the progress bar at the top
4. **Focus Mode**: Press 'F' to toggle focus mode
5. **Search**: Press Ctrl+F and search for "feature" - it should highlight all occurrences

## Summary

All five features work together to create a better reading and navigation experience:

- **TOC** helps navigate long documents
- **Wiki links** create connections between notes
- **Reading progress** shows how much is left to read
- **Focus mode** removes distractions
- **Note search** helps find specific content quickly

The Wiki system is now more powerful and user-friendly than ever!