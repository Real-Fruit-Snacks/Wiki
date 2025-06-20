# GitLab Pages Deployment Guide

This Notes Wiki is fully compatible with GitLab Pages and includes everything needed for automatic deployment.

## 🚀 Quick GitLab Deployment

### Option 1: Import from GitHub (Recommended)
1. **Create New Project** in GitLab
2. **Import from GitHub**: Use `https://github.com/Real-Fruit-Snacks/Wiki.git`
3. **Wait for CI/CD**: GitLab automatically runs the build pipeline
4. **Access Your Wiki**: `https://[username].gitlab.io/[project-name]/`

### Option 2: Upload Release Package
1. **Download** the offline package from GitHub releases
2. **Extract** the zip file
3. **Create New GitLab Project**
4. **Upload files** to your new repository
5. **Automatic deployment** via included `.gitlab-ci.yml`

### Option 3: Fork and Configure
1. **Fork** this repository on GitHub
2. **Create GitLab project** and import from your fork
3. **Customize** as needed
4. **Push changes** to trigger deployment

## 📋 GitLab CI/CD Configuration

The included `.gitlab-ci.yml` provides:

### Build Stage
- **Python Environment**: Uses Python 3.11 Alpine image
- **Dependency Installation**: Installs PyYAML for build script
- **Asset Copying**: Copies all necessary files to `public/` directory
- **Index Generation**: Runs `build.py` to create searchable notes index
- **404 Page**: Creates client-side routing support

### Deploy Stage
- **GitLab Pages**: Automatic deployment to GitLab Pages
- **Artifact Handling**: Manages build artifacts efficiently
- **Branch Targeting**: Deploys from `main` and `master` branches

### Preview Environments
- **Merge Request Previews**: Automatic preview deployments
- **Review Apps**: Temporary environments for testing changes
- **Auto-Cleanup**: Automatic cleanup after merge request closure

## 🔧 Customization for GitLab

### Project Name Flexibility
The application now automatically detects your GitLab project name and adjusts all resource paths accordingly. **You can name your project anything** - it doesn't have to be "Wiki"!

**How it works:**
- Automatically detects if running on GitLab Pages (`*.gitlab.io`)
- Extracts project name from URL path
- Adjusts all resource paths (themes, notes, images) automatically
- No manual configuration needed

**Examples:**
- `username.gitlab.io/my-notes/` → Works automatically
- `username.gitlab.io/knowledge-base/` → Works automatically
- `username.gitlab.io/team-docs/` → Works automatically

**Customizing the App Name:**
While the project name is flexible, you'll want to update the displayed application name. See `CUSTOMIZATION.md` for a simple 3-line change to rebrand the app with your own name.

### Environment Variables
No environment variables required - works out of the box.

### Custom Domain
To use a custom domain with GitLab Pages:

1. **Configure DNS**: Point your domain to GitLab Pages
2. **Add Domain**: In GitLab project settings → Pages
3. **SSL Certificate**: GitLab provides automatic SSL

### Private Repositories
The wiki works with private GitLab repositories:
- Internal team wikis
- Private documentation
- Restricted access knowledge bases

## 📁 File Structure for GitLab

```
your-project/
├── .gitlab-ci.yml          # CI/CD configuration
├── index.html              # Main application
├── style.css               # Application styles
├── script.js               # Application logic
├── build.py                # Search index generator
├── libs/                   # JavaScript libraries
│   ├── marked.min.js       # Markdown parser
│   ├── prism.min.js        # Syntax highlighting
│   └── js-yaml.min.js      # YAML parser
├── themes/                 # 50+ professional themes with responsive context filtering
├── notes/                  # Your content (markdown files)
├── images/                 # Image assets
└── public/                 # Generated during build (GitLab Pages)
```

## 🛠️ Build Process

### Automatic Build Steps
1. **Environment Setup**: Python 3.11 Alpine container
2. **Dependency Installation**: PyYAML for YAML processing
3. **File Copying**: All assets copied to `public/` directory
4. **Index Generation**: Search index created from notes
5. **404 Page Creation**: Client-side routing support
6. **Deployment**: Automatic deployment to GitLab Pages

### Build Artifacts
- **Duration**: 1 hour for build artifacts
- **Pages Artifacts**: 30 days retention
- **Preview Artifacts**: 1 week retention

## 🌐 GitLab Pages Features

### Automatic HTTPS
- **SSL Certificates**: Automatic Let's Encrypt certificates
- **Force HTTPS**: Option to redirect HTTP to HTTPS
- **Custom Domains**: Support for custom domain names

### Access Control
- **Public**: Anyone can access (default)
- **Internal**: Only GitLab users can access
- **Private**: Only project members can access

### Performance
- **Global CDN**: Fast loading worldwide
- **Caching**: Automatic asset caching
- **Compression**: Automatic gzip compression

## 📊 Monitoring & Analytics

### GitLab Integration
- **CI/CD Pipelines**: Monitor build status
- **Pages Analytics**: Basic traffic statistics
- **Error Tracking**: Build failure notifications

### External Analytics
Add your preferred analytics by editing `index.html`:
- Google Analytics
- Matomo
- Custom tracking solutions

## 🔒 Security Considerations

### Content Security
- **Static Content**: No server-side processing
- **Client-Side Only**: All processing in browser
- **No Data Collection**: No personal data stored

### Access Control
- **Repository Permissions**: Control who can edit
- **Pages Access**: Configure public/private access
- **Branch Protection**: Protect main branch from direct pushes

## 🚨 Troubleshooting

### Common Issues

**Build Fails with Python Error:**
- Check `.gitlab-ci.yml` syntax
- Ensure PyYAML installation succeeds
- Verify Python 3.11 compatibility

**Pages Not Updating:**
- Check CI/CD pipeline status
- Verify `public/` directory contents
- Clear browser cache

**404 Errors:**
- Ensure `404.html` is created during build
- Check client-side routing configuration
- Verify file paths in `notes-index.json`

**Resources Not Loading (CSS/JS/Images):**
- Check browser console for path detection logs
- Verify project is accessed via GitLab Pages URL
- Clear browser cache and reload
- Console will show: `[Path Detection] GitLab Pages detected, base path: /your-project-name/`

### Build Logs
Access detailed build logs in:
1. **CI/CD** → **Pipelines**
2. **Click pipeline** → **View jobs**
3. **Click job** → **View logs**

## 📝 Content Management

### Adding Notes
1. **Create `.md` files** in `notes/` directory
2. **Add YAML frontmatter** with metadata
3. **Commit and push** to trigger rebuild
4. **Automatic indexing** via build script

### Organizing Content
- **Folder Structure**: Organize notes in subdirectories
- **YAML Metadata**: Use tags, authors, categories
- **Naming Convention**: Use descriptive filenames

### Content Guidelines
- **Markdown Format**: Standard markdown syntax
- **Image Paths**: Use relative paths to `images/` directory
- **Internal Links**: Use relative paths between notes

## 🎯 Best Practices

### Repository Management
- **Regular Commits**: Commit changes frequently
- **Descriptive Messages**: Use clear commit messages
- **Branch Strategy**: Use feature branches for major changes
- **Review Process**: Use merge requests for team collaboration

### Performance Optimization
- **Image Optimization**: Compress images before upload
- **Content Organization**: Keep note files reasonably sized
- **Regular Cleanup**: Remove unused files and images

### Backup Strategy
- **Repository Backup**: GitLab provides automatic backups
- **Export Options**: Use GitLab export functionality
- **Local Copies**: Keep local repository clones

---

## 🎉 Ready to Deploy!

Your Notes Wiki is now ready for GitLab Pages deployment. The included configuration handles everything automatically - just push your content and watch it deploy!

**Next Steps:**
1. Customize the content in `notes/` directory
2. Add your own themes (optional)
3. Configure custom domain (optional)
4. Set up team access (if needed)

**Support:**
- Check GitLab documentation for advanced Pages features
- Use GitLab issues for deployment-specific problems
- Refer to the main README for application features

Happy documenting with GitLab Pages! 🚀