---
title: External Links
tags: [navigation, links, settings, security]
author: NotesWiki Team
created: 2025-01-23
updated: 2025-01-23
description: Control how external links behave in your wiki
---

# External Links

External links in NotesWiki are handled intelligently to maintain your workflow while providing access to outside resources. You can control whether external links open in new tabs, display warnings, or follow other behaviors based on your preferences.

## What Are External Links?

External links are any links that point outside your wiki:
- **Web URLs**: `https://example.com`
- **Email links**: `mailto:user@example.com`
- **Protocol links**: `ftp://`, `file://`, etc.
- **Absolute URLs**: Any link starting with `http://` or `https://`

Internal links include:
- **Wiki links**: `[[Page Name]]`
- **Relative paths**: `../notes/example.md`
- **Hash links**: `#section-name`

## Default Behavior

By default, external links:
1. **Open in new tabs** - Preserves your wiki context
2. **Show visual indicators** - Small icon after the link
3. **Include security attributes** - `rel="noopener noreferrer"`
4. **Maintain your position** - Wiki stays on current page

## Configuring External Links

### Settings Options

Navigate to **Settings → Navigation** to find:

1. **Open in New Tab**
   - **Enabled** (default): Links open in new browser tabs
   - **Disabled**: Links replace current wiki tab

2. **Show External Link Icon**
   - **Enabled**: Shows ↗️ icon after external links
   - **Disabled**: No visual indicator

3. **Warn Before Opening**
   - **Enabled**: Shows confirmation before opening
   - **Disabled**: Opens immediately on click

## Link Behavior Patterns

### Standard External Link
```markdown
Check out [GitHub](https://github.com)
```
- Opens in new tab (if enabled)
- Shows external icon
- Maintains current wiki page

### Email Links
```markdown
Contact us at [support@example.com](mailto:support@example.com)
```
- Opens default email client
- No new tab needed
- Works with web-based email

### Protocol Links
```markdown
Download via [FTP](ftp://files.example.com)
```
- Handled by browser/OS
- May prompt for application

## Security Considerations

### Automatic Security

All external links automatically include:
```html
<a href="https://example.com" 
   target="_blank" 
   rel="noopener noreferrer">
```

- **noopener**: Prevents window.opener access
- **noreferrer**: Hides referrer information
- **target="_blank"**: Opens in new tab

### Why This Matters

1. **Privacy**: Referrer hiding protects your wiki URL
2. **Security**: Prevents external sites from controlling your wiki
3. **Performance**: New tabs don't affect wiki performance

## Visual Indicators

### External Link Icons

Default styling shows:
- ↗️ or 🔗 icon after external links
- Different color (often accent color)
- Subtle animation on hover

### Custom Styling

Use custom CSS to modify appearance:
```css
/* Change external link color */
a[target="_blank"] {
  color: #0066cc;
}

/* Custom external link icon */
a[target="_blank"]::after {
  content: " ↗";
  font-size: 0.8em;
  vertical-align: super;
}

/* Remove external link indicators */
a[target="_blank"]::after {
  display: none;
}
```

## Best Practices

### Link Text

**Good**: Descriptive link text
```markdown
Learn more in the [Python documentation](https://docs.python.org)
```

**Avoid**: Generic link text
```markdown
Click [here](https://docs.python.org) for more info
```

### Link Organization

1. **Group related links** in resource sections
2. **Use link lists** for multiple external resources
3. **Add descriptions** for context
4. **Check links regularly** for validity

### Performance Tips

- Avoid too many external links per page
- Consider creating dedicated reference pages
- Use descriptive titles to reduce clicks

## Common Use Cases

### Documentation References
```markdown
## References
- [MDN Web Docs](https://developer.mozilla.org)
- [Stack Overflow](https://stackoverflow.com)
- [Can I Use](https://caniuse.com)
```

### Attribution Links
```markdown
> "Quote from article" - [Source](https://example.com/article)
```

### Tool Integration
```markdown
Edit this diagram in [draw.io](https://app.diagrams.net)
```

## Advanced Configuration

### Per-Link Behavior

Override default behavior inline:
```markdown
<!-- Force same tab -->
<a href="https://example.com" target="_self">Same tab link</a>

<!-- Force new tab -->
<a href="https://example.com" target="_blank">New tab link</a>
```

### JavaScript Handling

For dynamic links in custom scripts:
```javascript
// Add external link attributes
document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (!link.hostname.includes(window.location.hostname)) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});
```

## Keyboard Shortcuts

Working with external links via keyboard:

| Action | Shortcut |
|--------|----------|
| Open link | `Enter` |
| Open in new tab | `Ctrl/Cmd + Enter` |
| Open in new window | `Shift + Enter` |
| Copy link address | `Right-click → Copy link` |

## Troubleshooting

### Links Not Opening

**Check browser settings**:
- Pop-up blocker may interfere
- Browser security settings
- Extension conflicts

**Solutions**:
1. Whitelist your wiki domain
2. Disable aggressive ad blockers
3. Check browser console for errors

### Icon Not Showing

If external link icons are missing:
1. Check theme compatibility
2. Verify settings are enabled
3. Clear browser cache
4. Check custom CSS conflicts

### Security Warnings

Some browsers warn about:
- Mixed content (HTTP links on HTTPS wiki)
- Suspicious domains
- Invalid certificates

**Best practice**: Use HTTPS links when possible

## Mobile Considerations

### Touch Behavior

On mobile devices:
- **Tap**: Opens based on settings
- **Long press**: Shows link menu
- **Two-finger tap**: May open in new tab

### Mobile Settings

Consider different settings for mobile:
- New tab behavior may vary
- External apps may intercept links
- Data usage considerations

## Integration with Other Features

### Search Results
- External links in search are clearly marked
- Settings apply to search result links
- Preview shows domain for external links

### Bookmarks
- External links can be bookmarked
- Bookmark indicator shows link type
- Quick access to external resources

### Split View
- External links respect split view context
- Can open external sites in split panes
- Maintains internal/external separation

## Privacy Tips

### Hiding Referrer
```markdown
<!-- No referrer for specific link -->
<a href="https://example.com" rel="noreferrer">Private link</a>
```

### URL Shortening
- Consider privacy implications
- Use trusted shorteners only
- Document original URLs

### Tracking Parameters
- Remove unnecessary UTM parameters
- Clean URLs before sharing
- Consider user privacy

## Related Features

- [[Wiki Links]] - Internal linking system
- [[Navigation|Link Navigation]] - General navigation
- [[Keyboard Shortcuts]] - Link keyboard controls
- [[Custom CSS]] - Styling external links
- [[Security|Privacy & Security]] - Security considerations