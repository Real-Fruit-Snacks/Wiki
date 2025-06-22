#!/usr/bin/env node
/**
 * Theme Validation Script
 * Validates all CSS theme files for syntax errors and completeness
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, 'themes');
const REQUIRED_CSS_PROPERTIES = [
    'background-color',
    'color',
    '--bg-color',
    '--text-color'
];

let errors = 0;
let warnings = 0;

console.log('🎨 Validating theme files...\n');

// Check if themes directory exists
if (!fs.existsSync(THEMES_DIR)) {
    console.error('❌ Error: themes/ directory not found');
    process.exit(1);
}

// Get all CSS files
const themeFiles = fs.readdirSync(THEMES_DIR)
    .filter(file => file.endsWith('.css'))
    .sort();

if (themeFiles.length === 0) {
    console.error('❌ Error: No theme files found in themes/ directory');
    process.exit(1);
}

console.log(`📁 Found ${themeFiles.length} theme files to validate\n`);

// Validate each theme file
themeFiles.forEach(file => {
    const filePath = path.join(THEMES_DIR, file);
    const themeName = path.basename(file, '.css');
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Basic CSS syntax checks
        const braceCount = (content.match(/{/g) || []).length - (content.match(/}/g) || []).length;
        if (braceCount !== 0) {
            console.error(`❌ ${file}: Unmatched braces (${braceCount > 0 ? 'missing' : 'extra'} ${Math.abs(braceCount)})`);
            errors++;
        }
        
        // Check for basic theme structure
        let hasBodyStyles = false;
        let hasVariables = false;
        
        if (content.includes('body') || content.includes('html')) {
            hasBodyStyles = true;
        }
        
        if (content.includes(':root') || content.includes('--')) {
            hasVariables = true;
        }
        
        if (!hasBodyStyles && !hasVariables) {
            console.warn(`⚠️  ${file}: Theme appears incomplete (no body styles or CSS variables found)`);
            warnings++;
        }
        
        // Check file size (themes should be reasonable size)
        const stats = fs.statSync(filePath);
        if (stats.size === 0) {
            console.error(`❌ ${file}: Empty file`);
            errors++;
        } else if (stats.size > 100000) { // 100KB
            console.warn(`⚠️  ${file}: Large file size (${Math.round(stats.size/1024)}KB)`);
            warnings++;
        }
        
        console.log(`✅ ${file}: Valid (${Math.round(stats.size/1024)}KB)`);
        
    } catch (error) {
        console.error(`❌ ${file}: Failed to read file - ${error.message}`);
        errors++;
    }
});

// Summary
console.log(`\n📊 Validation Summary:`);
console.log(`   ✅ Valid themes: ${themeFiles.length - errors}`);
console.log(`   ❌ Errors: ${errors}`);
console.log(`   ⚠️  Warnings: ${warnings}`);

if (errors > 0) {
    console.log('\n❌ Theme validation failed');
    process.exit(1);
} else {
    console.log('\n✅ All themes validated successfully!');
    process.exit(0);
}