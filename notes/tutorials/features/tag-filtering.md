---
title: Tag Filtering
tags: [search, organization, filtering, tags, navigation]
author: NotesWiki Team
created: 2025-01-23
updated: 2025-01-23
description: Master the powerful tag filtering system to quickly find related content
---

# Tag Filtering

Tag filtering is a powerful way to quickly narrow down your notes to specific topics or categories. Unlike text search, tag filtering lets you browse and combine tags visually, making it perfect for exploring related content or finding notes by category.

## Opening the Tag Filter

Access the tag filter by:

1. **Tag Filter Button**: Click the tag icon (🏷️) in the header

This opens the visual tag filter modal showing all available tags with search and filtering options.

## Understanding the Tag Filter Interface

### Tag Display
- **Tag badges** show each tag with its note count
- **Color coding** indicates tag state:
  - **Normal** (gray) - Available for selection
  - **Selected** (blue) - Included in filter
  - **Excluded** (red) - Explicitly excluded from results

### Tag Search
- **Search box** at the top to quickly find specific tags
- Type to filter the tag list in real-time
- Useful when you have many tags

### Filter Information
- **Active filter count** shows number of selected tags
- **Results preview** indicates how many notes match
- **Filter mode** shows AND/OR logic (if applicable)

## Basic Tag Selection

### Including Tags (OR Logic)

1. **Click any tag** to include it in your filter
2. Tag turns blue indicating selection
3. Results show notes with ANY of the selected tags
4. Click additional tags to expand results

**Example**: Selecting "javascript" and "tutorial" shows all notes tagged with either.

### Excluding Tags

1. **Right-click any tag** to exclude it
2. Tag turns red indicating exclusion
3. Results hide notes with that tag
4. Useful for filtering out unwanted content

**Alternative**: Hold `Ctrl` while clicking to exclude

**Example**: Select "tutorial" but exclude "advanced" to find beginner tutorials.

## Advanced Filtering Techniques

### Combining Includes and Excludes

Create precise filters by combining both:

1. **Include** tags for topics you want
2. **Exclude** tags for content to avoid
3. Results show included tags minus excluded ones

**Example Use Case**:
- Include: "python", "tutorial"
- Exclude: "deprecated", "draft"
- Result: Current Python tutorials only

### Multi-Tag Workflows

**Research Workflow**:
1. Include all relevant topic tags
2. Exclude "archived" or "outdated"
3. Browse filtered results

**Project Organization**:
1. Include your project tag
2. Include status tags like "active" or "todo"
3. Exclude "completed" if focusing on current work

## Tag Filter Controls

### Clear Filters
- **Clear All** button removes all tag selections
- Resets to show all notes
- Keyboard: `Escape` also clears and closes

### Apply Filter
- **Apply** button activates the filter
- Updates the note list immediately
- Filter remains active until cleared

### Visual Indicators
- **Badge numbers** show note count per tag
- **Highlighted tags** show current selection
- **Strikethrough** on excluded tags (in some themes)

## Search Operators vs Tag Filter

### When to Use Tag Filter

Use tag filtering when you want to:
- **Browse by category** without specific keywords
- **Combine multiple topics** visually
- **Exclude categories** of content
- **Explore available tags** in your wiki

### When to Use Search

Use text search (`Ctrl + K`) when you:
- Know specific keywords
- Need full-text search
- Want to combine text and tag queries
- Need advanced operators

### Combining Both

Power user tip: Use search with tag operators:
```
tag:javascript tag:tutorial -tag:advanced react
```
This searches for "react" in JavaScript tutorials, excluding advanced ones.

## Practical Examples

### 1. Finding Learning Resources
```
Include: tutorial, guide, howto
Exclude: advanced, reference
```

### 2. Project Management
```
Include: project-x, active
Exclude: completed, archived
```

### 3. Knowledge Areas
```
Include: programming, web-dev
Exclude: deprecated, outdated
```

### 4. Time-Based Filtering
```
Include: 2024, current
Exclude: archived, historical
```

## Tag Organization Best Practices

### Hierarchical Tagging
Consider using prefixes for organization:
- `project-website`
- `project-mobile`
- `status-active`
- `status-completed`
- `type-tutorial`
- `type-reference`

### Consistent Naming
- Use lowercase for consistency
- Use hyphens for multi-word tags
- Avoid special characters
- Keep tags concise but descriptive

### Tag Categories
Organize tags by purpose:
- **Topics**: javascript, python, docker
- **Types**: tutorial, reference, snippet
- **Status**: draft, review, published
- **Projects**: project-a, project-b
- **Dates**: 2024, q1-2024

## Performance Tips

### With Many Tags
- Use the search box to quickly find tags
- Organize tags with consistent prefixes
- Regular cleanup of unused tags
- Consider tag hierarchies

### Large Note Collections
- Start with broad categories
- Progressively narrow with excludes
- Save common filter combinations
- Use search for very specific queries

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Clear and Close | `Escape` |
| Toggle Tag | `Click` |
| Exclude Tag | `Right-click` or `Ctrl + Click` |

**Note**: Tag filtering is accessed via the tag button (🏷️) in the header - no keyboard shortcut is available.

## Related Features

- [[Search Guide]] - Full-text search and operators
- [[Bookmarks]] - Save frequently accessed notes
- [[Context Filtering]] - Filter by folders
- [[Recent Files & Bookmarks|Recent Files]] - Quick access to recent work

## Tips and Tricks

1. **Quick Exclude**: Right-click is fastest for exclusions
2. **Bulk Select**: Click multiple tags rapidly without waiting
3. **Preview Results**: Watch the count update as you select
4. **Escape to Reset**: Quick way to start over
5. **Combine Methods**: Use both tag filter and search for precision

## Common Issues

**Q: No tags appear in the filter**
A: Ensure your notes have tags in their frontmatter

**Q: Filter isn't applying**
A: Click the Apply button after making selections

**Q: Too many tags to browse**
A: Use the search box to filter the tag list

**Q: Can't see excluded tags clearly**
A: Some themes show exclusions better than others