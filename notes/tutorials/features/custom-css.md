---
title: Custom CSS
tags: [customization, advanced, styling, css, themes]
author: NotesWiki Team
created: 2025-01-23
updated: 2025-01-23
description: Customize NotesWiki's appearance with your own CSS styles
---

# Custom CSS

Custom CSS allows you to personalize NotesWiki beyond the built-in themes and settings. Whether you want to tweak a few colors, adjust spacing, or create an entirely unique look, custom CSS gives you complete control over the visual appearance.

## Accessing Custom CSS

1. Open **Settings** (⚙️) or press `Ctrl + ,`
2. Navigate to the **Advanced** tab
3. Find the **Custom CSS** section
4. Enter your CSS in the text editor
5. Click **Save** to apply changes

Changes take effect immediately without needing to refresh.

## CSS Variables

NotesWiki uses CSS custom properties (variables) for theming. You can override any of these:

### Core Color Variables
```css
:root {
  /* Backgrounds */
  --bg-primary: #1a1a1a;
  --bg-secondary: #252525;
  --bg-sidebar: #1e1e1e;
  
  /* Text Colors */
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --text-muted: #999999;
  
  /* Accent Colors */
  --accent-primary: #007acc;
  --accent-secondary: #0098ff;
  --accent-error: #ff6b6b;
  --accent-warning: #ffa500;
  --accent-success: #4caf50;
}
```

### Common Customizations

#### 1. Change Accent Color
```css
:root {
  --accent-primary: #ff6b6b;
  --accent-secondary: #ff8787;
  --link-color: #ff6b6b;
}
```

#### 2. Adjust Spacing
```css
:root {
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
}
```

#### 3. Modify Fonts
```css
:root {
  --font-family: 'Georgia', serif;
  --font-mono: 'Fira Code', monospace;
}
```

## Component Styling

### Navigation Sidebar
```css
/* Wider sidebar */
.sidebar {
  width: 300px !important;
}

/* Custom folder colors */
.folder-name {
  color: #ffa500;
}

/* Highlight active file */
.tree-item.active {
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: bold;
}
```

### Tabs
```css
/* Rounded tabs */
.tab {
  border-radius: 8px 8px 0 0;
  margin: 0 2px;
}

/* Colorful pinned tabs */
.tab.pinned {
  background-color: #ff6b6b;
}

/* Tab hover effect */
.tab:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
```

### Content Area
```css
/* Custom heading styles */
.content h1 {
  border-bottom: 3px solid var(--accent-primary);
  padding-bottom: 0.5rem;
}

/* Styled blockquotes */
blockquote {
  border-left: 4px solid #ffa500;
  background-color: rgba(255, 165, 0, 0.1);
  font-style: italic;
}

/* Code block enhancements */
pre {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
```

## Advanced Customizations

### Custom Callouts
```css
/* Create a custom callout type */
.callout-custom {
  background-color: #e3f2fd;
  border-color: #2196f3;
  color: #0d47a1;
}

.callout-custom .callout-icon::before {
  content: "💡";
}
```

### Animation Effects
```css
/* Smooth transitions */
* {
  transition: background-color 0.3s ease;
}

/* Animated links */
a {
  position: relative;
  text-decoration: none;
}

a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-primary);
  transition: width 0.3s;
}

a:hover::after {
  width: 100%;
}
```

### Focus Mode Enhancements
```css
/* Ultra-focused reading mode */
body.focus-mode .content {
  max-width: 650px;
  font-size: 1.2em;
  line-height: 1.8;
}

body.focus-mode {
  background-color: #fafafa;
}
```

## Theme Overrides

Override specific theme elements while keeping the base theme:

```css
/* Override theme colors while keeping theme structure */
[data-theme="ayu-mirage"] {
  --bg-primary: #1f2430;
  --accent-primary: #ffcc66;
}

/* Conditional styling based on theme */
[data-theme*="dark"] .content {
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
```

## Responsive Customizations

```css
/* Mobile-specific styles */
@media (max-width: 768px) {
  .sidebar {
    width: 100% !important;
  }
  
  .content {
    padding: 1rem !important;
  }
}

/* Large screen optimizations */
@media (min-width: 1400px) {
  .content {
    max-width: 1200px;
  }
}
```

## Best Practices

### 1. Use CSS Variables
```css
/* Good - uses variables */
.custom-element {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

/* Avoid - hardcoded colors */
.custom-element {
  color: #ffffff;
  background: #252525;
}
```

### 2. Maintain Specificity
```css
/* Use specific selectors */
.sidebar .tree-item.active {
  /* styles */
}

/* Avoid !important when possible */
.tree-item {
  color: red !important; /* Try to avoid */
}
```

### 3. Test Across Themes
Always test your custom CSS with multiple themes:
- Light themes
- Dark themes
- High contrast themes

## Common Use Cases

### 1. Brand Colors
```css
:root {
  --accent-primary: #your-brand-color;
  --accent-secondary: #your-secondary-color;
}
```

### 2. Improved Readability
```css
.content {
  font-size: 18px;
  line-height: 1.7;
  letter-spacing: 0.02em;
}
```

### 3. Custom Syntax Highlighting
```css
/* Override Prism.js theme colors */
.token.keyword {
  color: #ff79c6;
}

.token.string {
  color: #f1fa8c;
}
```

### 4. Hide Elements
```css
/* Hide elements you don't use */
.pomodoro-timer {
  display: none;
}

/* Hide breadcrumbs */
.breadcrumb {
  display: none;
}
```

## Debugging Tips

### 1. Use Browser DevTools
- Right-click → Inspect Element
- Test CSS changes live
- Copy working styles to custom CSS

### 2. Check Specificity
If styles aren't applying:
```css
/* Increase specificity */
body .content h1 {
  /* styles */
}

/* Or use !important as last resort */
.element {
  color: red !important;
}
```

### 3. Validate CSS
Ensure your CSS is valid:
- No missing semicolons
- Proper bracket matching
- Valid property names

## Safety and Performance

### Do's
- ✅ Override CSS variables when possible
- ✅ Test with multiple themes
- ✅ Keep custom CSS organized
- ✅ Comment complex sections
- ✅ Back up your custom CSS

### Don'ts
- ❌ Don't hide critical UI elements
- ❌ Avoid breaking layouts with position changes
- ❌ Don't use excessive animations
- ❌ Avoid very large CSS files

## Examples Gallery

### Minimal Writer Theme
```css
/* Clean, distraction-free writing */
:root {
  --bg-primary: #fafafa;
  --text-primary: #333;
  --accent-primary: #333;
}

.sidebar { width: 200px; }
.header { border-bottom: none; }
.content { max-width: 650px; }
```

### Neon Glow Effect
```css
/* Cyberpunk-style glow */
.tab.active {
  box-shadow: 0 0 20px var(--accent-primary);
}

h1, h2 {
  text-shadow: 0 0 10px currentColor;
}
```

### Paper Notebook Style
```css
/* Lined paper effect */
.content {
  background-image: repeating-linear-gradient(
    transparent,
    transparent 1.5rem,
    #e0e0e0 1.5rem,
    #e0e0e0 calc(1.5rem + 1px)
  );
  line-height: 1.5rem;
}
```

## Related Features

- [[Themes]] - Built-in theme system
- [[Typography and Fonts|Typography]] - Font customization
- [[Settings Customization]] - Other customization options
- [[Focus Mode]] - Distraction-free writing
- [[Print Mode|Print Styles]] - Custom print styling

## Sharing Custom CSS

Share your custom CSS with others:
1. Copy your CSS from settings
2. Save to a `.css` file
3. Share via GitHub Gist or similar
4. Others can paste into their custom CSS

Remember: Custom CSS is stored locally and needs to be manually backed up!