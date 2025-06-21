// Performance Monitoring Tool for Notes Wiki
// Tracks memory usage, event listeners, and performance metrics

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            startTime: Date.now(),
            initialMemory: performance.memory?.usedJSHeapSize || 0,
            eventListenerCounts: new Map(),
            tabOperations: [],
            searchOperations: [],
            memorySnapshots: [],
            leakedElements: new WeakSet()
        };
        
        this.startMonitoring();
    }
    
    startMonitoring() {
        // Take memory snapshots every 30 seconds
        this.memoryInterval = setInterval(() => {
            this.takeMemorySnapshot();
        }, 30000);
        
        // Monitor event listeners
        this.monitorEventListeners();
        
        // Override critical methods to track operations
        this.instrumentMethods();
        
        console.log('🔍 Performance monitoring started');
    }
    
    takeMemorySnapshot() {
        if (!performance.memory) return;
        
        const snapshot = {
            timestamp: Date.now(),
            heapSize: performance.memory.usedJSHeapSize,
            heapLimit: performance.memory.jsHeapSizeLimit,
            tabCount: notesWiki.tabs.size,
            stickyNoteCount: notesWiki.stickyNotes.size,
            tabContentSize: notesWiki.tabContents.size,
            eventListenerCount: this.countAllEventListeners()
        };
        
        this.metrics.memorySnapshots.push(snapshot);
        
        // Detect memory leaks
        if (this.metrics.memorySnapshots.length > 2) {
            const growth = snapshot.heapSize - this.metrics.initialMemory;
            const growthMB = (growth / 1024 / 1024).toFixed(2);
            
            if (growth > 50 * 1024 * 1024) { // 50MB growth
                console.warn(`⚠️ Memory growth detected: ${growthMB}MB`);
                this.analyzeMemoryLeak();
            }
        }
    }
    
    monitorEventListeners() {
        // Track event listeners on key elements
        const elements = [
            { name: 'document', element: document },
            { name: 'window', element: window },
            { name: 'main-content', element: document.getElementById('main-content') },
            { name: 'tabs-container', element: document.getElementById('tabs-container') }
        ];
        
        elements.forEach(({ name, element }) => {
            if (!element) return;
            
            // Use Chrome DevTools API if available
            if (typeof getEventListeners !== 'undefined') {
                const listeners = getEventListeners(element);
                const count = Object.values(listeners).flat().length;
                this.metrics.eventListenerCounts.set(name, count);
            }
        });
    }
    
    instrumentMethods() {
        const app = window.notesWiki;
        if (!app) return;
        
        // Track tab operations
        const originalCreateTab = app.createNewTab.bind(app);
        app.createNewTab = (...args) => {
            const start = performance.now();
            const result = originalCreateTab(...args);
            const duration = performance.now() - start;
            
            this.metrics.tabOperations.push({
                type: 'create',
                timestamp: Date.now(),
                duration,
                tabCount: app.tabs.size
            });
            
            if (duration > 100) {
                console.warn(`⚠️ Slow tab creation: ${duration.toFixed(2)}ms`);
            }
            
            return result;
        };
        
        // Track search operations
        const originalSearch = app.performSearch.bind(app);
        app.performSearch = (...args) => {
            const start = performance.now();
            const result = originalSearch(...args);
            const duration = performance.now() - start;
            
            this.metrics.searchOperations.push({
                query: args[0],
                timestamp: Date.now(),
                duration,
                resultCount: result?.length || 0
            });
            
            if (duration > 200) {
                console.warn(`⚠️ Slow search: ${duration.toFixed(2)}ms for query "${args[0]}"`);
            }
            
            return result;
        };
    }
    
    analyzeMemoryLeak() {
        console.group('🔍 Memory Leak Analysis');
        
        // Check tab content accumulation
        const tabContentSize = this.estimateMapSize(notesWiki.tabContents);
        console.log(`Tab content cache: ${(tabContentSize / 1024 / 1024).toFixed(2)}MB for ${notesWiki.tabContents.size} tabs`);
        
        // Check sticky note accumulation
        console.log(`Sticky notes: ${notesWiki.stickyNotes.size} active`);
        
        // Check event listener growth
        this.monitorEventListeners();
        console.log('Event listeners:', Object.fromEntries(this.metrics.eventListenerCounts));
        
        // Check DOM node count
        const nodeCount = document.getElementsByTagName('*').length;
        console.log(`DOM nodes: ${nodeCount}`);
        
        // Find detached DOM nodes
        this.findDetachedNodes();
        
        console.groupEnd();
    }
    
    findDetachedNodes() {
        // Look for common leak patterns
        const selectors = [
            '.tab-element',
            '.sticky-note',
            '.quick-switcher-item',
            '.search-result-item',
            '.context-menu'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            const orphaned = Array.from(elements).filter(el => !document.body.contains(el));
            if (orphaned.length > 0) {
                console.warn(`Found ${orphaned.length} detached ${selector} elements`);
            }
        });
    }
    
    estimateMapSize(map) {
        let totalSize = 0;
        map.forEach(value => {
            if (typeof value === 'string') {
                totalSize += value.length * 2; // 2 bytes per char
            } else {
                totalSize += JSON.stringify(value).length * 2;
            }
        });
        return totalSize;
    }
    
    countAllEventListeners() {
        let total = 0;
        if (typeof getEventListeners !== 'undefined') {
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const listeners = getEventListeners(el);
                total += Object.values(listeners).flat().length;
            });
        }
        return total;
    }
    
    generateReport() {
        console.group('📊 Performance Report');
        
        const runtime = ((Date.now() - this.metrics.startTime) / 1000 / 60).toFixed(2);
        console.log(`Runtime: ${runtime} minutes`);
        
        // Memory analysis
        if (this.metrics.memorySnapshots.length > 0) {
            const latest = this.metrics.memorySnapshots[this.metrics.memorySnapshots.length - 1];
            const initial = this.metrics.memorySnapshots[0];
            const growth = ((latest.heapSize - initial.heapSize) / 1024 / 1024).toFixed(2);
            
            console.log(`Memory growth: ${growth}MB`);
            console.log(`Current heap: ${(latest.heapSize / 1024 / 1024).toFixed(2)}MB`);
            console.log(`Tab count: ${latest.tabCount}`);
            console.log(`Tab content cache: ${latest.tabContentSize} items`);
        }
        
        // Performance analysis
        if (this.metrics.tabOperations.length > 0) {
            const avgTabTime = this.metrics.tabOperations.reduce((sum, op) => sum + op.duration, 0) / this.metrics.tabOperations.length;
            console.log(`Average tab creation: ${avgTabTime.toFixed(2)}ms`);
        }
        
        if (this.metrics.searchOperations.length > 0) {
            const avgSearchTime = this.metrics.searchOperations.reduce((sum, op) => sum + op.duration, 0) / this.metrics.searchOperations.length;
            console.log(`Average search time: ${avgSearchTime.toFixed(2)}ms`);
        }
        
        // Show memory graph
        this.showMemoryGraph();
        
        console.groupEnd();
    }
    
    showMemoryGraph() {
        if (this.metrics.memorySnapshots.length < 2) return;
        
        console.log('\n📈 Memory Usage Over Time:');
        const maxMemory = Math.max(...this.metrics.memorySnapshots.map(s => s.heapSize));
        const scale = 50 / (maxMemory / 1024 / 1024); // 50 chars width
        
        this.metrics.memorySnapshots.forEach((snapshot, i) => {
            const memoryMB = snapshot.heapSize / 1024 / 1024;
            const bars = Math.round(memoryMB * scale);
            const time = new Date(snapshot.timestamp).toLocaleTimeString();
            console.log(`${time} |${'█'.repeat(bars)} ${memoryMB.toFixed(1)}MB`);
        });
    }
    
    stop() {
        clearInterval(this.memoryInterval);
        console.log('🛑 Performance monitoring stopped');
        this.generateReport();
    }
}

// Auto-start monitoring
const perfMonitor = new PerformanceMonitor();

// Commands for console
console.log(`
🔧 Performance Monitor Commands:
- perfMonitor.generateReport() - Show current stats
- perfMonitor.analyzeMemoryLeak() - Check for leaks
- perfMonitor.stop() - Stop monitoring
`);

// Export for global access
window.perfMonitor = perfMonitor;