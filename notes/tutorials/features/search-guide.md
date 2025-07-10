---
title: Advanced Search Features
tags: [demo, search, operators, filtering]
created: 2025-06-13
author: Wiki Admin
description: Complete guide to advanced search features including operators, tag filtering, and search techniques
---

# Advanced Search Features

The Notes Wiki includes a powerful search system that goes far beyond simple text matching. Learn how to use advanced operators, tag filtering, and search techniques to find exactly what you're looking for.

## 🔍 Quick Search Access

- **Header Search**: Click the search icon or search box in the header
- **Keyboard Shortcut**: Press <kbd>Ctrl</kbd>+<kbd>K</kbd> to focus search instantly
- **URL Search**: Use `#/search/your+search+term` for direct search links

## 🎯 Search Operators

### Exact Phrase Search
Use quotes for exact phrase matching:

```
"machine learning algorithms"
"Notes Wiki system" 
"CSS counter-based line numbers"
```

**Example Results:**
- ✅ "machine learning algorithms for beginners"
- ❌ "machine algorithms for learning"

### Exclusion Operator
Use minus (-) to exclude terms:

```
javascript -angular
python -django
theme -dark
```

**Example:**
- `javascript -angular` finds JavaScript content but excludes Angular-related notes
- `css -framework` finds CSS notes excluding framework-specific content

### Tag Filtering
Use `tag:` to search within specific tags:

```
tag:javascript
tag:tutorial
tag:personal
tag:code-blocks
```

**Multiple Tags:**
```
tag:javascript tag:tutorial
tag:css tag:demo
```

### Author Filtering  
Use `author:` to find notes by specific authors:

```
author:"Wiki Admin"
author:"John Doe"
author:System
```

### Code Content Filtering
Use `code:` to find notes with code content:

```
code:javascript
code:python
code:css
code:any
```

**Examples:**
- `code:javascript` - Notes containing JavaScript code or mentioning JavaScript
- `code:any` - Notes that contain any code blocks
- `code:sql` - Notes with SQL code or database content

### Status & Category Filtering
Use `status:` and `category:` for organizational filtering:

```
status:draft
status:published  
status:review
category:tutorial
category:reference
```

**Note:** These operators work with notes that have populated `status` and `category` metadata fields.

### Combining Operators
Create powerful queries by combining operators:

```
tag:javascript "async await" -promise
author:"Wiki Admin" tag:demo -test
"code blocks" tag:tutorial -basic
code:javascript tag:tutorial status:published
code:any -tag:test category:guide
```

## 🏷️ Tag-Based Filtering

### Tag Filter Interface
- Click the **Tags** button (🏷️) in the header
- Select multiple tags for filtering
- Choose between OR/AND logic using the mode toggle

### Tag Logic
Tag filtering uses simple matching:
- Multiple tags selected work as OR logic by default
- Shows notes that match any of the selected tags
- Use search operators for precise tag combinations

## 🎨 Smart Search Features

### Search History
Your recent searches are saved automatically:
- Up to 50 recent searches stored locally
- Previous searches remembered across sessions
- Access history through browser localStorage

## 📊 Search Results

### Result Ordering
Results appear in the order they exist in the search index:
- No relevance ranking or scoring applied
- All matching notes displayed in index order
- Pagination available for large result sets (20 per page)

### Result Information
Each result shows:
- **Title** - Note title with highlighting
- **Description** - Brief content summary
- **Tags** - Associated tags
- **Author** - Note author
- **Preview** - Content snippet with search terms highlighted

### Quick Actions
From search results:
- **Click title** - Open note in current tab
- **Ctrl+Click** - Open in new tab
- **Click tags** - Filter by that tag
- **Click author** - Filter by author

## 🚀 Advanced Search Techniques

### Content Type Searches
Find specific types of content:

```
tag:code-blocks "function"
tag:tutorial "step by step"  
tag:reference "cheat sheet"
tag:personal "daily"
```

### Date-Based Searches
Search metadata includes dates:

```
author:System "2025"
"created: 2025-01" 
"updated" tag:demo
```

### Technical Content Searches
Find programming content:

```
code:javascript tag:tutorial
code:python "function"
code:any tag:demo
"syntax highlighting" -test
tag:css "theme" "color"
code:sql "database"
```

### Documentation Searches
Find specific documentation:

```
"how to" tag:tutorial
"getting started" -test
"configuration" tag:settings
"keyboard shortcuts" tag:demo
```

## 💡 Search Best Practices

### Effective Search Strategies

**1. Start Broad, Then Narrow**
```
Step 1: javascript
Step 2: javascript tutorial  
Step 3: javascript tutorial -advanced
Step 4: tag:tutorial "javascript" "beginner"
```

**2. Use Multiple Search Methods**
- Try tag filtering first for categorical searches
- Use text search for specific content
- Combine both for precise results

**3. Leverage Exclusions**
```
theme -test -debug
tutorial -"work in progress"
javascript -framework -library
```

### Common Search Patterns

**Finding Examples:**
```
tag:demo "example"
"code example" tag:tutorial
"sample" -test
```

**Finding Documentation:**
```
"how to" OR "guide" OR "tutorial"
tag:documentation -draft
"getting started" tag:beginner
```

**Finding Reference Material:**
```
tag:reference OR tag:cheatsheet
"reference" OR "cheat sheet"
"commands" tag:reference
```

## 🔗 Search URLs & Sharing

### Direct Search Links
Share searches with URL patterns:

```
#/search/javascript+tutorial
#/search/"code+blocks"+tag:demo
#/search/tag:css+-test
```

### Bookmarkable Searches
Create bookmarks for frequent searches:
- **Weekly Reviews**: `tag:personal "weekly"`
- **Code References**: `tag:reference "code"`
- **Learning Material**: `tag:tutorial -completed`

### Search in New Tabs
- <kbd>Ctrl</kbd>+<kbd>Click</kbd> search results to open in new tabs
- Use <kbd>Ctrl</kbd>+<kbd>T</kbd> then search for research sessions

## 🎯 Search Examples

### Real-World Search Scenarios

**Scenario 1: Learning JavaScript**
```
Search: tag:javascript tag:tutorial -advanced
Filter: Include [beginner], [examples]
Result: Beginner-friendly JavaScript tutorials with examples
```

**Scenario 2: Theme Customization**
```
Search: "theme" OR "css" tag:demo
Exclude: test, debug
Result: Theme and CSS demos excluding test files
```

**Scenario 3: Code Block Features**
```
Search: "code block" OR "syntax highlighting" OR "line numbers"
Filter: Include [demo], [features]
Result: All code block feature documentation
```

**Scenario 4: Personal Project Notes**
```  
Search: author:"Your Name" tag:personal tag:projects
Filter: Exclude [archive], [completed]
Result: Your active personal project notes
```

## 🔧 Search Configuration

### Search Behavior
The search system uses these built-in behaviors:

- **Search delay** - 150ms debounce before search executes
- **Results per page** - 20 results with pagination
- **Content inclusion** - Searches titles, descriptions, content, and tags
- **Case insensitive** - All searches ignore letter case
- **Exact matching** - No fuzzy matching or approximation

### Performance Tips

**For Large Wikis:**
- Use tag filtering first to narrow results
- Prefer specific terms over general ones
- Use exclusions to eliminate noise
- Limit searches to relevant sections

**For Quick Finding:**
- Use recent search history
- Bookmark frequent searches  
- Learn common tag patterns
- Use keyboard shortcuts for speed

---

## Master Search with Practice

The search system becomes more powerful as you learn your content patterns. Experiment with different operators and develop search strategies that match your workflow!

**Pro Tip:** Use <kbd>Ctrl</kbd>+<kbd>K</kbd> for instant search access, and don't forget that search results can be opened in multiple tabs with <kbd>Ctrl</kbd>+<kbd>Click</kbd> for research sessions.