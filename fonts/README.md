# Self-Contained Font Loading Guide

This directory contains web fonts and the CSS declarations needed for self-contained font loading in the Notes Wiki application.

## Directory Structure

```
fonts/
├── fonts.css           # @font-face declarations
├── README.md          # This file
└── [font files]       # .woff2 and .woff font files
```

## Implementation Steps

### 1. Add Font Files

Place your web font files in this directory. Recommended formats:
- `.woff2` (primary, better compression)
- `.woff` (fallback for older browsers)

Example font files you would add:
- `Inter-Regular.woff2`, `Inter-Regular.woff`
- `Inter-Medium.woff2`, `Inter-Medium.woff`
- `Inter-SemiBold.woff2`, `Inter-SemiBold.woff`
- `Inter-Bold.woff2`, `Inter-Bold.woff`
- `JetBrainsMono-Regular.woff2`, `JetBrainsMono-Regular.woff`
- `JetBrainsMono-Bold.woff2`, `JetBrainsMono-Bold.woff`

### 2. Update fonts.css

The `fonts.css` file contains @font-face declarations. Modify it to match your font files:

```css
@font-face {
    font-family: 'Your Font Name';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('./YourFont-Regular.woff2') format('woff2'),
         url('./YourFont-Regular.woff') format('woff');
}
```

### 3. Integration Methods

#### Option A: Manual Loading in index.html

Add after the style.css loading script:

```javascript
// Load custom fonts
(function() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = basePath ? `${basePath}fonts/fonts.css` : 'fonts/fonts.css';
    link.onload = function() {
        document.body.classList.add('custom-fonts-loaded');
    };
    document.head.appendChild(link);
})();
```

#### Option B: Import in style.css

Add at the top of style.css:

```css
@import url('./fonts/fonts.css');
```

#### Option C: Dynamic Loading with Font Loading API

```javascript
// Check if fonts are loaded
if ('fonts' in document) {
    document.fonts.ready.then(function() {
        document.body.classList.add('fonts-loaded');
    });
}
```

### 4. Update CSS Variables

Once fonts are loaded, update the CSS custom properties in style.css:

```css
/* When custom fonts are available */
.custom-fonts-loaded {
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    --font-mono: 'JetBrains Mono', Consolas, Monaco, "Andale Mono", monospace;
}
```

## Font Optimization Tips

1. **Use WOFF2**: Provides 30% better compression than WOFF
2. **Subset fonts**: Include only needed characters
3. **Use font-display: swap**: Ensures text remains visible during font load
4. **Preload critical fonts**: Add to index.html:
   ```html
   <link rel="preload" href="fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
   ```

## Recommended Open Source Fonts

- **Sans-serif**: Inter, Open Sans, Source Sans Pro, Roboto
- **Serif**: Source Serif Pro, Crimson Text, Lora
- **Monospace**: JetBrains Mono, Fira Code, Source Code Pro

## Font Sources

- [Google Fonts](https://fonts.google.com/) - Download as web fonts
- [Font Squirrel](https://www.fontsquirrel.com/) - Web font generator
- [Everything Fonts](https://everythingfonts.com/) - Web font converter

## Testing

After implementation:
1. Check browser DevTools Network tab to ensure fonts load
2. Verify fallback fonts work if custom fonts fail
3. Test on slow connections to ensure text remains visible
4. Check font rendering across different browsers