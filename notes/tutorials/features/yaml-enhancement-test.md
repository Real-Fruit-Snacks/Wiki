---
title: YAML Enhancement Test Note
author: Test Author
created: 2025-06-22
updated: 2025-06-22
tags: [testing, yaml, features]
description: A test note demonstrating the new YAML frontmatter features
status: draft
category: tutorial
aliases: [yaml-test, frontmatter-test, enhanced-metadata]
keywords: [yaml, frontmatter, metadata, testing, enhancement]
related: [/notes/tutorials/features/markdown-callouts.md, /notes/tutorials/features/themes.md]
dependencies: [/notes/tutorials/getting-started/creating-notes.md]
tableOfContents: auto
hideFromSearch: false
---

# YAML Enhancement Test Note

This note demonstrates all the new YAML frontmatter features that have been implemented:

## Content Organization & Discovery

- **Status**: This note is marked as `draft` - you can use: draft, published, archived, deprecated, under-review
- **Category**: This note is categorized as `tutorial` - you can use: tutorial, reference, guide, troubleshooting, meeting-notes

## Enhanced Search & Relationships

- **Aliases**: This note has alternative names for better search discovery
- **Keywords**: Additional search terms beyond tags for enhanced findability
- **Related Notes**: Cross-references to related content (see bottom of page)
- **Dependencies**: Prerequisites that should be read first (see bottom of page)

## Display & Behavior

- **Table of Contents**: Set to `auto` - generates TOC automatically if 2+ headings exist
- **Hide from Search**: Set to `false` - note appears in search results

## Testing Search Operators

You can now search using these new operators:

### Status Search
- `status:draft` - Find all draft notes
- `status:published` - Find published notes
- `status:archived` - Find archived notes

### Category Search
- `category:tutorial` - Find all tutorial notes
- `category:reference` - Find reference documentation
- `category:troubleshooting` - Find troubleshooting guides

### Enhanced Text Search
The aliases and keywords are automatically included in search content, so searching for:
- "frontmatter-test" will find this note (via aliases)
- "enhancement" will find this note (via keywords)

## Sample Content for TOC

### Feature Overview
The enhanced YAML features provide better organization and discovery.

### Implementation Details
All features are backward compatible with existing notes.

### Usage Examples
See the frontmatter of this note for examples of each field.

## Conclusion

This note demonstrates the complete implementation of enhanced YAML frontmatter features for better content organization, search, and navigation.