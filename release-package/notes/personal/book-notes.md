---
title: Book Notes and Reviews
tags: [personal, books, reading, reviews]
created: 2024-01-25
author: Jane Smith
description: Notes and reviews from books I've read
updated: 2024-02-20
category: personal
status: published
---

# Book Notes and Reviews

## Currently Reading

### "The Pragmatic Programmer" by David Thomas and Andrew Hunt

**Progress:** Chapter 5 of 8

Key takeaways so far:
- **DRY Principle** (Don't Repeat Yourself) - fundamental to good software design
- **Orthogonality** - keep components independent and decoupled
- **Tracer bullets** - build end-to-end features to get quick feedback

```python title:"This is the title"
# Example: DRY principle in action
# Bad
def calculate_area_rectangle(width, height):
    return width * height

def calculate_area_square(side):
    return side * side

# Good
def calculate_area(width, height=None):
    if height is None:
        height = width  # Square case
    return width * height
```

## Recently Finished

### "Atomic Habits" by James Clear ⭐⭐⭐⭐⭐

**Finished:** February 1, 2024

This book completely changed how I think about habits. The main concepts:

1. **1% Better Every Day** - Small improvements compound over time
2. **Habit Stacking** - Link new habits to existing ones
3. **Environment Design** - Make good habits obvious and bad habits invisible
4. **Identity-Based Habits** - Focus on who you want to become

My implementation:
- Created a habit tracker in my journal
- Redesigned my workspace for productivity
- Started habit stacking: coffee → meditation → writing

### "Clean Code" by Robert C. Martin ⭐⭐⭐⭐

**Finished:** January 15, 2024

Essential reading for any developer. Key principles:

- **Meaningful names** - Variables and functions should clearly express intent
- **Small functions** - Each function should do one thing well
- **Comments are failures** - Code should be self-documenting

## Reading List

### Technical Books
1. "Design Patterns" by Gang of Four
2. "The Phoenix Project" by Gene Kim
3. "Structure and Interpretation of Computer Programs"

### Personal Development
1. "Deep Work" by Cal Newport
2. "The Power of Now" by Eckhart Tolle
3. "Thinking, Fast and Slow" by Daniel Kahneman

### Fiction
1. "Project Hail Mary" by Andy Weir
2. "The Three-Body Problem" by Liu Cixin
3. "Neuromancer" by William Gibson