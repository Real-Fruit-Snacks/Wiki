# Release v2.3.0 - Enhanced Settings & Customization

## 🎉 What's New

This release brings comprehensive settings enhancements, giving users unprecedented control over their wiki experience. The settings modal has been completely revamped with new sections and powerful customization options.

## ✨ New Features

### 📝 Navigation & Behavior
- **Default Home Page**: Choose what loads when you open the wiki
  - Home page (default)
  - Last viewed note
  - Specific note of your choice
- **External Links Control**: Configure whether external links open in new tabs or the same tab

### 📖 Reading & Display
- **Font Size Adjustment**: Choose from 4 size options
  - Small (14px)
  - Normal (16px) - default
  - Large (18px)
  - Extra Large (20px)
- **Font Family Selection**: Pick your preferred reading font
  - System default
  - Sans-serif
  - Serif
  - Monospace

### 💻 Code & Technical
- **Default Code Language**: Set the language for unmarked code blocks
  - Supports 18 popular languages
  - Defaults to plaintext
  - Improves syntax highlighting accuracy

### 🎨 Advanced Customization
- **Custom CSS Editor**: Add your own styles
  - Built-in textarea with syntax hints
  - Instantly preview your changes
  - Styles persist across sessions
- **Keyboard Shortcut Customization**: Personalize your shortcuts
  - Click any shortcut to edit
  - Supports complex key combinations (Ctrl+Alt+Shift+Key)
  - Visual feedback during editing
  - Reset to defaults option

### 🔧 Technical Improvements
- Enhanced settings persistence in localStorage
- Improved marked.js link renderer for external links
- Better font inheritance with CSS custom properties
- Dynamic keyboard event handling system
- Optimized settings modal navigation

## 📋 Other Changes
- Updated documentation (README.md, CLAUDE.md)
- Enhanced .gitignore with test file patterns
- Added comprehensive testing guidelines

## 🐛 Bug Fixes
- Fixed font settings not applying to content
- Resolved keyboard shortcut input accessibility issues
- Improved modal focus management

## 💡 Usage Tips

### Setting a Default Home Page
1. Open Settings (Ctrl+,)
2. Navigate to "Navigation & Behavior"
3. Choose your preferred option
4. For "Specific note", enter the path (e.g., `notes/projects/todo-app`)

### Customizing Fonts
1. Go to "Reading & Display" in settings
2. Try different combinations of size and family
3. Changes apply instantly to all content

### Custom CSS Example
```css
/* Make headings stand out more */
.content-view h1 {
  border-bottom: 3px solid var(--accent-primary);
  padding-bottom: 0.5rem;
}

/* Custom link styling */
.content-view a {
  text-decoration-thickness: 2px;
}
```

### Keyboard Shortcut Tips
- Click on any shortcut field to edit
- Press your desired key combination
- The field updates automatically
- Use "Reset to defaults" if needed

## 🙏 Acknowledgments
Thanks to all users who suggested these enhancements. Your feedback drives the continuous improvement of Notes Wiki.

## 📦 Installation
No changes to installation process. Simply update your files and refresh your browser.

---

**Full Changelog**: https://github.com/Real-Fruit-Snacks/Wiki/compare/v2.2.0...v2.3.0