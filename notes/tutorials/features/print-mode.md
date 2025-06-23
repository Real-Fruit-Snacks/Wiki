---
title: Print Mode
tags: [export, printing, pdf, documentation]
author: NotesWiki Team
created: 2025-01-23
updated: 2025-01-23
description: Print your notes with optimized formatting and layout
---

# Print Mode

NotesWiki includes intelligent print styling that automatically optimizes your notes for printing or PDF export. When you print a note, unnecessary UI elements are hidden and the content is reformatted for optimal readability on paper.

## How to Print

### Quick Print
1. **Keyboard shortcut**: Press `Ctrl + P` (Windows/Linux) or `Cmd + P` (Mac)
2. **Browser menu**: File → Print
3. **Right-click menu**: Right-click → Print

### What Gets Printed

When printing, NotesWiki automatically:
- **Shows**: Note content, headings, text, images, tables, code blocks
- **Hides**: Navigation sidebar, header bar, tabs, buttons, tooltips
- **Optimizes**: Layout, margins, font sizes, page breaks

## Print Optimization Features

### Automatic Adjustments

1. **Clean Layout**
   - Removes all UI chrome
   - Centers content on page
   - Applies appropriate margins
   - Uses print-friendly fonts

2. **Smart Page Breaks**
   - Avoids breaking inside paragraphs
   - Keeps headings with content
   - Prevents orphaned lines
   - Maintains table integrity

3. **Image Handling**
   - Scales large images to fit
   - Maintains aspect ratios
   - Ensures images don't break across pages
   - Converts to grayscale if needed

4. **Code Block Formatting**
   - Preserves syntax highlighting
   - Maintains line numbers
   - Wraps long lines
   - Uses monospace fonts

## Print Settings

### Browser Print Dialog

Configure in your browser's print dialog:

1. **Layout**
   - Portrait or Landscape
   - Fit to page width
   - Scale percentage

2. **Paper**
   - Size (Letter, A4, etc.)
   - Margins (Normal, Narrow, Custom)
   - Headers and footers

3. **Options**
   - Background graphics
   - Selection only
   - Pages to print

### Recommended Settings

**For Documents**:
- Paper: Letter/A4
- Margins: Normal
- Scale: 100%
- Background: Off

**For Code**:
- Orientation: Landscape
- Margins: Narrow
- Scale: Fit to width
- Background: On (for syntax colors)

## Advanced Print Styling

### Custom Print CSS

Add print-specific styles via Custom CSS:

```css
@media print {
  /* Custom page margins */
  @page {
    margin: 1in;
    size: letter;
  }
  
  /* Force page breaks */
  h1 {
    page-break-before: always;
  }
  
  /* Prevent breaks */
  pre, table {
    page-break-inside: avoid;
  }
  
  /* Hide specific elements */
  .no-print {
    display: none !important;
  }
  
  /* Custom header */
  body::before {
    content: "Confidential Document";
    position: fixed;
    top: 0;
    right: 0;
    font-size: 12px;
    color: #999;
  }
}
```

### Print-Specific Classes

Use these classes in your notes:

```markdown
<div class="page-break"></div>
<!-- Forces a page break -->

<div class="no-print">
This content won't appear in print
</div>

<div class="print-only" style="display:none;">
This only appears when printing
</div>
```

## Creating PDFs

### Browser PDF Export

Most browsers can save as PDF:

1. Press `Ctrl/Cmd + P`
2. Select "Save as PDF" as destination
3. Configure options:
   - Paper size
   - Margins
   - Background graphics
4. Click Save

### PDF Best Practices

1. **Check preview** before saving
2. **Test links** - they remain clickable in PDFs
3. **Embed fonts** for consistency
4. **Include backgrounds** for code highlighting
5. **Set appropriate margins** for binding

## Print Layouts

### Single Note

Printing the current note:
- Content fills the page width
- Automatic pagination
- Headers create outline structure
- Images inline with text

### Multiple Notes

To print multiple notes:
1. Open each in separate tabs
2. Use browser's "Print all tabs" if available
3. Or create a combined document first

### Table of Contents

Long documents automatically generate:
- Page numbers for headings
- Hierarchical structure
- Works with PDF bookmarks

## Special Content Types

### Tables
- Tables maintain borders and shading
- Large tables may rotate to landscape
- Column widths adjust for paper
- Headers repeat on new pages

### Code Blocks
```css
/* Code maintains formatting */
@media print {
  pre {
    font-size: 10pt;
    line-height: 1.2;
  }
}
```
- Syntax highlighting preserved
- Line numbers optional
- Background shading configurable

### Images
- High resolution maintained
- Captions print below images
- Large images scale down
- SVGs remain vector

### Callouts
> [!note]
> Callouts maintain their styling and icons in print

- Icons convert to unicode
- Backgrounds print in grayscale
- Borders remain visible

## Troubleshooting

### Content Cut Off

If content is cut off:
1. Try landscape orientation
2. Reduce scale to 90% or "Fit"
3. Adjust margins to "Narrow"
4. Check custom CSS for conflicts

### Missing Elements

If elements don't print:
1. Check browser print preview
2. Enable "Background graphics"
3. Verify no `display: none` in print CSS
4. Try different browser

### Poor Quality

For better print quality:
1. Use PDF export instead of direct print
2. Increase browser zoom before printing
3. Use high-quality paper settings
4. Enable "Print backgrounds"

## Tips for Print-Friendly Notes

### Structure
1. Use clear heading hierarchy
2. Keep paragraphs concise
3. Use lists for easy scanning
4. Add page breaks before major sections

### Formatting
1. Avoid relying on color alone
2. Ensure sufficient contrast
3. Use standard fonts
4. Keep line lengths reasonable

### Images
1. Use high-resolution images
2. Add descriptive captions
3. Position images inline
4. Avoid floating layouts

## Platform-Specific Notes

### Windows
- Use "Microsoft Print to PDF"
- Check printer preferences
- Adjust ClearType for printing

### macOS
- Use Preview for PDF adjustments
- Check ColorSync profiles
- Use "Save as PDF" in print dialog

### Linux
- Install CUPS-PDF for PDF printing
- Check ghostscript settings
- Use print preview extensively

## Common Use Cases

### Meeting Notes
- Print for offline reference
- Share physical copies
- Archive important decisions

### Documentation
- Create user manuals
- Generate reference guides
- Produce training materials

### Code Reviews
- Print code with comments
- Annotate physical copies
- Share in meetings

### Study Materials
- Create physical study guides
- Print for offline learning
- Make annotatable copies

## Related Features

- [[Export|Export Options]] - Other export formats
- [[Custom CSS]] - Advanced print styling
- [[Typography and Fonts|Typography]] - Font considerations
- [[Themes]] - Theme impact on printing
- [[PDF Export|Creating PDFs]] - Dedicated PDF features

## Pro Tips

1. **Preview First**: Always check print preview
2. **Save Settings**: Browsers remember print settings
3. **Test Prints**: Do a test page first
4. **PDF Archive**: Save PDFs for consistent output
5. **Print Styles**: Develop custom print CSS for your needs