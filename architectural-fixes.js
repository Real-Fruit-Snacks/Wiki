// Architectural Fixes for Notes Wiki
// Apply these patches to fix deep-rooted issues

class ArchitecturalFixes {
    static applyAll() {
        console.log('🔧 Applying architectural fixes...');
        
        this.fixTabContentMemoryLeak();
        this.fixEventListenerLeaks();
        this.fixRaceConditions();
        this.fixStateDesync();
        this.addPerformanceOptimizations();
        this.addCleanupHandlers();
        
        console.log('✅ Architectural fixes applied');
    }
    
    // Fix 1: Tab Content Memory Management
    static fixTabContentMemoryLeak() {
        const app = window.notesWiki;
        if (!app) return;
        
        // Limit tab content cache to 10 most recent tabs
        const MAX_TAB_CONTENT_CACHE = 10;
        const originalStoreContent = app.storeTabContent?.bind(app);
        
        // Create LRU cache for tab contents
        app.tabContentLRU = [];
        
        app.storeTabContent = function(tabId, content) {
            // Remove from LRU if exists
            const index = this.tabContentLRU.indexOf(tabId);
            if (index > -1) {
                this.tabContentLRU.splice(index, 1);
            }
            
            // Add to front of LRU
            this.tabContentLRU.unshift(tabId);
            
            // Store content
            this.tabContents.set(tabId, content);
            
            // Evict old content if over limit
            while (this.tabContentLRU.length > MAX_TAB_CONTENT_CACHE) {
                const evictId = this.tabContentLRU.pop();
                this.tabContents.delete(evictId);
                console.log(`Evicted tab content cache for tab ${evictId}`);
            }
        };
        
        // Clear pending code blocks periodically
        setInterval(() => {
            if (app.pendingCodeBlocks && app.pendingCodeBlocks.size > 50) {
                app.pendingCodeBlocks.clear();
                console.log('Cleared pending code blocks cache');
            }
        }, 300000); // Every 5 minutes
        
        console.log('✅ Tab content memory leak fixed');
    }
    
    // Fix 2: Event Listener Management
    static fixEventListenerLeaks() {
        const app = window.notesWiki;
        if (!app) return;
        
        // Create centralized event manager
        app.eventManager = {
            listeners: new Map(),
            
            add(element, event, handler, options) {
                const key = `${element.id || 'anonymous'}_${event}`;
                
                // Remove existing listener if present
                this.remove(element, event);
                
                // Store reference
                this.listeners.set(key, { element, event, handler, options });
                
                // Add listener
                element.addEventListener(event, handler, options);
            },
            
            remove(element, event) {
                const key = `${element.id || 'anonymous'}_${event}`;
                const listener = this.listeners.get(key);
                
                if (listener) {
                    element.removeEventListener(listener.event, listener.handler, listener.options);
                    this.listeners.delete(key);
                }
            },
            
            removeAll() {
                this.listeners.forEach(listener => {
                    listener.element.removeEventListener(listener.event, listener.handler, listener.options);
                });
                this.listeners.clear();
            }
        };
        
        // Override renderAllTabs to clean up old listeners
        const originalRenderTabs = app.renderAllTabs.bind(app);
        app.renderAllTabs = function() {
            // Clean up tab event listeners before re-render
            const tabContainer = document.getElementById('tabs-container');
            if (tabContainer) {
                const oldTabs = tabContainer.querySelectorAll('.tab-element');
                oldTabs.forEach(tab => {
                    // Clone node to remove all event listeners
                    const newTab = tab.cloneNode(true);
                    tab.parentNode.replaceChild(newTab, tab);
                });
            }
            
            return originalRenderTabs();
        };
        
        console.log('✅ Event listener leaks fixed');
    }
    
    // Fix 3: Race Condition Prevention
    static fixRaceConditions() {
        const app = window.notesWiki;
        if (!app) return;
        
        // Add operation queue to prevent concurrent operations
        app.operationQueue = {
            queue: [],
            processing: false,
            
            async add(operation, name = 'operation') {
                return new Promise((resolve, reject) => {
                    this.queue.push({ operation, name, resolve, reject });
                    this.process();
                });
            },
            
            async process() {
                if (this.processing || this.queue.length === 0) return;
                
                this.processing = true;
                const { operation, name, resolve, reject } = this.queue.shift();
                
                try {
                    console.log(`Processing: ${name}`);
                    const result = await operation();
                    resolve(result);
                } catch (error) {
                    console.error(`Operation failed: ${name}`, error);
                    reject(error);
                } finally {
                    this.processing = false;
                    // Process next operation
                    setTimeout(() => this.process(), 10);
                }
            }
        };
        
        // Wrap async operations
        const originalLoadNote = app.loadNoteInTab?.bind(app) || app.loadNote?.bind(app);
        app.loadNoteInTab = function(path, tabId) {
            return app.operationQueue.add(
                () => originalLoadNote.call(this, path, tabId),
                `loadNote:${path}`
            );
        };
        
        // Add mutex for context switching
        app.contextSwitchMutex = false;
        const originalSetContext = app.setActiveContext?.bind(app);
        app.setActiveContext = async function(context) {
            if (this.contextSwitchMutex) {
                console.warn('Context switch already in progress');
                return;
            }
            
            this.contextSwitchMutex = true;
            try {
                await originalSetContext.call(this, context);
            } finally {
                this.contextSwitchMutex = false;
            }
        };
        
        console.log('✅ Race conditions fixed');
    }
    
    // Fix 4: State Synchronization
    static fixStateDesync() {
        const app = window.notesWiki;
        if (!app) return;
        
        // Create single source of truth for state
        app.state = new Proxy({
            focusMode: false,
            splitView: false,
            activeTabId: null,
            activePaneId: null,
            activeContext: null,
            theme: 'default'
        }, {
            set(target, property, value) {
                const oldValue = target[property];
                target[property] = value;
                
                // Emit state change event
                window.dispatchEvent(new CustomEvent('stateChange', {
                    detail: { property, oldValue, newValue: value }
                }));
                
                console.log(`State changed: ${property} = ${value}`);
                return true;
            }
        });
        
        // Subscribe to state changes
        window.addEventListener('stateChange', (e) => {
            const { property, newValue } = e.detail;
            
            // Sync UI with state
            switch (property) {
                case 'focusMode':
                    app.settings.focusMode = newValue;
                    app.updateFocusModeUI();
                    break;
                case 'splitView':
                    app.settings.splitViewEnabled = newValue;
                    app.updateSplitViewUI();
                    break;
                case 'theme':
                    app.settings.theme = newValue;
                    app.applyTheme(newValue);
                    break;
            }
        });
        
        console.log('✅ State desync fixed');
    }
    
    // Fix 5: Performance Optimizations
    static addPerformanceOptimizations() {
        const app = window.notesWiki;
        if (!app) return;
        
        // Debounce search with proper implementation
        app.searchDebounceTimer = null;
        const originalPerformSearch = app.performSearch?.bind(app);
        app.performSearch = function(query, append = false) {
            clearTimeout(this.searchDebounceTimer);
            
            // Immediate feedback for empty query
            if (!query) {
                return originalPerformSearch.call(this, query, append);
            }
            
            // Show loading state
            const searchResults = document.getElementById('search-results');
            if (searchResults && !append) {
                searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
            }
            
            // Debounce actual search
            this.searchDebounceTimer = setTimeout(() => {
                originalPerformSearch.call(this, query, append);
            }, 300);
        };
        
        // Virtual scroll for large lists
        app.enableVirtualScroll = function(container, items, renderItem) {
            const itemHeight = 40; // Approximate height
            const visibleItems = Math.ceil(container.clientHeight / itemHeight);
            const buffer = 5;
            
            let scrollTop = 0;
            let startIndex = 0;
            let endIndex = visibleItems + buffer;
            
            const render = () => {
                container.innerHTML = '';
                
                // Add spacer for items above
                const spacerTop = document.createElement('div');
                spacerTop.style.height = `${startIndex * itemHeight}px`;
                container.appendChild(spacerTop);
                
                // Render visible items
                for (let i = startIndex; i < Math.min(endIndex, items.length); i++) {
                    container.appendChild(renderItem(items[i], i));
                }
                
                // Add spacer for items below
                const spacerBottom = document.createElement('div');
                spacerBottom.style.height = `${(items.length - endIndex) * itemHeight}px`;
                container.appendChild(spacerBottom);
            };
            
            container.addEventListener('scroll', () => {
                scrollTop = container.scrollTop;
                startIndex = Math.floor(scrollTop / itemHeight) - buffer;
                startIndex = Math.max(0, startIndex);
                endIndex = startIndex + visibleItems + (buffer * 2);
                render();
            });
            
            render();
        };
        
        console.log('✅ Performance optimizations added');
    }
    
    // Fix 6: Comprehensive Cleanup
    static addCleanupHandlers() {
        const app = window.notesWiki;
        if (!app) return;
        
        // Enhanced cleanup on tab close
        const originalCloseTab = app.closeTab?.bind(app);
        app.closeTab = function(tabId) {
            // Clean up tab-specific resources
            this.tabContents.delete(tabId);
            
            // Clean up split pane listeners if split tab
            const tab = this.tabs.get(tabId);
            if (tab?.isSplitTab) {
                tab.splitConfig?.panes?.forEach(pane => {
                    const paneEl = document.getElementById(`pane-${pane.id}`);
                    if (paneEl) {
                        // Remove all event listeners
                        const newEl = paneEl.cloneNode(true);
                        paneEl.parentNode.replaceChild(newEl, paneEl);
                    }
                });
            }
            
            return originalCloseTab.call(this, tabId);
        };
        
        // Periodic garbage collection
        setInterval(() => {
            // Clean orphaned DOM nodes
            const orphanedNodes = document.querySelectorAll('.tab-element:not([data-tab-id])');
            orphanedNodes.forEach(node => node.remove());
            
            // Clean empty sticky note containers
            const emptyStickyContainers = document.querySelectorAll('.sticky-note-container:empty');
            emptyStickyContainers.forEach(node => node.remove());
            
            // Force garbage collection if available
            if (window.gc) {
                window.gc();
                console.log('Forced garbage collection');
            }
        }, 300000); // Every 5 minutes
        
        console.log('✅ Cleanup handlers added');
    }
}

// Apply fixes automatically
ArchitecturalFixes.applyAll();

// Export for manual use
window.ArchitecturalFixes = ArchitecturalFixes;