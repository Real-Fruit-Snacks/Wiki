---
title: Deployment Options Guide
tags: [deployment, getting-started, setup]
author: Wiki Team
created: 2024-01-20
updated: 2024-01-20
description: Complete guide to deploying your wiki across different platforms
---

# Deployment Options Guide

This comprehensive guide covers all the ways you can deploy your wiki, from cloud platforms to local setups.

## 🚀 Quick Start Options

### 1. GitHub Pages (Recommended for Public Wikis)

**Best for:** Public documentation, open source projects, personal blogs

```bash
# Step 1: Fork the repository on GitHub
# Step 2: Enable GitHub Pages
#   - Go to Settings → Pages
#   - Source: Deploy from a branch
#   - Branch: main / (root)
#   - Save

# Your wiki will be available at:
# https://[username].github.io/Wiki/
# Note: You can name your repository anything! The wiki automatically
# detects the path and adjusts all resource URLs accordingly.
# Examples: /my-notes/, /documentation/, /knowledge-base/
```

**Pros:**
- ✅ Free hosting
- ✅ Automatic SSL certificate
- ✅ Global CDN
- ✅ Easy domain setup

**Cons:**
- ❌ Public repositories only (for free)
- ❌ 1GB storage limit

### 2. GitLab Pages (Best for Private/Self-Hosted)

**Best for:** Private documentation, corporate wikis, self-hosted environments

```bash
# Step 1: Create new GitLab project
git clone https://github.com/Real-Fruit-Snacks/Wiki.git
cd Wiki
# Note: You can rename the project to anything you like!

# Step 2: Add GitLab remote
git remote add gitlab https://gitlab.com/yourusername/wiki.git
# or for self-hosted:
git remote add gitlab https://your-gitlab.domain.com/yourgroup/wiki.git

# Step 3: Build search index
python3 build.py

# Step 4: Push to GitLab
git push gitlab main

# Step 5: Enable Pages in project settings
# Your wiki will be available at:
# https://yourusername.gitlab.io/wiki/
```

**Pros:**
- ✅ Free private repositories
- ✅ Works with self-hosted GitLab
- ✅ Built-in CI/CD
- ✅ No external dependencies

**Cons:**
- ❌ Slightly more complex setup

### 3. Netlify (Easiest Setup)

**Best for:** Quick prototypes, drag-and-drop deployment

```bash
# Option A: Drag & Drop
# 1. Download the release zip from GitHub
# 2. Go to https://netlify.com
# 3. Drag the zip file to Netlify
# 4. Your wiki is live!

# Option B: Git Integration
# 1. Connect your GitHub/GitLab repo to Netlify
# 2. Build command: python3 build.py
# 3. Publish directory: /
# 4. Deploy
```

**Pros:**
- ✅ Instant deployment
- ✅ Free SSL
- ✅ Form handling
- ✅ Branch previews

**Cons:**
- ❌ 100GB bandwidth limit (free)

### 4. Local Development/Intranet

**Best for:** Offline documentation, air-gapped environments, local testing

```bash
# Quick local server
python3 -m http.server 8000
# Open http://localhost:8000

# Or with Node.js
npx http-server -p 8000

# Or with PHP
php -S localhost:8000

# For production local deployment
# Copy files to your web server directory:
# Apache: /var/www/html/
# Nginx: /var/www/
```

**Pros:**
- ✅ Complete control
- ✅ No internet required
- ✅ Fast access
- ✅ Secure environment

**Cons:**
- ❌ Manual updates
- ❌ Limited accessibility

## 🔧 Advanced Deployment

### Docker Deployment

```dockerfile
# Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t wiki .
docker run -p 8080:80 wiki
```

### Apache Configuration

```apache
# .htaccess for better routing
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-wiki.com;
    root /var/www/wiki;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📋 Pre-Deployment Checklist

### Essential Steps
- [ ] Build search index: `python3 build.py`
- [ ] Validate JavaScript: `npm run validate`
- [ ] Test locally: `python3 -m http.server 8000`
- [ ] Check all themes load correctly
- [ ] Verify search functionality works
- [ ] Test on mobile device

### Content Preparation
- [ ] Add your content to `/notes/` directory
- [ ] Include proper frontmatter in markdown files
- [ ] Optimize images for web (< 1MB each)
- [ ] Test all internal links
- [ ] Review tag consistency

### Security & Performance
- [ ] Remove any sensitive information
- [ ] Check file permissions
- [ ] Enable GZIP compression (if possible)
- [ ] Set up proper caching headers
- [ ] Test loading speed

## 🚨 Common Issues & Solutions

### Search Not Working
```bash
# Problem: Search returns no results
# Solution: Rebuild the search index
python3 build.py

# Problem: Notes not appearing in search
# Check: notes-index.json file exists and has content
ls -la notes-index.json
```

### Themes Not Loading
```bash
# Problem: Themes appear broken
# Check: All CSS files are present
ls themes/ | wc -l  # Should show 50+

# Problem: Default theme not loading
# Check: themes/tokyo-night.css exists
ls -la themes/tokyo-night.css
```

### GitHub Pages Specific
```bash
# Problem: 404 errors on GitHub Pages
# Solution: Ensure Jekyll bypass is set
cat _config.yml  # Should contain: include: [".nojekyll"]

# Problem: Resources not loading
# Check: Paths are relative, not absolute
grep -r "http://" index.html  # Should find no absolute URLs
```

### Performance Issues
```bash
# Problem: Slow loading
# Check: File sizes
du -sh *

# Solution: Ensure images are optimized
find images/ -name "*.jpg" -size +1M  # Find large images
```

## 📱 Mobile Optimization

### Testing on Mobile
- [ ] Test responsive layout on phone/tablet
- [ ] Verify touch targets are large enough
- [ ] Check that search works on mobile
- [ ] Test context switching (dropdown vs buttons)
- [ ] Verify focus mode works on small screens

### Mobile-Specific Features
- Touch-optimized interface
- Responsive context filtering
- Mobile-friendly search
- Swipe navigation (in development)

## 🔒 Security Considerations

### Self-Hosted Environments
- Use HTTPS in production
- Set appropriate file permissions
- Configure web server security headers
- Regular backup strategy
- Access control if needed

### Public Hosting
- Review content for sensitive information
- Consider search engine indexing preferences
- Set up appropriate robots.txt
- Monitor for unauthorized modifications

## 📈 Monitoring & Analytics

### Basic Monitoring
```bash
# Check disk usage
du -sh /path/to/wiki

# Monitor web server logs
tail -f /var/log/nginx/access.log

# Check for broken links
grep -r "404" /var/log/nginx/access.log
```

### Performance Monitoring
- Use browser dev tools for performance analysis
- Monitor Core Web Vitals
- Test loading times from different locations
- Check mobile performance

## 🔄 Updating Your Deployment

### For Git-Based Deployments
```bash
# Update from main repository
git remote add upstream https://github.com/Real-Fruit-Snacks/Wiki.git
git fetch upstream
git merge upstream/main

# Rebuild search index
python3 build.py

# Deploy updates
git push origin main
```

### For Manual Deployments
1. Download latest release
2. Backup your `/notes/` directory
3. Extract new files
4. Restore your notes
5. Rebuild search index
6. Upload to server

---

## Next Steps

- 📖 [Creating Your First Notes](creating-notes.md)
- 🔍 [Search Guide](../features/search-guide.md)
- ⚙️ [Settings & Customization](../features/settings-customization.md)
- 🎨 [Themes Guide](../features/themes.md)