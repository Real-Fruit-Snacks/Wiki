# Theme Badge Text Contrast Analysis

## Problem Overview
The `--badge-text` color is used for text that appears on top of `--accent-primary` backgrounds in several UI elements:
- Active context buttons with count badges
- Active file tree links in the sidebar
- Tag hover states
- Active quick note tabs
- Various badge elements

## Dark Theme Analysis

### Themes with Poor Contrast (Dark text on potentially light/medium accents)

1. **Dracula**
   - `--accent-primary: #bd93f9` (medium purple)
   - `--badge-text: #282a36` (very dark)
   - Potential issue: Dark text on medium purple background

2. **Monokai**
   - `--accent-primary: #66d9ef` (bright cyan)
   - `--badge-text: #272822` (very dark)
   - Potential issue: Dark text on bright cyan background

3. **Night Owl**
   - `--accent-primary: #82aaff` (medium blue)
   - `--badge-text: #011627` (very dark)
   - Potential issue: Dark text on medium blue background

4. **Catppuccin Mocha**
   - `--accent-primary: #89b4fa` (light blue)
   - `--badge-text: #1e1e2e` (very dark)
   - Potential issue: Dark text on light blue background

5. **Ayu Dark**
   - `--accent-primary: #39bae6` (bright cyan)
   - `--badge-text: #0a0e14` (very dark)
   - Potential issue: Dark text on bright cyan background

6. **Ayu Mirage**
   - `--accent-primary: #5ccfe6` (bright cyan)
   - `--badge-text: #1f2430` (very dark)
   - Potential issue: Dark text on bright cyan background

7. **Material Darker**
   - `--accent-primary: #80cbc4` (light teal)
   - `--badge-text: #212121` (very dark)
   - Potential issue: Dark text on light teal background

### Themes with Good Contrast (White text)

1. **One Dark Pro**
   - `--accent-primary: #61afef` (medium blue)
   - `--badge-text: #ffffff` (white)
   - Good contrast

2. **Tokyo Night**
   - `--accent-primary: #7aa2f7` (light blue)
   - `--badge-text: #ffffff` (white)
   - Good contrast

3. **VS Code Dark Plus**
   - `--accent-primary: #0e639c` (dark blue)
   - `--badge-text: #ffffff` (white)
   - Good contrast

4. **Gruvbox Dark**
   - `--accent-primary: #83a598` (muted teal)
   - `--badge-text: #ffffff` (white)
   - Good contrast

5. **Nord**
   - `--accent-primary: #88c0d0` (light cyan)
   - `--badge-text: #ffffff` (white)
   - Good contrast

## Other Dark Themes Found

8. **2077**
   - `--accent-primary: #0ef3ff` (very bright cyan)
   - `--badge-text: #030d22` (extremely dark)
   - SEVERE contrast issue: Nearly black text on bright cyan

9. **Amber Interface**
   - `--accent-primary: #ff9900` (bright orange)
   - `--badge-text: #0a0400` (nearly black)
   - SEVERE contrast issue: Black text on bright orange

10. **Andromeda**
    - `--accent-primary: #00e8c6` (bright teal)
    - `--badge-text: #1a1c20` (very dark)
    - SEVERE contrast issue: Dark text on bright teal

11. **Apprentice**
    - `--accent-primary: #87afd7` (light blue)
    - `--badge-text: #262626` (very dark)
    - Potential issue: Dark text on light blue

## Recommendations

### Themes that need `--badge-text` changed to white:
1. 2077.css
2. amber-interface.css
3. andromeda.css
4. dracula.css
5. monokai.css
6. night-owl.css
7. catppuccin-mocha.css
8. ayu-dark.css
9. ayu-mirage.css
10. material-darker.css
11. apprentice.css

### General Rule
For dark themes, when `--accent-primary` has a lightness value above ~40%, the `--badge-text` should be white (#ffffff) or a very light color to ensure proper contrast ratio for accessibility (WCAG AA standard requires 4.5:1 contrast ratio for normal text).