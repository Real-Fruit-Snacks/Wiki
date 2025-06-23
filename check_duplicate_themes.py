#!/usr/bin/env python3
"""
Script to check for duplicate theme IDs and names in the NotesWiki theme configuration.
"""

import json
import re
from collections import Counter

def extract_themes_from_js():
    """Extract theme configuration from script.js file."""
    with open('script.js', 'r') as f:
        content = f.read()
    
    # Find the themeCategories array
    theme_start = content.find('this.themeCategories = [')
    if theme_start == -1:
        print("Error: Could not find themeCategories in script.js")
        return []
    
    # Find the closing bracket for themeCategories
    bracket_count = 0
    start_pos = theme_start + len('this.themeCategories = ')
    end_pos = start_pos
    
    for i in range(start_pos, len(content)):
        if content[i] == '[':
            bracket_count += 1
        elif content[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_pos = i + 1
                break
    
    # Extract the theme categories JSON-like structure
    theme_text = content[start_pos:end_pos]
    
    # Extract all theme objects using regex
    theme_pattern = r"\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']+)'\s*\}"
    themes = []
    
    for match in re.finditer(theme_pattern, theme_text):
        theme_id = match.group(1)
        theme_name = match.group(2)
        theme_desc = match.group(3)
        themes.append({
            'id': theme_id,
            'name': theme_name,
            'description': theme_desc
        })
    
    return themes

def check_duplicates(themes):
    """Check for duplicate theme IDs and names."""
    # Extract IDs and names
    theme_ids = [theme['id'] for theme in themes]
    theme_names = [theme['name'] for theme in themes]
    
    # Count occurrences
    id_counts = Counter(theme_ids)
    name_counts = Counter(theme_names)
    
    # Find duplicates
    duplicate_ids = {id_: count for id_, count in id_counts.items() if count > 1}
    duplicate_names = {name: count for name, count in name_counts.items() if count > 1}
    
    # Report findings
    print(f"Total themes found: {len(themes)}")
    print(f"Unique theme IDs: {len(set(theme_ids))}")
    print(f"Unique theme names: {len(set(theme_names))}")
    print()
    
    if duplicate_ids:
        print("DUPLICATE THEME IDs FOUND:")
        for id_, count in duplicate_ids.items():
            print(f"  - '{id_}' appears {count} times")
            # Show which themes have this ID
            for theme in themes:
                if theme['id'] == id_:
                    print(f"    * Name: '{theme['name']}', Description: '{theme['description'][:50]}...'")
        print()
    else:
        print("✓ No duplicate theme IDs found")
        print()
    
    if duplicate_names:
        print("DUPLICATE THEME NAMES FOUND:")
        for name, count in duplicate_names.items():
            print(f"  - '{name}' appears {count} times")
            # Show which themes have this name
            for theme in themes:
                if theme['name'] == name:
                    print(f"    * ID: '{theme['id']}', Description: '{theme['description'][:50]}...'")
        print()
    else:
        print("✓ No duplicate theme names found")
        print()
    
    # Additional check: Look for similar IDs that might be confusing
    print("CHECKING FOR SIMILAR THEME IDs:")
    similar_found = False
    for i, theme1 in enumerate(themes):
        for theme2 in themes[i+1:]:
            # Check if IDs are very similar (differ only in special characters)
            id1_clean = theme1['id'].replace('-', '').replace('_', '').replace('&', 'and').lower()
            id2_clean = theme2['id'].replace('-', '').replace('_', '').replace('&', 'and').lower()
            if id1_clean == id2_clean and theme1['id'] != theme2['id']:
                print(f"  - Similar IDs: '{theme1['id']}' and '{theme2['id']}'")
                similar_found = True
    
    if not similar_found:
        print("  ✓ No confusingly similar theme IDs found")
    
    return duplicate_ids, duplicate_names

if __name__ == "__main__":
    print("Checking for duplicate themes in NotesWiki...")
    print("=" * 60)
    
    themes = extract_themes_from_js()
    if themes:
        duplicate_ids, duplicate_names = check_duplicates(themes)
        
        # Summary
        print()
        print("=" * 60)
        print("SUMMARY:")
        if duplicate_ids or duplicate_names:
            print("⚠️  DUPLICATES FOUND - Users may see duplicate theme options!")
            if duplicate_ids:
                print(f"   - {len(duplicate_ids)} duplicate theme IDs")
            if duplicate_names:
                print(f"   - {len(duplicate_names)} duplicate theme names")
        else:
            print("✅ All themes have unique IDs and names - no duplicates in UI!")
    else:
        print("ERROR: Could not extract themes from script.js")