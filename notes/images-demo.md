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

The simplest way to add an image is using standard Markdown syntax:

```markdown
![Alt text](path/to/image.jpg)
```

For example:
```markdown
![A beautiful sunset](/images/notes/sunset.jpg)
```

## Image Storage

Images should be stored in the `/images/` directory with a structure that mirrors your notes:
- `/images/notes/` - General note images
- `/images/tutorials/` - Tutorial screenshots and diagrams
- `/images/reference/` - Reference materials and charts

## Image Alignment and Sizing

You can control image alignment and size using special keywords in the alt text:

### Left-aligned image
```markdown
![left: Description of image](/images/example.jpg)
```
This will float the image to the left with text wrapping around it.

### Right-aligned image
```markdown
![right: Description of image](/images/example.jpg)
```
This will float the image to the right with text wrapping around it.

### Size control
Use size keywords in your alt text:
- `![small: Image description](/images/example.jpg)` - Max width: 300px
- `![medium: Image description](/images/example.jpg)` - Max width: 600px
- `![large: Image description](/images/example.jpg)` - Full width

### Combining alignment and size
```markdown
![left small: A small left-aligned image](/images/example.jpg)
```

## Images with Captions

For images that need captions, use HTML figure elements:

```html
<figure>
  <img src="/images/example.jpg" alt="Description">
  <figcaption>This is a caption explaining the image above.</figcaption>
</figure>
```

## External Images

While it's recommended to store images locally for a self-contained wiki, you can also use external image URLs:

```markdown
![External image](https://example.com/image.jpg)
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