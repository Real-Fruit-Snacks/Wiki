#!/usr/bin/env python3
import os
import re
from pathlib import Path

def hex_to_rgb(hex_color):
    """Convert hex color to RGB values"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def get_luminance(rgb):
    """Calculate relative luminance of a color"""
    def adjust_channel(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    
    r, g, b = rgb
    return 0.2126 * adjust_channel(r) + 0.7152 * adjust_channel(g) + 0.0722 * adjust_channel(b)

def get_contrast_ratio(color1, color2):
    """Calculate contrast ratio between two colors"""
    lum1 = get_luminance(hex_to_rgb(color1))
    lum2 = get_luminance(hex_to_rgb(color2))
    
    lighter = max(lum1, lum2)
    darker = min(lum1, lum2)
    
    return (lighter + 0.05) / (darker + 0.05)

def extract_color_value(line):
    """Extract hex color value from CSS line"""
    match = re.search(r'#[0-9a-fA-F]{6}', line)
    if match:
        return match.group(0)
    return None

def check_theme_contrast(theme_file):
    """Check contrast between accent-primary and badge-text in a theme"""
    accent_primary = None
    badge_text = None
    
    with open(theme_file, 'r') as f:
        content = f.read()
        
        # Find accent-primary
        accent_match = re.search(r'--accent-primary:\s*(#[0-9a-fA-F]{6})', content)
        if accent_match:
            accent_primary = accent_match.group(1)
            
        # Find badge-text
        badge_match = re.search(r'--badge-text:\s*(#[0-9a-fA-F]{6})', content)
        if badge_match:
            badge_text = badge_match.group(1)
    
    if accent_primary and badge_text:
        contrast = get_contrast_ratio(accent_primary, badge_text)
        return {
            'theme': theme_file.name,
            'accent_primary': accent_primary,
            'badge_text': badge_text,
            'contrast_ratio': contrast,
            'passes_aa': contrast >= 4.5,
            'passes_aaa': contrast >= 7.0
        }
    
    return None

def main():
    themes_dir = Path('/home/user/Projects/Wiki/themes')
    results = []
    
    # Check all CSS files in themes directory
    for theme_file in sorted(themes_dir.glob('*.css')):
        result = check_theme_contrast(theme_file)
        if result:
            results.append(result)
    
    # Print results
    print("# Theme Badge Contrast Analysis")
    print("=" * 80)
    print(f"{'Theme':<40} {'Accent':<8} {'Badge':<8} {'Ratio':<6} {'AA':<4} {'AAA':<4}")
    print("-" * 80)
    
    failing_themes = []
    
    for r in results:
        status_aa = '✓' if r['passes_aa'] else '✗'
        status_aaa = '✓' if r['passes_aaa'] else '✗'
        
        print(f"{r['theme']:<40} {r['accent_primary']:<8} {r['badge_text']:<8} "
              f"{r['contrast_ratio']:>5.2f} {status_aa:<4} {status_aaa:<4}")
        
        if not r['passes_aa']:
            failing_themes.append(r)
    
    print("\n" + "=" * 80)
    print(f"\nThemes failing WCAG AA (4.5:1): {len(failing_themes)}")
    
    if failing_themes:
        print("\nThemes that need white badge text:")
        for theme in failing_themes:
            print(f"  - {theme['theme']} (current ratio: {theme['contrast_ratio']:.2f})")

if __name__ == '__main__':
    main()