// Complete Test Suite for Notes Wiki
// This runs ALL tests in the correct order and generates a comprehensive report

class CompleteTestSuite {
    constructor() {
        this.report = {
            timestamp: new Date().toISOString(),
            environment: {
                browser: navigator.userAgent,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                memory: performance.memory ? 'Available' : 'Not available',
                platform: navigator.platform
            },
            results: {
                basic: {},
                performance: {},
                stress: {},
                visual: {},
                integration: {}
            },
            metrics: {},
            issues: [],
            summary: {}
        };
    }
    
    async runCompleteTestSuite() {
        console.clear();
        console.log('🚀 COMPLETE TEST SUITE FOR NOTES WIKI');
        console.log('=====================================\n');
        
        try {
            // 1. Environment Setup
            await this.setupEnvironment();
            
            // 2. Basic Feature Tests
            await this.runBasicFeatureTests();
            
            // 3. Performance Baseline
            await this.establishPerformanceBaseline();
            
            // 4. Stress Tests
            await this.runStressTests();
            
            // 5. Memory Analysis
            await this.runMemoryAnalysis();
            
            // 6. Integration Tests
            await this.runIntegrationTests();
            
            // 7. Visual Regression Tests
            await this.runVisualTests();
            
            // 8. Cleanup & Final Analysis
            await this.runCleanupTests();
            
            // 9. Generate Report
            this.generateCompleteReport();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            this.report.criticalError = error.message;
        }
    }
    
    async setupEnvironment() {
        console.log('📋 1. ENVIRONMENT SETUP\n');
        
        // Clear any existing data
        console.log('Clearing localStorage...');
        const keysToPreserve = ['notesWiki_theme']; // Preserve theme preference
        const allKeys = Object.keys(localStorage);
        allKeys.forEach(key => {
            if (!keysToPreserve.includes(key)) {
                localStorage.removeItem(key);
            }
        });
        
        // Reset application state
        console.log('Resetting application state...');
        notesWiki.closeAllTabs();
        notesWiki.stickyNotes.forEach((note, id) => notesWiki.closeStickyNote(id));
        
        // Record initial state
        this.report.metrics.initialMemory = performance.memory?.usedJSHeapSize || 0;
        this.report.metrics.initialDOMNodes = document.getElementsByTagName('*').length;
        
        console.log('✅ Environment ready\n');
        await this.wait(1000);
    }
    
    async runBasicFeatureTests() {
        console.log('🧪 2. BASIC FEATURE TESTS\n');
        
        const features = [
            { name: 'Quick File Switcher', test: this.testQuickFileSwitcher },
            { name: 'Tab Pinning', test: this.testTabPinning },
            { name: 'Session Management', test: this.testSessionManagement },
            { name: 'Tab Groups', test: this.testTabGroups },
            { name: 'Split Tabs', test: this.testSplitTabs },
            { name: 'Theme Scheduling', test: this.testThemeScheduling },
            { name: 'Sticky Notes', test: this.testStickyNotes }
        ];
        
        for (const feature of features) {
            console.log(`Testing ${feature.name}...`);
            try {
                const result = await feature.test.call(this);
                this.report.results.basic[feature.name] = {
                    passed: result.passed,
                    details: result.details,
                    metrics: result.metrics
                };
                console.log(result.passed ? '✅ Passed' : '❌ Failed');
                if (!result.passed) {
                    console.log(`   Details: ${result.details}`);
                }
            } catch (error) {
                this.report.results.basic[feature.name] = {
                    passed: false,
                    details: error.message
                };
                console.log('❌ Error:', error.message);
            }
        }
        
        console.log('\n');
    }
    
    async testQuickFileSwitcher() {
        const startTime = performance.now();
        
        // Test opening
        notesWiki.showQuickSwitcher();
        await this.wait(100);
        
        const modal = document.getElementById('quick-switcher-modal');
        const input = document.getElementById('quick-switcher-input');
        
        if (!modal || modal.style.display !== 'flex') {
            return { passed: false, details: 'Modal not visible' };
        }
        
        // Test search
        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        await this.wait(200); // Wait for debounce
        
        const results = document.querySelectorAll('.quick-switcher-item');
        const searchTime = performance.now() - startTime;
        
        // Test keyboard navigation
        const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        document.dispatchEvent(downEvent);
        
        const selected = document.querySelector('.quick-switcher-item.selected');
        
        // Close
        notesWiki.hideQuickSwitcher();
        
        return {
            passed: results.length > 0 && selected !== null,
            details: `Found ${results.length} results, navigation ${selected ? 'works' : 'fails'}`,
            metrics: { searchTime, resultCount: results.length }
        };
    }
    
    async testTabPinning() {
        // Create test tab
        const tabId = notesWiki.createNewTab('Pin Test');
        await this.wait(100);
        
        // Pin tab
        notesWiki.toggleTabPin(tabId);
        const tab = notesWiki.tabs.get(tabId);
        const isPinned = tab?.isPinned;
        
        // Check visual
        const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
        const hasPinnedClass = tabElement?.classList.contains('pinned');
        
        // Test persistence
        notesWiki.saveTabState();
        const saved = localStorage.getItem('notesWiki_tabState');
        const hasPersistedPin = saved?.includes('"isPinned":true');
        
        // Cleanup
        notesWiki.closeTab(tabId);
        
        return {
            passed: isPinned && hasPinnedClass && hasPersistedPin,
            details: `Pin: ${isPinned}, Visual: ${hasPinnedClass}, Saved: ${hasPersistedPin}`,
            metrics: { pinToggleTime: performance.now() }
        };
    }
    
    async testSessionManagement() {
        // Create session
        const sessionName = 'TestSession' + Date.now();
        const created = notesWiki.createTabSession(sessionName);
        
        // Add tabs to session
        const tab1 = notesWiki.createNewTab('Session Tab 1');
        const tab2 = notesWiki.createNewTab('Session Tab 2');
        await this.wait(100);
        
        // Save session
        notesWiki.saveCurrentSessionState();
        
        // Switch to new session
        notesWiki.createTabSession('TempSession');
        await this.wait(100);
        
        // Return to original
        const sessionKey = sessionName.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
        notesWiki.switchToSession(sessionKey);
        await this.wait(100);
        
        // Check restoration
        const restoredCorrectly = notesWiki.tabs.size >= 2;
        
        // Cleanup
        notesWiki.deleteTabSession(sessionKey);
        notesWiki.deleteTabSession('tempsession');
        
        return {
            passed: created && restoredCorrectly,
            details: `Created: ${created}, Restored: ${restoredCorrectly}`,
            metrics: { sessionCount: Object.keys(notesWiki.tabSessions).length }
        };
    }
    
    async testTabGroups() {
        // Create group
        const groupId = notesWiki.createTabGroup('Test Group', 'blue');
        const group = notesWiki.tabGroups.get(groupId);
        
        // Add tabs
        const tab1 = notesWiki.createNewTab('Group Tab 1');
        const tab2 = notesWiki.createNewTab('Group Tab 2');
        
        notesWiki.tabs.get(tab1).groupId = groupId;
        notesWiki.tabs.get(tab2).groupId = groupId;
        notesWiki.renderAllTabs();
        await this.wait(100);
        
        // Check visual
        const groupHeader = document.querySelector('.tab-group-header');
        const groupedTabs = document.querySelectorAll(`[data-group-id="${groupId}"]`);
        
        // Cleanup
        notesWiki.deleteTabGroup(groupId);
        
        return {
            passed: group && groupHeader && groupedTabs.length >= 2,
            details: `Group created: ${!!group}, Header: ${!!groupHeader}, Tabs: ${groupedTabs.length}`,
            metrics: { groupCount: notesWiki.tabGroups.size }
        };
    }
    
    async testSplitTabs() {
        // Create split tab
        const tabId = notesWiki.createSplitTab('Split Test', 'horizontal');
        const tab = notesWiki.tabs.get(tabId);
        await this.wait(200);
        
        // Check structure
        const splitContainer = document.querySelector('.multi-split-container');
        const panes = document.querySelectorAll('.multi-split-pane');
        const divider = document.querySelector('.multi-pane-divider');
        
        // Test adding pane
        if (notesWiki.addPaneToCurrentTab) {
            notesWiki.addPaneToCurrentTab();
            await this.wait(100);
        }
        
        const panesAfter = document.querySelectorAll('.multi-split-pane');
        
        // Cleanup
        notesWiki.closeTab(tabId);
        
        return {
            passed: tab?.isSplitTab && panes.length >= 2 && divider,
            details: `Split: ${tab?.isSplitTab}, Panes: ${panes.length}→${panesAfter.length}, Divider: ${!!divider}`,
            metrics: { paneCount: panesAfter.length }
        };
    }
    
    async testThemeScheduling() {
        // Enable scheduling
        const originalEnabled = notesWiki.settings.scheduleEnabled;
        notesWiki.settings.scheduleEnabled = true;
        notesWiki.settings.scheduleMode = 'manual';
        notesWiki.settings.morningTheme = 'light';
        notesWiki.settings.eveningTheme = 'dark';
        
        // Setup scheduler
        notesWiki.setupThemeScheduler();
        const hasInterval = notesWiki.themeSchedulerInterval !== null;
        
        // Test blue light filter
        notesWiki.settings.blueLight.enabled = true;
        notesWiki.applyBlueLight(50);
        const filterApplied = document.documentElement.style.filter !== '';
        
        // Cleanup
        notesWiki.removeBlueLight();
        notesWiki.settings.scheduleEnabled = originalEnabled;
        notesWiki.setupThemeScheduler();
        
        return {
            passed: hasInterval && filterApplied,
            details: `Scheduler: ${hasInterval}, Blue light: ${filterApplied}`,
            metrics: { schedulerActive: hasInterval }
        };
    }
    
    async testStickyNotes() {
        // Create note
        const note = notesWiki.createStickyNote();
        await this.wait(100);
        
        const noteElement = document.getElementById(note.id);
        const hasElement = noteElement !== null;
        
        // Update content
        const testContent = 'Test content ' + Date.now();
        notesWiki.updateStickyContent(note.id, testContent);
        await this.wait(1100); // Wait for auto-save
        
        const savedContent = notesWiki.stickyNotes.get(note.id)?.content;
        const contentMatches = savedContent === testContent;
        
        // Test z-index
        const zIndex1 = noteElement?.style.zIndex;
        const note2 = notesWiki.createStickyNote();
        const zIndex2 = document.getElementById(note2.id)?.style.zIndex;
        const zIndexIncreases = parseInt(zIndex2) > parseInt(zIndex1);
        
        // Cleanup
        notesWiki.closeStickyNote(note.id);
        notesWiki.closeStickyNote(note2.id);
        
        return {
            passed: hasElement && contentMatches && zIndexIncreases,
            details: `Element: ${hasElement}, Content saved: ${contentMatches}, Z-index: ${zIndexIncreases}`,
            metrics: { autoSaveTime: 1000 }
        };
    }
    
    async establishPerformanceBaseline() {
        console.log('📊 3. PERFORMANCE BASELINE\n');
        
        const metrics = {
            tabCreation: [],
            search: [],
            noteLoading: []
        };
        
        // Tab creation speed
        console.log('Testing tab creation speed...');
        for (let i = 0; i < 10; i++) {
            const start = performance.now();
            const tabId = notesWiki.createNewTab(`Perf Test ${i}`);
            metrics.tabCreation.push(performance.now() - start);
            notesWiki.closeTab(tabId);
        }
        
        // Search speed
        console.log('Testing search performance...');
        const queries = ['test', 'note', 'demo', 'guide', 'feature'];
        for (const query of queries) {
            const start = performance.now();
            notesWiki.performSearch(query);
            metrics.search.push(performance.now() - start);
            await this.wait(100);
        }
        
        // Calculate averages
        this.report.metrics.avgTabCreation = metrics.tabCreation.reduce((a, b) => a + b, 0) / metrics.tabCreation.length;
        this.report.metrics.avgSearch = metrics.search.reduce((a, b) => a + b, 0) / metrics.search.length;
        
        console.log(`Average tab creation: ${this.report.metrics.avgTabCreation.toFixed(2)}ms`);
        console.log(`Average search time: ${this.report.metrics.avgSearch.toFixed(2)}ms`);
        console.log('\n');
    }
    
    async runStressTests() {
        console.log('💪 4. STRESS TESTS\n');
        
        // Heavy load test
        console.log('Creating heavy load...');
        const stressMetrics = {
            startMemory: performance.memory?.usedJSHeapSize || 0,
            startTime: performance.now()
        };
        
        // Create many tabs
        const tabIds = [];
        for (let i = 0; i < 30; i++) {
            tabIds.push(notesWiki.createNewTab(`Stress Tab ${i}`));
        }
        
        // Create sticky notes
        const noteIds = [];
        for (let i = 0; i < 20; i++) {
            const note = notesWiki.createStickyNote();
            noteIds.push(note.id);
        }
        
        // Perform searches
        for (let i = 0; i < 20; i++) {
            notesWiki.performSearch(`query${i}`);
            await this.wait(50);
        }
        
        stressMetrics.endTime = performance.now();
        stressMetrics.endMemory = performance.memory?.usedJSHeapSize || 0;
        stressMetrics.duration = stressMetrics.endTime - stressMetrics.startTime;
        stressMetrics.memoryGrowth = (stressMetrics.endMemory - stressMetrics.startMemory) / 1024 / 1024;
        
        // Cleanup
        console.log('Cleaning up stress test...');
        tabIds.forEach(id => notesWiki.closeTab(id));
        noteIds.forEach(id => notesWiki.closeStickyNote(id));
        
        this.report.results.stress = {
            passed: stressMetrics.memoryGrowth < 100 && stressMetrics.duration < 10000,
            metrics: stressMetrics
        };
        
        console.log(`Duration: ${stressMetrics.duration.toFixed(2)}ms`);
        console.log(`Memory growth: ${stressMetrics.memoryGrowth.toFixed(2)}MB`);
        console.log('\n');
    }
    
    async runMemoryAnalysis() {
        console.log('🧠 5. MEMORY ANALYSIS\n');
        
        if (!performance.memory) {
            console.log('Memory API not available in this browser');
            this.report.results.performance.memory = { passed: false, details: 'Memory API not available' };
            return;
        }
        
        const analysis = {
            beforeGC: performance.memory.usedJSHeapSize,
            tabContentCache: notesWiki.tabContents.size,
            stickyNotes: notesWiki.stickyNotes.size,
            eventListeners: this.countEventListeners()
        };
        
        // Force garbage collection if available
        if (window.gc) {
            console.log('Running garbage collection...');
            window.gc();
            await this.wait(1000);
            analysis.afterGC = performance.memory.usedJSHeapSize;
            analysis.collected = (analysis.beforeGC - analysis.afterGC) / 1024 / 1024;
        }
        
        // Check for leaks
        const currentMemory = performance.memory.usedJSHeapSize;
        const totalGrowth = (currentMemory - this.report.metrics.initialMemory) / 1024 / 1024;
        
        this.report.results.performance.memory = {
            passed: totalGrowth < 50,
            details: `Total growth: ${totalGrowth.toFixed(2)}MB`,
            metrics: analysis
        };
        
        console.log(`Memory growth since start: ${totalGrowth.toFixed(2)}MB`);
        console.log(`Tab content cache: ${analysis.tabContentCache} items`);
        console.log(`Event listeners: ${analysis.eventListeners}`);
        console.log('\n');
    }
    
    async runIntegrationTests() {
        console.log('🔗 6. INTEGRATION TESTS\n');
        
        const integrationTests = [
            {
                name: 'Quick Switcher + Split View',
                test: async () => {
                    const splitTab = notesWiki.createSplitTab('Integration Test', 'horizontal');
                    notesWiki.showQuickSwitcher();
                    await this.wait(100);
                    notesWiki.hideQuickSwitcher();
                    const stillWorks = notesWiki.tabs.get(splitTab)?.isSplitTab;
                    notesWiki.closeTab(splitTab);
                    return stillWorks;
                }
            },
            {
                name: 'Groups + Sessions',
                test: async () => {
                    const groupId = notesWiki.createTabGroup('Integration Group', 'green');
                    const tab = notesWiki.createNewTab('Grouped Tab');
                    notesWiki.tabs.get(tab).groupId = groupId;
                    notesWiki.createTabSession('IntegrationSession');
                    notesWiki.saveCurrentSessionState();
                    const saved = notesWiki.tabSessions['integrationsession']?.tabs?.length > 0;
                    notesWiki.deleteTabSession('integrationsession');
                    notesWiki.deleteTabGroup(groupId);
                    return saved;
                }
            },
            {
                name: 'Theme Change + Sticky Notes',
                test: async () => {
                    const note = notesWiki.createStickyNote();
                    const originalTheme = notesWiki.settings.theme;
                    notesWiki.applyTheme('dark');
                    await this.wait(100);
                    const noteStillExists = document.getElementById(note.id) !== null;
                    notesWiki.applyTheme(originalTheme);
                    notesWiki.closeStickyNote(note.id);
                    return noteStillExists;
                }
            }
        ];
        
        for (const test of integrationTests) {
            console.log(`Testing ${test.name}...`);
            try {
                const passed = await test.test();
                this.report.results.integration[test.name] = { passed, details: passed ? 'Works correctly' : 'Integration failed' };
                console.log(passed ? '✅ Passed' : '❌ Failed');
            } catch (error) {
                this.report.results.integration[test.name] = { passed: false, details: error.message };
                console.log('❌ Error:', error.message);
            }
        }
        
        console.log('\n');
    }
    
    async runVisualTests() {
        console.log('👁️ 7. VISUAL TESTS\n');
        
        const visualChecks = [
            {
                name: 'Tab Bar Rendering',
                selector: '#tabs-container',
                checks: ['visible', 'hasChildren', 'noOverflow']
            },
            {
                name: 'Search Modal',
                setup: () => notesWiki.showSearch(),
                selector: '.search-modal',
                checks: ['visible', 'centered', 'hasInput'],
                cleanup: () => notesWiki.hideSearch()
            },
            {
                name: 'Settings Modal',
                setup: () => notesWiki.showSettings(),
                selector: '.settings-modal',
                checks: ['visible', 'scrollable', 'hasContent'],
                cleanup: () => notesWiki.hideSettings()
            }
        ];
        
        for (const check of visualChecks) {
            console.log(`Checking ${check.name}...`);
            
            if (check.setup) check.setup();
            await this.wait(100);
            
            const element = document.querySelector(check.selector);
            const results = {
                visible: element && window.getComputedStyle(element).display !== 'none',
                hasChildren: element?.children.length > 0,
                noOverflow: element ? element.scrollHeight <= element.clientHeight + 10 : false,
                centered: element ? this.isElementCentered(element) : false,
                hasInput: element?.querySelector('input') !== null,
                scrollable: element ? element.scrollHeight > element.clientHeight : false,
                hasContent: element?.textContent.trim().length > 0
            };
            
            const relevantChecks = check.checks.map(c => results[c]).filter(r => r !== undefined);
            const passed = relevantChecks.every(r => r);
            
            this.report.results.visual[check.name] = {
                passed,
                details: check.checks.map(c => `${c}: ${results[c]}`).join(', ')
            };
            
            if (check.cleanup) check.cleanup();
            console.log(passed ? '✅ Passed' : '❌ Failed');
        }
        
        console.log('\n');
    }
    
    async runCleanupTests() {
        console.log('🧹 8. CLEANUP TESTS\n');
        
        // Create resources
        const resources = {
            tabs: [],
            notes: [],
            groups: []
        };
        
        // Create 10 of each
        for (let i = 0; i < 10; i++) {
            resources.tabs.push(notesWiki.createNewTab(`Cleanup Tab ${i}`));
            resources.notes.push(notesWiki.createStickyNote().id);
            resources.groups.push(notesWiki.createTabGroup(`Cleanup Group ${i}`, 'blue'));
        }
        
        const beforeCleanup = {
            memory: performance.memory?.usedJSHeapSize || 0,
            domNodes: document.getElementsByTagName('*').length,
            listeners: this.countEventListeners()
        };
        
        // Clean everything
        console.log('Cleaning up all resources...');
        resources.tabs.forEach(id => notesWiki.closeTab(id));
        resources.notes.forEach(id => notesWiki.closeStickyNote(id));
        resources.groups.forEach(id => notesWiki.deleteTabGroup(id));
        
        await this.wait(1000);
        
        if (window.gc) {
            window.gc();
            await this.wait(500);
        }
        
        const afterCleanup = {
            memory: performance.memory?.usedJSHeapSize || 0,
            domNodes: document.getElementsByTagName('*').length,
            listeners: this.countEventListeners()
        };
        
        const cleaned = {
            memory: ((beforeCleanup.memory - afterCleanup.memory) / 1024 / 1024).toFixed(2),
            domNodes: beforeCleanup.domNodes - afterCleanup.domNodes,
            listeners: beforeCleanup.listeners - afterCleanup.listeners
        };
        
        this.report.results.cleanup = {
            passed: afterCleanup.domNodes <= this.report.metrics.initialDOMNodes + 100,
            details: `Cleaned ${cleaned.memory}MB, ${cleaned.domNodes} nodes, ${cleaned.listeners} listeners`,
            metrics: cleaned
        };
        
        console.log(`Memory cleaned: ${cleaned.memory}MB`);
        console.log(`DOM nodes removed: ${cleaned.domNodes}`);
        console.log(`Event listeners removed: ${cleaned.listeners}`);
        console.log('\n');
    }
    
    generateCompleteReport() {
        console.log('📝 GENERATING COMPLETE REPORT\n');
        console.log('=' * 50);
        
        // Calculate totals
        let totalTests = 0;
        let passedTests = 0;
        
        Object.values(this.report.results).forEach(category => {
            Object.values(category).forEach(test => {
                if (typeof test === 'object' && 'passed' in test) {
                    totalTests++;
                    if (test.passed) passedTests++;
                }
            });
        });
        
        const successRate = ((passedTests / totalTests) * 100).toFixed(1);
        
        // Summary
        this.report.summary = {
            totalTests,
            passedTests,
            failedTests: totalTests - passedTests,
            successRate: parseFloat(successRate),
            grade: this.calculateGrade(successRate)
        };
        
        // Print summary
        console.log('📊 TEST SUMMARY');
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests} (${successRate}%)`);
        console.log(`Failed: ${totalTests - passedTests}`);
        console.log(`Grade: ${this.report.summary.grade}`);
        console.log('\n');
        
        // Detailed results
        console.log('📋 DETAILED RESULTS\n');
        
        Object.entries(this.report.results).forEach(([category, tests]) => {
            console.log(`${category.toUpperCase()}:`);
            Object.entries(tests).forEach(([name, result]) => {
                if (typeof result === 'object' && 'passed' in result) {
                    const icon = result.passed ? '✅' : '❌';
                    console.log(`  ${icon} ${name}: ${result.details || 'No details'}`);
                }
            });
            console.log('');
        });
        
        // Performance metrics
        console.log('⚡ PERFORMANCE METRICS');
        console.log(`Average tab creation: ${this.report.metrics.avgTabCreation?.toFixed(2)}ms`);
        console.log(`Average search time: ${this.report.metrics.avgSearch?.toFixed(2)}ms`);
        console.log(`Memory growth: ${((performance.memory?.usedJSHeapSize || 0) - this.report.metrics.initialMemory) / 1024 / 1024}MB`);
        console.log('\n');
        
        // Issues found
        if (this.report.issues.length > 0) {
            console.log('⚠️ ISSUES FOUND');
            this.report.issues.forEach(issue => console.log(`  - ${issue}`));
            console.log('\n');
        }
        
        // Export report
        this.exportReport();
        
        console.log('✅ Test suite complete!');
        console.log('📁 Report saved to window.testReport');
        console.log('💾 Download: copy(JSON.stringify(window.testReport, null, 2))');
    }
    
    calculateGrade(percentage) {
        if (percentage >= 95) return '🏆 A+ (Excellent)';
        if (percentage >= 90) return '🎯 A (Very Good)';
        if (percentage >= 80) return '👍 B (Good)';
        if (percentage >= 70) return '📊 C (Acceptable)';
        if (percentage >= 60) return '⚠️ D (Needs Improvement)';
        return '❌ F (Critical Issues)';
    }
    
    isElementCentered(element) {
        const rect = element.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const centerX = Math.abs((rect.left + rect.right) / 2 - windowWidth / 2);
        const centerY = Math.abs((rect.top + rect.bottom) / 2 - windowHeight / 2);
        return centerX < 50 && centerY < 50;
    }
    
    countEventListeners() {
        if (typeof getEventListeners === 'undefined') return 0;
        let count = 0;
        document.querySelectorAll('*').forEach(el => {
            const listeners = getEventListeners(el);
            count += Object.values(listeners).flat().length;
        });
        return count;
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    exportReport() {
        window.testReport = this.report;
        
        // Also create a downloadable version
        const blob = new Blob([JSON.stringify(this.report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        console.log(`\n📥 To download report:`);
        console.log(`1. Run: window.downloadTestReport()`);
        
        window.downloadTestReport = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `notes-wiki-test-report-${timestamp}.json`;
            a.click();
        };
    }
}

// Auto-run on load
console.log('🚀 Complete Test Suite Loaded');
console.log('Run: new CompleteTestSuite().runCompleteTestSuite()');
console.log('Or: window.runAllTests()');

window.runAllTests = async () => {
    const suite = new CompleteTestSuite();
    await suite.runCompleteTestSuite();
};

window.CompleteTestSuite = CompleteTestSuite;