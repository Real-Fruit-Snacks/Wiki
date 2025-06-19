# Theme Color Plan - Detailed Variable Assignments

## Understanding the Variables

Based on analysis of where these CSS variables are used:

- `--bg-modal`: Background for modal dialogs (settings, search, etc.)
- `--bg-tooltip`: Background for hover tooltips
- `--bg-input`: Background for form inputs and textareas
- `--bg-highlight`: Background for selected/highlighted text
- `--text-link`: Color for hyperlinks
- `--text-code`: Color for inline code snippets
- `--text-inverse`: Text color for use on light backgrounds (opposite of primary)
- `--button-text`: Text color specifically for buttons

## Matrix Theme Color Plan

Current palette analysis:
- Primary green: #00FF41 (bright matrix green)
- Secondary green: #008F11 (medium green)
- Muted green: #006600 (dark green - too dark, causes contrast issues)
- Dark backgrounds: #0D0208 (near black), #003B00 (very dark green)

### Planned additions:
```css
--bg-modal: #001100;        /* Very dark green, slightly lighter than primary bg */
--bg-tooltip: #003300;      /* Dark green with good contrast for text */
--bg-input: #001a00;        /* Slightly different from code bg for distinction */
--bg-highlight: #00FF4133;  /* Semi-transparent bright green (already defined) */
--text-link: #00FF41;       /* Same as primary accent for consistency */
--text-code: #41FF00;       /* Slightly different green shade for distinction */
--text-inverse: #000000;    /* Black for use on green backgrounds */
--button-text: #00FF41;     /* Bright green to match theme */

/* Fix contrast issue */
--text-muted: #00AA00;      /* Brighter than current #006600 for better contrast */
```

## Monokai Theme Color Plan

Current palette analysis:
- Background: #272822 (dark brown-gray)
- Text: #f8f8f2 (off-white)
- Accent colors: #66d9ef (cyan), #a6e22e (green), #e6db74 (yellow), #f92672 (pink)

### Planned additions:
```css
--bg-modal: #1e1f1a;        /* Darker than primary for modal overlay feel */
--bg-tooltip: #3e3d32;      /* Same as secondary bg for consistency */
--bg-input: #1e1f1c;        /* Darker than primary for input distinction */
--bg-highlight: #e6db7433;  /* Semi-transparent yellow for text selection */
--text-link: #66d9ef;       /* Cyan - matches accent primary */
--text-code: #e6db74;       /* Yellow - matches string color in syntax */
--text-inverse: #272822;    /* Primary bg color for light-on-dark scenarios */
--button-text: #f8f8f2;     /* Primary text color for readability */
```

## Tokyo Night Theme Color Plan

Current palette analysis:
- Backgrounds: #1a1b26 (primary), #24283b (secondary), #292e42 (sidebar)
- Text: #a9b1d6 (primary), #9aa5ce (secondary)
- Neon colors: #7aa2f7 (blue), #7dcfff (cyan), #bb9af7 (purple), #ff9e64 (orange)

### Planned additions:
```css
--bg-modal: #16161e;        /* Darker than primary for modal depth */
--bg-tooltip: #292e42;      /* Match sidebar bg for consistency */
--bg-input: #1f2335;        /* Between primary and secondary */
--bg-highlight: #7aa2f733;  /* Semi-transparent blue accent */
--text-link: #7dcfff;       /* Neon cyan for links */
--text-code: #ff9e64;       /* Orange - matches property color in syntax */
--text-inverse: #1a1b26;    /* Primary bg for inverse scenarios */
--button-text: #c0caf5;     /* Lighter than primary text for emphasis */
```

## Light Theme Color Plan

Current palette analysis:
- Backgrounds: #ffffff (primary), #f9fafb (secondary), #f3f4f6 (sidebar)
- Text: #111827 (primary), #6b7280 (secondary), #9ca3af (muted)
- Accent: #3b82f6 (blue)

### Planned additions:
```css
--bg-modal: #ffffffee;      /* Semi-transparent white for modal overlay */
--bg-tooltip: #1f2937;      /* Dark tooltip for contrast on light bg */
--bg-input: #ffffff;        /* Pure white with border for definition */
--bg-highlight: #fef3c7;    /* Light yellow for text selection */
--text-link: #2563eb;       /* Slightly darker blue than accent */
--text-code: #dc2626;       /* Red - matches property color in syntax */
--text-inverse: #ffffff;    /* White for dark backgrounds */
--button-text: #111827;     /* Primary text color */
```

## Dark Theme Color Plan

Analysis shows dark.css is already complete with all variables properly defined.
No changes needed.

## Cyberpunk Theme Color Plan

Only issue is semi-transparent tooltip background.

### Planned change:
```css
/* Current */
--bg-tooltip: #FF00FFee;    /* 93% opacity - causes readability issues */

/* Fixed */
--bg-tooltip: #1a0033;      /* Solid dark purple background */
```

Also add performance optimization:
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

## Implementation Order

1. **Critical fixes first:**
   - matrix.css (most broken)
   - monokai.css 
   - tokyo-night.css

2. **Major fixes:**
   - light.css
   - cyberpunk.css (tooltip + performance)

3. **Validation:**
   - Test each theme after fixes
   - Verify contrast ratios
   - Check all UI components