---
title: Line Number Word Wrap Test
tags: [test, word-wrap, line-numbers]
created: 2025-06-13
author: System
description: Test file for verifying line number alignment with word wrap
---

# Line Number Word Wrap Test

This file tests whether line numbers stay aligned when code has very long lines that wrap.

## JavaScript with Long Lines

```javascript
// Short line
const shortVariable = 'test';

// This is an extremely long line that should wrap when word wrap is enabled in the browser - it contains a very long string literal that goes on and on and should definitely cause the line to wrap to multiple visual lines while still being logically line 4
const veryLongVariableNameThatShouldCauseWrapping = 'This is an extremely long string literal that contains a lot of text and should cause the line to wrap when word wrap is enabled, testing whether the line number 4 stays aligned with this logical line even when it spans multiple visual lines on the screen';

// Another short line
console.log('Line 6');

// Another long line with a complex object literal that has many properties and values that should cause wrapping
const complexObject = { property1: 'value1', property2: 'value2', property3: 'value3', property4: 'value4', property5: 'value5', property6: 'value6', property7: 'value7', property8: 'value8', property9: 'value9', property10: 'value10' };

// Final short line
return true;
```

## Python with Long Lines

```python
# Short comment
def test():
    # This is a very long comment that should wrap across multiple lines when word wrap is enabled, and we need to test that the line number stays with the logical line number 4 and doesn't get misaligned when the text wraps to multiple visual lines on the screen
    very_long_variable_name_that_causes_wrapping = "This is a very long string that contains lots of text and should definitely cause line wrapping when word wrap is enabled in the browser, testing the line number alignment functionality"
    
    # Another long line with a complex dictionary
    complex_dict = {"key1": "value1", "key2": "value2", "key3": "value3", "key4": "value4", "key5": "value5", "key6": "value6", "key7": "value7", "key8": "value8"}
    
    return True
```

## Bash with Long Commands

```bash
# Short command
ls -la

# Very long command that should wrap
find /very/long/path/to/some/directory/structure -name "*.txt" -type f -exec grep -l "search pattern that is quite long and specific" {} \; | sort | uniq | head -20 | xargs -I {} cp {} /another/very/long/destination/path/

# Another long command with many pipes
cat /path/to/large/file.txt | grep "pattern" | sed 's/old/new/g' | awk '{print $1, $2, $3}' | sort | uniq -c | sort -nr | head -10 | tee output.txt

echo "Done"
```

When word wrap is enabled, the line numbers should stay aligned with their logical lines, not become misaligned due to visual line wrapping.