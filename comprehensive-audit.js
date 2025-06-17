const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class ComprehensiveAudit {
    constructor() {
        this.timestamp = Date.now();
        this.screenshotDir = `audit-screenshots-${this.timestamp}`;
        this.results = {
            normal: {},
            incognito: {},
            differences: [],
            summary: {}
        };
        this.testSteps = [];
    }

    async init() {
        // Create screenshot directory
        await fs.mkdir(this.screenshotDir, { recursive: true });
        
        console.log('🚀 Starting Comprehensive Application Functionality Audit');
        console.log(`📸 Screenshots will be saved to: ${this.screenshotDir}`);
        console.log('='.repeat(50));
    }

    async createBrowser(incognito = false) {
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
        
        const browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();
        
        // Set up comprehensive monitoring
        const logs = [];
        const networkRequests = [];
        const consoleMessages = [];
        
        // Monitor console messages
        page.on('console', msg => {
            const entry = {
                type: msg.type(),
                text: msg.text(),
                timestamp: Date.now()
            };
            consoleMessages.push(entry);
            if (msg.type() === 'error') {
                console.log(`❌ [${incognito ? 'INCOGNITO' : 'NORMAL'}] Console Error: ${msg.text()}`);
            }
        });

        // Monitor network requests
        page.on('request', request => {
            networkRequests.push({
                url: request.url(),
                method: request.method(),
                resourceType: request.resourceType(),
                timestamp: Date.now()
            });
        });

        // Monitor page errors
        page.on('pageerror', error => {
            logs.push({
                type: 'pageerror',
                message: error.message,
                timestamp: Date.now()
            });
            console.log(`💥 [${incognito ? 'INCOGNITO' : 'NORMAL'}] Page Error: ${error.message}`);
        });

        return {
            browser,
            page,
            logs,
            networkRequests,
            consoleMessages
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
            
            // Get localStorage
            for (let i = 0; i < window.localStorage.length; i++) {
                const key = window.localStorage.key(i);
                localStorage[key] = window.localStorage.getItem(key);
            }
            
            // Get sessionStorage
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

    async testApplicationLoad(setup, mode) {
        console.log(`\n📱 Testing Application Load - ${mode.toUpperCase()}`);
        const { page } = setup;
        
        try {
            await page.goto('http://localhost:8000', { 
                waitUntil: 'networkidle0',
                timeout: 30000 
            });
            
            // Wait for application to initialize
            await page.waitForSelector('.app-container', { timeout: 10000 });
            
            const screenshot = await this.takeScreenshot(page, 'app_loaded', mode);
            const storageInfo = await this.getStorageInfo(page);
            
            // Check for required elements
            const elements = await page.evaluate(() => {
                const requiredSelectors = [
                    '.header',
                    '.sidebar',
                    '.main-content',
                    '.tab-bar',
                    '#search-toggle',
                    '#settings-toggle'
                ];
                
                const results = {};
                requiredSelectors.forEach(selector => {
                    const element = document.querySelector(selector);
                    results[selector] = {
                        exists: !!element,
                        visible: element ? window.getComputedStyle(element).display !== 'none' : false,
                        dimensions: element ? element.getBoundingClientRect() : null
                    };
                });
                
                return results;
            });
            
            return {
                success: true,
                screenshot,
                storageInfo,
                elements,
                loadTime: Date.now()
            };
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'app_load_error', mode);
            return {
                success: false,
                error: error.message,
                screenshot
            };
        }
    }

    async testNavigation(setup, mode) {
        console.log(`\n🧭 Testing Navigation Functionality - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Test sidebar navigation
            const sidebarLinks = await page.$$('.file-tree a');
            console.log(`Found ${sidebarLinks.length} navigation links`);
            
            if (sidebarLinks.length > 0) {
                // Click first link
                await sidebarLinks[0].click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const screenshot = await this.takeScreenshot(page, 'navigation_first_link', mode);
                const currentUrl = await page.url();
                const noteContent = await page.$('.note-content');
                
                results.firstLink = {
                    success: !!noteContent,
                    url: currentUrl,
                    screenshot,
                    hasContent: !!noteContent
                };
                
                // Test breadcrumb navigation
                const breadcrumbs = await page.$$('.breadcrumb a');
                if (breadcrumbs.length > 0) {
                    await breadcrumbs[0].click();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    const breadcrumbScreenshot = await this.takeScreenshot(page, 'breadcrumb_navigation', mode);
                    results.breadcrumbs = {
                        success: true,
                        screenshot: breadcrumbScreenshot
                    };
                }
            }
            
            // Test context switching
            const contextButtons = await page.$$('.context-switcher button');
            for (let i = 0; i < Math.min(contextButtons.length, 3); i++) {
                await contextButtons[i].click();
                await new Promise(resolve => setTimeout(resolve, 500));
                const screenshot = await this.takeScreenshot(page, `context_switch_${i}`, mode);
                results[`context_${i}`] = { screenshot };
            }
            
            return results;
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'navigation_error', mode);
            return {
                error: error.message,
                screenshot
            };
        }
    }

    async testSearch(setup, mode) {
        console.log(`\n🔍 Testing Search Functionality - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Open search with Ctrl+K
            await page.keyboard.down('Control');
            await page.keyboard.press('KeyK');
            await page.keyboard.up('Control');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const searchOverlay = await page.$('.search-overlay');
            const searchVisible = searchOverlay ? await page.evaluate(el => 
                window.getComputedStyle(el).display !== 'none', searchOverlay) : false;
            
            if (searchVisible) {
                let screenshot = await this.takeScreenshot(page, 'search_opened', mode);
                results.searchOpen = { success: true, screenshot };
                
                // Test basic search
                await page.type('#search-input', 'test');
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const searchResults = await page.$$('.search-result');
                screenshot = await this.takeScreenshot(page, 'search_results', mode);
                results.basicSearch = {
                    success: true,
                    resultCount: searchResults.length,
                    screenshot
                };
                
                // Test advanced search operators
                const operators = [
                    'tag:javascript',
                    'author:test',
                    '"exact phrase"',
                    'code:python',
                    'test -exclude'
                ];
                
                for (const operator of operators) {
                    await page.click('#search-input', { clickCount: 3 }); // Select all
                    await page.type('#search-input', operator);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    const results = await page.$$('.search-result');
                    const screenshot = await this.takeScreenshot(page, `search_${operator.replace(/[:"]/g, '_')}`, mode);
                    results[`operator_${operator}`] = {
                        resultCount: results.length,
                        screenshot
                    };
                }
                
                // Close search
                await page.keyboard.press('Escape');
                await new Promise(resolve => setTimeout(resolve, 500));
                
            } else {
                results.searchOpen = { success: false, error: 'Search overlay not visible' };
            }
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'search_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    async testSettings(setup, mode) {
        console.log(`\n⚙️ Testing Settings and Persistence - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Open settings
            await page.click('#settings-toggle');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const settingsModal = await page.$('#settings-modal');
            const settingsVisible = settingsModal ? await page.evaluate(el => 
                window.getComputedStyle(el).display !== 'none', settingsModal) : false;
            
            if (settingsVisible) {
                let screenshot = await this.takeScreenshot(page, 'settings_opened', mode);
                results.settingsOpen = { success: true, screenshot };
                
                // Test theme switching
                const themeSelect = await page.$('#theme-select');
                if (themeSelect) {
                    const originalTheme = await page.$eval('#theme-select', el => el.value);
                    
                    // Change theme
                    await page.select('#theme-select', 'dracula');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    screenshot = await this.takeScreenshot(page, 'theme_changed', mode);
                    const newTheme = await page.$eval('#theme-select', el => el.value);
                    
                    results.themeChange = {
                        success: originalTheme !== newTheme,
                        originalTheme,
                        newTheme,
                        screenshot
                    };
                }
                
                // Test other settings
                const checkboxes = await page.$$('#settings-modal input[type="checkbox"]');
                for (let i = 0; i < checkboxes.length; i++) {
                    const originalState = await page.evaluate(el => el.checked, checkboxes[i]);
                    await checkboxes[i].click();
                    await new Promise(resolve => setTimeout(resolve, 200));
                    const newState = await page.evaluate(el => el.checked, checkboxes[i]);
                    
                    results[`checkbox_${i}`] = {
                        changed: originalState !== newState,
                        originalState,
                        newState
                    };
                }
                
                // Get storage before closing
                const storageBeforeClose = await this.getStorageInfo(page);
                
                // Close settings
                await page.click('.modal-close');
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Get storage after closing
                const storageAfterClose = await this.getStorageInfo(page);
                
                results.persistence = {
                    storageBeforeClose,
                    storageAfterClose,
                    settingsPersisted: JSON.stringify(storageBeforeClose.localStorage) === JSON.stringify(storageAfterClose.localStorage)
                };
                
            } else {
                results.settingsOpen = { success: false, error: 'Settings modal not visible' };
            }
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'settings_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    async testTabManagement(setup, mode) {
        console.log(`\n📑 Testing Tab Management - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        try {
            // Get initial tab count
            const initialTabs = await page.$$('.tab');
            results.initialTabCount = initialTabs.length;
            
            // Open new tab with Ctrl+T
            await page.keyboard.down('Control');
            await page.keyboard.press('KeyT');
            await page.keyboard.up('Control');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const newTabCount = (await page.$$('.tab')).length;
            let screenshot = await this.takeScreenshot(page, 'new_tab_created', mode);
            
            results.newTabCreation = {
                success: newTabCount > initialTabs.length,
                initialCount: initialTabs.length,
                newCount: newTabCount,
                screenshot
            };
            
            // Test tab switching
            if (newTabCount > 1) {
                const tabs = await page.$$('.tab');
                await tabs[0].click();
                await new Promise(resolve => setTimeout(resolve, 500));
                screenshot = await this.takeScreenshot(page, 'tab_switched', mode);
                results.tabSwitching = { success: true, screenshot };
            }
            
            // Test tab closing
            if (newTabCount > 1) {
                const closeButton = await page.$('.tab .tab-close');
                if (closeButton) {
                    await closeButton.click();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    const finalTabCount = (await page.$$('.tab')).length;
                    screenshot = await this.takeScreenshot(page, 'tab_closed', mode);
                    
                    results.tabClosing = {
                        success: finalTabCount < newTabCount,
                        beforeClose: newTabCount,
                        afterClose: finalTabCount,
                        screenshot
                    };
                }
            }
            
        } catch (error) {
            const screenshot = await this.takeScreenshot(page, 'tab_management_error', mode);
            results.error = { message: error.message, screenshot };
        }
        
        return results;
    }

    async testResponsiveDesign(setup, mode) {
        console.log(`\n📱 Testing Responsive Design - ${mode.toUpperCase()}`);
        const { page } = setup;
        const results = {};
        
        const viewports = [
            { name: 'desktop', width: 1920, height: 1080 },
            { name: 'tablet', width: 768, height: 1024 },
            { name: 'mobile', width: 375, height: 667 }
        ];
        
        for (const viewport of viewports) {
            try {
                await page.setViewport(viewport);
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const screenshot = await this.takeScreenshot(page, `responsive_${viewport.name}`, mode);
                
                // Check layout elements
                const layoutInfo = await page.evaluate(() => {
                    const sidebar = document.querySelector('.sidebar');
                    const mainContent = document.querySelector('.main-content');
                    const header = document.querySelector('.header');
                    
                    return {
                        sidebar: sidebar ? {
                            visible: window.getComputedStyle(sidebar).display !== 'none',
                            width: sidebar.getBoundingClientRect().width
                        } : null,
                        mainContent: mainContent ? {
                            width: mainContent.getBoundingClientRect().width,
                            height: mainContent.getBoundingClientRect().height
                        } : null,
                        header: header ? {
                            height: header.getBoundingClientRect().height
                        } : null,
                        viewport: {
                            width: window.innerWidth,
                            height: window.innerHeight
                        }
                    };
                });
                
                results[viewport.name] = {
                    screenshot,
                    layoutInfo,
                    viewport
                };
                
            } catch (error) {
                results[viewport.name] = {
                    error: error.message,
                    viewport
                };
            }
        }
        
        // Reset to desktop
        await page.setViewport(viewports[0]);
        
        return results;
    }

    async runFullAudit() {
        await this.init();
        
        // Create both browser instances
        console.log('🌐 Creating Normal Browser Instance...');
        const normalSetup = await this.createBrowser(false);
        
        console.log('🕵️ Creating Incognito Browser Instance...');
        const incognitoSetup = await this.createBrowser(true);
        
        try {
            const testFunctions = [
                { name: 'Application Load', fn: this.testApplicationLoad },
                { name: 'Navigation', fn: this.testNavigation },
                { name: 'Search', fn: this.testSearch },
                { name: 'Settings', fn: this.testSettings },
                { name: 'Tab Management', fn: this.testTabManagement },
                { name: 'Responsive Design', fn: this.testResponsiveDesign }
            ];
            
            for (const { name, fn } of testFunctions) {
                console.log(`\n${'='.repeat(60)}`);
                console.log(`Testing: ${name}`);
                console.log(`${'='.repeat(60)}`);
                
                // Test in normal browser
                this.results.normal[name] = await fn.call(this, normalSetup, 'normal');
                
                // Test in incognito browser
                this.results.incognito[name] = await fn.call(this, incognitoSetup, 'incognito');
                
                // Compare results
                this.compareResults(name, this.results.normal[name], this.results.incognito[name]);
            }
            
            // Generate final report
            await this.generateReport(normalSetup, incognitoSetup);
            
        } finally {
            // Cleanup
            await normalSetup.browser.close();
            await incognitoSetup.browser.close();
        }
    }

    compareResults(testName, normalResult, incognitoResult) {
        console.log(`\n🔍 Comparing ${testName} Results:`);
        
        // Deep comparison logic
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
                // Skip screenshot filenames in comparison
                if (!key.includes('screenshot') && !path.includes('timestamp')) {
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

    async generateReport(normalSetup, incognitoSetup) {
        console.log('\n📊 Generating Comprehensive Audit Report...');
        
        // Generate summary
        this.results.summary = {
            timestamp: new Date().toISOString(),
            totalTests: Object.keys(this.results.normal).length,
            totalDifferences: this.results.differences.length,
            normalBrowserInfo: await this.getBrowserInfo(normalSetup.page),
            incognitoBrowserInfo: await this.getBrowserInfo(incognitoSetup.page),
            screenshotDirectory: this.screenshotDir
        };
        
        // Generate detailed report
        const report = this.formatReport();
        
        // Save report to file
        const reportPath = `audit-report-${this.timestamp}.md`;
        await fs.writeFile(reportPath, report);
        
        console.log(`\n📄 Report saved to: ${reportPath}`);
        console.log(`📸 Screenshots saved to: ${this.screenshotDir}`);
        console.log(`\n🎯 AUDIT SUMMARY:`);
        console.log(`   Tests Performed: ${this.results.summary.totalTests}`);
        console.log(`   Differences Found: ${this.results.summary.totalDifferences}`);
        console.log(`   Overall Status: ${this.results.summary.totalDifferences === 0 ? '✅ PASS' : '❌ ISSUES FOUND'}`);
        
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

    formatReport() {
        let report = `# Comprehensive Application Functionality Audit Report\n\n`;
        report += `**Generated:** ${this.results.summary.timestamp}\n`;
        report += `**Tests Performed:** ${this.results.summary.totalTests}\n`;
        report += `**Differences Found:** ${this.results.summary.totalDifferences}\n`;
        report += `**Screenshots Directory:** ${this.results.summary.screenshotDirectory}\n\n`;
        
        report += `## Executive Summary\n\n`;
        if (this.results.summary.totalDifferences === 0) {
            report += `✅ **AUDIT PASSED**: No functional differences found between normal and private browsing modes.\n\n`;
        } else {
            report += `❌ **ISSUES DETECTED**: ${this.results.summary.totalDifferences} differences found between normal and private browsing modes.\n\n`;
        }
        
        report += `## Browser Information\n\n`;
        report += `### Normal Browser\n`;
        report += `- User Agent: ${this.results.summary.normalBrowserInfo.userAgent}\n`;
        report += `- Platform: ${this.results.summary.normalBrowserInfo.platform}\n`;
        report += `- Cookies Enabled: ${this.results.summary.normalBrowserInfo.cookieEnabled}\n\n`;
        
        report += `### Incognito Browser\n`;
        report += `- User Agent: ${this.results.summary.incognitoBrowserInfo.userAgent}\n`;
        report += `- Platform: ${this.results.summary.incognitoBrowserInfo.platform}\n`;
        report += `- Cookies Enabled: ${this.results.summary.incognitoBrowserInfo.cookieEnabled}\n\n`;
        
        report += `## Detailed Test Results\n\n`;
        
        Object.keys(this.results.normal).forEach(testName => {
            report += `### ${testName}\n\n`;
            
            const normalResult = this.results.normal[testName];
            const incognitoResult = this.results.incognito[testName];
            
            // Add test-specific details
            report += `**Normal Browser Results:**\n`;
            report += this.formatTestResult(normalResult);
            report += `\n**Incognito Browser Results:**\n`;
            report += this.formatTestResult(incognitoResult);
            
            // Add differences if any
            const testDifferences = this.results.differences.filter(d => d.path.startsWith(testName));
            if (testDifferences.length > 0) {
                report += `\n**⚠️ Differences Found:**\n`;
                testDifferences.forEach(diff => {
                    report += `- ${diff.path}: Normal=\`${diff.normal}\`, Incognito=\`${diff.incognito}\`\n`;
                });
            } else {
                report += `\n✅ No differences detected\n`;
            }
            
            report += `\n---\n\n`;
        });
        
        if (this.results.differences.length > 0) {
            report += `## All Differences Summary\n\n`;
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

// Run the audit
async function runAudit() {
    const audit = new ComprehensiveAudit();
    try {
        await audit.runFullAudit();
    } catch (error) {
        console.error('❌ Audit failed:', error);
        process.exit(1);
    }
}

// Export for testing or run directly
if (require.main === module) {
    runAudit();
}

module.exports = ComprehensiveAudit;