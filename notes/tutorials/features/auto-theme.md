---
title: Auto Theme Switching
tags: [themes, customization, accessibility, automation]
author: NotesWiki Team
created: 2025-01-23
updated: 2025-01-23
description: Automatically switch themes based on your system's dark mode preference
---

# Auto Theme Switching

Auto theme switching allows NotesWiki to automatically adapt its appearance based on your operating system's dark mode setting. This creates a seamless experience that matches your system-wide preference and can help reduce eye strain by using appropriate themes for different times of day.

## How Auto Theme Works

When enabled, auto theme:
1. **Detects your system preference** - Checks if your OS is in light or dark mode
2. **Applies matching theme** - Switches between your chosen light and dark themes
3. **Updates in real-time** - Changes immediately when you toggle system dark mode
4. **Remembers your choices** - Saves your preferred themes for each mode

## Enabling Auto Theme

### Quick Setup

1. Open **Settings** (⚙️) or press `Ctrl + ,`
2. Go to the **General** tab
3. Toggle **"Auto Theme"** to ON
4. NotesWiki immediately switches to match your system

### Choosing Auto Theme Pairs

When auto theme is enabled:
1. **Light Mode Theme** - Select your preferred theme for light mode
2. **Dark Mode Theme** - Select your preferred theme for dark mode
3. Both selections are saved automatically

## Setting Up Theme Pairs

### Recommended Combinations

**Classic Pairing**:
- Light: `GitHub Light`
- Dark: `GitHub Dark`

**High Contrast**:
- Light: `Light`
- Dark: `Dracula`

**Soft Colors**:
- Light: `Soft Era`
- Dark: `Tokyo Night`

**Material Design**:
- Light: `Material`
- Dark: `Material Ocean`

**Solarized**:
- Light: `Solarized Light`
- Dark: `Solarized Dark`

### Creating Custom Pairs

Consider these factors when pairing themes:
1. **Contrast levels** - Similar contrast ratios for consistency
2. **Color temperature** - Warm light with warm dark, etc.
3. **Style consistency** - Matching design philosophies
4. **Personal preference** - What feels comfortable to your eyes

## System Requirements

### Supported Operating Systems

Auto theme works with:
- **Windows 10/11** - Uses system dark mode setting
- **macOS 10.14+** - Mojave and later with dark mode
- **Linux** - Most desktop environments with dark mode
- **iOS/iPadOS** - Follows system appearance
- **Android** - Follows system theme (Android 10+)

### Browser Support

All modern browsers support auto theme:
- Chrome/Edge 76+
- Firefox 67+
- Safari 12.1+
- Opera 63+

## Manual Override

### Temporary Override

While auto theme is enabled:
1. Manually select any theme from the theme gallery
2. This creates a temporary override
3. Auto theme resumes when system preference changes

### Disable Auto Theme

To return to manual theme control:
1. Open Settings
2. Toggle **"Auto Theme"** to OFF
3. Your current theme remains active
4. Manual theme selection resumes

## Advanced Configuration

### Time-Based Switching

While NotesWiki doesn't directly support time-based switching, you can achieve this by:

1. **Using OS scheduling**:
   - Windows: Night Light settings
   - macOS: Night Shift or shortcuts
   - Linux: Redshift or similar tools

2. **Browser extensions**:
   - Dark Reader with scheduling
   - Auto Dark Mode extensions

### Multiple Theme Rotation

For more than two themes:
1. Set up OS automation to change dark mode multiple times
2. Adjust auto theme pairs between changes
3. Create a rotation schedule

## Benefits of Auto Theme

### Eye Strain Reduction
- Bright themes during day reduce squinting
- Dark themes at night reduce blue light
- Automatic switching prevents jarring transitions

### Battery Savings
- Dark themes on OLED displays save battery
- Automatic optimization based on time of day
- No manual intervention needed

### Consistency
- Matches your system-wide appearance
- Unified experience across applications
- Reduces cognitive load from mismatched themes

## Troubleshooting

### Auto Theme Not Working

**Check system settings**:
1. Ensure OS dark mode is properly configured
2. Try toggling system dark mode to test
3. Check browser permissions for theme detection

**Browser-specific fixes**:
- **Chrome**: Check `chrome://flags/#enable-force-dark`
- **Firefox**: Verify `ui.systemUsesDarkTheme` in about:config
- **Safari**: Ensure "Use dark appearance" is allowed for websites

### Theme Not Switching

1. **Refresh the page** - Sometimes needed after enabling
2. **Check theme compatibility** - Ensure both themes load properly
3. **Clear cache** - Browser cache might interfere
4. **Check console** - Look for error messages

### Incorrect Theme Applied

If the wrong theme appears:
1. Toggle auto theme off and on
2. Manually select correct themes for each mode
3. Test by switching OS dark mode

## Best Practices

### Choosing Complementary Themes

**Similar Style**:
- Keep visual consistency between modes
- Example: `Ayu Light` ↔ `Ayu Mirage`

**Contrast Consideration**:
- Don't pair extreme light with extreme dark
- Gradual transitions are easier on eyes

**Color Temperature**:
- Warm light themes with warm dark themes
- Cool light themes with cool dark themes

### Testing Your Setup

1. **Toggle OS dark mode** several times
2. **Check readability** in both modes
3. **Test at different times** of day
4. **Verify all UI elements** remain visible

## Integration with Other Features

### Focus Mode
- Auto theme works seamlessly with focus mode
- Each theme maintains its focus mode styling
- Consistent experience across modes

### Custom CSS
- Custom CSS applies to both themes
- Use theme-specific selectors for different styles:
```css
[data-theme="github-light"] {
  /* Light mode specific styles */
}

[data-theme="github-dark"] {
  /* Dark mode specific styles */
}
```

### Typography Settings
- Font settings remain consistent
- Consider slightly larger fonts for dark themes
- Test readability in both modes

## Tips and Tricks

1. **Schedule OS dark mode** for sunrise/sunset
2. **Use high contrast pairs** if you have vision concerns
3. **Test themes** at different times before committing
4. **Create custom CSS** for smooth transitions
5. **Match terminal themes** for development work

## Common Use Cases

### Daily Work Schedule
- Light theme: 9 AM - 6 PM
- Dark theme: 6 PM - 9 AM
- Automatic switching via OS

### Presentation Mode
- Temporarily disable for consistent appearance
- Re-enable after presentation
- Prevents unexpected theme changes

### Shared Devices
- Auto theme adapts to each user's preference
- No manual switching needed
- Consistent experience for all users

## Related Features

- [[Themes]] - Explore all available themes
- [[Custom CSS]] - Customize themes further
- [[Settings Customization]] - Other settings options
- [[Typography and Fonts|Typography]] - Adjust for each theme
- [[Focus Mode]] - Combine with auto theme

## Future Possibilities

While not currently available, potential enhancements could include:
- Multiple theme schedules
- Location-based switching
- Custom switching conditions
- Theme transition animations

For now, auto theme provides reliable, system-integrated theme switching that covers most use cases effectively.