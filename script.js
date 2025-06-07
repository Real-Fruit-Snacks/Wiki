/**
 * Notes Wiki Application
 * A self-contained static notes/wiki site for GitLab Pages
 */

class NotesWiki {
    constructor() {
        this.notesIndex = null;
        this.currentNote = null;
        this.searchIndex = [];
        this.recentFiles = [];
        this.selectedTags = new Set();
        this.activeContext = null;  // Track active context
        this.contexts = [];  // Store available contexts
        this.initialHash = window.location.hash;  // Store initial hash for later processing
        
        // Tab management
        this.tabs = new Map(); // Map of tab ID to tab data
        this.activeTabId = null;
        this.tabIdCounter = 0;
        this.tabContents = new Map(); // Map of tab ID to content HTML
        this.draggedTabId = null; // For drag and drop
        this.themes = [
            { id: '2077', name: '2077 Theme', description: 'Cyberpunk 2077 inspired neon colors' },
            { id: 'atom-one-light', name: 'Atom One Light', description: 'Clean, bright theme from Atom editor' },
            { id: 'ayu-dark', name: 'Ayu Dark', description: 'Modern dark theme' },
            { id: 'ayu-light', name: 'Ayu Light', description: 'Modern light theme' },
            { id: 'balatro', name: 'Balatro', description: 'Roguelike card game aesthetic with neon accents' },
            { id: 'bluloco-dark', name: 'Bluloco Dark', description: 'High contrast dark theme with vibrant colors' },
            { id: 'bluloco-light', name: 'Bluloco Light', description: 'High contrast light theme with blue accents' },
            { id: 'catppuccin-latte', name: 'Catppuccin Latte', description: 'Light theme with warm colors' },
            { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', description: 'Dark theme with soft pastel colors' },
            { id: 'claude', name: 'Claude AI', description: 'Clean and approachable with purple accents' },
            { id: 'cobalt2', name: 'Cobalt2', description: 'Wes Bos\'s iconic navy blue theme with vibrant accents' },
            { id: 'cyberpunk', name: 'Cyberpunk', description: 'Neon-lit dystopian future theme' },
            { id: 'dark', name: 'Dark', description: 'Easy on the eyes dark theme' },
            { id: 'dracula', name: 'Dracula', description: 'Dark theme with vibrant colors' },
            { id: 'everforest-dark', name: 'Everforest Dark', description: 'Forest-inspired dark theme' },
            { id: 'firewalla', name: 'Firewalla', description: 'Cybersecurity-focused with cyan accents' },
            { id: 'flatland', name: 'Flatland', description: 'Flat design with muted colors' },
            { id: 'github-dark', name: 'GitHub Dark', description: 'GitHub\'s dark theme' },
            { id: 'github-light', name: 'GitHub Light', description: 'GitHub\'s clean light theme' },
            { id: 'gruvbox-dark', name: 'Gruvbox Dark', description: 'Retro groove dark theme' },
            { id: 'gruvbox-light', name: 'Gruvbox Light', description: 'Retro groove light theme' },
            { id: 'hackthebox', name: 'HackTheBox', description: 'Inspired by the HTB platform colors' },
            { id: 'hotdog-stand', name: 'Hot Dog Stand', description: 'Windows 3.1 classic - Bold red & yellow!' },
            { id: 'kanagawa', name: 'Kanagawa', description: 'Japanese aesthetic inspired dark theme' },
            { id: 'light', name: 'Light', description: 'Clean light theme' },
            { id: 'lucario', name: 'Lucario', description: 'Minimalist dark theme with pastel colors' },
            { id: 'material-darker', name: 'Material Darker', description: 'Darker variant of Material theme' },
            { id: 'material-ocean', name: 'Material Ocean', description: 'Material design dark theme' },
            { id: 'material-palenight', name: 'Material Palenight', description: 'Material design with palenight colors' },
            { id: 'matrix', name: 'Matrix', description: 'Classic terminal green on black - Enter the Matrix' },
            { id: 'monokai', name: 'Monokai', description: 'Vibrant colors on dark background' },
            { id: 'noctis', name: 'Noctis', description: 'Nature-inspired theme with blue tones' },
            { id: 'nord', name: 'Nord', description: 'Arctic, north-bluish color palette' },
            { id: 'nordic', name: 'Nordic', description: 'Warmer and darker variant of Nord' },
            { id: 'one-dark-pro', name: 'One Dark Pro', description: 'Atom-inspired dark theme' },
            { id: 'oxocarbon', name: 'Oxocarbon', description: 'IBM Carbon-inspired professional theme' },
            { id: 'palenight', name: 'Palenight', description: 'An elegant and juicy material-like theme' },
            { id: 'protonmail', name: 'ProtonMail', description: 'Privacy-focused with signature purple' },
            { id: 'rose-pine', name: 'Rosé Pine', description: 'Dark theme with muted colors' },
            { id: 'rose-pine-dawn', name: 'Rosé Pine Dawn', description: 'Light variant of Rosé Pine' },
            { id: 'shades-of-purple', name: 'Shades of Purple', description: 'Unique purple-focused aesthetic' },
            { id: 'solarized-dark', name: 'Solarized Dark', description: 'Dark variant of Solarized' },
            { id: 'solarized-light', name: 'Solarized Light', description: 'Precision colors for machines and people' },
            { id: 'spacegray', name: 'Spacegray', description: 'Minimalist gray theme from Sublime Text' },
            { id: 'thinkultra', name: 'ThinkUltra', description: 'ThinkPad-inspired minimalist black theme' },
            { id: 'tokyo-night', name: 'Tokyo Night', description: 'A clean dark theme that celebrates Tokyo at night' },
            { id: 'tomorrow-night', name: 'Tomorrow Night', description: 'Popular dark theme from the Tomorrow theme family' },
            { id: 'vaporwave', name: 'Vaporwave', description: 'Retro aesthetic with neon pink and cyan' },
            { id: 'vscode-dark-plus', name: 'VSCode Dark+', description: 'Popular VSCode dark theme' },
            { id: 'winter-is-coming-dark', name: 'Winter is Coming Dark', description: 'Cool blue color scheme with frosty appearance' },
            { id: 'winter-is-coming-light', name: 'Winter is Coming Light', description: 'Light variant with cool blue accents' },
            { id: 'witch-hazel', name: 'Witch Hazel', description: 'Purple-based theme with magical vibes' },
            { id: 'zenburn', name: 'Zenburn', description: 'Low contrast theme for reduced eye strain' }
        ];
        
        // Settings
        this.settings = {
            trackRecent: true,
            showLineNumbers: true,
            enableWordWrap: false,
            recentLimit: 20,
            theme: 'tokyo-night',
            autoTheme: false, // Enable automatic theme switching based on system preferences
            activeContext: null,  // Store active context in settings
            stickySearch: false,  // Keep search query when reopening search
            contentWidth: 'narrow'  // Default to narrow width
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
        
        this.init();
    }
    
    async init() {
        // Load settings from localStorage
        this.loadSettings();
        
        // Initialize theme
        this.initializeTheme();
        
        // Apply line number setting
        this.applyLineNumberSetting();
        
        // Apply word wrap setting
        this.applyWordWrapSetting();
        
        // Apply content width setting
        this.applyContentWidthSetting();
        
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
        
        // Populate theme picker
        this.populateThemePicker();
        
        // Build context switcher
        this.buildContextSwitcher();
        
        // Initialize tab system
        this.initializeTabs();
    }
    
    async loadNotesIndex() {
        try {
            const response = await fetch('notes-index.json');
            this.notesIndex = await response.json();
            
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
            
            Object.entries(node).forEach(([name, value]) => {
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
                                // Update current tab
                                const tab = this.tabs.get(this.activeTabId);
                                if (tab) {
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
            
            pill.addEventListener('click', () => {
                if (this.selectedTags.has(tag)) {
                    this.selectedTags.delete(tag);
                    pill.classList.remove('active');
                } else {
                    this.selectedTags.add(tag);
                    pill.classList.add('active');
                }
                this.filterNotesByTags();
                this.updateTagsUI();
            });
            
            modalTagFilter.appendChild(pill);
        });
        
        this.updateTagsUI();
    }
    
    filterNotesByTags() {
        if (this.selectedTags.size === 0) {
            // Show all notes
            this.buildNavigationTree();
            return;
        }
        
        // Filter notes by active context first
        const contextNotes = this.activeContext 
            ? this.notesIndex.notes.filter(note => note.context === this.activeContext)
            : this.notesIndex.notes;
        
        // Filter notes by selected tags (OR logic - show notes with ANY selected tag)
        const filteredNotes = contextNotes.filter(note => {
            const noteTags = new Set(note.metadata.tags || []);
            return Array.from(this.selectedTags).some(tag => noteTags.has(tag));
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
            document.getElementById('sidebar').classList.toggle('open');
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
        
        // Search input
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
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
                this.settings.autoTheme = e.target.checked;
                this.saveSettings();
                
                // Reinitialize theme based on new setting
                this.initializeTheme();
                
                // Update theme cards state
                this.updateAutoThemeState();
            });
        }
        
        // Sticky search toggle
        const stickySearchCheckbox = document.getElementById('sticky-search-setting');
        if (stickySearchCheckbox) {
            stickySearchCheckbox.addEventListener('change', (e) => {
                this.settings.stickySearch = e.target.checked;
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
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input field
            const isTyping = e.target.matches('input, textarea, [contenteditable="true"]');
            
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
                this.hideSearch();
                this.hideSettings();
                this.hideTagsModal();
            } else if ((e.ctrlKey || e.metaKey) && !isTyping) {
                switch(e.key.toLowerCase()) {
                    case 't': // New tab
                        e.preventDefault();
                        this.createNewTab();
                        break;
                    case 'k': // Search
                        e.preventDefault();
                        this.closeAllDropdowns();
                        this.showSearch();
                        break;
                    case ',': // Settings
                        e.preventDefault();
                        this.showSettings();
                        break;
                    case 'f': // Filter by tags
                        e.preventDefault();
                        this.showTagsModal();
                        break;
                }
            }
        });
        
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
        } else {
            this.loadNote(hash);
        }
    }
    
    async loadNote(path) {
        const mainContent = document.getElementById('main-content');
        
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
            
            const response = await fetch(path.slice(1)); // Remove leading slash for fetch
            if (!response.ok) {
                throw new Error('Note not found');
            }
            
            const markdown = await response.text();
            
            // Parse frontmatter
            const { metadata, content } = this.parseFrontmatter(markdown);
            
            // Update current note
            this.currentNote = { path, metadata, content };
            
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
            mainContent.innerHTML = `
                <div class="content-wrapper">
                    <h1>Note Not Found</h1>
                    <p>The requested note could not be loaded.</p>
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
            
            // Highlight code
            let highlightedCode = codeContent;
            if (language && Prism.languages[language]) {
                highlightedCode = Prism.highlight(codeContent, Prism.languages[language], language);
            } else {
                // If no language specified or Prism doesn't support it, escape the code
                highlightedCode = self.escapeHtml(codeContent);
            }
            
            // Add line numbers if enabled
            let codeHtml = highlightedCode;
            if (self.settings.showLineNumbers) {
                const lines = codeContent.split('\n');
                const lineNumbersHtml = lines.map((_, index) => 
                    `<span class="line-number">${index + 1}</span>`
                ).join('\n');
                
                codeHtml = `<div class="code-with-line-numbers">
                    <div class="line-numbers">${lineNumbersHtml}</div>
                    <div class="code-content">${highlightedCode}</div>
                </div>`;
            }
            
            // Generate unique ID for this code block
            const blockId = `code-block-${codeBlockId++}`;
            
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
            html += '<span class="toggle-icon">' + (collapse ? '▶' : '▼') + '</span>';
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
            if (self.settings.showLineNumbers) {
                html += '<pre class="with-line-numbers"><code class="language-' + language + '">' + codeHtml + '</code></pre>';
            } else {
                html += '<pre><code class="language-' + language + '">' + codeHtml + '</code></pre>';
            }
            html += '</div>';
            html += '</div>';
            
            return html;
        };  // No need to bind since we're using arrow function inside
        
        // Configure marked with custom renderer and options
        marked.use({
            renderer: renderer,
            breaks: true,
            gfm: true,
            extensions: [this.createCalloutExtension()]
        });
        
        // Parse markdown
        const html = marked.parse(content);
        
        // Build note HTML
        mainContent.innerHTML = `
            <div class="content-wrapper">
                <header class="note-header">
                    <div class="note-title-row">
                        <h1 class="note-title">${this.escapeHtml(metadata.title || 'Untitled')}</h1>
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
        
        // Scroll to top
        mainContent.scrollTop = 0;
        
        // Setup floating share button visibility
        this.setupFloatingShareButton();
        
        // Update expand button state after rendering
        this.updateExpandButtonState();
        
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
                            // Update current tab's path
                            const tab = this.tabs.get(this.activeTabId);
                            if (tab) {
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
    
    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add to body
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
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
                if (icon) icon.textContent = '▼';
            } else {
                block.classList.add('collapsed');
                const icon = block.querySelector('.toggle-icon');
                if (icon) icon.textContent = '▶';
            }
        });
        
        // Update button state
        if (expandButton) {
            if (shouldExpand) {
                expandButton.classList.remove('all-expanded');
            } else {
                expandButton.classList.add('all-expanded');
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
        if (currentExpanded > totalExpandable / 2 || totalExpandable === 0) {
            expandButton.classList.add('all-expanded');
        } else {
            expandButton.classList.remove('all-expanded');
        }
    }
    
    bookmarkCurrentNote() {
        if (!this.currentNote) {
            this.showToast('No note to bookmark');
            return;
        }
        
        // For now, just copy the URL to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            this.showToast('Note link copied to clipboard');
        }).catch(() => {
            this.showToast('Failed to copy link');
        });
        
        // TODO: In the future, implement actual bookmarking functionality
        // This could save to a special bookmarks list in localStorage
    }
    
    toggleCodeBlock(blockId) {
        const codeBlock = document.getElementById(blockId);
        if (codeBlock) {
            codeBlock.classList.toggle('collapsed');
            const icon = codeBlock.querySelector('.toggle-icon');
            if (icon) {
                icon.textContent = codeBlock.classList.contains('collapsed') ? '▶' : '▼';
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
    
    closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    showSearch() {
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
    
    performSearch(query) {
        const results = document.getElementById('search-results');
        
        if (!query.trim()) {
            results.innerHTML = '';
            return;
        }
        
        // Simple fuzzy search
        const searchTerms = query.toLowerCase().split(' ');
        
        // Use global search index if available (when search modal is open), otherwise use context-filtered index
        const searchIndex = this.globalSearchIndex || this.searchIndex;
        
        const matches = searchIndex.filter(item => {
            const searchText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.author} ${item.content}`.toLowerCase();
            return searchTerms.every(term => searchText.includes(term));
        });
        
        if (matches.length === 0) {
            results.innerHTML = '<p class="empty-state">No results found</p>';
            return;
        }
        
        // Render results
        results.innerHTML = '';
        matches.slice(0, 10).forEach(match => {
            const a = document.createElement('a');
            a.href = `#${match.path}`;
            a.className = 'search-result';
            a.innerHTML = `
                <div class="search-result-title">${this.highlightText(match.title, searchTerms)}</div>
                <div class="search-result-path">${match.path}</div>
                ${match.description ? `
                    <div class="search-result-excerpt">
                        ${this.highlightText(match.description, searchTerms)}
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
                        // Update current tab
                        const tab = this.tabs.get(this.activeTabId);
                        if (tab) {
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
            
            results.appendChild(a);
        });
    }
    
    onSearchResultClick(path) {
        // This method is no longer needed since we handle clicks inline
        // Keep it for backward compatibility if called elsewhere
        const tab = this.tabs.get(this.activeTabId);
        if (tab) {
            tab.path = path;
            this.loadNote(path);
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
        const count = this.selectedTags.size;
        document.getElementById('selected-tags-count').textContent = `${count} selected`;
        
        // Update button badge
        this.updateTagCountBadge();
    }
    
    updateTagCountBadge() {
        const count = this.selectedTags.size;
        const badge = document.getElementById('active-tag-count');
        if (!badge) {
            return;
        }
        
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
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
        
        // Create theme cards
        this.themes.forEach(theme => {
            const card = document.createElement('div');
            card.className = 'theme-card';
            card.dataset.themeId = theme.id;
            
            // Get theme colors for preview
            const previewColors = this.getThemePreviewColors(theme.id);
            const syntaxColors = this.getThemeSyntaxColors(theme.id);
            
            // Apply theme-specific inline styles to the card
            card.style.backgroundColor = previewColors.bg;
            card.style.borderColor = previewColors.border;
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
            
            card.innerHTML = `
                <div class="theme-card-preview-full" style="
                    background: ${previewColors.bg};
                    border: 1px solid ${previewColors.border};
                    border-radius: 6px;
                    padding: 8px;
                    margin-bottom: 8px;
                    width: 100%;
                    box-sizing: border-box;
                ">
                    <div style="
                        background: ${previewColors.accent};
                        height: 3px;
                        border-radius: 2px;
                        margin-bottom: 6px;
                    "></div>
                    <pre style="
                        margin: 0;
                        font-size: 10px;
                        line-height: 1.3;
                        font-family: 'Consolas', 'Monaco', monospace;
                        background: transparent;
                        padding: 0;
                        white-space: pre;
                        overflow: hidden;
                    "><code style="background: transparent; padding: 0;"><span style="color: ${syntaxColors.keyword}">function</span> <span style="color: ${syntaxColors.function}">hello</span>() {
  <span style="color: ${syntaxColors.keyword}">return</span> <span style="color: ${syntaxColors.string}">"world"</span>;
}</code></pre>
                </div>
                <div class="theme-card-title" style="color: ${previewColors.text};">${theme.name}</div>
                <div class="theme-card-description" style="color: ${previewColors.textMuted};">${theme.description}</div>
            `;
            
            // Add hover effect with theme colors
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('active')) {
                    card.style.borderColor = previewColors.accent;
                    card.style.boxShadow = `0 4px 12px ${previewColors.accent}20`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    card.style.borderColor = previewColors.border;
                    card.style.boxShadow = '';
                }
            });
            
            // Handle theme selection
            card.addEventListener('click', () => {
                // If auto-theme is enabled, disable it when user selects a theme
                if (this.settings.autoTheme) {
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
                
                // Show success feedback
                this.showToast(`${theme.name} theme applied!`);
            });
            
            themeCardsGrid.appendChild(card);
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
            'claude': {
                bg: '#ffffff',
                border: '#e5e7eb',
                accent: '#8b5cf6',
                text: '#1f2937',
                textMuted: '#6b7280'
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
            'balatro': {
                bg: '#0d0d0d',
                border: '#4d1a4d',
                accent: '#ff007f',
                text: '#e0d5e0',
                textMuted: '#8066B0'
            },
            'everforest-dark': {
                bg: '#2d353b',
                border: '#475258',
                accent: '#7fbbb3',
                text: '#d3c6aa',
                textMuted: '#7a8478'
            },
            'firewalla': {
                bg: '#0a0e1a',
                border: '#1e293b',
                accent: '#00b8d9',
                text: '#e2e8f0',
                textMuted: '#64748b'
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
            'flatland': {
                bg: '#26292c',
                border: '#3e4147',
                accent: '#93c763',
                text: '#cdd3d8',
                textMuted: '#798188'
            },
            'protonmail': {
                bg: '#1c1b24',
                border: '#413e4f',
                accent: '#8c6fd5',
                text: '#e5e3ea',
                textMuted: '#8e8b97'
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
            'claude': {
                keyword: '#8b5cf6',
                function: '#3b82f6',
                string: '#059669',
                comment: '#6b7280',
                number: '#dc2626'
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
            'balatro': {
                keyword: '#ff007f',
                function: '#9966ff',
                string: '#00ff66',
                comment: '#8066B0',
                number: '#ff0040'
            },
            'everforest-dark': {
                keyword: '#e67e80',
                function: '#7fbbb3',
                string: '#a7c080',
                comment: '#7a8478',
                number: '#e69875'
            },
            'firewalla': {
                keyword: '#2196f3',
                function: '#0066cc',
                string: '#4caf50',
                comment: '#64748b',
                number: '#f44336'
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
            'flatland': {
                keyword: '#93c763',
                function: '#8f9d6a',
                string: '#afc4db',
                comment: '#798188',
                number: '#cf6a4c'
            },
            'protonmail': {
                keyword: '#8c6fd5',
                function: '#6241c5',
                string: '#44b662',
                comment: '#8e8b97',
                number: '#dc3545'
            }
        };
        
        return syntaxColors[themeId] || syntaxColors['light'];
    }
    
    initializeTheme() {
        // Check if auto theme is enabled
        if (this.settings.autoTheme) {
            // Apply theme based on system preference
            const systemTheme = this.getSystemTheme();
            this.applyTheme(systemTheme);
            
            // Set up listener for system theme changes
            this.setupSystemThemeListener();
        } else {
            // Apply saved theme
            this.applyTheme(this.settings.theme);
        }
    }
    
    getSystemTheme() {
        // Check if the browser supports prefers-color-scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    setupSystemThemeListener() {
        // Listen for changes to system theme preference
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Modern browsers
            if (darkModeQuery.addEventListener) {
                darkModeQuery.addEventListener('change', (e) => {
                    if (this.settings.autoTheme) {
                        const newTheme = e.matches ? 'dark' : 'light';
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
        const link = document.getElementById('theme-stylesheet');
        link.href = `themes/${themeId}.css`;
        document.documentElement.setAttribute('data-theme', themeId);
        
        // Update current theme in settings if not using auto theme
        if (!this.settings.autoTheme) {
            this.settings.theme = themeId;
        }
        
        // Update current theme display in settings modal
        this.updateCurrentThemeDisplay();
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
        
        // Add to beginning
        this.recentFiles.unshift({
            path,
            title: metadata.title || 'Untitled',
            lastViewed: new Date().toISOString(),
            viewCount: 1,
            context: context
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
        
        // Show all recent files regardless of context
        const recentToShow = this.recentFiles;
        
        if (recentToShow.length === 0) {
            list.innerHTML = '<li class="empty-state">No recent files</li>';
            count.style.display = 'none';
        } else {
            count.textContent = recentToShow.length;
            count.style.display = 'flex';
            
            list.innerHTML = '';
            recentToShow.forEach(file => {
                const li = document.createElement('li');
                li.className = 'recent-file-item';
                
                const a = document.createElement('a');
                a.href = `#${file.path}`;
                a.className = 'recent-file-link';
                
                // Add context indicator if file has a context
                const contextBadge = file.context 
                    ? `<span class="recent-file-context">${file.context}</span>` 
                    : '';
                
                a.innerHTML = `
                    <div class="recent-file-title">${this.escapeHtml(file.title)}${contextBadge}</div>
                    <div class="recent-file-path">${file.path}</div>
                    <div class="recent-file-time">${this.formatRelativeTime(file.lastViewed)}</div>
                `;
                
                // Handle click for tab navigation
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Check if should open in new tab
                    if (e.ctrlKey || e.metaKey) {
                        this.openInNewTab(file.path);
                    } else {
                        // Check if note is already open in another tab
                        const existingTabId = this.findTabByPath(file.path);
                        if (existingTabId && existingTabId !== this.activeTabId) {
                            // Switch to existing tab
                            this.switchToTab(existingTabId);
                        } else {
                            // Update current tab
                            const tab = this.tabs.get(this.activeTabId);
                            if (tab) {
                                tab.path = file.path;
                                this.loadNote(file.path);
                            }
                        }
                    }
                    
                    // Close the dropdown
                    document.getElementById('recent-dropdown').classList.remove('active');
                });
                
                // Handle middle-click
                a.addEventListener('mousedown', (e) => {
                    if (e.button === 1) {
                        e.preventDefault();
                        this.openInNewTab(file.path);
                        document.getElementById('recent-dropdown').classList.remove('active');
                    }
                });
                
                li.appendChild(a);
                list.appendChild(li);
            });
        }
    }
    
    clearRecentFiles() {
        this.recentFiles = [];
        localStorage.removeItem('notesWiki_recentFiles');
        this.updateRecentFilesUI();
    }
    
    loadSettings() {
        const stored = localStorage.getItem('notesWiki_settings');
        if (stored) {
            this.settings = { ...this.settings, ...JSON.parse(stored) };
            // Restore active context
            this.activeContext = this.settings.activeContext;
        }
    }
    
    buildContextSwitcher() {
        const contextSwitcher = document.getElementById('context-switcher');
        if (!contextSwitcher || !this.contexts || this.contexts.length === 0) return;
        
        // Add "All" button
        const allButton = document.createElement('button');
        allButton.className = 'context-button' + (!this.activeContext ? ' active' : '');
        allButton.innerHTML = `<span>All</span>`;
        allButton.addEventListener('click', () => this.setActiveContext(null));
        contextSwitcher.appendChild(allButton);
        
        // Add context buttons
        this.contexts.forEach(context => {
            const button = document.createElement('button');
            button.className = 'context-button' + (this.activeContext === context.id ? ' active' : '');
            button.innerHTML = `<span>${context.name}</span>`;
            button.addEventListener('click', () => this.setActiveContext(context.id));
            contextSwitcher.appendChild(button);
        });
    }
    
    setActiveContext(contextId) {
        this.activeContext = contextId;
        this.settings.activeContext = contextId;
        this.saveSettings();
        
        // Update UI
        document.querySelectorAll('.context-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (contextId) {
            const activeBtn = Array.from(document.querySelectorAll('.context-button')).find(
                btn => btn.textContent.toLowerCase().includes(contextId.replace('-', ' '))
            );
            if (activeBtn) activeBtn.classList.add('active');
        } else {
            document.querySelector('.context-button').classList.add('active');
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
        localStorage.setItem('notesWiki_settings', JSON.stringify(this.settings));
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
        // Remove all content width classes
        document.body.classList.remove('content-width-narrow', 'content-width-normal', 'content-width-wide', 'content-width-full');
        
        // Apply the selected content width class
        document.body.classList.add(`content-width-${this.settings.contentWidth}`);
    }
    
    // Tab Management Methods
    initializeTabs() {
        // Set up event listeners for tab system
        const closeAllButton = document.getElementById('tab-close-all-button');
        if (closeAllButton) {
            closeAllButton.addEventListener('click', () => {
                this.closeAllTabs();
            });
        }
        
        // Try to restore saved tabs
        if (!this.restoreTabState()) {
            // Create initial tab if no saved state
            const initialPath = this.initialHash ? this.initialHash.slice(1) : '/notes/index.md';
            this.createNewTab(initialPath, 'Home');
        }
        
        // Global click handler removed - we now handle clicks on individual links
        // to avoid duplicate tab creation
        
        // Tab keyboard shortcuts are now handled in the global keyboard handler
        
        // Ensure tag count badge is properly initialized
        this.updateTagCountBadge();
    }
    
    createNewTab(path = '/notes/index.md', title = 'New Tab') {
        const tabId = `tab-${this.tabIdCounter++}`;
        const tab = {
            id: tabId,
            path: path,
            title: title,
            scrollPosition: 0
        };
        
        this.tabs.set(tabId, tab);
        this.renderTab(tabId);
        // Switch to tab and update context if needed
        this.switchToTab(tabId, false);
        
        // Load content for the tab
        if (path) {
            this.loadNoteInTab(path, tabId);
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
        tabElement.className = 'tab';
        tabElement.id = tabId;
        tabElement.draggable = true;
        tabElement.innerHTML = `
            <span class="tab-title">${this.escapeHtml(tab.title)}</span>
            <button class="tab-close" aria-label="Close tab">
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
        
        // Middle-click to close
        tabElement.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                this.closeTab(tabId);
            }
        });
        
        // Close button
        tabElement.querySelector('.tab-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tabId);
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
        
        // Update URL
        window.history.replaceState(null, '', `#${tab.path}`);
        
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
    
    closeTab(tabId) {
        if (this.tabs.size <= 1) {
            // If this is the last tab, act like "Close All Tabs"
            this.closeAllTabs();
            return;
        }
        
        const tab = this.tabs.get(tabId);
        if (!tab) return;
        
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
    
    closeAllTabs() {
        // Clear all tabs from DOM
        document.getElementById('tabs-container').innerHTML = '';
        
        // Clear all tabs from memory
        this.tabs.clear();
        this.tabContents.clear();
        
        // Reset tab counter
        this.tabIdCounter = 0;
        
        // Clear saved tab state
        localStorage.removeItem('tabState');
        
        // Create a single tab with the home page
        this.createNewTab('/notes/index.md', 'Home');
        
        // Show a confirmation toast
        this.showToast('All tabs closed');
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
            this.switchToTab(existingTabId);
        } else {
            // Mark this path as pending
            this.pendingTabs.add(path);
            
            // Create new tab
            // Extract title from path or use default
            const parts = path.split('/');
            const filename = parts[parts.length - 1];
            const title = filename.replace('.md', '').replace(/-/g, ' ');
            
            this.createNewTab(path, title);
            
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
                            // Update current tab's path
                            const tab = this.tabs.get(this.activeTabId);
                            if (tab) {
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
            
        const totalSeconds = Math.floor(currentElapsed / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('timer-display').textContent = timeString;
    }
    
    updateTimerUI() {
        const playPauseButton = document.getElementById('timer-play-pause');
        const timerWidget = document.querySelector('.timer-widget');
        
        if (this.timerRunning) {
            playPauseButton.classList.add('playing', 'active');
            timerWidget.classList.add('running');
        } else {
            playPauseButton.classList.remove('playing', 'active');
            timerWidget.classList.remove('running');
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
}

// Initialize the application
const notesWiki = new NotesWiki();