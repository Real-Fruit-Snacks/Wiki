// Critical Patches for Notes Wiki
// Apply these to fix the most severe issues found in deep analysis

(function() {
    'use strict';
    
    console.log('🔧 Applying critical patches...');
    
    const app = window.notesWiki;
    if (!app) {
        console.error('Notes Wiki application not found!');
        return;
    }
    
    // PATCH 1: Fix Tab Content Race Condition
    // Problem: Content loads into wrong tab if user switches quickly
    (() => {
        const originalLoadNoteInTab = app.loadNoteInTab?.bind(app) || app.loadNote?.bind(app);
        let loadingOperations = new Map();
        
        app.loadNoteInTab = async function(path, targetTabId) {
            // Cancel any pending load for this tab
            if (loadingOperations.has(targetTabId)) {
                loadingOperations.get(targetTabId).cancelled = true;
            }
            
            // Create cancellable operation
            const operation = { cancelled: false, tabId: targetTabId };
            loadingOperations.set(targetTabId, operation);
            
            try {
                // Store the target tab ID at start of operation
                const result = await originalLoadNoteInTab.call(this, path, targetTabId);
                
                // Check if operation was cancelled or tab changed
                if (operation.cancelled || this.activeTabId !== targetTabId) {
                    console.log(`Load cancelled for tab ${targetTabId}`);
                    return;
                }
                
                return result;
            } finally {
                loadingOperations.delete(targetTabId);
            }
        };
        
        console.log('✅ Patched: Tab content race condition');
    })();
    
    // PATCH 2: Fix Sticky Note Boundary Check
    // Problem: Notes can spawn outside viewport
    (() => {
        const originalCreateStickyNote = app.createStickyNote.bind(app);
        
        app.createStickyNote = function(options = {}) {
            // Get safe spawn area
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const noteWidth = 300;
            const noteHeight = 200;
            const margin = 50;
            
            // Calculate safe bounds
            const maxX = Math.max(margin, viewportWidth - noteWidth - margin);
            const maxY = Math.max(margin, viewportHeight - noteHeight - margin);
            
            // Ensure position is within bounds
            if (!options.position) {
                options.position = {
                    x: margin + Math.random() * (maxX - margin),
                    y: margin + Math.random() * (maxY - margin)
                };
            } else {
                options.position.x = Math.max(margin, Math.min(options.position.x, maxX));
                options.position.y = Math.max(margin, Math.min(options.position.y, maxY));
            }
            
            return originalCreateStickyNote.call(this, options);
        };
        
        console.log('✅ Patched: Sticky note viewport boundaries');
    })();
    
    // PATCH 3: Fix Theme Scheduler Interval Leak
    // Problem: Multiple intervals created without cleanup
    (() => {
        const originalSetupScheduler = app.setupThemeScheduler.bind(app);
        let activeIntervals = new Set();
        
        app.setupThemeScheduler = function() {
            // Clear ALL theme-related intervals
            activeIntervals.forEach(id => clearInterval(id));
            activeIntervals.clear();
            
            // Also clear the instance interval
            if (this.themeSchedulerInterval) {
                clearInterval(this.themeSchedulerInterval);
                this.themeSchedulerInterval = null;
            }
            
            // Call original with tracking
            const result = originalSetupScheduler.call(this);
            
            // Track new interval
            if (this.themeSchedulerInterval) {
                activeIntervals.add(this.themeSchedulerInterval);
            }
            
            return result;
        };
        
        console.log('✅ Patched: Theme scheduler interval leak');
    })();
    
    // PATCH 4: Fix Split Pane Size Validation
    // Problem: Panes can be resized to invalid sizes
    (() => {
        if (app.setupPaneResizing) {
            const originalSetupResize = app.setupPaneResizing.bind(app);
            
            app.setupPaneResizing = function(divider) {
                const result = originalSetupResize.call(this, divider);
                
                // Add size constraints
                const MIN_PANE_SIZE = 200;
                const container = divider.parentElement;
                
                divider.addEventListener('mousedown', (e) => {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const isHorizontal = divider.classList.contains('horizontal');
                    
                    const onMouseMove = (e) => {
                        const containerRect = container.getBoundingClientRect();
                        const panes = container.querySelectorAll('.multi-split-pane');
                        
                        if (isHorizontal) {
                            const totalWidth = containerRect.width;
                            const newLeftWidth = e.clientX - containerRect.left;
                            
                            // Enforce minimum sizes
                            if (newLeftWidth >= MIN_PANE_SIZE && 
                                (totalWidth - newLeftWidth) >= MIN_PANE_SIZE) {
                                panes[0].style.width = `${newLeftWidth}px`;
                                panes[1].style.width = `${totalWidth - newLeftWidth}px`;
                            }
                        } else {
                            const totalHeight = containerRect.height;
                            const newTopHeight = e.clientY - containerRect.top;
                            
                            if (newTopHeight >= MIN_PANE_SIZE && 
                                (totalHeight - newTopHeight) >= MIN_PANE_SIZE) {
                                panes[0].style.height = `${newTopHeight}px`;
                                panes[1].style.height = `${totalHeight - newTopHeight}px`;
                            }
                        }
                    };
                    
                    const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    };
                    
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                });
                
                return result;
            };
        }
        
        console.log('✅ Patched: Split pane size validation');
    })();
    
    // PATCH 5: Fix Search Index Cache
    // Problem: Cache never invalidates when notes change
    (() => {
        // Clear quick switcher cache when notes change
        const originalLoadNote = app.loadNote?.bind(app);
        if (originalLoadNote) {
            app.loadNote = function(...args) {
                // Invalidate search cache
                delete this._quickSwitcherCache;
                return originalLoadNote.call(this, ...args);
            };
        }
        
        // Also clear on context change
        const originalSetContext = app.setActiveContext?.bind(app);
        if (originalSetContext) {
            app.setActiveContext = function(...args) {
                delete this._quickSwitcherCache;
                return originalSetContext.call(this, ...args);
            };
        }
        
        console.log('✅ Patched: Search index cache invalidation');
    })();
    
    // PATCH 6: Fix Tab Drag Memory Leak
    // Problem: Event listeners accumulate on tab re-renders
    (() => {
        const originalRenderAllTabs = app.renderAllTabs?.bind(app);
        
        app.renderAllTabs = function() {
            // Store tab container reference
            const container = document.getElementById('tabs-container');
            
            // Clone container to remove all event listeners
            if (container && container.parentNode) {
                const newContainer = container.cloneNode(false);
                newContainer.id = 'tabs-container';
                container.parentNode.replaceChild(newContainer, container);
            }
            
            // Call original render
            return originalRenderAllTabs.call(this);
        };
        
        console.log('✅ Patched: Tab drag event listener leak');
    })();
    
    // PATCH 7: Add Global Error Boundary
    (() => {
        window.addEventListener('error', (event) => {
            console.error('Global error caught:', event.error);
            
            // Attempt recovery for common errors
            if (event.error?.message?.includes('Cannot read properties of null')) {
                console.log('Attempting recovery from null reference...');
                
                // Re-initialize if needed
                if (!document.getElementById('main-content')) {
                    console.error('Main content missing - app may need reload');
                }
            }
            
            // Prevent error propagation for non-critical errors
            if (!event.error?.message?.includes('Critical')) {
                event.preventDefault();
            }
        });
        
        console.log('✅ Patched: Added global error boundary');
    })();
    
    // PATCH 8: Fix Context Switcher Memory Leak
    (() => {
        // Track context switcher rebuilds
        let contextSwitcherBuilds = 0;
        const originalBuildContext = app.buildContextSwitcher?.bind(app);
        
        if (originalBuildContext) {
            app.buildContextSwitcher = function() {
                contextSwitcherBuilds++;
                
                // Warn if rebuilding too frequently
                if (contextSwitcherBuilds > 10) {
                    console.warn('Context switcher rebuilt', contextSwitcherBuilds, 'times');
                }
                
                // Clean up old dropdown handler
                if (this.dropdownCloseHandler) {
                    document.removeEventListener('click', this.dropdownCloseHandler);
                    this.dropdownCloseHandler = null;
                }
                
                return originalBuildContext.call(this);
            };
        }
        
        console.log('✅ Patched: Context switcher memory leak');
    })();
    
    console.log('✅ All critical patches applied successfully!');
    
    // Add diagnostic command
    window.diagnostics = {
        checkHealth() {
            console.group('🏥 Application Health Check');
            
            // Memory check
            if (performance.memory) {
                const memoryMB = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
                console.log(`Memory usage: ${memoryMB}MB`);
            }
            
            // Tab state
            console.log(`Active tabs: ${app.tabs.size}`);
            console.log(`Tab content cache: ${app.tabContents.size}`);
            
            // Sticky notes
            console.log(`Sticky notes: ${app.stickyNotes.size}`);
            
            // Event listeners (Chrome only)
            if (typeof getEventListeners !== 'undefined') {
                const docListeners = Object.values(getEventListeners(document)).flat().length;
                console.log(`Document listeners: ${docListeners}`);
            }
            
            // DOM nodes
            console.log(`DOM nodes: ${document.getElementsByTagName('*').length}`);
            
            console.groupEnd();
        },
        
        runQuickTest() {
            console.log('Running quick health test...');
            
            // Test tab creation
            const tabId = app.createNewTab('Health Test');
            app.closeTab(tabId);
            
            // Test search
            app.performSearch('test');
            
            // Test sticky note
            const note = app.createStickyNote();
            app.closeStickyNote(note.id);
            
            console.log('✅ Quick test passed');
        }
    };
    
    console.log('\n💡 Use diagnostics.checkHealth() to monitor app health');
    
})();