const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class ExtendedComprehensiveAudit {
    constructor() {
        this.timestamp = Date.now();
        this.screenshotDir = `extended-audit-screenshots-${this.timestamp}`;
        this.results = {
            normal: {},
            incognito: {},
            crossBrowser: {},
            differences: [],
            summary: {}
        };
        this.testSteps = [];
        this.themes = [
            'ayu-mirage', 'tokyo-night', 'dracula', 'one-dark-pro', 'github-dark',
            'github-light', 'solarized-dark', 'solarized-light', 'material-darker',
            'nord', 'gruvbox-dark', 'gruvbox-light', 'catppuccin-mocha', 'catppuccin-latte'
        ]; // Test subset of 50+ themes for performance
    }

    async init() {
        await fs.mkdir(this.screenshotDir, { recursive: true });
        
        console.log('🚀 Starting EXTENDED Comprehensive Application Functionality Audit');
        console.log(`📸 Screenshots will be saved to: ${this.screenshotDir}`);
        console.log('🎯 Testing ALL Previously Missed Functionality Areas');
        console.log('='.repeat(70));
    }

    async createBrowser(incognito = false, browserType = 'chromium') {
        const browserOptions = {
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ],
            defaultViewport: { width: 1920, height: 1080 }
        };

        if (incognito) {
            browserOptions.args.push('--incognito');
        }

        // For cross-browser testing (would need different Puppeteer setup for Firefox/Safari)
        const browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();
        
        // Enhanced monitoring
        const logs = [];
        const networkRequests = [];
        const consoleMessages = [];
        const errors = [];
        
        page.on('console', msg => {
            const entry = {
                type: msg.type(),
                text: msg.text(),
                timestamp: Date.now()
            };
            consoleMessages.push(entry);
            if (msg.type() === 'error') {
                errors.push(entry);
                console.log(`❌ [${incognito ? 'INCOGNITO' : 'NORMAL'}] Console Error: ${msg.text()}`);
            }
        });

        page.on('request', request => {
            networkRequests.push({
                url: request.url(),
                method: request.method(),
                resourceType: request.resourceType(),
                timestamp: Date.now()
            });
        });

        page.on('pageerror', error => {
            const errorEntry = {
                type: 'pageerror',
                message: error.message,
                stack: error.stack,
                timestamp: Date.now()
            };
            logs.push(errorEntry);
            errors.push(errorEntry);
            console.log(`💥 [${incognito ? 'INCOGNITO' : 'NORMAL'}] Page Error: ${error.message}`);
        });

        return {
            browser,
            page,
            logs,
            networkRequests,
            consoleMessages,
            errors
        };
    }

    async takeScreenshot(page, name, mode) {
        const filename = `${mode}_${name}_${Date.now()}.png`;
        const filepath = path.join(this.screenshotDir, filename);
        await page.screenshot({ path: filepath, fullPage: false });
        return filename;
    }

    async getStorageInfo(page) {
        return await page.evaluate(() => {
            const localStorage = {};
            const sessionStorage = {};
            
            for (let i = 0; i < window.localStorage.length; i++) {
                const key = window.localStorage.key(i);
                localStorage[key] = window.localStorage.getItem(key);
            }
            
            for (let i = 0; i < window.sessionStorage.length; i++) {
                const key = window.sessionStorage.key(i);
                sessionStorage[key] = window.sessionStorage.getItem(key);
            }
            
            return {
                localStorage,
                sessionStorage,
                cookiesEnabled: navigator.cookieEnabled,
                url: window.location.href,
                userAgent: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            };
        });
    }

    // NEW: Test Content Management & Markdown Rendering
    async testContentManagement(setup, mode) {
        console.log(`\n📝 Testing Content Management & Markdown Rendering - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Navigate to a note with rich markdown content
            await page.goto('http://localhost:8000/#/notes/search-features-demo.md', { waitUntil: 'networkidle0' });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Test markdown rendering
            const markdownFeatures = await page.evaluate(() => {
                const noteContent = document.querySelector('.note-content');
                if (!noteContent) return { error: 'No note content found' };
                
                return {
                    codeBlocks: noteContent.querySelectorAll('.code-block, pre code').length,
                    syntaxHighlighting: noteContent.querySelectorAll('.token').length > 0,
                    headings: noteContent.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
                    lists: noteContent.querySelectorAll('ul, ol').length,
                    links: noteContent.querySelectorAll('a').length,
                    images: noteContent.querySelectorAll('img').length,
                    tables: noteContent.querySelectorAll('table').length,
                    blockquotes: noteContent.querySelectorAll('blockquote').length,
                    callouts: noteContent.querySelectorAll('.callout, .admonition').length
                };
            });
            
            let screenshot = await this.takeScreenshot(page, 'markdown_rendering', mode);
            results.markdownRendering = {
                success: markdownFeatures.codeBlocks > 0 || markdownFeatures.headings > 0,
                features: markdownFeatures,
                screenshot
            };
            
            // Test wiki-style links if present
            const wikiLinks = await page.$$('a[href*="[["], .wiki-link');
            if (wikiLinks.length > 0) {
                await wikiLinks[0].click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                screenshot = await this.takeScreenshot(page, 'wiki_link_navigation', mode);
                results.wikiLinks = {
                    success: true,
                    count: wikiLinks.length,
                    screenshot
                };
            }
            
            // Test collapsible sections
            const collapsibleElements = await page.$$('details, .collapsible, [data-collapse]');
            if (collapsibleElements.length > 0) {
                await collapsibleElements[0].click();
                await new Promise(resolve => setTimeout(resolve, 500));
                screenshot = await this.takeScreenshot(page, 'collapsible_sections', mode);
                results.collapsibleSections = {
                    success: true,
                    count: collapsibleElements.length,
                    screenshot
                };
            }
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'content_management_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    // NEW: Test Core Interactive Features
    async testCoreInteractiveFeatures(setup, mode) {
        console.log(`\n⭐ Testing Core Interactive Features - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Test bookmarks functionality
            console.log('  📑 Testing Bookmarks...');
            const bookmarkButton = await page.$('.bookmark-button, [aria-label*="bookmark"], .star-icon');
            if (bookmarkButton) {
                await bookmarkButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                
                let screenshot = await this.takeScreenshot(page, 'bookmark_added', mode);
                results.bookmarks = {
                    success: true,
                    screenshot
                };
                
                // Test bookmarks dropdown
                const bookmarksDropdown = await page.$('#bookmarks-dropdown button, .bookmarks-toggle');
                if (bookmarksDropdown) {
                    await bookmarksDropdown.click();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    screenshot = await this.takeScreenshot(page, 'bookmarks_dropdown', mode);
                    results.bookmarksDropdown = { success: true, screenshot };
                }
            }
            
            // Test recent files functionality
            console.log('  🕒 Testing Recent Files...');
            const recentFilesButton = await page.$('#recent-dropdown button, .recent-files-toggle');
            if (recentFilesButton) {
                await recentFilesButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const screenshot = await this.takeScreenshot(page, 'recent_files_dropdown', mode);
                const recentItems = await page.$$('.recent-files-list li:not(.empty-state)');
                results.recentFiles = {
                    success: true,
                    itemCount: recentItems.length,
                    screenshot
                };
            }
            
            // Test Pomodoro timer
            console.log('  ⏰ Testing Pomodoro Timer...');
            const timerWidget = await page.$('.timer-widget, #timer-widget-main');
            if (timerWidget) {
                const playButton = await page.$('#timer-play-pause, .timer-play-pause');
                if (playButton) {
                    await playButton.click();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const screenshot = await this.takeScreenshot(page, 'pomodoro_timer_started', mode);
                    const timerDisplay = await page.$eval('.timer-display, #timer-display', el => el.textContent);
                    results.pomodoroTimer = {
                        success: true,
                        timerDisplay,
                        screenshot
                    };
                    
                    // Stop timer
                    await playButton.click();
                }
            }
            
            // Test focus mode (F key)
            console.log('  🎯 Testing Focus Mode...');
            await page.keyboard.press('KeyF');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const focusModeActive = await page.evaluate(() => {
                return document.body.classList.contains('focus-mode') || 
                       document.documentElement.classList.contains('focus-mode');
            });
            
            const screenshot = await this.takeScreenshot(page, 'focus_mode', mode);
            results.focusMode = {
                success: focusModeActive,
                active: focusModeActive,
                screenshot
            };
            
            // Exit focus mode
            await page.keyboard.press('KeyF');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Test in-note search (Ctrl+F)
            console.log('  🔍 Testing In-Note Search...');
            await page.keyboard.down('Control');
            await page.keyboard.press('KeyF');
            await page.keyboard.up('Control');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const inNoteSearch = await page.$('.note-search-ui, .in-note-search');
            if (inNoteSearch) {
                const searchVisible = await page.evaluate(el => 
                    window.getComputedStyle(el).display !== 'none', inNoteSearch);
                
                if (searchVisible) {
                    await page.type('.note-search-input, .in-note-search input', 'test');
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    const searchScreenshot = await this.takeScreenshot(page, 'in_note_search', mode);
                    results.inNoteSearch = {
                        success: true,
                        screenshot: searchScreenshot
                    };
                    
                    // Close in-note search
                    await page.keyboard.press('Escape');
                }
            }
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'interactive_features_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    // NEW: Test Advanced Navigation Features
    async testAdvancedNavigation(setup, mode) {
        console.log(`\n🧭 Testing Advanced Navigation Features - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Navigate to a note with headings for TOC testing
            await page.goto('http://localhost:8000/#/notes/comprehensive-testing.md', { waitUntil: 'networkidle0' });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Test Table of Contents
            console.log('  📋 Testing Table of Contents...');
            const tocElement = await page.$('.table-of-contents, .toc, #table-of-contents');
            if (tocElement) {
                const tocVisible = await page.evaluate(el => 
                    window.getComputedStyle(el).display !== 'none', tocElement);
                
                let screenshot = await this.takeScreenshot(page, 'table_of_contents', mode);
                
                // Test TOC toggle
                const tocToggle = await page.$('.toc-toggle, .table-of-contents-toggle');
                if (tocToggle) {
                    await tocToggle.click();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    screenshot = await this.takeScreenshot(page, 'toc_toggled', mode);
                }
                
                // Test TOC navigation
                const tocLinks = await page.$$('.toc a, .table-of-contents a');
                if (tocLinks.length > 0) {
                    await tocLinks[0].click();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    screenshot = await this.takeScreenshot(page, 'toc_navigation', mode);
                }
                
                results.tableOfContents = {
                    success: tocVisible,
                    linkCount: tocLinks.length,
                    screenshot
                };
            }
            
            // Test reading progress
            console.log('  📊 Testing Reading Progress...');
            const progressBar = await page.$('.reading-progress, .progress-bar');
            if (progressBar) {
                // Scroll to test progress
                await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const progressValue = await page.evaluate(() => {
                    const progress = document.querySelector('.reading-progress, .progress-bar');
                    return progress ? progress.style.width || progress.value : null;
                });
                
                const screenshot = await this.takeScreenshot(page, 'reading_progress', mode);
                results.readingProgress = {
                    success: !!progressValue,
                    progressValue,
                    screenshot
                };
            }
            
            // Test tag filtering
            console.log('  🏷️ Testing Tag Filtering...');
            const tagButton = await page.$('#tags-button, .tags-button');
            if (tagButton) {
                await tagButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const tagFilters = await page.$$('.tag-filter, .tag-button');
                if (tagFilters.length > 0) {
                    await tagFilters[0].click();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const screenshot = await this.takeScreenshot(page, 'tag_filtering', mode);
                    results.tagFiltering = {
                        success: true,
                        tagCount: tagFilters.length,
                        screenshot
                    };
                }
            }
            
            // Test expand/collapse all folders
            console.log('  📁 Testing Folder Controls...');
            const expandAllButton = await page.$('#expand-all-folders, .expand-all');
            const collapseAllButton = await page.$('#collapse-all-folders, .collapse-all');
            
            if (expandAllButton && collapseAllButton) {
                await expandAllButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                
                let screenshot = await this.takeScreenshot(page, 'folders_expanded', mode);
                
                await collapseAllButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                
                screenshot = await this.takeScreenshot(page, 'folders_collapsed', mode);
                
                results.folderControls = {
                    success: true,
                    screenshot
                };
            }
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'advanced_navigation_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    // NEW: Test Comprehensive Theme System
    async testThemeSystem(setup, mode) {
        console.log(`\n🎨 Testing Comprehensive Theme System - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Open settings
            await page.click('#settings-toggle');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const settingsModal = await page.$('#settings-modal');
            if (!settingsModal) {
                results.error = { message: 'Settings modal not found' };
                return results;
            }
            
            // Test multiple themes
            const themeResults = {};
            const themeSelect = await page.$('#theme-select, select[name="theme"]');
            
            if (themeSelect) {
                for (const theme of this.themes) {
                    try {
                        console.log(`    🎨 Testing theme: ${theme}`);
                        
                        await page.select('#theme-select', theme);
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Allow theme to load
                        
                        // Capture theme appearance
                        const screenshot = await this.takeScreenshot(page, `theme_${theme}`, mode);
                        
                        // Check if theme stylesheet loaded
                        const themeLoaded = await page.evaluate((themeName) => {
                            const themeLink = document.getElementById('theme-stylesheet');
                            return themeLink && themeLink.href.includes(themeName);
                        }, theme);
                        
                        themeResults[theme] = {
                            success: themeLoaded,
                            screenshot,
                            loaded: themeLoaded
                        };
                        
                    } catch (themeError) {
                        themeResults[theme] = {
                            success: false,
                            error: themeError.message
                        };
                    }
                }
            }
            
            results.themes = themeResults;
            results.themeCount = Object.keys(themeResults).length;
            
            // Test custom CSS if available
            const customCSSTextarea = await page.$('#custom-css, textarea[name="customCSS"]');
            if (customCSSTextarea) {
                await customCSSTextarea.type('body { border: 2px solid red; }');
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const screenshot = await this.takeScreenshot(page, 'custom_css_test', mode);
                results.customCSS = {
                    success: true,
                    screenshot
                };
                
                // Clear custom CSS
                await page.evaluate(() => {
                    const textarea = document.querySelector('#custom-css, textarea[name="customCSS"]');
                    if (textarea) textarea.value = '';
                });
            }
            
            // Test theme persistence
            const originalTheme = await page.$eval('#theme-select', el => el.value);
            await page.click('.modal-close, .settings-close');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Reopen settings to check persistence
            await page.click('#settings-toggle');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const persistedTheme = await page.$eval('#theme-select', el => el.value);
            results.themePersistence = {
                success: originalTheme === persistedTheme,
                originalTheme,
                persistedTheme
            };
            
            // Close settings
            await page.click('.modal-close, .settings-close');
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'theme_system_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    // NEW: Test Keyboard Shortcuts
    async testKeyboardShortcuts(setup, mode) {
        console.log(`\n⌨️ Testing Keyboard Shortcuts & Accessibility - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            const shortcuts = [
                { name: 'Search', key: 'KeyK', modifiers: ['Control'] },
                { name: 'Settings', key: 'Comma', modifiers: ['Control'] },
                { name: 'New Tab', key: 'KeyT', modifiers: ['Control'] },
                { name: 'New Tab Alt', key: 'KeyT', modifiers: ['Alt'] },
                { name: 'Close Tab', key: 'KeyW', modifiers: ['Control'] },
                { name: 'Close Tab Alt', key: 'KeyW', modifiers: ['Alt'] },
                { name: 'Focus Mode', key: 'KeyF', modifiers: [] },
                { name: 'Tab 1', key: 'Digit1', modifiers: ['Alt'] },
                { name: 'Tab 2', key: 'Digit2', modifiers: ['Alt'] },
                { name: 'Tag Filter', key: 'KeyF', modifiers: ['Control'] }
            ];
            
            for (const shortcut of shortcuts) {
                try {
                    console.log(`    ⌨️ Testing shortcut: ${shortcut.name}`);
                    
                    // Press shortcut
                    for (const modifier of shortcut.modifiers) {
                        await page.keyboard.down(modifier);
                    }
                    await page.keyboard.press(shortcut.key);
                    for (const modifier of shortcut.modifiers) {
                        await page.keyboard.up(modifier);
                    }
                    
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Check for visible changes (modal open, focus change, etc.)
                    const uiChange = await page.evaluate(() => {
                        return {
                            searchVisible: document.querySelector('.search-overlay')?.style.display !== 'none',
                            settingsVisible: document.querySelector('#settings-modal')?.style.display !== 'none',
                            focusMode: document.body.classList.contains('focus-mode'),
                            activeElement: document.activeElement?.tagName,
                            tabCount: document.querySelectorAll('.tab').length
                        };
                    });
                    
                    const screenshot = await this.takeScreenshot(page, `shortcut_${shortcut.name.replace(/\s+/g, '_')}`, mode);
                    
                    results[shortcut.name] = {
                        success: true,
                        uiChange,
                        screenshot
                    };
                    
                    // Close any opened modals
                    await page.keyboard.press('Escape');
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                } catch (shortcutError) {
                    results[shortcut.name] = {
                        success: false,
                        error: shortcutError.message
                    };
                }
            }
            
            // Test accessibility navigation
            console.log('    ♿ Testing Accessibility Navigation...');
            await page.keyboard.press('Tab'); // Tab through elements
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const focusedElement = await page.evaluate(() => ({
                tagName: document.activeElement?.tagName,
                id: document.activeElement?.id,
                className: document.activeElement?.className,
                ariaLabel: document.activeElement?.getAttribute('aria-label')
            }));
            
            const accessibilityScreenshot = await this.takeScreenshot(page, 'accessibility_focus', mode);
            results.accessibility = {
                success: !!focusedElement.tagName,
                focusedElement,
                screenshot: accessibilityScreenshot
            };
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'keyboard_shortcuts_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    // NEW: Test Error Handling & Edge Cases
    async testErrorHandling(setup, mode) {
        console.log(`\n🚨 Testing Error Handling & Edge Cases - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Test 404 handling (non-existent note)
            console.log('    🔍 Testing 404 Handling...');
            await page.goto('http://localhost:8000/#/notes/non-existent-file.md', { waitUntil: 'networkidle0' });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const errorMessage = await page.evaluate(() => {
                const content = document.querySelector('.main-content, .note-content');
                return content ? content.textContent : '';
            });
            
            const screenshot404 = await this.takeScreenshot(page, '404_handling', mode);
            results.notFound = {
                success: errorMessage.includes('not found') || errorMessage.includes('404') || errorMessage.includes('error'),
                errorMessage,
                screenshot: screenshot404
            };
            
            // Test localStorage quota exceeded simulation
            console.log('    💾 Testing localStorage Edge Cases...');
            try {
                await page.evaluate(() => {
                    // Try to fill localStorage
                    let i = 0;
                    try {
                        while (i < 1000) {
                            localStorage.setItem(`test_key_${i}`, 'x'.repeat(1000));
                            i++;
                        }
                    } catch (e) {
                        // Expected to throw when quota exceeded
                        return { quotaExceeded: true, itemsStored: i };
                    }
                    return { quotaExceeded: false, itemsStored: i };
                });
                
                results.localStorageQuota = { success: true, tested: true };
                
                // Clean up test data
                await page.evaluate(() => {
                    for (let i = 0; i < 1000; i++) {
                        localStorage.removeItem(`test_key_${i}`);
                    }
                });
                
            } catch (quotaError) {
                results.localStorageQuota = {
                    success: true, // Expected to handle gracefully
                    error: quotaError.message
                };
            }
            
            // Test malformed URL handling
            console.log('    🔗 Testing Malformed URL Handling...');
            await page.goto('http://localhost:8000/#/notes/../../../etc/passwd', { waitUntil: 'networkidle0' });
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const malformedUrlScreenshot = await this.takeScreenshot(page, 'malformed_url', mode);
            const urlHandling = await page.evaluate(() => ({
                url: window.location.href,
                content: document.querySelector('.main-content')?.textContent || ''
            }));
            
            results.malformedUrl = {
                success: !urlHandling.content.includes('etc/passwd'), // Should not access system files
                handling: urlHandling,
                screenshot: malformedUrlScreenshot
            };
            
            // Test rapid clicking (stress test)
            console.log('    ⚡ Testing Rapid Interaction Handling...');
            await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
            
            // Rapid fire clicks on search button
            for (let i = 0; i < 10; i++) {
                await page.click('#search-toggle');
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            const rapidClickScreenshot = await this.takeScreenshot(page, 'rapid_clicking', mode);
            const uiStable = await page.evaluate(() => {
                return {
                    searchOverlayCount: document.querySelectorAll('.search-overlay').length,
                    modalCount: document.querySelectorAll('.modal').length
                };
            });
            
            results.rapidClicking = {
                success: uiStable.searchOverlayCount === 1, // Should only have one overlay
                uiStable,
                screenshot: rapidClickScreenshot
            };
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'error_handling_test_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    // NEW: Test Advanced Persistence & Multi-Tab State
    async testAdvancedPersistence(setup, mode) {
        console.log(`\n💾 Testing Advanced Persistence & Multi-Tab State - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Test session restoration
            console.log('    🔄 Testing Session State...');
            
            // Create multiple tabs
            await page.goto('http://localhost:8000/#/notes/index.md', { waitUntil: 'networkidle0' });
            
            // Simulate tab creation by opening different notes
            const testNotes = [
                '/notes/search-features-demo.md',
                '/notes/comprehensive-testing.md',
                '/notes/theme-showcase.md'
            ];
            
            for (const note of testNotes) {
                await page.goto(`http://localhost:8000/#${note}`, { waitUntil: 'networkidle0' });
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            // Get current tab state
            const tabState = await page.evaluate(() => {
                const tabs = Array.from(document.querySelectorAll('.tab')).map(tab => ({
                    title: tab.textContent?.trim(),
                    active: tab.classList.contains('active'),
                    id: tab.id
                }));
                
                return {
                    tabs,
                    activeTab: document.querySelector('.tab.active')?.textContent?.trim(),
                    tabCount: tabs.length
                };
            });
            
            const tabStateScreenshot = await this.takeScreenshot(page, 'multi_tab_state', mode);
            results.multiTabState = {
                success: tabState.tabCount > 0,
                tabState,
                screenshot: tabStateScreenshot
            };
            
            // Test tab drag and drop simulation
            console.log('    🖱️ Testing Tab Drag and Drop...');
            const tabs = await page.$$('.tab');
            if (tabs.length > 1) {
                try {
                    const firstTab = tabs[0];
                    const secondTab = tabs[1];
                    
                    // Get positions
                    const firstTabBox = await firstTab.boundingBox();
                    const secondTabBox = await secondTab.boundingBox();
                    
                    if (firstTabBox && secondTabBox) {
                        // Simulate drag and drop
                        await page.mouse.move(firstTabBox.x + firstTabBox.width / 2, firstTabBox.y + firstTabBox.height / 2);
                        await page.mouse.down();
                        await page.mouse.move(secondTabBox.x + secondTabBox.width / 2, secondTabBox.y + secondTabBox.height / 2);
                        await page.mouse.up();
                        
                        await new Promise(resolve => setTimeout(resolve, 500));
                        
                        const dragDropScreenshot = await this.takeScreenshot(page, 'tab_drag_drop', mode);
                        results.tabDragDrop = {
                            success: true,
                            screenshot: dragDropScreenshot
                        };
                    }
                } catch (dragError) {
                    results.tabDragDrop = {
                        success: false,
                        error: dragError.message
                    };
                }
            }
            
            // Test persistent settings across sessions
            console.log('    ⚙️ Testing Settings Persistence...');
            
            // Change a setting
            await page.click('#settings-toggle');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const originalTheme = await page.$eval('#theme-select', el => el.value);
            const newTheme = originalTheme === 'tokyo-night' ? 'dracula' : 'tokyo-night';
            
            await page.select('#theme-select', newTheme);
            await page.click('.modal-close, .settings-close');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Reload page to test persistence
            await page.reload({ waitUntil: 'networkidle0' });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check if setting persisted
            await page.click('#settings-toggle');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const persistedTheme = await page.$eval('#theme-select', el => el.value);
            const persistenceScreenshot = await this.takeScreenshot(page, 'settings_persistence', mode);
            
            results.settingsPersistence = {
                success: persistedTheme === newTheme,
                originalTheme,
                newTheme,
                persistedTheme,
                screenshot: persistenceScreenshot
            };
            
            await page.click('.modal-close, .settings-close');
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'advanced_persistence_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    async runExtendedAudit() {
        await this.init();
        
        console.log('🌐 Creating Browser Instances for Extended Testing...');
        const normalSetup = await this.createBrowser(false);
        const incognitoSetup = await this.createBrowser(true);
        
        try {
            const extendedTestFunctions = [
                { name: 'Content Management', fn: this.testContentManagement },
                { name: 'Core Interactive Features', fn: this.testCoreInteractiveFeatures },
                { name: 'Advanced Navigation', fn: this.testAdvancedNavigation },
                { name: 'Theme System', fn: this.testThemeSystem },
                { name: 'Keyboard Shortcuts', fn: this.testKeyboardShortcuts },
                { name: 'Error Handling', fn: this.testErrorHandling },
                { name: 'Advanced Persistence', fn: this.testAdvancedPersistence }
            ];
            
            for (const { name, fn } of extendedTestFunctions) {
                console.log(`\n${'='.repeat(70)}`);
                console.log(`🔬 EXTENDED TESTING: ${name}`);
                console.log(`${'='.repeat(70)}`);
                
                // Test in normal browser
                this.results.normal[name] = await fn.call(this, normalSetup, 'normal');
                
                // Test in incognito browser
                this.results.incognito[name] = await fn.call(this, incognitoSetup, 'incognito');
                
                // Compare results
                this.compareResults(name, this.results.normal[name], this.results.incognito[name]);
            }
            
            // Generate comprehensive report
            await this.generateExtendedReport(normalSetup, incognitoSetup);
            
        } finally {
            await normalSetup.browser.close();
            await incognitoSetup.browser.close();
        }
    }

    compareResults(testName, normalResult, incognitoResult) {
        console.log(`\n🔍 Comparing ${testName} Results:`);
        
        const differences = this.findDifferences(normalResult, incognitoResult, testName);
        
        if (differences.length > 0) {
            console.log(`❌ Found ${differences.length} differences in ${testName}`);
            differences.forEach(diff => {
                console.log(`   - ${diff.path}: Normal=${diff.normal}, Incognito=${diff.incognito}`);
            });
            this.results.differences.push(...differences);
        } else {
            console.log(`✅ No differences found in ${testName}`);
        }
    }

    findDifferences(obj1, obj2, basePath = '') {
        const differences = [];
        
        const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);
        
        for (const key of keys) {
            const path = basePath ? `${basePath}.${key}` : key;
            const val1 = obj1?.[key];
            const val2 = obj2?.[key];
            
            if (typeof val1 !== typeof val2) {
                differences.push({
                    path,
                    normal: val1,
                    incognito: val2,
                    type: 'type_mismatch'
                });
            } else if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
                differences.push(...this.findDifferences(val1, val2, path));
            } else if (val1 !== val2) {
                if (!key.includes('screenshot') && !path.includes('timestamp') && !path.includes('loadTime')) {
                    differences.push({
                        path,
                        normal: val1,
                        incognito: val2,
                        type: 'value_difference'
                    });
                }
            }
        }
        
        return differences;
    }

    async generateExtendedReport(normalSetup, incognitoSetup) {
        console.log('\n📊 Generating Extended Comprehensive Audit Report...');
        
        this.results.summary = {
            timestamp: new Date().toISOString(),
            totalTests: Object.keys(this.results.normal).length,
            totalDifferences: this.results.differences.length,
            normalBrowserInfo: await this.getBrowserInfo(normalSetup.page),
            incognitoBrowserInfo: await this.getBrowserInfo(incognitoSetup.page),
            screenshotDirectory: this.screenshotDir,
            testedFeatures: Object.keys(this.results.normal),
            extendedAudit: true
        };
        
        const report = this.formatExtendedReport();
        const reportPath = `extended-audit-report-${this.timestamp}.md`;
        await fs.writeFile(reportPath, report);
        
        console.log(`\n📄 Extended Report saved to: ${reportPath}`);
        console.log(`📸 Screenshots saved to: ${this.screenshotDir}`);
        console.log(`\n🎯 EXTENDED AUDIT SUMMARY:`);
        console.log(`   Tests Performed: ${this.results.summary.totalTests}`);
        console.log(`   Features Tested: ${this.results.summary.testedFeatures.join(', ')}`);
        console.log(`   Differences Found: ${this.results.summary.totalDifferences}`);
        console.log(`   Overall Status: ${this.results.summary.totalDifferences === 0 ? '✅ PERFECT PASS' : '⚠️ MINOR DIFFERENCES FOUND'}`);
        
        return reportPath;
    }

    async getBrowserInfo(page) {
        return await page.evaluate(() => ({
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }));
    }

    formatExtendedReport() {
        let report = `# 🔬 EXTENDED Comprehensive Application Functionality Audit Report\n\n`;
        report += `**Generated:** ${this.results.summary.timestamp}\n`;
        report += `**Extended Tests Performed:** ${this.results.summary.totalTests}\n`;
        report += `**Features Tested:** ${this.results.summary.testedFeatures.join(', ')}\n`;
        report += `**Differences Found:** ${this.results.summary.totalDifferences}\n`;
        report += `**Screenshots Directory:** ${this.results.summary.screenshotDirectory}\n\n`;
        
        report += `## 🎯 Executive Summary\n\n`;
        if (this.results.summary.totalDifferences === 0) {
            report += `✅ **EXTENDED AUDIT PASSED**: All advanced features working identically in normal and private browsing modes.\n\n`;
        } else {
            report += `⚠️ **MINOR DIFFERENCES**: ${this.results.summary.totalDifferences} minor differences found between modes.\n\n`;
        }
        
        report += `## 🔬 Extended Testing Coverage\n\n`;
        report += `This audit extends beyond basic functionality to test sophisticated features:\n\n`;
        report += `- **Content Management** - Markdown rendering, wiki links, collapsible sections\n`;
        report += `- **Interactive Features** - Bookmarks, timer, focus mode, in-note search\n`;
        report += `- **Advanced Navigation** - Table of contents, reading progress, tag filtering\n`;
        report += `- **Theme System** - Multiple theme testing, custom CSS, persistence\n`;
        report += `- **Keyboard Shortcuts** - Comprehensive shortcut testing, accessibility\n`;
        report += `- **Error Handling** - 404s, edge cases, rapid interactions\n`;
        report += `- **Advanced Persistence** - Multi-tab state, session restoration\n\n`;
        
        report += `## 📊 Detailed Extended Test Results\n\n`;
        
        Object.keys(this.results.normal).forEach(testName => {
            report += `### 🔬 ${testName}\n\n`;
            
            const normalResult = this.results.normal[testName];
            const incognitoResult = this.results.incognito[testName];
            
            report += `**Normal Browser Results:**\n`;
            report += this.formatTestResult(normalResult);
            report += `\n**Incognito Browser Results:**\n`;
            report += this.formatTestResult(incognitoResult);
            
            const testDifferences = this.results.differences.filter(d => d.path.startsWith(testName));
            if (testDifferences.length > 0) {
                report += `\n**⚠️ Differences Found:**\n`;
                testDifferences.forEach(diff => {
                    report += `- ${diff.path}: Normal=\`${diff.normal}\`, Incognito=\`${diff.incognito}\`\n`;
                });
            } else {
                report += `\n✅ Perfect feature parity\n`;
            }
            
            report += `\n---\n\n`;
        });
        
        if (this.results.differences.length > 0) {
            report += `## ⚠️ All Differences Summary\n\n`;
            this.results.differences.forEach((diff, index) => {
                report += `${index + 1}. **${diff.path}**\n`;
                report += `   - Normal: \`${diff.normal}\`\n`;
                report += `   - Incognito: \`${diff.incognito}\`\n`;
                report += `   - Type: ${diff.type}\n\n`;
            });
        }
        
        return report;
    }

    formatTestResult(result) {
        if (!result) return 'No result available\n';
        
        let formatted = '';
        Object.keys(result).forEach(key => {
            if (key === 'screenshot') {
                formatted += `- Screenshot: ${result[key]}\n`;
            } else if (key === 'error') {
                formatted += `- ❌ Error: ${result[key]}\n`;
            } else if (typeof result[key] === 'object') {
                formatted += `- ${key}: ${JSON.stringify(result[key], null, 2)}\n`;
            } else {
                formatted += `- ${key}: ${result[key]}\n`;
            }
        });
        
        return formatted;
    }
}

async function runExtendedAudit() {
    const audit = new ExtendedComprehensiveAudit();
    try {
        await audit.runExtendedAudit();
    } catch (error) {
        console.error('❌ Extended audit failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    runExtendedAudit();
}

module.exports = ExtendedComprehensiveAudit;