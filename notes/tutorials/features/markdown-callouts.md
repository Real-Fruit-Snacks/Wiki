---
title: Callouts Demonstration
tags: [demo, documentation, callouts]
created: 2024-01-15
author: Wiki Admin
description: Demonstration of all available callout types and their usage
---

# Callouts Demonstration

This page demonstrates all available callout types in the wiki system. Callouts are special blockquotes that provide visual emphasis for important information.

## Basic Syntax

To create a callout, use the following syntax:

```markdown
> [!TYPE] Optional Title
> Content of the callout
> Can span multiple lines
```

## Available Callout Types

### Warning

> [!WARNING] Potential Data Loss Risk
> Always backup your important notes before making bulk changes to the wiki system. 
> Operations like theme customization, bulk file moves, or index rebuilding could 
> potentially affect your content if not done carefully.

> [!WARNING] Browser Compatibility Notice
> Some advanced features may not work properly in Internet Explorer or very old browser versions. 
> For the best experience, use Chrome 66+, Firefox 63+, Edge 79+, or Safari 13.1+.

### Info

> [!INFO] Search Index Updates
> The search index is automatically rebuilt when you add or modify notes. This process 
> runs in the background and typically completes within a few seconds. If search results 
> seem outdated, you can manually rebuild the index using the `build.py` script.

> [!INFO] Theme System Architecture
> The wiki includes 50+ professional themes that use CSS custom properties for dynamic 
> switching. Each theme provides comprehensive styling for syntax highlighting, UI elements, 
> and responsive design across all device types.

### Tip

> [!TIP] Keyboard Shortcuts for Productivity
> Press `?` at any time to see all available keyboard shortcuts. Popular shortcuts include:
> - `Ctrl+K` for quick search
> - `Ctrl+T` for new tab
> - `Ctrl+F` for tag filtering
> - `/` for instant search focus

> [!TIP] Advanced Search Techniques
> Use search operators for precise results: `"exact phrase"` for exact matches, 
> `tag:javascript` to filter by tags, `author:name` for author filtering, and 
> `-exclude` to exclude terms from results.

### Note

> [!NOTE] Content Organization Best Practices
> Organize your notes in logical folder structures within the `/notes/` directory. 
> Use consistent naming conventions, add descriptive YAML frontmatter, and apply 
> relevant tags for easy discovery and filtering.

> [!NOTE] Responsive Context Filtering
> In v2.9.0, context categories automatically switch to a dropdown menu on mobile 
> devices or when you have 6+ categories. This ensures optimal navigation experience 
> across all screen sizes.

### Danger

> [!DANGER] Critical System Files
> Never delete or modify these essential files: `index.html`, `script.js`, `style.css`, 
> `build.py`, or any files in the `/libs/` directory. These files are required for 
> the wiki to function properly and corruption could render your wiki inaccessible.

> [!DANGER] Custom CSS Injection Risks
> When adding custom CSS in Settings → Advanced, avoid modifying core layout properties 
> or overriding security-related styles. Incorrect CSS can break the interface or 
> compromise the responsive design system.

### Important

> [!IMPORTANT] Regular Backup Strategy
> Your wiki data is stored locally in browser storage and as files. Implement a regular 
> backup strategy by:
> - Exporting settings periodically
> - Keeping git repository backups
> - Downloading important notes locally

> [!IMPORTANT] Memory Management for Large Wikis
> If your wiki contains hundreds of notes, monitor browser memory usage. Consider:
> - Closing unused tabs regularly
> - Using the tab limit settings
> - Clearing browser cache periodically

### Caution

> [!CAUTION] Plugin and Extension Compatibility
> Some browser extensions (especially ad blockers or script blockers) may interfere 
> with wiki functionality. If you experience issues, try disabling extensions or 
> adding your wiki domain to the allowlist.

> [!CAUTION] Large File Uploads
> While the wiki can handle various image formats, large files (>5MB) may slow down 
> page loading. Optimize images before uploading and consider using external hosting 
> for very large media files.

### Success

> [!SUCCESS] Deployment Complete!
> Your wiki has been successfully deployed and is fully operational. All features 
> including search, themes, tabs, and responsive navigation are working correctly. 
> Start adding your content to the `/notes/` directory!

> [!SUCCESS] Performance Optimization Achieved
> The wiki achieves excellent performance with:
> - <100ms load times on average hardware
> - <5MB total download size including all themes
> - 100% offline capability after initial load

### Question

> [!QUESTION] Need Help with Advanced Features?
> Explore the demo notes to learn about advanced features like:
> - Custom callouts and rich formatting
> - Advanced search operators and filtering
> - Keyboard shortcuts and productivity tips
> - Theme customization and CSS injection

> [!QUESTION] Looking for Integration Options?
> The wiki can be integrated with various workflows:
> - GitHub/GitLab Pages for automatic deployment
> - Custom domains and SSL certificates
> - Analytics and monitoring tools
> - Team collaboration workflows

### Example

> [!EXAMPLE] Creating a Project Wiki
> **File Structure:**
> ```
> /notes/projects/my-app/
> ├── overview.md (project description)
> ├── setup.md (installation guide)
> ├── api.md (API documentation)
> └── troubleshooting.md (common issues)
> ```
> 
> **YAML Frontmatter:**
> ```yaml
> ---
> title: Project Overview
> tags: [project, documentation, my-app]
> author: Team Lead
> status: active
> ---
> ```

> [!EXAMPLE] Code Documentation Template
> Use this template for documenting code:
> 
> ```javascript title:"Function Example"
> /**
>  * Calculates user productivity score
>  * @param {number} tasksCompleted - Tasks finished
>  * @param {number} timeSpent - Hours worked
>  * @returns {number} Productivity score (0-100)
>  */
> function calculateProductivity(tasksCompleted, timeSpent) {
>     return Math.min(100, (tasksCompleted / timeSpent) * 10);
> }
> ```

### Quote

> [!QUOTE] Documentation Best Practices
> "The best documentation is the one that doesn't need to exist because the system 
> is so intuitive. The second best is the one that makes complex things feel simple."
> 
> — Notes Wiki Philosophy

> [!QUOTE] User Testimonial
> "This wiki system transformed our team's knowledge sharing. The combination of 
> powerful search, beautiful themes, and zero maintenance overhead made it our 
> go-to documentation platform."
> 
> — Development Team, Tech Startup

### Bug

> [!BUG] Known Issue: Safari Private Mode
> **Issue:** Local storage limitations in Safari private browsing mode may prevent 
> settings from persisting between sessions.
> 
> **Workaround:** Use normal browsing mode or export/import settings manually.
> 
> **Status:** Under investigation for future releases.

> [!BUG] Edge Case: Very Long Note Titles
> **Issue:** Note titles longer than 100 characters may be truncated in tab headers 
> on mobile devices with narrow screens.
> 
> **Impact:** Visual only, functionality not affected.
> 
> **Fix:** Implemented responsive text truncation with hover tooltips.

### Todo

> [!TODO] Content Migration Checklist
> - [ ] Import existing documentation from old system
> - [ ] Set up consistent tagging system
> - [ ] Create navigation structure in `/notes/`
> - [ ] Configure team access permissions
> - [ ] Set up automated backups
> - [ ] Train team members on wiki features

> [!TODO] Wiki Enhancement Ideas
> - [ ] Add custom theme creation guide
> - [ ] Implement advanced export features  
> - [ ] Create integration with external tools
> - [ ] Set up analytics and usage tracking
> - [ ] Develop mobile app companion
> - [ ] Add collaborative editing features

## Advanced Usage

### Callouts with Complex Content

> [!INFO] Callouts Support Rich Content
> Callouts can contain various types of content:
> - Lists like this one
> - **Bold text** and *italic text*
> - [Links to other pages](#)
> 
> They can even contain code blocks:
> ```javascript
> console.log("Hello from a callout!");
> ```

### Nested Callouts

> [!WARNING] Parent Callout
> This is the main callout.
> 
> > [!INFO] Nested Callout
> > Callouts can be nested inside other callouts for complex information hierarchy.

### Multiple Paragraphs

> [!NOTE] Long Content Example
> This is the first paragraph of the callout. It contains some introductory information.
> 
> This is the second paragraph. Notice how the callout maintains proper spacing between paragraphs.
> 
> And here's a third paragraph with a list:
> 1. First item
> 2. Second item
> 3. Third item

## Best Practices

> [!TIP] When to Use Callouts
> - Use callouts sparingly to maintain their effectiveness
> - Choose the appropriate type based on the content
> - Keep callout content concise when possible
> - Use custom titles to provide context

> [!CAUTION] Avoid Overuse
> Too many callouts on a single page can be overwhelming and reduce their impact. Use them strategically to highlight truly important information.

## Theme Compatibility

> [!SUCCESS] Works with All Themes!
> The callout system is designed to work seamlessly with all 15+ built-in themes. Colors and styles automatically adapt to maintain readability and visual consistency.