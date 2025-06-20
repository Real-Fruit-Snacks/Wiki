# Customization Guide

This guide shows you how to customize the Notes Wiki for your own project, especially when deploying to GitLab/GitHub Pages with a different project name.

## 🎨 Essential Customizations

### 1. **Change the Application Name/Title**

The application name appears in just a few places. Update these to match your project:

#### Browser Tab Title
**File:** `index.html` (line 7)
```html
<title>Notes Wiki</title>
```
Change to:
```html
<title>My Knowledge Base</title>
```

**File:** `404.html` (line 7)
```html
<title>404 - Page Not Found | Notes Wiki</title>
```
Change to:
```html
<title>404 - Page Not Found | My Knowledge Base</title>
```

#### Site Header/Logo
**File:** `index.html` (line 148)
```html
<span>Notes Wiki</span>
```
Change to:
```html
<span>My Knowledge Base</span>
```

### 2. **Update Package Information** (Optional)

If you're forking for your own project:

**File:** `package.json`
```json
{
  "name": "notes-wiki",
  "version": "3.3.0",
  ...
}
```
Change to:
```json
{
  "name": "my-knowledge-base",
  "version": "1.0.0",
  ...
}
```

### 3. **Update Meta Description** (Optional)

**File:** `index.html` (line 6)
```html
<meta name="description" content="Self-contained notes wiki with advanced features">
```
Change to:
```html
<meta name="description" content="My personal knowledge management system">
```

**File:** `404.html` (line 6)
```html
<meta name="description" content="Page not found - Notes Wiki">
```
Change to:
```html
<meta name="description" content="Page not found - My Knowledge Base">
```

## 🚀 Deployment Name Flexibility

**Good news!** The application automatically detects your GitLab/GitHub project name and adjusts all paths accordingly. You can name your project anything:

- ✅ `username.gitlab.io/my-notes/`
- ✅ `username.gitlab.io/team-documentation/`
- ✅ `username.github.io/personal-wiki/`

No configuration needed - it just works!

## 📝 Documentation Updates

If you're creating a public fork, you may want to update:

1. **README.md** - Update project description and links
2. **Repository URLs** - Search for `github.com/Real-Fruit-Snacks/Wiki` and replace with your repo URL
3. **Build artifacts** - The `create-release.js` creates zips named `notes-wiki-v*.zip`. Update line 9 if needed.

## 🎯 Quick Start Checklist

For a minimal rebrand, just change these 3 lines:

1. [ ] `index.html` line 7: `<title>Your App Name</title>`
2. [ ] `index.html` line 148: `<span>Your App Name</span>`
3. [ ] `404.html` line 7: `<title>404 - Page Not Found | Your App Name</title>`

That's it! Your custom-branded knowledge base is ready to deploy.

## 💡 Pro Tips

- **Favicon**: Replace the SVG favicon in index.html and 404.html with your own
- **Theme defaults**: Change the default theme in index.html line 72 from 'tokyo-night' to your preference
- **Welcome page**: Customize `/notes/index.md` with your own welcome content

## 🤔 Why So Few Changes?

The application was designed to be project-name agnostic. The path detection system automatically handles different project names, so you only need to change the visible branding elements.

---

Remember: After making these changes, run `npm run build` to ensure everything still works correctly!