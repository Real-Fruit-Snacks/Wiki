---
title: Markdown Callouts
tags: [tutorial, markdown, callouts, formatting, documentation]
author: Wiki Team
created: 2025-07-11
description: Complete guide to all 13 callout types available in Notes Wiki with examples and best practices
---

# Markdown Callouts - Complete Guide

Master all 13 callout types available in Notes Wiki to highlight important information, create visually appealing documentation, and organize content effectively.

## 🎯 What Are Callouts?

Callouts are special formatted blocks that draw attention to important information. They use distinctive colors, icons, and styling to make key points stand out from regular text.

### Basic Syntax
```markdown
> [!TYPE] Optional Custom Title
> Your callout content goes here
> You can use multiple lines
> And even **markdown formatting**
```

### Key Features
- **13 different types** with unique icons and colors
- **Custom titles** or default type names
- **Markdown support** inside callouts
- **Theme integration** - colors adapt to your chosen theme
- **Nested callouts** - callouts inside other callouts

## 📋 Complete Callout Reference

### 1. NOTE - General Information

Use for general information, explanations, or neutral content.

```markdown
> [!NOTE] 
> This is a standard note callout for general information.
```

> [!NOTE]
> This is a standard note callout for general information.

```markdown
> [!NOTE] Custom Title
> You can customize the title of any callout to make it more specific.
```

> [!NOTE] Custom Title
> You can customize the title of any callout to make it more specific.

**Best for:**
- General explanations
- Background information
- Context or definitions
- Neutral observations

### 2. INFO - Important Information

Use for important information that users should know.

```markdown
> [!INFO]
> This callout highlights important information that users should be aware of.
```

> [!INFO]
> This callout highlights important information that users should be aware of.

```markdown
> [!INFO] System Requirements
> This application requires Node.js version 16 or higher to run properly.
```

> [!INFO] System Requirements
> This application requires Node.js version 16 or higher to run properly.

**Best for:**
- System requirements
- Important facts
- Key information
- Prerequisites

### 3. TIP - Helpful Tips

Use for helpful tips, shortcuts, or best practices.

```markdown
> [!TIP]
> Here's a helpful tip to improve your workflow!
```

> [!TIP]
> Here's a helpful tip to improve your workflow!

```markdown
> [!TIP] Pro Tip
> Use `Ctrl+K` to quickly access the search function from anywhere in the application.
```

> [!TIP] Pro Tip
> Use `Ctrl+K` to quickly access the search function from anywhere in the application.

**Best for:**
- Productivity tips
- Shortcuts and tricks
- Best practices
- Optimization suggestions

### 4. SUCCESS - Positive Outcomes

Use for success messages, completed tasks, or positive results.

```markdown
> [!SUCCESS]
> Great job! This indicates a successful operation or positive outcome.
```

> [!SUCCESS]
> Great job! This indicates a successful operation or positive outcome.

```markdown
> [!SUCCESS] Installation Complete
> All dependencies have been successfully installed. You can now start the development server.
```

> [!SUCCESS] Installation Complete
> All dependencies have been successfully installed. You can now start the development server.

**Best for:**
- Success messages
- Completed steps
- Positive results
- Achievement notifications

### 5. QUESTION - Questions and Queries

Use for questions, prompts for thought, or uncertain information.

```markdown
> [!QUESTION]
> This callout poses a question or highlights something that needs consideration.
```

> [!QUESTION]
> This callout poses a question or highlights something that needs consideration.

```markdown
> [!QUESTION] Think About It
> What would happen if we implemented this feature differently? Consider the trade-offs.
```

> [!QUESTION] Think About It
> What would happen if we implemented this feature differently? Consider the trade-offs.

**Best for:**
- Discussion prompts
- Uncertain information
- Review questions
- Critical thinking exercises

### 6. WARNING - Caution Required

Use for warnings about potential issues or things to be careful about.

```markdown
> [!WARNING]
> This warning alerts users to potential issues they should be aware of.
```

> [!WARNING]
> This warning alerts users to potential issues they should be aware of.

```markdown
> [!WARNING] Database Migration
> Always backup your database before running migrations in production environments.
```

> [!WARNING] Database Migration
> Always backup your database before running migrations in production environments.

**Best for:**
- Potential issues
- Precautions
- Risk notifications
- Important warnings

### 7. CAUTION - Proceed Carefully

Use for situations requiring careful consideration or extra attention.

```markdown
> [!CAUTION]
> Exercise caution when proceeding with this action.
```

> [!CAUTION]
> Exercise caution when proceeding with this action.

```markdown
> [!CAUTION] Configuration Changes
> Modifying these settings may affect system performance. Test in a development environment first.
```

> [!CAUTION] Configuration Changes
> Modifying these settings may affect system performance. Test in a development environment first.

**Best for:**
- Sensitive operations
- Configuration changes
- Actions requiring care
- Situations needing attention

### 8. DANGER - Critical Warnings

Use for critical warnings, dangerous operations, or serious issues.

```markdown
> [!DANGER]
> This is a critical warning about dangerous operations or serious issues.
```

> [!DANGER]
> This is a critical warning about dangerous operations or serious issues.

```markdown
> [!DANGER] Data Loss Risk
> This command will permanently delete all files in the directory. This action cannot be undone.
```

> [!DANGER] Data Loss Risk
> This command will permanently delete all files in the directory. This action cannot be undone.

**Best for:**
- Critical warnings
- Destructive operations
- Security risks
- Irreversible actions

### 9. IMPORTANT - Critical Information

Use for critical information that must not be missed.

```markdown
> [!IMPORTANT]
> This callout highlights critical information that users must not miss.
```

> [!IMPORTANT]
> This callout highlights critical information that users must not miss.

```markdown
> [!IMPORTANT] Breaking Changes
> Version 2.0 introduces breaking changes. Please review the migration guide before upgrading.
```

> [!IMPORTANT] Breaking Changes
> Version 2.0 introduces breaking changes. Please review the migration guide before upgrading.

**Best for:**
- Critical updates
- Breaking changes
- Must-read information
- Essential requirements

### 10. EXAMPLE - Code Examples

Use for code examples, demonstrations, or practical illustrations.

```markdown
> [!EXAMPLE]
> This callout shows examples or demonstrates how something works.
```

> [!EXAMPLE]
> This callout shows examples or demonstrates how something works.

```markdown
> [!EXAMPLE] API Usage
> ```javascript
> const response = await fetch('/api/users');
> const users = await response.json();
> ```
```

> [!EXAMPLE] API Usage
> ```javascript
> const response = await fetch('/api/users');
> const users = await response.json();
> ```

**Best for:**
- Code examples
- Demonstrations
- Practical illustrations
- Sample implementations

### 11. QUOTE - Quotations

Use for quotations, citations, or referenced material.

```markdown
> [!QUOTE]
> This callout is perfect for quotations or cited material.
```

> [!QUOTE]
> This callout is perfect for quotations or cited material.

```markdown
> [!QUOTE] Albert Einstein
> "The important thing is not to stop questioning. Curiosity has its own reason for existence."
```

> [!QUOTE] Albert Einstein
> "The important thing is not to stop questioning. Curiosity has its own reason for existence."

**Best for:**
- Famous quotes
- Citations
- Referenced material
- Inspirational messages

### 12. BUG - Bug Reports

Use for bug reports, known issues, or problems.

```markdown
> [!BUG]
> This callout identifies bugs, known issues, or problems that need attention.
```

> [!BUG]
> This callout identifies bugs, known issues, or problems that need attention.

```markdown
> [!BUG] Known Issue
> The search function may return incorrect results when using special characters. Fix planned for v1.2.
```

> [!BUG] Known Issue
> The search function may return incorrect results when using special characters. Fix planned for v1.2.

**Best for:**
- Bug reports
- Known issues
- Problems to fix
- Workarounds

### 13. TODO - Tasks and Reminders

Use for tasks, to-do items, or reminders about work to be done.

```markdown
> [!TODO]
> This callout marks tasks or items that need to be completed.
```

> [!TODO]
> This callout marks tasks or items that need to be completed.

```markdown
> [!TODO] Documentation Updates
> - [ ] Update API documentation
> - [ ] Add more code examples
> - [ ] Review and publish changes
```

> [!TODO] Documentation Updates
> - [ ] Update API documentation
> - [ ] Add more code examples
> - [ ] Review and publish changes

**Best for:**
- Task lists
- Reminders
- Work to be done
- Action items

## 🎨 Advanced Callout Techniques

### Nested Callouts

You can place callouts inside other callouts for complex information hierarchy:

```markdown
> [!INFO] Main Information
> This is the main information block.
> 
> > [!WARNING] Nested Warning
> > This is a warning inside the info block.
> > 
> > > [!TIP] Deeply Nested Tip
> > > This tip is nested two levels deep.
```

> [!INFO] Main Information
> This is the main information block.
> 
> > [!WARNING] Nested Warning
> > This is a warning inside the info block.
> > 
> > > [!TIP] Deeply Nested Tip
> > > This tip is nested two levels deep.

### Callouts with Rich Content

Callouts support all markdown formatting:

```markdown
> [!EXAMPLE] Rich Content Example
> You can include **bold text**, *italic text*, `inline code`, and even:
> 
> - Bullet points
> - Task lists: 
>   - [x] Completed task
>   - [ ] Pending task
> 
> | Column 1 | Column 2 |
> |----------|----------|
> | Data 1   | Data 2   |
> 
> ```javascript
> // Even code blocks!
> function example() {
>     return "Hello from inside a callout!";
> }
> ```
```

> [!EXAMPLE] Rich Content Example
> You can include **bold text**, *italic text*, `inline code`, and even:
> 
> - Bullet points
> - Task lists: 
>   - [x] Completed task
>   - [ ] Pending task
> 
> | Column 1 | Column 2 |
> |----------|----------|
> | Data 1   | Data 2   |
> 
> ```javascript
> // Even code blocks!
> function example() {
>     return "Hello from inside a callout!";
> }
> ```

### Multi-Line Callouts

For longer content, continue the callout across multiple lines:

```markdown
> [!NOTE] Long Content Example
> This is a longer callout that spans multiple lines.
> 
> You can have multiple paragraphs inside a callout by continuing
> the `>` marker on each line.
> 
> This technique is useful for longer explanations or when you
> need to include multiple types of content.
```

> [!NOTE] Long Content Example
> This is a longer callout that spans multiple lines.
> 
> You can have multiple paragraphs inside a callout by continuing
> the `>` marker on each line.
> 
> This technique is useful for longer explanations or when you
> need to include multiple types of content.

## 📊 Callout Comparison Chart

| Callout Type | Primary Color | Best Use Case | Urgency Level |
|--------------|---------------|---------------|---------------|
| NOTE | Gray | General information | Low |
| INFO | Blue | Important facts | Medium |
| TIP | Green | Helpful advice | Low |
| SUCCESS | Green | Positive outcomes | Low |
| QUESTION | Purple | Prompts & queries | Medium |
| WARNING | Yellow | Potential issues | High |
| CAUTION | Orange | Careful consideration | High |
| DANGER | Red | Critical warnings | Critical |
| IMPORTANT | Purple | Must-read info | High |
| EXAMPLE | Pink | Code & demonstrations | Low |
| QUOTE | Gray | Citations & quotes | Low |
| BUG | Red | Issues & problems | High |
| TODO | Blue | Tasks & reminders | Medium |

## 🎯 Best Practices

### When to Use Each Type

**Use NOTE for:**
- Background information
- General explanations
- Context setting
- Neutral observations

**Use INFO for:**
- System requirements
- Important facts
- Key information
- Prerequisites

**Use TIP for:**
- Productivity improvements
- Shortcuts and tricks
- Best practices
- Optimization suggestions

**Use SUCCESS for:**
- Completion confirmations
- Positive results
- Achievement notifications
- Success stories

**Use QUESTION for:**
- Discussion prompts
- Uncertain information
- Review questions
- Critical thinking

**Use WARNING for:**
- Potential problems
- Precautionary advice
- Risk notifications
- Important cautions

**Use CAUTION for:**
- Sensitive operations
- Configuration changes
- Actions requiring care
- Situations needing attention

**Use DANGER for:**
- Critical warnings
- Destructive operations
- Security risks
- Irreversible actions

**Use IMPORTANT for:**
- Critical updates
- Breaking changes
- Must-read information
- Essential requirements

**Use EXAMPLE for:**
- Code demonstrations
- Practical illustrations
- Sample implementations
- Tutorial examples

**Use QUOTE for:**
- Famous quotations
- Citations
- Referenced material
- Inspirational content

**Use BUG for:**
- Bug reports
- Known issues
- Problems to fix
- Workarounds

**Use TODO for:**
- Task lists
- Action items
- Reminders
- Work planning

### Writing Effective Callouts

#### Keep Titles Concise
```markdown
<!-- Good -->
> [!TIP] Keyboard Shortcut
> Use Ctrl+K to search

<!-- Less effective -->
> [!TIP] Here's a Really Useful Keyboard Shortcut You Should Know About
> Use Ctrl+K to search
```

#### Use Clear, Actionable Language
```markdown
<!-- Good -->
> [!WARNING] Backup Required
> Always backup your database before running migrations.

<!-- Less clear -->
> [!WARNING] 
> You might want to consider maybe backing up your database or something.
```

#### Match Content to Callout Type
```markdown
<!-- Good match -->
> [!DANGER] Data Loss Risk
> This command will permanently delete all files.

<!-- Poor match -->
> [!TIP] Data Loss Risk
> This command will permanently delete all files.
```

### Content Organization

#### Use Callouts Strategically
- **Don't overuse** - Too many callouts lose impact
- **Be consistent** - Use the same type for similar content
- **Consider flow** - Place callouts where they add value
- **Maintain hierarchy** - Use nested callouts thoughtfully

#### Combine with Other Elements
```markdown
# Installation Guide

## Prerequisites

> [!INFO] System Requirements
> - Node.js 16 or higher
> - npm 7 or higher

## Installation Steps

1. Clone the repository
2. Install dependencies

> [!TIP] Pro Tip
> Use `npm ci` instead of `npm install` for faster, reliable installs.

3. Configure environment

> [!WARNING] Environment Variables
> Copy `.env.example` to `.env` and update with your values.

## Troubleshooting

> [!BUG] Common Issue
> If you see "Module not found" errors, try deleting `node_modules` and running `npm install` again.
```

## 🚀 Advanced Usage Patterns

### Documentation Workflows

#### API Documentation
```markdown
# User API

> [!INFO] Base URL
> All endpoints use the base URL: `https://api.example.com/v1`

## Authentication

> [!IMPORTANT] API Key Required
> All requests must include an API key in the header.

> [!EXAMPLE] Request Header
> ```
> Authorization: Bearer YOUR_API_KEY
> ```

## Get User

> [!EXAMPLE] Request
> ```http
> GET /users/123
> ```

> [!SUCCESS] Response
> ```json
> {
>   "id": 123,
>   "name": "John Doe",
>   "email": "john@example.com"
> }
> ```

> [!DANGER] Rate Limits
> This endpoint is limited to 100 requests per minute.
```

#### Tutorial Structure
```markdown
# React Tutorial

> [!NOTE] Prerequisites
> Basic knowledge of JavaScript and HTML required.

## Setup

> [!TIP] Quick Start
> Use Create React App for fastest setup: `npx create-react-app my-app`

## Components

> [!EXAMPLE] Basic Component
> ```jsx
> function Welcome(props) {
>   return <h1>Hello, {props.name}!</h1>;
> }
> ```

> [!IMPORTANT] Remember
> Component names must start with a capital letter.

## Common Mistakes

> [!BUG] Infinite Re-renders
> Avoid calling `setState` directly in render methods.

> [!TODO] Next Steps
> - [ ] Learn about hooks
> - [ ] Explore context API
> - [ ] Practice with projects
```

### Project Documentation

#### Feature Planning
```markdown
# Feature: User Dashboard

> [!INFO] Overview
> Create a personalized dashboard for users to manage their account.

## Requirements

> [!IMPORTANT] Must Have
> - User profile editing
> - Activity history
> - Settings management

> [!QUESTION] To Consider
> Should we include analytics or keep it simple?

## Implementation

> [!EXAMPLE] Component Structure
> ```
> Dashboard/
> ├── Profile.jsx
> ├── Activity.jsx
> └── Settings.jsx
> ```

> [!WARNING] Security
> Ensure all user data is properly validated and sanitized.

## Known Issues

> [!BUG] Mobile Layout
> Dashboard components don't resize properly on mobile devices.

> [!TODO] Action Items
> - [ ] Create wireframes
> - [ ] Design mockups
> - [ ] Implement components
> - [ ] Write tests
```

## 🎨 Theme Integration

### Color Adaptation
Callouts automatically adapt to your chosen theme:
- **Dark themes** - Muted colors with good contrast
- **Light themes** - Bright colors with proper readability
- **Custom themes** - Inherit theme color schemes

### Accessibility Features
- **High contrast** - Clear visual distinction
- **Screen reader support** - Proper semantic markup
- **Keyboard navigation** - Accessible to all users
- **Color independence** - Icons provide additional context

## 💡 Creative Usage Ideas

### Learning Materials
Use callouts to create structured learning content:

```markdown
# JavaScript Fundamentals

> [!NOTE] Learning Objectives
> By the end of this lesson, you'll understand variables, functions, and objects.

> [!EXAMPLE] Variables
> ```javascript
> let message = "Hello, World!";
> const pi = 3.14159;
> ```

> [!TIP] Naming Convention
> Use camelCase for variable names: `firstName`, `lastName`

> [!QUESTION] Practice
> What would happen if you try to reassign a `const` variable?

> [!SUCCESS] Key Takeaway
> Variables are the building blocks of JavaScript programs.
```

### Project Management
Create visual project status updates:

```markdown
# Project Alpha - Weekly Update

> [!SUCCESS] Completed This Week
> - User authentication system
> - Database schema design
> - API endpoints for user management

> [!TODO] Next Week Goals
> - [ ] Implement password reset
> - [ ] Add email verification
> - [ ] Create admin dashboard

> [!WARNING] Blockers
> Waiting for design approval on the admin interface.

> [!IMPORTANT] Deadline Reminder
> MVP deadline is next Friday. All core features must be complete.
```

### Personal Notes
Enhance journal entries and personal documentation:

```markdown
# Daily Journal - 2025-01-19

> [!SUCCESS] Wins Today
> - Completed the callout tutorial
> - Fixed three critical bugs
> - Had a productive team meeting

> [!QUESTION] Reflection
> What could I have done better during the client presentation?

> [!TIP] Tomorrow's Focus
> Start working on the new feature requirements early.

> [!TODO] Personal Goals
> - [ ] Exercise for 30 minutes
> - [ ] Read one chapter of "Clean Code"
> - [ ] Update project documentation
```

## 🔧 Technical Implementation

### Parsing Rules
The callout system uses these parsing rules:
- Must start with `> [!TYPE]` 
- Type must be one of the 13 supported types
- Optional title follows the type
- Content continues with `>` prefix on each line

### CSS Classes
Each callout generates HTML with specific classes:
- `.callout` - Base callout styling
- `.callout-{type}` - Type-specific styling (e.g., `.callout-warning`)
- `.callout-header` - Title section
- `.callout-icon` - Icon container
- `.callout-content` - Content area

### JavaScript Processing
The markdown processor:
1. Detects callout syntax
2. Extracts type and title
3. Generates appropriate HTML structure
4. Applies theme-aware styling
5. Includes semantic markup for accessibility

## 🎯 Quick Reference

### Syntax Template
```markdown
> [!TYPE] Optional Title
> Your content here
> Multiple lines supported
> **Markdown** formatting works
```

### All Types at a Glance
- `NOTE` - General information
- `INFO` - Important facts
- `TIP` - Helpful advice
- `SUCCESS` - Positive outcomes
- `QUESTION` - Queries and prompts
- `WARNING` - Potential issues
- `CAUTION` - Proceed carefully
- `DANGER` - Critical warnings
- `IMPORTANT` - Must-read info
- `EXAMPLE` - Demonstrations
- `QUOTE` - Citations
- `BUG` - Issues and problems
- `TODO` - Tasks and reminders

---

Callouts are a powerful way to make your documentation more engaging and informative. Experiment with different types to find the perfect fit for your content! 