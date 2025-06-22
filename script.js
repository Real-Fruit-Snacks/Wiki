/**
 * Notes Wiki Application
 * A self-contained static notes/wiki site for GitLab Pages
 */

class NotesWiki {
    constructor() {
        this.notesIndex = null;
        this.currentNote = null;
        this.currentNotePath = null;
        this.searchIndex = [];
        this.recentFiles = [];
        this.bookmarks = [];
        this.selectedTags = new Set();
        this.excludedTags = new Set();
        this.tagFilterMode = 'OR'; // 'OR' or 'AND'
        this.activeContext = null;  // Track active context
        this.contexts = [];  // Store available contexts
        this.initialHash = window.location.hash;  // Store initial hash for later processing
        
        // Determine base path for GitHub Pages compatibility
        this.basePath = this.getBasePath();
        
        // Tab management
        this.tabs = new Map(); // Map of tab ID to tab data
        this.activeTabId = null;
        this.tabIdCounter = 0;
        this.tabContents = new Map(); // Map of tab ID to content HTML
        this.draggedTabId = null; // For drag and drop
        
        // Split view
        this.activePaneId = null;
        
        // Sticky notes
        // Organized themes by category
        this.themeCategories = [
            {
                name: 'Classic Dark',
                themes: [
                    { id: 'dark', name: 'Dark', description: 'Modern dark theme with subtle blue accents' },
                    { id: 'dracula', name: 'Dracula', description: 'Vampire purple theme with pink accents and glow effects' },
                    { id: 'halcyon', name: 'Halcyon', description: 'Soft, muted dark theme with gentle accents' },
                    { id: 'monokai', name: 'Monokai', description: 'Vibrant colors with animated rainbow effects' },
                    { id: 'night-owl', name: 'Night Owl', description: 'Popular theme by Sarah Drasner with rich blues' },
                    { id: 'one-dark-pro', name: 'One Dark Pro', description: 'Atom-inspired theme with tech grid effects' },
                    { id: 'tomorrow-night', name: 'Tomorrow Night', description: 'Clean dark theme with smooth animations' },
                    { id: 'zenburn', name: 'Zenburn', description: 'Low contrast zen theme with calming effects' }
                ]
            },
            {
                name: 'Classic Light',
                themes: [
                    { id: 'atom-one-light', name: 'Atom One Light', description: 'Clean bright theme with gradient accents' },
                    { id: 'github-light', name: 'GitHub Light', description: 'Modern GitHub theme with clean shadows' },
                    { id: 'light', name: 'Light', description: 'Modern light theme with glassmorphism effects' },
                    { id: 'solarized-light', name: 'Solarized Light', description: 'Precision colors with warm paper effects' }
                ]
            },
            {
                name: 'Material Design',
                themes: [
                    { id: 'material-darker', name: 'Material Darker', description: 'Material You design with ripple effects' },
                    { id: 'material-ocean', name: 'Material Ocean', description: 'Ocean-themed Material with wave animations' },
                    { id: 'material-palenight', name: 'Material Palenight', description: 'Purple Material theme with aurora effects' }
                ]
            },
            {
                name: 'Nature & Earth',
                themes: [
                    { id: 'ayu-light', name: 'Ayu Light', description: 'Earthy light theme with warm nature tones' },
                    { id: 'bear', name: 'Bear', description: 'Minimalist warm brown/beige theme for comfortable reading' },
                    { id: 'everforest-dark', name: 'Everforest Dark', description: 'Deep forest theme with organic animations' },
                    { id: 'gruvbox-dark', name: 'Gruvbox Dark', description: 'Retro warm theme with CRT effects' },
                    { id: 'gruvbox-light', name: 'Gruvbox Light', description: 'Vintage paper theme with warm accents' },
                    { id: 'kanagawa', name: 'Kanagawa', description: 'Japanese zen theme with wave animations' },
                    { id: 'rose-pine', name: 'Rosé Pine', description: 'Rose-inspired theme with petal animations' },
                    { id: 'rose-pine-dawn', name: 'Rosé Pine Dawn', description: 'Dawn light theme with sunrise effects' }
                ]
            },
            {
                name: 'Arctic & Winter',
                themes: [
                    { id: 'nord', name: 'Nord', description: 'Arctic theme with aurora and ice effects' },
                    { id: 'nordic', name: 'Nordic', description: 'Cozy cabin theme with fireplace glow' },
                    { id: 'winter-is-coming-dark', name: 'Winter is Coming Dark', description: 'Frosty dark theme with snowfall' },
                    { id: 'winter-is-coming-light', name: 'Winter is Coming Light', description: 'Light winter theme with ice crystals' }
                ]
            },
            {
                name: 'Ocean & Sky',
                themes: [
                    { id: 'ayu-dark', name: 'Ayu Dark', description: 'Rich dark theme with warm accents' },
                    { id: 'ayu-mirage', name: 'Ayu Mirage', description: 'Balanced theme with warm undertones' },
                    { id: 'base16-ocean', name: 'Base16 Ocean', description: 'Classic Base16 ocean variant with cool blues' },
                    { id: 'bluloco-dark', name: 'Bluloco Dark', description: 'Electric blue dark theme with vibrant accents' },
                    { id: 'bluloco-light', name: 'Bluloco Light', description: 'Sophisticated blue light theme' },
                    { id: 'cobalt2', name: 'Cobalt2', description: 'Wes Bos theme with electric neon effects' },
                    { id: 'firefly', name: 'Firefly', description: 'Dark blue theme with bright glowing accents' },
                    { id: 'iceberg', name: 'Iceberg', description: 'Cool blue-gray theme with icy feel' },
                    { id: 'noctis', name: 'Noctis', description: 'Ocean-inspired theme with wave effects' },
                    { id: 'oceanic-next', name: 'Oceanic Next', description: 'Deep ocean blue theme with vibrant accents' },
                    { id: 'spacegray', name: 'Spacegray', description: 'Minimal space theme with starfield' }
                ]
            },
            {
                name: 'Cyberpunk & Neon',
                themes: [
                    { id: '2077', name: '2077 Theme', description: 'Cyberpunk 2077 with neon glow and scan lines' },
                    { id: 'city-lights', name: 'City Lights', description: 'Dark theme with vibrant cyan and pink accents' },
                    { id: 'cyberpunk', name: 'Cyberpunk', description: 'Dystopian theme with glitch effects' },
                    { id: 'matrix', name: 'Matrix', description: 'Terminal green with falling code rain' },
                    { id: 'outrun', name: 'Outrun', description: 'Electric blues and hot pinks with intense neon glow' },
                    { id: 'snazzy', name: 'Snazzy', description: 'Terminal-inspired colorful theme with bright accents' },
                    { id: 'synthwave-84', name: 'Synthwave \'84', description: 'Retro neon aesthetic with vibrant synthwave colors' },
                    { id: 'tokyo-night', name: 'Tokyo Night', description: 'Tokyo neon theme with cyberpunk effects' },
                    { id: 'vaporwave', name: 'Vaporwave', description: 'Retro 80s theme with VHS glitch effects' }
                ]
            },
            {
                name: 'Elegant & Pastel',
                themes: [
                    { id: 'andromeda', name: 'Andromeda', description: 'Dark theme with distinctive purple accents' },
                    { id: 'catppuccin-latte', name: 'Catppuccin Latte', description: 'Warm pastel light theme with cozy effects' },
                    { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', description: 'Dark pastel theme with glass effects' },
                    { id: 'horizon', name: 'Horizon', description: 'Warm dark theme with orange and pink accents' },
                    { id: 'lucario', name: 'Lucario', description: 'Minimal pastel theme with soft glows' },
                    { id: 'moonlight', name: 'Moonlight', description: 'Beautiful purple and blue dark theme' },
                    { id: 'palenight', name: 'Palenight', description: 'Elegant purple theme with aurora effects' },
                    { id: 'shades-of-purple', name: 'Shades of Purple', description: 'Magical purple theme with particle effects' },
                    { id: 'soft-era', name: 'Soft Era', description: 'Low contrast pastel theme with gentle colors' },
                    { id: 'witch-hazel', name: 'Witch Hazel', description: 'Mystical theme with magical animations' }
                ]
            },
            {
                name: 'Professional',
                themes: [
                    { id: 'apprentice', name: 'Apprentice', description: 'Low-contrast dark theme for long coding sessions' },
                    { id: 'flatland', name: 'Flatland', description: 'Flat design dark theme with minimal shadows' },
                    { id: 'github-dark', name: 'GitHub Dark', description: 'GitHub\'s modern developer theme' },
                    { id: 'material', name: 'Material', description: 'Original Material Design theme' },
                    { id: 'oxocarbon', name: 'Oxocarbon', description: 'IBM Carbon theme with grid patterns' },
                    { id: 'protonmail', name: 'ProtonMail', description: 'Privacy-focused theme with security effects' },
                    { id: 'solarized-dark', name: 'Solarized Dark', description: 'Classic theme with modern animations' },
                    { id: 'thinkultra', name: 'ThinkUltra', description: 'ThinkPad-inspired with LED indicators' },
                    { id: 'vim', name: 'Vim', description: 'Classic Vim dark colorscheme' },
                    { id: 'vscode-dark-plus', name: 'VSCode Dark+', description: 'Modern VSCode theme with IntelliSense glow' }
                ]
            },
            {
                name: 'Special Effects',
                themes: [
                    { id: 'hackthebox', name: 'HackTheBox', description: 'Hacker terminal theme with sweep effects' },
                    { id: 'hotdog-stand', name: 'Hot Dog Stand', description: 'Windows 3.1 retro theme with pixel cursors' },
                    { id: 'panda', name: 'Panda', description: 'High contrast theme with distinctive green accents' }
                ]
            }
        ];
        
        // Flatten themes for compatibility
        this.themes = this.themeCategories.flatMap(category => category.themes);
        
        // Settings
        this.settings = {
            trackRecent: true,
            showLineNumbers: true,
            enableWordWrap: true,
            recentLimit: 20,
            theme: 'ayu-mirage',
            autoTheme: false, // Enable automatic theme switching based on system preferences
            activeContext: null,  // Store active context in settings
            stickySearch: false,  // Keep search query when reopening search
            contentWidth: 'narrow',  // Default to narrow width
            focusMode: false, // Focus mode state
            showTableOfContents: false, // Show/hide table of contents for notes with multiple headings
            splitViewEnabled: false, // Split view state
            // New settings
            defaultHomePage: 'home', // 'home', 'last-viewed', 'specific'
            specificHomeNote: '', // Path to specific note
            externalLinksNewTab: true,
            fontSize: 'normal', // 'small', 'normal', 'large', 'extra-large'
            fontFamily: 'monospace', // 'system', 'sans-serif', 'serif', 'monospace'
            defaultCodeLanguage: 'bash',
            customCSS: '',
            keyboardShortcuts: {
                'new-tab': 'Ctrl+T',
                'search': 'Ctrl+K',
                'settings': 'Ctrl+,',
                'filter': 'Ctrl+F',
                'bookmark': 'Ctrl+D'
            },
            // Pomodoro settings
            pomodoroEnabled: true,
            pomodoroWorkMinutes: 25,
            pomodoroShortBreakMinutes: 5,
            pomodoroLongBreakMinutes: 15,
            pomodoroSessionsBeforeLongBreak: 4,
            pomodoroAutoStartNext: false,
            pomodoroPlaySounds: true,
            // Confirm dialogs
            confirmOnClose: true
        };
        
        // Search state
        this.lastSearchQuery = '';
        
        // Timer state
        this.timerStartTime = null;
        this.timerInterval = null;
        this.timerElapsed = 0;
        this.timerRunning = false;
        this.resetPressTimer = null;
        this.resetPressed = false;
        
        // Pomodoro state
        this.pomodoroMode = 'work'; // 'work', 'short-break', 'long-break'
        this.pomodoroSessionCount = 0;
        this.pomodoroTargetTime = 0; // Target time in milliseconds
        
        this.init();
    }
    
    getBasePath() {
        // Detect if we're running on GitHub/GitLab Pages or locally
        const pathname = window.location.pathname;
        const hostname = window.location.hostname;
        
        console.log('[Path Detection] Current pathname:', pathname);
        console.log('[Path Detection] Current hostname:', hostname);
        
        // Local development - no base path needed
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
            console.log('[Path Detection] Local development detected');
            return '';
        }
        
        // GitHub Pages pattern: username.github.io/repository-name/
        if (hostname.includes('github.io')) {
            // Extract the first path segment as the repository name
            const pathSegments = pathname.split('/').filter(segment => segment);
            if (pathSegments.length > 0) {
                const basePath = '/' + pathSegments[0] + '/';
                console.log('[Path Detection] GitHub Pages detected, base path:', basePath);
                return basePath;
            }
        }
        
        // GitLab Pages pattern: username.gitlab.io/project-name/
        // or custom domain with project path
        if (hostname.includes('gitlab.io') || pathname.split('/').filter(s => s).length > 0) {
            // For GitLab Pages, if we're not at the root, assume first segment is project
            const pathSegments = pathname.split('/').filter(segment => segment);
            
            // If the pathname ends with index.html or a specific file, don't include it
            const lastSegment = pathSegments[pathSegments.length - 1];
            const isFile = lastSegment && (lastSegment.includes('.html') || lastSegment.includes('.'));
            
            if (pathSegments.length > 0 && !isFile) {
                const basePath = '/' + pathSegments[0] + '/';
                console.log('[Path Detection] GitLab Pages detected, base path:', basePath);
                return basePath;
            } else if (pathSegments.length > 1) {
                // If we have a file, use the first segment
                const basePath = '/' + pathSegments[0] + '/';
                console.log('[Path Detection] GitLab Pages with file detected, base path:', basePath);
                return basePath;
            }
        }
        
        // Default: no base path
        console.log('[Path Detection] No specific pattern detected, using root path');
        return '';
    }
    
    async init() {
        try {
            // Load settings from localStorage
            this.loadSettings();
            
            // Initialize theme
            this.initializeTheme();
            
            // Apply focus mode if it was enabled
            this.initializeFocusMode();
            
            // Initialize Pomodoro mode
            this.initializePomodoroMode();
        
        // Apply line number setting
        this.applyLineNumberSetting();
        
        // Apply word wrap setting
        this.applyWordWrapSetting();
        
        // Apply content width setting (skip if focus mode is active, as it handles its own width)
        if (!this.settings.focusMode) {
            this.applyContentWidthSetting();
        }
        
        // Apply font settings
        this.applyFontSettings();
        
        // Apply custom CSS
        this.applyCustomCSS();
        
        // Load notes index
        await this.loadNotesIndex();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Handle initial route - tabs will handle this now
        // if (this.initialHash && window.location.hash !== this.initialHash) {
        //     window.location.hash = this.initialHash;
        // } else {
        //     this.handleRoute();
        // }
        
        // Load recent files
        this.loadRecentFiles();
        
        // Load bookmarks
        this.loadBookmarks();
        
        // Initialize quick notes panel
        this.initializeQuickNotes();
        
        // Populate theme picker
        this.populateThemePicker();
        
            // Build context switcher
            this.buildContextSwitcher();
            
            // Initialize tab system
            this.initializeTabs();
            
            // Setup page lifecycle cleanup handlers
            this.setupCleanupHandlers();
        } catch (error) {
            console.error('Failed to initialize application:', error);
            
            // Show user-friendly error message
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = `
                    <div class="content-wrapper content-view">
                        <h1>Application Error</h1>
                        <p>The Notes Wiki application failed to initialize properly.</p>
                        <p><strong>Error:</strong> ${error.message}</p>
                        <p>Please refresh the page to try again.</p>
                        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-primary); color: white; border: none; border-radius: 4px; cursor: pointer;">Refresh Page</button>
                    </div>
                `;
            }
        }
    }
    
    async loadNotesIndex() {
        try {
            const indexPath = this.basePath ? `${this.basePath}notes-index.json` : 'notes-index.json';
            const response = await fetch(indexPath);
            this.notesIndex = await response.json();
            
            // Expose index state for debugging
            window.notesIndex = this.notesIndex;
            
            // Store contexts
            this.contexts = this.notesIndex.contexts || [];
            
            // Build search index
            this.buildSearchIndex();
            
            // Build navigation tree
            this.buildNavigationTree();
            
            // Build tag filter
            this.buildTagFilter();
            
            // Initialize tag count badge
            this.updateTagCountBadge();
        } catch (error) {
            console.error('Failed to load notes index:', error);
            // Fallback to basic structure if index doesn't exist
            this.notesIndex = {
                notes: [{
                    path: '/notes/index.md',
                    metadata: {
                        title: 'Welcome',
                        tags: ['getting-started'],
                        created: new Date().toISOString().split('T')[0],
                        author: 'System',
                        description: 'Welcome to Notes Wiki'
                    }
                }],
                tags: { 'getting-started': 1 },
                authors: ['System'],
                categories: []
            };
        }
    }
    
    buildSearchIndex() {
        // Ensure notes index is loaded
        if (!this.notesIndex || !this.notesIndex.notes) {
            this.searchIndex = [];
            return;
        }
        
        // Filter notes by active context
        const notes = this.activeContext 
            ? this.notesIndex.notes.filter(note => note.context === this.activeContext)
            : this.notesIndex.notes;
            
        this.searchIndex = notes.map(note => ({
            path: note.path,
            title: note.metadata.title || '',
            description: note.metadata.description || '',
            tags: note.metadata.tags || [],
            author: note.metadata.author || '',
            content: note.searchable_content || note.content_preview || '',
            context: note.context,
            codeBlocksCount: note.code_blocks_count || 0
        }));
        
    }
    
    buildNavigationTree() {
        const fileTree = document.getElementById('file-tree');
        fileTree.innerHTML = '';
        
        // Filter notes by active context
        const notes = this.activeContext 
            ? this.notesIndex.notes.filter(note => note.context === this.activeContext)
            : this.notesIndex.notes;
        
        // Group notes by directory
        const tree = {};
        notes.forEach(note => {
            const parts = note.path.split('/').filter(p => p);
            
            // Skip the "notes" folder by starting from index 1
            let adjustedParts = parts[0] === 'notes' ? parts.slice(1) : parts;
            
            // For display purposes only: if we have an active context and the first folder matches it, skip it
            let displayParts = [...adjustedParts];
            if (this.activeContext && displayParts.length > 0 && 
                displayParts[0].toLowerCase() === this.activeContext.toLowerCase()) {
                displayParts = displayParts.slice(1);
            }
            
            let current = tree;
            
            displayParts.forEach((part, index) => {
                if (index === displayParts.length - 1) {
                    // File - store the full note object with original path
                    current[part] = note;
                } else {
                    // Directory
                    if (!current[part]) {
                        current[part] = {};
                    }
                    current = current[part];
                }
            });
        });
        
        // Render tree
        const renderTree = (node, path = '', level = 0) => {
            const ul = document.createElement('ul');
            ul.className = 'file-tree' + (level > 0 ? ' file-tree-folder' : '');
            
            Object.entries(node).sort(([aKey, aValue], [bKey, bValue]) => {
                const aDisplayName = aValue.path ? (aValue.metadata.title || aKey.replace('.md', '')) : aKey;
                const bDisplayName = bValue.path ? (bValue.metadata.title || bKey.replace('.md', '')) : bKey;
                return aDisplayName.localeCompare(bDisplayName);
            }).forEach(([name, value]) => {
                const li = document.createElement('li');
                li.className = 'file-tree-item';
                
                if (value.path) {
                    // It's a file
                    const a = document.createElement('a');
                    a.href = `#${value.path}`;
                    a.className = 'file-tree-link';
                    a.textContent = value.metadata.title || name.replace('.md', '');
                    a.dataset.path = value.path;
                    
                    // Add click handler
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        
                        // Check if should open in new tab
                        if (e.ctrlKey || e.metaKey) {
                            this.openInNewTab(value.path);
                        } else {
                            // Check if note is already open in another tab
                            const existingTabId = this.findTabByPath(value.path);
                            if (existingTabId && existingTabId !== this.activeTabId) {
                                // Switch to existing tab
                                this.switchToTab(existingTabId);
                            } else {
                                // Check if current tab is pinned
                                const tab = this.tabs.get(this.activeTabId);
                                if (tab && tab.isPinned) {
                                    // Open in new tab if current tab is pinned
                                    this.openInNewTab(value.path);
                                } else if (tab) {
                                    // Update current tab
                                    tab.path = value.path;
                                    this.loadNote(value.path);
                                }
                            }
                        }
                    });
                    
                    // Handle middle-click
                    a.addEventListener('mousedown', (e) => {
                        if (e.button === 1) {
                            e.preventDefault();
                            this.openInNewTab(value.path);
                        }
                    });
                    
                    // Handle right-click context menu
                    a.addEventListener('contextmenu', (e) => {
                        this.showNoteContextMenu(e, value.path, value.metadata.title || name.replace('.md', ''));
                    });
                    
                    li.appendChild(a);
                } else {
                    // It's a folder
                    li.classList.add('file-tree-folder-item');
                    
                    const folderHeader = document.createElement('div');
                    folderHeader.className = 'file-tree-folder-header';
                    
                    // Add expand/collapse icon
                    const icon = document.createElement('span');
                    icon.className = 'folder-icon';
                    icon.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
                        </svg>
                    `;
                    
                    const folderName = document.createElement('span');
                    folderName.className = 'file-tree-folder-name';
                    folderName.textContent = name;
                    
                    folderHeader.appendChild(icon);
                    folderHeader.appendChild(folderName);
                    
                    // Add click handler for expand/collapse
                    folderHeader.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                        this.updateExpandButtonState();
                    });
                    
                    li.appendChild(folderHeader);
                    
                    const subTree = renderTree(value, path + '/' + name, level + 1);
                    li.appendChild(subTree);
                }
                
                ul.appendChild(li);
            });
            
            return ul;
        };
        
        fileTree.appendChild(renderTree(tree));
        
        // Update expand button state after building tree
        this.updateExpandButtonState();
        
        // Update drag state for split view
        this.updateFileTreeDragState();
    }
    
    buildTagFilter() {
        const modalTagFilter = document.getElementById('modal-tag-filter');
        modalTagFilter.innerHTML = '';
        
        // Filter notes by active context
        const notes = this.activeContext 
            ? this.notesIndex.notes.filter(note => note.context === this.activeContext)
            : this.notesIndex.notes;
        
        // Rebuild tags count based on filtered notes
        const contextTags = {};
        notes.forEach(note => {
            if (note.metadata.tags && Array.isArray(note.metadata.tags)) {
                note.metadata.tags.forEach(tag => {
                    contextTags[tag] = (contextTags[tag] || 0) + 1;
                });
            }
        });
        
        // Sort tags alphabetically
        const sortedTags = Object.entries(contextTags).sort((a, b) => a[0].localeCompare(b[0]));
        
        // Store all tags for filtering
        this.allTags = sortedTags;
        
        sortedTags.forEach(([tag, count]) => {
            const pill = document.createElement('button');
            pill.className = 'tag-pill';
            pill.dataset.tagName = tag; // Add data attribute for easier filtering
            pill.innerHTML = `
                <span class="tag-name">${tag}</span>
                <span class="tag-count">${count}</span>
            `;
            
            if (this.selectedTags.has(tag)) {
                pill.classList.add('active');
            }
            if (this.excludedTags.has(tag)) {
                pill.classList.add('excluded');
            }
            
            pill.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    // Ctrl+click to exclude
                    if (this.excludedTags.has(tag)) {
                        this.excludedTags.delete(tag);
                        pill.classList.remove('excluded');
                    } else {
                        this.excludedTags.add(tag);
                        pill.classList.add('excluded');
                        // Remove from selected if excluded
                        this.selectedTags.delete(tag);
                        pill.classList.remove('active');
                    }
                } else {
                    // Normal click to select
                    if (this.selectedTags.has(tag)) {
                        this.selectedTags.delete(tag);
                        pill.classList.remove('active');
                    } else {
                        this.selectedTags.add(tag);
                        pill.classList.add('active');
                        // Remove from excluded if selected
                        this.excludedTags.delete(tag);
                        pill.classList.remove('excluded');
                    }
                }
                this.filterNotesByTags();
                this.updateTagsUI();
            });
            
            // Right-click to exclude
            pill.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (this.excludedTags.has(tag)) {
                    this.excludedTags.delete(tag);
                    pill.classList.remove('excluded');
                } else {
                    this.excludedTags.add(tag);
                    pill.classList.add('excluded');
                    // Remove from selected if excluded
                    this.selectedTags.delete(tag);
                    pill.classList.remove('active');
                }
                this.filterNotesByTags();
                this.updateTagsUI();
            });
            
            modalTagFilter.appendChild(pill);
        });
        
        this.updateTagsUI();
    }
    
    filterNotesByTags() {
        if (this.selectedTags.size === 0 && this.excludedTags.size === 0) {
            // Show all notes
            this.buildNavigationTree();
            return;
        }
        
        // Filter notes by active context first
        const contextNotes = this.activeContext 
            ? this.notesIndex.notes.filter(note => note.context === this.activeContext)
            : this.notesIndex.notes;
        
        // Filter notes by selected tags based on tag filter mode
        const filteredNotes = contextNotes.filter(note => {
            const noteTags = new Set(note.metadata.tags || []);
            
            // Check excluded tags first (NOT logic)
            if (this.excludedTags.size > 0) {
                const hasExcludedTag = Array.from(this.excludedTags).some(tag => noteTags.has(tag));
                if (hasExcludedTag) return false;
            }
            
            // If no selected tags, include all non-excluded notes
            if (this.selectedTags.size === 0) return true;
            
            // Apply AND/OR logic based on mode
            if (this.tagFilterMode === 'AND') {
                // AND logic - show notes with ALL selected tags
                return Array.from(this.selectedTags).every(tag => noteTags.has(tag));
            } else {
                // OR logic - show notes with ANY selected tag
                return Array.from(this.selectedTags).some(tag => noteTags.has(tag));
            }
        });
        
        // Update navigation with filtered notes
        const tempIndex = { ...this.notesIndex, notes: filteredNotes };
        const originalIndex = this.notesIndex;
        this.notesIndex = tempIndex;
        this.buildNavigationTree();
        this.notesIndex = originalIndex;
    }
    
    setupEventListeners() {
        // Sidebar toggle
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            this.closeAllDropdowns();
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                // Check if focus mode is active
                if (this.settings.focusMode) {
                    // In focus mode, don't allow sidebar toggle
                    this.showToast('Exit focus mode to access sidebar', 'info');
                    return;
                }
                sidebar.classList.toggle('open');
            }
        });
        
        // Folder expand/collapse all buttons
        document.getElementById('expand-all-folders').addEventListener('click', () => {
            this.expandAllFolders();
        });
        
        document.getElementById('collapse-all-folders').addEventListener('click', () => {
            this.collapseAllFolders();
        });
        
        // Search toggle
        document.getElementById('search-toggle').addEventListener('click', () => {
            this.closeAllDropdowns();
            this.showSearch();
        });
        
        // Close search
        document.getElementById('close-search').addEventListener('click', () => {
            this.hideSearch();
        });
        
        // Search input with debouncing to improve performance
        let searchTimeout;
        document.getElementById('search-input').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 150); // 150ms debounce delay
        });
        
        // Sticky search checkbox
        document.getElementById('sticky-search').addEventListener('change', (e) => {
            this.settings.stickySearch = e.target.checked;
            this.saveSettings();
            
            if (!e.target.checked) {
                // Clear saved search query when disabling sticky search
                this.lastSearchQuery = '';
            }
        });
        
        // Recent files dropdown
        const recentDropdown = document.getElementById('recent-dropdown');
        recentDropdown.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click handler
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== recentDropdown) {
                    d.classList.remove('active');
                }
            });
            recentDropdown.classList.toggle('active');
        });
        
        // Clear recent files
        document.getElementById('clear-recent').addEventListener('click', () => {
            this.clearRecentFiles();
        });
        
        // Bookmarks dropdown
        const bookmarksDropdown = document.getElementById('bookmarks-dropdown');
        bookmarksDropdown.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click handler
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== bookmarksDropdown) {
                    d.classList.remove('active');
                }
            });
            bookmarksDropdown.classList.toggle('active');
        });
        
        // Prevent scroll propagation in dropdown lists
        const preventScrollPropagation = (element) => {
            element.addEventListener('wheel', (e) => {
                const scrollTop = element.scrollTop;
                const scrollHeight = element.scrollHeight;
                const height = element.offsetHeight;
                const delta = e.deltaY;
                const up = delta < 0;
                
                // Prevent scroll if we're at the top and scrolling up
                // or at the bottom and scrolling down
                if (!up && scrollHeight - height - scrollTop <= 1) {
                    e.preventDefault();
                } else if (up && scrollTop === 0) {
                    e.preventDefault();
                }
                
                // Always stop propagation to prevent body scroll
                e.stopPropagation();
            }, { passive: false });
        };
        
        // Apply to recent files list and its container
        const recentFilesList = document.getElementById('recent-files-list');
        if (recentFilesList) {
            preventScrollPropagation(recentFilesList);
        }
        const recentDropdownContent = document.getElementById('recent-dropdown-content');
        if (recentDropdownContent) {
            preventScrollPropagation(recentDropdownContent);
        }
        
        // Apply to bookmarks list and its container
        const bookmarksList = document.querySelector('.bookmarks-list');
        if (bookmarksList) {
            preventScrollPropagation(bookmarksList);
        }
        const bookmarksDropdownContent = document.getElementById('bookmarks-dropdown-content');
        if (bookmarksDropdownContent) {
            preventScrollPropagation(bookmarksDropdownContent);
        }
        
        // Apply to all dropdown content containers in header
        const headerDropdowns = document.querySelectorAll('.header .dropdown-content');
        headerDropdowns.forEach(dropdown => {
            preventScrollPropagation(dropdown);
        });
        
        // Additional comprehensive header scroll prevention
        const header = document.querySelector('.header');
        if (header) {
            header.addEventListener('wheel', (e) => {
                // Check if the target is a scrollable element
                const target = e.target.closest('.dropdown-content, .recent-files-list, .bookmarks-list, .context-dropdown-menu');
                if (target) {
                    // Let the specific element handlers deal with it
                    return;
                }
                
                // For any other elements in header, prevent scroll propagation to body
                const hasScrollableParent = e.target.closest('[style*="overflow"], .tab, .tabs-container');
                if (!hasScrollableParent) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, { passive: false });
        }
        
        // Fix scrolling in tabs container - convert vertical scroll to horizontal
        const tabsContainer = document.getElementById('tabs-container');
        if (tabsContainer) {
            tabsContainer.addEventListener('wheel', (e) => {
                // Prevent default vertical scrolling
                e.preventDefault();
                
                // Convert vertical scroll to horizontal scroll
                const scrollAmount = e.deltaY;
                tabsContainer.scrollLeft += scrollAmount;
                
                // Stop propagation to prevent body scroll
                e.stopPropagation();
            }, { passive: false });
        }
        
        // Theme dropdown is now in settings modal, no header event listener needed
        
        // Settings
        document.getElementById('settings-toggle').addEventListener('click', () => {
            this.closeAllDropdowns();
            this.showSettings();
        });
        
        document.getElementById('close-settings').addEventListener('click', () => {
            this.hideSettings();
        });
        
        // Tags modal
        document.getElementById('tags-button').addEventListener('click', () => {
            this.closeAllDropdowns();
            this.showTagsModal();
        });
        
        document.getElementById('close-tags').addEventListener('click', () => {
            this.hideTagsModal();
        });
        
        document.getElementById('clear-all-tags').addEventListener('click', () => {
            this.selectedTags.clear();
            this.excludedTags.clear();
            this.filterNotesByTags();
            this.buildTagFilter();
        });
        
        // Tag search input
        const tagSearchInput = document.getElementById('tag-search-input');
        const tagSearchClear = document.getElementById('tag-search-clear');
        
        if (tagSearchInput) {
            tagSearchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value;
                this.filterTagsBySearch(searchTerm);
                
                // Show/hide clear button
                if (searchTerm) {
                    tagSearchClear.style.display = 'block';
                } else {
                    tagSearchClear.style.display = 'none';
                }
            });
            
            // Clear search on Escape key
            tagSearchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    tagSearchInput.value = '';
                    tagSearchClear.style.display = 'none';
                    this.filterTagsBySearch('');
                }
            });
        }
        
        if (tagSearchClear) {
            tagSearchClear.addEventListener('click', () => {
                tagSearchInput.value = '';
                tagSearchClear.style.display = 'none';
                this.filterTagsBySearch('');
                tagSearchInput.focus();
            });
        }
        
        // Settings form
        document.getElementById('track-recent').addEventListener('change', (e) => {
            this.settings.trackRecent = e.target.checked;
            this.saveSettings();
        });
        
        document.getElementById('show-line-numbers').addEventListener('change', (e) => {
            this.settings.showLineNumbers = e.target.checked;
            this.saveSettings();
            this.applyLineNumberSetting();
        });
        
        document.getElementById('enable-word-wrap').addEventListener('change', (e) => {
            this.settings.enableWordWrap = e.target.checked;
            this.saveSettings();
            this.applyWordWrapSetting();
        });
        
        document.getElementById('show-table-of-contents').addEventListener('change', (e) => {
            this.settings.showTableOfContents = e.target.checked;
            this.saveSettings();
            // Regenerate or remove TOC based on setting
            if (this.settings.showTableOfContents) {
                this.generateTableOfContents();
            } else {
                // Remove existing TOC
                const existingToc = document.getElementById('table-of-contents');
                if (existingToc) {
                    existingToc.remove();
                }
            }
        });
        
        // Recent limit option pills
        const recentLimitOptions = document.getElementById('recent-limit-options');
        if (recentLimitOptions) {
            recentLimitOptions.addEventListener('click', (e) => {
                if (e.target.classList.contains('option-pill')) {
                    // Remove active class from all pills
                    recentLimitOptions.querySelectorAll('.option-pill').forEach(pill => {
                        pill.classList.remove('active');
                    });
                    // Add active class to clicked pill
                    e.target.classList.add('active');
                    // Update setting
                    this.settings.recentLimit = parseInt(e.target.dataset.value);
                    this.saveSettings();
                    this.showToast('Recent files limit updated');
                }
            });
        }
        
        // Content width option pills
        const contentWidthOptions = document.getElementById('content-width-options');
        if (contentWidthOptions) {
            contentWidthOptions.addEventListener('click', (e) => {
                if (e.target.classList.contains('option-pill')) {
                    // Remove active class from all pills
                    contentWidthOptions.querySelectorAll('.option-pill').forEach(pill => {
                        pill.classList.remove('active');
                    });
                    // Add active class to clicked pill
                    e.target.classList.add('active');
                    // Update setting
                    this.settings.contentWidth = e.target.dataset.value;
                    this.saveSettings();
                    this.applyContentWidthSetting();
                    this.showToast('Content width updated');
                }
            });
        }
        
        // Auto theme toggle - Note: requires 'auto-theme' checkbox in settings modal HTML
        const autoThemeCheckbox = document.getElementById('auto-theme');
        if (autoThemeCheckbox) {
            autoThemeCheckbox.addEventListener('change', (e) => {
                console.log(`[Theme Auto] Auto-theme toggled: ${e.target.checked}`);
                this.settings.autoTheme = e.target.checked;
                this.saveSettings();
                
                // Reinitialize theme based on new setting
                console.log('[Theme Auto] Reinitializing theme with auto-theme setting');
                this.initializeTheme();
                
                // Update theme cards state
                this.updateAutoThemeState();
            });
        } else {
            console.warn('[Theme Auto] Auto-theme checkbox not found in DOM');
        }
        
        // Sticky search toggle
        const stickySearchCheckbox = document.getElementById('sticky-search-setting');
        if (stickySearchCheckbox) {
            stickySearchCheckbox.addEventListener('change', (e) => {
                this.settings.stickySearch = e.target.checked;
                this.saveSettings();
            });
        }
        
        // Confirm on close toggle
        const confirmOnCloseCheckbox = document.getElementById('confirm-on-close');
        if (confirmOnCloseCheckbox) {
            confirmOnCloseCheckbox.addEventListener('change', (e) => {
                this.settings.confirmOnClose = e.target.checked;
                this.saveSettings();
            });
        }
        
        // Settings navigation buttons
        const settingsNavButtons = document.querySelectorAll('.settings-nav-item');
        settingsNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                const section = button.dataset.section;
                if (section) {
                    this.switchSettingsPanel(section);
                }
            });
        });
        
        // Settings search input
        const settingsSearchInput = document.getElementById('settings-search');
        if (settingsSearchInput) {
            settingsSearchInput.addEventListener('input', (e) => {
                this.filterSettings(e.target.value);
            });
        }
        
        // New settings handlers
        // Default home page setting
        const defaultHomePageSelect = document.getElementById('default-home-page');
        const specificHomeNoteInput = document.getElementById('specific-home-note');
        if (defaultHomePageSelect) {
            defaultHomePageSelect.value = this.settings.defaultHomePage;
            defaultHomePageSelect.addEventListener('change', (e) => {
                this.settings.defaultHomePage = e.target.value;
                this.saveSettings();
                
                // Show/hide specific note input
                if (e.target.value === 'specific') {
                    specificHomeNoteInput.style.display = 'block';
                } else {
                    specificHomeNoteInput.style.display = 'none';
                }
            });
            
            // Initialize visibility
            if (this.settings.defaultHomePage === 'specific') {
                specificHomeNoteInput.style.display = 'block';
            }
        }
        
        if (specificHomeNoteInput) {
            specificHomeNoteInput.value = this.settings.specificHomeNote;
            specificHomeNoteInput.addEventListener('input', (e) => {
                this.settings.specificHomeNote = e.target.value;
                this.saveSettings();
            });
        }
        
        // External links in new tabs
        const externalLinksCheckbox = document.getElementById('external-links-new-tab');
        if (externalLinksCheckbox) {
            externalLinksCheckbox.checked = this.settings.externalLinksNewTab;
            externalLinksCheckbox.addEventListener('change', (e) => {
                this.settings.externalLinksNewTab = e.target.checked;
                this.saveSettings();
            });
        }
        
        // Font size options
        const fontSizeOptions = document.getElementById('font-size-options');
        if (fontSizeOptions) {
            // Set initial active state
            const activeFontSize = fontSizeOptions.querySelector(`[data-value="${this.settings.fontSize}"]`);
            if (activeFontSize) activeFontSize.classList.add('active');
            
            fontSizeOptions.addEventListener('click', (e) => {
                if (e.target.classList.contains('option-pill')) {
                    fontSizeOptions.querySelectorAll('.option-pill').forEach(pill => {
                        pill.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    this.settings.fontSize = e.target.dataset.value;
                    this.saveSettings();
                    this.applyFontSettings();
                    this.showToast('Font size updated');
                }
            });
        }
        
        // Font family setting
        const fontFamilySelect = document.getElementById('font-family');
        if (fontFamilySelect) {
            fontFamilySelect.value = this.settings.fontFamily;
            fontFamilySelect.addEventListener('change', (e) => {
                this.settings.fontFamily = e.target.value;
                this.saveSettings();
                this.applyFontSettings();
                this.showToast('Font family updated');
            });
        }
        
        // Default code language setting
        const defaultCodeLanguageSelect = document.getElementById('default-code-language');
        if (defaultCodeLanguageSelect) {
            defaultCodeLanguageSelect.value = this.settings.defaultCodeLanguage;
            defaultCodeLanguageSelect.addEventListener('change', (e) => {
                this.settings.defaultCodeLanguage = e.target.value;
                this.saveSettings();
                this.showToast('Default code language updated');
            });
        }
        
        // Custom CSS editor
        const customCSSTextarea = document.getElementById('custom-css');
        const applyCustomCSSButton = document.getElementById('apply-custom-css');
        if (customCSSTextarea) {
            customCSSTextarea.value = this.settings.customCSS;
            
            if (applyCustomCSSButton) {
                applyCustomCSSButton.addEventListener('click', () => {
                    this.settings.customCSS = customCSSTextarea.value;
                    this.saveSettings();
                    this.applyCustomCSS();
                    this.showToast('Custom CSS applied');
                });
            }
        }
        
        // Keyboard shortcuts
        const resetShortcutsButton = document.getElementById('reset-shortcuts');
        if (resetShortcutsButton) {
            resetShortcutsButton.addEventListener('click', () => {
                this.settings.keyboardShortcuts = {
                    'new-tab': 'Ctrl+T',
                    'search': 'Ctrl+K',
                    'settings': 'Ctrl+,',
                    'filter': 'Ctrl+F'
                };
                this.saveSettings();
                
                // Update display
                document.querySelectorAll('.shortcut-key').forEach(input => {
                    const action = input.dataset.action;
                    if (action && this.settings.keyboardShortcuts[action]) {
                        input.value = this.settings.keyboardShortcuts[action];
                        input.classList.remove('editing');
                    }
                });
                
                this.showToast('Keyboard shortcuts reset to defaults');
            });
        }
        
        // Add keyboard shortcut editing functionality
        document.querySelectorAll('.shortcut-key').forEach(input => {
            // Click to start editing
            input.addEventListener('click', (e) => {
                e.preventDefault();
                input.classList.add('editing');
                input.value = '';
                input.placeholder = 'Press key combination...';
                input.focus();
            });
            
            // Capture key combination
            input.addEventListener('keydown', (e) => {
                if (!input.classList.contains('editing')) return;
                
                e.preventDefault();
                e.stopPropagation();
                
                // Build key combination string
                const keys = [];
                if (e.ctrlKey || e.metaKey) keys.push('Ctrl');
                if (e.altKey) keys.push('Alt');
                if (e.shiftKey) keys.push('Shift');
                
                // Get the actual key
                let key = e.key;
                if (key === ' ') key = 'Space';
                else if (key === 'Control' || key === 'Alt' || key === 'Shift' || key === 'Meta') {
                    // Don't add modifier keys by themselves
                    return;
                }
                else if (key.length === 1) {
                    // Single character - uppercase it
                    key = key.toUpperCase();
                }
                
                keys.push(key);
                
                // Set the shortcut
                const shortcut = keys.join('+');
                input.value = shortcut;
                input.classList.remove('editing');
                
                // Save to settings
                const action = input.dataset.action;
                if (action) {
                    this.settings.keyboardShortcuts[action] = shortcut;
                    this.saveSettings();
                    this.showToast(`Shortcut updated: ${shortcut}`);
                    
                    // Update the keyboard event listener with new shortcut
                    this.updateKeyboardShortcuts();
                }
            });
            
            // Cancel editing on blur or Escape
            input.addEventListener('blur', () => {
                if (input.classList.contains('editing')) {
                    input.classList.remove('editing');
                    const action = input.dataset.action;
                    if (action && this.settings.keyboardShortcuts[action]) {
                        input.value = this.settings.keyboardShortcuts[action];
                    }
                }
            });
        });
        
        // Pomodoro settings event handlers
        document.getElementById('pomodoro-enabled').addEventListener('change', (e) => {
            this.settings.pomodoroEnabled = e.target.checked;
            this.saveSettings();
            this.initializePomodoroMode();
            this.showToast('Pomodoro mode ' + (e.target.checked ? 'enabled' : 'disabled'));
        });
        
        document.getElementById('pomodoro-work-minutes').addEventListener('change', (e) => {
            const value = this.validateTimerDuration(e.target.value, 1, 120, 25);
            if (value !== null) {
                this.settings.pomodoroWorkMinutes = value;
                e.target.value = value; // Update input to validated value
                this.saveSettings();
                if (this.settings.pomodoroEnabled) {
                    this.setPomodoroTarget();
                    this.showToast('Work session updated to ' + value + ' minutes');
                }
            } else {
                e.target.value = this.settings.pomodoroWorkMinutes; // Reset to previous valid value
                this.showToast('Invalid work session duration. Must be 1-120 minutes.', 'error');
            }
        });
        
        document.getElementById('pomodoro-short-break-minutes').addEventListener('change', (e) => {
            const value = this.validateTimerDuration(e.target.value, 1, 60, 5);
            if (value !== null) {
                this.settings.pomodoroShortBreakMinutes = value;
                e.target.value = value; // Update input to validated value
                this.saveSettings();
                if (this.settings.pomodoroEnabled) {
                    this.setPomodoroTarget();
                    this.showToast('Short break updated to ' + value + ' minutes');
                }
            } else {
                e.target.value = this.settings.pomodoroShortBreakMinutes; // Reset to previous valid value
                this.showToast('Invalid short break duration. Must be 1-60 minutes.', 'error');
            }
        });
        
        document.getElementById('pomodoro-long-break-minutes').addEventListener('change', (e) => {
            const value = this.validateTimerDuration(e.target.value, 1, 120, 15);
            if (value !== null) {
                this.settings.pomodoroLongBreakMinutes = value;
                e.target.value = value; // Update input to validated value
                this.saveSettings();
                if (this.settings.pomodoroEnabled) {
                    this.setPomodoroTarget();
                    this.showToast('Long break updated to ' + value + ' minutes');
                }
            } else {
                e.target.value = this.settings.pomodoroLongBreakMinutes; // Reset to previous valid value
                this.showToast('Invalid long break duration. Must be 1-120 minutes.', 'error');
            }
        });
        
        document.getElementById('pomodoro-sessions-before-long-break').addEventListener('change', (e) => {
            const value = this.validateTimerDuration(e.target.value, 1, 20, 4);
            if (value !== null) {
                this.settings.pomodoroSessionsBeforeLongBreak = value;
                e.target.value = value; // Update input to validated value
                this.saveSettings();
                this.showToast('Sessions before long break updated to ' + value);
            } else {
                e.target.value = this.settings.pomodoroSessionsBeforeLongBreak; // Reset to previous valid value
                this.showToast('Invalid session count. Must be 1-20 sessions.', 'error');
            }
        });
        
        document.getElementById('pomodoro-auto-start').addEventListener('change', (e) => {
            this.settings.pomodoroAutoStartNext = e.target.checked;
            this.saveSettings();
            this.showToast('Auto-start ' + (e.target.checked ? 'enabled' : 'disabled'));
        });
        
        document.getElementById('pomodoro-play-sounds').addEventListener('change', (e) => {
            this.settings.pomodoroPlaySounds = e.target.checked;
            this.saveSettings();
            this.showToast('Sound notifications ' + (e.target.checked ? 'enabled' : 'disabled'));
        });
        
        // Clear history button (if it exists in the HTML)
        const clearHistoryButton = document.getElementById('clear-history-button');
        if (clearHistoryButton) {
            clearHistoryButton.addEventListener('click', () => {
                this.clearRecentFromSettings();
            });
        }
        
        // Recent limit increment/decrement buttons (if they exist)
        const incrementButton = document.getElementById('recent-limit-increment');
        const decrementButton = document.getElementById('recent-limit-decrement');
        if (incrementButton) {
            incrementButton.addEventListener('click', () => {
                this.incrementRecentLimit();
            });
        }
        if (decrementButton) {
            decrementButton.addEventListener('click', () => {
                this.decrementRecentLimit();
            });
        }
        
        // Handle browser navigation - disabled for tab system
        // window.addEventListener('popstate', () => {
        //     this.handleRoute();
        // });
        
        // Handle hash changes (important for direct link visits) - disabled for tab system
        // window.addEventListener('hashchange', () => {
        //     this.handleRoute();
        // });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
        
        // Global keyboard shortcuts - only essential ones
        // Store keyboard handler reference for updating
        this.keyboardHandler = (e) => {
            // Skip if user is typing in an input field
            const isTyping = e.target.matches('input, textarea, [contenteditable="true"]');
            
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
                this.hideSearch();
                this.hideSettings();
                this.hideTagsModal();
                this.hideShortcutsCheatsheet();
            } else if (!isTyping) {
                // Show shortcuts cheatsheet with '?' key
                if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    e.preventDefault();
                    this.showShortcutsCheatsheet();
                    return;
                }
                
                // Focus mode toggle with 'f' or 'F' key
                if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    // Additional safety check for focus mode
                    try {
                        e.preventDefault();
                        this.toggleFocusMode();
                    } catch (error) {
                        console.error('Focus mode keyboard toggle failed:', error);
                        // Provide user feedback even if toast fails
                        if (typeof this.showToast === 'function') {
                            this.showToast('Focus mode shortcut failed', 'error');
                        }
                    }
                    return;
                }
                
                // Quick notes panel with Ctrl+Shift+S
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
                    e.preventDefault();
                    this.createStickyNote();
                    return;
                }
                
                // Check custom shortcuts
                const pressedCombo = this.getKeyCombo(e);
                
                // Override Ctrl+F for in-note search
                if (pressedCombo === 'Ctrl+F' || pressedCombo === 'Cmd+F') {
                    e.preventDefault();
                    // Don't open search if another modal is already open
                    const hasOpenModal = document.querySelector('.settings-modal.active, .tags-modal.active, .shortcuts-modal.active');
                    if (hasOpenModal) return;
                    
                    // If note is loaded, show in-note search; otherwise show global search
                    if (this.currentNote) {
                        this.showNoteSearch();
                    } else {
                        this.showSearch();
                    }
                    return;
                }
                
                // Alternative tab management shortcuts (browser-compatible)
                if (pressedCombo === 'Alt+W') {
                    e.preventDefault();
                    this.closeCurrentTab();
                    return;
                }
                
                if (pressedCombo === 'Alt+T') {
                    e.preventDefault();
                    this.createNewTab();
                    return;
                }
                
                if (pressedCombo === 'Ctrl+Shift+W' || pressedCombo === 'Cmd+Shift+W') {
                    e.preventDefault();
                    this.closeAllTabs();
                    return;
                }
                
                // Alternative tab switching with Alt+1-9 (browser-compatible)
                if (e.altKey && e.key >= '1' && e.key <= '9') {
                    e.preventDefault();
                    const tabIndex = parseInt(e.key) - 1;
                    this.switchToTabByIndex(tabIndex);
                    return;
                }
                
                // Alternative tab navigation with Alt+PageUp/PageDown (browser-compatible)
                if (pressedCombo === 'Alt+PageUp') {
                    e.preventDefault();
                    this.switchToPreviousTab();
                    return;
                }
                
                if (pressedCombo === 'Alt+PageDown') {
                    e.preventDefault();
                    this.switchToNextTab();
                    return;
                }
                
                // Pin/unpin current tab with Alt+P
                if (e.altKey && e.key.toLowerCase() === 'p') {
                    e.preventDefault();
                    if (this.currentTabId) {
                        this.togglePinTab(this.currentTabId);
                    }
                    return;
                }
                
                // Legacy shortcuts (may conflict with browser but try anyway)
                if (pressedCombo === 'Ctrl+W' || pressedCombo === 'Cmd+W') {
                    e.preventDefault();
                    this.closeCurrentTab();
                    return;
                }
                
                // Legacy new tab shortcut (may conflict with browser but try anyway)
                if (pressedCombo === 'Ctrl+T' || pressedCombo === 'Cmd+T') {
                    e.preventDefault();
                    this.createNewTab();
                    return;
                }
                
                // Legacy tab switching with Ctrl+1-9 (may conflict)
                if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
                    e.preventDefault();
                    const tabIndex = parseInt(e.key) - 1;
                    this.switchToTabByIndex(tabIndex);
                    return;
                }
                
                // Legacy tab navigation (may conflict)
                if (pressedCombo === 'Ctrl+PageUp' || pressedCombo === 'Cmd+PageUp') {
                    e.preventDefault();
                    this.switchToPreviousTab();
                    return;
                }
                
                if (pressedCombo === 'Ctrl+PageDown' || pressedCombo === 'Cmd+PageDown') {
                    e.preventDefault();
                    this.switchToNextTab();
                    return;
                }
                
                for (const [action, shortcut] of Object.entries(this.settings.keyboardShortcuts)) {
                    if (pressedCombo === shortcut) {
                        e.preventDefault();
                        switch(action) {
                            case 'new-tab':
                                this.createNewTab();
                                break;
                            case 'search':
                                this.closeAllDropdowns();
                                this.showSearch();
                                break;
                            case 'settings':
                                this.showSettings();
                                break;
                            case 'filter':
                                this.showTagsModal();
                                break;
                            case 'bookmark':
                                this.bookmarkCurrentNote();
                                break;
                        }
                        break;
                    }
                }
            }
        };
        
        document.addEventListener('keydown', this.keyboardHandler);
        
        // Mobile menu event listeners
        this.setupMobileMenu();
        
        // Timer event listeners
        document.getElementById('timer-play-pause').addEventListener('click', () => {
            this.toggleTimer();
        });
        
        // Reset button with long-press functionality
        const resetButton = document.getElementById('timer-reset');
        
        resetButton.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left mouse button
                this.startResetPress();
            }
        });
        
        resetButton.addEventListener('mouseup', () => {
            this.endResetPress();
        });
        
        resetButton.addEventListener('mouseleave', () => {
            this.endResetPress();
        });
        
        // Prevent context menu on long press
        resetButton.addEventListener('contextmenu', (e) => {
            if (this.resetPressed) {
                e.preventDefault();
            }
        });
    }
    
    handleRoute() {
        // Don't handle routes until notes index is loaded
        if (!this.notesIndex) {
            return;
        }
        
        let hash = window.location.hash.slice(1);
        
        // Handle empty hash or just "/" 
        if (!hash || hash === '/') {
            hash = '/notes/index.md';
        }
        
        if (hash.startsWith('/search/')) {
            const query = decodeURIComponent(hash.slice(8));
            this.showSearch();
            document.getElementById('search-input').value = query;
            this.performSearch(query);
        } else if (hash.startsWith('/tags/')) {
            const tags = hash.slice(6).split(',');
            this.selectedTags = new Set(tags);
            this.filterNotesByTags();
            // Update tag pills if modal exists
            const modalTagFilter = document.getElementById('modal-tag-filter');
            if (modalTagFilter) {
                document.querySelectorAll('.tag-pill').forEach(pill => {
                    const tagName = pill.querySelector('span').textContent;
                    if (this.selectedTags.has(tagName)) {
                        pill.classList.add('active');
                    } else {
                        pill.classList.remove('active');
                    }
                });
            }
            // Update tag count badge
            this.updateTagCountBadge();
        } else if (hash === '/bookmarks') {
            this.showBookmarks();
        } else {
            // Check if current tab is pinned
            const tab = this.tabs.get(this.activeTabId);
            if (tab && tab.isPinned) {
                // Open in new tab if current tab is pinned
                this.openInNewTab(hash);
            } else {
                this.loadNote(hash);
            }
        }
    }
    
    async loadNote(path) {
        const mainContent = document.getElementById('main-content');
        
        // Validate path
        if (!path || typeof path !== 'string' || path.trim() === '') {
            console.error('Invalid path provided to loadNote:', path);
            mainContent.innerHTML = `
                <div class="content-wrapper content-view">
                    <h1>Invalid Path</h1>
                    <p>The requested path is invalid.</p>
                    <p><a href="#/notes/index.md">Return to home</a></p>
                </div>
            `;
            return;
        }
        
        // Prevent rapid successive loads of the same path
        if (this.currentLoadingPath === path) {
            console.log('Already loading this path, skipping:', path);
            return;
        }
        this.currentLoadingPath = path;
        
        // Add loading class to active tab
        if (this.activeTabId) {
            const tabElement = document.getElementById(this.activeTabId);
            if (tabElement) {
                tabElement.classList.add('loading');
            }
        }
        
        // Show loading state
        mainContent.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        
        try {
            // Normalize path
            if (!path.startsWith('/')) {
                path = '/' + path;
            }
            
            // Validate path format - should be /notes/something.md
            if (!path.includes('.md') && !path.endsWith('/')) {
                console.warn('Path does not appear to be a markdown file:', path);
            }
            
            // Log the fetch attempt for debugging
            const fetchPath = path.slice(1);
            console.log('Loading note - Original path:', path, 'Fetch path:', fetchPath);
            
            // Use base path for GitHub Pages compatibility
            const fullPath = this.basePath ? `${this.basePath}${fetchPath}` : fetchPath;
            const response = await fetch(fullPath);
            if (!response.ok) {
                console.error(`HTTP Error ${response.status} ${response.statusText} for path: ${fetchPath}`);
                throw new Error(`Note not found: ${response.status} ${response.statusText}`);
            }
            
            const markdown = await response.text();
            
            // Parse frontmatter
            const { metadata, content } = this.parseFrontmatter(markdown);
            
            // Update current note
            this.currentNote = { path, metadata, content };
            this.currentNotePath = path;
            
            // Render note
            this.renderNote();
            
            // Update URL
            window.location.hash = path;
            
            // Update current tab's path
            if (this.activeTabId) {
                const tab = this.tabs.get(this.activeTabId);
                if (tab) {
                    tab.path = path;
                }
            }
            
            // Track in recent files
            if (this.settings.trackRecent) {
                this.addToRecentFiles(path, metadata);
            }
            
            // Update active state in navigation
            this.setActiveFile(path);
            
            // Remove loading class from tab
            if (this.activeTabId) {
                const tabElement = document.getElementById(this.activeTabId);
                if (tabElement) {
                    tabElement.classList.remove('loading');
                }
            }
            
            return true; // Return success
        } catch (error) {
            console.error('Failed to load note:', error);
            
            // Enhanced error reporting
            let errorMessage = 'The requested note could not be loaded.';
            let errorType = 'Unknown Error';
            
            if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
                errorType = 'Network Error';
                errorMessage = 'Failed to fetch the note file. This might be due to a network issue or the file not existing.';
                console.error('NetworkError details - Path:', path, 'FetchPath:', path.slice(1));
            } else if (error.message.includes('404')) {
                errorType = 'File Not Found';
                errorMessage = 'The requested note file does not exist.';
            } else if (error.message.includes('403')) {
                errorType = 'Access Denied';
                errorMessage = 'You do not have permission to access this file.';
            }
            
            mainContent.innerHTML = `
                <div class="content-wrapper content-view">
                    <h1>${errorType}</h1>
                    <p>${errorMessage}</p>
                    <p><strong>Path:</strong> <code>${path}</code></p>
                    <p><a href="#/notes/index.md">Return to home</a></p>
                </div>
            `;
            
            // Remove loading class even on error
            if (this.activeTabId) {
                const tabElement = document.getElementById(this.activeTabId);
                if (tabElement) {
                    tabElement.classList.remove('loading');
                }
            }
            
            // Clear current loading path
            this.currentLoadingPath = null;
            
            throw error; // Re-throw for caller to handle
        }
    }
    
    normalizeRelatedPath(relatedPath, currentPath) {
        // Convert relative or absolute paths to hash routes
        let normalizedPath = relatedPath.trim();
        
        // If it's already a hash route, return as is
        if (normalizedPath.startsWith('#/')) {
            return normalizedPath;
        }
        
        // Remove .md extension if present
        if (normalizedPath.endsWith('.md')) {
            normalizedPath = normalizedPath.slice(0, -3);
        }
        
        // Handle absolute paths (starting with /)
        if (normalizedPath.startsWith('/')) {
            // If it starts with /notes/, use as is
            if (normalizedPath.startsWith('/notes/')) {
                return `#${normalizedPath}.md`;
            }
            // Otherwise, prepend /notes/
            return `#/notes${normalizedPath}.md`;
        }
        
        // Handle relative paths
        if (normalizedPath.startsWith('./') || normalizedPath.startsWith('../')) {
            // Get the directory of the current file
            const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
            
            // Resolve the relative path
            const pathParts = normalizedPath.split('/');
            const dirParts = currentDir.split('/').filter(p => p);
            
            for (const part of pathParts) {
                if (part === '.') {
                    // Current directory, do nothing
                } else if (part === '..') {
                    // Parent directory
                    dirParts.pop();
                } else if (part) {
                    // Regular directory or file
                    dirParts.push(part);
                }
            }
            
            return `#/${dirParts.join('/')}.md`;
        }
        
        // If no prefix, assume it's relative to /notes/
        return `#/notes/${normalizedPath}.md`;
    }
    
    renderRelatedPages(metadata) {
        if (!metadata.related || (Array.isArray(metadata.related) && metadata.related.length === 0)) {
            return '';
        }
        
        // Ensure related is an array
        const relatedPaths = Array.isArray(metadata.related) ? metadata.related : [metadata.related];
        
        // Build related pages HTML
        const relatedItems = relatedPaths.map(relatedPath => {
            const normalizedPath = this.normalizeRelatedPath(relatedPath, this.currentNote.path);
            
            // Try to find the note in the index to get its title
            const noteInfo = this.notesIndex.notes.find(note => {
                const notePath = normalizedPath.replace('#', '');
                return note.path === notePath;
            });
            
            const title = noteInfo ? noteInfo.metadata.title : relatedPath;
            const description = noteInfo ? noteInfo.metadata.description : '';
            
            return `
                <a href="${normalizedPath}" class="related-page-item">
                    <div class="related-page-title">${this.escapeHtml(title)}</div>
                    ${description ? `<div class="related-page-description">${this.escapeHtml(description)}</div>` : ''}
                </a>
            `;
        }).join('');
        
        return `
            <div class="related-pages">
                <h2 class="related-pages-title">Related Pages</h2>
                <div class="related-pages-list">
                    ${relatedItems}
                </div>
            </div>
        `;
    }
    
    parseFrontmatter(markdown) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = markdown.match(frontmatterRegex);
        
        if (match) {
            try {
                const metadata = jsyaml.load(match[1]);
                return { metadata, content: match[2] };
            } catch (error) {
                console.error('Failed to parse frontmatter:', error);
            }
        }
        
        // No frontmatter or parsing failed
        return {
            metadata: {
                title: 'Untitled',
                tags: [],
                created: new Date().toISOString().split('T')[0],
                author: 'Unknown'
            },
            content: markdown
        };
    }
    
    generateTableOfContents() {
        try {
            // Check if TOC is enabled in settings and split view is not active
            if (!this.settings.showTableOfContents || this.settings.splitViewEnabled) {
                return;
            }
            
            const noteContent = document.querySelector('.note-content');
            if (!noteContent) {
                return;
            }
            
            // Find all headings
            const headings = noteContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (headings.length < 2) {
                return; // Don't show TOC for less than 2 headings
            }
            
            // Remove existing TOC and cleanup
            this.cleanupExistingTOC();
            
            // Create TOC structure
            const toc = document.createElement('div');
            toc.id = 'table-of-contents';
            toc.className = 'table-of-contents';
            
            const tocHeader = document.createElement('div');
            tocHeader.className = 'toc-header';
            tocHeader.innerHTML = `
                <h3>Table of Contents</h3>
                <button class="toc-toggle" aria-label="Toggle table of contents">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z"/>
                    </svg>
                </button>
            `;
            
            const tocContent = document.createElement('div');
            tocContent.className = 'toc-content';
            
            const tocList = document.createElement('ul');
            tocList.className = 'toc-list';
            
            // Build TOC items with error handling
            this.buildTOCItems(headings, tocList);
            
            tocContent.appendChild(tocList);
            toc.appendChild(tocHeader);
            toc.appendChild(tocContent);
            
            // Add to page with validation
            const contentWrapper = document.querySelector('.content-wrapper');
            if (!contentWrapper) {
                console.error('Content wrapper not found, cannot add TOC');
                return;
            }
            contentWrapper.appendChild(toc);
            
            // Setup toggle functionality with error handling
            this.setupTOCToggle(toc);
            
            // Setup scroll handler with error handling
            this.setupTOCScrollHandler(toc, headings);
            
        } catch (error) {
            console.error('Error generating table of contents:', error);
            this.showToast('Failed to generate table of contents', 'error');
        }
    }
    
    cleanupExistingTOC() {
        try {
            const existingToc = document.getElementById('table-of-contents');
            if (existingToc) {
                // Remove scroll event listener if exists
                if (window.tocScrollHandler) {
                    const mainContent = document.getElementById('main-content');
                    if (mainContent) {
                        mainContent.removeEventListener('scroll', window.tocScrollHandler);
                    }
                    delete window.tocScrollHandler;
                }
                // Remove toggle button listener if exists
                if (window.tocToggleHandler) {
                    delete window.tocToggleHandler;
                }
                existingToc.remove();
            }
        } catch (error) {
            console.warn('Error cleaning up existing TOC:', error);
        }
    }
    
    buildTOCItems(headings, tocList) {
        try {
            headings.forEach((heading, index) => {
                try {
                    // Add ID to heading if it doesn't have one
                    if (!heading.id) {
                        heading.id = `heading-${index}`;
                    }
                    
                    const level = parseInt(heading.tagName.charAt(1));
                    if (isNaN(level) || level < 1 || level > 6) {
                        console.warn(`Invalid heading level for element: ${heading.tagName}`);
                        return;
                    }
                    
                    const listItem = document.createElement('li');
                    listItem.className = `toc-item toc-level-${level}`;
                    
                    const link = document.createElement('a');
                    link.href = `#${heading.id}`;
                    link.className = 'toc-link';
                    link.textContent = heading.textContent || 'Untitled';
                    // Use dataset to avoid duplicate listeners and enable cleanup
                    link.dataset.targetHeadingId = heading.id;
                    
                    link.addEventListener('click', (e) => {
                        try {
                            e.preventDefault();
                            const targetId = e.currentTarget.dataset.targetHeadingId;
                            const targetHeading = document.getElementById(targetId);
                            if (targetHeading) {
                                targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                // Update active state
                                document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                                e.currentTarget.classList.add('active');
                            }
                        } catch (clickError) {
                            console.error('Error handling TOC link click:', clickError);
                        }
                    });
                    
                    listItem.appendChild(link);
                    tocList.appendChild(listItem);
                } catch (itemError) {
                    console.warn('Error building TOC item:', itemError);
                }
            });
        } catch (error) {
            console.error('Error building TOC items:', error);
        }
    }
    
    setupTOCToggle(toc) {
        try {
            const toggleBtn = toc.querySelector('.toc-toggle');
            if (!toggleBtn) {
                console.warn('TOC toggle button not found');
                return;
            }
            
            const toggleHandler = () => {
                try {
                    toc.classList.toggle('collapsed');
                } catch (error) {
                    console.error('Error toggling TOC:', error);
                }
            };
            
            toggleBtn.addEventListener('click', toggleHandler);
            window.tocToggleHandler = toggleHandler;
        } catch (error) {
            console.error('Error setting up TOC toggle:', error);
        }
    }
    
    setupTOCScrollHandler(toc, headings) {
        try {
            const mainContent = document.getElementById('main-content');
            if (!mainContent) {
                console.warn('Main content element not found, TOC scroll highlighting disabled');
                return;
            }
            
            let scrollTimeout;
            
            // Store scroll handler for cleanup
            const scrollHandler = () => {
                try {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        try {
                            let currentHeading = null;
                            const scrollTop = mainContent.scrollTop;
                            
                            headings.forEach(heading => {
                                try {
                                    const rect = heading.getBoundingClientRect();
                                    const mainRect = mainContent.getBoundingClientRect();
                                    const relativeTop = rect.top - mainRect.top;
                                    
                                    if (relativeTop <= 100) {
                                        currentHeading = heading;
                                    }
                                } catch (rectError) {
                                    // Skip this heading if getBoundingClientRect fails
                                    console.warn('Error getting heading bounds:', rectError);
                                }
                            });
                            
                            if (currentHeading) {
                                document.querySelectorAll('.toc-link').forEach(link => {
                                    try {
                                        link.classList.remove('active');
                                        if (link.getAttribute('href') === `#${currentHeading.id}`) {
                                            link.classList.add('active');
                                        }
                                    } catch (linkError) {
                                        console.warn('Error updating TOC link active state:', linkError);
                                    }
                                });
                            }
                        } catch (scrollError) {
                            console.warn('Error in TOC scroll handler:', scrollError);
                        }
                    }, 100);
                } catch (timeoutError) {
                    console.error('Error in TOC scroll timeout:', timeoutError);
                }
            };
            
            mainContent.addEventListener('scroll', scrollHandler);
            
            // Store handler for cleanup
            toc.dataset.scrollHandler = 'attached';
            window.tocScrollHandler = scrollHandler;
        } catch (error) {
            console.error('Error setting up TOC scroll handler:', error);
        }
    }
    
    setupReadingProgress() {
        const noteContent = document.querySelector('.note-content');
        const mainContent = document.getElementById('main-content');
        if (!noteContent || !mainContent) return;
        
        // Calculate word count
        const text = noteContent.textContent || '';
        const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        
        // Estimate reading time (average 250 words per minute)
        const wordsPerMinute = 250;
        const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
        
        // Remove existing progress elements and cleanup
        const existingProgress = document.getElementById('reading-progress');
        const existingTime = document.getElementById('reading-time');
        if (existingProgress) existingProgress.remove();
        if (existingTime) existingTime.remove();
        
        // Remove scroll event listener if exists
        if (window.progressScrollHandler) {
            mainContent.removeEventListener('scroll', window.progressScrollHandler);
            delete window.progressScrollHandler;
        }
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.appendChild(progressBar);
        
        // Create reading time indicator
        const readingTimeItem = document.createElement('div');
        readingTimeItem.className = 'note-metadata-item';
        readingTimeItem.innerHTML = `
            <div id="reading-time" class="reading-time">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z"/>
                    <path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm7-8A7 7 0 111 8a7 7 0 0114 0z"/>
                </svg>
                <span>${readingTimeMinutes} min read</span>
                <span class="word-count">(${wordCount.toLocaleString()} words)</span>
            </div>
        `;
        
        // Add reading time to note header
        const noteHeader = document.querySelector('.note-header');
        if (noteHeader) {
            const noteMetadata = noteHeader.querySelector('.note-metadata');
            if (noteMetadata) {
                // Insert reading time as first item
                noteMetadata.insertBefore(readingTimeItem, noteMetadata.firstChild);
            }
        }
        
        // Keep reference to the reading time element for updates
        const readingTime = readingTimeItem.querySelector('#reading-time');
        
        // Update progress bar on scroll
        const progressBarElement = progressBar.querySelector('.reading-progress-bar');
        let scrollTimeout;
        
        const progressScrollHandler = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollTop = mainContent.scrollTop;
                const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
                const scrollPercentage = (scrollTop / scrollHeight) * 100;
                
                progressBarElement.style.width = `${Math.min(scrollPercentage, 100)}%`;
                
                // Update reading time based on progress
                const remainingPercentage = Math.max(0, 100 - scrollPercentage) / 100;
                const remainingMinutes = Math.ceil(readingTimeMinutes * remainingPercentage);
                
                if (remainingMinutes > 0 && scrollPercentage < 95) {
                    readingTime.querySelector('span').textContent = `${remainingMinutes} min left`;
                } else if (scrollPercentage >= 95) {
                    readingTime.querySelector('span').textContent = 'Almost done!';
                }
            }, 50);
        };
        
        mainContent.addEventListener('scroll', progressScrollHandler);
        
        // Store handler for cleanup
        window.progressScrollHandler = progressScrollHandler;
    }
    
    renderNote() {
        const mainContent = document.getElementById('main-content');
        const { metadata, content } = this.currentNote;
        
        // Create custom renderer for code blocks
        const renderer = new marked.Renderer();
        let codeBlockId = 0;
        const self = this; // Store reference to this
        
        renderer.code = function(token) {
            // marked v15 uses token objects
            let codeContent = '';
            let info = '';
            
            // In marked v15, the code renderer receives a token object
            if (typeof token === 'object' && token !== null) {
                // The actual code content is in token.text
                codeContent = token.text || '';
                // The language info is in token.lang
                info = token.lang || '';
            } else {
                // This shouldn't happen with marked v15, but handle it just in case
                console.warn('Unexpected token type in code renderer:', typeof token);
                codeContent = String(token);
            }
            
            // Remove any trailing newline from code content
            codeContent = codeContent.replace(/\n$/, '');
            
            // Parse the info string for language, title, and collapse
            let language = '';
            let title = '';
            let collapse = false;
            
            if (info) {
                // Extract language (first word)
                const parts = info.split(' ');
                language = parts[0];
                
                // Parse remaining attributes
                const attrString = parts.slice(1).join(' ');
                
                // Extract title
                const titleMatch = attrString.match(/title:["']([^"']+)["']/i);
                if (titleMatch) {
                    title = titleMatch[1];
                }
                
                // Check for collapse
                const collapseMatch = attrString.match(/collapse[:=]["']?(true|yes|1)["']?/i);
                if (collapseMatch) {
                    collapse = true;
                }
            }
            
            // Use default code language if none specified
            if (!language && self.settings.defaultCodeLanguage !== 'plaintext') {
                language = self.settings.defaultCodeLanguage;
            }
            
            // Generate unique ID for this code block
            const blockId = `code-block-${codeBlockId++}`;
            
            // Store code content temporarily to set it properly after DOM insertion
            if (!self.pendingCodeBlocks) {
                self.pendingCodeBlocks = new Map();
            }
            self.pendingCodeBlocks.set(blockId, codeContent);
            
            // Escape the original code content for storing in data attribute
            // Important: escape HTML entities to prevent browser from parsing HTML tags
            const escapedCodeContent = codeContent
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            
            // Build code block HTML
            let html = '<div class="code-block' + (collapse ? ' collapsed' : '') + '" id="' + blockId + '" data-code-content="' + escapedCodeContent + '">';
            html += '<div class="code-block-header">';
            html += '<div class="code-block-info">';
            
            // Language section (always present for alignment)
            html += '<div class="code-block-language-section">';
            if (language) {
                html += '<span class="code-block-language" data-lang="' + language.toLowerCase() + '">' + language + '</span>';
            }
            html += '</div>';
            
            // Vertical separator
            html += '<div class="code-block-separator"></div>';
            
            // Title section (always present for alignment)
            html += '<div class="code-block-title-section">';
            if (title) {
                html += '<span class="code-block-title">' + self.escapeHtml(title) + '</span>';
            }
            html += '</div>';
            
            html += '</div>';
            html += '<div class="code-block-actions">';
            
            // Always add toggle button
            html += '<button class="code-block-button toggle-button" onclick="notesWiki.toggleCodeBlock(\'' + blockId + '\')" aria-label="Toggle code">';
            html += '<svg class="toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">';
            if (collapse) {
                // Plus sign for collapsed state
                html += '<path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/>';
            } else {
                // Minus sign for expanded state
                html += '<path d="M2.75 7.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H2.75z"/>';
            }
            html += '</svg>';
            html += '</button>';
            
            html += '<button class="code-block-button copy-button" onclick="notesWiki.copyCode(\'' + blockId + '\')" aria-label="Copy code">';
            html += '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">';
            html += '<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>';
            html += '<path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>';
            html += '</svg>';
            html += '</button>';
            
            html += '</div>';
            html += '</div>';
            html += '<div class="code-block-content">';
            // Add a data attribute to identify this code element for later processing
            const codeElementId = blockId + '-code';
            if (self.settings.showLineNumbers) {
                html += '<pre class="with-line-numbers"><code id="' + codeElementId + '" class="language-' + language + '"></code></pre>';
            } else {
                html += '<pre><code id="' + codeElementId + '" class="language-' + language + '"></code></pre>';
            }
            html += '</div>';
            html += '</div>';
            
            return html;
        };  // No need to bind since we're using arrow function inside
        
        // Custom link renderer for external links in new tabs
        renderer.link = function(token) {
            let href = token.href;
            let text = token.text;
            let title = token.title || '';
            
            // Check if it's an external link
            const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
            
            // Build link attributes
            let attrs = `href="${href}"`;
            if (title) {
                attrs += ` title="${self.escapeHtml(title)}"`;
            }
            
            // Add target="_blank" for external links if setting is enabled
            if (isExternal && self.settings.externalLinksNewTab) {
                attrs += ' target="_blank" rel="noopener noreferrer"';
            }
            
            return `<a ${attrs}>${text}</a>`;
        };
        
        // Configure marked with custom renderer and options
        marked.use({
            renderer: renderer,
            breaks: true,
            gfm: true,
            extensions: [this.createCalloutExtension(), this.createWikiLinkExtension()]
        });
        
        // Parse markdown
        const html = marked.parse(content);
        
        // Build note HTML
        mainContent.innerHTML = `
            <div class="content-wrapper content-view">
                <header class="note-header">
                    <div class="note-title-row">
                        <h1 class="note-title">${this.escapeHtml(metadata.title || 'Untitled')}</h1>
                        <div class="note-actions">
                            <button class="note-action-btn bookmark-btn ${this.isBookmarked(this.currentNotePath) ? 'bookmarked' : ''}" 
                                    onclick="notesWiki.toggleBookmark('${this.currentNotePath}', ${JSON.stringify(metadata).replace(/"/g, '&quot;')})" 
                                    title="${this.isBookmarked(this.currentNotePath) ? 'Remove bookmark (Ctrl+D)' : 'Bookmark this note (Ctrl+D)'}"
                                    aria-label="${this.isBookmarked(this.currentNotePath) ? 'Remove bookmark' : 'Bookmark this note'}">
                                <i class="icon">${this.isBookmarked(this.currentNotePath) ? '★' : '☆'}</i>
                            </button>
                            <button class="note-action-btn" 
                                    onclick="notesWiki.copyLinkToNote()" 
                                    title="Copy link to this note"
                                    aria-label="Copy link">
                                <i class="icon">🔗</i>
                            </button>
                            <button class="note-action-btn focus-mode-btn" 
                                    onclick="notesWiki.toggleFocusMode()" 
                                    title="Toggle focus mode (F)"
                                    aria-label="Toggle focus mode">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="breadcrumbs">
                        ${this.generateBreadcrumbs(this.currentNotePath)}
                    </div>
                    
                    <div class="note-metadata">
                        ${metadata.author ? `
                            <div class="note-metadata-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 00-11.215 0c-.22.578.254 1.139.872 1.139h9.47z"/>
                                </svg>
                                <span>${this.escapeHtml(metadata.author)}</span>
                            </div>
                        ` : ''}
                        
                        ${metadata.created ? `
                            <div class="note-metadata-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h4a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                </svg>
                                <span>${this.formatDate(metadata.created)}</span>
                            </div>
                        ` : ''}
                        
                        ${metadata.updated ? `
                            <div class="note-metadata-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                </svg>
                                <span>Updated ${this.formatDate(metadata.updated)}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${metadata.description ? `
                        <p class="note-description">${this.escapeHtml(metadata.description)}</p>
                    ` : ''}
                    
                    ${metadata.tags && metadata.tags.length > 0 ? `
                        <div class="note-tags">
                            ${metadata.tags.map(tag => `
                                <a href="#/tags/${encodeURIComponent(tag)}" class="note-tag">
                                    ${this.escapeHtml(tag)}
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                </header>
                
                <article class="note-content">
                    ${html}
                </article>
                
                ${this.renderRelatedPages(metadata)}
            </div>
            
            <!-- Floating share button -->
            <button class="floating-share" onclick="notesWiki.shareNote()" aria-label="Share this note">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
            </button>
        `;
        
        // Set the text content of code blocks before highlighting
        if (this.pendingCodeBlocks && this.pendingCodeBlocks.size > 0) {
            this.pendingCodeBlocks.forEach((codeContent, blockId) => {
                const codeElement = document.getElementById(blockId + '-code');
                if (codeElement) {
                    codeElement.textContent = codeContent;
                }
            });
            // Clear pending code blocks
            this.pendingCodeBlocks.clear();
        }
        
        // Highlight all code blocks with Prism after DOM injection
        Prism.highlightAll();
        
        // Add line numbers after Prism highlighting if enabled
        if (this.settings.showLineNumbers) {
            document.querySelectorAll('pre.with-line-numbers code').forEach(codeElement => {
                // Get the highlighted HTML from Prism
                const highlightedHtml = codeElement.innerHTML;
                
                // Split by line breaks, preserving empty lines
                const lines = highlightedHtml.split('\n');
                
                // Wrap each line in a div for CSS counter
                const wrappedLines = lines.map(line => {
                    // Handle empty lines
                    if (line.trim() === '') {
                        line = '&nbsp;';
                    }
                    return `<div class="code-line">${line}</div>`;
                }).join('');
                
                // Add the code-with-counters class to the code element
                codeElement.classList.add('code-with-counters');
                // Replace the code element content with the wrapped lines
                codeElement.innerHTML = wrappedLines;
            });
        }
        
        // Generate combined code block if enabled in metadata
        if (metadata.combineCodeBlocks) {
            this.generateCombinedCodeBlock(metadata);
        }
        
        // Scroll to top
        mainContent.scrollTop = 0;
        
        // Setup floating share button visibility
        this.setupFloatingShareButton();
        
        // Update expand button state after rendering
        this.updateExpandButtonState();
        
        // Generate and setup Table of Contents (use requestAnimationFrame to ensure DOM is ready)
        requestAnimationFrame(() => {
            this.generateTableOfContents();
        });
        
        // Setup reading progress and time
        this.setupReadingProgress();
        
        // Handle internal links and tag links
        mainContent.querySelectorAll('a[href^="#"]').forEach(link => {
            // Skip if already has listener (check with data attribute)
            if (link.dataset.listenerAttached) return;
            link.dataset.listenerAttached = 'true';
            
            link.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    // Open in new tab
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    if (href.startsWith('#/') && !href.startsWith('#/tags/')) {
                        const path = href.slice(1);
                        this.openInNewTab(path);
                    }
                    return;
                }
                
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.startsWith('#/')) {
                    // Internal note link or tag link
                    const path = href.slice(1);
                    
                    // Check if it's a tag link
                    if (path.startsWith('/tags/')) {
                        // Apply tag filter
                        const tagName = decodeURIComponent(path.substring(6));
                        this.selectedTags.clear();
                        this.selectedTags.add(tagName);
                        this.filterNotesByTags();
                        this.updateTagCountBadge(); // FIX: Add missing badge update
                        
                        // Update URL
                        window.history.replaceState(null, '', href);
                    } else {
                        // Check if note is already open in another tab
                        const existingTabId = this.findTabByPath(path);
                        if (existingTabId && existingTabId !== this.activeTabId) {
                            // Switch to existing tab
                            this.switchToTab(existingTabId);
                        } else {
                            // Check if current tab is pinned
                            const tab = this.tabs.get(this.activeTabId);
                            if (tab && tab.isPinned) {
                                // Open in new tab if current tab is pinned
                                this.openInNewTab(path);
                            } else if (tab) {
                                // Update current tab's path
                                tab.path = path;
                                this.loadNote(tab.path);
                            }
                        }
                    }
                } else {
                    // Heading anchor
                    const target = mainContent.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
        
        // Update the current tab's title with the note's title
        if (this.activeTabId && metadata.title) {
            const tab = this.tabs.get(this.activeTabId);
            if (tab) {
                tab.title = metadata.title;
                const tabElement = document.getElementById(this.activeTabId);
                if (tabElement) {
                    tabElement.querySelector('.tab-title').textContent = metadata.title;
                }
                this.saveTabState();
            }
        }
    }
    
    
    setupFloatingShareButton() {
        // Share button is now always visible via CSS
        // Remove any existing scroll listener if present
        const mainContent = document.getElementById('main-content');
        if (this.scrollListener) {
            mainContent.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    }
    
    shareNote() {
        const url = window.location.href;
        const shareButtons = document.querySelectorAll('.floating-share');
        
        navigator.clipboard.writeText(url).then(() => {
            // Add success state to floating share button
            shareButtons.forEach(button => {
                const originalHTML = button.innerHTML;
                button.classList.add('success');
                button.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                `;
                
                setTimeout(() => {
                    button.classList.remove('success');
                    button.innerHTML = originalHTML;
                }, 2000);
            });
            
            // Show success message with a toast notification
            this.showToast('Link copied to clipboard!');
        });
    }
    
    showToast(message, type = 'info') {
        try {
            // Validate inputs
            if (!message || typeof message !== 'string') {
                console.warn('Invalid toast message:', message);
                return;
            }
            
            // Validate DOM availability
            if (!document.body) {
                console.warn('Cannot show toast: document.body not available');
                return;
            }
            
            // Create toast element
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            
            // Add aria attributes for accessibility
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'polite');
            
            // Add to body
            document.body.appendChild(toast);
            
            // Trigger animation with error handling
            const showTimer = setTimeout(() => {
                try {
                    toast.classList.add('show');
                } catch (error) {
                    console.warn('Toast animation failed:', error);
                }
            }, 10);
            
            // Remove after delay with error handling
            const hideTimer = setTimeout(() => {
                try {
                    toast.classList.remove('show');
                    const removeTimer = setTimeout(() => {
                        try {
                            if (toast.parentNode) {
                                toast.remove();
                            }
                        } catch (error) {
                            console.warn('Toast removal failed:', error);
                        }
                    }, 300);
                } catch (error) {
                    console.warn('Toast hide failed:', error);
                }
            }, type === 'error' ? 4000 : 2000); // Show errors longer
            
            // Store timers for cleanup if needed
            toast._showTimer = showTimer;
            toast._hideTimer = hideTimer;
            
        } catch (error) {
            console.error('Toast creation failed:', error);
            // Fallback to console log if toast system fails
            console.log(`Toast message (${type}): ${message}`);
        }
    }
    
    showConfirmationDialog(title, message, onConfirm, onCancel) {
        const modal = document.getElementById('confirmation-modal');
        const titleElement = document.getElementById('confirmation-title');
        const messageElement = document.getElementById('confirmation-message');
        const confirmButton = document.getElementById('confirmation-confirm');
        const cancelButton = document.getElementById('confirmation-cancel');
        
        // Set content
        titleElement.textContent = title;
        messageElement.textContent = message;
        
        // Show modal
        modal.style.display = 'flex';
        
        // Remove any existing handlers
        const newConfirmButton = confirmButton.cloneNode(true);
        const newCancelButton = cancelButton.cloneNode(true);
        confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
        cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);
        
        // Add event handlers
        const confirmHandler = () => {
            modal.style.display = 'none';
            if (onConfirm) onConfirm();
        };
        
        const cancelHandler = () => {
            modal.style.display = 'none';
            if (onCancel) onCancel();
        };
        
        newConfirmButton.addEventListener('click', confirmHandler);
        newCancelButton.addEventListener('click', cancelHandler);
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                cancelHandler();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Close on click outside
        const clickOutsideHandler = (e) => {
            if (e.target === modal) {
                cancelHandler();
                modal.removeEventListener('click', clickOutsideHandler);
            }
        };
        modal.addEventListener('click', clickOutsideHandler);
    }
    
    toggleFocusMode() {
        try {
            // Toggle focus mode state
            this.settings.focusMode = !this.settings.focusMode;
            
            // Save settings with error handling
            this.saveSettings();
            
            // Apply focus mode with comprehensive error handling
            this.applyFocusMode();
            
        } catch (error) {
            console.error('Focus mode toggle failed:', error);
            // Revert state on error
            this.settings.focusMode = !this.settings.focusMode;
            this.showToast('Focus mode toggle failed. Please try again.', 'error');
        }
    }
    
    applyFocusMode() {
        try {
            // Validate essential DOM elements
            const body = document.body;
            if (!body) {
                throw new Error('Document body not available');
            }
            
            const sidebar = document.getElementById('sidebar');
            const container = document.querySelector('.container');
            
            // Store original sidebar display state if not already stored
            if (sidebar && !sidebar.hasAttribute('data-original-display')) {
                const originalDisplay = window.getComputedStyle(sidebar).display;
                sidebar.setAttribute('data-original-display', originalDisplay === 'none' ? '' : originalDisplay);
            }
            
            if (this.settings.focusMode) {
                // Enable focus mode
                body.classList.add('focus-mode');
                
                // Hide sidebar if available
                if (sidebar) {
                    sidebar.style.display = 'none';
                    sidebar.setAttribute('data-focus-mode-hidden', 'true');
                }
                
                // Apply wide width for focus mode without changing settings
                // Remove current width class and add focus-mode-wide
                document.body.classList.remove('content-width-narrow', 'content-width-normal', 'content-width-wide', 'content-width-full');
                document.body.classList.add('focus-mode-wide');
                
                // Validate that focus mode was applied
                if (!body.classList.contains('focus-mode')) {
                    throw new Error('Focus mode CSS class could not be applied');
                }
                
                this.showToast('Focus mode enabled', 'success');
                
            } else {
                // Disable focus mode
                body.classList.remove('focus-mode');
                
                // Restore sidebar display if it was hidden by focus mode
                if (sidebar && sidebar.hasAttribute('data-focus-mode-hidden')) {
                    const originalDisplay = sidebar.getAttribute('data-original-display') || '';
                    sidebar.style.display = originalDisplay;
                    sidebar.removeAttribute('data-focus-mode-hidden');
                }
                
                // Remove focus mode width class and restore user's actual width setting
                document.body.classList.remove('focus-mode-wide');
                this.applyContentWidthSetting();
                
                this.showToast('Focus mode disabled', 'success');
            }
            
            // Update button state with error handling
            this.updateFocusModeButton();
            
        } catch (error) {
            console.error('Focus mode application failed:', error);
            throw error; // Re-throw to be caught by toggleFocusMode
        }
    }
    
    updateFocusModeButton() {
        try {
            const focusButtons = document.querySelectorAll('.focus-mode-btn');
            
            if (focusButtons.length === 0) {
                console.warn('Focus mode button not found in DOM');
                return;
            }
            
            // Handle multiple buttons (edge case)
            focusButtons.forEach(button => {
                button.classList.toggle('active', this.settings.focusMode);
                
                // Update aria-pressed for accessibility
                button.setAttribute('aria-pressed', this.settings.focusMode.toString());
                
                // Update title text
                const newTitle = this.settings.focusMode ? 
                    'Exit focus mode (F)' : 'Toggle focus mode (F)';
                button.setAttribute('title', newTitle);
            });
            
        } catch (error) {
            console.warn('Focus mode button update failed:', error);
            // Don't throw - button state is not critical for functionality
        }
    }
    
    initializeFocusMode() {
        try {
            // Only apply focus mode if it was enabled in settings
            if (!this.settings.focusMode) {
                return;
            }
            
            // Validate DOM is ready
            if (!document.body) {
                // Defer initialization if DOM not ready
                console.warn('DOM not ready for focus mode initialization, deferring...');
                setTimeout(() => this.initializeFocusMode(), 100);
                return;
            }
            
            // Wait for sidebar to be available in DOM
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) {
                console.warn('Sidebar not found during focus mode initialization, continuing without sidebar hide');
            }
            
            // Apply focus mode using the comprehensive method
            this.applyFocusMode();
            
        } catch (error) {
            console.error('Focus mode initialization failed:', error);
            // Reset focus mode setting if initialization fails
            this.settings.focusMode = false;
            this.saveSettings();
            this.showToast('Focus mode could not be initialized', 'error');
        }
    }
    
    cleanupFocusMode() {
        try {
            // Remove focus mode class
            if (document.body) {
                document.body.classList.remove('focus-mode');
            }
            
            // Restore sidebar if it was hidden by focus mode
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.hasAttribute('data-focus-mode-hidden')) {
                const originalDisplay = sidebar.getAttribute('data-original-display') || '';
                sidebar.style.display = originalDisplay;
                sidebar.removeAttribute('data-focus-mode-hidden');
                sidebar.removeAttribute('data-original-display');
            }
            
            // Reset button states
            const focusButtons = document.querySelectorAll('.focus-mode-btn');
            focusButtons.forEach(button => {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
                button.setAttribute('title', 'Toggle focus mode (F)');
            });
            
            // Reset settings
            this.settings.focusMode = false;
            
            console.log('Focus mode cleanup completed');
            
        } catch (error) {
            console.error('Focus mode cleanup failed:', error);
        }
    }
    
    validateFocusModeState() {
        try {
            const body = document.body;
            const sidebar = document.getElementById('sidebar');
            const focusButtons = document.querySelectorAll('.focus-mode-btn');
            
            const hasBodyClass = body && body.classList.contains('focus-mode');
            const sidebarHidden = sidebar && sidebar.hasAttribute('data-focus-mode-hidden');
            const settingEnabled = this.settings.focusMode;
            
            // Check for inconsistencies
            const inconsistencies = [];
            
            if (settingEnabled !== hasBodyClass) {
                inconsistencies.push(`Setting (${settingEnabled}) vs Body class (${hasBodyClass})`);
            }
            
            if (settingEnabled && sidebar && !sidebarHidden) {
                inconsistencies.push('Focus mode enabled but sidebar not marked as hidden');
            }
            
            if (!settingEnabled && sidebarHidden) {
                inconsistencies.push('Focus mode disabled but sidebar marked as hidden');
            }
            
            // Check button states
            focusButtons.forEach((button, index) => {
                const buttonActive = button.classList.contains('active');
                const ariaPressed = button.getAttribute('aria-pressed') === 'true';
                
                if (settingEnabled !== buttonActive) {
                    inconsistencies.push(`Button ${index} active state (${buttonActive}) doesn't match setting (${settingEnabled})`);
                }
                
                if (buttonActive !== ariaPressed) {
                    inconsistencies.push(`Button ${index} aria-pressed (${ariaPressed}) doesn't match active state (${buttonActive})`);
                }
            });
            
            if (inconsistencies.length > 0) {
                console.warn('Focus mode state inconsistencies detected:', inconsistencies);
                return false;
            }
            
            return true;
            
        } catch (error) {
            console.error('Focus mode state validation failed:', error);
            return false;
        }
    }
    
    
    generateBreadcrumbs(notePath) {
        // Remove leading slash and .md extension
        const cleanPath = notePath.replace(/^\//, '').replace(/\.md$/, '');
        const parts = cleanPath.split('/');
        
        // Remove 'notes' from the beginning if present
        if (parts[0] === 'notes') {
            parts.shift();
        }
        
        // Build breadcrumb HTML
        const breadcrumbs = [];
        breadcrumbs.push('<a href="#/" class="breadcrumb-link">Home</a>');
        
        // Build cumulative path for each part
        let cumulativePath = '';
        parts.forEach((part, index) => {
            if (index < parts.length - 1) {
                // This is a folder, not the final file
                cumulativePath += (cumulativePath ? '/' : '') + part;
                const folderName = part.charAt(0).toUpperCase() + part.slice(1);
                breadcrumbs.push(`<a href="#/notes/${cumulativePath}/" class="breadcrumb-link">${this.escapeHtml(folderName)}</a>`);
            }
            // Skip the last part as it's the current page
        });
        
        return breadcrumbs.join(' <span class="breadcrumb-separator">›</span> ');
    }
    
    showNoteSearch() {
        // Remove existing search UI if any
        const existingSearch = document.getElementById('note-search-ui');
        if (existingSearch) existingSearch.remove();
        
        // Create search UI
        const searchUI = document.createElement('div');
        searchUI.id = 'note-search-ui';
        searchUI.className = 'note-search-ui';
        searchUI.innerHTML = `
            <div class="note-search-container">
                <input type="text" id="note-search-input" class="note-search-input" placeholder="Search in note...">
                <span class="note-search-count">0 of 0</span>
                <button class="note-search-btn" id="note-search-prev" title="Previous match">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.78 12.53a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"/>
                    </svg>
                </button>
                <button class="note-search-btn" id="note-search-next" title="Next match">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.22 3.47a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.19 9H3.75a.75.75 0 010-1.5h7.44L8.22 4.53a.75.75 0 010-1.06z"/>
                    </svg>
                </button>
                <button class="note-search-btn" id="note-search-close" title="Close (Esc)">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(searchUI);
        
        // Initialize search
        const input = document.getElementById('note-search-input');
        const prevBtn = document.getElementById('note-search-prev');
        const nextBtn = document.getElementById('note-search-next');
        const closeBtn = document.getElementById('note-search-close');
        
        this.noteSearchMatches = [];
        this.noteSearchCurrentIndex = 0;
        
        // Focus input
        input.focus();
        
        // Event listeners
        input.addEventListener('input', () => this.performNoteSearch(input.value));
        prevBtn.addEventListener('click', () => this.navigateNoteSearch(-1));
        nextBtn.addEventListener('click', () => this.navigateNoteSearch(1));
        closeBtn.addEventListener('click', () => this.closeNoteSearch());
        
        // Keyboard navigation
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.navigateNoteSearch(e.shiftKey ? -1 : 1);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.closeNoteSearch();
            }
        });
        
        // Close on escape - store handler for cleanup
        this.noteSearchEscapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeNoteSearch();
            }
        };
        document.addEventListener('keydown', this.noteSearchEscapeHandler);
    }
    
    performNoteSearch(query) {
        // Clear previous highlights
        this.clearNoteSearchHighlights();
        
        if (!query || query.length < 1) {
            this.updateNoteSearchCount(0, 0);
            return;
        }
        
        const noteContent = document.querySelector('.note-content');
        if (!noteContent) return;
        
        // Create regex for case-insensitive search
        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        
        // Find all text nodes and highlight matches
        this.noteSearchMatches = [];
        this.highlightTextNodes(noteContent, regex);
        
        // Update count and navigate to first match
        this.updateNoteSearchCount(this.noteSearchMatches.length, this.noteSearchMatches.length > 0 ? 1 : 0);
        if (this.noteSearchMatches.length > 0) {
            this.noteSearchCurrentIndex = 0;
            this.scrollToMatch(0);
        }
    }
    
    highlightTextNodes(element, regex) {
        // Skip certain elements
        if (element.classList && (element.classList.contains('note-search-highlight') || 
            element.classList.contains('code-block'))) {
            return;
        }
        
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const matches = [...text.matchAll(regex)];
                
                if (matches.length > 0) {
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;
                    
                    matches.forEach(match => {
                        // Add text before match
                        if (match.index > lastIndex) {
                            fragment.appendChild(
                                document.createTextNode(text.slice(lastIndex, match.index))
                            );
                        }
                        
                        // Add highlighted match
                        const highlight = document.createElement('mark');
                        highlight.className = 'note-search-highlight';
                        highlight.textContent = match[0];
                        fragment.appendChild(highlight);
                        this.noteSearchMatches.push(highlight);
                        
                        lastIndex = match.index + match[0].length;
                    });
                    
                    // Add remaining text
                    if (lastIndex < text.length) {
                        fragment.appendChild(
                            document.createTextNode(text.slice(lastIndex))
                        );
                    }
                    
                    // Replace original text node
                    node.parentNode.replaceChild(fragment, node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                this.highlightTextNodes(node, regex);
            }
        }
    }
    
    navigateNoteSearch(direction) {
        if (this.noteSearchMatches.length === 0) return;
        
        // Remove current highlight
        if (this.noteSearchMatches[this.noteSearchCurrentIndex]) {
            this.noteSearchMatches[this.noteSearchCurrentIndex].classList.remove('current');
        }
        
        // Calculate new index
        this.noteSearchCurrentIndex += direction;
        if (this.noteSearchCurrentIndex < 0) {
            this.noteSearchCurrentIndex = this.noteSearchMatches.length - 1;
        } else if (this.noteSearchCurrentIndex >= this.noteSearchMatches.length) {
            this.noteSearchCurrentIndex = 0;
        }
        
        // Highlight and scroll to new match
        this.scrollToMatch(this.noteSearchCurrentIndex);
        this.updateNoteSearchCount(this.noteSearchMatches.length, this.noteSearchCurrentIndex + 1);
    }
    
    scrollToMatch(index) {
        if (!this.noteSearchMatches[index]) return;
        
        const match = this.noteSearchMatches[index];
        match.classList.add('current');
        
        // Scroll into view
        match.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    updateNoteSearchCount(total, current) {
        const countElement = document.querySelector('.note-search-count');
        if (countElement) {
            countElement.textContent = total > 0 ? `${current} of ${total}` : '0 of 0';
        }
    }
    
    clearNoteSearchHighlights() {
        // Remove all highlight marks
        document.querySelectorAll('.note-search-highlight').forEach(mark => {
            const parent = mark.parentNode;
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }
            parent.removeChild(mark);
        });
        
        // Normalize text nodes
        const noteContent = document.querySelector('.note-content');
        if (noteContent) {
            this.normalizeTextNodes(noteContent);
        }
    }
    
    normalizeTextNodes(element) {
        let child = element.firstChild;
        while (child) {
            const next = child.nextSibling;
            
            if (child.nodeType === Node.TEXT_NODE) {
                // Merge with next text node if exists
                while (next && next.nodeType === Node.TEXT_NODE) {
                    child.textContent += next.textContent;
                    element.removeChild(next);
                    next = child.nextSibling;
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                this.normalizeTextNodes(child);
            }
            
            child = next;
        }
    }
    
    closeNoteSearch() {
        this.clearNoteSearchHighlights();
        const searchUI = document.getElementById('note-search-ui');
        if (searchUI) searchUI.remove();
        this.noteSearchMatches = [];
        this.noteSearchCurrentIndex = 0;
        
        // Clean up escape handler
        if (this.noteSearchEscapeHandler) {
            document.removeEventListener('keydown', this.noteSearchEscapeHandler);
            delete this.noteSearchEscapeHandler;
        }
    }
    
    toggleExpandAll() {
        const expandButton = document.querySelector('.floating-expand');
        const mainContent = document.getElementById('main-content');
        
        // Get ALL code blocks in the main content area
        const allCodeBlocks = mainContent.querySelectorAll('.code-block[id]');
        
        // If no code blocks, return early
        if (allCodeBlocks.length === 0) return;
        
        // Check current state - count how many are collapsed
        const collapsedBlocks = Array.from(allCodeBlocks).filter(block => block.classList.contains('collapsed'));
        const shouldExpand = collapsedBlocks.length > allCodeBlocks.length / 2;
        
        // Toggle all code blocks
        allCodeBlocks.forEach(block => {
            // Toggle the state
            if (shouldExpand) {
                block.classList.remove('collapsed');
                const icon = block.querySelector('.toggle-icon');
                if (icon) {
                    // Minus sign for expanded state
                    icon.innerHTML = '<path d="M2.75 7.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H2.75z"/>';
                }
            } else {
                block.classList.add('collapsed');
                const icon = block.querySelector('.toggle-icon');
                if (icon) {
                    // Plus sign for collapsed state
                    icon.innerHTML = '<path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/>';
                }
            }
        });
        
        // Update button state
        if (expandButton) {
            const expandIcon = expandButton.querySelector('.expand-icon');
            const collapseIcon = expandButton.querySelector('.collapse-icon');
            
            if (shouldExpand) {
                expandButton.classList.remove('all-expanded');
                if (expandIcon) expandIcon.style.display = 'block';
                if (collapseIcon) collapseIcon.style.display = 'none';
            } else {
                expandButton.classList.add('all-expanded');
                if (expandIcon) expandIcon.style.display = 'none';
                if (collapseIcon) collapseIcon.style.display = 'block';
            }
        }
        
        // Show feedback
        this.showToast(shouldExpand ? 'Expanded all' : 'Collapsed all');
    }
    
    updateExpandButtonState() {
        const expandButton = document.querySelector('.floating-expand');
        if (!expandButton) return;
        
        // Get all expandable elements
        const folders = document.querySelectorAll('.file-tree-folder-item');
        const collapsibleCodeBlocks = document.querySelectorAll('.code-block[id]');
        
        // Count expanded items
        const expandedFolders = document.querySelectorAll('.file-tree-folder-item.expanded');
        const expandedCodeBlocks = Array.from(collapsibleCodeBlocks).filter(block => !block.classList.contains('collapsed'));
        
        const totalExpandable = folders.length + collapsibleCodeBlocks.length;
        const currentExpanded = expandedFolders.length + expandedCodeBlocks.length;
        
        // Update button state
        const expandIcon = expandButton.querySelector('.expand-icon');
        const collapseIcon = expandButton.querySelector('.collapse-icon');
        
        if (currentExpanded > totalExpandable / 2 || totalExpandable === 0) {
            expandButton.classList.add('all-expanded');
            if (expandIcon) expandIcon.style.display = 'none';
            if (collapseIcon) collapseIcon.style.display = 'block';
        } else {
            expandButton.classList.remove('all-expanded');
            if (expandIcon) expandIcon.style.display = 'block';
            if (collapseIcon) collapseIcon.style.display = 'none';
        }
    }
    
    expandAllFolders() {
        document.querySelectorAll('.file-tree-folder-item').forEach(folder => {
            folder.classList.add('expanded');
        });
        this.updateExpandButtonState();
        this.showToast('Expanded all folders');
    }
    
    collapseAllFolders() {
        document.querySelectorAll('.file-tree-folder-item').forEach(folder => {
            folder.classList.remove('expanded');
        });
        this.updateExpandButtonState();
        this.showToast('Collapsed all folders');
    }
    
    copyLinkToNote() {
        if (!this.currentNote) {
            this.showToast('No note to copy');
            return;
        }
        
        // Copy the URL to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            this.showToast('Note link copied to clipboard');
        }).catch(() => {
            this.showToast('Failed to copy link');
        });
    }
    
    bookmarkCurrentNote() {
        if (!this.currentNote) {
            this.showToast('No note to bookmark');
            return;
        }
        
        // Toggle bookmark for current note
        this.toggleBookmark(this.currentNotePath, this.currentNote.metadata);
    }
    
    toggleCodeBlock(blockId) {
        const codeBlock = document.getElementById(blockId);
        if (codeBlock) {
            codeBlock.classList.toggle('collapsed');
            const icon = codeBlock.querySelector('.toggle-icon');
            if (icon) {
                // Update SVG icon based on collapsed state
                if (codeBlock.classList.contains('collapsed')) {
                    // Plus sign for collapsed state
                    icon.innerHTML = '<path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/>';
                } else {
                    // Minus sign for expanded state
                    icon.innerHTML = '<path d="M2.75 7.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H2.75z"/>';
                }
            }
            this.updateExpandButtonState();
        }
    }
    
    copyCode(blockId) {
        const codeBlock = document.getElementById(blockId);
        if (codeBlock) {
            let codeText = '';
            
            // First try to get code from data attribute (most reliable)
            if (codeBlock.dataset.codeContent) {
                // Decode HTML entities that were escaped when storing in data attribute
                // Use a textarea instead of div to prevent HTML parsing
                const tempTextarea = document.createElement('textarea');
                tempTextarea.innerHTML = codeBlock.dataset.codeContent;
                codeText = tempTextarea.value;
            } else {
                // Fallback: Get the original code element, not the one with line numbers
                const codeElement = codeBlock.querySelector('pre > code');
                if (codeElement) {
                    // Clone the element to avoid modifying the DOM
                    const clone = codeElement.cloneNode(true);
                    // Remove any line number elements if they exist
                    clone.querySelectorAll('.line-number').forEach(el => el.remove());
                    codeText = clone.textContent;
                }
            }
            
            navigator.clipboard.writeText(codeText).then(() => {
                // Show success feedback
                const button = codeBlock.querySelector('.copy-button');
                const originalHTML = button.innerHTML;
                button.classList.add('success');
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                    </svg>
                `;
                setTimeout(() => {
                    button.classList.remove('success');
                    button.innerHTML = originalHTML;
                }, 2000);
            });
        }
    }
    
    generateCombinedCodeBlock(metadata, container = document) {
        // Get all code blocks from the current page or specified container
        const codeBlocks = container.querySelectorAll('.code-block');
        if (codeBlocks.length === 0) return;
        
        // Parse options with defaults
        const options = metadata.combinedBlockOptions || {};
        const includeBlockTitles = options.includeBlockTitles !== false;
        const includeOnlyLanguage = options.includeOnlyLanguage || null;
        const skipEmptyBlocks = options.skipEmptyBlocks !== false;
        const separator = options.separator !== undefined ? options.separator : '\n\n';
        const excludePatterns = options.excludePatterns || [];
        
        // Collect code blocks that match criteria
        const combinedParts = [];
        let blockCount = 0;
        
        codeBlocks.forEach((block, index) => {
            // Get block details
            const languageEl = block.querySelector('.code-block-language');
            const titleEl = block.querySelector('.code-block-title');
            const language = languageEl ? languageEl.dataset.lang : '';
            const title = titleEl ? titleEl.textContent : '';
            const codeContent = block.dataset.codeContent || '';
            
            // Apply filters
            if (includeOnlyLanguage && language !== includeOnlyLanguage) return;
            if (skipEmptyBlocks && !codeContent.trim()) return;
            
            // Check exclude patterns
            if (excludePatterns.length > 0 && title) {
                const shouldExclude = excludePatterns.some(pattern => 
                    title.toLowerCase().includes(pattern.toLowerCase())
                );
                if (shouldExclude) return;
            }
            
            // Decode HTML entities from stored code content
            const tempTextarea = document.createElement('textarea');
            tempTextarea.innerHTML = codeContent;
            const decodedCode = tempTextarea.value;
            
            // Build the combined section
            if (blockCount > 0) {
                combinedParts.push(separator);
            }
            
            if (includeBlockTitles) {
                const blockLabel = title || `Block ${index + 1}`;
                const commentPrefix = this.getCommentPrefix(metadata.combinedBlockLanguage || language);
                combinedParts.push(`${commentPrefix} ${blockLabel}`);
            }
            
            combinedParts.push(decodedCode);
            blockCount++;
        });
        
        if (blockCount === 0) return;
        
        // Create the combined code block element
        const combinedLanguage = metadata.combinedBlockLanguage || 'text';
        const combinedTitle = metadata.combinedBlockTitle || `All Code Combined (${blockCount} blocks)`;
        const combinedContent = combinedParts.join('\n');
        
        // Generate unique ID for this code block
        const paneIdentifier = container === document ? '' : `-p${container.id.split('-').pop()}`;
        const blockId = `code-block-combined${paneIdentifier}`;
        
        // Store content for later processing
        if (!this.pendingCodeBlocks) {
            this.pendingCodeBlocks = new Map();
        }
        this.pendingCodeBlocks.set(blockId, combinedContent);
        
        // Escape content for data attribute
        const escapedCodeContent = combinedContent
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        
        // Build the HTML
        let html = `
            <div class="combined-code-section">
                <h2>Combined Code</h2>
                <div class="code-block" id="${blockId}" data-code-content="${escapedCodeContent}">
                    <div class="code-block-header">
                        <div class="code-block-info">
                            <div class="code-block-language-section">
                                <span class="code-block-language" data-lang="${combinedLanguage}">${combinedLanguage}</span>
                            </div>
                            <div class="code-block-separator"></div>
                            <div class="code-block-title-section">
                                <span class="code-block-title">${this.escapeHtml(combinedTitle)}</span>
                            </div>
                        </div>
                        <div class="code-block-actions">
                            <button class="code-block-button copy-button" onclick="notesWiki.copyCode('${blockId}')" aria-label="Copy code">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>
                                    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="code-block-content">
                        <pre class="${this.settings.showLineNumbers ? 'with-line-numbers' : ''}"><code id="${blockId}-code" class="language-${combinedLanguage}"></code></pre>
                    </div>
                </div>
            </div>
        `;
        
        // Insert at the end of the note content
        const noteContent = container.querySelector('.note-content');
        if (noteContent) {
            // Create a temporary div to hold the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Append the combined code section
            noteContent.appendChild(tempDiv.firstElementChild);
            
            // Set the text content and highlight
            const codeElement = container.querySelector(`#${blockId}-code`);
            if (codeElement) {
                codeElement.textContent = combinedContent;
                Prism.highlightElement(codeElement);
                
                // Apply line numbers if enabled
                if (this.settings.showLineNumbers) {
                    const highlightedHtml = codeElement.innerHTML;
                    const lines = highlightedHtml.split('\n');
                    const wrappedLines = lines.map(line => {
                        if (line.trim() === '') {
                            line = '&nbsp;';
                        }
                        return `<div class="code-line">${line}</div>`;
                    }).join('');
                    
                    codeElement.classList.add('code-with-counters');
                    codeElement.innerHTML = wrappedLines;
                }
                
                // Ensure the parent pre element has the with-line-numbers class
                const preElement = codeElement.closest('pre');
                if (preElement && this.settings.showLineNumbers) {
                    preElement.classList.add('with-line-numbers');
                }
            }
        }
    }
    
    getCommentPrefix(language) {
        // Return appropriate comment prefix based on language
        const commentPrefixes = {
            'javascript': '//',
            'js': '//',
            'typescript': '//',
            'ts': '//',
            'java': '//',
            'c': '//',
            'cpp': '//',
            'csharp': '//',
            'go': '//',
            'rust': '//',
            'swift': '//',
            'kotlin': '//',
            'python': '#',
            'py': '#',
            'ruby': '#',
            'rb': '#',
            'perl': '#',
            'bash': '#',
            'sh': '#',
            'yaml': '#',
            'yml': '#',
            'toml': '#',
            'ini': '#',
            'r': '#',
            'julia': '#',
            'powershell': '#',
            'ps1': '#',
            'html': '<!--',
            'xml': '<!--',
            'css': '/*',
            'scss': '//',
            'sass': '//',
            'sql': '--',
            'lua': '--',
            'haskell': '--',
            'elm': '--',
            'vb': "'",
            'vbnet': "'",
            'matlab': '%',
            'latex': '%',
            'tex': '%'
        };
        
        return commentPrefixes[language.toLowerCase()] || '//';
    }
    
    closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    showSearch() {
        // Ensure notes index is loaded
        if (!this.notesIndex || !this.notesIndex.notes) {
            console.warn('Notes index not loaded yet');
            return;
        }
        
        // Temporarily build a global search index that includes all notes
        const allNotes = this.notesIndex.notes;
        this.globalSearchIndex = allNotes.map(note => ({
            path: note.path,
            title: note.metadata.title || '',
            description: note.metadata.description || '',
            tags: note.metadata.tags || [],
            author: note.metadata.author || '',
            content: note.searchable_content || note.content_preview || '',
            context: note.context,
            codeBlocksCount: note.code_blocks_count || 0
        }));
        
        const overlay = document.getElementById('search-overlay');
        overlay.style.display = 'block';
        
        // Add click-outside handler
        const clickOutsideHandler = (e) => {
            if (e.target === overlay) {
                this.hideSearch();
            }
        };
        overlay.addEventListener('click', clickOutsideHandler);
        
        // Store handler for cleanup
        overlay._clickOutsideHandler = clickOutsideHandler;
        const searchInput = document.getElementById('search-input');
        const stickyCheckbox = document.getElementById('sticky-search');
        
        // Update sticky checkbox state
        stickyCheckbox.checked = this.settings.stickySearch;
        
        // Initialize search history
        this.initializeSearchHistory();
        
        // Restore search query if sticky search is enabled
        if (this.settings.stickySearch && this.lastSearchQuery) {
            searchInput.value = this.lastSearchQuery;
            // Perform the search with restored query
            this.performSearch(this.lastSearchQuery);
        }
        
        searchInput.focus();
    }
    
    hideSearch() {
        const overlay = document.getElementById('search-overlay');
        overlay.style.display = 'none';
        
        // Remove click-outside handler
        if (overlay._clickOutsideHandler) {
            overlay.removeEventListener('click', overlay._clickOutsideHandler);
            delete overlay._clickOutsideHandler;
        }
        
        const searchInput = document.getElementById('search-input');
        
        // Clean up search key handler to prevent memory leak
        if (this.searchKeyHandler && searchInput) {
            searchInput.removeEventListener('keydown', this.searchKeyHandler);
        }
        
        // Save the search query if sticky search is enabled
        if (this.settings.stickySearch) {
            this.lastSearchQuery = searchInput.value;
        } else {
            // Only clear the input if sticky search is disabled
            searchInput.value = '';
        }
        
        document.getElementById('search-results').innerHTML = '';
        
        // Clean up global search index
        this.globalSearchIndex = null;
    }
    
    performSearch(query, append = false) {
        const results = document.getElementById('search-results');
        
        if (!query.trim()) {
            results.innerHTML = '';
            this.searchResults = [];
            this.searchResultsPage = 0;
            return;
        }
        
        // Add to search history if it's a new search
        if (!append && query.trim()) {
            this.addToSearchHistory(query);
        }
        
        // Parse search query with operators
        const parsedQuery = this.parseSearchQuery(query);
        
        // Use global search index if available (when search modal is open), otherwise use context-filtered index
        const searchIndex = this.globalSearchIndex || this.searchIndex;
        
        const matches = searchIndex.filter(item => {
            return this.matchesSearchQuery(item, parsedQuery);
        });
        
        // Store results for pagination
        this.searchResults = matches;
        this.searchResultsPage = append ? this.searchResultsPage : 0;
        
        if (matches.length === 0) {
            results.innerHTML = '<p class="empty-state">No results found</p>';
            return;
        }
        
        // Pagination settings
        const resultsPerPage = 20;
        const startIndex = this.searchResultsPage * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        const pageResults = matches.slice(startIndex, endIndex);
        
        // Render results
        if (!append) {
            results.innerHTML = '';
        }
        
        // Collect all terms for highlighting
        const highlightTerms = [
            ...parsedQuery.basic,
            ...parsedQuery.phrases,
            ...parsedQuery.tags,  // tags are already cleaned of 'tag:' prefix
            parsedQuery.author
        ].filter(Boolean);
        
        pageResults.forEach((match, index) => {
            const a = document.createElement('a');
            a.href = `#${match.path}`;
            a.className = 'search-result';
            a.innerHTML = `
                <div class="search-result-title">${this.highlightText(match.title, highlightTerms)}</div>
                <div class="search-result-path">${match.path}</div>
                ${match.description ? `
                    <div class="search-result-excerpt">
                        ${this.highlightText(match.description, highlightTerms)}
                    </div>
                ` : ''}
            `;
            
            // Handle click for tab navigation
            a.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Save search query if sticky search is enabled
                if (this.settings.stickySearch) {
                    this.lastSearchQuery = document.getElementById('search-input').value;
                }
                
                // Check if should open in new tab
                if (e.ctrlKey || e.metaKey) {
                    this.openInNewTab(match.path);
                } else {
                    // Check if note is already open in another tab
                    const existingTabId = this.findTabByPath(match.path);
                    if (existingTabId && existingTabId !== this.activeTabId) {
                        // Switch to existing tab
                        this.switchToTab(existingTabId);
                    } else {
                        // Check if current tab is pinned
                        const tab = this.tabs.get(this.activeTabId);
                        if (tab && tab.isPinned) {
                            // Open in new tab if current tab is pinned
                            this.openInNewTab(match.path);
                        } else if (tab) {
                            // Update current tab
                            tab.path = match.path;
                            this.loadNote(match.path);
                        }
                    }
                }
                
                // Hide search overlay
                this.hideSearch();
            });
            
            // Handle middle-click
            a.addEventListener('mousedown', (e) => {
                if (e.button === 1) {
                    e.preventDefault();
                    this.openInNewTab(match.path);
                }
            });
            
            // Handle right-click context menu
            a.addEventListener('contextmenu', (e) => {
                this.showNoteContextMenu(e, match.path, match.title);
            });
            
            results.appendChild(a);
            
            // Add data attribute for keyboard navigation
            a.setAttribute('data-search-index', startIndex + index);
        });
        
        // Add pagination controls
        if (matches.length > endIndex || this.searchResultsPage > 0) {
            const paginationDiv = document.createElement('div');
            paginationDiv.className = 'search-pagination';
            
            const info = document.createElement('span');
            info.className = 'search-info';
            info.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, matches.length)} of ${matches.length} results`;
            paginationDiv.appendChild(info);
            
            if (matches.length > endIndex) {
                const loadMoreBtn = document.createElement('button');
                loadMoreBtn.className = 'button button-small';
                loadMoreBtn.textContent = 'Load more results';
                loadMoreBtn.onclick = () => {
                    this.searchResultsPage++;
                    this.performSearch(query, true);
                };
                paginationDiv.appendChild(loadMoreBtn);
            }
            
            results.appendChild(paginationDiv);
        }
        
        // Enable keyboard navigation
        this.currentSearchResult = append ? this.currentSearchResult : 0;
        this.enableSearchKeyboardNavigation();
    }
    
    parseSearchQuery(query) {
        const parsed = {
            required: [],
            excluded: [],
            phrases: [],
            tags: [],
            author: null,
            basic: []
        };
        
        // Extract exact phrases
        const phraseMatches = query.match(/"([^"]+)"/g);
        if (phraseMatches) {
            parsed.phrases = phraseMatches.map(p => p.slice(1, -1).toLowerCase());
            query = query.replace(/"[^"]+"/g, '');
        }
        
        // Extract excluded terms (prefixed with -)
        const excludeMatches = query.match(/(^|\s)-(\S+)/g);
        if (excludeMatches) {
            parsed.excluded = excludeMatches.map(e => e.trim().slice(1).toLowerCase());
            query = query.replace(/(^|\s)-\S+/g, ' ');
        }
        
        // Extract tag filters
        const tagMatches = query.match(/tag:(\S+)/g);
        if (tagMatches) {
            parsed.tags = tagMatches.map(t => t.slice(4).toLowerCase());
            query = query.replace(/tag:\S+/g, '');
        }
        
        // Extract author filter
        const authorMatch = query.match(/author:(\S+)/);
        if (authorMatch) {
            parsed.author = authorMatch[1].toLowerCase();
            query = query.replace(/author:\S+/g, '');
        }
        
        // Remaining terms are basic search terms
        parsed.basic = query.trim().toLowerCase().split(/\s+/).filter(t => t);
        
        return parsed;
    }
    
    matchesSearchQuery(item, parsedQuery) {
        const searchText = `${item.title} ${item.description} ${item.content}`.toLowerCase();
        const itemTags = item.tags.map(t => t.toLowerCase());
        const itemAuthor = item.author.toLowerCase();
        
        // Check excluded terms first
        for (const excluded of parsedQuery.excluded) {
            if (searchText.includes(excluded)) {
                return false;
            }
        }
        
        // Check required phrases
        for (const phrase of parsedQuery.phrases) {
            if (!searchText.includes(phrase)) {
                return false;
            }
        }
        
        // Check tag filters
        for (const tag of parsedQuery.tags) {
            if (!itemTags.includes(tag)) {
                return false;
            }
        }
        
        // Check author filter
        if (parsedQuery.author && !itemAuthor.includes(parsedQuery.author)) {
            return false;
        }
        
        // Check basic terms (all must match)
        for (const term of parsedQuery.basic) {
            if (!searchText.includes(term)) {
                return false;
            }
        }
        
        return true;
    }
    
    enableSearchKeyboardNavigation() {
        const searchInput = document.getElementById('search-input');
        if (!this.searchKeyHandler) {
            this.searchKeyHandler = (e) => {
                const results = document.querySelectorAll('.search-result');
                if (results.length === 0) return;
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.currentSearchResult = Math.min(this.currentSearchResult + 1, results.length - 1);
                    this.highlightSearchResult(results);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.currentSearchResult = Math.max(this.currentSearchResult - 1, 0);
                    this.highlightSearchResult(results);
                } else if (e.key === 'Enter' && this.currentSearchResult >= 0) {
                    e.preventDefault();
                    const current = results[this.currentSearchResult];
                    if (current) {
                        if (e.ctrlKey || e.metaKey) {
                            const path = current.getAttribute('href').slice(1);
                            this.openInNewTab(path);
                        } else {
                            current.click();
                        }
                    }
                }
            };
            searchInput.addEventListener('keydown', this.searchKeyHandler);
        }
    }
    
    highlightSearchResult(results) {
        results.forEach((result, index) => {
            if (index === this.currentSearchResult) {
                result.classList.add('search-result-active');
                result.scrollIntoView({ block: 'nearest' });
            } else {
                result.classList.remove('search-result-active');
            }
        });
    }
    
    initializeSearchHistory() {
        const searchInput = document.getElementById('search-input');
        
        // Remove any existing datalist and list attribute to disable dropdown
        const existingDatalist = document.getElementById('search-history-list');
        if (existingDatalist) {
            existingDatalist.remove();
        }
        searchInput.removeAttribute('list');
        
        // Load search history from localStorage
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    }
    
    addToSearchHistory(query) {
        // Remove duplicate if exists
        this.searchHistory = this.searchHistory.filter(q => q !== query);
        
        // Add to beginning
        this.searchHistory.unshift(query);
        
        // Limit to 50 entries
        if (this.searchHistory.length > 50) {
            this.searchHistory = this.searchHistory.slice(0, 50);
        }
        
        // Save to localStorage
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
    
    toggleSearchHelp() {
        const helpDiv = document.getElementById('search-help');
        helpDiv.style.display = helpDiv.style.display === 'none' ? 'block' : 'none';
    }
    
    onSearchResultClick(path) {
        // This method is no longer needed since we handle clicks inline
        // Keep it for backward compatibility if called elsewhere
        const tab = this.tabs.get(this.activeTabId);
        if (tab) {
            if (tab.isPinned) {
                // Open in new tab if current tab is pinned
                this.openInNewTab(path);
            } else {
                tab.path = path;
                this.loadNote(path);
            }
        }
        this.hideSearch();
    }
    
    highlightText(text, terms) {
        let highlighted = this.escapeHtml(text);
        terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlighted = highlighted.replace(regex, '<span class="search-highlight">$1</span>');
        });
        return highlighted;
    }
    
    showBookmarks() {
        const mainContent = document.getElementById('main-content');
        const bookmarks = this.getBookmarks();
        
        // Group bookmarks by context
        const bookmarksByContext = {};
        bookmarks.forEach(bookmark => {
            const context = bookmark.context || 'root';
            if (!bookmarksByContext[context]) {
                bookmarksByContext[context] = [];
            }
            bookmarksByContext[context].push(bookmark);
        });
        
        // Build HTML
        let html = `
            <div class="content-wrapper content-view">
                <header class="note-header">
                    <div class="note-title-row">
                        <h1 class="note-title">Bookmarks</h1>
                    </div>
                </header>
                
                <div class="bookmarks-view">
        `;
        
        if (bookmarks.length === 0) {
            html += '<p class="empty-state">No bookmarks yet. Click the star icon on any note to bookmark it.</p>';
        } else {
            // Display bookmarks grouped by context
            Object.entries(bookmarksByContext).forEach(([context, contextBookmarks]) => {
                const contextClass = context !== 'root' ? `context-${context}` : '';
                html += `
                    <div class="bookmark-context-section">
                        <h3 class="bookmark-context-header ${contextClass}">${context === 'root' ? 'General' : context}</h3>
                        <div class="bookmark-grid">
                `;
                
                contextBookmarks.forEach(bookmark => {
                    html += `
                        <div class="bookmark-card">
                            <a href="#${bookmark.path.startsWith('/') ? bookmark.path : '/' + bookmark.path}" class="bookmark-card-link" onclick="event.preventDefault(); notesWiki.navigateToBookmark('${bookmark.path.startsWith('/') ? bookmark.path : '/' + bookmark.path}')">
                                <h4>${this.escapeHtml(bookmark.title)}</h4>
                                <p class="bookmark-date">Bookmarked ${this.formatDate(bookmark.bookmarkedAt)}</p>
                            </a>
                            <button class="bookmark-card-remove" onclick="notesWiki.removeBookmark('${bookmark.path}')" title="Remove bookmark">
                                <i class="icon">×</i>
                            </button>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            });
        }
        
        html += `
                </div>
            </div>
        `;
        
        mainContent.innerHTML = html;
        
        // Update page title
        document.title = 'Bookmarks - Notes Wiki';
        
        // Update active tab
        const activeTab = this.tabs.get(this.activeTabId);
        if (activeTab) {
            activeTab.title = 'Bookmarks';
            activeTab.type = 'bookmarks';
            this.updateTabUI();
        }
    }
    
    showSettings() {
        const modal = document.getElementById('settings-modal');
        modal.style.display = 'flex';
        
        // Add click-outside handler
        const clickOutsideHandler = (e) => {
            if (e.target === modal) {
                this.hideSettings();
            }
        };
        modal.addEventListener('click', clickOutsideHandler);
        
        // Store handler for cleanup
        modal._clickOutsideHandler = clickOutsideHandler;
        
        // Update form values
        document.getElementById('track-recent').checked = this.settings.trackRecent;
        document.getElementById('show-line-numbers').checked = this.settings.showLineNumbers;
        document.getElementById('enable-word-wrap').checked = this.settings.enableWordWrap;
        document.getElementById('show-table-of-contents').checked = this.settings.showTableOfContents;
        // Update recent limit option pills
        const recentLimitOptions = document.getElementById('recent-limit-options');
        if (recentLimitOptions) {
            recentLimitOptions.querySelectorAll('.option-pill').forEach(pill => {
                pill.classList.remove('active');
                if (parseInt(pill.dataset.value) === this.settings.recentLimit) {
                    pill.classList.add('active');
                }
            });
        }
        // Update content width option pills
        const contentWidthOptions = document.getElementById('content-width-options');
        if (contentWidthOptions) {
            contentWidthOptions.querySelectorAll('.option-pill').forEach(pill => {
                pill.classList.remove('active');
                if (pill.dataset.value === this.settings.contentWidth) {
                    pill.classList.add('active');
                }
            });
        }
        
        // Update auto theme checkbox if it exists
        const autoThemeCheckbox = document.getElementById('auto-theme');
        if (autoThemeCheckbox) {
            autoThemeCheckbox.checked = this.settings.autoTheme;
        }
        
        // Update sticky search checkbox
        const stickySearchCheckbox = document.getElementById('sticky-search-setting');
        if (stickySearchCheckbox) {
            stickySearchCheckbox.checked = this.settings.stickySearch || false;
        }
        
        // Update confirm on close checkbox
        const confirmOnCloseCheckbox = document.getElementById('confirm-on-close');
        if (confirmOnCloseCheckbox) {
            confirmOnCloseCheckbox.checked = this.settings.confirmOnClose || false;
        }
        
        // Initialize current theme display
        this.updateCurrentThemeDisplay();
        
        // Reset to general section
        this.switchSettingsPanel('general');
        
        // Clear search input
        const searchInput = document.getElementById('settings-search');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Populate theme picker
        this.populateThemePicker();
        
        // Update auto-theme state for the new card-based layout
        this.updateAutoThemeState();
        
        // Initialize new settings UI elements
        // Default home page
        const defaultHomePageSelect = document.getElementById('default-home-page');
        if (defaultHomePageSelect) {
            defaultHomePageSelect.value = this.settings.defaultHomePage || 'home';
        }
        
        // Specific home note
        const specificHomeNoteInput = document.getElementById('specific-home-note');
        if (specificHomeNoteInput) {
            specificHomeNoteInput.value = this.settings.specificHomeNote || '';
            // Set visibility based on defaultHomePage setting
            if (this.settings.defaultHomePage === 'specific') {
                specificHomeNoteInput.style.display = 'block';
            } else {
                specificHomeNoteInput.style.display = 'none';
            }
        }
        
        // External links new tab
        const externalLinksCheckbox = document.getElementById('external-links-new-tab');
        if (externalLinksCheckbox) {
            externalLinksCheckbox.checked = this.settings.externalLinksNewTab !== false; // Default true
        }
        
        // Font size
        const fontSizeOptions = document.getElementById('font-size-options');
        if (fontSizeOptions) {
            fontSizeOptions.querySelectorAll('.option-pill').forEach(pill => {
                pill.classList.remove('active');
                if (pill.dataset.value === this.settings.fontSize) {
                    pill.classList.add('active');
                }
            });
        }
        
        // Font family
        const fontFamilySelect = document.getElementById('font-family');
        if (fontFamilySelect) {
            fontFamilySelect.value = this.settings.fontFamily || 'system';
        }
        
        // Default code language
        const defaultCodeLanguageSelect = document.getElementById('default-code-language');
        if (defaultCodeLanguageSelect) {
            defaultCodeLanguageSelect.value = this.settings.defaultCodeLanguage || 'plaintext';
        }
        
        // Custom CSS
        const customCSSTextarea = document.getElementById('custom-css');
        if (customCSSTextarea) {
            customCSSTextarea.value = this.settings.customCSS || '';
        }
        
        // Keyboard shortcuts
        const shortcutInputs = document.querySelectorAll('.shortcut-key');
        shortcutInputs.forEach(input => {
            const action = input.dataset.action;
            if (action && this.settings.keyboardShortcuts && this.settings.keyboardShortcuts[action]) {
                input.value = this.settings.keyboardShortcuts[action];
            }
        });
        
        // Pomodoro settings
        document.getElementById('pomodoro-enabled').checked = this.settings.pomodoroEnabled || false;
        document.getElementById('pomodoro-work-minutes').value = this.settings.pomodoroWorkMinutes || 25;
        document.getElementById('pomodoro-short-break-minutes').value = this.settings.pomodoroShortBreakMinutes || 5;
        document.getElementById('pomodoro-long-break-minutes').value = this.settings.pomodoroLongBreakMinutes || 15;
        document.getElementById('pomodoro-sessions-before-long-break').value = this.settings.pomodoroSessionsBeforeLongBreak || 4;
        document.getElementById('pomodoro-auto-start').checked = this.settings.pomodoroAutoStartNext || false;
        document.getElementById('pomodoro-play-sounds').checked = this.settings.pomodoroPlaySounds !== false;
    }
    
    hideSettings() {
        const modal = document.getElementById('settings-modal');
        modal.style.display = 'none';
        
        // Remove click-outside handler
        if (modal._clickOutsideHandler) {
            modal.removeEventListener('click', modal._clickOutsideHandler);
            delete modal._clickOutsideHandler;
        }
    }
    
    switchSettingsPanel(panelName) {
        // Update navigation items
        const navItems = document.querySelectorAll('.settings-nav-item');
        navItems.forEach(item => {
            if (item.dataset.section === panelName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update sections
        const sections = document.querySelectorAll('[id^="settings-section-"]');
        sections.forEach(section => {
            if (section.id === `settings-section-${panelName}`) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    filterSettings(searchTerm) {
        const normalizedSearch = searchTerm.toLowerCase().trim();
        const sections = document.querySelectorAll('[id^="settings-section-"]');
        const navItems = document.querySelectorAll('.settings-nav-item');
        
        if (!normalizedSearch) {
            // Show all settings and navigation items
            sections.forEach(section => {
                section.style.display = 'block';
                const items = section.querySelectorAll('.setting-item');
                items.forEach(item => item.style.display = 'flex');
            });
            navItems.forEach(item => item.style.display = 'flex');
            return;
        }
        
        // Hide all sections and nav items initially
        sections.forEach(section => section.style.display = 'none');
        navItems.forEach(item => item.style.display = 'none');
        
        // Search through settings
        sections.forEach(section => {
            let hasVisibleSettings = false;
            const items = section.querySelectorAll('.setting-item');
            
            items.forEach(item => {
                const name = item.querySelector('.setting-name')?.textContent.toLowerCase() || '';
                const description = item.querySelector('.setting-description')?.textContent.toLowerCase() || '';
                
                if (name.includes(normalizedSearch) || description.includes(normalizedSearch)) {
                    item.style.display = 'flex';
                    hasVisibleSettings = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show section if it has visible settings
            if (hasVisibleSettings) {
                section.style.display = 'block';
                // Show corresponding nav item
                const sectionId = section.id.replace('settings-section-', '');
                const navItem = document.querySelector(`.settings-nav-item[data-section="${sectionId}"]`);
                if (navItem) {
                    navItem.style.display = 'flex';
                }
            }
        });
        
        // Activate first visible section
        const firstVisibleSection = Array.from(sections).find(s => s.style.display !== 'none');
        if (firstVisibleSection) {
            const sectionId = firstVisibleSection.id.replace('settings-section-', '');
            this.switchSettingsPanel(sectionId);
        }
    }
    
    clearRecentFromSettings() {
        if (confirm('Are you sure you want to clear your recent file history?')) {
            this.recentFiles = [];
            this.saveRecentFiles();
            this.updateRecentFilesUI();
            this.showToast('Recent file history cleared');
        }
    }
    
    incrementRecentLimit() {
        const input = document.getElementById('recent-limit');
        if (input) {
            const currentValue = parseInt(input.value) || 10;
            const newValue = Math.min(currentValue + 1, 50); // Max 50
            input.value = newValue;
            this.settings.recentLimit = newValue;
            this.saveSettings();
        }
    }
    
    decrementRecentLimit() {
        const input = document.getElementById('recent-limit');
        if (input) {
            const currentValue = parseInt(input.value) || 10;
            const newValue = Math.max(currentValue - 1, 1); // Min 1
            input.value = newValue;
            this.settings.recentLimit = newValue;
            this.saveSettings();
        }
    }
    
    updateCurrentThemeDisplay() {
        const currentThemeElement = document.getElementById('current-theme-name');
        if (currentThemeElement) {
            const currentTheme = this.themes.find(t => t.id === this.settings.theme);
            if (currentTheme) {
                currentThemeElement.textContent = currentTheme.name;
            }
        }
    }
    
    showTagsModal() {
        const modal = document.getElementById('tags-modal');
        modal.style.display = 'flex';
        this.updateTagsUI();
        
        // Add click-outside handler
        const clickOutsideHandler = (e) => {
            if (e.target === modal) {
                this.hideTagsModal();
            }
        };
        modal.addEventListener('click', clickOutsideHandler);
        
        // Store handler for cleanup
        modal._clickOutsideHandler = clickOutsideHandler;
        
        // Focus on search input if it exists
        const searchInput = document.getElementById('tag-search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.value = ''; // Clear any previous search
            this.filterTagsBySearch(''); // Show all tags
        }
    }
    
    hideTagsModal() {
        const modal = document.getElementById('tags-modal');
        modal.style.display = 'none';
        
        // Remove click-outside handler
        if (modal._clickOutsideHandler) {
            modal.removeEventListener('click', modal._clickOutsideHandler);
            delete modal._clickOutsideHandler;
        }
        
        // Clear search when closing modal
        const searchInput = document.getElementById('tag-search-input');
        const searchClear = document.getElementById('tag-search-clear');
        if (searchInput) {
            searchInput.value = '';
            if (searchClear) {
                searchClear.style.display = 'none';
            }
            this.filterTagsBySearch('');
        }
    }
    
    showKeyboardShortcuts() {
        const shortcuts = [
            { keys: '/', description: 'Open search' },
            { keys: '?', description: 'Show this help' },
            { keys: 'Esc', description: 'Close all dialogs' },
            { keys: 'Ctrl/⌘ + K', description: 'Quick search' },
            { keys: 'Ctrl/⌘ + F', description: 'Find in notes' },
            { keys: 'Ctrl/⌘ + W', description: 'Close current tab' },
            { keys: 'Ctrl/⌘ + Tab', description: 'Next tab' },
            { keys: 'Ctrl/⌘ + Shift + Tab', description: 'Previous tab' },
            { keys: 'Alt + 1-9', description: 'Jump to specific tab' },
            { keys: 'Ctrl/⌘ + S', description: 'Copy note link' },
            { keys: 'Ctrl/⌘ + Click', description: 'Open link in new tab' },
            { keys: 'Middle Click', description: 'Open link in new tab / Close tab' }
        ];
        
        const modalHtml = `
            <div class="modal" id="shortcuts-modal" style="display: flex;">
                <div class="modal-content" style="max-width: 600px;">
                    <div class="modal-header">
                        <h2>Keyboard Shortcuts</h2>
                        <button class="icon-button" onclick="document.getElementById('shortcuts-modal').remove()">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table style="width: 100%; border-collapse: collapse;">
                            ${shortcuts.map(s => `
                                <tr style="border-bottom: 1px solid var(--border-primary);">
                                    <td style="padding: 12px; font-family: var(--font-mono); font-size: 14px; color: var(--accent-primary);">
                                        ${this.escapeHtml(s.keys)}
                                    </td>
                                    <td style="padding: 12px; color: var(--text-secondary);">
                                        ${this.escapeHtml(s.description)}
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalHtml;
        document.body.appendChild(tempDiv.firstElementChild);
        
        // Add event listener to close on Escape
        const closeHandler = (e) => {
            if (e.key === 'Escape') {
                document.getElementById('shortcuts-modal')?.remove();
                document.removeEventListener('keydown', closeHandler);
            }
        };
        document.addEventListener('keydown', closeHandler);
    }
    
    updateTagsUI() {
        // Update selected count
        const selectedCount = this.selectedTags.size;
        const excludedCount = this.excludedTags.size;
        const countElement = document.getElementById('selected-tags-count');
        const tagModeText = document.getElementById('tag-mode-text');
        
        let countText = '';
        if (selectedCount > 0 && excludedCount > 0) {
            countText = `${selectedCount} selected, ${excludedCount} excluded`;
        } else if (selectedCount > 0) {
            countText = selectedCount === 1 ? '1 tag selected' : `${selectedCount} tags selected`;
        } else if (excludedCount > 0) {
            countText = excludedCount === 1 ? '1 tag excluded' : `${excludedCount} tags excluded`;
        } else {
            countText = '0 selected';
        }
        
        countElement.textContent = countText;
        
        // Update mode text
        if (tagModeText) {
            tagModeText.textContent = this.tagFilterMode;
        }
        
        // Update button badge
        this.updateTagCountBadge();
    }
    
    updateTagCountBadge() {
        const count = this.selectedTags.size + this.excludedTags.size;
        const badge = document.getElementById('active-tag-count');
        const tagsButton = document.getElementById('tags-button');
        if (!badge) {
            return;
        }
        
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-flex';
            if (tagsButton) tagsButton.classList.add('active');
        } else {
            badge.style.display = 'none';
            if (tagsButton) tagsButton.classList.remove('active');
        }
    }
    
    toggleTagFilterMode() {
        this.tagFilterMode = this.tagFilterMode === 'OR' ? 'AND' : 'OR';
        this.updateTagsUI();
        this.filterNotesByTags();
    }
    
    filterTagsBySearch(searchTerm) {
        const modalTagFilter = document.getElementById('modal-tag-filter');
        const tagPills = modalTagFilter.querySelectorAll('.tag-pill');
        const searchLower = searchTerm.toLowerCase();
        
        let visibleCount = 0;
        let totalCount = 0;
        
        tagPills.forEach(pill => {
            const tagName = pill.dataset.tagName.toLowerCase();
            totalCount++;
            
            if (tagName.includes(searchLower)) {
                pill.style.display = 'inline-flex';
                visibleCount++;
            } else {
                pill.style.display = 'none';
            }
        });
        
        // Update results count
        const resultsCount = document.getElementById('tag-search-results-count');
        if (resultsCount) {
            if (searchTerm) {
                resultsCount.textContent = `Showing ${visibleCount} of ${totalCount} tags`;
                resultsCount.style.display = 'block';
            } else {
                resultsCount.style.display = 'none';
            }
        }
        
        // Show empty state if no tags match
        let emptyState = modalTagFilter.querySelector('.tag-search-empty');
        if (visibleCount === 0 && searchTerm) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.className = 'tag-search-empty empty-state';
                emptyState.textContent = `No tags found matching "${searchTerm}"`;
                modalTagFilter.appendChild(emptyState);
            }
            emptyState.style.display = 'block';
        } else if (emptyState) {
            emptyState.style.display = 'none';
        }
    }
    
    populateThemeCards() {
        const themeCardsGrid = document.getElementById('theme-cards-grid');
        const themeCardsContainer = document.getElementById('theme-cards-container');
        
        if (!themeCardsGrid) return;
        
        // Clear existing cards
        themeCardsGrid.innerHTML = '';
        
        // Create theme cards grouped by category
        this.themeCategories.forEach(category => {
            // Create category section
            const categorySection = document.createElement('div');
            categorySection.className = 'theme-category-section';
            categorySection.style.cssText = `
                margin-bottom: 2rem;
                width: 100%;
            `;
            
            // Get category icon
            const categoryIcons = {
                'Classic Dark': '🌙',
                'Classic Light': '☀️',
                'Material Design': '🎨',
                'Nature & Earth': '🌿',
                'Arctic & Winter': '❄️',
                'Ocean & Sky': '🌊',
                'Cyberpunk & Neon': '💫',
                'Elegant & Pastel': '🌸',
                'Professional': '💼',
                'Special Effects': '✨'
            };
            
            // Create category header with icon
            const categoryHeader = document.createElement('h4');
            categoryHeader.className = 'theme-category-header';
            categoryHeader.innerHTML = `
                <span class="category-icon" style="font-size: 1.2rem;">${categoryIcons[category.name] || '🎨'}</span>
                <span>${category.name}</span>
            `;
            categoryHeader.style.cssText = `
                color: var(--text-primary);
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0 0 1rem 0;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--border-primary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            `;
            
            // Add theme count badge
            const countBadge = document.createElement('span');
            countBadge.style.cssText = `
                background: var(--accent-primary);
                color: var(--bg-primary);
                font-size: 0.75rem;
                padding: 0.125rem 0.5rem;
                border-radius: 9999px;
                font-weight: 500;
                margin-left: auto;
            `;
            countBadge.textContent = category.themes.length;
            categoryHeader.appendChild(countBadge);
            
            categorySection.appendChild(categoryHeader);
            
            // Create grid for category themes
            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'theme-category-grid';
            categoryGrid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.2rem;
                margin-bottom: 1rem;
            `;
            
            // Sort themes alphabetically within each category
            const sortedThemes = [...category.themes].sort((a, b) => a.name.localeCompare(b.name));
            
            // Create cards for themes in this category
            sortedThemes.forEach(theme => {
            const card = document.createElement('div');
            card.className = `theme-card theme-card-${theme.id}`;
            card.dataset.themeId = theme.id;
            
            // Get theme colors for preview
            const previewColors = this.getThemePreviewColors(theme.id);
            const syntaxColors = this.getThemeSyntaxColors(theme.id);
            
            // Apply theme-specific inline styles to the card
            card.style.backgroundColor = previewColors.bg;
            card.style.borderColor = previewColors.border;
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.style.minHeight = '160px';
            card.style.setProperty('--theme-text-primary', previewColors.text);
            card.style.setProperty('--theme-text-secondary', previewColors.textMuted);
            card.style.setProperty('--theme-accent', previewColors.accent);
            card.style.setProperty('--theme-border', previewColors.border);
            
            // Mark current theme as active
            if (theme.id === this.settings.theme) {
                card.classList.add('active');
                card.style.borderColor = previewColors.accent;
                card.style.boxShadow = `0 0 0 2px ${previewColors.accent}`;
            }
            
            // Get theme-specific decorative content
            const themeDecorations = this.getThemeDecoration(theme.id, previewColors);
            
            card.innerHTML = `
                ${themeDecorations}
                <div class="theme-card-main-content" style="position: relative; z-index: 10;">
                    <div class="theme-card-preview-full" style="
                        background: ${previewColors.bg};
                        border: 1px solid ${previewColors.border};
                        border-radius: 6px;
                        padding: 10px;
                        margin-bottom: 10px;
                        width: 100%;
                        box-sizing: border-box;
                        ${theme.id.includes('glass') ? 'backdrop-filter: blur(10px);' : ''}
                    ">
                        <div style="
                            background: ${previewColors.accent};
                            height: 3px;
                            border-radius: 2px;
                            margin-bottom: 8px;
                        "></div>
                        <pre style="
                            margin: 0;
                            font-size: 11px;
                            line-height: 1.4;
                            font-family: 'Consolas', 'Monaco', monospace;
                            background: transparent;
                            padding: 0;
                            white-space: pre;
                            overflow: hidden;
                        "><code style="background: transparent; padding: 0;"><span style="color: ${syntaxColors.keyword}">function</span> <span style="color: ${syntaxColors.function}">hello</span>() {
  <span style="color: ${syntaxColors.keyword}">return</span> <span style="color: ${syntaxColors.string}">"world"</span>;
}</code></pre>
                    </div>
                    <div class="theme-card-title" style="
                        color: ${previewColors.text};
                        font-weight: 600;
                        margin-bottom: 4px;
                    ">${theme.name}</div>
                    <div class="theme-card-description" style="
                        color: ${previewColors.textMuted};
                        font-size: 0.875rem;
                        line-height: 1.3;
                    ">${theme.description}</div>
                </div>
            `;
            
            // Add theme-specific interactive effects
            this.addThemeCardEffects(card, theme.id, previewColors);
            
            // Handle theme selection
            card.addEventListener('click', () => {
                console.log(`[Theme UI] Theme card clicked: ${theme.id}`);
                
                // If auto-theme is enabled, disable it when user selects a theme
                if (this.settings.autoTheme) {
                    console.log('[Theme UI] Disabling auto-theme due to manual selection');
                    this.settings.autoTheme = false;
                    this.saveSettings();
                    
                    // Update auto-theme checkbox
                    const autoThemeCheckbox = document.getElementById('auto-theme');
                    if (autoThemeCheckbox) {
                        autoThemeCheckbox.checked = false;
                    }
                    
                    // Hide auto-theme overlay
                    this.updateAutoThemeState();
                }
                
                // Apply the selected theme
                console.log(`[Theme UI] Applying selected theme: ${theme.id}`);
                this.applyTheme(theme.id);
                this.settings.theme = theme.id;
                this.saveSettings();
                
                // Update visual state
                themeCardsGrid.querySelectorAll('.theme-card').forEach(c => {
                    c.classList.remove('active');
                    // Reset border color for non-active cards
                    const themeId = c.dataset.themeId;
                    const colors = this.getThemePreviewColors(themeId);
                    c.style.borderColor = colors.border;
                    c.style.boxShadow = '';
                });
                card.classList.add('active');
                card.style.borderColor = previewColors.accent;
                card.style.boxShadow = `0 0 0 2px ${previewColors.accent}`;
                
                // Show success feedback with theme-specific message
                const successMessages = {
                    'matrix': '🟢 Entering the Matrix...',
                    'cyberpunk': '⚡ Welcome to Night City!',
                    'dracula': '🦇 Welcome to the castle...',
                    'tokyo-night': '🌃 Welcome to Tokyo!',
                    'vaporwave': '🌴 A E S T H E T I C',
                    'nord': '🎿 Welcome to the Arctic!',
                    'hotdog-stand': '🌭 Classic taste!',
                    'hackthebox': '💻 Access granted...',
                };
                
                const message = successMessages[theme.id] || `${theme.name} theme applied!`;
                this.showToast(message);
            });
                
                categoryGrid.appendChild(card);
            });
            
            categorySection.appendChild(categoryGrid);
            themeCardsGrid.appendChild(categorySection);
        });
        
        // Update auto-theme state
        this.updateAutoThemeState();
    }
    
    updateAutoThemeState() {
        const themeCardsContainer = document.getElementById('theme-cards-container');
        const autoThemeOverlay = document.getElementById('auto-theme-overlay');
        
        if (!themeCardsContainer || !autoThemeOverlay) return;
        
        if (this.settings.autoTheme) {
            themeCardsContainer.classList.add('auto-theme-enabled');
            autoThemeOverlay.style.display = 'flex';
            
            // Add click handler to disable auto-theme
            autoThemeOverlay.onclick = () => {
                this.settings.autoTheme = false;
                this.saveSettings();
                
                // Update auto-theme checkbox
                const autoThemeCheckbox = document.getElementById('auto-theme');
                if (autoThemeCheckbox) {
                    autoThemeCheckbox.checked = false;
                }
                
                // Update visual state
                this.updateAutoThemeState();
                
                // Show feedback
                this.showToast('Auto-theme disabled. You can now select themes manually.');
            };
        } else {
            themeCardsContainer.classList.remove('auto-theme-enabled');
            autoThemeOverlay.style.display = 'none';
            autoThemeOverlay.onclick = null; // Remove event handler
        }
    }
    
    // Keep the old function name for backward compatibility but redirect to new implementation
    populateThemePicker() {
        // Check if we're using the new card-based approach
        if (document.getElementById('theme-cards-grid')) {
            this.populateThemeCards();
            return;
        }
        
        // Legacy dropdown approach (if needed for header dropdown)
        const themeList = document.getElementById('theme-list');
        if (!themeList) return;
        
        themeList.innerHTML = '';
        
        this.themes.forEach(theme => {
            const item = document.createElement('div');
            item.className = 'theme-item';
            item.dataset.themeId = theme.id;
            
            if (theme.id === this.settings.theme) {
                item.classList.add('active');
            }
            
            const previewColors = this.getThemePreviewColors(theme.id);
            
            item.innerHTML = `
                <div class="theme-preview" style="background: ${previewColors.bg}; border-color: ${previewColors.border};">
                    <div class="theme-preview-bar" style="background: ${previewColors.accent};"></div>
                    <div class="theme-preview-content">
                        <div class="theme-preview-line" style="background: ${previewColors.text};"></div>
                        <div class="theme-preview-line short" style="background: ${previewColors.textMuted};"></div>
                    </div>
                </div>
                <div class="theme-info">
                    <span class="theme-name">${theme.name}</span>
                    <span class="theme-description">${theme.description}</span>
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.applyTheme(theme.id);
                this.settings.theme = theme.id;
                this.saveSettings();
                
                themeList.querySelectorAll('.theme-item').forEach(i => {
                    i.classList.remove('active');
                });
                item.classList.add('active');
                
                this.showToast('Theme applied successfully!');
            });
            
            themeList.appendChild(item);
        });
    }
    
    getThemePreviewColors(themeId) {
        // Return preview colors for each theme
        const themeColors = {
            'light': {
                bg: '#ffffff',
                border: '#e5e7eb',
                accent: '#3b82f6',
                text: '#111827',
                textMuted: '#6b7280'
            },
            'dark': {
                bg: '#1a1a1a',
                border: '#333333',
                accent: '#3b82f6',
                text: '#e5e5e5',
                textMuted: '#999999'
            },
            'vscode-dark-plus': {
                bg: '#1e1e1e',
                border: '#464647',
                accent: '#007acc',
                text: '#d4d4d4',
                textMuted: '#858585'
            },
            'monokai': {
                bg: '#272822',
                border: '#49483e',
                accent: '#66d9ef',
                text: '#f8f8f2',
                textMuted: '#75715e'
            },
            'dracula': {
                bg: '#282a36',
                border: '#44475a',
                accent: '#bd93f9',
                text: '#f8f8f2',
                textMuted: '#6272a4'
            },
            'one-dark-pro': {
                bg: '#282c34',
                border: '#3e4451',
                accent: '#61afef',
                text: '#abb2bf',
                textMuted: '#5c6370'
            },
            'solarized-light': {
                bg: '#fdf6e3',
                border: '#eee8d5',
                accent: '#268bd2',
                text: '#657b83',
                textMuted: '#93a1a1'
            },
            'solarized-dark': {
                bg: '#002b36',
                border: '#073642',
                accent: '#268bd2',
                text: '#839496',
                textMuted: '#586e75'
            },
            'github-light': {
                bg: '#ffffff',
                border: '#e1e4e8',
                accent: '#0366d6',
                text: '#24292e',
                textMuted: '#6a737d'
            },
            'github-dark': {
                bg: '#0d1117',
                border: '#30363d',
                accent: '#58a6ff',
                text: '#c9d1d9',
                textMuted: '#8b949e'
            },
            'nord': {
                bg: '#2e3440',
                border: '#3b4252',
                accent: '#88c0d0',
                text: '#d8dee9',
                textMuted: '#4c566a'
            },
            'gruvbox-dark': {
                bg: '#282828',
                border: '#3c3836',
                accent: '#fb4934',
                text: '#ebdbb2',
                textMuted: '#928374'
            },
            'gruvbox-light': {
                bg: '#fbf1c7',
                border: '#ebdbb2',
                accent: '#cc241d',
                text: '#3c3836',
                textMuted: '#7c6f64'
            },
            'tokyo-night': {
                bg: '#1a1b26',
                border: '#24283b',
                accent: '#7aa2f7',
                text: '#a9b1d6',
                textMuted: '#565f89'
            },
            'palenight': {
                bg: '#292d3e',
                border: '#32374d',
                accent: '#82aaff',
                text: '#a6accd',
                textMuted: '#676e95'
            },
            'hotdog-stand': {
                bg: '#c41230',
                border: '#ffeb3b',
                accent: '#ffeb3b',
                text: '#ffeb3b',
                textMuted: '#fff9c4'
            },
            'catppuccin-mocha': {
                bg: '#1e1e2e',
                border: '#45475a',
                accent: '#89b4fa',
                text: '#cdd6f4',
                textMuted: '#6c7086'
            },
            'catppuccin-latte': {
                bg: '#eff1f5',
                border: '#bcc0cc',
                accent: '#1e66f5',
                text: '#4c4f69',
                textMuted: '#7c7f93'
            },
            'rose-pine': {
                bg: '#191724',
                border: '#403d52',
                accent: '#c4a7e7',
                text: '#e0def4',
                textMuted: '#6e6a86'
            },
            'rose-pine-dawn': {
                bg: '#faf4ed',
                border: '#dfdad9',
                accent: '#907aa9',
                text: '#575279',
                textMuted: '#9893a5'
            },
            'material-ocean': {
                bg: '#0f111a',
                border: '#232530',
                accent: '#82aaff',
                text: '#8f93a2',
                textMuted: '#464b5d'
            },
            'ayu-dark': {
                bg: '#0a0e14',
                border: '#1c212a',
                accent: '#39bae6',
                text: '#b3b1ad',
                textMuted: '#626a73'
            },
            'ayu-light': {
                bg: '#fafafa',
                border: '#e7e8e9',
                accent: '#41a6d9',
                text: '#5c6773',
                textMuted: '#abb0b6'
            },
            'ayu-mirage': {
                bg: '#1f2430',
                border: '#2a2f3a',
                accent: '#5ccfe6',
                text: '#cbccc6',
                textMuted: '#707a8c'
            },
            'everforest-dark': {
                bg: '#2d353b',
                border: '#475258',
                accent: '#7fbbb3',
                text: '#d3c6aa',
                textMuted: '#7a8478'
            },
            'kanagawa': {
                bg: '#1f1f28',
                border: '#54546d',
                accent: '#7e9cd8',
                text: '#dcd7ba',
                textMuted: '#727169'
            },
            'zenburn': {
                bg: '#3f3f3f',
                border: '#5f5f5f',
                accent: '#8cd0d3',
                text: '#dcdccc',
                textMuted: '#9f9f9f'
            },
            'tomorrow-night': {
                bg: '#1d1f21',
                border: '#373b41',
                accent: '#81a2be',
                text: '#c5c8c6',
                textMuted: '#969896'
            },
            'matrix': {
                bg: '#0D0208',
                border: '#008F11',
                accent: '#00FF41',
                text: '#00FF41',
                textMuted: '#006600'
            },
            'witch-hazel': {
                bg: '#433e56',
                border: '#716799',
                accent: '#1bc5e0',
                text: '#F8F8F0',
                textMuted: '#a599c7'
            },
            'vaporwave': {
                bg: '#300350',
                border: '#B967FF',
                accent: '#FF71CE',
                text: '#FFFB96',
                textMuted: '#B967FF'
            },
            'cyberpunk': {
                bg: '#091833',
                border: '#0ABDC6',
                accent: '#EA00D9',
                text: '#0ABDC6',
                textMuted: '#7a8bb5'
            },
            'hackthebox': {
                bg: '#1a2332',
                border: '#313f55',
                accent: '#9fef00',
                text: '#a4b1cd',
                textMuted: '#7d8ca8'
            },
            'thinkultra': {
                bg: '#000000',
                border: '#4D4D4D',
                accent: '#E60012',
                text: '#E8E8E8',
                textMuted: '#808080'
            },
            'cobalt2': {
                bg: '#193549',
                border: '#234E6D',
                accent: '#ffc600',
                text: '#ffffff',
                textMuted: '#7fdbca'
            },
            'shades-of-purple': {
                bg: '#2D2B55',
                border: '#4D4A89',
                accent: '#B362FF',
                text: '#FFFFFF',
                textMuted: '#A599E9'
            },
            'winter-is-coming-dark': {
                bg: '#011627',
                border: '#1e3a52',
                accent: '#00bff9',
                text: '#a7dbf7',
                textMuted: '#5f7e97'
            },
            'winter-is-coming-light': {
                bg: '#ffffff',
                border: '#e5e7eb',
                accent: '#0284c7',
                text: '#1f2937',
                textMuted: '#9ca3af'
            },
            'atom-one-light': {
                bg: '#FAFAFA',
                border: '#D3D3D3',
                accent: '#4078F2',
                text: '#383A42',
                textMuted: '#A0A1A7'
            },
            'material-palenight': {
                bg: '#292D3E',
                border: '#444760',
                accent: '#82AAFF',
                text: '#A6ACCD',
                textMuted: '#676E95'
            },
            'material-darker': {
                bg: '#212121',
                border: '#424242',
                accent: '#80cbc4',
                text: '#eeffff',
                textMuted: '#616161'
            },
            'bluloco-light': {
                bg: '#f9f9f9',
                border: '#d0d0d0',
                accent: '#0098dd',
                text: '#383a42',
                textMuted: '#a0a1a7'
            },
            'bluloco-dark': {
                bg: '#282c34',
                border: '#3e4451',
                accent: '#10b1fe',
                text: '#abb2bf',
                textMuted: '#545862'
            },
            '2077': {
                bg: '#030d22',
                border: '#1a3a5a',
                accent: '#ff2cf1',
                text: '#0ef3ff',
                textMuted: '#7a8bb1'
            },
            'oxocarbon': {
                bg: '#161616',
                border: '#393939',
                accent: '#33b1ff',
                text: '#f2f4f8',
                textMuted: '#525252'
            },
            'spacegray': {
                bg: '#2b303b',
                border: '#4f5b66',
                accent: '#8fa1b3',
                text: '#eff1f5',
                textMuted: '#65737e'
            },
            'nordic': {
                bg: '#2e3440',
                border: '#4c566a',
                accent: '#88c0d0',
                text: '#d8dee9',
                textMuted: '#4c566a'
            },
            'noctis': {
                bg: '#051f2e',
                border: '#1f4662',
                accent: '#0095a8',
                text: '#c5cdd3',
                textMuted: '#5b7083'
            },
            'lucario': {
                bg: '#2b3e50',
                border: '#3a526b',
                accent: '#72c05d',
                text: '#f8f8f2',
                textMuted: '#5c98cd'
            },
            'protonmail': {
                bg: '#1c1b24',
                border: '#413e4f',
                accent: '#8c6fd5',
                text: '#e5e3ea',
                textMuted: '#8e8b97'
            },
            'synthwave-84': {
                bg: '#262335',
                border: '#495495',
                accent: '#ff7edb',
                text: '#ffffff',
                textMuted: '#b893ce'
            },
            'night-owl': {
                bg: '#011627',
                border: '#1d3b53',
                accent: '#82aaff',
                text: '#d6deeb',
                textMuted: '#5f7e97'
            },
            'moonlight': {
                bg: '#212337',
                border: '#2f334d',
                accent: '#82aaff',
                text: '#c8d3f5',
                textMuted: '#7a88cf'
            },
            'panda': {
                bg: '#292a2b',
                border: '#3d4142',
                accent: '#19f9d8',
                text: '#e6e6e6',
                textMuted: '#757575'
            },
            'andromeda': {
                bg: '#23262e',
                border: '#2e323c',
                accent: '#00e8c6',
                text: '#d5d8da',
                textMuted: '#6c7887'
            },
            'horizon': {
                bg: '#1c1e26',
                border: '#2e303e',
                accent: '#ee64ac',
                text: '#d5d8da',
                textMuted: '#6c6f93'
            },
            'bear': {
                bg: '#1f1e1d',
                border: '#3c3836',
                accent: '#d08770',
                text: '#e5ddcb',
                textMuted: '#7c6f64'
            },
            'firefly': {
                bg: '#0f1419',
                border: '#253340',
                accent: '#39bae6',
                text: '#c9d1d9',
                textMuted: '#626a73'
            },
            'outrun': {
                bg: '#0c0a20',
                border: '#2d2b55',
                accent: '#00eeff',
                text: '#e0e0ff',
                textMuted: '#7c7ca0'
            },
            'halcyon': {
                bg: '#171c28',
                border: '#2f3b54',
                accent: '#5ccfe6',
                text: '#d7dce2',
                textMuted: '#6679a4'
            },
            'city-lights': {
                bg: '#1d252c',
                border: '#2f3f4f',
                accent: '#70e1e8',
                text: '#b7c5d3',
                textMuted: '#516170'
            },
            'snazzy': {
                bg: '#282a36',
                border: '#44475a',
                accent: '#57c7ff',
                text: '#eff0eb',
                textMuted: '#6c6c70'
            },
            'oceanic-next': {
                bg: '#1b2b34',
                border: '#2b3e4a',
                accent: '#6699cc',
                text: '#cdd3de',
                textMuted: '#65737e'
            },
            'soft-era': {
                bg: '#f9f5f5',
                border: '#e4d6d5',
                accent: '#b68fb5',
                text: '#6a6a6a',
                textMuted: '#999999'
            },
            'base16-ocean': {
                bg: '#2b303b',
                border: '#343d46',
                accent: '#8fa1b3',
                text: '#c0c5ce',
                textMuted: '#65737e'
            },
            'vim': {
                bg: '#000000',
                border: '#3a3a3a',
                accent: '#00afff',
                text: '#e4e4e4',
                textMuted: '#808080'
            },
            'material': {
                bg: '#263238',
                border: '#37474f',
                accent: '#80cbc4',
                text: '#eeffff',
                textMuted: '#546e7a'
            },
            'apprentice': {
                bg: '#262626',
                border: '#444444',
                accent: '#87afd7',
                text: '#bcbcbc',
                textMuted: '#6c6c6c'
            },
            'iceberg': {
                bg: '#161821',
                border: '#2e313f',
                accent: '#84a0c6',
                text: '#c6c8d1',
                textMuted: '#6b7089'
            },
            'flatland': {
                bg: '#26292c',
                border: '#3e4044',
                accent: '#52dab2',
                text: '#bfc9ca',
                textMuted: '#798188'
            }
        };
        
        return themeColors[themeId] || themeColors['light'];
    }
    
    getThemeSyntaxColors(themeId) {
        // Return syntax highlighting colors for each theme
        const syntaxColors = {
            'light': {
                keyword: '#d73a49',
                function: '#6f42c1',
                string: '#032f62',
                comment: '#6a737d',
                number: '#005cc5'
            },
            'dark': {
                keyword: '#ff79c6',
                function: '#50fa7b',
                string: '#f1fa8c',
                comment: '#6272a4',
                number: '#bd93f9'
            },
            'vscode-dark-plus': {
                keyword: '#c586c0',
                function: '#dcdcaa',
                string: '#ce9178',
                comment: '#6a9955',
                number: '#b5cea8'
            },
            'monokai': {
                keyword: '#f92672',
                function: '#a6e22e',
                string: '#e6db74',
                comment: '#75715e',
                number: '#ae81ff'
            },
            'dracula': {
                keyword: '#ff79c6',
                function: '#50fa7b',
                string: '#f1fa8c',
                comment: '#6272a4',
                number: '#bd93f9'
            },
            'one-dark-pro': {
                keyword: '#c678dd',
                function: '#61afef',
                string: '#98c379',
                comment: '#5c6370',
                number: '#d19a66'
            },
            'solarized-light': {
                keyword: '#859900',
                function: '#b58900',
                string: '#2aa198',
                comment: '#93a1a1',
                number: '#dc322f'
            },
            'solarized-dark': {
                keyword: '#859900',
                function: '#b58900',
                string: '#2aa198',
                comment: '#586e75',
                number: '#dc322f'
            },
            'github-light': {
                keyword: '#d73a49',
                function: '#6f42c1',
                string: '#032f62',
                comment: '#6a737d',
                number: '#005cc5'
            },
            'github-dark': {
                keyword: '#ff7b72',
                function: '#d2a8ff',
                string: '#a5d6ff',
                comment: '#8b949e',
                number: '#79c0ff'
            },
            'nord': {
                keyword: '#81a1c1',
                function: '#88c0d0',
                string: '#a3be8c',
                comment: '#616e88',
                number: '#b48ead'
            },
            'gruvbox-dark': {
                keyword: '#fb4934',
                function: '#fabd2f',
                string: '#b8bb26',
                comment: '#928374',
                number: '#d3869b'
            },
            'gruvbox-light': {
                keyword: '#cc241d',
                function: '#b57614',
                string: '#79740e',
                comment: '#928374',
                number: '#8f3f71'
            },
            'tokyo-night': {
                keyword: '#bb9af7',
                function: '#7aa2f7',
                string: '#9ece6a',
                comment: '#565f89',
                number: '#ff9e64'
            },
            'palenight': {
                keyword: '#c792ea',
                function: '#82aaff',
                string: '#c3e88d',
                comment: '#676e95',
                number: '#f78c6c'
            },
            'hotdog-stand': {
                keyword: '#ffeb3b',
                function: '#fff59d',
                string: '#ffeb3b',
                comment: '#fff9c4',
                number: '#ffeb3b'
            },
            'catppuccin-mocha': {
                keyword: '#cba6f7',
                function: '#89b4fa',
                string: '#a6e3a1',
                comment: '#6c7086',
                number: '#fab387'
            },
            'catppuccin-latte': {
                keyword: '#8839ef',
                function: '#1e66f5',
                string: '#40a02b',
                comment: '#7c7f93',
                number: '#fe640b'
            },
            'rose-pine': {
                keyword: '#ebbcba',
                function: '#c4a7e7',
                string: '#f6c177',
                comment: '#6e6a86',
                number: '#eb6f92'
            },
            'rose-pine-dawn': {
                keyword: '#d7827e',
                function: '#907aa9',
                string: '#ea9d34',
                comment: '#9893a5',
                number: '#b4637a'
            },
            'material-ocean': {
                keyword: '#c792ea',
                function: '#82aaff',
                string: '#c3e88d',
                comment: '#464b5d',
                number: '#f78c6c'
            },
            'ayu-dark': {
                keyword: '#ffa759',
                function: '#ffee99',
                string: '#c2d94c',
                comment: '#626a73',
                number: '#ff8f40'
            },
            'ayu-light': {
                keyword: '#fa8d3e',
                function: '#f2ae49',
                string: '#86b300',
                comment: '#abb0b6',
                number: '#fa8d3e'
            },
            'ayu-mirage': {
                keyword: '#ffc68d',
                function: '#5ccfe6',
                string: '#d5ff80',
                comment: '#5c6773',
                number: '#ffcc66'
            },
            'everforest-dark': {
                keyword: '#e67e80',
                function: '#7fbbb3',
                string: '#a7c080',
                comment: '#7a8478',
                number: '#e69875'
            },
            'kanagawa': {
                keyword: '#957fb8',
                function: '#7e9cd8',
                string: '#98bb6c',
                comment: '#727169',
                number: '#ff5d62'
            },
            'zenburn': {
                keyword: '#f0dfaf',
                function: '#8cd0d3',
                string: '#cc9393',
                comment: '#7f9f7f',
                number: '#dcdccc'
            },
            'tomorrow-night': {
                keyword: '#b294bb',
                function: '#81a2be',
                string: '#b5bd68',
                comment: '#969896',
                number: '#de935f'
            },
            'matrix': {
                keyword: '#00FF41',
                function: '#00FF41',
                string: '#008F11',
                comment: '#006600',
                number: '#00FF41'
            },
            'witch-hazel': {
                keyword: '#c5a3ff',
                function: '#1bc5e0',
                string: '#c9d05c',
                comment: '#a599c7',
                number: '#f1b5c2'
            },
            'vaporwave': {
                keyword: '#FF71CE',
                function: '#01CDFE',
                string: '#FFFB96',
                comment: '#B967FF',
                number: '#FF71CE'
            },
            'cyberpunk': {
                keyword: '#EA00D9',
                function: '#0ABDC6',
                string: '#0ABDC6',
                comment: '#7a8bb5',
                number: '#EA00D9'
            },
            'hackthebox': {
                keyword: '#9fef00',
                function: '#9fef00',
                string: '#a4b1cd',
                comment: '#7d8ca8',
                number: '#9fef00'
            },
            'thinkultra': {
                keyword: '#E60012',
                function: '#E8E8E8',
                string: '#808080',
                comment: '#4D4D4D',
                number: '#E60012'
            },
            'cobalt2': {
                keyword: '#ffc600',
                function: '#0088ff',
                string: '#a5ff90',
                comment: '#0088ff',
                number: '#ff628c'
            },
            'shades-of-purple': {
                keyword: '#B362FF',
                function: '#FAD000',
                string: '#A5FF90',
                comment: '#A599E9',
                number: '#FF628C'
            },
            'winter-is-coming-dark': {
                keyword: '#91dacd',
                function: '#87bff5',
                string: '#98e4df',
                comment: '#5f7e97',
                number: '#b48c8c'
            },
            'winter-is-coming-light': {
                keyword: '#0284c7',
                function: '#2563eb',
                string: '#16a34a',
                comment: '#9ca3af',
                number: '#dc2626'
            },
            'atom-one-light': {
                keyword: '#a626a4',
                function: '#4078f2',
                string: '#50a14f',
                comment: '#a0a1a7',
                number: '#986801'
            },
            'material-palenight': {
                keyword: '#c792ea',
                function: '#82aaff',
                string: '#c3e88d',
                comment: '#676e95',
                number: '#f78c6c'
            },
            'material-darker': {
                keyword: '#c792ea',
                function: '#82aaff',
                string: '#c3e88d',
                comment: '#616161',
                number: '#f78c6c'
            },
            'bluloco-light': {
                keyword: '#0098dd',
                function: '#0098dd',
                string: '#23974a',
                comment: '#a0a1a7',
                number: '#d52753'
            },
            'bluloco-dark': {
                keyword: '#10b1fe',
                function: '#3fc56b',
                string: '#f9c859',
                comment: '#636d83',
                number: '#ff6480'
            },
            '2077': {
                keyword: '#ff2cf1',
                function: '#0ef3ff',
                string: '#ff2cf1',
                comment: '#7a8bb1',
                number: '#0ef3ff'
            },
            'oxocarbon': {
                keyword: '#ff7eb6',
                function: '#82cfff',
                string: '#42be65',
                comment: '#525252',
                number: '#3ddbd9'
            },
            'spacegray': {
                keyword: '#b48ead',
                function: '#8fa1b3',
                string: '#a3be8c',
                comment: '#65737e',
                number: '#d08770'
            },
            'nordic': {
                keyword: '#81a1c1',
                function: '#88c0d0',
                string: '#a3be8c',
                comment: '#4c566a',
                number: '#b48ead'
            },
            'noctis': {
                keyword: '#0095a8',
                function: '#00bdd6',
                string: '#00a99a',
                comment: '#5b7083',
                number: '#ff5792'
            },
            'lucario': {
                keyword: '#ff6541',
                function: '#72c05d',
                string: '#e7c547',
                comment: '#5c98cd',
                number: '#ca94ff'
            },
            'protonmail': {
                keyword: '#8c6fd5',
                function: '#6241c5',
                string: '#44b662',
                comment: '#8e8b97',
                number: '#dc3545'
            },
            'synthwave-84': {
                keyword: '#fede5d',
                function: '#ff7edb',
                string: '#72f1b8',
                comment: '#848bbd',
                number: '#f97e72'
            },
            'night-owl': {
                keyword: '#c792ea',
                function: '#82aaff',
                string: '#ecc48d',
                comment: '#637777',
                number: '#f78c6c'
            },
            'moonlight': {
                keyword: '#c099ff',
                function: '#82aaff',
                string: '#c3e88d',
                comment: '#7a88cf',
                number: '#ff757f'
            },
            'panda': {
                keyword: '#ff75b5',
                function: '#45a9f9',
                string: '#19f9d8',
                comment: '#676b79',
                number: '#ffcc95'
            },
            'andromeda': {
                keyword: '#c74ded',
                function: '#ffe66d',
                string: '#96e072',
                comment: '#6c7887',
                number: '#f39c12'
            },
            'horizon': {
                keyword: '#b877db',
                function: '#25b0bc',
                string: '#fab28e',
                comment: '#6c6f93',
                number: '#fab795'
            },
            'bear': {
                keyword: '#b48ead',
                function: '#ebcb8b',
                string: '#a3be8c',
                comment: '#7c6f64',
                number: '#d08770'
            },
            'firefly': {
                keyword: '#ff8f40',
                function: '#ffb454',
                string: '#aad94c',
                comment: '#626a73',
                number: '#ff8f40'
            },
            'outrun': {
                keyword: '#ff00ff',
                function: '#ffff00',
                string: '#00ff88',
                comment: '#7c7ca0',
                number: '#ff0080'
            },
            'halcyon': {
                keyword: '#c3a6ff',
                function: '#ffd580',
                string: '#bae67e',
                comment: '#6679a4',
                number: '#ffae57'
            },
            'city-lights': {
                keyword: '#fc7fa0',
                function: '#fbbf24',
                string: '#8bd49c',
                comment: '#516170',
                number: '#e27e8d'
            },
            'snazzy': {
                keyword: '#ff6ac1',
                function: '#f3f99d',
                string: '#5af78e',
                comment: '#6c6c70',
                number: '#ff5c57'
            },
            'oceanic-next': {
                keyword: '#c594c5',
                function: '#6699cc',
                string: '#99c794',
                comment: '#65737e',
                number: '#f99157'
            },
            'soft-era': {
                keyword: '#958ac5',
                function: '#e4b781',
                string: '#a3b88c',
                comment: '#999999',
                number: '#be9895'
            },
            'base16-ocean': {
                keyword: '#b48ead',
                function: '#8fa1b3',
                string: '#a3be8c',
                comment: '#65737e',
                number: '#d08770'
            },
            'vim': {
                keyword: '#ff5fff',
                function: '#87ffff',
                string: '#5fff5f',
                comment: '#808080',
                number: '#ff87ff'
            },
            'material': {
                keyword: '#c792ea',
                function: '#82aaff',
                string: '#c3e88d',
                comment: '#546e7a',
                number: '#f07178'
            },
            'apprentice': {
                keyword: '#8787af',
                function: '#ffffaf',
                string: '#87af87',
                comment: '#6c6c6c',
                number: '#ff8700'
            },
            'iceberg': {
                keyword: '#a093c7',
                function: '#84a0c6',
                string: '#b4be82',
                comment: '#6b7089',
                number: '#e2a478'
            },
            'flatland': {
                keyword: '#d68c52',
                function: '#52dab2',
                string: '#93d94e',
                comment: '#798188',
                number: '#f59e5f'
            }
        };
        
        return syntaxColors[themeId] || syntaxColors['light'];
    }
    
    getThemeDecoration(themeId, colors) {
        // Return theme-specific decorative content
        const decorations = {
            'matrix': `
                <div class="matrix-rain" style="
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    opacity: 0.1;
                    font-family: monospace;
                    font-size: 10px;
                    color: #00ff41;
                    pointer-events: none;
                ">
                    <div style="animation: matrixFall 5s linear infinite;">10101010</div>
                    <div style="animation: matrixFall 5s linear infinite; animation-delay: -2s; margin-left: 50px;">01001101</div>
                    <div style="animation: matrixFall 5s linear infinite; animation-delay: -4s; margin-left: 100px;">11010011</div>
                </div>
            `,
            'cyberpunk': `
                <div class="cyberpunk-scanline" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #ea00d9, transparent);
                    animation: scanline 3s linear infinite;
                    pointer-events: none;
                "></div>
            `,
            'vaporwave': `
                <div class="vaporwave-grid" style="
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 113, 206, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 113, 206, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                    pointer-events: none;
                "></div>
            `,
            'tokyo-night': `
                <div class="tokyo-kanji" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 30px;
                    color: ${colors.accent};
                    opacity: 0.1;
                    font-weight: bold;
                    pointer-events: none;
                ">東京</div>
            `,
            'dracula': `
                <div class="dracula-bats" style="
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                ">
                    <span style="position: absolute; top: 10px; left: 10px; font-size: 20px; opacity: 0.1; animation: batFly 8s ease-in-out infinite;">🦇</span>
                    <span style="position: absolute; bottom: 10px; right: 10px; font-size: 16px; opacity: 0.08; animation: batFly 8s ease-in-out infinite; animation-delay: -4s;">🦇</span>
                </div>
            `,
            'nord': `
                <div class="nord-aurora" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 40%;
                    background: linear-gradient(180deg, 
                        rgba(136, 192, 208, 0.2) 0%, 
                        transparent 100%);
                    animation: auroraShimmer 6s ease-in-out infinite;
                    pointer-events: none;
                "></div>
            `,
            'hotdog-stand': `
                <div class="hotdog-pixel" style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 48px;
                    opacity: 0.1;
                    image-rendering: pixelated;
                    pointer-events: none;
                ">🌭</div>
            `,
            'winter-is-coming-dark': `
                <div class="winter-snow" style="
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                ">
                    <span style="position: absolute; top: -10px; left: 20%; font-size: 16px; opacity: 0.3; animation: snowfall 6s linear infinite;">❄️</span>
                    <span style="position: absolute; top: -10px; right: 30%; font-size: 12px; opacity: 0.2; animation: snowfall 6s linear infinite; animation-delay: -3s;">❄️</span>
                </div>
            `,
            'hackthebox': `
                <div class="htb-terminal" style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    color: #9fef00;
                    font-family: monospace;
                    font-size: 16px;
                    opacity: 0.3;
                    pointer-events: none;
                ">
                    <span style="animation: cursorBlink 1s steps(1) infinite;">> _</span>
                </div>
            `,
            'everforest-dark': `
                <div class="forest-trees" style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 40px;
                    pointer-events: none;
                ">
                    <span style="position: absolute; bottom: 5px; left: 10px; font-size: 24px; opacity: 0.2; animation: treesSway 4s ease-in-out infinite;">🌲</span>
                    <span style="position: absolute; bottom: 5px; right: 15px; font-size: 20px; opacity: 0.15; animation: treesSway 4s ease-in-out infinite; animation-delay: -2s;">🌲</span>
                </div>
            `,
            'kanagawa': `
                <div class="kanagawa-wave" style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 30px;
                    overflow: hidden;
                    pointer-events: none;
                ">
                    <div style="
                        position: absolute;
                        bottom: 0;
                        left: -50%;
                        width: 200%;
                        height: 100%;
                        background: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 20%22%3E%3Cpath d=%22M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z%22 fill=%22%23${colors.accent.replace('#', '')}%22 opacity=%220.1%22/%3E%3C/svg%3E');
                        background-size: 100px 20px;
                        animation: waveMove 8s linear infinite;
                    "></div>
                </div>
            `,
            'rose-pine': `
                <div class="rose-decoration" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 24px;
                    opacity: 0.2;
                    animation: rosePetals 6s ease-in-out infinite;
                    pointer-events: none;
                ">🌹</div>
            `,
            'aero-glass': `
                <div class="glass-shine" style="
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, 
                        transparent 30%, 
                        rgba(255, 255, 255, 0.3) 50%, 
                        transparent 70%);
                    animation: glassShine 6s ease-in-out infinite;
                    pointer-events: none;
                "></div>
            `,
            '2077': `
                <div class="cyberpunk-2077" style="
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                ">
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 10px;
                        font-weight: bold;
                        color: #f0e500;
                        opacity: 0;
                        animation: glitchText 4s steps(1) infinite;
                    ">WAKE UP SAMURAI</div>
                    <div style="
                        position: absolute;
                        inset: 0;
                        background: repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(240, 229, 0, 0.03) 2px,
                            rgba(240, 229, 0, 0.03) 4px
                        );
                    "></div>
                </div>
            `,
            // Classic Dark Themes
            'dark': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 24px;
                    opacity: 0.15;
                    animation: pulse 2s ease-in-out infinite;
                ">🌙</div>
            `,
            'halcyon': `
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                    background: linear-gradient(135deg, 
                        transparent 30%, 
                        rgba(92, 207, 230, 0.05) 50%, 
                        transparent 70%
                    );
                    animation: shimmer 3s ease-in-out infinite;
                    pointer-events: none;
                "></div>
            `,
            'monokai': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 30px;
                    height: 30px;
                    border: 2px solid rgba(102, 217, 239, 0.3);
                    border-radius: 50%;
                    animation: rotate 4s linear infinite;
                "></div>
                <div style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(249, 38, 114, 0.3);
                    border-radius: 50%;
                    animation: rotate 3s linear infinite reverse;
                "></div>
            `,
            'night-owl': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 20px;
                    opacity: 0.2;
                    animation: float 3s ease-in-out infinite;
                ">🦉</div>
            `,
            'one-dark-pro': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        #61afef 0%, 
                        #c678dd 25%, 
                        #98c379 50%, 
                        #e06c75 75%, 
                        #61afef 100%
                    );
                    animation: slide 3s linear infinite;
                    opacity: 0.5;
                "></div>
            `,
            'tomorrow-night': `
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, 
                        rgba(129, 162, 190, 0.1), 
                        transparent 70%
                    );
                    animation: breathe 4s ease-in-out infinite;
                "></div>
            `,
            'zenburn': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(45deg, 
                        rgba(220, 220, 204, 0.1) 25%, 
                        transparent 25%
                    );
                    opacity: 0.3;
                "></div>
            `,
            
            // Classic Light Themes
            'atom-one-light': `
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, 
                        rgba(1, 132, 188, 0.2), 
                        transparent
                    );
                    animation: pulse 2s ease-in-out infinite;
                "></div>
            `,
            'github-light': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 20px;
                    opacity: 0.1;
                    animation: rotate 10s linear infinite;
                ">⚙️</div>
            `,
            'light': `
                <div style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, 
                        rgba(255, 193, 7, 0.1), 
                        transparent
                    );
                    animation: shine 3s ease-in-out infinite;
                "></div>
            `,
            'solarized-light': `
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 30px;
                    opacity: 0.08;
                    animation: rotate 20s linear infinite;
                ">☀️</div>
            `,
            
            // Material Design Themes
            'material-darker': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, 
                        #ff5370 0%, 
                        #f78c6c 20%, 
                        #ffcb6b 40%, 
                        #c3e88d 60%, 
                        #82aaff 80%, 
                        #c792ea 100%
                    );
                    opacity: 0.4;
                "></div>
            `,
            'material-ocean': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 30px;
                    background: linear-gradient(to top, 
                        rgba(130, 170, 255, 0.1), 
                        transparent
                    );
                    animation: wave 4s ease-in-out infinite;
                "></div>
            `,
            'material-palenight': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 30px;
                    height: 30px;
                    background: conic-gradient(
                        from 0deg,
                        rgba(199, 146, 234, 0.2),
                        rgba(130, 170, 255, 0.2),
                        rgba(199, 146, 234, 0.2)
                    );
                    border-radius: 50%;
                    animation: rotate 6s linear infinite;
                "></div>
            `,
            'material': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    width: 25px;
                    height: 25px;
                    background: rgba(128, 203, 196, 0.2);
                    transform: rotate(45deg);
                    animation: bounce 2s ease-in-out infinite;
                "></div>
            `,
            
            // Nature & Earth Themes
            'ayu-light': `
                <div style="
                    position: absolute;
                    bottom: 5px;
                    right: 10px;
                    font-size: 16px;
                    opacity: 0.15;
                    animation: sway 3s ease-in-out infinite;
                ">🌿</div>
            `,
            'bear': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    font-size: 20px;
                    opacity: 0.15;
                    animation: wobble 4s ease-in-out infinite;
                ">🐻</div>
            `,
            'gruvbox-dark': `
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(254, 128, 25, 0.03) 10px,
                        rgba(254, 128, 25, 0.03) 20px
                    );
                    pointer-events: none;
                "></div>
            `,
            'gruvbox-light': `
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 18px;
                    opacity: 0.12;
                    animation: float 4s ease-in-out infinite;
                ">☕</div>
            `,
            'rose-pine-dawn': `
                <div style="
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    transform: translateY(-50%);
                    font-size: 16px;
                    opacity: 0.15;
                    animation: bloom 3s ease-in-out infinite;
                ">🌸</div>
            `,
            
            // Arctic & Winter Themes  
            'nordic': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 20px;
                    opacity: 0.15;
                    animation: glow 2s ease-in-out infinite;
                ">🔥</div>
            `,
            'winter-is-coming-light': `
                <div style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 8px;
                    height: 8px;
                    background: rgba(0, 122, 204, 0.2);
                    border-radius: 50%;
                    box-shadow: 
                        -10px -10px 0 rgba(0, 122, 204, 0.15),
                        10px 10px 0 rgba(0, 122, 204, 0.1);
                    animation: sparkle 3s ease-in-out infinite;
                "></div>
            `,
            
            // Ocean & Sky Themes
            'ayu-dark': `
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                    background: linear-gradient(180deg, 
                        transparent 60%, 
                        rgba(255, 180, 84, 0.05) 100%
                    );
                    pointer-events: none;
                "></div>
            `,
            'ayu-mirage': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, 
                        transparent, 
                        rgba(255, 204, 102, 0.5), 
                        transparent
                    );
                    animation: scan 3s linear infinite;
                "></div>
            `,
            'base16-ocean': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 20px;
                    opacity: 0.15;
                    animation: float 5s ease-in-out infinite;
                ">⚓</div>
            `,
            'bluloco-dark': `
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(61, 184, 255, 0.2);
                    border-radius: 8px;
                    animation: rotate 8s linear infinite;
                "></div>
            `,
            'bluloco-light': `
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 15px;
                    height: 15px;
                    background: rgba(39, 119, 252, 0.15);
                    border-radius: 3px;
                    animation: blink 2s ease-in-out infinite;
                "></div>
            `,
            'cobalt2': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        #ffc600 0%, 
                        #ff9d00 50%, 
                        #ffc600 100%
                    );
                    animation: slide 2s linear infinite;
                    opacity: 0.6;
                "></div>
            `,
            'firefly': `
                <div style="
                    position: absolute;
                    top: 30%;
                    left: 20%;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 0, 0.6);
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(255, 255, 0, 0.4);
                    animation: firefly 4s ease-in-out infinite;
                "></div>
                <div style="
                    position: absolute;
                    top: 60%;
                    right: 30%;
                    width: 3px;
                    height: 3px;
                    background: rgba(255, 255, 0, 0.5);
                    border-radius: 50%;
                    box-shadow: 0 0 8px rgba(255, 255, 0, 0.3);
                    animation: firefly 4s ease-in-out infinite;
                    animation-delay: -2s;
                "></div>
            `,
            'iceberg': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-bottom: 25px solid rgba(132, 160, 198, 0.15);
                    animation: float 4s ease-in-out infinite;
                "></div>
            `,
            'noctis': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 18px;
                    opacity: 0.15;
                    animation: twinkle 3s ease-in-out infinite;
                ">⭐</div>
            `,
            'oceanic-next': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 20px;
                    background: repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 10px,
                        rgba(102, 153, 204, 0.1) 10px,
                        rgba(102, 153, 204, 0.1) 20px
                    );
                    animation: drift 10s linear infinite;
                "></div>
            `,
            'spacegray': `
                <div style="
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    font-size: 16px;
                    opacity: 0.1;
                    animation: orbit 15s linear infinite;
                ">🚀</div>
            `,
            
            // Cyberpunk & Neon Themes
            'city-lights': `
                <div style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 40px;
                    height: 40px;
                    background: radial-gradient(
                        circle at center,
                        rgba(112, 225, 232, 0.3),
                        transparent 70%
                    );
                    animation: pulse 2s ease-in-out infinite;
                "></div>
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 30px;
                    height: 30px;
                    background: radial-gradient(
                        circle at center,
                        rgba(252, 127, 160, 0.3),
                        transparent 70%
                    );
                    animation: pulse 2s ease-in-out infinite;
                    animation-delay: -1s;
                "></div>
            `,
            'outrun': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 50%;
                    background: linear-gradient(
                        180deg,
                        transparent 0%,
                        rgba(255, 0, 128, 0.05) 50%,
                        rgba(0, 238, 255, 0.05) 100%
                    );
                    pointer-events: none;
                "></div>
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, 
                        transparent, 
                        rgba(255, 0, 255, 0.5), 
                        transparent
                    );
                    animation: scan 2s linear infinite;
                "></div>
            `,
            'snazzy': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 8px;
                    height: 8px;
                    background: #ff6ac1;
                    opacity: 0.4;
                    animation: blink 1s ease-in-out infinite;
                "></div>
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 22px;
                    width: 8px;
                    height: 8px;
                    background: #57c7ff;
                    opacity: 0.4;
                    animation: blink 1s ease-in-out infinite;
                    animation-delay: -0.5s;
                "></div>
            `,
            'synthwave-84': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 60%;
                    background: linear-gradient(
                        0deg,
                        rgba(255, 126, 219, 0.1) 0%,
                        transparent 100%
                    );
                    pointer-events: none;
                "></div>
                <div style="
                    position: absolute;
                    bottom: 20px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: rgba(114, 241, 184, 0.5);
                    box-shadow: 0 0 10px rgba(114, 241, 184, 0.3);
                "></div>
            `,
            
            // Elegant & Pastel Themes
            'andromeda': `
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 30px;
                    border: 2px solid rgba(255, 127, 219, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                    animation: orbit 8s linear infinite;
                "></div>
            `,
            'catppuccin-latte': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 20px;
                    opacity: 0.15;
                    animation: wiggle 2s ease-in-out infinite;
                ">☕</div>
            `,
            'catppuccin-mocha': `
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 16px;
                    opacity: 0.2;
                    animation: float 3s ease-in-out infinite;
                ">🍫</div>
            `,
            'horizon': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 40%;
                    background: linear-gradient(
                        180deg,
                        transparent,
                        rgba(250, 155, 133, 0.05) 50%,
                        rgba(248, 140, 161, 0.05) 100%
                    );
                    pointer-events: none;
                "></div>
            `,
            'lucario': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 30px;
                    height: 30px;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 101, 65, 0.2),
                        rgba(202, 148, 255, 0.2)
                    );
                    border-radius: 50%;
                    animation: pulse 3s ease-in-out infinite;
                "></div>
            `,
            'moonlight': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 20px;
                    opacity: 0.2;
                    animation: glow 3s ease-in-out infinite;
                ">🌙</div>
            `,
            'palenight': `
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                    background: radial-gradient(
                        ellipse at top right,
                        rgba(199, 146, 234, 0.08),
                        transparent 60%
                    );
                    pointer-events: none;
                "></div>
            `,
            'shades-of-purple': `
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 4px;
                    height: 4px;
                    background: rgba(250, 208, 0, 0.6);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 20px 10px rgba(162, 129, 255, 0.2),
                        0 0 40px 20px rgba(162, 129, 255, 0.1);
                    animation: sparkle 3s ease-in-out infinite;
                "></div>
            `,
            'soft-era': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    font-size: 16px;
                    opacity: 0.1;
                    animation: sway 4s ease-in-out infinite;
                ">🌷</div>
            `,
            'witch-hazel': `
                <div style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 18px;
                    opacity: 0.15;
                    animation: twinkle 2s ease-in-out infinite;
                ">✨</div>
            `,
            
            // Professional Themes
            'apprentice': `
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(
                        90deg,
                        rgba(135, 175, 215, 0.3) 0%,
                        rgba(135, 175, 215, 0) 100%
                    );
                "></div>
            `,
            'flatland': `
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 20px;
                    height: 20px;
                    background: rgba(82, 218, 178, 0.2);
                    border: 1px solid rgba(82, 218, 178, 0.3);
                "></div>
                <div style="
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    width: 20px;
                    height: 20px;
                    background: rgba(238, 90, 95, 0.2);
                    border: 1px solid rgba(238, 90, 95, 0.3);
                "></div>
            `,
            'github-dark': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(88, 166, 255, 0.3);
                    border-radius: 50%;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 10px;
                        height: 10px;
                        background: rgba(88, 166, 255, 0.3);
                        border-radius: 50%;
                    "></div>
                </div>
            `,
            'oxocarbon': `
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 20px,
                        rgba(120, 134, 156, 0.03) 20px,
                        rgba(120, 134, 156, 0.03) 21px
                    ),
                    repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 20px,
                        rgba(120, 134, 156, 0.03) 20px,
                        rgba(120, 134, 156, 0.03) 21px
                    );
                    pointer-events: none;
                "></div>
            `,
            'protonmail': `
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 18px;
                    opacity: 0.15;
                    animation: pulse 3s ease-in-out infinite;
                ">🔒</div>
            `,
            'solarized-dark': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 2px;
                    background: rgba(181, 137, 0, 0.4);
                    animation: breathe 3s ease-in-out infinite;
                "></div>
            `,
            'thinkultra': `
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 8px;
                    height: 8px;
                    background: #e74c3c;
                    border-radius: 50%;
                    opacity: 0.6;
                    animation: blink 2s ease-in-out infinite;
                "></div>
            `,
            'vim': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-family: monospace;
                    font-size: 12px;
                    color: rgba(0, 175, 255, 0.4);
                    animation: blink 1s step-start infinite;
                ">_</div>
            `,
            'vscode-dark-plus': `
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 25px;
                    height: 25px;
                    background: linear-gradient(
                        135deg,
                        rgba(0, 122, 204, 0.2) 25%,
                        transparent 25%,
                        transparent 75%,
                        rgba(0, 122, 204, 0.2) 75%
                    );
                    animation: rotate 10s linear infinite;
                "></div>
            `,
            
            // Special Effects Themes
            'panda': `
                <div style="
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 20px;
                    opacity: 0.15;
                    animation: wobble 3s ease-in-out infinite;
                ">🐼</div>
            `
        };
        
        return decorations[themeId] || '';
    }
    
    addThemeCardEffects(card, themeId, colors) {
        // Add theme-specific interactive effects
        
        // Matrix theme: Add digital rain effect on hover
        if (themeId === 'matrix') {
            card.addEventListener('mouseenter', () => {
                const rain = card.querySelector('.matrix-rain');
                if (rain) rain.style.opacity = '0.3';
            });
            card.addEventListener('mouseleave', () => {
                const rain = card.querySelector('.matrix-rain');
                if (rain) rain.style.opacity = '0.1';
            });
        }
        
        // Cyberpunk theme: Add glitch effect on hover
        if (themeId === 'cyberpunk') {
            card.addEventListener('mouseenter', () => {
                card.style.animation = 'glitchEffect 0.3s steps(1) 1';
                setTimeout(() => {
                    card.style.animation = '';
                }, 300);
            });
        }
        
        
        // Add general hover effects
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('active')) {
                card.style.borderColor = colors.accent;
                card.style.transform = 'translateY(-4px)';
                
                // Theme-specific hover shadows
                const hoverShadows = {
                    'matrix': `0 0 30px rgba(0, 255, 65, 0.5)`,
                    'cyberpunk': `0 0 30px rgba(234, 0, 217, 0.5), 0 0 60px rgba(10, 189, 198, 0.3)`,
                    'dracula': `0 0 30px rgba(189, 147, 249, 0.4), 0 0 60px rgba(255, 121, 198, 0.2)`,
                    'tokyo-night': `0 0 20px ${colors.accent}40`,
                    'vaporwave': `0 0 30px rgba(255, 113, 206, 0.4), 0 0 60px rgba(1, 205, 254, 0.2)`,
                    'nord': `0 0 20px rgba(136, 192, 208, 0.4)`,
                    'winter-is-coming-dark': `0 0 30px rgba(255, 255, 255, 0.2)`,
                    'hotdog-stand': `0 0 20px rgba(255, 235, 59, 0.6)`,
                    'everforest-dark': `0 0 20px rgba(127, 187, 179, 0.3)`,
                    'rose-pine': `0 0 20px rgba(196, 167, 231, 0.4)`,
                    'hackthebox': `0 0 20px rgba(159, 239, 0, 0.4)`,
                    '2077': `0 0 30px rgba(240, 229, 0, 0.4), 0 0 60px rgba(234, 0, 217, 0.2)`
                };
                
                card.style.boxShadow = hoverShadows[themeId] || `0 4px 12px ${colors.accent}30`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.style.borderColor = colors.border;
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
    }
    
    initializeTheme() {
        console.log('[Theme] Initializing theme system');
        console.log(`[Theme] Auto-theme enabled: ${this.settings.autoTheme}`);
        
        // Check if auto theme is enabled
        if (this.settings.autoTheme) {
            // Apply theme based on system preference
            const systemTheme = this.getSystemTheme();
            console.log(`[Theme] System theme detected: ${systemTheme}`);
            this.applyTheme(systemTheme);
            
            // Set up listener for system theme changes
            this.setupSystemThemeListener();
        } else {
            // Apply saved theme
            console.log(`[Theme] Applying saved theme: ${this.settings.theme}`);
            this.applyTheme(this.settings.theme);
        }
    }
    
    getSystemTheme() {
        // Check if the browser supports prefers-color-scheme
        if (window.matchMedia) {
            const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            console.log(`[Theme] System prefers-color-scheme: ${darkQuery.matches ? 'dark' : 'light'}`);
            
            if (darkQuery.matches) {
                return 'dark';
            }
        } else {
            console.warn('[Theme] window.matchMedia not supported, defaulting to light theme');
        }
        return 'light';
    }
    
    setupSystemThemeListener() {
        console.log('[Theme] Setting up system theme change listener');
        
        // Listen for changes to system theme preference
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Modern browsers
            if (darkModeQuery.addEventListener) {
                darkModeQuery.addEventListener('change', (e) => {
                    console.log(`[Theme] System theme changed to: ${e.matches ? 'dark' : 'light'}`);
                    if (this.settings.autoTheme) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        console.log(`[Theme] Auto-applying system theme: ${newTheme}`);
                        this.applyTheme(newTheme);
                    }
                });
            } else if (darkModeQuery.addListener) {
                // Older browsers
                darkModeQuery.addListener((e) => {
                    if (this.settings.autoTheme) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        this.applyTheme(newTheme);
                    }
                });
            }
        }
    }
    
    applyTheme(themeId) {
        console.log(`[Theme] Applying theme: ${themeId}`);
        const startTime = performance.now();
        
        // Validate theme exists
        const themeExists = this.themes.find(t => t.id === themeId);
        if (!themeExists) {
            console.warn(`[Theme] Theme '${themeId}' not found in available themes:`, this.themes.map(t => t.id));
            console.log(`[Theme] Falling back to default theme: ayu-mirage`);
            themeId = 'ayu-mirage'; // Default theme
        }
        
        const link = document.getElementById('theme-stylesheet');
        if (!link) {
            console.error('[Theme] CRITICAL: Theme stylesheet link element not found in DOM');
            console.error('[Theme] Expected element with id="theme-stylesheet"');
            return;
        }
        
        const previousTheme = link.href;
        console.log(`[Theme] Previous theme URL: ${previousTheme}`);
        
        // Set up error handling for CSS loading
        const handleThemeLoad = () => {
            const loadTime = performance.now() - startTime;
            console.log(`[Theme] Successfully loaded theme: ${themeId} (${loadTime.toFixed(2)}ms)`);
            
            document.documentElement.setAttribute('data-theme', themeId);
            console.log(`[Theme] Set data-theme attribute to: ${themeId}`);
            
            // Update current theme in settings if not using auto theme
            if (!this.settings.autoTheme) {
                this.settings.theme = themeId;
                console.log(`[Theme] Updated settings.theme to: ${themeId}`);
            }
            
            // Verify CSS rules loaded
            try {
                const sheet = link.sheet;
                if (sheet && sheet.cssRules) {
                    console.log(`[Theme] CSS rules loaded: ${sheet.cssRules.length} rules`);
                } else {
                    console.warn(`[Theme] CSS sheet loaded but no rules found`);
                }
            } catch (e) {
                console.warn(`[Theme] Cannot access CSS rules (CORS):`, e.message);
            }
            
            // Update current theme display in settings modal
            this.updateCurrentThemeDisplay();
        };
        
        const handleThemeError = (error) => {
            console.error(`[Theme] Failed to load theme: ${themeId}`);
            console.error(`[Theme] Error details:`, error);
            console.error(`[Theme] Attempted URL: ${link.href}`);
            
            this.showToast(`Failed to load theme: ${themeId}`, 'error');
            
            if (themeId !== 'ayu-mirage') {
                console.log(`[Theme] Attempting fallback to default theme`);
                // Fallback to default theme
                this.applyTheme('ayu-mirage');
            } else {
                console.error(`[Theme] CRITICAL: Default theme also failed to load!`);
            }
        };
        
        // Remove any existing event listeners to prevent memory leaks
        link.onload = null;
        link.onerror = null;
        
        // Set up new event listeners
        link.onload = handleThemeLoad;
        link.onerror = handleThemeError;
        
        // Use base path for GitHub Pages compatibility
        const themePath = this.basePath ? `${this.basePath}themes/${themeId}.css` : `themes/${themeId}.css`;
        console.log(`[Theme] Setting theme URL to: ${themePath}`);
        console.log(`[Theme] Base path: ${this.basePath || '(none)'}`);
        
        link.href = themePath;
    }
    
    loadRecentFiles() {
        const stored = localStorage.getItem('notesWiki_recentFiles');
        if (stored) {
            this.recentFiles = JSON.parse(stored);
            this.updateRecentFilesUI();
        }
    }
    
    addToRecentFiles(path, metadata) {
        // Remove if already exists
        this.recentFiles = this.recentFiles.filter(f => f.path !== path);
        
        // Find the note's context
        const note = this.notesIndex.notes.find(n => n.path === path);
        const context = note ? note.context : null;
        
        // Check if file already exists to preserve pin status and increment view count
        const existingFile = this.recentFiles.find(f => f.path === path);
        const viewCount = existingFile ? existingFile.viewCount + 1 : 1;
        const isPinned = existingFile ? existingFile.isPinned : false;
        
        // Add to beginning
        this.recentFiles.unshift({
            path,
            title: metadata.title || 'Untitled',
            lastViewed: new Date().toISOString(),
            viewCount: viewCount,
            context: context,
            isPinned: isPinned
        });
        
        // Limit to settings
        this.recentFiles = this.recentFiles.slice(0, this.settings.recentLimit);
        
        // Save and update UI
        localStorage.setItem('notesWiki_recentFiles', JSON.stringify(this.recentFiles));
        this.updateRecentFilesUI();
    }
    
    updateRecentFilesUI() {
        const list = document.getElementById('recent-files-list');
        const count = document.getElementById('recent-count');
        
        // Sort: pinned first, then by last viewed
        const sortedFiles = [...this.recentFiles].sort((a, b) => {
            // Pinned files always come first
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            
            // Within same pin status, sort by last viewed
            return new Date(b.lastViewed) - new Date(a.lastViewed);
        });
        
        if (sortedFiles.length === 0) {
            list.innerHTML = '<li class="empty-state">No recent files</li>';
            count.style.display = 'none';
        } else {
            count.textContent = sortedFiles.length;
            count.style.display = 'flex';
            
            // Group files by context for better organization
            const groupedFiles = this.groupFilesByContext(sortedFiles);
            
            list.innerHTML = '';
            
            // Render pinned files first (ungrouped)
            const pinnedFiles = sortedFiles.filter(f => f.isPinned);
            if (pinnedFiles.length > 0) {
                const pinnedSection = this.createRecentFilesSection('📌 Pinned', pinnedFiles, true);
                list.appendChild(pinnedSection);
            }
            
            // Render grouped files (excluding pinned ones)
            const unpinnedFiles = sortedFiles.filter(f => !f.isPinned);
            const unpinnedGrouped = this.groupFilesByContext(unpinnedFiles);
            
            Object.entries(unpinnedGrouped).forEach(([contextName, files]) => {
                const sectionTitle = contextName === 'null' ? '📄 General' : `📁 ${contextName}`;
                const section = this.createRecentFilesSection(sectionTitle, files, false);
                list.appendChild(section);
            });
        }
        
        // Sync mobile badges
        this.syncMobileBadges();
    }
    
    groupFilesByContext(files) {
        return files.reduce((groups, file) => {
            const context = file.context || 'null';
            if (!groups[context]) groups[context] = [];
            groups[context].push(file);
            return groups;
        }, {});
    }
    
    createRecentFilesSection(title, files, isExpanded = true) {
        const section = document.createElement('li');
        section.className = 'recent-files-section';
        
        const header = document.createElement('div');
        header.className = 'recent-files-section-header';
        header.innerHTML = `
            <span class="section-toggle ${isExpanded ? 'expanded' : ''}">${isExpanded ? '▼' : '▶'}</span>
            <span class="section-title">${title}</span>
            <span class="section-count">${files.length}</span>
        `;
        
        const content = document.createElement('ul');
        content.className = 'recent-files-section-content';
        content.style.display = isExpanded ? 'block' : 'none';
        
        // Add toggle functionality
        header.addEventListener('click', () => {
            const toggle = header.querySelector('.section-toggle');
            const isCurrentlyExpanded = toggle.classList.contains('expanded');
            
            if (isCurrentlyExpanded) {
                toggle.classList.remove('expanded');
                toggle.textContent = '▶';
                content.style.display = 'none';
            } else {
                toggle.classList.add('expanded');
                toggle.textContent = '▼';
                content.style.display = 'block';
            }
        });
        
        // Render files in this section
        files.forEach(file => {
            const li = document.createElement('li');
            li.className = 'recent-file-item';
            
            const container = document.createElement('div');
            container.className = 'recent-file-container';
            
            const a = document.createElement('a');
            a.href = `#${file.path}`;
            a.className = 'recent-file-link';
            
            // Pin indicator
            const pinIcon = file.isPinned ? '<span class="pin-indicator">📌</span>' : '';
            
            // View count badge
            const viewBadge = file.viewCount > 1 ? `<span class="view-count">${file.viewCount}</span>` : '';
            
            a.innerHTML = `
                <div class="recent-file-main">
                    <div class="recent-file-title">${pinIcon}${this.escapeHtml(file.title)}${viewBadge}</div>
                    <div class="recent-file-meta">
                        <span class="recent-file-path">${file.path}</span>
                        <span class="recent-file-time">${this.formatRelativeTime(file.lastViewed)}</span>
                    </div>
                </div>
            `;
            
            // Actions menu
            const actionsBtn = document.createElement('button');
            actionsBtn.className = 'recent-file-actions';
            actionsBtn.innerHTML = '⋮';
            actionsBtn.title = 'Actions';
            
            // Handle file click
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleRecentFileClick(file, e);
            });
            
            // Handle middle-click
            a.addEventListener('mousedown', (e) => {
                if (e.button === 1) {
                    e.preventDefault();
                    this.openInNewTab(file.path);
                    document.getElementById('recent-dropdown').classList.remove('active');
                }
            });
            
            // Handle actions menu
            actionsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showRecentFileActions(file, actionsBtn);
            });
            
            // Handle right-click context menu
            a.addEventListener('contextmenu', (e) => {
                this.showNoteContextMenu(e, file.path, file.title);
            });
            
            container.appendChild(a);
            container.appendChild(actionsBtn);
            li.appendChild(container);
            content.appendChild(li);
        });
        
        section.appendChild(header);
        section.appendChild(content);
        return section;
    }
    
    handleRecentFileClick(file, event) {
        // Check if should open in new tab
        if (event.ctrlKey || event.metaKey) {
            this.openInNewTab(file.path);
        } else {
            // Check if note is already open in another tab
            const existingTabId = this.findTabByPath(file.path);
            if (existingTabId && existingTabId !== this.activeTabId) {
                this.switchToTab(existingTabId);
            } else {
                // Check if current tab is pinned
                const tab = this.tabs.get(this.activeTabId);
                if (tab && tab.isPinned) {
                    // Open in new tab if current tab is pinned
                    this.openInNewTab(file.path);
                } else if (tab) {
                    // Update current tab
                    tab.path = file.path;
                    this.loadNote(file.path);
                }
            }
        }
        
        // Close the dropdown
        document.getElementById('recent-dropdown').classList.remove('active');
    }
    
    showRecentFileActions(file, button) {
        // Remove any existing actions menu
        const existingMenu = document.querySelector('.recent-file-actions-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        const menu = document.createElement('div');
        menu.className = 'recent-file-actions-menu';
        
        const actions = [
            {
                icon: file.isPinned ? '📌' : '📍',
                label: file.isPinned ? 'Unpin' : 'Pin to top',
                action: () => this.toggleRecentFilePin(file.path)
            },
            {
                icon: '🗑️',
                label: 'Remove from recent',
                action: () => this.removeFromRecentFiles(file.path)
            },
            {
                icon: '📋',
                label: 'Copy path',
                action: () => navigator.clipboard.writeText(file.path)
            }
        ];
        
        actions.forEach(action => {
            const item = document.createElement('div');
            item.className = 'actions-menu-item';
            
            // Create elements safely to prevent XSS
            const iconSpan = document.createElement('span');
            iconSpan.className = 'action-icon';
            iconSpan.innerHTML = action.icon; // Icon should be safe SVG
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'action-label';
            labelSpan.textContent = action.label; // Use textContent for label
            
            item.appendChild(iconSpan);
            item.appendChild(labelSpan);
            
            item.addEventListener('click', () => {
                action.action();
                menu.remove();
            });
            menu.appendChild(item);
        });
        
        // Position menu relative to button
        const rect = button.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = `${rect.bottom + 5}px`;
        menu.style.left = `${rect.left - 150}px`; // Offset to the left
        
        document.body.appendChild(menu);
        
        // Close menu when clicking outside
        const closeMenu = (e) => {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 0);
    }
    
    toggleRecentFilePin(path) {
        const file = this.recentFiles.find(f => f.path === path);
        if (file) {
            file.isPinned = !file.isPinned;
            localStorage.setItem('notesWiki_recentFiles', JSON.stringify(this.recentFiles));
            this.updateRecentFilesUI();
            this.showToast(file.isPinned ? 'File pinned' : 'File unpinned');
        }
    }
    
    removeFromRecentFiles(path) {
        this.recentFiles = this.recentFiles.filter(f => f.path !== path);
        localStorage.setItem('notesWiki_recentFiles', JSON.stringify(this.recentFiles));
        this.updateRecentFilesUI();
        this.showToast('Removed from recent files');
    }
    
    clearRecentFiles() {
        this.recentFiles = [];
        localStorage.removeItem('notesWiki_recentFiles');
        this.updateRecentFilesUI();
    }
    
    // Bookmark Management Methods
    loadBookmarks() {
        try {
            const stored = localStorage.getItem('notesWiki_bookmarks');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Validate data structure
                if (Array.isArray(parsed)) {
                    this.bookmarks = parsed.filter(this.validateBookmark.bind(this));
                } else {
                    console.warn('Invalid bookmark data structure, resetting bookmarks');
                    this.bookmarks = [];
                }
            } else {
                this.bookmarks = [];
            }
        } catch (error) {
            console.warn('Failed to load bookmarks:', error);
            this.bookmarks = [];
            // Clear corrupted data
            try {
                localStorage.removeItem('notesWiki_bookmarks');
            } catch (removeError) {
                console.warn('Failed to clear corrupted bookmark data:', removeError);
            }
            this.showToast('Bookmark data was corrupted and has been reset', 'warning');
        }
        this.updateBookmarksUI();
    }
    
    saveBookmarks() {
        try {
            localStorage.setItem('notesWiki_bookmarks', JSON.stringify(this.bookmarks));
        } catch (error) {
            console.warn('Failed to save bookmarks:', error);
            if (error.name === 'QuotaExceededError') {
                this.showToast('Could not save bookmarks - storage quota exceeded', 'error');
            } else {
                this.showToast('Could not save bookmarks - storage may be disabled', 'error');
            }
        }
        this.updateBookmarksUI();
    }
    
    validateBookmark(bookmark) {
        return bookmark && 
               typeof bookmark.path === 'string' && 
               bookmark.path.length > 0 &&
               typeof bookmark.title === 'string' && 
               typeof bookmark.context === 'string' &&
               typeof bookmark.bookmarkedAt === 'string';
    }
    
    isBookmarked(path) {
        const normalizedPath = path.startsWith('/') ? path : '/' + path;
        return this.bookmarks.some(bookmark => bookmark.path === normalizedPath || bookmark.path === path);
    }
    
    addBookmark(path, metadata) {
        try {
            // Validate inputs
            if (!path || typeof path !== 'string') {
                console.warn('Invalid bookmark path:', path);
                this.showToast('Cannot bookmark - invalid path', 'error');
                return;
            }
            
            if (!metadata || typeof metadata !== 'object') {
                console.warn('Invalid bookmark metadata:', metadata);
                this.showToast('Cannot bookmark - invalid metadata', 'error');
                return;
            }
            
            // Don't add if already bookmarked
            if (this.isBookmarked(path)) {
                this.showToast('Note is already bookmarked', 'info');
                return;
            }
            
            // Ensure path starts with /
            const normalizedPath = path.startsWith('/') ? path : '/' + path;
            
            // Find the note's context with error handling
            let context = null;
            if (this.notesIndex && this.notesIndex.notes) {
                const note = this.notesIndex.notes.find(n => n.path === normalizedPath || n.path === path);
                context = note ? note.context : 'Unknown';
            } else {
                context = 'Unknown';
            }
            
            // Create bookmark object
            const bookmark = {
                path: normalizedPath,
                title: (metadata.title && typeof metadata.title === 'string') ? metadata.title : 'Untitled',
                context: context || 'Unknown',
                bookmarkedAt: new Date().toISOString()
            };
            
            // Validate the bookmark before adding
            if (this.validateBookmark(bookmark)) {
                this.bookmarks.push(bookmark);
                // Save and update UI
                this.saveBookmarks();
                this.showToast('Bookmark added');
            } else {
                console.error('Invalid bookmark object:', bookmark);
                this.showToast('Failed to create bookmark - invalid data', 'error');
            }
        } catch (error) {
            console.error('Error adding bookmark:', error);
            this.showToast('Failed to add bookmark', 'error');
        }
    }
    
    removeBookmark(path) {
        try {
            // Validate input
            if (!path || typeof path !== 'string') {
                console.warn('Invalid bookmark path for removal:', path);
                this.showToast('Cannot remove bookmark - invalid path', 'error');
                return;
            }
            
            const normalizedPath = path.startsWith('/') ? path : '/' + path;
            const initialLength = this.bookmarks.length;
            
            this.bookmarks = this.bookmarks.filter(b => b.path !== normalizedPath && b.path !== path);
            
            if (this.bookmarks.length < initialLength) {
                this.saveBookmarks();
                this.showToast('Bookmark removed');
            } else {
                this.showToast('Bookmark not found', 'warning');
            }
        } catch (error) {
            console.error('Error removing bookmark:', error);
            this.showToast('Failed to remove bookmark', 'error');
        }
    }
    
    toggleBookmark(path, metadata) {
        if (this.isBookmarked(path)) {
            this.removeBookmark(path);
            return false;
        } else {
            this.addBookmark(path, metadata);
            return true;
        }
    }
    
    getBookmarks() {
        // Sort bookmarks by title
        return [...this.bookmarks].sort((a, b) => 
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
    }
    
    clearAllBookmarks() {
        this.bookmarks = [];
        localStorage.removeItem('notesWiki_bookmarks');
        this.updateBookmarksUI();
        this.showToast('All bookmarks cleared');
    }
    
    navigateToBookmark(path) {
        // Close dropdown
        this.closeAllDropdowns();
        
        // Check if note is already open in another tab
        const existingTabId = this.findTabByPath(path);
        if (existingTabId && existingTabId !== this.activeTabId) {
            this.switchToTab(existingTabId);
        } else {
            // Check if current tab is pinned
            const tab = this.tabs.get(this.activeTabId);
            if (tab && tab.isPinned) {
                // Open in new tab if current tab is pinned
                this.openInNewTab(path);
            } else if (tab) {
                // Update current tab and load note
                tab.path = path;
                this.loadNote(path);
            }
        }
    }
    
    updateBookmarksUI() {
        // Update dropdown count
        const count = document.getElementById('bookmarks-count');
        if (count) {
            count.textContent = this.bookmarks.length;
            count.style.display = this.bookmarks.length > 0 ? 'inline' : 'none';
        }
        
        // Update sidebar count
        const sidebarCount = document.getElementById('bookmark-count-sidebar');
        if (sidebarCount) {
            sidebarCount.textContent = this.bookmarks.length;
            sidebarCount.style.display = this.bookmarks.length > 0 ? 'inline-block' : 'none';
        }
        
        // Update bookmarks list in dropdown
        const list = document.getElementById('bookmarks-list');
        if (list) {
            if (this.bookmarks.length === 0) {
                list.innerHTML = '<li class="empty-state">No bookmarks yet</li>';
            } else {
                const sortedBookmarks = this.getBookmarks();
                list.innerHTML = sortedBookmarks.map(bookmark => {
                    const contextClass = bookmark.context ? `context-${bookmark.context}` : '';
                    const bookmarkPath = bookmark.path.startsWith('/') ? bookmark.path : '/' + bookmark.path;
                    return `
                        <li class="bookmark-item">
                            <a href="#${bookmarkPath}" class="bookmark-link" data-path="${bookmarkPath}" data-title="${this.escapeHtml(bookmark.title)}">
                                <span class="bookmark-title">${this.escapeHtml(bookmark.title)}</span>
                                ${bookmark.context ? `<span class="bookmark-context ${contextClass}">${bookmark.context}</span>` : ''}
                            </a>
                            <button class="bookmark-remove" data-path="${bookmark.path}" aria-label="Remove bookmark">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </li>
                    `;
                }).join('');
                
                // Add event listeners for bookmark interactions
                list.querySelectorAll('.bookmark-link').forEach(link => {
                    const path = link.dataset.path;
                    const title = link.dataset.title;
                    
                    // Handle bookmark click
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.navigateToBookmark(path);
                    });
                    
                    // Handle right-click context menu
                    link.addEventListener('contextmenu', (e) => {
                        this.showNoteContextMenu(e, path, title);
                    });
                });
                
                // Add event listeners for remove buttons
                list.querySelectorAll('.bookmark-remove').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.removeBookmark(button.dataset.path);
                    });
                });
            }
        }
        
        // Update bookmark button if viewing a note
        if (this.currentNotePath) {
            const bookmarkBtn = document.querySelector('.bookmark-btn');
            if (bookmarkBtn) {
                const isBookmarked = this.isBookmarked(this.currentNotePath);
                bookmarkBtn.innerHTML = isBookmarked ? 
                    '<i class="icon">★</i>' : '<i class="icon">☆</i>';
                bookmarkBtn.title = isBookmarked ? 
                    'Remove bookmark (Ctrl+D)' : 'Bookmark this note (Ctrl+D)';
                bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
            }
        }
        
        // Sync mobile badges
        this.syncMobileBadges();
    }
    
    loadSettings() {
        try {
            const stored = localStorage.getItem('notesWiki_settings');
            if (stored) {
                this.settings = { ...this.settings, ...JSON.parse(stored) };
                // Restore active context
                this.activeContext = this.settings.activeContext;
            }
        } catch (error) {
            console.warn('Failed to load settings from localStorage:', error);
            // Continue with default settings
            console.log('Using default settings due to localStorage error');
        }
    }
    
    buildContextSwitcher() {
        const contextSwitcher = document.getElementById('context-switcher');
        if (!contextSwitcher || !this.contexts || this.contexts.length === 0) return;
        
        // Clear existing content
        contextSwitcher.innerHTML = '';
        
        // Check if we need dropdown view (mobile or too many contexts)
        const isMobile = window.innerWidth <= 768;
        const needsDropdown = isMobile || this.contexts.length > 6;
        
        if (needsDropdown) {
            // Create dropdown view
            const dropdown = document.createElement('div');
            dropdown.className = 'context-dropdown';
            
            // Create dropdown toggle button
            const dropdownToggle = document.createElement('button');
            dropdownToggle.className = 'icon-button context-dropdown-toggle' + (this.activeContext ? ' active' : '');
            const activeContextName = this.activeContext ? 
                this.contexts.find(c => c.id === this.activeContext)?.name || 'Unknown' : 
                'All';
            dropdownToggle.innerHTML = `
                <span class="context-dropdown-label">${activeContextName}</span>
                <svg class="context-dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
            `;
            
            // Create dropdown menu
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'context-dropdown-menu';
            
            // Add "All" option to dropdown
            const allDropdownItem = document.createElement('button');
            allDropdownItem.className = 'context-dropdown-item' + (!this.activeContext ? ' active' : '');
            allDropdownItem.innerHTML = `<span>All</span>`;
            allDropdownItem.addEventListener('click', () => {
                this.setActiveContext(null);
                dropdown.classList.remove('active');
                dropdownToggle.querySelector('.context-dropdown-label').textContent = 'All';
                // Update toggle appearance
                if (!this.activeContext) {
                    dropdownToggle.classList.add('active');
                } else {
                    dropdownToggle.classList.remove('active');
                }
            });
            dropdownMenu.appendChild(allDropdownItem);
            
            // Add context options to dropdown
            this.contexts.forEach(context => {
                const item = document.createElement('button');
                item.className = 'context-dropdown-item' + (this.activeContext === context.id ? ' active' : '');
                
                const span = document.createElement('span');
                span.textContent = context.name;
                item.appendChild(span);
                
                item.addEventListener('click', () => {
                    this.setActiveContext(context.id);
                    dropdown.classList.remove('active');
                    dropdownToggle.querySelector('.context-dropdown-label').textContent = context.name;
                    // Update toggle appearance
                    dropdownToggle.classList.add('active');
                });
                dropdownMenu.appendChild(item);
            });
            
            // Toggle dropdown on click
            dropdownToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
            
            // Store dropdown close handler for cleanup
            this.dropdownCloseHandler = (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            };
            
            // Close dropdown when clicking outside
            document.addEventListener('click', this.dropdownCloseHandler);
            
            // Prevent scroll propagation when dropdown is open
            dropdownMenu.addEventListener('wheel', (e) => {
                const menu = e.currentTarget;
                const scrollTop = menu.scrollTop;
                const scrollHeight = menu.scrollHeight;
                const height = menu.offsetHeight;
                const delta = e.deltaY;
                const up = delta < 0;
                
                // Prevent scroll if we're at the top and scrolling up
                // or at the bottom and scrolling down
                if (!up && scrollHeight - height - scrollTop <= 1) {
                    e.preventDefault();
                } else if (up && scrollTop === 0) {
                    e.preventDefault();
                }
                
                // Always stop propagation to prevent body scroll
                e.stopPropagation();
            });
            
            dropdown.appendChild(dropdownToggle);
            dropdown.appendChild(dropdownMenu);
            contextSwitcher.appendChild(dropdown);
        } else {
            // Create button view
            const buttonsWrapper = document.createElement('div');
            buttonsWrapper.className = 'context-buttons-wrapper';
            
            // Add "All" button
            const allButton = document.createElement('button');
            allButton.className = 'context-button' + (!this.activeContext ? ' active' : '');
            allButton.innerHTML = `<span>All</span>`;
            allButton.addEventListener('click', () => this.setActiveContext(null));
            buttonsWrapper.appendChild(allButton);
            
            // Add context buttons
            this.contexts.forEach(context => {
                const button = document.createElement('button');
                button.className = 'context-button' + (this.activeContext === context.id ? ' active' : '');
                
                // Use textContent instead of innerHTML to prevent XSS
                const span = document.createElement('span');
                span.textContent = context.name;
                button.appendChild(span);
                
                button.addEventListener('click', () => this.setActiveContext(context.id));
                buttonsWrapper.appendChild(button);
            });
            
            contextSwitcher.appendChild(buttonsWrapper);
        }
        
        // Set up responsive handler
        this.setupContextResponsive();
    }
    
    setupContextResponsive() {
        // Handle window resize
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.buildContextSwitcher(); // Rebuild on resize
            }, 150);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Store handler for cleanup
        this.contextResizeHandler = handleResize;
    }
    
    setActiveContext(contextId) {
        this.activeContext = contextId;
        this.settings.activeContext = contextId;
        this.saveSettings();
        
        // Update button UI
        document.querySelectorAll('.context-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Update dropdown UI
        document.querySelectorAll('.context-dropdown-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Update dropdown toggle state
        const dropdownToggle = document.querySelector('.context-dropdown-toggle');
        
        if (contextId) {
            // Update buttons
            const activeBtn = Array.from(document.querySelectorAll('.context-button')).find(
                btn => btn.textContent.toLowerCase().includes(contextId.replace('-', ' '))
            );
            if (activeBtn) activeBtn.classList.add('active');
            
            // Update dropdown items
            const activeDropdownItem = Array.from(document.querySelectorAll('.context-dropdown-item')).find(
                item => item.textContent.toLowerCase().includes(contextId.replace('-', ' '))
            );
            if (activeDropdownItem) activeDropdownItem.classList.add('active');
            
            // Update dropdown toggle text and state
            const dropdownLabel = document.querySelector('.context-dropdown-label');
            if (dropdownLabel) {
                const context = this.contexts.find(c => c.id === contextId);
                if (context) dropdownLabel.textContent = context.name;
            }
            if (dropdownToggle) dropdownToggle.classList.add('active');
        } else {
            // Set "All" as active
            const allButton = document.querySelector('.context-button');
            if (allButton) allButton.classList.add('active');
            
            const allDropdownItem = document.querySelector('.context-dropdown-item');
            if (allDropdownItem) allDropdownItem.classList.add('active');
            
            // Update dropdown toggle text and state
            const dropdownLabel = document.querySelector('.context-dropdown-label');
            if (dropdownLabel) dropdownLabel.textContent = 'All';
            if (dropdownToggle) dropdownToggle.classList.remove('active');
        }
        
        // Rebuild navigation with filtered notes
        this.buildNavigationTree();
        
        // Filter search index
        this.buildSearchIndex();
        
        // Filter tags
        this.buildTagFilter();
        
        // Filter recent files display
        this.updateRecentFilesUI();
    }
    
    saveSettings() {
        try {
            localStorage.setItem('notesWiki_settings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Failed to save settings to localStorage:', error);
            // Show user notification about storage issue
            this.showToast('Settings could not be saved (storage full or disabled)');
        }
    }
    
    getKeyCombo(e) {
        const keys = [];
        if (e.ctrlKey || e.metaKey) keys.push('Ctrl');
        if (e.altKey) keys.push('Alt');
        if (e.shiftKey) keys.push('Shift');
        
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control' || key === 'Alt' || key === 'Shift' || key === 'Meta') {
            return ''; // Don't return just modifier keys
        }
        else if (key.length === 1) {
            key = key.toUpperCase();
        }
        
        keys.push(key);
        return keys.join('+');
    }
    
    updateKeyboardShortcuts() {
        // The keyboard handler automatically uses the updated shortcuts from settings
        // No need to remove/re-add the listener since it reads from this.settings.keyboardShortcuts
        this.showToast('Keyboard shortcuts updated');
    }
    
    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    createCalloutExtension() {
        const self = this;
        
        // Define helper functions at extension level
        const getDefaultTitle = (type) => {
            const titles = {
                'warning': 'Warning',
                'info': 'Info',
                'tip': 'Tip',
                'note': 'Note',
                'danger': 'Danger',
                'important': 'Important',
                'caution': 'Caution',
                'success': 'Success',
                'question': 'Question',
                'example': 'Example',
                'quote': 'Quote',
                'bug': 'Bug',
                'todo': 'To Do'
            };
            return titles[type] || type.charAt(0).toUpperCase() + type.slice(1);
        };
        
        const getCalloutIcon = (type) => {
            const icons = {
                'warning': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
                'info': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>',
                'tip': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>',
                'note': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V5h4v10a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a1 1 0 100 2h2v10h-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v6z" clip-rule="evenodd"/></svg>',
                'danger': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
                'important': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
                'caution': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
                'success': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
                'question': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>',
                'example': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>',
                'quote': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>',
                'bug': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"/><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"/></svg>',
                'todo': '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V5h4v10a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a1 1 0 100 2h2v10h-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v6z" clip-rule="evenodd"/></svg>'
            };
            return icons[type] || icons['note'];
        };
        
        return {
            name: 'callout',
            level: 'block',
            start(src) {
                // Check if the line starts with a callout pattern
                const match = src.match(/^> \[!(WARNING|INFO|TIP|NOTE|DANGER|IMPORTANT|CAUTION|SUCCESS|QUESTION|EXAMPLE|QUOTE|BUG|TODO)\]/m);
                return match ? src.indexOf(match[0]) : -1;
            },
            tokenizer(src, tokens) {
                // Match callout blocks
                // First try to match callout with custom title on same line
                let rule = /^> \[!(WARNING|INFO|TIP|NOTE|DANGER|IMPORTANT|CAUTION|SUCCESS|QUESTION|EXAMPLE|QUOTE|BUG|TODO)\]\s+([^\n]+)\n((?:>.*(?:\n|$))*)/;
                let match = rule.exec(src);
                
                // If no match, try without custom title
                if (!match) {
                    rule = /^> \[!(WARNING|INFO|TIP|NOTE|DANGER|IMPORTANT|CAUTION|SUCCESS|QUESTION|EXAMPLE|QUOTE|BUG|TODO)\]\s*\n((?:>.*(?:\n|$))*)/;
                    match = rule.exec(src);
                    
                    if (match) {
                        // Rearrange match array to have consistent structure
                        match = [match[0], match[1], undefined, match[2]];
                    }
                }
                
                if (match) {
                    const type = match[1].toLowerCase();
                    const customTitle = match[2];
                    const title = customTitle || getDefaultTitle(type);
                    
                    // Process content lines - remove '> ' prefix
                    const rawContent = match[3];
                    const contentLines = rawContent
                        .split('\n')
                        .map(line => {
                            // Remove the '>' and any following space at the start of the line
                            // Handle both "> " and ">" cases
                            if (line.startsWith('> ')) {
                                return line.substring(2);
                            } else if (line.startsWith('>')) {
                                return line.substring(1);
                            }
                            return line;
                        })
                        .filter((line, index, arr) => {
                            // Keep non-empty lines or empty lines that are between content
                            return line.trim() || (index > 0 && index < arr.length - 1);
                        });
                    
                    const content = contentLines.join('\n').trim();
                    
                    return {
                        type: 'callout',
                        raw: match[0],
                        calloutType: type,
                        title: title,
                        content: content,
                        tokens: this.lexer.blockTokens(content)
                    };
                }
            },
            renderer(token) {
                const icon = getCalloutIcon(token.calloutType);
                
                // Parse the content, which should already have > removed
                let renderedContent = this.parser.parse(token.tokens);
                
                
                // Check if marked wrapped content in blockquote tags
                if (renderedContent.includes('<blockquote>')) {
                    // Remove blockquote tags while preserving inner content
                    renderedContent = renderedContent
                        .replace(/<blockquote>\s*/g, '')
                        .replace(/\s*<\/blockquote>/g, '');
                }
                
                // Also check for escaped > characters at the start of any paragraph
                renderedContent = renderedContent.replace(/<p>&gt;\s*/g, '<p>');
                
                return `<div class="callout callout-${token.calloutType}">
                    <div class="callout-header">
                        <span class="callout-icon">${icon}</span>
                        <span class="callout-title">${self.escapeHtml(token.title)}</span>
                    </div>
                    <div class="callout-content">
                        ${renderedContent}
                    </div>
                </div>`;
            }
        };
    }
    
    createWikiLinkExtension() {
        const self = this;
        
        return {
            name: 'wikiLink',
            level: 'inline',
            start(src) {
                const match = src.match(/\[\[/);
                return match ? match.index : -1;
            },
            tokenizer(src, tokens) {
                const rule = /^\[\[([^\[\]]+)\]\]/;
                const match = rule.exec(src);
                
                if (match) {
                    const noteTitle = match[1].trim();
                    
                    return {
                        type: 'wikiLink',
                        raw: match[0],
                        noteTitle: noteTitle
                    };
                }
            },
            renderer(token) {
                const noteTitle = token.noteTitle;
                
                // Try to find the note in the index by title
                let targetNote = null;
                if (self.notesIndex && self.notesIndex.notes) {
                    targetNote = self.notesIndex.notes.find(note => 
                        note.metadata.title.toLowerCase() === noteTitle.toLowerCase()
                    );
                }
                
                if (targetNote) {
                    // Note exists, create a link to it
                    const href = `#${targetNote.path}`;
                    return `<a href="${href}" class="wiki-link" title="Go to: ${self.escapeHtml(noteTitle)}">${self.escapeHtml(noteTitle)}</a>`;
                } else {
                    // Note doesn't exist, show as broken link
                    return `<span class="wiki-link wiki-link-broken" title="Note not found: ${self.escapeHtml(noteTitle)}">${self.escapeHtml(noteTitle)}</span>`;
                }
            }
        };
    }
    
    createHtmlPassthroughExtension() {
        // Actually, let's try a different approach - use marked's hooks instead
        // The issue is that marked.js should already support HTML passthrough by default
        // We just need to ensure it's not being escaped
        return [];
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        
        return date.toLocaleDateString();
    }
    
    setActiveFile(path) {
        // Remove active class from all links
        document.querySelectorAll('.file-tree-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate the link for this path
        const activeLink = document.querySelector(`.file-tree-link[data-path="${path}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Expand all parent folders to make the active file visible
            let parentFolder = activeLink.closest('.file-tree-folder');
            while (parentFolder) {
                const folderItem = parentFolder.closest('.file-tree-folder-item');
                if (folderItem && !folderItem.classList.contains('expanded')) {
                    folderItem.classList.add('expanded');
                }
                // Move up to the next parent folder
                parentFolder = folderItem ? folderItem.parentElement.closest('.file-tree-folder') : null;
            }
            
            // Scroll the active file into view if needed
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    applyLineNumberSetting() {
        // Apply or remove the line numbers class from the body
        if (this.settings.showLineNumbers) {
            document.body.classList.add('show-line-numbers');
        } else {
            document.body.classList.remove('show-line-numbers');
        }
        
        // If we're currently viewing a note, re-render it to apply the new setting
        if (this.currentNote) {
            this.renderNote();
        }
    }
    
    applyWordWrapSetting() {
        // Apply or remove the word wrap class from the body
        if (this.settings.enableWordWrap) {
            document.body.classList.add('enable-word-wrap');
        } else {
            document.body.classList.remove('enable-word-wrap');
        }
    }
    
    applyContentWidthSetting() {
        // Remove all content width classes including focus mode width
        document.body.classList.remove('content-width-narrow', 'content-width-normal', 'content-width-wide', 'content-width-full', 'focus-mode-wide');
        
        // Apply the selected content width class
        document.body.classList.add(`content-width-${this.settings.contentWidth}`);
    }
    
    applyFontSettings() {
        // Apply font size
        document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large', 'font-size-extra-large');
        document.body.classList.add(`font-size-${this.settings.fontSize}`);
        
        // Apply font family
        document.body.classList.remove('font-family-system', 'font-family-sans-serif', 'font-family-serif', 'font-family-monospace');
        document.body.classList.add(`font-family-${this.settings.fontFamily}`);
    }
    
    applyCustomCSS() {
        // Remove existing custom CSS element if it exists
        const existingStyle = document.getElementById('custom-css-style');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Add new custom CSS if provided
        if (this.settings.customCSS.trim()) {
            const style = document.createElement('style');
            style.id = 'custom-css-style';
            style.textContent = this.settings.customCSS;
            document.head.appendChild(style);
        }
    }
    
    // Tab Management Methods
    initializeTabs() {
        // Set up event listeners for tab system
        const closeAllButton = document.getElementById('tab-close-all-button');
        if (closeAllButton) {
            closeAllButton.addEventListener('click', () => {
                this.confirmCloseAllTabs();
            });
        }
        
        // Try to restore saved tabs
        const tabsRestored = this.restoreTabState();
        
        if (!tabsRestored) {
            // Create initial tab based on default home page setting
            let initialPath = '/notes/index.md';
            let initialTitle = 'Home';
            
            if (this.settings.defaultHomePage === 'last-viewed' && this.recentFiles.length > 0) {
                // Use the most recent file
                initialPath = this.recentFiles[0].path;
                initialTitle = this.recentFiles[0].title;
            } else if (this.settings.defaultHomePage === 'specific' && this.settings.specificHomeNote) {
                // Use the specific note
                initialPath = this.settings.specificHomeNote;
                // Try to find the title from the notes index
                const noteInfo = this.notesIndex?.notes?.find(note => note.path === initialPath);
                if (noteInfo) {
                    initialTitle = noteInfo.metadata.title;
                }
            } else if (this.initialHash) {
                // Use the hash from the URL if provided
                initialPath = this.initialHash.slice(1);
            }
            
            this.createNewTab(initialPath, initialTitle);
        }
        
        // Save tab state whenever tabs change
        this.enableAutoSaveTabState();
        
        // Global click handler removed - we now handle clicks on individual links
        // to avoid duplicate tab creation
        
        // Tab keyboard shortcuts are now handled in the global keyboard handler
        
        // Ensure tag count badge is properly initialized
        this.updateTagCountBadge();
    }
    
    createNewTab(path = '/notes/index.md', title = 'New Tab', preserveContext = false) {
        const tabId = `tab-${this.tabIdCounter++}`;
        const tab = {
            id: tabId,
            path: path,
            title: title,
            scrollPosition: 0,
            isPinned: false
        };
        
        this.tabs.set(tabId, tab);
        this.renderTab(tabId);
        // Switch to tab and pass preserveContext flag
        this.switchToTab(tabId, preserveContext);
        
        // Load content for the tab
        if (path) {
            this.loadNoteInTab(path, tabId);
        }
        
        // Save tab state
        if (this.tabStateSaveDebounced) {
            this.tabStateSaveDebounced();
        }
        
        return tabId;
    }
    
    renderTab(tabId) {
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        // Check if tab element already exists
        let tabElement = document.getElementById(tabId);
        if (tabElement) {
            // Update existing tab instead of creating new one
            tabElement.querySelector('.tab-title').textContent = this.escapeHtml(tab.title);
            return;
        }
        
        tabElement = document.createElement('div');
        tabElement.className = `tab${tab.isPinned ? ' pinned' : ''}`;
        tabElement.id = tabId;
        tabElement.draggable = !tab.isSplitView && !tab.isPinned; // Pinned tabs should not be draggable
        tabElement.innerHTML = `
            ${tab.isPinned ? '<span class="tab-pin-indicator" title="Pinned tab">📌</span>' : ''}
            <span class="tab-title">${this.escapeHtml(tab.title)}</span>
            <button class="tab-close" aria-label="Close tab" ${tab.isPinned ? 'style="display: none;"' : ''}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M7 7.707l3.146 3.147a.5.5 0 00.708-.708L7.707 7l3.147-3.146a.5.5 0 00-.708-.708L7 6.293 3.854 3.146a.5.5 0 10-.708.708L6.293 7l-3.147 3.146a.5.5 0 00.708.708L7 7.707z"/>
                </svg>
            </button>
        `;
        
        // Click to switch tab
        tabElement.addEventListener('click', (e) => {
            if (!e.target.closest('.tab-close')) {
                this.switchToTab(tabId);
            }
        });
        
        // Removed tab preview functionality - no longer needed
        
        // Middle-click to close
        tabElement.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                if (!tab.isPinned) {
                    this.closeTab(tabId);
                }
            }
        });
        
        // Close button
        tabElement.querySelector('.tab-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tabId);
        });
        
        // Context menu (right-click)
        tabElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showTabContextMenu(e, tabId);
        });
        
        // Drag and drop
        this.setupTabDragAndDrop(tabElement, tabId);
        
        document.getElementById('tabs-container').appendChild(tabElement);
    }
    
    setupTabDragAndDrop(tabElement, tabId) {
        tabElement.addEventListener('dragstart', (e) => {
            this.draggedTabId = tabId;
            tabElement.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        
        tabElement.addEventListener('dragend', () => {
            tabElement.classList.remove('dragging');
            this.draggedTabId = null;
        });
        
        tabElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (this.draggedTabId && this.draggedTabId !== tabId) {
                const draggingElement = document.getElementById(this.draggedTabId);
                const rect = tabElement.getBoundingClientRect();
                const midpoint = rect.left + rect.width / 2;
                
                if (e.clientX < midpoint) {
                    tabElement.parentNode.insertBefore(draggingElement, tabElement);
                } else {
                    tabElement.parentNode.insertBefore(draggingElement, tabElement.nextSibling);
                }
                
                // Update tab order in memory
                this.updateTabOrder();
            }
        });
    }
    
    updateTabOrder() {
        const container = document.getElementById('tabs-container');
        const tabElements = container.querySelectorAll('.tab');
        const newOrder = new Map();
        
        tabElements.forEach((element) => {
            const tabId = element.id;
            const tab = this.tabs.get(tabId);
            if (tab) {
                newOrder.set(tabId, tab);
            }
        });
        
        this.tabs = newOrder;
        this.saveTabState();
    }
    
    switchToTab(tabId, preserveContext = false) {
        const tab = this.tabs.get(tabId);
        if (!tab) {
            console.warn(`Tab ${tabId} not found in tabs Map`);
            return;
        }
        
        // Ensure tab element exists and is clickable
        const tabElement = document.getElementById(tabId);
        if (!tabElement) {
            console.warn(`Tab element ${tabId} not found in DOM, re-rendering`);
            this.renderTab(tabId);
            return;
        }
        
        // Save current tab's scroll position
        if (this.activeTabId) {
            const currentTab = this.tabs.get(this.activeTabId);
            if (currentTab) {
                currentTab.scrollPosition = document.getElementById('main-content').scrollTop;
            }
            
            // Don't save split view content to tabContents - it's handled separately
            if (!currentTab?.isSplitView) {
                // Save current tab's content with memory management
                const content = document.getElementById('main-content').innerHTML;
                this.tabContents.set(this.activeTabId, content);
                
                // Limit cache size to prevent memory issues
                const MAX_CACHED_TABS = 10;
                if (this.tabContents.size > MAX_CACHED_TABS) {
                    // Remove oldest cached content (first in map)
                    const firstKey = this.tabContents.keys().next().value;
                    if (firstKey !== this.activeTabId) {
                        this.tabContents.delete(firstKey);
                    }
                }
            } else if (currentTab?.isSplitView) {
                // Save split view pane scroll positions
                const leftPane = document.getElementById('pane-content-left');
                const rightPane = document.getElementById('pane-content-right');
                if (leftPane && rightPane && this.splitViewState) {
                    this.splitViewState.leftScrollPosition = leftPane.scrollTop || 0;
                    this.splitViewState.rightScrollPosition = rightPane.scrollTop || 0;
                }
            }
        }
        
        // Update active states
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.getElementById(tabId)?.classList.add('active');
        
        this.activeTabId = tabId;
        
        // Check if tab has pending load
        if (tab.pendingLoad) {
            const pendingPath = tab.pendingLoad;
            delete tab.pendingLoad;
            this.loadNote(pendingPath).then(() => {
                // Update tab title after successful load
                if (this.currentNote && this.currentNote.metadata.title) {
                    tab.title = this.currentNote.metadata.title;
                    const tabElement = document.getElementById(tabId);
                    if (tabElement) {
                        tabElement.querySelector('.tab-title').textContent = tab.title;
                    }
                    this.saveTabState();
                }
            }).catch(() => {
                // Load failed, keep the placeholder title
            });
        } else {
            // Check if this is a split view tab
            if (tab.isSplitView) {
                // Render split view content
                this.renderSplitViewContent();
                
                // Restore any previously loaded notes
                if (this.splitViewState) {
                    if (this.splitViewState.leftPath) {
                        this.loadNoteInSplitPane(this.splitViewState.leftPath, 'pane-left');
                    }
                    if (this.splitViewState.rightPath) {
                        this.loadNoteInSplitPane(this.splitViewState.rightPath, 'pane-right');
                    }
                    
                    // If no notes to load, just restore scroll positions for empty panes
                    if (!this.splitViewState.leftPath && !this.splitViewState.rightPath) {
                        setTimeout(() => {
                            const leftPane = document.getElementById('pane-content-left');
                            const rightPane = document.getElementById('pane-content-right');
                            if (leftPane && this.splitViewState.leftScrollPosition) {
                                leftPane.scrollTop = this.splitViewState.leftScrollPosition;
                            }
                            if (rightPane && this.splitViewState.rightScrollPosition) {
                                rightPane.scrollTop = this.splitViewState.rightScrollPosition;
                            }
                        }, 0);
                    }
                }
            } else {
                // Restore tab content and scroll position
                const savedContent = this.tabContents.get(tabId);
                if (savedContent) {
                    document.getElementById('main-content').innerHTML = savedContent;
                    document.getElementById('main-content').scrollTop = tab.scrollPosition || 0;
                    
                    // Re-setup event listeners for the restored content
                    this.setupContentEventListeners();
                } else {
                    // Load content if not cached
                    this.loadNoteInTab(tab.path, tabId);
                }
            }
        }
        
        // Update URL (skip for split view tabs)
        if (!tab.isSplitView) {
            window.history.replaceState(null, '', `#${tab.path}`);
        }
        
        // Always switch to the appropriate context when switching tabs
        if (!preserveContext) {
            // Check if we need to switch context
            const noteData = this.notesIndex.notes.find(note => note.path === tab.path);
            if (noteData && noteData.context !== this.activeContext) {
                // Switch to the note's context
                this.setActiveContext(noteData.context);
            }
        }
        
        // Update sidebar active file highlight AFTER context switch
        // Use setTimeout to ensure the DOM has been updated after context switch
        setTimeout(() => {
            this.setActiveFile(tab.path);
        }, 0);
        
        this.saveTabState();
    }
    
    showTabContextMenu(event, tabId) {
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        // Create context menu container
        const contextMenu = document.createElement('div');
        contextMenu.className = 'tab-context-menu';
        contextMenu.style.position = 'fixed';
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.zIndex = '10000';
        
        // Menu items
        const menuItems = [
            {
                label: tab.isPinned ? 'Unpin Tab' : 'Pin Tab',
                icon: tab.isPinned ? '📌' : '📍',
                action: () => this.togglePinTab(tabId)
            },
            {
                label: 'Close Tab',
                icon: '✕',
                action: () => this.closeTab(tabId),
                className: 'danger'
            },
            {
                label: 'Close Other Tabs',
                icon: '🗑️',
                action: () => this.closeOtherTabs(tabId),
                className: 'danger'
            },
            {
                label: 'Close All Tabs',
                icon: '💥',
                action: () => this.closeAllTabs(),
                className: 'danger'
            }
        ];
        
        // Build menu HTML
        contextMenu.innerHTML = menuItems.map(item => `
            <div class="context-menu-item${item.className ? ' ' + item.className : ''}">
                <span class="context-menu-icon">${item.icon}</span>
                <span class="context-menu-label">${item.label}</span>
            </div>
        `).join('');
        
        // Add event listeners
        const items = contextMenu.querySelectorAll('.context-menu-item');
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                menuItems[index].action();
                contextMenu.remove();
            });
        });
        
        // Close menu when clicking outside
        const closeMenu = (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.remove();
                document.removeEventListener('click', closeMenu);
                document.removeEventListener('contextmenu', closeMenu);
            }
        };
        
        // Delay adding the close listener to prevent immediate closure
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
            document.addEventListener('contextmenu', closeMenu);
        }, 0);
        
        // Add to document
        document.body.appendChild(contextMenu);
        
        // Show the menu by adding the show class
        contextMenu.classList.add('show');
        
        // Adjust position if menu goes off-screen
        const rect = contextMenu.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            contextMenu.style.left = `${window.innerWidth - rect.width - 5}px`;
        }
        if (rect.bottom > window.innerHeight) {
            contextMenu.style.top = `${window.innerHeight - rect.height - 5}px`;
        }
    }
    
    togglePinTab(tabId) {
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        tab.isPinned = !tab.isPinned;
        
        // Re-render the tab to update UI
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
            // Update classes
            if (tab.isPinned) {
                tabElement.classList.add('pinned');
                tabElement.draggable = false;
                
                // Add pin indicator if not exists
                if (!tabElement.querySelector('.tab-pin-indicator')) {
                    const pinIndicator = document.createElement('span');
                    pinIndicator.className = 'tab-pin-indicator';
                    pinIndicator.title = 'Pinned tab';
                    pinIndicator.textContent = '📌';
                    tabElement.insertBefore(pinIndicator, tabElement.firstChild);
                }
                
                // Hide close button
                const closeBtn = tabElement.querySelector('.tab-close');
                if (closeBtn) closeBtn.style.display = 'none';
            } else {
                tabElement.classList.remove('pinned');
                tabElement.draggable = !tab.isSplitView;
                
                // Remove pin indicator
                const pinIndicator = tabElement.querySelector('.tab-pin-indicator');
                if (pinIndicator) pinIndicator.remove();
                
                // Show close button
                const closeBtn = tabElement.querySelector('.tab-close');
                if (closeBtn) closeBtn.style.display = '';
            }
        }
        
        // Save tab state
        if (this.tabStateSaveDebounced) {
            this.tabStateSaveDebounced();
        }
        
        this.showToast(tab.isPinned ? 'Tab pinned' : 'Tab unpinned', 'info');
    }
    
    showNoteContextMenu(event, notePath, noteTitle) {
        event.preventDefault();
        event.stopPropagation();
        
        // Create context menu container
        const contextMenu = document.createElement('div');
        contextMenu.className = 'note-context-menu';
        contextMenu.style.position = 'fixed';
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.zIndex = '10000';
        
        // Check if note is already bookmarked
        const isBookmarked = this.bookmarks.some(bookmark => bookmark.path === notePath);
        
        // Menu items
        const menuItems = [
            {
                label: 'Open in New Tab',
                icon: '📄',
                action: () => this.openInNewTab(notePath)
            },
            {
                label: isBookmarked ? 'Remove Bookmark' : 'Bookmark Note',
                icon: isBookmarked ? '🔖' : '⭐',
                action: () => this.toggleNoteBookmark(notePath, noteTitle)
            },
            {
                label: 'Share Note',
                icon: '🔗',
                action: () => this.shareNote(notePath, noteTitle)
            }
        ];
        
        // Build menu HTML
        contextMenu.innerHTML = menuItems.map(item => `
            <div class="context-menu-item${item.className ? ' ' + item.className : ''}">
                <span class="context-menu-icon">${item.icon}</span>
                <span class="context-menu-label">${item.label}</span>
            </div>
        `).join('');
        
        // Add event listeners
        const items = contextMenu.querySelectorAll('.context-menu-item');
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                menuItems[index].action();
                contextMenu.remove();
            });
        });
        
        // Close menu when clicking outside
        const closeMenu = (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.remove();
                document.removeEventListener('click', closeMenu);
                document.removeEventListener('contextmenu', closeMenu);
            }
        };
        
        // Delay adding the close listener to prevent immediate closure
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
            document.addEventListener('contextmenu', closeMenu);
        }, 0);
        
        // Add to document
        document.body.appendChild(contextMenu);
        
        // Show the menu by adding the show class
        contextMenu.classList.add('show');
        
        // Adjust position if menu goes off-screen
        const rect = contextMenu.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            contextMenu.style.left = `${window.innerWidth - rect.width - 5}px`;
        }
        if (rect.bottom > window.innerHeight) {
            contextMenu.style.top = `${window.innerHeight - rect.height - 5}px`;
        }
    }
    
    toggleNoteBookmark(notePath, noteTitle) {
        const existingIndex = this.bookmarks.findIndex(bookmark => bookmark.path === notePath);
        
        if (existingIndex !== -1) {
            // Remove bookmark
            this.bookmarks.splice(existingIndex, 1);
            this.showToast('Bookmark removed', 'info');
        } else {
            // Add bookmark
            const bookmark = {
                path: notePath,
                title: noteTitle || this.getNoteTitleFromPath(notePath),
                timestamp: Date.now()
            };
            this.bookmarks.unshift(bookmark);
            
            // Limit bookmarks to prevent overflow
            if (this.bookmarks.length > 50) {
                this.bookmarks = this.bookmarks.slice(0, 50);
            }
            
            this.showToast('Note bookmarked', 'success');
        }
        
        // Save and update UI
        localStorage.setItem('notesWiki_bookmarks', JSON.stringify(this.bookmarks));
        this.updateBookmarksUI();
    }
    
    shareNote(notePath, noteTitle) {
        const baseUrl = window.location.origin + window.location.pathname;
        const noteUrl = `${baseUrl}#${notePath}`;
        
        // Try to use the modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(noteUrl).then(() => {
                this.showToast('Note URL copied to clipboard', 'success');
            }).catch(() => {
                this.fallbackCopyToClipboard(noteUrl);
            });
        } else {
            this.fallbackCopyToClipboard(noteUrl);
        }
    }
    
    fallbackCopyToClipboard(text) {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showToast('Note URL copied to clipboard', 'success');
        } catch (err) {
            this.showToast('Could not copy URL. Please copy manually: ' + text, 'warning');
        }
        
        document.body.removeChild(textArea);
    }
    
    getNoteTitleFromPath(path) {
        // Extract title from path or use filename
        if (this.notesIndex && this.notesIndex.notes) {
            const note = this.notesIndex.notes.find(n => n.path === path);
            if (note && note.metadata && note.metadata.title) {
                return note.metadata.title;
            }
        }
        
        // Fallback to filename
        const filename = path.split('/').pop();
        return filename.replace('.md', '').replace(/-/g, ' ');
    }
    
    closeTab(tabId) {
        if (this.tabs.size <= 1) {
            // If this is the last tab, act like "Close All Tabs"
            this.closeAllTabs();
            return;
        }
        
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        // Prevent closing pinned tabs
        if (tab.isPinned) {
            this.showToast('Cannot close pinned tab. Unpin it first.', 'warning');
            return;
        }
        
        // Check if confirmation is required
        if (this.settings.confirmOnClose) {
            this.showConfirmationDialog(
                'Close Tab?',
                `Are you sure you want to close "${tab.title || 'this tab'}"?`,
                () => {
                    this.doCloseTab(tabId);
                }
            );
            return;
        }
        
        this.doCloseTab(tabId);
    }
    
    doCloseTab(tabId) {
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        // Double-check: prevent closing pinned tabs
        if (tab.isPinned) {
            this.showToast('Cannot close pinned tab. Unpin it first.', 'warning');
            return;
        }
        
        // If closing split view tab, disable split view without recursion
        if (tab.isSplitView) {
            this.settings.splitViewEnabled = false;
            this.saveSettings();
            
            // Remove from DOM
            document.getElementById(tabId)?.remove();
            
            // Remove from memory
            this.tabs.delete(tabId);
            this.tabContents.delete(tabId);
            
            // Return to previous tab
            if (this.tabBeforeSplitView && this.tabs.has(this.tabBeforeSplitView)) {
                this.switchToTab(this.tabBeforeSplitView);
            } else {
                const remainingTabs = Array.from(this.tabs.keys());
                if (remainingTabs.length > 0) {
                    this.switchToTab(remainingTabs[0]);
                } else {
                    this.createNewTab();
                }
            }
            
            // Don't reset splitViewState - keep it for next time
            // Only reset the active pane
            this.activePaneId = null;
            
            // Restore original loadNote method
            if (this.originalLoadNote) {
                this.loadNote = this.originalLoadNote;
                this.originalLoadNote = null;
            }
            
            // Update file tree and save state
            this.updateFileTreeDragState();
            this.saveTabState();
            this.showToast('Split view disabled');
            return;
        }
        
        // Remove from DOM
        document.getElementById(tabId)?.remove();
        
        // Remove from memory
        this.tabs.delete(tabId);
        this.tabContents.delete(tabId);
        
        // If closing active tab, switch to another
        if (tabId === this.activeTabId) {
            const tabIds = Array.from(this.tabs.keys());
            const currentIndex = tabIds.indexOf(tabId);
            let newActiveTab;
            
            // Try to switch to the next tab, or previous if it's the last tab
            if (currentIndex < tabIds.length - 1) {
                newActiveTab = tabIds[currentIndex + 1];
            } else if (currentIndex > 0) {
                newActiveTab = tabIds[currentIndex - 1];
            } else {
                // This was the last tab, find any remaining
                const remainingTabs = Array.from(this.tabs.keys());
                newActiveTab = remainingTabs[0];
            }
            
            if (newActiveTab) {
                this.switchToTab(newActiveTab);
            }
        }
        
        this.saveTabState();
    }
    
    confirmCloseAllTabs() {
        const pinnedTabs = Array.from(this.tabs.values()).filter(tab => tab.isPinned);
        const totalTabs = this.tabs.size;
        
        let message, confirmText;
        
        if (pinnedTabs.length === 0) {
            // No pinned tabs - close all
            message = `Are you sure you want to close all ${totalTabs} tabs?`;
            confirmText = 'Close All Tabs';
        } else if (pinnedTabs.length === totalTabs) {
            // All tabs are pinned - can't close any
            this.showToast('Cannot close tabs - all tabs are pinned. Unpin them first.', 'warning');
            return;
        } else {
            // Some tabs are pinned - close only unpinned ones
            const unpinnedCount = totalTabs - pinnedTabs.length;
            message = `Close ${unpinnedCount} unpinned tabs? (${pinnedTabs.length} pinned tabs will remain open)`;
            confirmText = `Close ${unpinnedCount} Tabs`;
        }
        
        this.showConfirmationDialog(
            'Close Tabs?',
            message,
            () => {
                this.closeAllTabs();
            },
            null
        );
    }
    
    closeAllTabs() {
        const pinnedTabs = Array.from(this.tabs.entries()).filter(([_, tab]) => tab.isPinned);
        const totalTabsBefore = this.tabs.size;
        
        if (pinnedTabs.length === totalTabsBefore) {
            // All tabs are pinned - shouldn't get here but just in case
            this.showToast('Cannot close tabs - all tabs are pinned', 'warning');
            return;
        }
        
        if (pinnedTabs.length === 0) {
            // No pinned tabs - close everything and create new home tab
            document.getElementById('tabs-container').innerHTML = '';
            this.tabs.clear();
            this.tabContents.clear();
            this.tabIdCounter = 0;
            localStorage.removeItem('tabState');
            this.createNewTab('/notes/index.md', 'Home');
            this.showToast('All tabs closed');
        } else {
            // Some tabs are pinned - only close unpinned ones
            const unpinnedTabs = Array.from(this.tabs.entries()).filter(([_, tab]) => !tab.isPinned);
            
            // Remove unpinned tabs from DOM and memory
            unpinnedTabs.forEach(([tabId, tab]) => {
                document.getElementById(tabId)?.remove();
                this.tabs.delete(tabId);
                this.tabContents.delete(tabId);
            });
            
            // If the active tab was closed, switch to first pinned tab
            if (!this.tabs.has(this.activeTabId)) {
                const firstPinnedTabId = pinnedTabs[0][0];
                this.switchToTab(firstPinnedTabId);
            }
            
            this.saveTabState();
            const closedCount = unpinnedTabs.length;
            this.showToast(`${closedCount} tabs closed (${pinnedTabs.length} pinned tabs remain)`);
        }
    }
    
    closeCurrentTab() {
        if (this.activeTabId) {
            this.closeTab(this.activeTabId);
        }
    }
    
    duplicateTab(tabId) {
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        // Create a new tab with the same path and title
        const newTabId = this.createNewTab(tab.path, tab.title);
        
        // Copy the content if it exists
        const existingContent = this.tabContents.get(tabId);
        if (existingContent) {
            this.tabContents.set(newTabId, existingContent);
        }
        
        this.showToast('Tab duplicated');
    }
    
    closeOtherTabs(tabId) {
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        // Check if there are other tabs that can be closed
        const tabsToClose = Array.from(this.tabs.entries()).filter(([id, t]) => 
            id !== tabId && !t.isPinned && !t.isSplitView
        );
        
        if (tabsToClose.length === 0) {
            this.showToast('No other tabs to close', 'info');
            return;
        }
        
        // Show confirmation if enabled
        if (this.settings.confirmOnClose) {
            this.showConfirmationDialog(
                'Close Other Tabs?',
                `Are you sure you want to close ${tabsToClose.length} other tab${tabsToClose.length > 1 ? 's' : ''}? Pinned tabs will not be closed.`,
                () => {
                    this.doCloseOtherTabs(tabId);
                }
            );
        } else {
            this.doCloseOtherTabs(tabId);
        }
    }
    
    doCloseOtherTabs(tabId) {
        const tabsToClose = Array.from(this.tabs.entries()).filter(([id, tab]) => 
            id !== tabId && !tab.isPinned && !tab.isSplitView
        );
        
        // Close each tab
        tabsToClose.forEach(([id]) => {
            // Remove from DOM
            document.getElementById(id)?.remove();
            
            // Remove from memory
            this.tabs.delete(id);
            this.tabContents.delete(id);
        });
        
        // Switch to the remaining tab if it's not already active
        if (this.activeTabId !== tabId) {
            this.switchToTab(tabId);
        }
        
        this.saveTabState();
        this.showToast(`Closed ${tabsToClose.length} tab${tabsToClose.length > 1 ? 's' : ''}`);
    }
    
    switchToTabByIndex(index) {
        const tabIds = Array.from(this.tabs.keys());
        if (index >= 0 && index < tabIds.length) {
            this.switchToTab(tabIds[index]);
        }
    }
    
    switchToPreviousTab() {
        this.switchToNextTab(true);
    }
    
    switchToNextTab(reverse = false) {
        const tabIds = Array.from(this.tabs.keys());
        const currentIndex = tabIds.indexOf(this.activeTabId);
        
        let newIndex;
        if (reverse) {
            newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = tabIds.length - 1;
        } else {
            newIndex = currentIndex + 1;
            if (newIndex >= tabIds.length) newIndex = 0;
        }
        
        this.switchToTab(tabIds[newIndex]);
    }
    
    saveTabState() {
        // Filter out special tabs like split view
        const tabsToSave = Array.from(this.tabs.values()).filter(tab => !tab.isSpecial && !tab.isSplitView);
        
        const tabState = {
            tabs: tabsToSave,
            activeTabId: this.activeTabId === 'split-view-tab' ? null : this.activeTabId,
            tabIdCounter: this.tabIdCounter,
            splitViewState: this.splitViewState // Save split view state
        };
        localStorage.setItem('tabState', JSON.stringify(tabState));
    }
    
    restoreTabState() {
        const savedState = localStorage.getItem('tabState');
        if (!savedState) return false;
        
        try {
            const tabState = JSON.parse(savedState);
            if (!tabState.tabs || tabState.tabs.length === 0) return false;
            
            console.log('Restoring tab state:', tabState);
            
            // Clear existing tabs
            this.tabs.clear();
            this.tabContents.clear();
            document.getElementById('tabs-container').innerHTML = '';
            
            // Restore tab counter
            this.tabIdCounter = tabState.tabIdCounter || 0;
            
            // Restore split view state if present
            if (tabState.splitViewState) {
                this.splitViewState = tabState.splitViewState;
            }
            
            // Restore tabs
            let activeTabFound = false;
            tabState.tabs.forEach(tabData => {
                console.log('Restoring tab:', tabData);
                
                // Validate tab data
                if (!tabData.path || typeof tabData.path !== 'string') {
                    console.warn('Invalid tab path, skipping:', tabData);
                    return;
                }
                
                this.tabs.set(tabData.id, {
                    id: tabData.id,
                    path: tabData.path,
                    title: tabData.title || 'Untitled',
                    scrollPosition: tabData.scrollPosition || 0,
                    isPinned: tabData.isPinned || false
                });
                this.renderTab(tabData.id);
                
                if (tabData.id === tabState.activeTabId) {
                    activeTabFound = true;
                }
            });
            
            // If no tabs were successfully restored, return false
            if (this.tabs.size === 0) {
                console.log('No valid tabs restored');
                return false;
            }
            
            // Restore active tab
            const tabToActivate = activeTabFound ? tabState.activeTabId : Array.from(this.tabs.keys())[0];
            this.switchToTab(tabToActivate, false);
            
            // Load content for active tab
            const activeTab = this.tabs.get(tabToActivate);
            if (activeTab && activeTab.path) {
                console.log('Loading active tab content:', activeTab.path);
                this.loadNoteInTab(activeTab.path, tabToActivate);
            }
            
            return true;
        } catch (e) {
            console.error('Failed to restore tab state:', e);
            localStorage.removeItem('tabState');
            return false;
        }
    }
    
    enableAutoSaveTabState() {
        // Save tab state whenever tabs change
        if (!this.tabStateSaveTimeout) {
            this.tabStateSaveDebounced = () => {
                clearTimeout(this.tabStateSaveTimeout);
                this.tabStateSaveTimeout = setTimeout(() => {
                    this.saveTabState();
                }, 500);
            };
        }
    }
    
    
    openInNewTab(path) {
        // Prevent duplicate tabs by tracking pending tab creations
        if (!this.pendingTabs) {
            this.pendingTabs = new Set();
        }
        
        // Check if we're already creating a tab for this path
        if (this.pendingTabs.has(path)) {
            return;
        }
        
        // Check if a tab with this path already exists
        const existingTabId = this.findTabByPath(path);
        
        if (existingTabId) {
            // Tab already exists, switch to it
            // When in All context, preserve it
            const preserveContext = this.activeContext === null;
            this.switchToTab(existingTabId, preserveContext);
        } else {
            // Mark this path as pending
            this.pendingTabs.add(path);
            
            // Create new tab
            // Extract title from path or use default
            const parts = path.split('/');
            const filename = parts[parts.length - 1];
            const title = filename.replace('.md', '').replace(/-/g, ' ');
            
            // When in All context, preserve it when creating new tab
            const preserveContext = this.activeContext === null;
            this.createNewTab(path, title, preserveContext);
            
            // Remove from pending after a short delay
            setTimeout(() => {
                this.pendingTabs.delete(path);
            }, 100);
        }
    }
    
    findTabByPath(path) {
        // Search all tabs for one with matching path
        for (const [tabId, tab] of this.tabs) {
            if (tab.path === path) {
                return tabId;
            }
        }
        return null;
    }
    
    loadNoteInTab(path, tabId) {
        // Get the tab
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
        // Check if tab is pinned and trying to load a different note
        if (tab.isPinned && tab.path && tab.path !== path) {
            // Show a toast message that pinned tabs cannot load different notes
            this.showToast('Cannot load a different note into a pinned tab. Unpin the tab first or open in a new tab.');
            return;
        }
        
        // Check if this is the active tab
        const isActiveTab = tabId === this.activeTabId;
        
        if (isActiveTab) {
            // For active tab, just load normally
            this.loadNote(path).then(() => {
                // Update tab title after successful load
                if (this.currentNote && this.currentNote.metadata.title) {
                    const tab = this.tabs.get(tabId);
                    if (tab) {
                        tab.title = this.currentNote.metadata.title;
                        const tabElement = document.getElementById(tabId);
                        if (tabElement) {
                            tabElement.querySelector('.tab-title').textContent = tab.title;
                        }
                        this.saveTabState();
                    }
                }
            });
        } else {
            // For background tabs, we need to load without affecting current view
            // Store the request and load when tab becomes active
            const tab = this.tabs.get(tabId);
            if (tab) {
                tab.pendingLoad = path;
                // Set a placeholder title
                const parts = path.split('/');
                const filename = parts[parts.length - 1];
                tab.title = filename.replace('.md', '').replace(/-/g, ' ');
                
                const tabElement = document.getElementById(tabId);
                if (tabElement) {
                    tabElement.querySelector('.tab-title').textContent = tab.title;
                }
            }
        }
    }
    
    setupContentEventListeners() {
        const mainContent = document.getElementById('main-content');
        
        // Re-setup floating share button
        this.setupFloatingShareButton();
        
        // Regenerate Table of Contents when restoring cached content
        requestAnimationFrame(() => {
            this.generateTableOfContents();
        });
        
        // Re-setup reading progress
        this.setupReadingProgress();
        
        // Re-setup internal links and tag links
        mainContent.querySelectorAll('a[href^="#"]').forEach(link => {
            // Skip if already has listener (check with data attribute)
            if (link.dataset.listenerAttached) return;
            link.dataset.listenerAttached = 'true';
            
            link.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    if (href.startsWith('#/') && !href.startsWith('#/tags/')) {
                        const path = href.slice(1);
                        this.openInNewTab(path);
                    }
                    return;
                }
                
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.startsWith('#/')) {
                    // Internal note link or tag link
                    const path = href.slice(1);
                    
                    // Check if it's a tag link
                    if (path.startsWith('/tags/')) {
                        // Apply tag filter
                        const tagName = decodeURIComponent(path.substring(6));
                        this.selectedTags.clear();
                        this.selectedTags.add(tagName);
                        this.filterNotesByTags();
                        this.updateTagCountBadge();
                        
                        // Update URL
                        window.history.replaceState(null, '', href);
                    } else {
                        // Check if note is already open in another tab
                        const existingTabId = this.findTabByPath(path);
                        if (existingTabId && existingTabId !== this.activeTabId) {
                            // Switch to existing tab
                            this.switchToTab(existingTabId);
                        } else {
                            // Check if current tab is pinned
                            const tab = this.tabs.get(this.activeTabId);
                            if (tab && tab.isPinned) {
                                // Open in new tab if current tab is pinned
                                this.openInNewTab(path);
                            } else if (tab) {
                                // Update current tab's path
                                tab.path = path;
                                this.loadNote(tab.path);
                            }
                        }
                    }
                } else {
                    // Heading anchor
                    const target = mainContent.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
            
            // Handle middle-click
            link.addEventListener('mousedown', (e) => {
                if (e.button === 1) {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    if (href.startsWith('#/') && !href.startsWith('#/tags/')) {
                        const path = href.slice(1);
                        this.openInNewTab(path);
                    }
                }
            });
        });
    }
    
    saveTabState() {
        const tabState = {
            tabs: Array.from(this.tabs.values()),
            activeTabId: this.activeTabId
        };
        localStorage.setItem('tabState', JSON.stringify(tabState));
    }
    
    restoreTabState() {
        const savedState = localStorage.getItem('tabState');
        if (savedState) {
            try {
                const { tabs, activeTabId } = JSON.parse(savedState);
                
                // Restore tabs
                tabs.forEach(tabData => {
                    // Validate tab data
                    if (!tabData.path || typeof tabData.path !== 'string' || tabData.path.trim() === '') {
                        console.warn('Skipping tab with invalid path:', tabData);
                        return;
                    }
                    
                    const tabId = tabData.id;
                    this.tabs.set(tabId, tabData);
                    this.renderTab(tabId);
                });
                
                // Restore active tab
                if (activeTabId && this.tabs.has(activeTabId)) {
                    this.switchToTab(activeTabId);
                }
                
                return true;
            } catch (e) {
                console.error('Failed to restore tab state:', e);
            }
        }
        return false;
    }
    
    // Timer methods
    toggleTimer() {
        if (this.timerRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }
    
    startTimer() {
        this.timerRunning = true;
        this.timerStartTime = Date.now() - this.timerElapsed;
        
        this.timerInterval = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);
        
        this.updateTimerUI();
        this.updateTimerDisplay();
    }
    
    pauseTimer() {
        this.timerRunning = false;
        this.timerElapsed = Date.now() - this.timerStartTime;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.updateTimerUI();
    }
    
    resetTimer() {
        this.timerRunning = false;
        this.timerElapsed = 0;
        this.timerStartTime = null;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.updateTimerDisplay();
        this.updateTimerUI();
    }
    
    updateTimerDisplay() {
        const currentElapsed = this.timerRunning 
            ? Date.now() - this.timerStartTime 
            : this.timerElapsed;
        
        // Check if Pomodoro mode and if time has reached target
        if (this.settings.pomodoroEnabled && this.pomodoroTargetTime > 0) {
            if (currentElapsed >= this.pomodoroTargetTime && this.timerRunning) {
                this.handlePomodoroComplete();
                return;
            }
            
            // Show countdown in Pomodoro mode
            const remaining = Math.max(0, this.pomodoroTargetTime - currentElapsed);
            const totalSeconds = Math.floor(remaining / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Update progress bar
            const progress = (currentElapsed / this.pomodoroTargetTime) * 100;
            document.getElementById('progress-bar').style.width = `${Math.min(100, progress)}%`;
            
            document.getElementById('timer-display').textContent = timeString;
        } else {
            // Regular timer mode (count up)
            const totalSeconds = Math.floor(currentElapsed / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            document.getElementById('timer-display').textContent = timeString;
        }
    }
    
    updateTimerUI() {
        const playPauseButton = document.getElementById('timer-play-pause');
        const timerWidget = document.querySelector('.timer-widget');
        const modeIndicator = document.getElementById('timer-mode-indicator');
        const progressBar = document.getElementById('timer-progress');
        
        if (this.timerRunning) {
            playPauseButton.classList.add('playing', 'active');
            timerWidget.classList.add('running');
        } else {
            playPauseButton.classList.remove('playing', 'active');
            timerWidget.classList.remove('running');
        }
        
        // Update Pomodoro UI
        if (this.settings.pomodoroEnabled) {
            modeIndicator.style.display = 'flex';
            progressBar.style.display = 'block';
            
            // Update mode indicator
            this.updatePomodoroModeDisplay();
            
            // Add Pomodoro mode class
            timerWidget.classList.remove('pomodoro-work', 'pomodoro-short-break', 'pomodoro-long-break');
            timerWidget.classList.add(`pomodoro-${this.pomodoroMode}`);
        } else {
            modeIndicator.style.display = 'none';
            progressBar.style.display = 'none';
            
            // Remove Pomodoro mode classes
            timerWidget.classList.remove('pomodoro-work', 'pomodoro-short-break', 'pomodoro-long-break');
        }
    }
    
    startResetPress() {
        this.resetPressed = true;
        const resetButton = document.getElementById('timer-reset');
        resetButton.classList.add('pressing');
        
        // Start 3-second countdown
        this.resetPressTimer = setTimeout(() => {
            // Only reset if still pressed after 3 seconds
            if (this.resetPressed) {
                this.resetTimer();
                this.endResetPress();
            }
        }, 3000);
    }
    
    endResetPress() {
        this.resetPressed = false;
        const resetButton = document.getElementById('timer-reset');
        resetButton.classList.remove('pressing');
        
        // Clear the countdown timer
        if (this.resetPressTimer) {
            clearTimeout(this.resetPressTimer);
            this.resetPressTimer = null;
        }
    }
    
    // Pomodoro Timer Functions
    validateTimerDuration(value, min, max, defaultValue) {
        // Parse and validate timer duration input
        try {
            const parsed = parseInt(value, 10);
            
            // Check if parsing was successful and value is a valid number
            if (isNaN(parsed) || !isFinite(parsed)) {
                console.warn('Invalid timer duration - not a number:', value);
                return null;
            }
            
            // Check bounds
            if (parsed < min || parsed > max) {
                console.warn(`Timer duration out of bounds: ${parsed}, valid range: ${min}-${max}`);
                return null;
            }
            
            return parsed;
        } catch (error) {
            console.warn('Error validating timer duration:', error);
            return null;
        }
    }
    
    initializePomodoroMode() {
        if (this.settings.pomodoroEnabled) {
            this.setPomodoroTarget();
        }
        this.updateTimerUI();
    }
    
    setPomodoroTarget() {
        let minutes;
        switch (this.pomodoroMode) {
            case 'work':
                minutes = this.settings.pomodoroWorkMinutes;
                break;
            case 'short-break':
                minutes = this.settings.pomodoroShortBreakMinutes;
                break;
            case 'long-break':
                minutes = this.settings.pomodoroLongBreakMinutes;
                break;
            default:
                minutes = this.settings.pomodoroWorkMinutes;
        }
        this.pomodoroTargetTime = minutes * 60 * 1000; // Convert to milliseconds
    }
    
    updatePomodoroModeDisplay() {
        const modeIcon = document.getElementById('mode-icon');
        const modeText = document.getElementById('mode-text');
        
        // Hide the icon element since we're not using emojis
        modeIcon.style.display = 'none';
        
        switch (this.pomodoroMode) {
            case 'work':
                modeText.textContent = 'WORK';
                break;
            case 'short-break':
                modeText.textContent = 'BREAK';
                break;
            case 'long-break':
                modeText.textContent = 'LONG BREAK';
                break;
        }
    }
    
    handlePomodoroComplete() {
        // Stop the timer
        this.pauseTimer();
        
        // Play notification sound if enabled
        if (this.settings.pomodoroPlaySounds) {
            this.playNotificationSound();
        }
        
        // Determine next mode
        if (this.pomodoroMode === 'work') {
            this.pomodoroSessionCount++;
            
            // Check if it's time for a long break
            if (this.pomodoroSessionCount % this.settings.pomodoroSessionsBeforeLongBreak === 0) {
                this.pomodoroMode = 'long-break';
            } else {
                this.pomodoroMode = 'short-break';
            }
        } else {
            // After any break, go back to work
            this.pomodoroMode = 'work';
        }
        
        // Reset timer for next session
        this.resetTimer();
        this.setPomodoroTarget();
        
        // Show completion notification
        this.showPomodoroNotification();
        
        // Auto-start next session if enabled
        if (this.settings.pomodoroAutoStartNext) {
            setTimeout(() => {
                this.startTimer();
            }, 3000); // 3 second delay
        }
    }
    
    getAudioContext() {
        // Create shared AudioContext to prevent memory leaks
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (error) {
                console.warn('AudioContext not available:', error);
                return null;
            }
        }
        return this.audioContext;
    }
    
    playNotificationSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = this.getAudioContext();
            if (!audioContext) return;
            
            // Resume context if it's suspended (browser autoplay policy)
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
            
            // Clean up oscillator references
            oscillator.onended = () => {
                oscillator.disconnect();
                gainNode.disconnect();
            };
        } catch (error) {
            console.log('Audio notification not available:', error);
        }
    }
    
    showPomodoroNotification() {
        const modeNames = {
            'work': 'Work Session',
            'short-break': 'Short Break',
            'long-break': 'Long Break'
        };
        
        const currentSession = this.pomodoroMode === 'work' ? 
            modeNames[Object.keys(modeNames).find(key => key !== 'work' && this.pomodoroSessionCount % this.settings.pomodoroSessionsBeforeLongBreak === 0 ? key === 'long-break' : key === 'short-break')] :
            modeNames['work'];
            
        const nextSession = modeNames[this.pomodoroMode];
        
        this.showToast(`${currentSession} complete! Next: ${nextSession}`, 5000);
        
        // Browser notification if permitted
        if (Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: `${currentSession} complete! Time for ${nextSession}.`,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍅</text></svg>'
            });
        }
    }
    
    // Override start/reset to handle Pomodoro mode
    startTimer() {
        if (this.settings.pomodoroEnabled && this.pomodoroTargetTime === 0) {
            this.setPomodoroTarget();
        }
        
        this.timerRunning = true;
        this.timerStartTime = Date.now() - this.timerElapsed;
        
        this.timerInterval = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);
        
        this.updateTimerUI();
        this.updateTimerDisplay();
    }
    
    resetTimer() {
        this.timerRunning = false;
        this.timerElapsed = 0;
        this.timerStartTime = null;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Reset progress bar
        document.getElementById('progress-bar').style.width = '0%';
        
        this.updateTimerDisplay();
        this.updateTimerUI();
    }
    
    // Keyboard Shortcuts Cheatsheet Modal
    showShortcutsCheatsheet() {
        const modal = document.getElementById('shortcuts-modal');
        
        // Update shortcuts display with current settings
        this.updateShortcutsDisplay();
        
        modal.style.display = 'flex';
        
        // Add event listeners for this modal session
        const closeButton = document.getElementById('shortcuts-modal-close');
        const handleClose = () => this.hideShortcutsCheatsheet();
        
        closeButton.addEventListener('click', handleClose);
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                handleClose();
            }
        });
    }
    
    hideShortcutsCheatsheet() {
        const modal = document.getElementById('shortcuts-modal');
        modal.style.display = 'none';
        
        // Remove event listeners to prevent memory leaks
        const closeButton = document.getElementById('shortcuts-modal-close');
        closeButton.replaceWith(closeButton.cloneNode(true));
        modal.replaceWith(modal.cloneNode(true));
    }
    
    updateShortcutsDisplay() {
        // Update the shortcut keys to show current custom shortcuts
        const shortcuts = this.settings.keyboardShortcuts;
        
        // Update navigation shortcuts
        document.getElementById('shortcut-new-tab').textContent = shortcuts['new-tab'] || 'Ctrl+T';
        document.getElementById('shortcut-search').textContent = shortcuts['search'] || 'Ctrl+K';
        document.getElementById('shortcut-filter').textContent = shortcuts['filter'] || 'Ctrl+F';
        document.getElementById('shortcut-settings').textContent = shortcuts['settings'] || 'Ctrl+,';
        document.getElementById('shortcut-bookmark').textContent = shortcuts['bookmark'] || 'Ctrl+D';
    }
    
    showConfirmation(title, message, onConfirm) {
        const modal = document.getElementById('confirmation-modal');
        const titleEl = document.getElementById('confirmation-title');
        const messageEl = document.getElementById('confirmation-message');
        const confirmBtn = document.getElementById('confirmation-confirm');
        const cancelBtn = document.getElementById('confirmation-cancel');
        
        titleEl.textContent = title;
        messageEl.textContent = message;
        
        modal.style.display = 'flex';
        
        // Handle confirm
        const handleConfirm = () => {
            modal.style.display = 'none';
            cleanup();
            if (onConfirm) onConfirm();
        };
        
        // Handle cancel
        const handleCancel = () => {
            modal.style.display = 'none';
            cleanup();
        };
        
        // Handle click outside
        const handleClickOutside = (e) => {
            if (e.target === modal) {
                handleCancel();
            }
        };
        
        // Handle escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
            }
        };
        
        // Cleanup function
        const cleanup = () => {
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
            modal.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
        
        // Add event listeners
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        modal.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        
        // Focus the cancel button for safety
        cancelBtn.focus();
    }
    
    // ============================================
    // SPLIT VIEW IMPLEMENTATION
    // ============================================
    
    toggleSplitView() {
        this.settings.splitViewEnabled = !this.settings.splitViewEnabled;
        
        if (this.settings.splitViewEnabled) {
            // Store the current tab ID before switching to split view
            this.tabBeforeSplitView = this.activeTabId;
            this.enableSplitView();
        } else {
            this.disableSplitView();
        }
        
        this.saveSettings();
        this.showToast(this.settings.splitViewEnabled ? 'Split view enabled' : 'Split view disabled');
    }
    
    enableSplitView() {
        // Create a special split view tab
        const splitViewTabId = 'split-view-tab';
        
        // Check if split view tab already exists
        if (this.tabs.has(splitViewTabId)) {
            this.switchToTab(splitViewTabId);
            return;
        }
        
        // Initialize split view state if not exists
        if (!this.splitViewState) {
            this.splitViewState = {
                leftPath: null,
                rightPath: null,
                leftScrollPosition: 0,
                rightScrollPosition: 0
            };
        }
        
        // Create the split view tab
        const splitViewTab = {
            id: splitViewTabId,
            title: '⊞ Split View',
            path: null, // No associated file path
            isSpecial: true, // Mark as special tab
            isSplitView: true
        };
        
        this.tabs.set(splitViewTabId, splitViewTab);
        this.renderTab(splitViewTabId);
        this.switchToTab(splitViewTabId);
        
        // Don't reset split view state here - keep any existing paths
        
        // Create split view content
        this.renderSplitViewContent();
        
        // Update file tree to enable drag and drop
        this.updateFileTreeDragState();
    }
    
    disableSplitView() {
        const splitViewTabId = 'split-view-tab';
        
        // Remove the split view tab without triggering recursion
        if (this.tabs.has(splitViewTabId)) {
            // Remove from DOM
            document.getElementById(splitViewTabId)?.remove();
            
            // Remove from memory
            this.tabs.delete(splitViewTabId);
            this.tabContents.delete(splitViewTabId);
            
            // Return to previous tab if available
            if (this.tabBeforeSplitView && this.tabs.has(this.tabBeforeSplitView)) {
                this.switchToTab(this.tabBeforeSplitView);
            } else {
                // If no previous tab, ensure we have at least one tab open
                const remainingTabs = Array.from(this.tabs.keys());
                if (remainingTabs.length > 0) {
                    this.switchToTab(remainingTabs[0]);
                } else {
                    this.createNewTab();
                }
            }
        }
        
        // Don't reset splitViewState - keep it for next time
        // Only reset the active pane
        this.activePaneId = null;
        
        // Restore original loadNote method
        if (this.originalLoadNote) {
            this.loadNote = this.originalLoadNote;
            this.originalLoadNote = null;
        }
        
        // Update file tree to disable drag and drop
        this.updateFileTreeDragState();
        
        // Save tab state
        this.saveTabState();
    }
    
    renderSplitViewContent() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;
        
        // Clear any existing content
        mainContent.innerHTML = '';
        
        // Create split container
        const splitContainer = document.createElement('div');
        splitContainer.className = 'split-container';
        splitContainer.innerHTML = `
            <div class="split-pane active" id="pane-left">
                <div class="pane-header">
                    <span class="pane-title">Left Pane</span>
                </div>
                <div class="pane-content" id="pane-content-left">
                    <div class="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                        </svg>
                        <p>Drag a note here or click one in the sidebar</p>
                    </div>
                </div>
            </div>
            <div class="pane-divider"></div>
            <div class="split-pane" id="pane-right">
                <div class="pane-header">
                    <span class="pane-title">Right Pane</span>
                </div>
                <div class="pane-content" id="pane-content-right">
                    <div class="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                        </svg>
                        <p>Drag a note here or click one in the sidebar</p>
                    </div>
                </div>
            </div>
        `;
        
        mainContent.appendChild(splitContainer);
        
        // Setup pane functionality
        const divider = splitContainer.querySelector('.pane-divider');
        this.setupPaneResizing(divider);
        this.setupPaneNavigation();
        this.setupPaneDragDrop();
        
        // Setup scroll event listeners to save positions
        const leftPane = document.getElementById('pane-content-left');
        const rightPane = document.getElementById('pane-content-right');
        
        if (leftPane) {
            leftPane.addEventListener('scroll', () => {
                if (this.splitViewState) {
                    this.splitViewState.leftScrollPosition = leftPane.scrollTop;
                }
            });
        }
        
        if (rightPane) {
            rightPane.addEventListener('scroll', () => {
                if (this.splitViewState) {
                    this.splitViewState.rightScrollPosition = rightPane.scrollTop;
                }
            });
        }
        
        // Set initial active pane
        this.activePaneId = 'pane-left';
    }
    
    setupPaneResizing(divider) {
        let isResizing = false;
        let startX = 0;
        let startWidths = [];
        
        divider.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            const panes = document.querySelectorAll('.split-pane');
            startWidths = Array.from(panes).map(p => p.offsetWidth);
            document.body.style.cursor = 'col-resize';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const splitContainer = document.querySelector('.split-container');
            const containerWidth = splitContainer ? splitContainer.offsetWidth : 800;
            const pane1 = document.getElementById('pane-1');
            const pane2 = document.getElementById('pane-2');
            
            if (!pane1 || !pane2) return;
            
            const newWidth1 = startWidths[0] + deltaX;
            const newWidth2 = startWidths[1] - deltaX;
            
            const minWidth = 300;
            if (newWidth1 >= minWidth && newWidth2 >= minWidth) {
                pane1.style.width = `${newWidth1}px`;
                pane2.style.width = `${newWidth2}px`;
                pane1.style.flex = 'none';
                pane2.style.flex = 'none';
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
            }
        });
    }
    
    setupPaneNavigation() {
        // Handle clicks on split panes to set active pane
        document.querySelectorAll('.split-pane').forEach(pane => {
            pane.addEventListener('click', () => {
                this.setActivePane(pane.id);
            });
        });
        
        // Store the original loadNote if not already done
        if (!this.originalLoadNote) {
            this.originalLoadNote = this.loadNote.bind(this);
        }
        
        // Override loadNote to handle split view
        this.loadNote = async (path) => {
            // Check if we're in the split view tab
            const activeTab = this.tabs.get(this.activeTabId);
            if (activeTab && activeTab.isSplitView && this.activePaneId) {
                // Load into the active pane
                return this.loadNoteInSplitPane(path, this.activePaneId);
            }
            // Otherwise use the original loadNote
            return this.originalLoadNote(path);
        };
    }
    
    setupPaneDragDrop() {
        // Make file tree links draggable
        this.updateFileTreeDragState();
        
        // Set up drop zones on panes
        document.querySelectorAll('.split-pane').forEach(pane => {
            pane.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                pane.classList.add('drag-over');
            });
            
            pane.addEventListener('dragleave', (e) => {
                // Only remove highlight if we're leaving the pane entirely
                if (!pane.contains(e.relatedTarget)) {
                    pane.classList.remove('drag-over');
                }
            });
            
            pane.addEventListener('drop', (e) => {
                e.preventDefault();
                pane.classList.remove('drag-over');
                
                const notePath = e.dataTransfer.getData('text/plain');
                if (notePath) {
                    this.setActivePane(pane.id);
                    this.loadNoteInSplitPane(notePath, pane.id);
                }
            });
        });
    }
    
    updateFileTreeDragState() {
        document.querySelectorAll('.file-tree-link').forEach(link => {
            if (this.settings.splitViewEnabled) {
                link.draggable = true;
                link.addEventListener('dragstart', this.handleFileDragStart.bind(this));
            } else {
                link.draggable = false;
                link.removeEventListener('dragstart', this.handleFileDragStart.bind(this));
            }
        });
    }
    
    handleFileDragStart(e) {
        const notePath = e.target.dataset.path;
        e.dataTransfer.setData('text/plain', notePath);
        e.dataTransfer.effectAllowed = 'copy';
        
        // Visual feedback
        e.target.classList.add('dragging');
        setTimeout(() => {
            e.target.classList.remove('dragging');
        }, 0);
    }
    
    setActivePane(paneId) {
        document.querySelectorAll('.split-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(paneId).classList.add('active');
        this.activePaneId = paneId;
    }
    
    async loadNoteInSplitPane(path, paneId) {
        const paneContent = document.getElementById(`pane-content-${paneId.split('-')[1]}`);
        if (!paneContent) {
            console.error('Pane content not found:', paneId);
            return;
        }
        
        // Check if split view tab is pinned
        const splitViewTab = this.tabs.get('split-view-tab');
        if (splitViewTab && splitViewTab.isPinned) {
            // Get current path for this pane
            const paneType = paneId.split('-')[1]; // 'left' or 'right'
            const currentPath = this.splitViewState ? this.splitViewState[`${paneType}Path`] : null;
            
            // If trying to load a different note into a pinned split view pane, prevent it
            if (currentPath && currentPath !== path) {
                this.showToast('Cannot load a different note into a pinned split view. Unpin the tab first.', 'warning');
                return;
            }
        }
        
        // Validate path
        if (!path || typeof path !== 'string' || path.trim() === '') {
            console.error('Invalid path provided to loadNoteInSplitPane:', path);
            paneContent.innerHTML = `
                <div class="content-wrapper content-view">
                    <h1>Invalid Path</h1>
                    <p>The requested path is invalid.</p>
                    <p><a href="#/notes/index.md">Return to home</a></p>
                </div>
            `;
            return;
        }
        
        // Show loading state
        paneContent.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        
        try {
            // Normalize path
            if (!path.startsWith('/')) {
                path = '/' + path;
            }
            
            // Load note data (reusing the existing logic)
            const note = this.notesIndex.notes.find(n => n.path === path);
            if (!note) {
                throw new Error(`Note not found: ${path}`);
            }
            
            // Fetch note content  
            const fetchPath = path.slice(1);
            console.log('Loading note - Original path:', path, 'Fetch path:', fetchPath);
            
            const fullPath = this.basePath ? `${this.basePath}${fetchPath}` : fetchPath;
            const response = await fetch(fullPath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            const { metadata, content: body } = this.parseFrontmatter(content);
            
            // Render the note in this specific pane
            this.renderNoteInSplitPane(paneContent, { metadata, content: body }, paneId);
            
            // Update split view state and pane title
            if (this.splitViewState) {
                if (paneId === 'pane-left') {
                    this.splitViewState.leftPath = path;
                    const paneTitle = document.querySelector('#pane-left .pane-title');
                    if (paneTitle) {
                        paneTitle.textContent = metadata.title || 'Left Pane';
                    }
                    // Update active pane indicator if needed
                    if (!this.activePaneId) {
                        this.setActivePane('pane-left');
                    }
                } else if (paneId === 'pane-right') {
                    this.splitViewState.rightPath = path;
                    const paneTitle = document.querySelector('#pane-right .pane-title');
                    if (paneTitle) {
                        paneTitle.textContent = metadata.title || 'Right Pane';
                    }
                }
                
                // Restore scroll position after content is rendered
                setTimeout(() => {
                    if (paneId === 'pane-left' && this.splitViewState.leftScrollPosition) {
                        paneContent.scrollTop = this.splitViewState.leftScrollPosition;
                    } else if (paneId === 'pane-right' && this.splitViewState.rightScrollPosition) {
                        paneContent.scrollTop = this.splitViewState.rightScrollPosition;
                    }
                }, 0);
            }
            
        } catch (error) {
            console.error('Error loading note in pane:', error);
            paneContent.innerHTML = `
                <div class="content-wrapper content-view">
                    <h1>Error Loading Note</h1>
                    <p>Failed to load: ${path}</p>
                    <p>Error: ${error.message}</p>
                    <p><a href="#/notes/index.md">Return to home</a></p>
                </div>
            `;
        }
    }
    
    renderNoteInSplitPane(container, noteData, paneId) {
        const { metadata, content } = noteData;
        const paneNumber = paneId.split('-')[1];
        
        // Create custom renderer for code blocks  
        const renderer = new marked.Renderer();
        let codeBlockId = 0;
        const self = this;
        
        renderer.code = function(token) {
            let codeContent = '';
            let info = '';
            
            if (typeof token === 'object' && token !== null) {
                codeContent = token.text || '';
                info = token.lang || '';
            } else {
                codeContent = String(token);
            }
            
            codeContent = codeContent.replace(/\n$/, '');
            
            let language = '';
            let title = '';
            let collapse = false;
            
            if (info) {
                const parts = info.split(' ');
                language = parts[0];
                const attrString = parts.slice(1).join(' ');
                
                const titleMatch = attrString.match(/title:["']([^"']+)["']/i);
                if (titleMatch) {
                    title = titleMatch[1];
                }
                
                const collapseMatch = attrString.match(/collapse[:=]["']?(true|yes|1)["']?/i);
                if (collapseMatch) {
                    collapse = true;
                }
            }
            
            if (!language && self.settings.defaultCodeLanguage !== 'plaintext') {
                language = self.settings.defaultCodeLanguage;
            }
            
            // Generate unique ID for this code block with pane suffix
            const blockId = `code-block-${codeBlockId++}-p${paneNumber}`;
            
            // Store code content for later processing
            if (!self.pendingCodeBlocks) {
                self.pendingCodeBlocks = new Map();
            }
            self.pendingCodeBlocks.set(blockId, codeContent);
            
            // Escape code content for data attribute
            const escapedCodeContent = codeContent
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            
            // Build code block HTML
            let html = '<div class="code-block' + (collapse ? ' collapsed' : '') + '" id="' + blockId + '" data-code-content="' + escapedCodeContent + '">';
            html += '<div class="code-block-header">';
            html += '<div class="code-block-info">';
            
            html += '<div class="code-block-language-section">';
            if (language) {
                html += '<span class="code-block-language" data-lang="' + language.toLowerCase() + '">' + language + '</span>';
            }
            html += '</div>';
            
            html += '<div class="code-block-separator"></div>';
            
            html += '<div class="code-block-title-section">';
            if (title) {
                html += '<span class="code-block-title">' + self.escapeHtml(title) + '</span>';
            }
            html += '</div>';
            
            html += '</div>'; // close .code-block-info
            html += '<div class="code-block-actions">';
            
            // Toggle button
            html += '<button class="code-block-button toggle-button" onclick="notesWiki.toggleCodeBlock(\'' + blockId + '\')" aria-label="Toggle code">';
            html += '<svg class="toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">';
            if (collapse) {
                html += '<path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/>';
            } else {
                html += '<path d="M3.75 7.25a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"/>';
            }
            html += '</svg>';
            html += '</button>';
            
            // Copy button
            html += '<button class="code-block-button copy-button" onclick="notesWiki.copyCode(\'' + blockId + '\')" aria-label="Copy code">';
            html += '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">';
            html += '<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>';
            html += '<path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>';
            html += '</svg>';
            html += '</button>';
            
            html += '</div>'; // close .code-block-actions
            html += '</div>'; // close .code-block-header
            
            html += '<div class="code-block-content">';
            html += '<pre class="' + (self.settings.showLineNumbers ? 'with-line-numbers' : '') + '"><code id="' + blockId + '-code" class="language-' + (language || 'text') + '"></code></pre>';
            html += '</div>';
            html += '</div>';
            
            return html;
        };
        
        // Check if marked is available
        if (typeof marked === 'undefined') {
            throw new Error('marked library is not loaded');
        }
        
        // Create a temporary marked instance to avoid global config conflicts
        const tempMarked = new marked.Marked();
        tempMarked.use({
            renderer: renderer,
            breaks: true,
            gfm: true,
            extensions: [this.createCalloutExtension(), this.createWikiLinkExtension()]
        });
        
        // Parse markdown with isolated instance
        const markedHtml = tempMarked.parse(content);
        
        // Get note path from the split view state
        const noteInfo = this.notesIndex.notes.find(n => 
            n.metadata && n.metadata.title === metadata.title
        );
        const notePath = noteInfo ? noteInfo.path : '';
        
        // Calculate word count and reading time
        const text = content || '';
        const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const wordsPerMinute = 250;
        const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
        
        // Build note HTML structure matching normal view
        const noteHtml = `
            <div class="content-wrapper content-view" data-metadata='${JSON.stringify(metadata)}'>
                <header class="note-header">
                    <div class="note-header-top">
                        <h1 class="note-title">${this.escapeHtml(metadata.title || 'Untitled')}</h1>
                    </div>
                    
                    <div class="breadcrumbs">
                        ${notePath ? this.generateBreadcrumbs(notePath) : ''}
                    </div>
                    
                    <div class="note-metadata">
                        <div class="note-metadata-item">
                            <div class="reading-time">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z"/>
                                    <path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm7-8A7 7 0 111 8a7 7 0 0114 0z"/>
                                </svg>
                                <span>${readingTimeMinutes} min read</span>
                                <span class="word-count">(${wordCount.toLocaleString()} words)</span>
                            </div>
                        </div>
                        
                        ${metadata.author ? `
                            <div class="note-metadata-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 00-11.215 0c-.22.578.254 1.139.872 1.139h9.47z"/>
                                </svg>
                                <span>${this.escapeHtml(metadata.author)}</span>
                            </div>
                        ` : ''}
                        
                        ${metadata.created ? `
                            <div class="note-metadata-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h4a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                </svg>
                                <span>${this.formatDate(metadata.created)}</span>
                            </div>
                        ` : ''}
                        
                        ${metadata.updated ? `
                            <div class="note-metadata-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                </svg>
                                <span>Updated ${this.formatDate(metadata.updated)}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${metadata.description ? `
                        <p class="note-description">${this.escapeHtml(metadata.description)}</p>
                    ` : ''}
                    
                    ${metadata.tags && metadata.tags.length > 0 ? `
                        <div class="note-tags">
                            ${metadata.tags.map(tag => `
                                <a href="#/tags/${encodeURIComponent(tag)}" class="note-tag">
                                    ${this.escapeHtml(tag)}
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                </header>
                
                <article class="note-content">
                    ${markedHtml}
                </article>
            </div>
        `;
        
        // Insert the HTML
        container.innerHTML = noteHtml;
        
        // Process pending code blocks
        if (this.pendingCodeBlocks && this.pendingCodeBlocks.size > 0) {
            this.pendingCodeBlocks.forEach((codeContent, blockId) => {
                const codeElement = container.querySelector(`#${blockId}-code`);
                if (codeElement) {
                    codeElement.textContent = codeContent;
                }
            });
            this.pendingCodeBlocks.clear();
        }
        
        // Apply syntax highlighting
        const codeBlocks = container.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            Prism.highlightElement(block);
        });
        
        // Apply line numbers if enabled (matching main view implementation)
        if (this.settings.showLineNumbers) {
            container.querySelectorAll('pre.with-line-numbers code').forEach(codeElement => {
                // Get the highlighted HTML from Prism
                const highlightedHtml = codeElement.innerHTML;
                
                // Split by line breaks, preserving empty lines
                const lines = highlightedHtml.split('\n');
                
                // Wrap each line in a div for CSS counter
                const wrappedLines = lines.map(line => {
                    // Handle empty lines
                    if (line.trim() === '') {
                        line = '&nbsp;';
                    }
                    return `<div class="code-line">${line}</div>`;
                }).join('');
                
                // Add the code-with-counters class to the code element
                codeElement.classList.add('code-with-counters');
                // Replace the code element content with the wrapped lines
                codeElement.innerHTML = wrappedLines;
            });
        }
        
        // Generate combined code block if enabled
        if (metadata.combineCodeBlocks) {
            this.generateCombinedCodeBlock(metadata, container);
            
            // Process new pending code blocks
            if (this.pendingCodeBlocks && this.pendingCodeBlocks.size > 0) {
                this.pendingCodeBlocks.forEach((codeContent, blockId) => {
                    const codeElement = container.querySelector(`#${blockId}-code`);
                    if (codeElement) {
                        codeElement.textContent = codeContent;
                        Prism.highlightElement(codeElement);
                        
                        // Apply line numbers if enabled (for combined code blocks)
                        if (this.settings.showLineNumbers && codeElement.closest('pre.with-line-numbers')) {
                            const highlightedHtml = codeElement.innerHTML;
                            const lines = highlightedHtml.split('\n');
                            const wrappedLines = lines.map(line => {
                                if (line.trim() === '') {
                                    line = '&nbsp;';
                                }
                                return `<div class="code-line">${line}</div>`;
                            }).join('');
                            
                            codeElement.classList.add('code-with-counters');
                            codeElement.innerHTML = wrappedLines;
                        }
                    }
                });
                this.pendingCodeBlocks.clear();
            }
        }
    }
    
    // ============================================
    // QUICK NOTES PANEL IMPLEMENTATION
    // ============================================
    
    initializeQuickNotes() {
        this.quickNotes = [];
        this.isNotesPanelOpen = false;
        this.currentNoteIndex = 0;
        this.loadQuickNotes();
        this.setupNotesPanel();
    }
    
    setupNotesPanel() {
        // Create the slide-out panel structure
        const panelHTML = `
            <div id="quick-notes-panel" class="quick-notes-panel">
                <div class="quick-notes-header">
                    <h3>Quick Notes</h3>
                    <div class="quick-notes-controls">
                        <button class="icon-button" id="add-quick-note" title="Add new note">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button class="icon-button" id="close-notes-panel" title="Close panel">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="quick-notes-tabs" id="quick-notes-tabs"></div>
                <div class="quick-notes-content" id="quick-notes-content">
                    <div class="quick-note-editor" id="quick-note-editor">
                        <textarea class="quick-note-textarea" id="quick-note-textarea" placeholder="Start typing your thoughts..."></textarea>
                    </div>
                </div>
            </div>
        `;
        
        // Add panel to the page
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        
        // Set up event listeners
        document.getElementById('add-quick-note').addEventListener('click', () => this.addQuickNote());
        document.getElementById('close-notes-panel').addEventListener('click', () => this.toggleNotesPanel());
        document.getElementById('quick-note-textarea').addEventListener('input', (e) => this.updateCurrentNote(e.target.value));
        
        // Load and display notes
        this.displayQuickNotes();
    }
    
    toggleNotesPanel() {
        const panel = document.getElementById('quick-notes-panel');
        const button = document.getElementById('sticky-note-btn');
        const mobileButton = document.getElementById('mobile-sticky-note-btn');
        
        if (!panel) return;
        
        this.isNotesPanelOpen = !this.isNotesPanelOpen;
        
        if (this.isNotesPanelOpen) {
            panel.classList.add('open');
            button?.classList.add('active');
            mobileButton?.classList.add('active');
            
            // Focus textarea if there's a current note
            if (this.quickNotes.length > 0) {
                setTimeout(() => {
                    document.getElementById('quick-note-textarea')?.focus();
                }, 300);
            }
        } else {
            panel.classList.remove('open');
            button?.classList.remove('active');
            mobileButton?.classList.remove('active');
        }
    }
    
    addQuickNote() {
        const note = {
            id: `note-${Date.now()}`,
            content: '',
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        
        this.quickNotes.push(note);
        this.currentNoteIndex = this.quickNotes.length - 1;
        this.displayQuickNotes();
        this.saveQuickNotes();
        
        // Focus the textarea
        const textarea = document.getElementById('quick-note-textarea');
        if (textarea) {
            textarea.value = '';
            textarea.focus();
        }
    }
    
    
    selectQuickNote(index) {
        if (index >= 0 && index < this.quickNotes.length) {
            this.currentNoteIndex = index;
            this.displayQuickNotes();
            
            const textarea = document.getElementById('quick-note-textarea');
            if (textarea) {
                textarea.value = this.quickNotes[index].content;
                textarea.focus();
            }
        }
    }
    
    deleteQuickNote(index) {
        if (index >= 0 && index < this.quickNotes.length) {
            const noteText = this.quickNotes[index].content.substring(0, 50) || 'this note';
            
            if (this.settings.confirmOnClose) {
                this.showConfirmationDialog(
                    'Delete Note?',
                    `Are you sure you want to delete "${noteText}..."?`,
                    () => {
                        this.doDeleteQuickNote(index);
                    }
                );
            } else {
                this.doDeleteQuickNote(index);
            }
        }
    }
    
    doDeleteQuickNote(index) {
        this.quickNotes.splice(index, 1);
        
        // Adjust current index if needed
        if (this.currentNoteIndex >= this.quickNotes.length) {
            this.currentNoteIndex = Math.max(0, this.quickNotes.length - 1);
        }
        
        this.displayQuickNotes();
        this.saveQuickNotes();
    }
    
    updateCurrentNote(content) {
        if (this.quickNotes.length > 0 && this.currentNoteIndex >= 0) {
            this.quickNotes[this.currentNoteIndex].content = content;
            this.quickNotes[this.currentNoteIndex].updated = new Date().toISOString();
            this.throttledSaveQuickNotes();
            
            // Update tab preview
            const tab = document.querySelector(`[data-note-index="${this.currentNoteIndex}"] .note-tab-preview`);
            if (tab) {
                const preview = content.substring(0, 30) || 'Empty note';
                tab.textContent = preview;
            }
        }
    }
    
    displayQuickNotes() {
        const tabsContainer = document.getElementById('quick-notes-tabs');
        const textarea = document.getElementById('quick-note-textarea');
        
        if (!tabsContainer || !textarea) return;
        
        // Clear existing tabs
        tabsContainer.innerHTML = '';
        
        // Create tabs for each note
        this.quickNotes.forEach((note, index) => {
            const tab = document.createElement('div');
            tab.className = `quick-note-tab ${index === this.currentNoteIndex ? 'active' : ''}`;
            tab.setAttribute('data-note-index', index);
            
            const preview = note.content.substring(0, 30) || 'Empty note';
            const date = new Date(note.updated).toLocaleDateString();
            
            tab.innerHTML = `
                <div class="note-tab-content" onclick="notesWiki.selectQuickNote(${index})">
                    <div class="note-tab-preview">${this.escapeHtml(preview)}</div>
                    <div class="note-tab-date">${date}</div>
                </div>
                <button class="note-tab-delete" onclick="notesWiki.deleteQuickNote(${index})" title="Delete note">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            `;
            
            tabsContainer.appendChild(tab);
        });
        
        // Update textarea with current note
        if (this.quickNotes.length > 0 && this.currentNoteIndex >= 0) {
            textarea.value = this.quickNotes[this.currentNoteIndex].content;
        } else {
            textarea.value = '';
            textarea.placeholder = 'Click the + button to create a new note';
        }
        
        // Show/hide empty state
        if (this.quickNotes.length === 0) {
            tabsContainer.innerHTML = '<div class="quick-notes-empty">No notes yet. Click + to create one.</div>';
        }
    }
    
    saveQuickNotes() {
        try {
            localStorage.setItem('quickNotes', JSON.stringify(this.quickNotes));
        } catch (error) {
            console.warn('Failed to save quick notes:', error);
        }
    }
    
    loadQuickNotes() {
        try {
            const stored = localStorage.getItem('quickNotes');
            if (stored) {
                this.quickNotes = JSON.parse(stored);
                if (!Array.isArray(this.quickNotes)) {
                    this.quickNotes = [];
                }
            } else {
                // Migrate from old sticky notes if they exist
                const oldSticky = localStorage.getItem('stickyNotes');
                if (oldSticky) {
                    try {
                        const oldNotes = JSON.parse(oldSticky);
                        if (oldNotes && typeof oldNotes === 'object') {
                            // Convert Map entries or object to array format
                            const notesArray = Array.from(oldNotes instanceof Map ? oldNotes.values() : Object.values(oldNotes));
                            this.quickNotes = notesArray.map(note => ({
                                id: note.id || `note-${Date.now()}-${Math.random()}`,
                                content: note.content || '',
                                created: note.createdAt || note.created || new Date().toISOString(),
                                updated: note.updatedAt || note.updated || new Date().toISOString()
                            }));
                            this.saveQuickNotes();
                            // Remove old sticky notes data
                            localStorage.removeItem('stickyNotes');
                            console.log('Migrated', this.quickNotes.length, 'sticky notes to quick notes');
                        }
                    } catch (e) {
                        console.warn('Failed to migrate sticky notes:', e);
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to load quick notes:', error);
            this.quickNotes = [];
        }
    }
    
    // Throttled save for performance
    throttledSaveQuickNotes() {
        if (this.quickNoteSaveTimeout) {
            clearTimeout(this.quickNoteSaveTimeout);
        }
        this.quickNoteSaveTimeout = setTimeout(() => {
            this.saveQuickNotes();
        }, 1000);
    }
    
    // Replace createStickyNote method to toggle the panel instead
    createStickyNote() {
        this.toggleNotesPanel();
    }
        setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenuContent = document.getElementById('mobile-menu-content');
        
        if (!mobileMenuToggle || !mobileMenuContent) return;
        
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuContent.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!document.getElementById('mobile-menu').contains(e.target)) {
                mobileMenuContent.classList.remove('show');
            }
        });
        
        // Wire up mobile menu items to desktop functionality
        
        // Search
        document.getElementById('mobile-search-toggle')?.addEventListener('click', () => {
            mobileMenuContent.classList.remove('show');
            document.getElementById('search-toggle')?.click();
        });
        
        // Recent files 
        document.getElementById('mobile-recent-toggle')?.addEventListener('click', () => {
            mobileMenuContent.classList.remove('show');
            const recentDropdown = document.getElementById('recent-dropdown');
            const dropdownContent = document.getElementById('recent-dropdown-content');
            if (recentDropdown && dropdownContent) {
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
        
        // Bookmarks
        document.getElementById('mobile-bookmarks-toggle')?.addEventListener('click', () => {
            mobileMenuContent.classList.remove('show');
            const bookmarksDropdown = document.getElementById('bookmarks-dropdown');
            const dropdownContent = document.getElementById('bookmarks-dropdown-content');
            if (bookmarksDropdown && dropdownContent) {
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
        
        // Split view
        document.getElementById('mobile-split-view-toggle')?.addEventListener('click', () => {
            mobileMenuContent.classList.remove('show');
            this.toggleSplitView();
        });
        
        // Sticky note
        document.getElementById('mobile-sticky-note-btn')?.addEventListener('click', () => {
            mobileMenuContent.classList.remove('show');
            this.createStickyNote();
        });
        
        // Settings
        document.getElementById('mobile-settings-toggle')?.addEventListener('click', () => {
            mobileMenuContent.classList.remove('show');
            this.showSettings();
        });
        
        // Sync badge counts
        this.syncMobileBadges();
    }
    
    syncMobileBadges() {
        // Sync recent files count
        const recentCount = document.getElementById('recent-count');
        const mobileRecentCount = document.getElementById('mobile-recent-count');
        if (recentCount && mobileRecentCount) {
            mobileRecentCount.textContent = recentCount.textContent;
            mobileRecentCount.style.display = recentCount.style.display;
        }
        
        // Sync bookmarks count
        const bookmarksCount = document.getElementById('bookmarks-count');
        const mobileBookmarksCount = document.getElementById('mobile-bookmarks-count');
        if (bookmarksCount && mobileBookmarksCount) {
            mobileBookmarksCount.textContent = bookmarksCount.textContent;
            mobileBookmarksCount.style.display = bookmarksCount.style.display;
        }
    }
    
    setupCleanupHandlers() {
        // Setup page lifecycle cleanup to prevent memory leaks
        const cleanup = () => {
            try {
                // Clear timer interval
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                    this.timerInterval = null;
                }
                
                // Clear auto-start timeout
                if (this.autoStartTimeout) {
                    clearTimeout(this.autoStartTimeout);
                    this.autoStartTimeout = null;
                }
                
                // Clear reset press timer
                if (this.resetPressTimer) {
                    clearTimeout(this.resetPressTimer);
                    this.resetPressTimer = null;
                }
                
                // Clear quick note save timeout
                if (this.quickNoteSaveTimeout) {
                    clearTimeout(this.quickNoteSaveTimeout);
                    this.quickNoteSaveTimeout = null;
                }
                
                // Close AudioContext if it exists
                if (this.audioContext && this.audioContext.state !== 'closed') {
                    this.audioContext.close();
                    this.audioContext = null;
                }
                
                // Clear any global handlers
                if (window.tocScrollHandler) {
                    const mainContent = document.getElementById('main-content');
                    if (mainContent) {
                        mainContent.removeEventListener('scroll', window.tocScrollHandler);
                    }
                    delete window.tocScrollHandler;
                }
                
                if (window.progressScrollHandler) {
                    const mainContent = document.getElementById('main-content');
                    if (mainContent) {
                        mainContent.removeEventListener('scroll', window.progressScrollHandler);
                    }
                    delete window.progressScrollHandler;
                }
                
                // Remove any leftover tab preview elements
                const tabPreview = document.getElementById('tab-preview');
                if (tabPreview) {
                    tabPreview.remove();
                }
                
                // Remove dropdown close handler
                if (this.dropdownCloseHandler) {
                    document.removeEventListener('click', this.dropdownCloseHandler);
                    this.dropdownCloseHandler = null;
                }
                
                // Remove context resize handler
                if (this.contextResizeHandler) {
                    window.removeEventListener('resize', this.contextResizeHandler);
                    this.contextResizeHandler = null;
                }
                
                // Disconnect ResizeObserver
                if (this.contextResizeObserver) {
                    this.contextResizeObserver.disconnect();
                    this.contextResizeObserver = null;
                }
                
                console.log('Application cleanup completed');
            } catch (error) {
                console.warn('Error during cleanup:', error);
            }
        };
        
        // Add event listeners for various page lifecycle events
        window.addEventListener('beforeunload', cleanup);
        window.addEventListener('unload', cleanup);
        window.addEventListener('pagehide', cleanup);
        
        // For single-page apps, cleanup on popstate
        window.addEventListener('popstate', cleanup);
    }
}

// Initialize the application
const notesWiki = new NotesWiki();