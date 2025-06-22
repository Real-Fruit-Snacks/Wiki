---
title: Troubleshooting Common Issues
tags: [troubleshooting, support, fixes, getting-started]
author: Wiki Team
created: 2024-01-20
updated: 2024-01-20
description: Solutions to common problems and issues you might encounter
---

# Troubleshooting Common Issues

This guide helps you diagnose and fix the most common issues encountered when using the wiki.

## 🔍 Search Issues

### Search Returns No Results

**Symptoms:**
- Search bar appears but returns empty results
- "No results found" message appears for known content

**Causes & Solutions:**

#### 1. Missing or Corrupted Search Index
```bash
# Check if index file exists
ls -la notes-index.json

# If missing, rebuild:
python3 build.py

# If corrupted, validate JSON:
python3 -m json.tool notes-index.json
```

#### 2. Browser Cache Issues
```javascript
// Clear search cache
localStorage.removeItem('notesWiki_searchCache');
// Reload the page
location.reload();
```

#### 3. JavaScript Errors
```bash
# Check browser console (F12) for errors
# Common fixes:
# - Disable browser extensions
# - Try incognito/private mode
# - Clear browser cache
```

### Search Index Not Building

**Error:** `FileNotFoundError: [Errno 2] No such file or directory: 'notes'`

**Solution:**
```bash
# Ensure you're in the correct directory
pwd  # Should show path ending in 'Wiki'
ls   # Should show: index.html, script.js, notes/, etc.

# If in wrong directory:
cd path/to/Wiki
python3 build.py
```

**Error:** `yaml.scanner.ScannerError: while scanning...`

**Solution:**
```bash
# Find problematic YAML frontmatter
find notes/ -name "*.md" -exec python3 -c "
import yaml, sys
try:
    with open(sys.argv[1]) as f:
        content = f.read()
    if content.startswith('---'):
        frontmatter = content.split('---')[1]
        yaml.safe_load(frontmatter)
except Exception as e:
    print(f'ERROR in {sys.argv[1]}: {e}')
" {} \;

# Fix YAML syntax:
# - Use spaces, not tabs
# - Quote strings with colons
# - Check bracket/quote matching
```

## 🎨 Theme Issues

### Themes Not Loading

**Symptoms:**
- Wiki appears with broken styling
- Theme selector shows themes but switching doesn't work
- Console shows 404 errors for CSS files

**Solutions:**

#### 1. Missing Theme Files
```bash
# Check theme directory
ls themes/ | wc -l  # Should show 50+

# List available themes
ls themes/*.css

# If themes missing, re-download the project
```

#### 2. Path Issues (GitHub Pages)
```javascript
// Check base path detection in browser console
console.log(window.location.pathname);

// Should correctly detect GitHub Pages paths
// If issues persist, check _config.yml exists
```

#### 3. Theme Persistence Issues
```javascript
// Reset theme settings
localStorage.removeItem('notesWiki_theme');
localStorage.removeItem('notesWiki_settings');
location.reload();
```

### Custom CSS Not Working

**Check:**
```javascript
// Verify custom CSS is saved
const settings = JSON.parse(localStorage.getItem('notesWiki_settings') || '{}');
console.log(settings.customCSS);

// If empty, custom CSS wasn't saved properly
// Try re-entering in Settings > Appearance > Custom CSS
```

## 📱 Mobile/Responsive Issues

### Layout Broken on Mobile

**Symptoms:**
- Sidebar overlaps content
- Text too small to read
- Buttons too small to tap

**Solutions:**

#### 1. Viewport Meta Tag
```html
<!-- Ensure this exists in index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### 2. Force Responsive Mode
```javascript
// In browser console, force mobile layout
document.body.style.width = '375px';
// Check if layout adapts correctly
```

#### 3. Clear Mobile Settings
```javascript
// Reset responsive settings
localStorage.removeItem('notesWiki_mobileSettings');
location.reload();
```

### Context Dropdown Not Working

**Issue:** Context switcher not changing to dropdown on mobile

**Solution:**
```javascript
// Force rebuild context switcher
// In browser console:
window.app.buildContextSwitcher();
```

## ⌨️ Keyboard Shortcuts

### Shortcuts Not Working

**Common Issues:**

#### 1. Browser Conflicts
```
Problem: Ctrl+T opens new tab instead of new wiki tab
Solution: Use Alt+T instead, or customize shortcuts in Settings
```

#### 2. Focus Issues
```javascript
// Check if shortcuts are registered
console.log(Object.keys(window.app.keyboardShortcuts || {}));

// If empty, shortcuts failed to register
// Try: Settings > Keyboard > Reset to Defaults
```

#### 3. Input Field Focus
```
Problem: Shortcuts don't work when typing in search/notes
Solution: This is expected behavior for safety
```

### Custom Shortcuts Not Saving

**Solution:**
```javascript
// Check settings storage
const settings = JSON.parse(localStorage.getItem('notesWiki_settings'));
console.log(settings.keyboardShortcuts);

// If changes not persisting:
// 1. Check browser storage permissions
// 2. Try different shortcut combination
// 3. Reset to defaults and reconfigure
```

## 📂 File Management Issues

### Notes Not Appearing

**Symptoms:**
- Files exist in `/notes/` directory but don't show in file tree
- Search can't find known content

**Solutions:**

#### 1. File Extension Check
```bash
# Ensure files have .md extension
find notes/ -type f ! -name "*.md"

# Rename if needed:
mv notes/file.txt notes/file.md
```

#### 2. Frontmatter Issues
```markdown
<!-- Ensure proper frontmatter format -->
---
title: Your Note Title
tags: [tag1, tag2]
---

# Your Content Here
```

#### 3. Rebuild Index
```bash
# Always rebuild after adding/moving files
python3 build.py
```

### Images Not Loading

**Check Image Paths:**
```markdown
<!-- Correct relative paths -->
![Description](../images/reference/image.jpg)
![Description](../../images/tutorials/screenshot.png)

<!-- Avoid absolute paths -->
<!-- ![Wrong](/images/image.jpg) -->
```

**Verify Image Files:**
```bash
# Check image directory
ls -la images/
find images/ -name "*.jpg" -o -name "*.png" -o -name "*.svg"

# Check file permissions
ls -la images/reference/your-image.jpg
```

## 🔗 Navigation Issues

### Internal Links Broken

**Wiki-style Links:**
```markdown
<!-- Correct format -->
[[Note Title]]
[[folder/Note Title]]

<!-- Check case sensitivity -->
[[Exact Title Case]]
```

**Regular Markdown Links:**
```markdown
<!-- Use correct relative paths -->
[Search Guide](../features/search-guide.md)
[Creating Notes](./creating-notes.md)
```

### Hash Navigation Issues

**Problem:** URLs like `#/notes/path/file.md` don't work

**Solutions:**
```javascript
// Check router state
console.log(window.location.hash);

// Force navigation
window.app.navigateToNote('path/to/your/note.md');
```

## ⚡ Performance Issues

### Slow Loading

**Diagnosis:**
```javascript
// Check performance in browser dev tools
// Network tab: Look for slow resources
// Performance tab: Identify bottlenecks
```

**Solutions:**

#### 1. Large Index File
```bash
# Check index size
du -h notes-index.json

# If > 10MB, consider:
# - Splitting large notes
# - Removing large code blocks
# - Using content excerpts
```

#### 2. Too Many Theme Files
```bash
# If using custom deployment, include only needed themes
# Remove unused themes to reduce bundle size
```

#### 3. Memory Issues
```javascript
// Check memory usage in browser dev tools
// Clear application data if needed:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Browser Freezing

**Common Causes:**
- Very large notes (>1MB)
- Infinite loops in custom CSS
- Too many tabs open

**Solutions:**
```javascript
// Emergency reset
localStorage.setItem('notesWiki_emergencyMode', 'true');
location.reload();
// This disables all custom settings temporarily
```

## 🔧 Local Development Issues

### Python Server Issues

**Error:** `python3: command not found`

**Solutions:**
```bash
# Try alternative Python commands
python --version
py --version

# Use Node.js instead
npx http-server -p 8000

# Use PHP
php -S localhost:8000
```

**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 8000
lsof -i :8000

# Kill process or use different port
python3 -m http.server 8080
```

### Build Script Errors

**Missing Dependencies:**
```bash
# Install required Python modules
pip3 install pyyaml

# Or use system package manager
# Ubuntu/Debian:
sudo apt install python3-yaml

# macOS:
brew install python3
pip3 install pyyaml
```

## 🌐 Deployment Issues

### GitHub Pages Not Updating

**Solutions:**
```bash
# Check GitHub Actions status
# Go to: GitHub repo > Actions tab

# Force rebuild
git commit --allow-empty -m "Force rebuild"
git push

# Check _config.yml exists
cat _config.yml
```

### GitLab Pages Issues

**Check CI/CD Pipeline:**
```yaml
# Ensure .gitlab-ci.yml contains pages job
pages:
  script:
    - python3 build.py
  artifacts:
    paths:
      - public
  only:
    - main
```

### Netlify Deployment

**Build Failing:**
```
Build settings:
- Build command: python3 build.py
- Publish directory: /
- Environment: Python 3.8+
```

## 🚨 Emergency Recovery

### Complete Reset

If all else fails, perform a complete reset:

```javascript
// 1. Clear all application data
localStorage.clear();
sessionStorage.clear();

// 2. Clear browser cache
// Chrome: Ctrl+Shift+Delete
// Firefox: Ctrl+Shift+Delete
// Safari: Command+Option+E

// 3. Rebuild search index
// python3 build.py

// 4. Hard refresh
// Ctrl+F5 or Cmd+Shift+R
```

### Backup Recovery

```bash
# If you have backups, restore them:
# 1. Replace notes/ directory
cp -r backup/notes/ ./notes/

# 2. Rebuild index
python3 build.py

# 3. Clear browser data and reload
```

## 📞 Getting Help

### Information to Include

When reporting issues, include:

```bash
# System info
echo "OS: $(uname -a)"
echo "Python: $(python3 --version)"
echo "Browser: [Your browser and version]"

# Project info
echo "Wiki size: $(du -sh .)"
echo "Notes count: $(find notes/ -name '*.md' | wc -l)"
echo "Index size: $(du -h notes-index.json)"

# Error details
# - Browser console errors (F12)
# - Network tab information
# - Steps to reproduce
```

### Quick Diagnostics

```bash
# Run comprehensive health check
cat > diagnose.sh << 'EOF'
#!/bin/bash
echo "=== Wiki Diagnostics ==="
echo "Date: $(date)"
echo "Directory: $(pwd)"
echo

echo "--- File Structure ---"
ls -la | head -10
echo

echo "--- Notes Directory ---"
find notes/ -name "*.md" | wc -l
echo "Markdown files found"
echo

echo "--- Search Index ---"
if [ -f "notes-index.json" ]; then
    echo "✅ Index exists ($(du -h notes-index.json | cut -f1))"
    if python3 -m json.tool notes-index.json > /dev/null 2>&1; then
        echo "✅ Valid JSON"
    else
        echo "❌ Invalid JSON"
    fi
else
    echo "❌ Index missing"
fi
echo

echo "--- Themes ---"
ls themes/ | wc -l
echo "Theme files found"
echo

echo "--- Python ---"
python3 --version 2>&1
python3 -c "import yaml; print('✅ PyYAML available')" 2>&1
echo

echo "=== Diagnosis Complete ==="
EOF

chmod +x diagnose.sh
./diagnose.sh
```

---

## Related Resources

- 🚀 [Deployment Options](deployment-options.md)
- 🔍 [Search Index Management](../advanced/search-index-management.md)
- ⚙️ [Settings & Customization](../features/settings-customization.md)
- 📱 [GitHub Issues](https://github.com/Real-Fruit-Snacks/Wiki/issues) - Report bugs here