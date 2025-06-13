---
title: Code Block Features Demo
tags: [demo, code-blocks, syntax-highlighting, line-numbers]
created: 2025-01-06
author: Wiki Admin
description: Comprehensive demonstration of all code block features including line numbers, word wrap, collapsible blocks, and syntax highlighting
updated: 2025-06-13
---

# Code Block Features Demo

This page demonstrates all the advanced code block features available in the Notes Wiki system, including the new CSS counter-based line numbers that properly align with word-wrapped text.

## Simple JavaScript Code Block

```javascript
console.log('Hello, world!');
const x = 42;
function test() {
    return x * 2;
}
```

## Python Code Block with Title

```python title:"Example Python Script"
def hello():
    print("Hello from Python")
    return True

if __name__ == "__main__":
    hello()
```

## Plain Code Block (no language)

```
This is plain text
without any highlighting
just regular monospace
```

## Bash Code Block

```bash
#!/bin/bash
echo "Testing bash highlighting"
ls -la
grep "pattern" file.txt
```

## HTML Code Block

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

## CSS Code Block

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.code-block {
    background: #282c34;
    padding: 1rem;
}
```

## Inline Code

Here's some inline code: `const inline = 'test';` within a paragraph.

## Empty Code Block

```javascript
```

## Key Features

### ✨ Line Numbers
Toggle line numbers on/off using the settings or the line number button. The new CSS counter implementation ensures perfect alignment even when text wraps to multiple lines.

### 🔧 Word Wrap
Enable word wrap for long lines. Line numbers stay perfectly aligned with their logical lines, solving the previous alignment issues.

### 📱 Copy Button
Every code block has a copy button that handles HTML entities correctly and preserves formatting.

### 🎨 Syntax Highlighting
Support for 100+ programming languages using Prism.js with beautiful themes.

### 📁 Collapsible Blocks
Use `collapse:true` to create collapsible code sections that start collapsed.

### 🏷️ Titles
Add descriptive titles to code blocks using `title:"Your Title"`.

## Advanced Examples

### Collapsible Code Block

```javascript title:"Advanced Theme Manager" collapse:"true"
// This code block demonstrates the collapsible feature
class AdvancedThemeManager {
    constructor(options = {}) {
        this.themes = new Map();
        this.currentTheme = null;
        this.observers = new Set();
        this.autoDetect = options.autoDetect ?? true;
        this.persistSettings = options.persist ?? true;
        
        // Initialize system theme detection
        if (this.autoDetect) {
            this.initializeSystemThemeDetection();
        }
    }
    
    initializeSystemThemeDetection() {
        // Check for system theme preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Set initial theme based on system preference
        this.handleSystemThemeChange(mediaQuery);
        
        // Listen for system theme changes
        mediaQuery.addListener(this.handleSystemThemeChange.bind(this));
    }
    
    handleSystemThemeChange(mediaQuery) {
        const prefersDark = mediaQuery.matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        
        if (this.autoDetect && !this.hasUserPreference()) {
            this.applyTheme(systemTheme);
        }
        
        this.notifyObservers('system-theme-changed', { prefersDark, systemTheme });
    }
    
    registerTheme(id, theme) {
        if (!theme.name || !theme.css) {
            throw new Error('Theme must have name and css properties');
        }
        
        this.themes.set(id, {
            id,
            ...theme,
            registered: new Date().toISOString()
        });
        
        this.notifyObservers('theme-registered', { id, theme });
    }
    
    async applyTheme(themeId) {
        const theme = this.themes.get(themeId);
        if (!theme) {
            throw new Error(`Theme '${themeId}' not found`);
        }
        
        try {
            // Remove existing theme
            if (this.currentTheme) {
                document.documentElement.removeAttribute('data-theme');
                this.removeThemeCSS(this.currentTheme.id);
            }
            
            // Apply new theme
            await this.injectThemeCSS(theme);
            document.documentElement.setAttribute('data-theme', themeId);
            
            this.currentTheme = theme;
            
            // Persist user preference
            if (this.persistSettings) {
                localStorage.setItem('user-theme-preference', themeId);
            }
            
            this.notifyObservers('theme-changed', { 
                from: this.currentTheme?.id,
                to: themeId,
                theme
            });
            
            return { success: true, theme };
            
        } catch (error) {
            console.error('Failed to apply theme:', error);
            throw new Error(`Theme application failed: ${error.message}`);
        }
    }
    
    async injectThemeCSS(theme) {
        return new Promise((resolve, reject) => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = theme.css;
            linkElement.id = `theme-${theme.id}`;
            
            linkElement.onload = () => resolve();
            linkElement.onerror = () => reject(new Error(`Failed to load theme CSS: ${theme.css}`));
            
            document.head.appendChild(linkElement);
        });
    }
    
    removeThemeCSS(themeId) {
        const existingLink = document.getElementById(`theme-${themeId}`);
        if (existingLink) {
            existingLink.remove();
        }
    }
    
    hasUserPreference() {
        return localStorage.getItem('user-theme-preference') !== null;
    }
    
    addObserver(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Observer must be a function');
        }
        
        this.observers.add(callback);
        
        // Return unsubscribe function
        return () => this.observers.delete(callback);
    }
    
    notifyObservers(event, data) {
        this.observers.forEach(observer => {
            try {
                observer(event, data);
            } catch (error) {
                console.error('Observer error:', error);
            }
        });
    }
    
    getAvailableThemes() {
        return Array.from(this.themes.entries()).map(([id, theme]) => ({
            id,
            name: theme.name,
            type: theme.type || 'unknown',
            description: theme.description
        }));
    }
    
    getCurrentTheme() {
        return this.currentTheme ? { ...this.currentTheme } : null;
    }
    
    resetToSystemDefault() {
        localStorage.removeItem('user-theme-preference');
        
        if (this.autoDetect) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme(prefersDark ? 'dark' : 'light');
        }
    }
}

// Usage example
const themeManager = new AdvancedThemeManager({
    autoDetect: true,
    persist: true
});

// Register themes
themeManager.registerTheme('dark-pro', {
    name: 'Dark Pro',
    type: 'dark',
    description: 'Professional dark theme',
    css: '/themes/dark-pro.css'
});

// Listen for theme changes
const unsubscribe = themeManager.addObserver((event, data) => {
    console.log(`Theme event: ${event}`, data);
});

// Apply theme
themeManager.applyTheme('dark-pro').then(result => {
    console.log('Theme applied successfully:', result);
});
```

### Code Block with Special Characters

```javascript title:"Special Characters & Regex" 
const special = "This has 'quotes' and \"double quotes\" and <html> entities";
const regex = /test\s+pattern/gi;
const template = `
    <div class="code-block">
        <pre><code>${escapeHtml(code)}</code></pre>
    </div>
`;
const obj = { 
    key: "value", 
    nested: { deep: true, symbols: "@#$%^&*()" },
    unicode: "🎨🚀📝✨"
};

// Function to escape HTML entities
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### Long Lines Test (Word Wrap)

```python title:"Word Wrap Demonstration"
# Short line
def example():
    pass

# This is an extremely long line that should wrap when word wrap is enabled - it demonstrates how the new CSS counter-based line numbers stay properly aligned with the logical line even when the text content wraps across multiple visual lines on the screen
def very_long_function_name_that_demonstrates_word_wrapping_behavior_in_code_blocks(parameter_one, parameter_two, parameter_three, parameter_four, parameter_five):
    """
    This function has a very long signature and docstring to test word wrapping behavior.
    The line numbers should remain aligned with the logical lines even when text wraps.
    """
    very_long_variable_name_for_testing = "This is a very long string literal that contains lots of text and should definitely cause line wrapping when word wrap is enabled, testing whether the line number stays aligned with this logical line"
    
    complex_data_structure = {"key1": "value1", "key2": "value2", "key3": "value3", "key4": "value4", "key5": "value5", "key6": "value6", "key7": "value7", "key8": "value8", "key9": "value9", "key10": "value10"}
    
    return very_long_variable_name_for_testing

# Short line again  
print("Done")
```