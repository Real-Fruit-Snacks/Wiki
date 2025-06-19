#!/usr/bin/env node

// Script to add prefers-reduced-motion support to animation-heavy themes
const fs = require('fs');
const path = require('path');

const REDUCED_MOTION_CSS = `
/* Performance optimization for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}`;

// Themes that need reduced motion support (from validation output)
const THEMES_NEEDING_REDUCED_MOTION = [
    '2077',
    'aero-glass',
    'atom-one-light',
    'ayu-dark',
    'ayu-light',
    'ayu-mirage',
    'bluloco-dark',
    'bluloco-light',
    'catppuccin-latte',
    'catppuccin-mocha',
    'cobalt2',
    'dracula',
    'everforest-dark',
    'github-dark',
    'github-light',
    'gruvbox-dark',
    'gruvbox-light',
    'hackthebox',
    'holographic-blue',
    'hotdog-stand',
    'kanagawa',
    'lucario',
    'luxury-gold',
    'material-darker',
    'material-ocean',
    'material-palenight',
    'neon-galaxy',
    'noctis',
    'nord',
    'nordic',
    'one-dark-pro',
    'oxocarbon',
    'palenight',
    'protonmail',
    'rose-pine-dawn',
    'rose-pine',
    'shades-of-purple',
    'solarized-dark',
    'solarized-light',
    'spacegray',
    'sunset-dreams',
    'tokyo-night',
    'tomorrow-night',
    'vaporwave',
    'vscode-dark-plus',
    'winter-is-coming-dark',
    'winter-is-coming-light',
    'witch-hazel',
    'zenburn'
];

function addReducedMotion(themePath) {
    const content = fs.readFileSync(themePath, 'utf8');
    
    // Check if already has reduced motion support
    if (content.includes('prefers-reduced-motion')) {
        console.log(`✓ ${path.basename(themePath)} already has reduced motion support`);
        return false;
    }
    
    // Add the CSS at the end of the file
    const updatedContent = content + '\n' + REDUCED_MOTION_CSS;
    fs.writeFileSync(themePath, updatedContent);
    console.log(`✓ Added reduced motion support to ${path.basename(themePath)}`);
    return true;
}

// Main execution
function main() {
    const themesDir = path.join(__dirname, 'themes');
    let updated = 0;
    
    for (const themeName of THEMES_NEEDING_REDUCED_MOTION) {
        const themePath = path.join(themesDir, `${themeName}.css`);
        if (fs.existsSync(themePath)) {
            if (addReducedMotion(themePath)) {
                updated++;
            }
        } else {
            console.error(`✗ Theme file not found: ${themeName}.css`);
        }
    }
    
    console.log(`\nTotal themes updated: ${updated}`);
}

if (require.main === module) {
    main();
}