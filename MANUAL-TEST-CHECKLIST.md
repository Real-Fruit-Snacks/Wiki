# Manual Testing Checklist for Notes Wiki Features

## 🚨 Pre-Test Setup
1. Open browser console (F12)
2. Clear localStorage: `localStorage.clear()`
3. Refresh the page
4. Run automated tests first: Copy contents of `test-features.js` into console

## 1. Quick File Switcher (Ctrl+P)

### Visual Tests:
- [ ] Press Ctrl+P - Modal should appear with smooth animation
- [ ] Check overlay darkens background properly
- [ ] Verify search input has focus immediately
- [ ] Type slowly - see debouncing in action (150ms delay)
- [ ] Check file icons display correctly
- [ ] Verify truncation of long file names with ellipsis
- [ ] Test scrolling in results list

### Console Checks:
```javascript
// Watch for these in console:
"[Quick Switcher] Search query: <your-search>"
"[Quick Switcher] Results found: <number>"
// No errors should appear
```

### Edge Cases to Test:
- [ ] Search for non-existent file
- [ ] Use special characters: `"test"`, `tag:demo`, `-exclude`
- [ ] Press Ctrl+P while modal is already open
- [ ] Very fast typing (should not lag)
- [ ] Click outside modal to close

### Performance Check:
```javascript
// Run this while searching:
performance.mark('search-start');
// After results appear:
performance.mark('search-end');
performance.measure('search-time', 'search-start', 'search-end');
console.log('Search took:', performance.getEntriesByName('search-time')[0].duration, 'ms');
```

## 2. Pin Important Tabs

### Visual Tests:
- [ ] Right-click tab - context menu appears
- [ ] Select "Pin Tab" - tab moves to start
- [ ] Pin icon visible on tab
- [ ] Pinned tab has different width/styling
- [ ] Try to drag pinned tab - should stay in pinned area
- [ ] Close pinned tab - confirmation dialog appears

### Console Checks:
```javascript
// Check pinned tabs:
Array.from(notesWiki.tabs.values()).filter(t => t.isPinned)
// Should show your pinned tabs
```

### Persistence Test:
1. Pin 2-3 tabs
2. Refresh page
3. Pinned tabs should remain pinned

## 3. Tab Session Management

### Visual Tests:
- [ ] Click session dropdown - shows current session
- [ ] Create new session with name "Work"
- [ ] Add some tabs
- [ ] Switch to "Default" session
- [ ] Switch back to "Work" - tabs restored
- [ ] Delete session - confirmation appears

### Console Checks:
```javascript
// View all sessions:
Object.keys(notesWiki.tabSessions)
// Current session:
notesWiki.activeSessionName
```

### Auto-save Test:
1. Enable auto-save in settings
2. Make changes to tabs
3. Wait 30 seconds
4. Check console for: `"Session auto-saved"`

## 4. Tab Groups

### Visual Tests:
- [ ] Click "Create Group" button
- [ ] Modal appears (not basic prompt)
- [ ] Select color and name
- [ ] Group header appears with color indicator
- [ ] Drag tab into group - indentation changes
- [ ] Collapse/expand group with smooth animation
- [ ] Right-click group header for options

### Console Checks:
```javascript
// View all groups:
notesWiki.tabGroups
// Tabs in groups:
Array.from(notesWiki.tabs.values()).filter(t => t.groupId).map(t => ({
    title: t.title,
    groupId: t.groupId
}))
```

## 5. Multiple Split Tabs

### Visual Tests:
- [ ] Press Ctrl+Shift+T - creates horizontal split
- [ ] Both panes show content
- [ ] Drag divider - smooth resize
- [ ] Minimum size enforced (can't make too small)
- [ ] Click panes to switch active (border highlight)
- [ ] Add more panes with "Add Pane" button
- [ ] Close pane with X button

### Console Checks:
```javascript
// Check split tabs:
Array.from(notesWiki.tabs.values()).filter(t => t.isSplitTab).map(t => ({
    id: t.id,
    panes: t.splitConfig.panes.length,
    orientation: t.splitConfig.orientation
}))
```

### Performance Test:
1. Create 4-pane split
2. Load heavy content in each
3. Resize rapidly - should stay smooth

## 6. Smart Theme Scheduling

### Visual Tests:
- [ ] Go to Settings → Themes
- [ ] Enable "Smart Theme Scheduling"
- [ ] Set times (make evening 1 minute from now)
- [ ] Wait for transition - smooth fade effect
- [ ] Enable blue light filter
- [ ] Adjust intensity - see color change
- [ ] Test "Get Location" for solar mode

### Console Checks:
```javascript
// Check scheduler status:
notesWiki.settings.scheduleEnabled
notesWiki.settings.scheduleMode
// Force check:
notesWiki.checkScheduledThemes()
```

### Blue Light Test:
```javascript
// Apply blue light manually:
notesWiki.applyBlueLight(50); // 50% intensity
// Check filter:
document.documentElement.style.filter
// Remove:
notesWiki.removeBlueLight();
```

## 7. Sticky Notes

### Visual Tests:
- [ ] Press Ctrl+Shift+S - note appears
- [ ] Drag note header - smooth movement
- [ ] Resize from corner - maintains min size
- [ ] Type in note - auto-saves (check save icon)
- [ ] Change color - instant update
- [ ] Minimize note - collapses to header
- [ ] Create multiple notes - proper stacking

### Console Checks:
```javascript
// View all sticky notes:
Array.from(notesWiki.stickyNotes.values())
// Check z-index management:
notesWiki.stickyZIndex
```

### Persistence Test:
1. Create 3 notes with content
2. Position them around screen
3. Refresh page
4. All notes should restore position/content

## 🔍 Integration Tests

### Test Feature Interactions:
1. **Groups + Pins + Sessions**:
   - Create pinned tab in group
   - Save session
   - Load different session
   - Return to original - group and pin preserved

2. **Split View + Quick Switcher**:
   - Create split view
   - Use Ctrl+P in each pane
   - Open different files
   - Verify independent content

3. **Theme Scheduling + Settings**:
   - Enable scheduling
   - Change theme manually
   - Verify schedule respects manual change
   - Test transition during other operations

## 🐛 Known Issues to Check

### Memory Leaks:
```javascript
// Before testing:
const initialMemory = performance.memory.usedJSHeapSize;

// After heavy usage:
const currentMemory = performance.memory.usedJSHeapSize;
const increase = ((currentMemory - initialMemory) / 1024 / 1024).toFixed(2);
console.log(`Memory increased by ${increase} MB`);
```

### Event Listeners:
```javascript
// Check for leaked listeners:
getEventListeners(document);
getEventListeners(window);
// Should not grow excessively
```

### localStorage Size:
```javascript
// Check storage usage:
let total = 0;
for (let key in localStorage) {
    total += localStorage[key].length + key.length;
}
console.log('localStorage usage:', (total / 1024).toFixed(2), 'KB');
```

## 📱 Responsive Tests

### Mobile View (< 768px):
- [ ] Context switcher becomes dropdown
- [ ] Sticky notes stack properly
- [ ] Split view adjusts to vertical
- [ ] Quick switcher fits screen

### Test on Different Screens:
- [ ] 1920x1080 - Full desktop
- [ ] 1366x768 - Laptop
- [ ] 768x1024 - Tablet
- [ ] 375x667 - Mobile

## 🎨 Visual Regression

### Screenshot Comparisons:
1. Take screenshots of each feature
2. Compare with expected designs
3. Check for:
   - Proper shadows/borders
   - Consistent spacing
   - Color accuracy
   - Animation smoothness

## ✅ Final Checklist

- [ ] All automated tests pass
- [ ] No console errors during testing
- [ ] Features work in Chrome, Firefox, Safari
- [ ] Memory usage stable after 10 min use
- [ ] All features integrate properly
- [ ] Persistence works across refresh
- [ ] Performance remains smooth
- [ ] Accessibility (keyboard navigation works)

## 📝 Test Report Template

```markdown
## Test Results - [Date]

### Environment:
- Browser: [Chrome 120]
- OS: [Windows 11]
- Screen: [1920x1080]

### Features Tested:
1. Quick File Switcher: ✅/❌
2. Tab Pinning: ✅/❌
3. Session Management: ✅/❌
4. Tab Groups: ✅/❌
5. Split Tabs: ✅/❌
6. Theme Scheduling: ✅/❌
7. Sticky Notes: ✅/❌

### Issues Found:
- [Issue description and steps to reproduce]

### Performance Metrics:
- Initial load: [X]ms
- Search response: [X]ms
- Memory after 10min: [X]MB increase

### Overall Assessment:
[Summary of findings]
```