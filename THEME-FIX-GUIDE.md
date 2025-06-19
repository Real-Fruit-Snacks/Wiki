# Theme Fix Guide - Notes Wiki

This guide provides step-by-step instructions for fixing the issues identified in ISSUES-FOUND.md.

## Quick Reference - Required CSS Variables

Every theme MUST define these variables. Copy this template and fill in appropriate colors:

```css
:root {
  /* Core Colors - REQUIRED */
  --bg-primary: #000000;        /* Main background */
  --bg-secondary: #1a1a1a;      /* Secondary/card backgrounds */
  --bg-sidebar: #0d0d0d;        /* Sidebar background */
  --text-primary: #ffffff;      /* Main text color */
  --text-muted: #999999;        /* Muted/secondary text */
  --text-heading: #ffffff;      /* Heading text color */
  
  /* Extended Colors - REQUIRED */
  --bg-modal: #1a1a1a;          /* Modal dialog background */
  --bg-tooltip: #2a2a2a;        /* Tooltip background */
  --bg-input: #0d0d0d;          /* Form input background */
  --bg-highlight: #3a3a3a;      /* Text selection highlight */
  --text-link: #4a9eff;         /* Link color */
  --text-code: #f92672;         /* Inline code color */
  --text-inverse: #000000;      /* Inverse text (for light backgrounds) */
  --button-text: #ffffff;       /* Button text color */
  
  /* Accent Colors */
  --accent-primary: #4a9eff;    /* Primary accent/brand color */
  --accent-primary-light: #6ab0ff; /* Lighter variant */
  
  /* Borders */
  --border-color: #2a2a2a;      /* Default border color */
  --border-active: #4a9eff;     /* Active/focus border color */
  
  /* Shadows - Use 'none' if not needed */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.2);
  --shadow-glow: 0 0 10px var(--accent-primary);
  --shadow-inset: inset 0 2px 4px rgba(0,0,0,0.1);
  
  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

## Fixing Specific Themes

### 1. matrix.css - CRITICAL
**Issues:** Missing 20+ variables, extreme low contrast

```css
/* Add after existing variables */
:root {
  /* Fix missing core variables */
  --bg-modal: #001100;
  --bg-tooltip: #002200;
  --bg-input: #000500;
  --bg-highlight: #003300;
  --text-link: #00ff00;
  --text-code: #00ff00;
  --text-inverse: #000000;
  --button-text: #00ff00;
  
  /* Improve contrast - change muted text from #006600 */
  --text-muted: #00cc00; /* Brighter green for better contrast */
  
  /* Add missing UI variables */
  --shadow-sm: 0 1px 2px rgba(0,255,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,255,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,255,0,0.2);
  --shadow-glow: 0 0 10px #00ff00;
  --shadow-inset: inset 0 2px 4px rgba(0,0,0,0.5);
}
```

### 2. monokai.css - CRITICAL  
**Issues:** Missing 8-10 essential variables

```css
/* Add these missing variables */
:root {
  --bg-modal: #272822;
  --bg-tooltip: #3e3d32;
  --bg-input: #1e1f1c;
  --bg-highlight: #49483e;
  --text-link: #66d9ef;
  --text-code: #f92672;
  --text-inverse: #272822;
  --button-text: #f8f8f2;
  
  --shadow-glow: 0 0 10px rgba(102,217,239,0.5);
  --shadow-inset: inset 0 2px 4px rgba(0,0,0,0.3);
}
```

### 3. tokyo-night.css - MAJOR
**Issues:** Missing modal, tooltip, and highlight variables

```css
/* Add these to match Tokyo Night palette */
:root {
  --bg-modal: #1f2335;
  --bg-tooltip: #292e42;
  --bg-input: #1a1e2e;
  --bg-highlight: #3b4261;
  --text-code: #ff9e64;
  --text-inverse: #1a1b26;
  --button-text: #c0caf5;
}
```

### 4. cyberpunk.css - MAJOR
**Issues:** Semi-transparent tooltips, extreme effects

```css
/* Fix transparent tooltip background */
:root {
  --bg-tooltip: #FF00FF; /* Remove transparency - was #FF00FFee */
}

/* Add performance optimization */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* Add font fallbacks */
body {
  font-family: 'Orbitron', 'Roboto Mono', monospace;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Rajdhani', 'Roboto', sans-serif;
}
```

### 5. dark.css & light.css - MAJOR
**Issues:** Missing extended variables

For dark.css:
```css
:root {
  --bg-modal: #2d2d2d;
  --bg-tooltip: #3d3d3d;
  --bg-input: #1d1d1d;
  --bg-highlight: #4d4d4d;
  --text-link: #5c9fd8;
  --text-code: #d7ba7d;
  --text-inverse: #1e1e1e;
}
```

For light.css:
```css
:root {
  --bg-modal: #ffffff;
  --bg-tooltip: #f0f0f0;
  --bg-input: #ffffff;
  --bg-highlight: #ffeb3b;
  --text-link: #0066cc;
  --text-code: #d73a49;
  --text-inverse: #ffffff;
}
```

## Contrast Ratio Fixes

### Testing Contrast
Use this function in the browser console:

```javascript
// Test contrast between two theme colors
function testContrast(var1, var2) {
  const color1 = getComputedStyle(document.documentElement).getPropertyValue(var1);
  const color2 = getComputedStyle(document.documentElement).getPropertyValue(var2);
  return window.themeTests.contrastRatio(color1, color2);
}

// Example:
testContrast('--bg-primary', '--text-muted');
```

### Minimum Contrast Requirements
- Normal text: 4.5:1
- Large text: 3:1  
- UI components: 3:1

### Common Fixes for Low Contrast

1. **Dark themes with low contrast muted text:**
   ```css
   /* Instead of #666666 on #1a1a1a */
   --text-muted: #999999; /* Lighter gray */
   ```

2. **Light themes with low contrast muted text:**
   ```css
   /* Instead of #999999 on #ffffff */
   --text-muted: #666666; /* Darker gray */
   ```

3. **Colored text on colored backgrounds:**
   ```css
   /* Ensure sufficient lightness difference */
   --text-link: hsl(210, 100%, 65%); /* Bright blue on dark */
   --text-link: hsl(210, 100%, 40%); /* Dark blue on light */
   ```

## Performance Optimizations

### For Animation-Heavy Themes

1. **Add reduced motion support:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

2. **Optimize shadows and effects:**
```css
/* Instead of multiple box-shadows */
.element {
  box-shadow: 
    0 0 10px rgba(255,0,255,0.5),
    0 0 20px rgba(255,0,255,0.3),
    0 0 30px rgba(255,0,255,0.1);
}

/* Use single shadow with spread */
.element {
  box-shadow: 0 0 20px 10px rgba(255,0,255,0.3);
}
```

3. **Limit animation targets:**
```css
/* Instead of animating all properties */
.element {
  transition: all 0.3s ease;
}

/* Animate specific properties */
.element {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
```

## Testing Your Fixes

1. **Load the visual test script:**
   ```javascript
   const script = document.createElement('script');
   script.src = 'theme-visual-test.js';
   document.head.appendChild(script);
   ```

2. **Test your theme:**
   ```javascript
   window.themeTests.testTheme('your-theme-name');
   ```

3. **Check specific variables:**
   ```javascript
   window.themeTests.checkVariable('--bg-modal');
   ```

## Validation Checklist

Before considering a theme fixed:

- [ ] All required CSS variables are defined
- [ ] No variables have 'transparent' or 'inherit' values (unless intentional)
- [ ] All text/background combinations pass contrast requirements
- [ ] Modal and tooltip backgrounds are opaque
- [ ] Focus states are clearly visible
- [ ] Hover states work on all interactive elements
- [ ] Theme works in both Firefox and Chrome
- [ ] No console errors when switching to theme
- [ ] Reduced motion media query is respected
- [ ] All UI components are visible and styled

## Adding Automated Validation

Add this to your build process:

```javascript
// theme-validator.js
const requiredVars = [
  '--bg-primary', '--bg-secondary', '--bg-sidebar',
  '--text-primary', '--text-muted', '--text-heading',
  '--bg-modal', '--bg-tooltip', '--bg-input',
  '--bg-highlight', '--text-link', '--text-code',
  '--text-inverse', '--button-text'
];

function validateTheme(themePath) {
  const css = fs.readFileSync(themePath, 'utf8');
  const missing = [];
  
  requiredVars.forEach(varName => {
    if (!css.includes(varName)) {
      missing.push(varName);
    }
  });
  
  if (missing.length > 0) {
    console.error(`Theme ${themePath} missing variables:`, missing);
    return false;
  }
  
  return true;
}
```

## Common Patterns for Theme Families

### Material Design Themes
```css
--shadow-sm: none;
--shadow-md: 0 2px 4px rgba(0,0,0,0.2);
--shadow-lg: 0 8px 16px rgba(0,0,0,0.3);
--border-radius: 4px;
```

### Flat/Modern Themes  
```css
--shadow-sm: none;
--shadow-md: none;
--shadow-lg: 0 0 0 1px var(--border-color);
--border-radius: 0;
```

### Glassmorphism Themes
```css
--bg-modal: rgba(255,255,255,0.1);
--backdrop-filter: blur(10px);
--border-color: rgba(255,255,255,0.2);
```

Remember: The goal is to ensure every theme provides a complete, accessible, and visually consistent experience across all features of the Notes Wiki application.