const puppeteer = require('puppeteer');

async function debugConstErrors() {
    console.log('🔍 Debugging JavaScript "Assignment to constant variable" errors...');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Collect detailed error information
    const errors = [];
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push({
                type: 'console-error',
                text: msg.text(),
                timestamp: Date.now()
            });
            console.log(`❌ Console Error: ${msg.text()}`);
        }
    });
    
    page.on('pageerror', error => {
        errors.push({
            type: 'page-error',
            message: error.message,
            stack: error.stack,
            timestamp: Date.now()
        });
        console.log(`💥 Page Error: ${error.message}`);
        console.log(`Stack: ${error.stack}`);
    });
    
    try {
        // Load the application
        await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('\n📊 Testing specific features that caused errors...');
        
        // Test 1: Bookmark functionality
        console.log('🔖 Testing bookmarks...');
        try {
            await page.evaluate(() => {
                if (window.notesWiki && window.notesWiki.bookmarkCurrentNote) {
                    window.notesWiki.bookmarkCurrentNote();
                }
            });
        } catch (e) {
            console.log(`Bookmark test error: ${e.message}`);
        }
        
        // Test 2: Timer functionality
        console.log('⏱️ Testing timer...');
        try {
            const timerButton = await page.$('#timer-play-pause, .timer-play-pause');
            if (timerButton) {
                await timerButton.click();
            }
        } catch (e) {
            console.log(`Timer test error: ${e.message}`);
        }
        
        // Test 3: Focus mode
        console.log('🎯 Testing focus mode...');
        try {
            await page.keyboard.press('KeyF');
        } catch (e) {
            console.log(`Focus mode test error: ${e.message}`);
        }
        
        // Test 4: Keyboard shortcuts
        console.log('⌨️ Testing keyboard shortcuts...');
        try {
            await page.keyboard.down('Control');
            await page.keyboard.press('KeyK');
            await page.keyboard.up('Control');
        } catch (e) {
            console.log(`Keyboard shortcut test error: ${e.message}`);
        }
        
        // Test 5: Settings modal
        console.log('⚙️ Testing settings...');
        try {
            await page.click('#settings-toggle');
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (e) {
            console.log(`Settings test error: ${e.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('\n📊 Error Summary:');
        console.log(`Total errors captured: ${errors.length}`);
        
        errors.forEach((error, index) => {
            console.log(`\n${index + 1}. ${error.type.toUpperCase()}`);
            console.log(`   Message: ${error.message || error.text}`);
            if (error.stack) {
                // Extract relevant lines from stack trace
                const stackLines = error.stack.split('\n').slice(0, 5);
                console.log(`   Stack (first 5 lines):`);
                stackLines.forEach(line => console.log(`     ${line.trim()}`));
            }
        });
        
        // Check for specific const variable issues
        const constIssues = errors.filter(e => 
            (e.message || e.text || '').toLowerCase().includes('assignment to constant')
        );
        
        if (constIssues.length > 0) {
            console.log('\n🚨 CONST ASSIGNMENT ERRORS FOUND:');
            constIssues.forEach((error, index) => {
                console.log(`\n${index + 1}. ${error.message || error.text}`);
                if (error.stack) {
                    console.log(`   Full Stack Trace:`);
                    console.log(error.stack);
                }
            });
        } else {
            console.log('\n✅ No "Assignment to constant variable" errors reproduced');
        }
        
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
}

debugConstErrors().catch(console.error);