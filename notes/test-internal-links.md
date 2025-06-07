---
title: Internal Links Test
tags: [test, links]
created: 2025-01-06
author: Test User
description: Testing internal link functionality
related:
  - ./theme-showcase.md
  - ./test-code-blocks.md
  - /notes/technical/javascript-tips.md
  - ../technical/programming/python-guide.md
---

# Internal Links Test

This page tests various internal link formats to see what works.

## Absolute Links with Hash Routing

These should work based on the current implementation:
- [Home Page](#/notes/index.md)
- [JavaScript Tips](#/notes/technical/javascript-tips.md)
- [Git Commands](#/notes/reference/git-commands.md)

## Relative Markdown Links

Testing if these work:
- [Index using relative path](./index.md)
- [Parent directory file](../notes/index.md)
- [Sibling file](./theme-showcase.md)
- [Nested relative](./technical/javascript-tips.md)

## Without .md Extension

Testing without extensions:
- [Index without extension](./index)
- [JavaScript Tips no extension](./technical/javascript-tips)

## Full Path Without Hash

These probably won't work:
- [Direct path](/notes/index.md)
- [Direct nested](/notes/technical/javascript-tips.md)

## Tag Links

Tag links use special format:
- [JavaScript Tag](#/tags/javascript)
- [Tutorial Tag](#/tags/tutorial)

## Heading Anchors

Links to sections within current page:
- [Jump to Absolute Links](#absolute-links-with-hash-routing)
- [Jump to Tag Links](#tag-links)

## External Links

For comparison, external links:
- [Google](https://www.google.com)
- [GitHub](https://github.com)