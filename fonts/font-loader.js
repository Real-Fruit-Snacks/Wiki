/**
 * Advanced font loading module for Notes Wiki
 * Provides font loading with fallback, performance monitoring, and localStorage caching
 */

class FontLoader {
    constructor() {
        this.fontsToLoad = [
            { family: 'Inter', weight: 400, style: 'normal' },
            { family: 'Inter', weight: 500, style: 'normal' },
            { family: 'Inter', weight: 600, style: 'normal' },
            { family: 'Inter', weight: 700, style: 'normal' },
            { family: 'JetBrains Mono', weight: 400, style: 'normal' },
            { family: 'JetBrains Mono', weight: 700, style: 'normal' }
        ];
        
        this.fontsCacheKey = 'notes-wiki-fonts-loaded';
        this.fontsCacheExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days
    }
    
    /**
     * Initialize font loading
     */
    async init() {
        const startTime = performance.now();
        
        try {
            // Check if fonts were previously loaded successfully
            if (this.areFontsCached()) {
                console.log('[FontLoader] Using cached fonts');
                document.body.classList.add('custom-fonts-loaded');
                return;
            }
            
            // Load font CSS
            await this.loadFontCSS();
            
            // Wait for fonts to load
            if ('fonts' in document) {
                await this.waitForFonts();
            } else {
                // Fallback for browsers without Font Loading API
                await this.fallbackFontCheck();
            }
            
            // Mark fonts as loaded
            document.body.classList.add('custom-fonts-loaded');
            this.cacheFontsLoaded();
            
            const loadTime = performance.now() - startTime;
            console.log(`[FontLoader] Fonts loaded in ${loadTime.toFixed(2)}ms`);
            
        } catch (error) {
            console.error('[FontLoader] Error loading fonts:', error);
            // Continue with system fonts
        }
    }
    
    /**
     * Load font CSS file
     */
    loadFontCSS() {
        return new Promise((resolve, reject) => {
            const basePath = this.getBasePath();
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = basePath ? `${basePath}fonts/fonts.css` : 'fonts/fonts.css';
            
            link.onload = () => {
                console.log('[FontLoader] Font CSS loaded');
                resolve();
            };
            
            link.onerror = () => {
                console.log('[FontLoader] Font CSS not found, using system fonts');
                reject(new Error('Font CSS not found'));
            };
            
            document.head.appendChild(link);
        });
    }
    
    /**
     * Wait for specific fonts to load using Font Loading API
     */
    async waitForFonts() {
        const fontPromises = this.fontsToLoad.map(font => {
            const fontFace = `${font.style} ${font.weight} 16px "${font.family}"`;
            return document.fonts.load(fontFace).catch(err => {
                console.warn(`[FontLoader] Failed to load ${fontFace}:`, err);
                return null;
            });
        });
        
        await Promise.all(fontPromises);
        
        // Log loaded fonts
        const loadedFonts = [];
        document.fonts.forEach(font => {
            if (font.status === 'loaded') {
                loadedFonts.push(`${font.family} ${font.weight} ${font.style}`);
            }
        });
        
        if (loadedFonts.length > 0) {
            console.log('[FontLoader] Loaded fonts:', loadedFonts);
        }
    }
    
    /**
     * Fallback font checking for older browsers
     */
    fallbackFontCheck() {
        return new Promise((resolve) => {
            // Create test elements
            const testContainer = document.createElement('div');
            testContainer.style.position = 'absolute';
            testContainer.style.visibility = 'hidden';
            testContainer.style.fontSize = '100px';
            document.body.appendChild(testContainer);
            
            const tests = [
                { family: 'Inter', fallback: 'Arial', text: 'mmmmmmmmmm' },
                { family: 'JetBrains Mono', fallback: 'monospace', text: 'mmmmmmmmmm' }
            ];
            
            const initialWidths = {};
            
            // Measure fallback font widths
            tests.forEach(test => {
                const span = document.createElement('span');
                span.style.fontFamily = test.fallback;
                span.textContent = test.text;
                testContainer.appendChild(span);
                initialWidths[test.family] = span.offsetWidth;
                testContainer.removeChild(span);
            });
            
            // Check if custom fonts are loaded
            let checks = 0;
            const maxChecks = 50; // 5 seconds maximum
            
            const checkFonts = () => {
                let allLoaded = true;
                
                tests.forEach(test => {
                    const span = document.createElement('span');
                    span.style.fontFamily = `"${test.family}", ${test.fallback}`;
                    span.textContent = test.text;
                    testContainer.appendChild(span);
                    
                    if (span.offsetWidth === initialWidths[test.family]) {
                        allLoaded = false;
                    }
                    
                    testContainer.removeChild(span);
                });
                
                if (allLoaded || checks >= maxChecks) {
                    document.body.removeChild(testContainer);
                    resolve();
                } else {
                    checks++;
                    setTimeout(checkFonts, 100);
                }
            };
            
            checkFonts();
        });
    }
    
    /**
     * Get base path for font loading
     */
    getBasePath() {
        const pathname = window.location.pathname;
        const hostname = window.location.hostname;
        let basePath = '';
        
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
            // Local development
        } else if (hostname.includes('github.io') || hostname.includes('gitlab.io')) {
            const pathSegments = pathname.split('/').filter(segment => segment);
            if (pathSegments.length > 0) {
                const lastSegment = pathSegments[pathSegments.length - 1];
                const isFile = lastSegment && (lastSegment.includes('.html') || lastSegment.includes('.'));
                
                if (!isFile || pathSegments.length > 1) {
                    basePath = '/' + pathSegments[0] + '/';
                }
            }
        }
        
        return basePath;
    }
    
    /**
     * Check if fonts are cached
     */
    areFontsCached() {
        try {
            const cached = localStorage.getItem(this.fontsCacheKey);
            if (!cached) return false;
            
            const { timestamp } = JSON.parse(cached);
            const now = Date.now();
            
            return (now - timestamp) < this.fontsCacheExpiry;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Cache that fonts were loaded successfully
     */
    cacheFontsLoaded() {
        try {
            localStorage.setItem(this.fontsCacheKey, JSON.stringify({
                timestamp: Date.now(),
                fonts: this.fontsToLoad
            }));
        } catch (error) {
            console.warn('[FontLoader] Could not cache font status:', error);
        }
    }
    
    /**
     * Clear font cache
     */
    clearCache() {
        try {
            localStorage.removeItem(this.fontsCacheKey);
            console.log('[FontLoader] Font cache cleared');
        } catch (error) {
            console.warn('[FontLoader] Could not clear font cache:', error);
        }
    }
}

// Initialize font loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const fontLoader = new FontLoader();
        fontLoader.init();
    });
} else {
    const fontLoader = new FontLoader();
    fontLoader.init();
}