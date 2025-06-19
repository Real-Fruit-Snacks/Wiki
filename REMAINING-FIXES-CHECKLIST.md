# Remaining Theme Fixes Checklist

## Summary
- **Total themes to fix:** 46 (out of 55 total)
- **Total missing variables:** Various (1-17 per theme)
- **Themes already fixed:** 9 (matrix, monokai, tokyo-night, light, cyberpunk, dark, dracula, everforest-dark, github-dark)

## Categorized by Severity

### 🟢 Quick Fixes (1 variable missing) - 5 themes
- [ ] github-light: `--bg-highlight`
- [ ] gruvbox-dark: `--bg-highlight`
- [ ] gruvbox-light: `--bg-highlight` 
- [ ] hackthebox: `--bg-highlight`
- [ ] holographic-blue: `--bg-highlight`

### 🟡 Easy Fixes (2 variables missing) - 5 themes
- [ ] 2077: `--bg-input`, `--bg-highlight`
- [ ] aero-glass: `--bg-input`, `--bg-highlight`
- [ ] atom-one-light: `--bg-input`, `--bg-highlight`
- [ ] ayu-dark: `--bg-input`, `--bg-highlight`
- [ ] ayu-light: `--bg-input`, `--bg-highlight`

### 🟠 Moderate Fixes (3 variables missing) - 5 themes
- [ ] bluloco-dark: `--bg-input`, `--bg-highlight`, `--text-inverse`
- [ ] bluloco-light: `--bg-input`, `--bg-highlight`, `--text-inverse`
- [ ] catppuccin-latte: `--bg-input`, `--bg-highlight`, `--text-inverse`
- [ ] catppuccin-mocha: `--bg-input`, `--bg-highlight`, `--text-inverse`
- [ ] cobalt2: `--bg-input`, `--bg-highlight`, `--text-inverse`

### 🔴 Major Fixes (8 variables missing) - 29 themes
Missing: `--bg-modal`, `--bg-tooltip`, `--bg-input`, `--bg-highlight`, `--text-link`, `--text-code`, `--text-inverse`, `--button-text`

- [ ] hotdog-stand
- [ ] lucario
- [ ] luxury-gold
- [ ] material-darker
- [ ] material-ocean
- [ ] material-palenight
- [ ] neon-galaxy
- [ ] noctis
- [ ] nord
- [ ] nordic
- [ ] one-dark-pro
- [ ] oxocarbon
- [ ] palenight
- [ ] protonmail
- [ ] rose-pine-dawn
- [ ] rose-pine
- [ ] shades-of-purple
- [ ] solarized-dark
- [ ] solarized-light
- [ ] spacegray
- [ ] sunset-dreams
- [ ] thinkultra
- [ ] tomorrow-night
- [ ] vaporwave
- [ ] vscode-dark-plus
- [ ] winter-is-coming-dark
- [ ] winter-is-coming-light
- [ ] witch-hazel
- [ ] zenburn

### 🔴 Critical Fixes (9+ variables missing) - 2 themes
- [ ] kanagawa: 9 variables (including `--bg-selection`, `--shadow-xl`)
- [ ] ayu-mirage: 17 variables (most incomplete theme)

## Fix Strategy

### For `--bg-highlight` (yellow highlight for selected text):
- Light themes: Light yellow (#fef3c7 or similar)
- Dark themes: Dark yellow/amber with opacity (#fbbf2433 or similar)

### For `--bg-input` (form input backgrounds):
- Light themes: Pure white (#ffffff) or very light gray
- Dark themes: Slightly darker than primary background

### For `--text-inverse` (text on opposite backgrounds):
- Light themes: White (#ffffff)
- Dark themes: Dark color matching primary background

### For full 8-variable fixes:
Need to analyze each theme's color palette to choose appropriate colors for:
- Modal backgrounds
- Tooltip backgrounds
- Link colors
- Code colors
- Button text

## Execution Plan
1. Start with quick fixes (1 variable) - fastest wins
2. Move to easy fixes (2 variables)
3. Handle moderate fixes (3 variables)
4. Tackle major fixes in batches of 5
5. Fix critical themes last (most complex)