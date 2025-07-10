---
title: Installation and Setup Guide
tags: [installation, setup, deployment, getting-started, github-pages]
author: Wiki Team
created: 2025-01-19
description: Complete guide to installing and setting up Notes Wiki across different platforms
---

# Installation and Setup Guide

Get Notes Wiki up and running on your preferred platform with this comprehensive setup guide. Choose from multiple deployment options and follow step-by-step instructions for a smooth installation experience.

## 🚀 Quick Overview

Notes Wiki can be deployed in several ways:
- **GitHub Pages** (recommended for beginners)
- **Local development** (for testing and customization)
- **GitLab Pages** (alternative to GitHub)
- **Static hosting** (Netlify, Vercel, etc.)
- **Self-hosted** (your own server)

## 📋 Prerequisites

### System Requirements
- **Web browser** - Modern browser (Chrome, Firefox, Safari, Edge)
- **Git** - For version control and deployment
- **Python 3.x** - For building search indexes
- **Node.js** (optional) - For development scripts

### Technical Knowledge
- **Basic Git** - Cloning repositories, making commits
- **Command line** - Running simple terminal commands
- **Markdown** - For writing notes (easy to learn!)

## 🌐 GitHub Pages Deployment (Recommended)

### Why GitHub Pages?
- ✅ **Free hosting** - No cost for public repositories
- ✅ **Automatic updates** - Changes deploy automatically
- ✅ **Custom domains** - Use your own domain name
- ✅ **SSL included** - Secure HTTPS by default
- ✅ **Easy setup** - Minimal configuration required

### Step-by-Step Setup

#### 1. Fork the Repository
```bash
# Visit: https://github.com/Real-Fruit-Snacks/Wiki
# Click "Fork" button to create your copy
```

#### 2. Configure GitHub Pages
1. Go to your forked repository
2. Click **Settings** → **Pages**
3. Source: **GitHub Actions**
4. Save the settings

#### 3. Enable Actions (if needed)
1. Go to **Actions** tab in your repository
2. Click **"I understand my workflows, go ahead and enable them"**
3. Wait for the initial deployment to complete

#### 4. Access Your Wiki
```
Your wiki will be available at:
https://[your-username].github.io/Wiki/
```

#### 5. Customize Your Content
```bash
# Clone your fork locally
git clone https://github.com/[your-username]/Wiki.git
cd Wiki

# Add your notes to the notes/ directory
# Commit and push changes
git add .
git commit -m "Add my notes"
git push origin main
```

## 💻 Local Development Setup

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Real-Fruit-Snacks/Wiki.git
cd Wiki

# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Full Development Setup
```bash
# Install Node.js dependencies (optional)
npm install

# Build search index
npm run build
# or
python3 build.py

# Start development server
npm run serve
# or
python3 -m http.server 8000
```

### Development Commands
```bash
# Validate JavaScript
npm run validate

# Validate themes
npm run validate-themes

# Run all validations
npm run validate-all

# Create release package
npm run package
```

## 🦊 GitLab Pages Setup

### GitLab Configuration
1. Fork the repository to GitLab
2. Copy `.gitlab-ci.yml` from `gitlab-files/` to root
3. Enable GitLab Pages in project settings
4. Your site will be at: `https://[username].gitlab.io/Wiki/`

### GitLab CI/CD Pipeline
```yaml
# .gitlab-ci.yml
pages:
  script:
    - python3 build.py
    - cp -r . public/
  artifacts:
    paths:
      - public
  only:
    - main
```

## ☁️ Static Hosting Platforms

### Netlify Setup
1. Connect your Git repository to Netlify
2. Build command: `python3 build.py`
3. Publish directory: `/`
4. Deploy automatically on git push

### Vercel Setup
```json
{
  "buildCommand": "python3 build.py",
  "outputDirectory": ".",
  "installCommand": "echo 'No install needed'"
}
```

### Other Platforms
Notes Wiki works with any static hosting service:
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **DigitalOcean App Platform**
- **Surge.sh**

## 🏠 Self-Hosted Setup

### Basic Web Server
```nginx
# Nginx configuration
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/Wiki;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker Setup
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
# Build and run Docker container
docker build -t notes-wiki .
docker run -p 8080:80 notes-wiki
```

## ⚙️ Initial Configuration

### 1. Update Site Information
Edit `_config.yml`:
```yaml
title: "My Knowledge Base"
description: "Personal notes and documentation"
url: "https://yourdomain.com"
```

### 2. Customize Settings
1. Open your wiki in browser
2. Press `Ctrl+,` to open settings
3. Configure:
   - **Theme** - Choose from 74 themes
   - **Display** - Content width, line numbers
   - **Navigation** - Tab limits, recent files
   - **Productivity** - Timer, quick notes

### 3. Add Your First Notes
```bash
# Create a new note
touch notes/my-first-note.md
```

```markdown
---
title: My First Note
tags: [personal, getting-started]
author: Your Name
created: 2025-01-19
---

# My First Note

Welcome to my knowledge base! This is where I'll collect my thoughts, ideas, and important information.

## Getting Started

- [ ] Explore the interface
- [ ] Try different themes
- [ ] Learn keyboard shortcuts
- [ ] Organize my notes
```

### 4. Build Search Index
```bash
# After adding notes, rebuild the search index
python3 build.py

# Or use npm script
npm run build
```

## 🔧 Advanced Configuration

### Custom CSS Styling
```css
/* Add to Settings → Appearance → Custom CSS */
.content-area {
    max-width: 1200px;
    font-size: 16px;
}

.note-content h1 {
    color: #2563eb;
}
```

### Environment Variables
```bash
# For deployment automation
export WIKI_TITLE="My Knowledge Base"
export WIKI_AUTHOR="Your Name"
export WIKI_URL="https://yourdomain.com"
```

### GitHub Actions Customization
```yaml
# .github/workflows/pages.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
    paths: 
      - 'notes/**'
      - 'themes/**'
      - '*.js'
      - '*.css'
      - '*.html'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - name: Build search index
        run: python3 build.py
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🚨 Troubleshooting

### Common Issues

#### 1. GitHub Pages Not Building
**Problem**: No workflow runs in Actions tab
**Solution**:
```bash
# Check if Actions are enabled
# Go to repository Settings → Actions → General
# Enable "Allow all actions and reusable workflows"
```

#### 2. Search Not Working
**Problem**: Search returns no results
**Solution**:
```bash
# Rebuild search index
python3 build.py

# Check if notes-index.json exists and has content
ls -la notes-index.json
```

#### 3. Custom Domain Issues
**Problem**: Custom domain not working
**Solution**:
```bash
# Add CNAME file to repository root
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

#### 4. Python Build Errors
**Problem**: Build script fails
**Solution**:
```bash
# Check Python version
python3 --version

# Install required packages if needed
pip3 install pyyaml

# Run with verbose output
python3 build.py --verbose
```

## 📱 Mobile Setup

### Progressive Web App
Notes Wiki works as a PWA:
1. Open in mobile browser
2. Add to home screen
3. Works offline after first load
4. Full mobile optimization

### Mobile Deployment Tips
- Use responsive themes
- Enable touch gestures
- Test on different screen sizes
- Optimize image sizes

## 🔐 Security Considerations

### Public vs Private Repositories
- **Public repos**: Anyone can see your notes
- **Private repos**: Requires GitHub Pro for Pages
- **Self-hosted**: Full control over access

### Sensitive Information
```markdown
<!-- DON'T include in notes -->
- Passwords or API keys
- Personal identifying information
- Confidential business data

<!-- DO include -->
- Learning notes
- Public documentation
- Open source information
```

### Access Control
```bash
# For private wikis, consider:
# - HTTP basic authentication
# - VPN access
# - Server-side authentication
```

## 📈 Performance Optimization

### Large Note Collections
```bash
# Optimize performance for 1000+ notes
# 1. Enable pagination in search
# 2. Use tag filtering
# 3. Regular index rebuilds
# 4. Optimize images
```

### Build Optimization
```python
# Custom build.py modifications
# - Exclude draft notes
# - Compress JSON output
# - Generate sitemap
# - Optimize images
```

## 🎉 Next Steps

After successful installation:

1. **Explore tutorials** - Learn features step by step
2. **Customize appearance** - Find your perfect theme
3. **Import existing notes** - Migrate from other systems
4. **Set up workflows** - Develop note-taking habits
5. **Join community** - Get help and share tips

## 📚 Additional Resources

- **[Welcome Tutorial](welcome.md)** - Basic usage guide
- **[Creating Notes](creating-notes.md)** - Note structure and organization
- **[Keyboard Shortcuts](../features/keyboard-shortcuts.md)** - Speed up your workflow
- **[Theme Guide](../features/themes.md)** - Customize your appearance
- **[Search Guide](../features/search-guide.md)** - Master advanced search

---

**Congratulations!** 🎉 You now have Notes Wiki installed and configured. Start creating your knowledge base and enjoy your new note-taking system! 