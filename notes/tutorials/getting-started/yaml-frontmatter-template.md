---
# ========================================
# REQUIRED FIELDS
# ========================================

title: "Complete YAML Frontmatter Template and Guide"
# The display title for your note
# - Appears in search results, tabs, and navigation
# - Should be descriptive and specific
# - Use quotes if it contains special characters or colons
# - Example: "React Hooks: useState and useEffect Guide"

tags: [template, yaml, frontmatter, guide, reference]
# Array of tags for categorization and filtering
# - Use consistent naming (lowercase, hyphens for spaces)
# - Include content type, topic, and status tags
# - Examples: [javascript, tutorial, beginner, draft]
# - Hierarchical tags: [programming, programming/javascript, programming/javascript/react]

# ========================================
# ESSENTIAL METADATA
# ========================================

author: "Wiki Team"
# Who created this note
# - Individual name: "John Doe"
# - Team name: "Development Team"
# - System: "Wiki Admin" or "System"
# - Use quotes if name contains special characters

created: 2025-01-19
# When the note was first created
# - Format: YYYY-MM-DD (ISO 8601 date)
# - Used for sorting and organization
# - Automatically indexed for date-based searches
# - Example: 2025-01-19

updated: 2025-01-19
# When the note was last modified
# - Format: YYYY-MM-DD or YYYY-MM-DD HH:MM
# - Helps track freshness of content
# - Optional but recommended for evolving notes
# - Example: 2025-01-19 or 2025-01-19 14:30

description: "Comprehensive template showing all possible YAML frontmatter fields with detailed explanations and usage examples"
# Brief summary for search results and previews
# - Keep under 160 characters for best display
# - Appears in search result snippets
# - Should be descriptive and compelling
# - Include key terms for searchability

# ========================================
# ORGANIZATION FIELDS
# ========================================

category: "templates"
# High-level content categorization
# - Examples: tutorials, reference, journal, meeting-notes
# - Usually singular form
# - Complements tags for broader organization
# - Optional but useful for large collections

context: "getting-started"
# Top-level organizational context
# - Examples: work, personal, learning, projects
# - Represents major life/work areas
# - Used for context switching in interface
# - Maps to folder structure

project: "wiki-documentation"
# Associated project or initiative
# - Examples: website-redesign, quarterly-goals
# - Links notes to specific outcomes
# - Useful for project-based organization
# - Can be temporary or ongoing

type: "template"
# Content type classification
# - Examples: tutorial, reference, journal, meeting, idea
# - Helps with template selection and formatting
# - Used for consistent content structure
# - Aids in content discovery

# ========================================
# STATUS AND WORKFLOW
# ========================================

status: "complete"
# Current state of the note
# - draft: Work in progress, not ready
# - review: Ready for review/feedback
# - complete: Finished and approved
# - archived: No longer active
# - published: Live/public content

priority: "high"
# Importance or urgency level
# - low: Nice to have, eventual reading
# - medium: Normal priority
# - high: Important, prioritize
# - urgent: Immediate attention needed
# - Use for task management and filtering

progress: 100
# Completion percentage (0-100)
# - Useful for tracking work in progress
# - Can drive visual indicators
# - Example: 75 (for 75% complete)
# - Combine with status for detailed tracking

archived: false
# Archive status flag
# - true: Note is archived (hidden from main views)
# - false: Note is active
# - Used for lifecycle management
# - Archived notes still searchable but deprioritized

# ========================================
# CONTENT METADATA
# ========================================

language: "en"
# Content language code
# - ISO 639-1 codes: en, es, fr, de, etc.
# - Useful for multilingual wikis
# - Helps with search and filtering
# - Default usually English (en)

difficulty: "beginner"
# Content difficulty level
# - beginner: New to topic
# - intermediate: Some experience
# - advanced: Expert level
# - Useful for tutorials and learning materials

duration: "15 minutes"
# Estimated reading/completion time
# - Examples: "5 minutes", "30 min", "2 hours"
# - Helps users plan their time
# - Useful for tutorials and long content
# - Can include ranges: "10-15 minutes"

version: "2.1"
# Content version number
# - Semantic versioning: 1.0, 1.1, 2.0
# - Simple versioning: v1, v2, draft-3
# - Useful for evolving documentation
# - Track major changes and revisions

# ========================================
# SERIES AND RELATIONSHIPS
# ========================================

series: "yaml-mastery"
# Series or collection name
# - Groups related notes together
# - Examples: "javascript-fundamentals", "weekly-reviews"
# - Creates navigation between related content
# - Useful for structured learning paths

series_order: 1
# Position within a series
# - Numerical order: 1, 2, 3
# - Enables sequential navigation
# - Used for "next/previous" links
# - Combine with series field

related: ["creating-notes", "best-practices", "search-guide"]
# Array of related note IDs or titles
# - Links to complementary content
# - Enables "see also" sections
# - Improves content discovery
# - Can be note IDs or titles

prerequisites: ["basic-markdown", "file-organization"]
# Required knowledge or prior notes
# - Array of concepts or note references
# - Helps establish learning order
# - Useful for educational content
# - Creates dependency chains

# ========================================
# PUBLISHING AND SHARING
# ========================================

published: true
# Publication status
# - true: Ready for sharing/public view
# - false: Private/draft content
# - Controls visibility in public views
# - Different from status field

featured: false
# Featured content flag
# - true: Highlight in featured sections
# - false: Normal content
# - Used for promoting important content
# - Can drive homepage or dashboard display

permalink: "yaml-template-guide"
# Custom URL slug
# - Creates friendly URLs
# - Should be unique and descriptive
# - No spaces, use hyphens
# - Example: "react-hooks-guide"

# ========================================
# COLLABORATION FIELDS
# ========================================

contributors: ["John Doe", "Jane Smith", "Mike Johnson"]
# Array of people who contributed
# - Different from single author field
# - Acknowledges collaborative work
# - Can include editors, reviewers
# - Use consistent name format

reviewers: ["Sarah Wilson", "Tech Team"]
# Who reviewed or approved content
# - Quality assurance tracking
# - Different from contributors
# - Can be individuals or groups
# - Useful for formal review processes

# ========================================
# REFERENCE AND CITATION
# ========================================

sources: 
  - "https://yaml.org/spec/1.2/spec.html"
  - "Wiki Documentation Standards v2.1"
  - "Interview with John Doe, 2025-01-15"
# Array of information sources
# - URLs, documents, interviews
# - Supports credibility and fact-checking
# - Can be links or text descriptions
# - Useful for research notes

citations: 
  - title: "YAML Specification"
    url: "https://yaml.org/spec/"
    accessed: "2025-01-19"
  - title: "Best Practices Guide"
    author: "Wiki Team"
    date: "2024-12-15"
# Formal citation format
# - More structured than sources
# - Academic or professional format
# - Include access dates for web sources
# - Support proper attribution

# ========================================
# TECHNICAL METADATA
# ========================================

template: "comprehensive-guide"
# Template used to create note
# - Helps maintain consistency
# - Enables template-based creation
# - Examples: "meeting-notes", "project-overview"
# - Links to template system

format: "markdown"
# Content format specification
# - Usually "markdown" for .md files
# - Could specify dialects: "commonmark", "github"
# - Useful for processing tools
# - Generally optional for .md files

encoding: "utf-8"
# Character encoding
# - Usually utf-8 for modern systems
# - Rarely needed in modern setups
# - Helps with international content
# - Technical compatibility field

# ========================================
# CUSTOM APPLICATION FIELDS
# ========================================

meeting_date: "2025-01-19"
# Meeting-specific date (for meeting notes)
# - Different from created date
# - When the meeting occurred
# - Useful for meeting note templates

attendees: ["Alice", "Bob", "Charlie"]
# Meeting participants (for meeting notes)
# - Array of names or roles
# - Specific to meeting content type
# - Could include external participants

location: "Conference Room A"
# Physical or virtual location
# - Meeting rooms, cities, virtual links
# - Context for events or meetings
# - Can be physical or digital

client: "Acme Corporation"
# Client or external organization
# - For client work or partnerships
# - Helps organize external relationships
# - Useful for consulting or service work

budget: "$5,000"
# Financial information (for project notes)
# - Budget, cost, revenue
# - Include currency symbols
# - Useful for project tracking

deadline: "2025-03-15"
# Due date or deadline
# - Different from created/updated dates
# - Target completion date
# - Format: YYYY-MM-DD
# - Useful for project management

# ========================================
# TRACKING AND ANALYTICS
# ========================================

views: 0
# View count (if tracked)
# - Automated or manual tracking
# - Indicates content popularity
# - Could be updated by system
# - Useful for content analytics

rating: 4.5
# User rating or quality score
# - Scale: 1-5 or 1-10
# - Community or self-assessment
# - Helps identify quality content
# - Could support recommendation systems

last_reviewed: "2025-01-19"
# Last review date
# - Different from updated date
# - Formal review or audit
# - Ensures content freshness
# - Part of quality management

review_frequency: "quarterly"
# How often to review
# - Examples: weekly, monthly, quarterly, annually
# - Helps schedule maintenance
# - Ensures content stays current
# - Part of lifecycle management

# ========================================
# DISPLAY AND FORMATTING
# ========================================

cover_image: "images/yaml-guide-header.jpg"
# Header or cover image path
# - Relative to notes directory
# - Used for visual appeal
# - Should be optimized for web
# - Include alt text in content

icon: "📝"
# Emoji or icon representation
# - Single emoji character
# - Used in lists and navigation
# - Adds visual appeal
# - Keep consistent within categories

color: "#3498db"
# Associated color (hex code)
# - Used for categorization
# - Visual organization
# - Hex format: #RRGGBB
# - Should be accessible colors

layout: "tutorial"
# Display layout template
# - Controls how content is rendered
# - Examples: tutorial, reference, journal
# - Links to CSS or HTML templates
# - Affects presentation layer

# ========================================
# AUTOMATION AND INTEGRATION
# ========================================

auto_update: true
# Enable automatic updates
# - Boolean flag for system automation
# - Could trigger rebuilds or syncing
# - Useful for dynamic content
# - Links to automated workflows

sync_source: "google-docs/abc123"
# External sync source
# - Links to external documents
# - Google Docs, Notion, etc.
# - Enables content synchronization
# - Include source identifier

api_endpoint: "https://api.example.com/content/123"
# API source for dynamic content
# - REST API endpoints
# - Used for live data integration
# - Include authentication if needed
# - Technical integration field

webhook: "https://hooks.example.com/wiki-update"
# Webhook for notifications
# - Called when content changes
# - Integration with external systems
# - Slack, Discord, email systems
# - Include authentication tokens separately

# ========================================
# CONDITIONAL FIELDS
# ========================================

# Note: Some fields are specific to content types:
# - meeting_date, attendees: Meeting notes
# - client, budget: Business/project notes  
# - difficulty, duration: Tutorial content
# - sources, citations: Research notes
# - series, series_order: Educational content

# Fields can be mixed and matched based on your needs.
# Not every note needs every field - use what makes sense
# for your content type and organizational system.

---

# Complete YAML Frontmatter Template and Guide

This note serves as both a **template** and a **comprehensive reference** for all possible YAML frontmatter fields you can use in Notes Wiki. Copy the frontmatter section above and customize it for your needs.

## 🎯 Quick Start Templates

### Basic Note Template
```yaml
---
title: "Your Note Title"
tags: [main-topic, content-type]
author: "Your Name"
created: 2025-01-19
description: "Brief description of your note"
---
```

### Meeting Notes Template
```yaml
---
title: "Team Meeting - 2025-01-19"
tags: [meeting, team, project-name]
author: "Your Name"
created: 2025-01-19
type: "meeting"
meeting_date: "2025-01-19"
attendees: ["Alice", "Bob", "Charlie"]
status: "complete"
---
```

### Tutorial Template
```yaml
---
title: "How to Master JavaScript Promises"
tags: [tutorial, javascript, programming, async]
author: "Your Name"
created: 2025-01-19
type: "tutorial"
difficulty: "intermediate"
duration: "20 minutes"
series: "javascript-fundamentals"
series_order: 5
status: "complete"
---
```

### Project Documentation Template
```yaml
---
title: "Project Alpha - Technical Specification"
tags: [project, documentation, technical, project-alpha]
author: "Development Team"
created: 2025-01-19
updated: 2025-01-19
type: "documentation"
project: "project-alpha"
status: "review"
priority: "high"
deadline: "2025-03-15"
reviewers: ["Tech Lead", "Product Manager"]
---
```

### Research Notes Template
```yaml
---
title: "Machine Learning in Healthcare - Research Summary"
tags: [research, machine-learning, healthcare, summary]
author: "Your Name"
created: 2025-01-19
type: "research"
status: "draft"
sources: 
  - "https://example.com/ml-healthcare-study"
  - "Journal of Medical AI, Vol 15"
related: ["ai-ethics", "healthcare-trends"]
---
```

## 📋 Field Categories

### **Required for All Notes**
- `title` - Clear, descriptive title
- `tags` - At least 2-3 relevant tags

### **Highly Recommended**
- `author` - Who created it
- `created` - When it was made
- `description` - Search-friendly summary

### **Organization Helpers**
- `category`, `context`, `project` - Grouping
- `type` - Content classification
- `status` - Current state

### **Workflow Management**
- `priority` - Importance level
- `deadline` - Due dates
- `progress` - Completion tracking

### **Content Enhancement**
- `difficulty` - Skill level required
- `duration` - Time investment
- `series` - Part of sequence

### **Collaboration**
- `contributors` - Multiple authors
- `reviewers` - Who approved it
- `sources` - Reference materials

## 💡 Best Practices

### **Consistency is Key**
```yaml
# Good: Consistent formatting
tags: [javascript, tutorial, beginner]
created: 2025-01-19
status: "draft"

# Avoid: Mixed formats
tags: ["JavaScript", tutorial, BEGINNER]
created: "January 19, 2025"
status: Draft
```

### **Use Quotes When Needed**
```yaml
# Required for titles with colons
title: "React Hooks: Complete Guide"

# Required for values with special characters
description: "Learn React's useState & useEffect"

# Optional for simple values
author: "John Doe"  # or just: author: John Doe
```

### **Tag Strategy**
```yaml
# Hierarchical tags for better organization
tags: [programming, programming/javascript, programming/javascript/react]

# Multi-dimensional tagging
tags: [
  # Content type
  tutorial,
  # Technology
  react, javascript,
  # Difficulty
  intermediate,
  # Status
  complete
]
```

### **Date Formats**
```yaml
# Preferred: ISO 8601 format
created: 2025-01-19
updated: 2025-01-19

# With time (24-hour format)
updated: 2025-01-19 14:30

# Avoid these formats
created: "Jan 19, 2025"    # Hard to sort
created: "19/01/2025"      # Ambiguous
```

## 🔍 How Fields Affect Search

### **Searchable Fields**
- `title` - Primary search target
- `description` - Appears in results
- `tags` - Use `tag:name` to filter
- `author` - Use `author:name` to filter
- `content` - Full-text search

### **Search Examples**
```
tag:tutorial author:john         # Find John's tutorials
"complete guide"                 # Exact phrase in title/content
status:draft -tag:archived       # Draft notes, not archived
difficulty:beginner tag:javascript # Beginner JS content
```

## ⚙️ Advanced Usage

### **Conditional Fields**
Only use fields that make sense for your content:

```yaml
# For meeting notes
meeting_date: "2025-01-19"
attendees: ["Alice", "Bob"]

# For project work
project: "website-redesign"
deadline: "2025-03-15"
budget: "$10,000"

# For tutorials
difficulty: "intermediate"
duration: "30 minutes"
prerequisites: ["html-basics", "css-fundamentals"]
```

### **Custom Fields**
Create your own fields for specific needs:

```yaml
# Custom tracking
mood: "productive"           # For journal entries
weather: "sunny"             # For daily notes
energy_level: 8              # Personal tracking
coffee_consumed: 3           # Whatever matters to you!
```

## 🚨 Common Mistakes

### **YAML Syntax Errors**
```yaml
# Wrong: Missing quotes around title with colon
title: React: Complete Guide

# Right: Quotes protect special characters
title: "React: Complete Guide"

# Wrong: Inconsistent array format
tags: [javascript, "react hooks", vue.js]

# Right: Consistent formatting
tags: ["javascript", "react-hooks", "vue-js"]
```

### **Field Naming**
```yaml
# Wrong: Spaces in field names
creation date: 2025-01-19

# Right: Use underscores or camelCase
creation_date: 2025-01-19
# or
creationDate: 2025-01-19
```

---

## 📚 Related Resources

- **[Creating Notes Guide](creating-notes.md)** - Basic note structure
- **[Best Practices Guide](best-practices.md)** - Organization strategies  
- **[Search Guide](../features/search-guide.md)** - Finding your content
- **[Tag Filtering Guide](../features/tag-filtering.md)** - Advanced filtering

**Remember**: Start simple with just title, tags, author, and created date. Add more fields as your needs grow and your system evolves! 🚀 