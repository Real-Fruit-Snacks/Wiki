# Sticky Notes Feature Test Checklist

## Save/Retrieve Workflow Tests

### 1. Initial Load Behavior
- [ ] Open the app fresh (no localStorage data)
- [ ] Create a new sticky note
- [ ] Add some content
- [ ] Refresh the page
- [ ] **Expected**: Note should appear on reload

### 2. Active/Archived State Management
- [ ] Create 3 sticky notes with different colors
- [ ] Close one note (it should be archived, not deleted)
- [ ] Open Sticky Notes Manager
- [ ] **Expected**: Should see 2 notes marked as "Active" and 1 as "Archived"

### 3. Filter Functionality
- [ ] In the Sticky Notes Manager, click "Active" filter
- [ ] **Expected**: Only see the 2 active notes
- [ ] Click "Archived" filter
- [ ] **Expected**: Only see the 1 archived note
- [ ] Click "All Notes" filter
- [ ] **Expected**: See all 3 notes

### 4. Restore Archived Notes
- [ ] While viewing archived notes, click the restore button on the archived note
- [ ] **Expected**: Note should reappear on the main screen
- [ ] Check the manager again
- [ ] **Expected**: All 3 notes should now show as "Active"

### 5. Session Persistence
- [ ] Arrange notes in specific positions
- [ ] Close the browser completely
- [ ] Reopen the app
- [ ] **Expected**: Active notes should appear in their saved positions

### 6. Bulk Operations
- [ ] Select multiple active notes in the manager
- [ ] Click "Archive Selected"
- [ ] **Expected**: Selected notes should disappear from screen and show as archived
- [ ] Select all archived notes
- [ ] Use restore functionality
- [ ] **Expected**: All notes should reappear on screen

## Visual Indicators Tests

### 7. Status Badges
- [ ] Open Sticky Notes Manager
- [ ] **Expected**: Each filter button shows a count badge
- [ ] **Expected**: Active notes have no special indicator
- [ ] **Expected**: Archived notes show "ARCHIVED" badge and have reduced opacity

### 8. Color Persistence
- [ ] Create notes with each available color
- [ ] Archive and restore them
- [ ] **Expected**: Colors should be preserved through all operations

## Edge Cases

### 9. Empty States
- [ ] Delete all notes permanently
- [ ] Open Sticky Notes Manager
- [ ] **Expected**: Should show appropriate empty state message
- [ ] Click "Create Note" from empty state
- [ ] **Expected**: Should create a new note and close manager

### 10. Large Number of Notes
- [ ] Create 20+ sticky notes
- [ ] Archive half of them
- [ ] Test filter performance
- [ ] **Expected**: Filters should work smoothly without lag

## Known Issues to Verify Fixed

### 11. Session Restoration Bug
- [ ] Clear localStorage completely
- [ ] Create 2 notes
- [ ] Refresh page WITHOUT closing notes first
- [ ] **Expected**: Notes should still appear (fallback working)

### 12. Manager Auto-Opening
- [ ] Refresh the page multiple times
- [ ] **Expected**: Sticky Notes Manager should NEVER open automatically

## Accessibility Tests

### 13. Keyboard Navigation
- [ ] Use Tab to navigate through sticky notes
- [ ] Use keyboard shortcuts to create/manage notes
- [ ] **Expected**: All functions accessible via keyboard

### 14. Screen Reader
- [ ] Test with screen reader enabled
- [ ] **Expected**: Status indicators and buttons properly announced

## Performance Tests

### 15. Auto-Save
- [ ] Type continuously in a sticky note
- [ ] Watch for save indicator
- [ ] **Expected**: Should see "Saving..." then "Saved" indicators
- [ ] Refresh page
- [ ] **Expected**: All typed content preserved

---

## Test Results Summary

- **Date Tested**: _______________
- **Tester**: _______________
- **Browser/Version**: _______________
- **Pass Rate**: _____ / 15
- **Critical Issues Found**: 

---

## Notes
- If any test fails, document the exact steps to reproduce
- Take screenshots of any visual issues
- Check browser console for any JavaScript errors