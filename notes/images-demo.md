---
title: Image Usage Guide
tags: [documentation, guide, images]
created: 2025-01-06
author: Wiki Admin
description: How to add and use images in your notes
---

# Image Usage Guide

This guide demonstrates how to add images to your notes using various methods and styling options.

## Basic Image Usage

### Standard Markdown Syntax
The simplest way to add an image is using standard Markdown syntax:

```markdown
![Alt text](path/to/image.jpg)
```

**Example:**
```markdown
![A beautiful sunset over the mountains](/images/notes/sunset.jpg)
```

### HTML Image Syntax
For more control, use HTML img tags:

```html
<img src="/images/example.jpg" alt="Detailed description" title="Hover tooltip text">
```

### With Click-to-Enlarge
```html
<a href="/images/full-size/diagram.png" target="_blank">
  <img src="/images/thumbnails/diagram.png" alt="System architecture diagram">
</a>
```

## Image Storage Organization

### Recommended Directory Structure
```
/images/
├── notes/              # General note images
├── tutorials/          # Tutorial screenshots
├── reference/          # Charts, diagrams, references
├── projects/           # Project-specific images
├── screenshots/        # UI screenshots
├── diagrams/           # Technical diagrams
├── icons/             # Small icons and symbols
├── banners/           # Header/banner images
├── thumbnails/        # Smaller preview versions
└── originals/         # Full-resolution source images
```

### File Naming Conventions
- Use descriptive names: `user-login-flow.png` instead of `img1.png`
- Include dimensions for variants: `logo-256x256.png`, `logo-128x128.png`
- Use consistent format: `project-name_screenshot_2024-01-15.png`

## Image Sizing and Alignment

### Size Control with Keywords
Use size keywords in your alt text for automatic sizing:

```markdown
![tiny: Small icon](/images/icons/settings.png)          # Max width: 100px
![small: Medium image](/images/example.jpg)             # Max width: 300px  
![medium: Standard image](/images/example.jpg)          # Max width: 600px
![large: Full width image](/images/example.jpg)         # Max width: 900px
![full: Container width](/images/example.jpg)           # 100% width
![xlarge: Extra large](/images/example.jpg)             # Max width: 1200px
```

### Alignment Options
Control image positioning with alignment keywords:

```markdown
![left: Float left with text wrap](/images/example.jpg)
![right: Float right with text wrap](/images/example.jpg)
![center: Centered block image](/images/example.jpg)
![inline: Inline with text](/images/small-icon.png)
```

### Combining Size and Alignment
```markdown
![left small: Small left-aligned image](/images/thumb.jpg)
![right medium: Medium right-aligned image](/images/screenshot.png)
![center large: Large centered image](/images/banner.jpg)
```

### Custom CSS Classes (HTML Method)
```html
<img src="/images/example.jpg" 
     alt="Description" 
     class="img-responsive img-rounded img-shadow"
     style="max-width: 450px;">
```

## Advanced Image Layouts

### Images with Captions
Multiple caption approaches:

**Method 1: HTML Figure Element**
```html
<figure>
  <img src="/images/architecture.png" alt="System architecture overview">
  <figcaption>
    <strong>Figure 1:</strong> High-level system architecture showing 
    microservices, databases, and external integrations.
  </figcaption>
</figure>
```

**Method 2: Markdown with HTML Caption**
```markdown
![Database schema diagram](/images/database-schema.png)
*Figure 2: Database relationship diagram showing all tables and foreign keys*
```

**Method 3: Enhanced Figure with Styling**
```html
<figure class="image-figure">
  <img src="/images/user-flow.png" 
       alt="User registration and onboarding flow" 
       title="Click to view full size">
  <figcaption>
    <span class="figure-label">User Flow Diagram</span><br>
    Complete user journey from registration through first login, 
    including email verification and profile setup steps.
  </figcaption>
</figure>
```

### Side-by-Side Image Comparisons
```html
<div class="image-comparison">
  <div class="comparison-item">
    <img src="/images/before.png" alt="Before optimization">
    <p><strong>Before:</strong> Page load time 3.2 seconds</p>
  </div>
  <div class="comparison-item">
    <img src="/images/after.png" alt="After optimization">
    <p><strong>After:</strong> Page load time 0.8 seconds</p>
  </div>
</div>
```

### Image Gallery Layout
```html
<div class="image-gallery">
  <div class="gallery-item">
    <img src="/images/gallery/screenshot-1.png" alt="Login screen">
    <span class="gallery-caption">Login Interface</span>
  </div>
  <div class="gallery-item">
    <img src="/images/gallery/screenshot-2.png" alt="Dashboard view">
    <span class="gallery-caption">Main Dashboard</span>
  </div>
  <div class="gallery-item">
    <img src="/images/gallery/screenshot-3.png" alt="Settings panel">
    <span class="gallery-caption">Settings Panel</span>
  </div>
</div>
```

## Image Formats and Use Cases

### JPEG - Best for Photographs
```markdown
![Mountain landscape photo](/images/landscapes/mountain-sunset.jpg)
```
- **Use for:** Photos, complex images with many colors
- **Compression:** Lossy, smaller file sizes
- **Transparency:** Not supported

### PNG - Best for Screenshots and Graphics
```markdown
![User interface screenshot](/images/screenshots/dashboard.png)
```
- **Use for:** Screenshots, logos, images with transparency
- **Compression:** Lossless, larger file sizes
- **Transparency:** Supported

### SVG - Best for Logos and Icons
```markdown
![Company logo](/images/logos/company-logo.svg)
```
- **Use for:** Logos, icons, simple graphics
- **Scalability:** Vector-based, infinite scaling
- **File size:** Very small for simple graphics

### WebP - Modern Format
```html
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="Hero image with fallback">
</picture>
```

### GIF - Animated Images
```markdown
![Loading animation](/images/animations/loading-spinner.gif)
```

## Responsive Image Techniques

### Different Sizes for Different Screens
```html
<picture>
  <source media="(max-width: 480px)" srcset="/images/mobile/banner-480w.jpg">
  <source media="(max-width: 768px)" srcset="/images/tablet/banner-768w.jpg">
  <source media="(max-width: 1200px)" srcset="/images/desktop/banner-1200w.jpg">
  <img src="/images/desktop/banner-1200w.jpg" alt="Responsive banner image">
</picture>
```

### High-DPI Display Support
```html
<img src="/images/logo.png" 
     srcset="/images/logo.png 1x, /images/logo@2x.png 2x" 
     alt="Company logo">
```

### Lazy Loading for Performance
```html
<img src="/images/placeholder.jpg" 
     data-src="/images/large-image.jpg" 
     alt="Large image with lazy loading"
     loading="lazy">
```

## External vs Local Images

### Local Images (Recommended)
```markdown
<!-- Relative path from project root -->
![Local screenshot](/images/screenshots/interface.png)

<!-- Absolute path (if needed) -->
![Local diagram](../images/diagrams/flow-chart.svg)
```

### External Images
```markdown
<!-- Direct external URL -->
![External image](https://example.com/images/photo.jpg)

<!-- External with fallback -->
![Profile photo](https://avatars.githubusercontent.com/user123?s=200)
```

### CDN Images with Local Fallback
```html
<img src="https://cdn.example.com/images/banner.jpg" 
     alt="Banner image" 
     onerror="this.src='/images/fallback/banner.jpg'">
```

## Accessibility and SEO Optimization

### Comprehensive Alt Text
```markdown
<!-- Poor alt text -->
![Image](/images/chart.png)

<!-- Good alt text -->
![Bar chart showing 40% increase in user engagement over 6 months](/images/engagement-chart.png)

<!-- Context-specific alt text -->
![Error: Form validation showing required email field highlighted in red](/images/form-error.png)
```

### Title Attributes for Additional Context
```html
<img src="/images/complex-diagram.png" 
     alt="Database relationship diagram" 
     title="Click to view full-size version with zoom capability">
```

### ARIA Labels for Enhanced Accessibility
```html
<img src="/images/status-icon.png" 
     alt="Success status" 
     aria-label="Operation completed successfully"
     role="img">
```

### Decorative Images
```html
<!-- For purely decorative images -->
<img src="/images/decorative-border.png" alt="" role="presentation">
```

## Image Optimization Examples

### File Size Optimization
```markdown
<!-- Original: 2.5MB -->
![Original photo](/images/originals/vacation-photo.jpg)

<!-- Optimized: 250KB -->
![Optimized photo](/images/optimized/vacation-photo-compressed.jpg)

<!-- Thumbnail: 15KB -->
![Thumbnail preview](/images/thumbnails/vacation-photo-thumb.jpg)
```

### Progressive Loading Strategy
```html
<!-- Thumbnail loads first -->
<img src="/images/thumbnails/preview.jpg" 
     alt="Preview image"
     style="filter: blur(5px); transition: filter 0.3s;">

<!-- Full image loads in background -->
<img src="/images/full/high-res.jpg" 
     alt="Full resolution image"
     onload="this.previousElementSibling.style.filter='none';"
     style="position: absolute; opacity: 0; transition: opacity 0.3s;">
```

## Advanced Image Features

### Image Maps (Clickable Areas)
```html
<img src="/images/office-layout.png" alt="Office floor plan" usemap="#office-map">
<map name="office-map">
  <area shape="rect" coords="10,10,100,50" href="#meeting-room" alt="Conference Room A">
  <area shape="circle" coords="150,75,25" href="#kitchen" alt="Kitchen Area">
  <area shape="poly" coords="200,10,250,50,200,90,150,50" href="#workspace" alt="Open Workspace">
</map>
```

### Image Overlays and Annotations
```html
<div class="image-container">
  <img src="/images/screenshot.png" alt="Application interface">
  <div class="image-overlay">
    <div class="annotation" style="top: 20%; left: 30%;">
      <span class="annotation-marker">1</span>
      <div class="annotation-tooltip">Navigation menu</div>
    </div>
    <div class="annotation" style="top: 50%; left: 70%;">
      <span class="annotation-marker">2</span>
      <div class="annotation-tooltip">Main content area</div>
    </div>
  </div>
</div>
```

### Image Carousels/Slideshows
```html
<div class="image-slideshow">
  <div class="slide active">
    <img src="/images/slides/slide-1.jpg" alt="Feature overview">
    <p class="slide-caption">Main features and capabilities</p>
  </div>
  <div class="slide">
    <img src="/images/slides/slide-2.jpg" alt="Implementation details">
    <p class="slide-caption">Technical implementation</p>
  </div>
  <div class="slide">
    <img src="/images/slides/slide-3.jpg" alt="Results and metrics">
    <p class="slide-caption">Performance metrics and results</p>
  </div>
</div>
```

## External Images and Hosting

### GitHub Images
```markdown
![README diagram](https://raw.githubusercontent.com/username/repo/main/docs/diagram.png)
```

### GitLab Images  
```markdown
![Architecture diagram](https://gitlab.com/username/project/-/raw/main/docs/architecture.png)
```

### Image Hosting Services
```markdown
<!-- Imgur -->
![Hosted image](https://i.imgur.com/AbCdEfG.png)

<!-- AWS S3 -->
![S3 hosted](https://my-bucket.s3.amazonaws.com/images/photo.jpg)

<!-- Cloudinary -->
![Cloudinary optimized](https://res.cloudinary.com/account/image/upload/v1234/sample.jpg)
```

## Best Practices

1. **Use descriptive alt text** - This helps with accessibility and SEO
2. **Optimize image sizes** - Large images slow down page loading
3. **Use appropriate formats**:
   - JPEG for photographs
   - PNG for screenshots and images with transparency
   - SVG for logos and diagrams
4. **Organize images** - Keep your images directory structure clean and logical

## Image Styling

All images automatically receive:
- Rounded corners for a modern look
- Subtle shadow on hover
- Smooth transitions
- Responsive sizing (never exceed container width)

## Live Example

Here's a demonstration using a placeholder image:

![Demo placeholder image](/images/notes/demo-placeholder.svg)

## Example Gallery

Here's how you might create an image gallery using a combination of techniques:

```markdown
### Project Screenshots

![small left: Login screen](/images/projects/login.png)
The login screen features a clean, minimalist design with email and password fields.

![small right: Dashboard view](/images/projects/dashboard.png)
The dashboard provides an overview of all key metrics and recent activity.

<figure>
  <img src="/images/projects/analytics.png" alt="Analytics page showing graphs">
  <figcaption>The analytics page offers detailed insights with interactive charts and graphs.</figcaption>
</figure>
```

## Alignment Examples

### Left-aligned Image
![left small: Sample image aligned to the left](/images/notes/demo-placeholder.svg)
Lorem ipsum dolor sit amet, consectetur adipiscing elit. This text wraps around the left-aligned image. The image is floated to the left with appropriate margins to create a nice visual flow. You can continue adding more text here and it will wrap around the image naturally.

### Right-aligned Image
![right small: Sample image aligned to the right](/images/notes/demo-placeholder.svg)
Lorem ipsum dolor sit amet, consectetur adipiscing elit. This text wraps around the right-aligned image. The image is floated to the right with appropriate margins. This creates an interesting layout where text flows on the left side of the image.

### Centered Image with Caption
<figure>
  <img src="/images/notes/demo-placeholder.svg" alt="medium: Centered demonstration image">
  <figcaption>This is a centered image with a caption. The caption provides additional context about the image content.</figcaption>
</figure>

## Troubleshooting

**Image not showing?**
- Check the file path is correct
- Ensure the image file exists in the `/images/` directory
- Verify the file extension matches (case-sensitive on some systems)

**Image too large?**
- Use the size keywords (small, medium, large)
- Consider optimizing the image file itself
- Use image compression tools before uploading

**Text not wrapping properly?**
- Ensure you're using the correct alignment syntax
- Add clear fixes after floated images if needed