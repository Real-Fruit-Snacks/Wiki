---
title: Edge Cases & Special Characters
tags: [test, edge-cases, special-characters]
author: Test Suite
created: 2025-06-16
description: Testing edge cases and special characters in all features
---

# Edge Cases & Special Characters Test

This note tests edge cases and special characters that might break features.

## Special Characters in Headings: !@#$%^&*()_+{}|:"<>?

### Heading with "Quotes" and 'Apostrophes'

#### Code: `inline code` in heading

##### Very Long Heading That Should Still Work In The Table Of Contents Even Though It's Extremely Long And Might Overflow

###### H6: The deepest level (should work)

## Wiki Links Edge Cases

### Normal Links
- Basic link: [[JavaScript Tips]]
- Link with spaces: [[Daily Journal]]
- Link with special chars: [[Edge Cases & Special Characters Test]]

### Broken Links
- Non-existent: [[This Note Does Not Exist At All]]
- Special chars broken: [[Test!@#$%^&*()]]
- Empty link: [[]]
- Just spaces: [[   ]]

### Edge Case Links
- Self-reference: [[Edge Cases & Special Characters Test]]
- Case variations: [[JAVASCRIPT TIPS]], [[javascript tips]], [[JaVaScRiPt TiPs]]
- Unicode: [[Тест Юникод]], [[测试中文]], [[テスト日本語]]
- Emoji in title: [[Test 🎉 Emoji 🚀]]

## Search Test Patterns

Search for these patterns to test the in-note search:

- Simple word: test
- Special chars: !@#$%^&*()
- Regex chars: .*+?^${}()|[\]
- Quotes: "double quotes" and 'single quotes'
- HTML-like: <script>alert('test')</script>
- Unicode: Привет мир, 你好世界, こんにちは世界
- Mixed: test-123_ABC.xyz@email.com
- Repeated: test test test test test

## Very Long Content for Reading Progress

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This paragraph repeats many times to create a long document for testing reading progress and time estimation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This paragraph repeats many times to create a long document for testing reading progress and time estimation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This paragraph repeats many times to create a long document for testing reading progress and time estimation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This paragraph repeats many times to create a long document for testing reading progress and time estimation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This paragraph repeats many times to create a long document for testing reading progress and time estimation.

## Code Blocks with Special Characters

```javascript title:"Special <>&\"' Characters"
// Test special characters in code
const special = "!@#$%^&*()_+{}|:\"<>?";
const regex = /.*+?^${}()|[\]/g;
const html = '<div class="test">Content</div>';
const unicode = "Привет мир 你好世界 こんにちは世界";
```

```html title:"HTML with <script> tags"
<!DOCTYPE html>
<html>
<head>
    <title>Test &amp; Special &lt;Characters&gt;</title>
    <script>
        alert("This should not execute!");
    </script>
</head>
<body>
    <div class="test">Content with "quotes" and 'apostrophes'</div>
</body>
</html>
```

## Empty Sections

### 

#### 

##### 

###### 

## Performance Test Section

### Many Headings Follow

#### Heading 1
#### Heading 2
#### Heading 3
#### Heading 4
#### Heading 5
#### Heading 6
#### Heading 7
#### Heading 8
#### Heading 9
#### Heading 10
#### Heading 11
#### Heading 12
#### Heading 13
#### Heading 14
#### Heading 15
#### Heading 16
#### Heading 17
#### Heading 18
#### Heading 19
#### Heading 20

(Continue this pattern for performance testing)

## XSS Test Vectors

These should all be safely escaped:

- `<script>alert('XSS')</script>`
- `<img src=x onerror=alert('XSS')>`
- `<svg onload=alert('XSS')>`
- `javascript:alert('XSS')`
- `<iframe src="javascript:alert('XSS')"></iframe>`
- Wiki link XSS: [[<script>alert('XSS')</script>]]
- Search for: <script>alert('XSS')</script>

## Callouts with Special Characters

> [!WARNING] Warning with "quotes" and <html>
> This callout contains special characters: !@#$%^&*()_+{}|:"<>?
> And HTML-like content: <div class="test">Should be escaped</div>

> [!TIP] Multi-line with ```code```
> Line 1 with special chars: ${}
> ```javascript
> console.log("Code in callout");
> ```
> Line 3 with more text

## Edge Case Scenarios

1. **Empty note** - What if there's no content after frontmatter?
2. **No headings** - TOC should not appear
3. **Only H1** - TOC should not appear (needs 2+ headings)
4. **Circular references** - [[Edge Cases & Special Characters Test]]
5. **Rapid scrolling** - Progress bar should handle smoothly
6. **Multiple searches** - Rapid Ctrl+F shouldn't break
7. **Tab overflow** - What happens with 50+ tabs?
8. **Theme switching** - While features are active
9. **Resize window** - Responsive behavior with TOC
10. **Print view** - How do features look when printing?

## Summary

If all features work correctly with this edge case test file, the implementation is robust!