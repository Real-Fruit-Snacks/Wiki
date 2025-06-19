#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// All required CSS variables that every theme must define
const REQUIRED_VARIABLES = [
  // Core backgrounds
  '--bg-primary',
  '--bg-secondary',
  '--bg-sidebar',
  '--bg-code',
  '--bg-selection',
  '--bg-dropdown',
  '--bg-hover',
  '--bg-tag',
  '--bg-modal',
  '--bg-tooltip',
  '--bg-input',
  '--bg-highlight',
  
  // Core text colors
  '--text-primary',
  '--text-secondary',
  '--text-muted',
  '--text-heading',
  '--text-link',
  '--text-code',
  '--text-inverse',
  
  // Accent colors
  '--accent-primary',
  '--accent-secondary',
  '--accent-warning',
  '--accent-error',
  '--accent-info',
  '--accent-success',
  
  // Border colors
  '--border-primary',
  '--border-secondary',
  
  // Button colors
  '--button-bg',
  '--button-hover',
  '--button-active',
  '--button-text',
  
  // Badge colors
  '--badge-bg',
  '--badge-text',
  
  // Shadows
  '--shadow-sm',
  '--shadow-md',
  '--shadow-lg',
  '--shadow-xl'
];

// Optional but recommended variables
const RECOMMENDED_VARIABLES = [
  '--shadow-glow',
  '--shadow-inset',
  '--accent-primary-light',
  '--accent-primary-dark',
  '--border-default',
  '--border-hover'
];

// Variables that should not be transparent (unless intentionally)
const NO_TRANSPARENT = [
  '--bg-modal',
  '--bg-tooltip',
  '--bg-input',
  '--text-primary',
  '--text-secondary',
  '--text-heading',
  '--text-link',
  '--text-code',
  '--button-text'
];

class ThemeValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.themesChecked = 0;
  }

  validateTheme(themePath) {
    const themeName = path.basename(themePath, '.css');
    console.log(`\\nValidating theme: ${themeName}`);
    
    try {
      const content = fs.readFileSync(themePath, 'utf8');
      this.checkRequiredVariables(themeName, content);
      this.checkRecommendedVariables(themeName, content);
      this.checkTransparency(themeName, content);
      this.checkContrast(themeName, content);
      this.checkPerformance(themeName, content);
      this.themesChecked++;
    } catch (error) {
      this.errors.push(`Failed to read ${themeName}: ${error.message}`);
    }
  }

  checkRequiredVariables(themeName, content) {
    const missing = [];
    
    for (const variable of REQUIRED_VARIABLES) {
      const regex = new RegExp(`${variable}\\s*:`);
      if (!regex.test(content)) {
        missing.push(variable);
      }
    }
    
    if (missing.length > 0) {
      this.errors.push({
        theme: themeName,
        type: 'MISSING_REQUIRED',
        variables: missing,
        message: `Missing ${missing.length} required variables`
      });
    }
  }

  checkRecommendedVariables(themeName, content) {
    const missing = [];
    
    for (const variable of RECOMMENDED_VARIABLES) {
      const regex = new RegExp(`${variable}\\s*:`);
      if (!regex.test(content)) {
        missing.push(variable);
      }
    }
    
    if (missing.length > 0) {
      this.warnings.push({
        theme: themeName,
        type: 'MISSING_RECOMMENDED',
        variables: missing,
        message: `Missing ${missing.length} recommended variables`
      });
    }
  }

  checkTransparency(themeName, content) {
    const issues = [];
    
    for (const variable of NO_TRANSPARENT) {
      const regex = new RegExp(`${variable}\\s*:\\s*([^;]+);`);
      const match = content.match(regex);
      
      if (match) {
        const value = match[1].trim();
        if (value === 'transparent' || 
            value === 'rgba(0, 0, 0, 0)' || 
            value === 'rgba(255, 255, 255, 0)' ||
            value.match(/[0-9a-fA-F]{6}[0-9a-fA-F]{2}$/)) { // Hex with alpha < FF
          issues.push(`${variable}: ${value}`);
        }
      }
    }
    
    if (issues.length > 0) {
      this.warnings.push({
        theme: themeName,
        type: 'TRANSPARENCY_ISSUE',
        variables: issues,
        message: `Found ${issues.length} potentially problematic transparent values`
      });
    }
  }

  checkContrast(themeName, content) {
    // Basic check for same color text and background
    const bgPrimary = this.extractColorValue(content, '--bg-primary');
    const textPrimary = this.extractColorValue(content, '--text-primary');
    const textMuted = this.extractColorValue(content, '--text-muted');
    
    if (bgPrimary && textPrimary && bgPrimary === textPrimary) {
      this.errors.push({
        theme: themeName,
        type: 'CONTRAST_FAILURE',
        message: 'Text primary color matches background (invisible text)'
      });
    }
    
    // Check for very dark muted text
    if (textMuted && textMuted.match(/#0{4,6}|#0{2}[0-9a-fA-F]{4}/)) {
      this.warnings.push({
        theme: themeName,
        type: 'CONTRAST_WARNING',
        message: 'Very dark muted text color may have poor contrast'
      });
    }
  }

  checkPerformance(themeName, content) {
    // Check for animation-heavy themes without reduced motion support
    const hasAnimations = content.match(/@keyframes|animation:|transition:/g);
    const hasReducedMotion = content.includes('prefers-reduced-motion');
    
    if (hasAnimations && hasAnimations.length > 10 && !hasReducedMotion) {
      this.warnings.push({
        theme: themeName,
        type: 'PERFORMANCE',
        message: 'Heavy animations without prefers-reduced-motion support'
      });
    }
  }

  extractColorValue(content, variable) {
    const regex = new RegExp(`${variable}\\s*:\\s*([^;]+);`);
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  printReport() {
    console.log('\\n' + '='.repeat(60));
    console.log('THEME VALIDATION REPORT');
    console.log('='.repeat(60));
    console.log(`\\nThemes checked: ${this.themesChecked}`);
    console.log(`Errors found: ${this.errors.length}`);
    console.log(`Warnings found: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\\n' + '─'.repeat(60));
      console.log('ERRORS (Must Fix):');
      console.log('─'.repeat(60));
      
      for (const error of this.errors) {
        console.log(`\\n❌ ${error.theme}: ${error.message}`);
        if (error.variables) {
          console.log('   Missing variables:');
          for (const v of error.variables) {
            console.log(`   - ${v}`);
          }
        }
      }
    }
    
    if (this.warnings.length > 0) {
      console.log('\\n' + '─'.repeat(60));
      console.log('WARNINGS (Should Fix):');
      console.log('─'.repeat(60));
      
      for (const warning of this.warnings) {
        console.log(`\\n⚠️  ${warning.theme}: ${warning.message}`);
        if (warning.variables) {
          console.log('   Details:');
          for (const v of warning.variables) {
            console.log(`   - ${v}`);
          }
        }
      }
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\\n✅ All themes passed validation!');
    }
    
    console.log('\\n' + '='.repeat(60));
    
    // Return exit code based on errors
    return this.errors.length === 0 ? 0 : 1;
  }
}

// Main execution
function main() {
  const validator = new ThemeValidator();
  const themesDir = path.join(__dirname, 'themes');
  
  console.log('Starting theme validation...');
  console.log(`Checking themes in: ${themesDir}`);
  
  try {
    const files = fs.readdirSync(themesDir);
    const cssFiles = files.filter(f => f.endsWith('.css'));
    
    console.log(`Found ${cssFiles.length} theme files`);
    
    for (const file of cssFiles) {
      validator.validateTheme(path.join(themesDir, file));
    }
    
    const exitCode = validator.printReport();
    
    // Optionally write report to file
    if (process.argv.includes('--output')) {
      const report = {
        date: new Date().toISOString(),
        themesChecked: validator.themesChecked,
        errors: validator.errors,
        warnings: validator.warnings
      };
      fs.writeFileSync('theme-validation-report.json', JSON.stringify(report, null, 2));
      console.log('\\nReport saved to theme-validation-report.json');
    }
    
    process.exit(exitCode);
    
  } catch (error) {
    console.error(`Failed to validate themes: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for use in other scripts
module.exports = {
  ThemeValidator,
  REQUIRED_VARIABLES,
  RECOMMENDED_VARIABLES
};