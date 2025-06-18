---
title: Multi-Search Engine Tool
tags: [tools, search, productivity]
author: Wiki Admin
created: 2025-01-18
description: Search multiple search engines with one keyword input
---

# Multi-Search Engine Tool

This page demonstrates a multi-search tool that lets you search different search engines with a single keyword input.

## Quick Search Tool

<div class="multi-search-container">
    <div class="search-input-group">
        <input type="text" 
               id="multi-search-input" 
               class="multi-search-input" 
               placeholder="Enter search keywords..." 
               onkeypress="if(event.key === 'Enter') searchMulti('google')">
        <button class="clear-search-btn" onclick="clearMultiSearch()" title="Clear search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.28 4.22a.75.75 0 00-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z"/>
            </svg>
        </button>
    </div>
    
    <div class="search-engines-grid">
        <!-- General Search Engines -->
        <div class="search-category">
            <h3>🔍 General Search</h3>
            <div class="search-buttons">
                <button class="search-engine-btn google" onclick="searchMulti('google')" title="Search with Google">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                </button>
                <button class="search-engine-btn bing" onclick="searchMulti('bing')" title="Search with Bing">
                    <span class="bing-logo">B</span>
                    Bing
                </button>
                <button class="search-engine-btn duckduckgo" onclick="searchMulti('duckduckgo')" title="Search with DuckDuckGo">
                    <span class="duck-logo">🦆</span>
                    DuckDuckGo
                </button>
                <button class="search-engine-btn brave" onclick="searchMulti('brave')" title="Search with Brave">
                    <span class="brave-logo">🦁</span>
                    Brave
                </button>
            </div>
        </div>
        
        <!-- Developer Resources -->
        <div class="search-category">
            <h3>👨‍💻 Developer</h3>
            <div class="search-buttons">
                <button class="search-engine-btn stackoverflow" onclick="searchMulti('stackoverflow')" title="Search Stack Overflow">
                    <span class="so-logo">SO</span>
                    Stack Overflow
                </button>
                <button class="search-engine-btn github" onclick="searchMulti('github')" title="Search GitHub">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                </button>
                <button class="search-engine-btn mdn" onclick="searchMulti('mdn')" title="Search MDN">
                    <span class="mdn-logo">MDN</span>
                    MDN Docs
                </button>
                <button class="search-engine-btn npm" onclick="searchMulti('npm')" title="Search npm">
                    <span class="npm-logo">npm</span>
                    npm
                </button>
            </div>
        </div>
        
        <!-- Knowledge & Reference -->
        <div class="search-category">
            <h3>📚 Knowledge</h3>
            <div class="search-buttons">
                <button class="search-engine-btn wikipedia" onclick="searchMulti('wikipedia')" title="Search Wikipedia">
                    <span class="wiki-logo">W</span>
                    Wikipedia
                </button>
                <button class="search-engine-btn youtube" onclick="searchMulti('youtube')" title="Search YouTube">
                    <span class="yt-logo">▶</span>
                    YouTube
                </button>
                <button class="search-engine-btn reddit" onclick="searchMulti('reddit')" title="Search Reddit">
                    <span class="reddit-logo">R</span>
                    Reddit
                </button>
                <button class="search-engine-btn arxiv" onclick="searchMulti('arxiv')" title="Search arXiv">
                    <span class="arxiv-logo">arXiv</span>
                    arXiv
                </button>
            </div>
        </div>
        
        <!-- Shopping -->
        <div class="search-category">
            <h3>🛒 Shopping</h3>
            <div class="search-buttons">
                <button class="search-engine-btn amazon" onclick="searchMulti('amazon')" title="Search Amazon">
                    <span class="amazon-logo">A</span>
                    Amazon
                </button>
                <button class="search-engine-btn ebay" onclick="searchMulti('ebay')" title="Search eBay">
                    <span class="ebay-logo">e</span>
                    eBay
                </button>
                <button class="search-engine-btn etsy" onclick="searchMulti('etsy')" title="Search Etsy">
                    <span class="etsy-logo">E</span>
                    Etsy
                </button>
            </div>
        </div>
    </div>
    
    <div class="search-history">
        <h3>Recent Searches</h3>
        <ul id="search-history-list" class="search-history-list">
            <li class="empty-history">No recent searches</li>
        </ul>
    </div>
</div>

<style>
.multi-search-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.search-input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.multi-search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
    background: var(--bg-primary);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
    border-radius: 8px;
    transition: all 0.2s ease;
}

.multi-search-input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-primary-alpha);
}

.clear-search-btn {
    padding: 0.75rem;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.clear-search-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.search-engines-grid {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
}

.search-category {
    background: var(--bg-primary);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.search-category h3 {
    margin: 0 0 1rem 0;
    font-size: 1.125rem;
    color: var(--text-primary);
}

.search-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
}

.search-engine-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.search-engine-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Search Engine Specific Styles */
.search-engine-btn.google:hover {
    background: #4285F4;
    color: white;
    border-color: #4285F4;
}

.search-engine-btn.bing:hover {
    background: #00809d;
    color: white;
    border-color: #00809d;
}

.search-engine-btn.duckduckgo:hover {
    background: #de5833;
    color: white;
    border-color: #de5833;
}

.search-engine-btn.brave:hover {
    background: #fb542b;
    color: white;
    border-color: #fb542b;
}

.search-engine-btn.stackoverflow:hover {
    background: #f48024;
    color: white;
    border-color: #f48024;
}

.search-engine-btn.github:hover {
    background: #24292e;
    color: white;
    border-color: #24292e;
}

.search-engine-btn.wikipedia:hover {
    background: #000;
    color: white;
    border-color: #000;
}

.search-engine-btn.youtube:hover {
    background: #ff0000;
    color: white;
    border-color: #ff0000;
}

.search-engine-btn.reddit:hover {
    background: #ff4500;
    color: white;
    border-color: #ff4500;
}

.search-engine-btn.amazon:hover {
    background: #ff9900;
    color: black;
    border-color: #ff9900;
}

/* Logo Styles */
.bing-logo {
    font-weight: bold;
    color: #00809d;
}

.duck-logo, .brave-logo {
    font-size: 1.125rem;
}

.so-logo {
    font-weight: bold;
    font-size: 0.75rem;
    padding: 0.125rem 0.25rem;
    background: #f48024;
    color: white;
    border-radius: 2px;
}

.mdn-logo {
    font-weight: bold;
    font-size: 0.75rem;
    color: #545454;
}

.npm-logo {
    font-weight: bold;
    color: #cb3837;
}

.wiki-logo {
    font-weight: bold;
    font-family: serif;
}

.yt-logo {
    color: #ff0000;
}

.reddit-logo {
    font-weight: bold;
    color: #ff4500;
}

.arxiv-logo {
    font-size: 0.875rem;
    font-weight: 600;
}

.amazon-logo {
    font-weight: bold;
    color: #ff9900;
}

.ebay-logo {
    font-weight: bold;
    color: #e53238;
    font-style: italic;
}

.etsy-logo {
    font-weight: bold;
    color: #f1641e;
}

/* Search History */
.search-history {
    background: var(--bg-primary);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.search-history h3 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--text-secondary);
}

.search-history-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.search-history-list li {
    padding: 0.5rem 0.75rem;
    background: var(--bg-secondary);
    border-radius: 4px;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-history-list li:last-child {
    margin-bottom: 0;
}

.empty-history {
    text-align: center;
    color: var(--text-tertiary);
    font-style: italic;
}

.history-keyword {
    font-weight: 500;
    color: var(--text-primary);
}

.history-engine {
    font-size: 0.75rem;
    color: var(--text-tertiary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .multi-search-container {
        padding: 1rem;
    }
    
    .search-buttons {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
    
    .search-engine-btn {
        font-size: 0.813rem;
        padding: 0.625rem 0.75rem;
    }
}
</style>

<script>
// Search engine URLs
const searchEngines = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    brave: 'https://search.brave.com/search?q=',
    stackoverflow: 'https://stackoverflow.com/search?q=',
    github: 'https://github.com/search?q=',
    mdn: 'https://developer.mozilla.org/en-US/search?q=',
    npm: 'https://www.npmjs.com/search?q=',
    wikipedia: 'https://en.wikipedia.org/w/index.php?search=',
    youtube: 'https://www.youtube.com/results?search_query=',
    reddit: 'https://www.reddit.com/search/?q=',
    arxiv: 'https://arxiv.org/search/?query=',
    amazon: 'https://www.amazon.com/s?k=',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=',
    etsy: 'https://www.etsy.com/search?q='
};

// Search history (stored in localStorage)
let searchHistory = JSON.parse(localStorage.getItem('multiSearchHistory') || '[]');

function searchMulti(engine) {
    const input = document.getElementById('multi-search-input');
    const keyword = input.value.trim();
    
    if (!keyword) {
        input.focus();
        return;
    }
    
    // Get the search URL
    const searchUrl = searchEngines[engine] + encodeURIComponent(keyword);
    
    // Open in new tab
    window.open(searchUrl, '_blank');
    
    // Add to history
    addToHistory(keyword, engine);
    
    // Optional: Clear input after search
    // input.value = '';
}

function clearMultiSearch() {
    document.getElementById('multi-search-input').value = '';
    document.getElementById('multi-search-input').focus();
}

function addToHistory(keyword, engine) {
    // Remove duplicates
    searchHistory = searchHistory.filter(item => 
        !(item.keyword === keyword && item.engine === engine)
    );
    
    // Add to beginning
    searchHistory.unshift({
        keyword: keyword,
        engine: engine,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 searches
    searchHistory = searchHistory.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('multiSearchHistory', JSON.stringify(searchHistory));
    
    // Update display
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('search-history-list');
    
    if (searchHistory.length === 0) {
        historyList.innerHTML = '<li class="empty-history">No recent searches</li>';
        return;
    }
    
    historyList.innerHTML = searchHistory.map(item => `
        <li>
            <span class="history-keyword">${item.keyword}</span>
            <span class="history-engine">${item.engine}</span>
        </li>
    `).join('');
}

// Initialize history display on page load
document.addEventListener('DOMContentLoaded', updateHistoryDisplay);
</script>

## How to Use

1. **Enter Keywords**: Type your search terms in the input box
2. **Choose Search Engine**: Click any button to search with that specific engine
3. **Quick Search**: Press Enter to search with Google (default)
4. **Clear Input**: Click the ✕ button to clear the search box
5. **View History**: Your last 10 searches are shown below

## Features

- **Multiple Search Engines**: Search across 15+ different platforms
- **Categorized**: Organized by search type (General, Developer, Knowledge, Shopping)
- **Search History**: Tracks your recent searches (stored locally)
- **Keyboard Support**: Press Enter to quickly search with Google
- **New Tab Opening**: All searches open in new tabs to preserve your current page
- **Mobile Friendly**: Responsive design works on all devices

## Customization Tips

You can easily add more search engines by modifying the JavaScript:

```javascript
// Add a new search engine
searchEngines.mysite = 'https://mysite.com/search?q=';

// Then add a button in the HTML
<button class="search-engine-btn" onclick="searchMulti('mysite')">
    My Site
</button>
```

## Privacy Note

- All searches open in new tabs
- Search history is stored locally in your browser only
- No data is sent to any external servers
- Clear your browser's localStorage to remove search history