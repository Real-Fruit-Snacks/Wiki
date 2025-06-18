---
title: Creating and Organizing Notes
tags: [tutorial, getting-started, markdown, frontmatter]
author: Wiki Team
created: 2025-01-18
description: Learn how to create, structure, and organize your notes effectively
---

# Creating and Organizing Notes

Learn how to create well-structured notes with proper metadata, organize them effectively, and make them searchable.

## 📝 Note Structure

### Basic Anatomy
Every note consists of two parts:
1. **Frontmatter**: Metadata in YAML format
2. **Content**: Your actual note in Markdown

### Example Note

```markdown
---
title: My First Note
tags: [personal, ideas]
author: Your Name
created: 2025-01-18
description: A brief description for search results
---

# My First Note

Your content starts here...
```

## 📋 Frontmatter Explained

### Required Fields

#### Title
The display name for your note:
```yaml
title: JavaScript Array Methods
```

### Recommended Fields

#### Tags
Categorize your notes for easy filtering:
```yaml
tags: [javascript, programming, tutorial]
```

#### Author
Track who created the note:
```yaml
author: John Doe
```

#### Created Date
When the note was first written:
```yaml
created: 2025-01-18
```

#### Description
Brief summary for search results:
```yaml
description: Complete guide to JavaScript array methods with examples
```

### Optional Fields

#### Updated Date
Track last modification:
```yaml
updated: 2025-01-19
```

#### Category
Additional organization:
```yaml
category: tutorials
```

#### Status
Track note completion:
```yaml
status: draft  # or 'complete', 'review'
```

## 📁 File Organization

### Directory Structure
Organize notes in logical folders:
```
notes/
├── personal/
│   ├── journal/
│   └── ideas/
├── work/
│   ├── projects/
│   └── meetings/
├── learning/
│   ├── courses/
│   └── books/
└── reference/
    ├── code-snippets/
    └── cheatsheets/
```

### Naming Conventions

#### File Names
- Use descriptive names: `docker-deployment-guide.md`
- Avoid spaces: use hyphens or underscores
- Keep lowercase for consistency
- Include dates for time-sensitive notes: `2025-01-18-meeting-notes.md`

#### Folder Names
- Short and descriptive
- Use singular or plural consistently
- Group related content logically

## 🏷️ Effective Tagging

### Tag Strategy

#### Hierarchical Tags
Create tag hierarchies:
```yaml
tags: [programming, programming/javascript, programming/javascript/react]
```

#### Consistent Naming
- Choose singular or plural: `book` vs `books`
- Use consistent separators: `machine-learning` vs `machine_learning`
- Document your conventions

#### Common Tag Categories
- **Topic**: `javascript`, `docker`, `react`
- **Type**: `tutorial`, `reference`, `journal`
- **Status**: `draft`, `complete`, `needs-review`
- **Project**: `project-x`, `client-y`

## 🎨 Content Best Practices

### Use Markdown Features

#### Headings for Structure
```markdown
# Main Title
## Section
### Subsection
```

#### Lists for Organization
```markdown
- Bullet points for unordered items
1. Numbered lists for sequences
   - Nested items with indentation
```

#### Code Blocks with Language
````markdown
```javascript
const example = "Always specify the language";
```
````

#### Links and References
```markdown
[External Link](https://example.com)
[[Internal Wiki Link]]
```

## 🔍 Making Notes Searchable

### Optimize for Search

#### Use Descriptive Titles
- ✅ "Docker Compose Multi-Container Setup"
- ❌ "Docker Notes"

#### Include Keywords
Add relevant terms in your content naturally

#### Write Clear Descriptions
The description field appears in search results

#### Tag Thoroughly
More tags = easier to find

## 💡 Organization Tips

### Personal Knowledge Management

#### Daily Notes
```yaml
title: Daily Note - 2025-01-18
tags: [journal, daily]
```

#### Project Documentation
```yaml
title: Project X - Architecture Overview
tags: [project-x, architecture, documentation]
```

#### Learning Notes
```yaml
title: React Hooks - Study Notes
tags: [learning, react, javascript, frontend]
```

### Context-Based Organization

#### Use Contexts
Top-level folders as contexts:
- `personal/` - Private notes
- `work/` - Professional content
- `reference/` - Quick lookup materials
- `learning/` - Educational content

## 🚀 Workflow Examples

### Meeting Notes Template
```markdown
---
title: Team Meeting - 2025-01-18
tags: [meeting, team, project-x]
author: Your Name
created: 2025-01-18
---

# Team Meeting - 2025-01-18

## Attendees
- John Doe
- Jane Smith

## Agenda
1. Project updates
2. Blockers
3. Next steps

## Notes
...

## Action Items
- [ ] Task 1 - @John
- [ ] Task 2 - @Jane
```

### Technical Documentation
```markdown
---
title: API Authentication Guide
tags: [api, authentication, documentation]
author: Tech Team
created: 2025-01-18
updated: 2025-01-19
status: complete
---

# API Authentication Guide

## Overview
...

## Implementation
...
```

## 🔧 Building the Index

After creating or modifying notes:
```bash
npm run build
```

This updates the search index with your new content.

---

Well-organized notes are the foundation of an effective knowledge management system. Start with good structure, and your future self will thank you!