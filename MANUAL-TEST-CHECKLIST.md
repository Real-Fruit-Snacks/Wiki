# Manual Theme Testing Checklist

## Testing Setup
1. Start local server: `npm run serve`
2. Open browser to http://localhost:8000
3. Open Developer Console (F12) to monitor for errors

## For Each Theme, Test:

### ✓ Core Visual Elements
- [ ] **Sidebar**
  - Background color visible and appropriate
  - Text readable against background
  - Borders/separators visible
  - File tree hover states work
  - Active file highlighting clear
  
- [ ] **Header/Navigation**
  - Background distinct from content
  - All buttons/icons visible
  - Search bar properly styled
  - Context switcher readable

- [ ] **Tab Bar**
  - Active tab clearly distinguished
  - Inactive tabs visible but subdued
  - Tab hover effects work
  - Close buttons visible
  - Tab drag handle visible

- [ ] **Content Area**
  - Background appropriate for reading
  - Text color has good contrast
  - Link colors distinct and visible
  - Selection highlighting works

### ✓ Typography & Code
- [ ] **Text Rendering**
  - Headings clearly hierarchical (h1-h6)
  - Paragraph text readable
  - Bold/italic/code inline styles visible
  - Lists properly indented

- [ ] **Code Blocks**
  - Background distinct from content
  - Syntax highlighting colors visible
  - Line numbers readable (if enabled)
  - Copy button visible and styled
  - Language label visible
  - Code block titles styled

### ✓ Interactive Components
- [ ] **Buttons**
  - Default state visible
  - Hover state distinct
  - Active/pressed state works
  - Disabled state grayed out

- [ ] **Modals/Dialogs**
  - Modal overlay visible
  - Modal background opaque
  - Close button visible
  - Form inputs styled

- [ ] **Dropdowns**
  - Dropdown backgrounds visible
  - Menu items readable
  - Hover states work
  - Selected items highlighted

- [ ] **Search**
  - Search modal properly styled
  - Search results readable
  - Match highlighting visible
  - Result hover states work

### ✓ Special Features
- [ ] **Table of Contents**
  - TOC background/border visible
  - Active section highlighted
  - Hover effects work
  - Collapse/expand works

- [ ] **Callout Blocks** (Test each type)
  - Warning (orange/red)
  - Info (blue)
  - Tip (green)
  - Note (gray)
  - Example (purple)
  - Quote (styled)
  - Each has distinct colors/icons

- [ ] **Focus Mode (F key)**
  - Content properly centered
  - No visual glitches
  - Escape returns to normal

- [ ] **Timer/Pomodoro**
  - Timer display readable
  - Progress bar visible
  - Mode indicators clear

- [ ] **Sticky Notes**
  - All 4 colors work (yellow/blue/green/pink)
  - Shadows visible
  - Resize handles visible
  - Text readable

- [ ] **Toast Notifications**
  - Success (green) visible
  - Error (red) visible
  - Info (blue) visible
  - Auto-dismiss works

### ✓ Responsive Design
- [ ] **Mobile View (resize to <768px)**
  - Sidebar collapses properly
  - Context dropdown appears
  - Content remains readable
  - Touch targets adequate size

### ✓ Accessibility
- [ ] **Contrast Ratios**
  - Text vs background ≥4.5:1
  - Important UI elements ≥3:1
  - Focus indicators visible

- [ ] **Keyboard Navigation**
  - Tab order logical
  - Focus indicators visible
  - All interactive elements reachable

### ✓ Common Issues to Check
1. **Invisible Text**: Text same color as background
2. **Missing Borders**: UI elements blend together
3. **Broken Hover States**: No visual feedback
4. **Transparent Backgrounds**: Modal/dropdown transparency
5. **Color Conflicts**: Clashing color combinations
6. **Missing Shadows**: Flat appearance where depth needed
7. **Overflow Issues**: Text cut off or overlapping
8. **Z-index Problems**: Elements appearing under/over incorrectly

## Testing Order (Grouped by Type)

### Dark Themes
1. dark
2. dracula
3. monokai
4. one-dark-pro
5. material-darker
6. material-ocean
7. material-palenight
8. tokyo-night
9. tomorrow-night
10. vscode-dark-plus
11. ayu-dark
12. ayu-mirage
13. gruvbox-dark
14. nord
15. nordic
16. catppuccin-mocha
17. everforest-dark
18. kanagawa
19. spacegray
20. cobalt2
21. lucario
22. palenight
23. oxocarbon
24. winter-is-coming-dark
25. zenburn
26. solarized-dark
27. witch-hazel
28. noctis
29. bluloco-dark

### Light Themes
1. light
2. github-light
3. atom-one-light
4. solarized-light
5. ayu-light
6. gruvbox-light
7. winter-is-coming-light
8. catppuccin-latte
9. rose-pine-dawn
10. bluloco-light

### Special Effect Themes
1. cyberpunk
2. neon-galaxy
3. matrix
4. 2077
5. holographic-blue
6. vaporwave
7. sunset-dreams
8. hackthebox
9. protonmail
10. rose-pine
11. shades-of-purple
12. luxury-gold
13. aero-glass
14. hotdog-stand
15. thinkultra

## Issue Documentation Format

When issues are found, document as:
```
### Theme: [theme-name]
**Feature:** [affected feature]
**Issue:** [description]
**Severity:** Critical/Major/Minor
**Steps to Reproduce:**
1. [step 1]
2. [step 2]
**Expected:** [what should happen]
**Actual:** [what actually happens]
**Screenshot:** [if applicable]
```