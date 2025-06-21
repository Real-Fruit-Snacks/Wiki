# Advanced Testing Guide - Post-Fix Implementation

## 🚀 Testing After Architectural Fixes

Now that you've implemented the initial fixes, here's how to verify the deeper architectural improvements:

## 1. Load the Monitoring Tools

```bash
# Start the app
npm run serve

# In browser console, load the tools:
# 1. Copy and paste performance-monitor.js
# 2. Copy and paste architectural-fixes.js (auto-applies fixes)
# 3. Copy and paste stress-test.js
```

## 2. Performance Monitoring Commands

```javascript
// Start monitoring before testing
perfMonitor.generateReport()  // Baseline metrics

// After 5-10 minutes of use:
perfMonitor.analyzeMemoryLeak()  // Check for leaks
perfMonitor.showMemoryGraph()    // Visualize memory usage
```

## 3. Run Stress Tests

```javascript
// Run comprehensive stress tests
const test = new StressTest();
await test.runAll();

// Run individual tests
await test.testRapidTabCreation();
await test.testMemoryUnderLoad();
await test.testSearchPerformance();
```

## 4. Critical Scenarios to Test Manually

### Scenario A: Memory Leak Detection
1. Note initial memory: `performance.memory.usedJSHeapSize / 1024 / 1024`
2. Create 30 tabs, load content in each
3. Create 20 sticky notes with content
4. Use app for 10 minutes normally
5. Close all tabs and sticky notes
6. Force GC: `window.gc()` (if available)
7. Check memory again - should return close to initial

### Scenario B: Race Condition Testing
```javascript
// Rapid operations
for (let i = 0; i < 10; i++) {
    notesWiki.createNewTab(`Test ${i}`);
    notesWiki.performSearch(`query ${i}`);
    notesWiki.setActiveContext(notesWiki.contexts[0]);
}
```

### Scenario C: Event Listener Leak
```javascript
// Check initial listeners
getEventListeners(document).click.length

// Perform actions that add/remove UI elements
for (let i = 0; i < 20; i++) {
    notesWiki.showQuickSwitcher();
    notesWiki.hideQuickSwitcher();
}

// Check again - should be similar count
getEventListeners(document).click.length
```

## 5. Performance Benchmarks

### Expected Performance Metrics:
- **Tab Creation**: < 50ms per tab
- **Search Response**: < 200ms for normal queries
- **Memory Growth**: < 1MB per tab
- **Event Listeners**: < 100 total on document
- **DOM Nodes**: < 5000 for normal use

### Red Flags:
- Memory growing > 50MB in 10 minutes
- Search taking > 500ms
- Event listeners > 500
- Tab operations > 100ms

## 6. Browser-Specific Testing

### Chrome DevTools:
1. **Performance Tab**: Record 30 seconds of heavy use
   - Look for long tasks (> 50ms)
   - Check for jank in animations
   - Verify 60fps during interactions

2. **Memory Tab**: Take heap snapshots
   - Before: Fresh load
   - During: After heavy use
   - After: After cleanup
   - Compare for retained objects

3. **Lighthouse**: Run audit
   - Performance score > 90
   - No accessibility issues
   - Best practices > 95

### Firefox Developer Tools:
1. **Memory Tool**: Check for detached nodes
2. **Performance Tool**: Look for reflows/repaints

## 7. Integration Testing Matrix

Test these feature combinations:

| Feature 1 | Feature 2 | Test Case |
|-----------|-----------|-----------|
| Quick Switcher | Split View | Open files in different panes |
| Tab Groups | Sessions | Save/restore grouped tabs |
| Theme Scheduling | Focus Mode | Theme changes during focus |
| Sticky Notes | Tab Switch | Notes persist across tabs |
| Search | Large Index | 5000+ notes performance |

## 8. Automated Regression Tests

Create this test suite to run after any changes:

```javascript
class RegressionTests {
    async runAll() {
        const tests = [
            this.testQuickSwitcherMemory,
            this.testTabLifecycle,
            this.testSessionPersistence,
            this.testThemeScheduling,
            this.testStickyNoteCleanup
        ];
        
        for (const test of tests) {
            try {
                await test.call(this);
                console.log(`✅ ${test.name} passed`);
            } catch (error) {
                console.error(`❌ ${test.name} failed:`, error);
            }
        }
    }
    
    async testQuickSwitcherMemory() {
        const before = performance.memory.usedJSHeapSize;
        
        // Open/close 50 times
        for (let i = 0; i < 50; i++) {
            notesWiki.showQuickSwitcher();
            notesWiki.hideQuickSwitcher();
        }
        
        const after = performance.memory.usedJSHeapSize;
        const leaked = (after - before) / 1024 / 1024;
        
        if (leaked > 5) {
            throw new Error(`Memory leak: ${leaked.toFixed(2)}MB`);
        }
    }
    
    // Add more regression tests...
}
```

## 9. Production Monitoring

Add this to your production build:

```javascript
// Track real-world performance
window.addEventListener('error', (e) => {
    console.error('Runtime error:', e.error);
    // Send to error tracking service
});

// Monitor performance metrics
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
                console.warn('Slow operation:', entry.name, entry.duration);
            }
        }
    });
    observer.observe({ entryTypes: ['measure'] });
}
```

## 10. Final Checklist

Before considering the fixes complete:

- [ ] All stress tests pass (> 90% score)
- [ ] Memory stable after 30 minutes use
- [ ] No console errors during normal use
- [ ] Performance metrics within targets
- [ ] All feature combinations work
- [ ] Browser compatibility verified
- [ ] Regression tests automated
- [ ] Production monitoring in place

## 🎯 Next Steps

1. **Refactoring**: Consider breaking the monolithic class into modules
2. **Testing**: Add Jest/Mocha unit tests
3. **CI/CD**: Add automated testing to build pipeline
4. **Monitoring**: Implement error tracking (Sentry, etc.)
5. **Documentation**: Update architecture docs with fixes

## 🚨 If Issues Persist

If you still see problems after all fixes:

1. Check browser extensions (ad blockers can interfere)
2. Test in incognito/private mode
3. Clear all localStorage: `localStorage.clear()`
4. Check for service workers: `navigator.serviceWorker.getRegistrations()`
5. Profile specific operations with Performance API
6. Use Chrome's Memory Profiler for deep analysis

Remember: The architectural fixes address the root causes, but some issues may require more extensive refactoring of the 9000+ line monolithic class structure.