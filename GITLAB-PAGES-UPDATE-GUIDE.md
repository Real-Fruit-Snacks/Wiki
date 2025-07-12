# 🚀 GitLab Pages Update Guide - Notes Wiki v4.2.0

## 📋 Quick Update for Existing GitLab Pages Users

### 🎯 What You're Getting
- **Variable Manager**: Define `$Variables` in code blocks and manage their values
- **Enhanced UI**: Better tooltips, improved mobile experience
- **Performance**: Optimized variable handling with scroll preservation
- **Documentation**: Updated README and comprehensive guides

### ⚡ 5-Minute Update Process

#### 1. **Backup Your Content** (1 minute)
```bash
# Clone your current GitLab repository
git clone https://gitlab.com/[username]/[your-wiki-project].git
cd [your-wiki-project]

# Create backup of your notes
cp -r notes/ notes-backup-$(date +%Y%m%d)/
```

#### 2. **Download & Extract** (1 minute)
- Download `notes-wiki-v4.2.0-complete.tar.gz`
- Extract to a temporary directory
- Copy your backup notes to extraction folder

#### 3. **Replace Core Files** (2 minutes)
**Essential files for Variable Manager:**
```bash
# Replace these core files (REQUIRED)
cp temp-extract/index.html ./
cp temp-extract/script.js ./
cp temp-extract/style.css ./

# Replace documentation (OPTIONAL)
cp temp-extract/README.md ./

# Update GitLab CI (RECOMMENDED)
cp temp-extract/.gitlab-ci.yml ./
```

#### 4. **Restore Your Content** (1 minute)
```bash
# Keep your existing notes
# notes/ directory - DO NOT REPLACE
# Your content stays exactly as it was

# Rebuild search index with your content
python build.py
```

#### 5. **Deploy** (30 seconds)
```bash
git add .
git commit -m "Update to Notes Wiki v4.2.0 - Added Variable Manager"
git push
```

**Done!** GitLab CI/CD automatically deploys your updated wiki.

### 🔧 Alternative: Fresh Install Method

If you prefer a clean start:

#### 1. **Extract Complete Package**
- Extract `notes-wiki-v4.2.0-complete.tar.gz`
- Replace the `notes/` directory with your backup

#### 2. **Upload to GitLab**
- Create new repository or replace all files
- Commit and push
- Automatic deployment via included CI/CD

### 🎯 Verification Steps

After update, verify these features work:

1. **Variable Manager**: Click `$` button or press `Ctrl+Shift+V`
2. **Code Variables**: Add `$TEST_VAR` to a code block
3. **Variable Input**: Set value in Variable Manager panel
4. **Real-time Update**: See variable replaced in code block

### 🐛 Troubleshooting

#### **Variables Not Working?**
- Ensure all 3 core files updated: `index.html`, `script.js`, `style.css`
- Check browser console for JavaScript errors
- Try hard refresh: `Ctrl+F5` or `Cmd+Shift+R`

#### **CI/CD Pipeline Failing?**
- Check `.gitlab-ci.yml` was updated
- Verify `build.py` runs without errors locally
- Check GitLab CI/CD logs for specific errors

#### **Styles Look Broken?**
- Ensure `style.css` was updated
- Clear browser cache
- Check for any custom CSS conflicts

### 📱 Mobile Testing

After update, test on mobile:
- Variable Manager accessible in mobile menu
- Touch-friendly variable input
- Responsive design maintained

### 🔄 Rollback Plan

If issues occur:

```bash
# Quick rollback to previous version
git checkout HEAD~1 -- index.html script.js style.css
git commit -m "Rollback to previous version"
git push
```

Your notes remain untouched during rollback.

### 🎉 New Features Available

Once updated, explore:

#### **Variable Manager**
- Open with `$` button or `Ctrl+Shift+V`
- Define variables: `$API_URL`, `$DATABASE_HOST`, etc.
- Set values per note
- Variables auto-replace in code blocks

#### **Enhanced Help**
- Click `?` button in Variable Manager
- Space-efficient tooltips
- Click outside to close

#### **Mobile Improvements**
- Variable Manager in mobile menu
- Better touch interface
- Consistent icon design

### 📊 What's Preserved

During update, these remain unchanged:
- ✅ All your notes and content
- ✅ GitLab Pages URL
- ✅ Custom domain configuration
- ✅ Repository settings
- ✅ Access permissions
- ✅ Existing themes and settings

### 🔗 Support

Need help?
- **Release Notes**: See `RELEASE-NOTES-v4.2.0.md`
- **Full Documentation**: Available in `notes/tutorials/`
- **Issues**: Report on GitHub project
- **GitLab Docs**: See `GITLAB-DEPLOYMENT.md`

---

**Total Update Time**: ~5 minutes  
**Downtime**: ~1 minute (during CI/CD deployment)  
**Risk**: Low (notes preserved, rollback available)  

🎯 **Your enhanced Notes Wiki with Variable Manager is ready!** 