---
title: Troubleshooting Guide
tags: [troubleshooting, help, debugging, common-issues, support]
author: Wiki Team
created: 2025-01-19
description: Comprehensive guide to diagnosing and fixing common Notes Wiki issues
---

# Troubleshooting Guide

Having issues with Notes Wiki? This comprehensive guide covers common problems and their solutions, helping you get back to productive note-taking quickly.

## 🔍 Quick Diagnostic Checklist

Before diving into specific issues, run through this quick checklist:

```bash
✅ Browser Compatibility Check
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript enabled
- Local storage available

✅ File Access Check
- Can access index.html?
- Are notes/ directory and files readable?
- Is notes-index.json present and valid?

✅ Network Check (for hosted versions)
- Internet connection stable?
- Can access GitHub Pages/hosting platform?
- No firewall blocking static content?
```

## 🚨 Common Issues & Solutions

### 1. Search Not Working

#### Problem: No search results appear
**Symptoms:**
- Search box works but returns empty results
- All searches show "No notes found"
- Search seems to hang or load indefinitely

**Solutions:**

**Check Search Index:**
```bash
# Verify index file exists and has content
ls -la notes-index.json
# Should show file size > 1KB

# Validate JSON structure
python3 -c "import json; json.load(open('notes-index.json'))"
# Should complete without errors
```

**Rebuild Search Index:**
```bash
# Method 1: Using npm
npm run build

# Method 2: Direct Python
python3 build.py

# Method 3: Force rebuild
rm notes-index.json
python3 build.py
```

**Check for Malformed Notes:**
```bash
# Find notes with invalid frontmatter
grep -l "^---" notes/**/*.md | xargs -I {} sh -c 'echo "Checking: {}"; head -20 "{}"'

# Common frontmatter issues:
# - Missing closing ---
# - Invalid YAML syntax
# - Unquoted strings with special characters
```

#### Problem: Search results are incomplete
**Symptoms:**
- Some notes don't appear in search
- Recently added notes missing
- Partial search results

**Solutions:**
```bash
# Check file permissions
find notes/ -name "*.md" ! -readable
# Should return no results

# Verify note structure
head -10 path/to/missing-note.md
# Should have valid YAML frontmatter

# Force complete rebuild
rm notes-index.json
python3 build.py --force
```

### 2. GitHub Pages Deployment Issues

#### Problem: GitHub Pages not deploying
**Symptoms:**
- No site appears at github.io URL
- "404 - File not found" error
- Actions tab shows no workflows

**Solutions:**

**Enable GitHub Actions:**
1. Go to repository **Settings** → **Actions** → **General**
2. Select **"Allow all actions and reusable workflows"**
3. Save changes

**Check Pages Configuration:**
1. Go to **Settings** → **Pages**
2. Source should be **"GitHub Actions"**
3. If using **"Deploy from a branch"**, change to **"GitHub Actions"**

**Verify Workflow File:**
```bash
# Check if workflow file exists
ls .github/workflows/
# Should contain pages.yml or similar

# Validate workflow syntax
cat .github/workflows/pages.yml
# Check for proper YAML indentation
```

**Manual Workflow Trigger:**
1. Go to **Actions** tab
2. Select the Pages workflow
3. Click **"Run workflow"**
4. Wait for completion

#### Problem: GitHub Pages builds but shows errors
**Symptoms:**
- Workflow runs but deployment fails
- Site loads but missing content
- 404 errors for specific files

**Solutions:**
```bash
# Check build logs in Actions tab
# Look for Python or build errors

# Common fixes:
echo "include: ['_config.yml']" > .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll file"
git push
```

### 3. Local Development Issues

#### Problem: Python build script fails
**Symptoms:**
- `python3 build.py` throws errors
- Missing dependencies
- Permission errors

**Solutions:**

**Check Python Version:**
```bash
python3 --version
# Should be 3.6 or higher

# Install on different systems:
# Ubuntu/Debian: sudo apt install python3 python3-pip
# macOS: brew install python3
# Windows: Download from python.org
```

**Install Required Packages:**
```bash
pip3 install pyyaml
# or
pip3 install -r requirements.txt  # if available
```

**Permission Issues:**
```bash
# Linux/Mac: Fix file permissions
chmod +x build.py
sudo chown -R $USER:$USER notes/

# Windows: Run as administrator or check file properties
```

#### Problem: Local server won't start
**Symptoms:**
- "Port already in use" error
- "Permission denied" on port 8000
- Server starts but can't access in browser

**Solutions:**
```bash
# Use different port
python3 -m http.server 8080
# Try ports: 3000, 8080, 9000

# Check what's using port 8000
# Linux/Mac:
lsof -i :8000
# Windows:
netstat -ano | findstr :8000

# Kill process using port (if safe)
# Linux/Mac:
kill -9 $(lsof -ti:8000)
# Windows:
taskkill /PID <process_id> /F
```

### 4. Browser Compatibility Issues

#### Problem: Features not working in browser
**Symptoms:**
- Keyboard shortcuts don't work
- UI elements missing or broken
- JavaScript errors in console

**Solutions:**

**Check Browser Console:**
```javascript
// Open Developer Tools (F12)
// Look for JavaScript errors in Console tab
// Common issues:
// - localStorage blocked (private browsing)
// - JavaScript disabled
// - Browser too old
```

**Enable Required Features:**
```bash
# Check browser settings:
# - Enable JavaScript
# - Allow localStorage
# - Disable privacy extensions temporarily
# - Try incognito/private mode
```

**Browser-Specific Issues:**
```javascript
// Safari: Enable Developer menu
// Safari → Preferences → Advanced → Show Develop menu

// Firefox: Check about:config
// dom.storage.enabled = true
// javascript.enabled = true

// Chrome: Check chrome://settings/content
// JavaScript: Allowed
// Cookies: Allow all
```

### 5. Theme and Display Issues

#### Problem: Themes not loading or broken appearance
**Symptoms:**
- Stuck on default theme
- CSS not loading properly
- Broken layout or missing styles

**Solutions:**

**Clear Browser Cache:**
```bash
# Hard refresh:
# Chrome/Firefox: Ctrl+F5 or Ctrl+Shift+R
# Safari: Cmd+Shift+R
# Edge: Ctrl+F5

# Clear all cache:
# Chrome: Settings → Privacy → Clear browsing data
# Firefox: Settings → Privacy → Clear Data
```

**Check Theme Files:**
```bash
# Verify theme files exist
ls themes/
# Should show all .css files

# Check specific theme
cat themes/your-theme.css | head -10
# Should contain valid CSS
```

**Reset to Default:**
```javascript
// Open browser console (F12)
// Reset theme settings
localStorage.removeItem('wiki-settings');
location.reload();
```

### 6. Mobile and Responsive Issues

#### Problem: Poor mobile experience
**Symptoms:**
- Text too small on mobile
- Interface elements overlap
- Touch gestures don't work

**Solutions:**
```html
<!-- Verify meta viewport tag in index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Check CSS media queries -->
@media (max-width: 768px) {
    /* Mobile styles should be present */
}
```

**Mobile-Specific Settings:**
1. Use responsive themes (most themes are responsive)
2. Enable mobile-friendly features in settings
3. Test with browser dev tools device simulation

### 7. Performance Issues

#### Problem: Slow loading or freezing
**Symptoms:**
- App takes long time to load
- Searches are very slow
- Browser becomes unresponsive

**Solutions:**

**Optimize Large Note Collections:**
```bash
# Check notes-index.json size
ls -lh notes-index.json
# If > 10MB, consider:
# - Reducing note count
# - Splitting into multiple wikis
# - Optimizing note content
```

**Browser Performance:**
```javascript
// Check memory usage in dev tools
// Performance tab → Memory
// Look for memory leaks or high usage

// Clear browser data
// Disable browser extensions
// Close other tabs
```

**Optimize Content:**
```bash
# Reduce image sizes
find notes/ -name "*.jpg" -o -name "*.png" | xargs ls -lh
# Consider compressing large images

# Remove unused files
find notes/ -name "*.tmp" -o -name "*.backup" -delete
```

## 🛠️ Advanced Debugging

### Enable Debug Mode

**JavaScript Debugging:**
```javascript
// Open browser console (F12)
// Enable verbose logging
localStorage.setItem('wiki-debug', 'true');
location.reload();

// Check for detailed error messages
// Look for specific function failures
```

**Python Build Debugging:**
```bash
# Run build with verbose output
python3 build.py --verbose

# Check for specific errors
python3 -c "
import traceback
try:
    exec(open('build.py').read())
except Exception as e:
    traceback.print_exc()
"
```

### Network Issues

**Check Network Requests:**
```javascript
// Browser Dev Tools → Network tab
// Reload page and check:
// - Failed requests (red)
// - Slow requests (>1s)
// - 404 errors
// - CORS issues
```

**CDN and External Resources:**
```bash
# Test external dependencies
curl -I https://cdn.jsdelivr.net/npm/marked/marked.min.js
# Should return 200 OK

# Check if offline mode works
# Disconnect internet and test basic functionality
```

### File System Issues

**Check File Encoding:**
```bash
# Verify UTF-8 encoding
file -i notes/**/*.md
# Should show: text/plain; charset=utf-8

# Fix encoding if needed
iconv -f iso-8859-1 -t utf-8 problem-file.md > fixed-file.md
```

**Validate Markdown Structure:**
```bash
# Check for markdown parsing issues
python3 -c "
import markdown
with open('notes/problematic-note.md', 'r') as f:
    content = f.read()
    try:
        html = markdown.markdown(content)
        print('Markdown parses successfully')
    except Exception as e:
        print(f'Markdown error: {e}')
"
```

## 📞 Getting Additional Help

### Self-Diagnosis Tools

**Browser Information:**
```javascript
// Run in browser console to get system info
console.log({
    userAgent: navigator.userAgent,
    localStorage: typeof(Storage) !== "undefined",
    cookiesEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
    language: navigator.language
});
```

**System Information:**
```bash
# Gather system details for support
echo "OS: $(uname -a)"
echo "Python: $(python3 --version)"
echo "Node: $(node --version 2>/dev/null || echo 'Not installed')"
echo "Git: $(git --version)"
```

### Community Support

**Before Asking for Help:**
1. ✅ Check this troubleshooting guide
2. ✅ Search existing GitHub issues
3. ✅ Try basic solutions (restart, clear cache)
4. ✅ Gather error messages and system info

**Where to Get Help:**
- **GitHub Issues**: Report bugs and get technical support
- **Documentation**: Check other tutorial files
- **Community Forums**: Share tips with other users

**Creating a Good Support Request:**
```markdown
## Problem Description
Brief description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. Expected vs actual result

## System Information
- OS: [Windows 10/macOS/Linux]
- Browser: [Chrome 95.0/Firefox 94.0/etc]
- Notes Wiki Version: [4.1.0]
- Hosting: [GitHub Pages/Local/Other]

## Error Messages
```
Any console errors or build failures
```

## Additional Context
Screenshots, logs, or other relevant information
```

## 🎯 Prevention Tips

### Regular Maintenance

**Weekly Tasks:**
```bash
# Rebuild search index
npm run build

# Check for broken links
# Validate note structure
# Review recent changes
```

**Monthly Tasks:**
```bash
# Update dependencies (if using Node.js)
npm update

# Backup notes and settings
cp -r notes/ backup/notes-$(date +%Y%m%d)
cp notes-index.json backup/

# Review and organize notes
```

### Best Practices

**Avoid Common Issues:**
- ✅ Use consistent frontmatter structure
- ✅ Avoid special characters in filenames
- ✅ Keep individual notes under 100KB
- ✅ Regularly commit changes to Git
- ✅ Test changes locally before pushing

**File Organization:**
```bash
# Good structure
notes/
├── personal/
│   └── 2025-01-19-daily-notes.md
├── work/
│   └── project-meeting-notes.md
└── reference/
    └── git-commands-cheatsheet.md

# Avoid
notes/
├── My Notes (spaces).md          # Use hyphens
├── 🚀 emoji-file.md              # Avoid emoji in filenames
└── very-very-very-long-filename-that-is-hard-to-manage.md  # Keep shorter
```

---

## 📋 Quick Reference

### Essential Commands
```bash
# Rebuild search index
python3 build.py

# Start local server
python3 -m http.server 8000

# Check for issues
npm run validate-all

# Clear browser cache
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
```

### Emergency Recovery
```bash
# Reset to working state
git checkout main
git pull origin main
rm notes-index.json
python3 build.py

# Clear all local data
# Open browser console:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

**Remember**: Most issues can be resolved with a simple restart, cache clear, or index rebuild. Don't hesitate to try the simple solutions first! 🚀 