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
        this.themes = [
            { id: 'light', name: 'Light', description: 'Clean light theme' },
            { id: 'dark', name: 'Dark', description: 'Easy on the eyes dark theme' },
            { id: 'vscode-dark-plus', name: 'VSCode Dark+', description: 'Popular VSCode dark theme' },
            { id: 'monokai', name: 'Monokai', description: 'Vibrant colors on dark background' },
            { id: 'dracula', name: 'Dracula', description: 'Dark theme with vibrant colors' },
            { id: 'one-dark-pro', name: 'One Dark Pro', description: 'Atom-inspired dark theme' },
            { id: 'solarized-light', name: 'Solarized Light', description: 'Precision colors for machines and people' },
            { id: 'solarized-dark', name: 'Solarized Dark', description: 'Dark variant of Solarized' },
            { id: 'github-light', name: 'GitHub Light', description: 'GitHub\'s clean light theme' },
            { id: 'github-dark', name: 'GitHub Dark', description: 'GitHub\'s dark theme' },
            { id: 'nord', name: 'Nord', description: 'Arctic, north-bluish color palette' },
            { id: 'gruvbox-dark', name: 'Gruvbox Dark', description: 'Retro groove dark theme' },
            { id: 'gruvbox-light', name: 'Gruvbox Light', description: 'Retro groove light theme' },
            { id: 'tokyo-night', name: 'Tokyo Night', description: 'A clean dark theme that celebrates Tokyo at night' },
            { id: 'palenight', name: 'Palenight', description: 'An elegant and juicy material-like theme' },
            { id: 'hotdog-stand', name: 'Hot Dog Stand', description: 'Windows 3.1 classic - Bold red & yellow!' }
        ];
        
        // Settings
        this.settings = {
            trackRecent: true,
            showLineNumbers: true,
            enableWordWrap: false,
            recentLimit: 20,
            theme: 'light',
            autoTheme: false, // Enable automatic theme switching based on system preferences
            activeContext: null,  // Store active context in settings
            stickySearch: false,  // Keep search query when reopening search
            contentWidth: 'narrow'  // Default to narrow width
        };
        
        // Search state
        this.lastSearchQuery = '';
        
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
        
        // Handle initial route
        this.handleRoute();
        
        // Load recent files
        this.loadRecentFiles();
        
        // Populate theme picker
        this.populateThemePicker();
        
        // Build context switcher
        this.buildContextSwitcher();
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
                        // Always use the full original path from the note object
                        window.location.hash = value.path;
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
        
        // Theme dropdown
        const themeDropdown = document.getElementById('theme-dropdown');
        themeDropdown.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click handler
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== themeDropdown) {
                    d.classList.remove('active');
                }
            });
            themeDropdown.classList.toggle('active');
        });
        
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
        
        document.getElementById('recent-limit').addEventListener('change', (e) => {
            this.settings.recentLimit = parseInt(e.target.value);
            this.saveSettings();
        });
        
        document.getElementById('content-width').addEventListener('change', (e) => {
            this.settings.contentWidth = e.target.value;
            this.saveSettings();
            this.applyContentWidthSetting();
        });
        
        // Auto theme toggle - Note: requires 'auto-theme' checkbox in settings modal HTML
        const autoThemeCheckbox = document.getElementById('auto-theme');
        if (autoThemeCheckbox) {
            autoThemeCheckbox.addEventListener('change', (e) => {
                this.settings.autoTheme = e.target.checked;
                this.saveSettings();
                
                // Reinitialize theme based on new setting
                this.initializeTheme();
                
                // Enable/disable theme picker based on auto theme setting
                const themeList = document.getElementById('theme-list');
                if (themeList) {
                    themeList.style.opacity = e.target.checked ? '0.5' : '1';
                    themeList.style.pointerEvents = e.target.checked ? 'none' : 'auto';
                }
            });
        }
        
        // Handle browser navigation
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
        
        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
                this.hideSearch();
                this.hideSettings();
                this.hideTagsModal();
            } else if (e.key === '/' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.closeAllDropdowns();
                this.showSearch();
            }
        });
    }
    
    handleRoute() {
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
            // Update tag pills
            document.querySelectorAll('.tag-pill').forEach(pill => {
                const tagName = pill.querySelector('span').textContent;
                if (this.selectedTags.has(tagName)) {
                    pill.classList.add('active');
                } else {
                    pill.classList.remove('active');
                }
            });
            // Update tag count badge
            this.updateTagCountBadge();
        } else {
            this.loadNote(hash);
        }
    }
    
    async loadNote(path) {
        const mainContent = document.getElementById('main-content');
        
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
            
            // Track in recent files
            if (this.settings.trackRecent) {
                this.addToRecentFiles(path, metadata);
            }
            
            // Update active state in navigation
            document.querySelectorAll('.file-tree-link').forEach(link => {
                if (link.dataset.path === path) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        } catch (error) {
            console.error('Failed to load note:', error);
            mainContent.innerHTML = `
                <div class="content-wrapper">
                    <h1>Note Not Found</h1>
                    <p>The requested note could not be loaded.</p>
                    <p><a href="#/notes/index.md">Return to home</a></p>
                </div>
            `;
        }
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
            // marked v15 uses token objects instead of direct parameters
            // Extract code content and language from token
            let codeContent = '';
            let info = '';
            
            if (typeof token === 'string') {
                // Fallback for old signature (pre-v15)
                codeContent = token;
                info = arguments[1] || '';
            } else if (typeof token === 'object' && token !== null) {
                // marked v15+ token object
                codeContent = token.text || token.raw || '';
                info = token.lang || '';
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
            
            if (collapse) {
                html += '<button class="code-block-button toggle-button" onclick="notesWiki.toggleCodeBlock(\'' + blockId + '\')" aria-label="Toggle code">';
                html += '<span class="toggle-icon">▶</span>';
                html += '</button>';
            }
            
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
        }.bind(this);  // Bind this context
        
        // Configure marked with custom extensions
        marked.setOptions({
            renderer: renderer,
            breaks: true,
            gfm: true
        });
        
        // Add callout extension
        marked.use({
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
                        <button class="icon-button share-icon" onclick="notesWiki.shareNote()" title="Copy link to this note">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M7.823 1.677L4.927 4.573c-.47.47-.47 1.234 0 1.704l2.896 2.896a.25.25 0 00.427-.177V7.235c2.467.023 4.741.773 4.741 4.029a4.272 4.272 0 01-1.215 2.966.5.5 0 00.755.656c.98-.893 2.22-2.543 2.22-4.872 0-3.681-2.946-5.552-5.75-5.552a.385.385 0 01-.25-.067V3.354a.25.25 0 00-.427-.177zM3.75 12.5c-.69 0-1.25-.56-1.25-1.25v-4.5c0-.69.56-1.25 1.25-1.25h1a.75.75 0 010 1.5h-1v4.5h7.5V9h.5a.75.75 0 011.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-7.5z"/>
                            </svg>
                        </button>
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
            </div>
        `;
        
        // Scroll to top
        mainContent.scrollTop = 0;
        
        // Handle internal links
        mainContent.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.startsWith('#/')) {
                    // Internal note link
                    window.location.hash = href.slice(1);
                } else {
                    // Heading anchor
                    const target = mainContent.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    
    shareNote() {
        const url = window.location.href;
        
        navigator.clipboard.writeText(url).then(() => {
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
    
    toggleCodeBlock(blockId) {
        const codeBlock = document.getElementById(blockId);
        if (codeBlock) {
            codeBlock.classList.toggle('collapsed');
            const icon = codeBlock.querySelector('.toggle-icon');
            if (icon) {
                icon.textContent = codeBlock.classList.contains('collapsed') ? '▶' : '▼';
            }
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
        document.getElementById('search-overlay').style.display = 'block';
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
        document.getElementById('search-overlay').style.display = 'none';
        const searchInput = document.getElementById('search-input');
        
        // Save the search query if sticky search is enabled
        if (this.settings.stickySearch) {
            this.lastSearchQuery = searchInput.value;
        } else {
            // Only clear the input if sticky search is disabled
            searchInput.value = '';
        }
        
        document.getElementById('search-results').innerHTML = '';
    }
    
    performSearch(query) {
        const results = document.getElementById('search-results');
        
        if (!query.trim()) {
            results.innerHTML = '';
            return;
        }
        
        // Simple fuzzy search
        const searchTerms = query.toLowerCase().split(' ');
        const matches = this.searchIndex.filter(item => {
            const searchText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.author} ${item.content}`.toLowerCase();
            return searchTerms.every(term => searchText.includes(term));
        });
        
        if (matches.length === 0) {
            results.innerHTML = '<p class="empty-state">No results found</p>';
            return;
        }
        
        // Render results
        results.innerHTML = matches.slice(0, 10).map(match => `
            <a href="#${match.path}" class="search-result" onclick="notesWiki.onSearchResultClick('${match.path}')">
                <div class="search-result-title">${this.highlightText(match.title, searchTerms)}</div>
                <div class="search-result-path">${match.path}</div>
                ${match.description ? `
                    <div class="search-result-excerpt">
                        ${this.highlightText(match.description, searchTerms)}
                    </div>
                ` : ''}
            </a>
        `).join('');
    }
    
    onSearchResultClick(path) {
        // Save search query if sticky search is enabled
        if (this.settings.stickySearch) {
            this.lastSearchQuery = document.getElementById('search-input').value;
        }
        // Navigate to the note
        window.location.hash = path;
        // Hide search overlay
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
        document.getElementById('settings-modal').style.display = 'flex';
        
        // Update form values
        document.getElementById('track-recent').checked = this.settings.trackRecent;
        document.getElementById('show-line-numbers').checked = this.settings.showLineNumbers;
        document.getElementById('enable-word-wrap').checked = this.settings.enableWordWrap;
        document.getElementById('recent-limit').value = this.settings.recentLimit;
        document.getElementById('content-width').value = this.settings.contentWidth;
        
        // Update auto theme checkbox if it exists
        const autoThemeCheckbox = document.getElementById('auto-theme');
        if (autoThemeCheckbox) {
            autoThemeCheckbox.checked = this.settings.autoTheme;
        }
        
        // Update theme list state based on auto theme setting
        const themeList = document.getElementById('theme-list');
        if (themeList && this.settings.autoTheme) {
            themeList.style.opacity = '0.5';
            themeList.style.pointerEvents = 'none';
        }
    }
    
    hideSettings() {
        document.getElementById('settings-modal').style.display = 'none';
    }
    
    showTagsModal() {
        document.getElementById('tags-modal').style.display = 'flex';
        this.updateTagsUI();
        
        // Focus on search input if it exists
        const searchInput = document.getElementById('tag-search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.value = ''; // Clear any previous search
            this.filterTagsBySearch(''); // Show all tags
        }
    }
    
    hideTagsModal() {
        document.getElementById('tags-modal').style.display = 'none';
        
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
    
    populateThemePicker() {
        const themeList = document.getElementById('theme-list');
        const themeDropdown = document.getElementById('theme-dropdown');
        
        // Store the original theme and preview theme
        this.originalTheme = this.settings.theme;
        this.previewTheme = null;
        
        // Add save button at the top of the dropdown
        const saveSection = document.createElement('div');
        saveSection.className = 'theme-save-section';
        saveSection.innerHTML = `
            <button id="save-theme" class="button button-primary" disabled>
                Save Theme
            </button>
            <button id="cancel-theme" class="button button-secondary">
                Cancel
            </button>
        `;
        
        // Insert save section at the beginning of dropdown content
        const dropdownContent = themeDropdown.querySelector('.dropdown-content');
        const existingHeader = dropdownContent.querySelector('h3');
        if (existingHeader) {
            existingHeader.insertAdjacentElement('afterend', saveSection);
        } else {
            dropdownContent.insertBefore(saveSection, dropdownContent.firstChild);
        }
        
        // Handle save button
        document.getElementById('save-theme').addEventListener('click', () => {
            if (this.previewTheme) {
                this.settings.theme = this.previewTheme;
                this.originalTheme = this.previewTheme;
                this.saveSettings();
                
                // Close dropdown
                themeDropdown.classList.remove('active');
                
                // Show success toast
                this.showToast('Theme saved successfully!');
            }
        });
        
        // Handle cancel button
        document.getElementById('cancel-theme').addEventListener('click', () => {
            // Restore original theme
            this.applyTheme(this.originalTheme);
            this.previewTheme = null;
            
            // Reset UI state
            document.getElementById('save-theme').disabled = true;
            themeList.querySelectorAll('.theme-item').forEach(item => {
                item.classList.remove('previewing');
                if (item.dataset.themeId === this.originalTheme) {
                    item.classList.add('active');
                }
            });
            
            // Close dropdown
            themeDropdown.classList.remove('active');
        });
        
        this.themes.forEach(theme => {
            const item = document.createElement('div');
            item.className = 'theme-item';
            item.dataset.themeId = theme.id;
            
            if (theme.id === this.settings.theme) {
                item.classList.add('active');
            }
            
            // Create a more accurate theme preview based on actual theme colors
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
            
            // Click to preview theme
            item.addEventListener('click', () => {
                // Apply theme preview
                this.applyTheme(theme.id);
                this.previewTheme = theme.id;
                
                // Enable save button
                document.getElementById('save-theme').disabled = false;
                
                // Update visual state
                themeList.querySelectorAll('.theme-item').forEach(i => {
                    i.classList.remove('previewing');
                    i.classList.remove('active');
                });
                item.classList.add('previewing');
                
                // Show which theme is being previewed
                if (theme.id === this.originalTheme) {
                    item.classList.add('active');
                }
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
            }
        };
        
        return themeColors[themeId] || themeColors['light'];
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
        
        // Filter recent files by active context
        const filteredRecent = this.activeContext 
            ? this.recentFiles.filter(file => file.context === this.activeContext)
            : this.recentFiles;
        
        if (filteredRecent.length === 0) {
            list.innerHTML = '<li class="empty-state">No recent files</li>';
            count.style.display = 'none';
        } else {
            count.textContent = filteredRecent.length;
            count.style.display = 'flex';
            
            list.innerHTML = filteredRecent.map(file => `
                <li class="recent-file-item">
                    <a href="#${file.path}" class="recent-file-link">
                        <div class="recent-file-title">${this.escapeHtml(file.title)}</div>
                        <div class="recent-file-path">${file.path}</div>
                        <div class="recent-file-time">${this.formatRelativeTime(file.lastViewed)}</div>
                    </a>
                </li>
            `).join('');
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
}

// Initialize the application
const notesWiki = new NotesWiki();