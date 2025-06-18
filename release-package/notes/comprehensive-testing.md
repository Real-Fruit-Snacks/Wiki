---
title: Comprehensive Wiki Testing Guide
tags: [testing, qa, documentation]
author: Claude
created: 2025-06-16
description: Complete testing checklist for all Wiki features
---

# Comprehensive Wiki Testing Guide

This document contains test cases for all Wiki features to ensure full functionality.

## Core Functionality Tests

### 1. Navigation & Routing
- [ ] Homepage loads correctly at `#/notes/index.md`
- [ ] Direct URL navigation works (e.g., `#/notes/personal/daily-journal.md`)
- [ ] Back/forward browser buttons work correctly
- [ ] Invalid paths show error message
- [ ] Relative links in notes work properly

### 2. Tab Management
- [ ] Create new tab with Ctrl+T
- [ ] Switch between tabs by clicking
- [ ] Switch with Ctrl+1-9 shortcuts
- [ ] Close tab with X button
- [ ] Close tab with Ctrl+W
- [ ] Close all tabs with Ctrl+Shift+W
- [ ] Drag and drop tabs to reorder
- [ ] Tab state persists (scroll position, content)
- [ ] Maximum tab limit works

### 3. Sidebar Navigation
- [ ] Expand/collapse folders
- [ ] Click files to load notes
- [ ] Context filtering works
- [ ] File counts are accurate
- [ ] Alphabetical sorting is correct
- [ ] Expand/collapse all buttons work

### 4. Search Functionality (Ctrl+K)
- [ ] Basic text search works
- [ ] `"exact phrase"` search works
- [ ] `-exclude` operator works
- [ ] `tag:tagname` operator works
- [ ] `author:name` operator works
- [ ] `code:javascript` operator works
- [ ] Combined operators work
- [ ] Search results show previews
- [ ] Click result opens note
- [ ] Ctrl+click opens in new tab

### 5. Tag Filtering
- [ ] Open with Ctrl+F (when not in note)
- [ ] Select multiple tags
- [ ] OR mode combines tags
- [ ] AND mode requires all tags
- [ ] Exclude tags with right-click
- [ ] Clear all selections
- [ ] Tag counts are accurate

### 6. Recent Files & Bookmarks
- [ ] Recent files tracked correctly
- [ ] Pin/unpin recent files
- [ ] Bookmark current note (Ctrl+D)
- [ ] Remove bookmarks
- [ ] Clear all bookmarks
- [ ] Navigate to bookmarked notes

### 7. Settings (Ctrl+,)
- [ ] Theme switching works
- [ ] Auto-theme follows system
- [ ] Line numbers toggle
- [ ] Word wrap toggle
- [ ] Font size changes
- [ ] Font family changes
- [ ] Content width changes
- [ ] Custom CSS applies
- [ ] Settings persist after refresh

### 8. Pomodoro Timer
- [ ] Start/pause timer
- [ ] Reset timer
- [ ] Work/break intervals switch
- [ ] Sound notifications work
- [ ] Settings persist

## New Feature Tests

### 1. Table of Contents
- [ ] TOC generates for notes with 2+ headings
- [ ] All heading levels (h1-h6) included
- [ ] Click heading jumps to section
- [ ] Current section highlighted on scroll
- [ ] Collapse/expand TOC works
- [ ] TOC hidden on mobile (<1200px)
- [ ] TOC adjusts in focus mode
- [ ] No TOC for notes with <2 headings

### 2. Wiki-style Links
- [ ] [[Note Title]] creates working link
- [ ] Case-insensitive matching
- [ ] Broken links show in red
- [ ] Links have proper hover states
- [ ] Clicking link navigates correctly
- [ ] Links work in preview mode
- [ ] Special characters in titles handled

### 3. Reading Progress
- [ ] Progress bar shows at top
- [ ] Progress updates on scroll
- [ ] Reading time calculated correctly
- [ ] Word count is accurate
- [ ] Time updates to "X min left"
- [ ] Shows "Almost done!" at 95%
- [ ] Removed on non-note pages

### 4. Focus Mode
- [ ] Toggle with F key
- [ ] Toggle with eye icon button
- [ ] Sidebar hides/shows
- [ ] Content centers properly
- [ ] Font size increases
- [ ] TOC remains visible
- [ ] Setting persists on refresh
- [ ] Escape key doesn't exit focus mode

### 5. In-Note Search
- [ ] Ctrl+F opens search (overrides browser)
- [ ] Search highlights all matches
- [ ] Current match highlighted differently
- [ ] Match counter shows "X of Y"
- [ ] Enter navigates forward
- [ ] Shift+Enter navigates backward
- [ ] Arrow buttons work
- [ ] Escape closes search
- [ ] X button closes search
- [ ] Search cleared on close
- [ ] Doesn't search in code blocks

## Edge Cases & Interactions

### Feature Interactions
- [ ] TOC + Focus mode work together
- [ ] Wiki links + Search highlighting
- [ ] Progress bar + Focus mode
- [ ] Note search + Wiki links
- [ ] Multiple features in same note
- [ ] Tab switching preserves TOC state
- [ ] Tab switching clears note search
- [ ] Settings changes apply to new features

### Edge Cases
- [ ] Empty notes don't break features
- [ ] Very long notes (1000+ lines)
- [ ] Notes with 50+ headings
- [ ] Notes with no headings
- [ ] Notes with only code blocks
- [ ] Circular wiki links
- [ ] Wiki links to same note
- [ ] Search with no results
- [ ] Search with 100+ matches
- [ ] Special characters in search
- [ ] Rapid feature toggling
- [ ] Multiple browser tabs

### Performance Tests
- [ ] 10+ tabs open simultaneously
- [ ] Large note (10,000+ words)
- [ ] Search in large index
- [ ] TOC with 100+ headings
- [ ] Note search with 500+ matches
- [ ] Rapid scrolling with progress bar
- [ ] Theme switching speed
- [ ] Initial load time

### Responsive Design
- [ ] Mobile (<768px) layout
- [ ] Tablet (768-1200px) layout
- [ ] Desktop (>1200px) layout
- [ ] TOC hidden on mobile
- [ ] Focus mode on mobile
- [ ] Search UI on mobile
- [ ] Touch interactions work
- [ ] Pinch zoom doesn't break layout

## Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari
- [ ] Keyboard shortcuts work
- [ ] Local storage works
- [ ] Smooth scrolling works

## Bug Checklist

### Known Issues to Verify
- [ ] TOC links with special characters
- [ ] Wiki links with quotes in titles
- [ ] Search highlighting in nested elements
- [ ] Progress bar with dynamic content
- [ ] Focus mode with multiple monitors
- [ ] Note search with regex characters
- [ ] Memory leaks with many tabs
- [ ] Event listener cleanup

### Potential Bugs
- [ ] Duplicate event listeners
- [ ] Memory leaks from uncleaned DOm
- [ ] Race conditions in async operations
- [ ] State sync between features
- [ ] CSS conflicts between themes
- [ ] JavaScript errors in console
- [ ] Accessibility issues
- [ ] Security (XSS) concerns

## Test Data

### Test Notes
1. **Short note** - No headings, <100 words
2. **Long note** - Multiple headings, 5000+ words
3. **Code heavy** - Mostly code blocks
4. **Link heavy** - Many wiki links
5. **Special chars** - Unicode, emoji, symbols
6. **Nested headings** - Deep hierarchy
7. **Mixed content** - All features combined

### Test Searches
1. Single word: `javascript`
2. Phrase: `"table of contents"`
3. Exclude: `python -django`
4. Tags: `tag:tutorial tag:beginner`
5. Complex: `react -class tag:javascript author:john`
6. Special: `C++ "async/await" -promise`

### Test Links
1. Normal: [[JavaScript Tips]]
2. Special: [[C++ Guide]]
3. Broken: [[Does Not Exist]]
4. Long: [[This Is A Very Long Note Title That Should Still Work]]
5. Symbols: [[Guide: How-to & Tips!]]

## Performance Benchmarks

| Test | Target | Actual |
|------|--------|--------|
| Initial load | <1s | ___ |
| Note switch | <200ms | ___ |
| Search results | <100ms | ___ |
| TOC generation | <50ms | ___ |
| Focus mode toggle | <50ms | ___ |
| Note search | <100ms | ___ |
| Theme switch | <100ms | ___ |

## Sign-off

- [ ] All core features working
- [ ] All new features working
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Responsive design intact
- [ ] No regressions found
- [ ] Ready for release