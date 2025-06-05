---
title: Callouts Demonstration
tags: [demo, documentation, callouts]
created: 2024-01-15
author: Wiki Admin
description: Demonstration of all available callout types and their usage
---

# Callouts Demonstration

This page demonstrates all available callout types in the wiki system. Callouts are special blockquotes that provide visual emphasis for important information.

## Basic Syntax

To create a callout, use the following syntax:

```markdown
> [!TYPE] Optional Title
> Content of the callout
> Can span multiple lines
```

## Available Callout Types

### Warning

> [!WARNING]
> This is a warning callout. Use it to alert users about potential issues or dangerous operations.

> [!WARNING] Custom Title Here
> You can also provide a custom title for any callout type.

### Info

> [!INFO]
> This is an info callout. Use it to provide additional information or context.

### Tip

> [!TIP]
> This is a tip callout. Use it to share helpful advice or best practices.

### Note

> [!NOTE]
> This is a note callout. Use it for general notes or observations.

### Danger

> [!DANGER]
> This is a danger callout. Use it for critical warnings that require immediate attention.

### Important

> [!IMPORTANT]
> This is an important callout. Use it to highlight crucial information.

### Caution

> [!CAUTION]
> This is a caution callout. Use it to advise users to proceed carefully.

### Success

> [!SUCCESS]
> This is a success callout. Use it to indicate successful operations or positive outcomes.

### Question

> [!QUESTION]
> This is a question callout. Use it to pose questions or highlight areas that need clarification.

### Example

> [!EXAMPLE]
> This is an example callout. Use it to provide examples or demonstrations.

### Quote

> [!QUOTE]
> This is a quote callout. Use it to highlight quotations or testimonials.

### Bug

> [!BUG]
> This is a bug callout. Use it to document known issues or bugs.

### Todo

> [!TODO]
> This is a todo callout. Use it to track tasks or action items.

## Advanced Usage

### Callouts with Complex Content

> [!INFO] Callouts Support Rich Content
> Callouts can contain various types of content:
> - Lists like this one
> - **Bold text** and *italic text*
> - [Links to other pages](#)
> 
> They can even contain code blocks:
> ```javascript
> console.log("Hello from a callout!");
> ```

### Nested Callouts

> [!WARNING] Parent Callout
> This is the main callout.
> 
> > [!INFO] Nested Callout
> > Callouts can be nested inside other callouts for complex information hierarchy.

### Multiple Paragraphs

> [!NOTE] Long Content Example
> This is the first paragraph of the callout. It contains some introductory information.
> 
> This is the second paragraph. Notice how the callout maintains proper spacing between paragraphs.
> 
> And here's a third paragraph with a list:
> 1. First item
> 2. Second item
> 3. Third item

## Best Practices

> [!TIP] When to Use Callouts
> - Use callouts sparingly to maintain their effectiveness
> - Choose the appropriate type based on the content
> - Keep callout content concise when possible
> - Use custom titles to provide context

> [!CAUTION] Avoid Overuse
> Too many callouts on a single page can be overwhelming and reduce their impact. Use them strategically to highlight truly important information.

## Theme Compatibility

> [!SUCCESS] Works with All Themes!
> The callout system is designed to work seamlessly with all 15+ built-in themes. Colors and styles automatically adapt to maintain readability and visual consistency.