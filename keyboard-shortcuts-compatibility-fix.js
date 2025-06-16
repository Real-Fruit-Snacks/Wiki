// Browser-Compatible Keyboard Shortcuts Implementation
// This addresses the browser compatibility issues with system shortcuts

class BrowserCompatibleShortcuts {
    constructor(notesWiki) {
        this.app = notesWiki;
        this.conflictingShortcuts = new Set(['Ctrl+W', 'Ctrl+T', 'Ctrl+1', 'Ctrl+2', 'Ctrl+3', 'Ctrl+4', 'Ctrl+5', 'Ctrl+6', 'Ctrl+7', 'Ctrl+8', 'Ctrl+9']);
        this.alternativeShortcuts = {
            'Ctrl+W': 'Alt+W',           // Close tab
            'Ctrl+T': 'Alt+T',           // New tab  
            'Ctrl+1': 'Alt+1',           // Switch to tab 1
            'Ctrl+2': 'Alt+2',           // Switch to tab 2
            'Ctrl+3': 'Alt+3',           // Switch to tab 3
            'Ctrl+4': 'Alt+4',           // Switch to tab 4
            'Ctrl+5': 'Alt+5',           // Switch to tab 5
            'Ctrl+6': 'Alt+6',           // Switch to tab 6
            'Ctrl+7': 'Alt+7',           // Switch to tab 7
            'Ctrl+8': 'Alt+8',           // Switch to tab 8
            'Ctrl+9': 'Alt+9',           // Switch to tab 9
        };
        this.detectedConflicts = new Set();
    }

    // Test if a shortcut can be prevented
    testShortcutPrevention(keyCombo) {
        return new Promise((resolve) => {
            let prevented = false;
            
            const testHandler = (e) => {
                if (this.app.getKeyCombo(e) === keyCombo) {
                    e.preventDefault();
                    prevented = true;
                    document.removeEventListener('keydown', testHandler);
                    // Wait a frame to see if browser still handled it
                    setTimeout(() => resolve(prevented), 10);
                }
            };
            
            document.addEventListener('keydown', testHandler);
            
            // Timeout after 100ms
            setTimeout(() => {
                document.removeEventListener('keydown', testHandler);
                resolve(false);
            }, 100);
        });
    }

    // Enhanced keyboard handler with conflict detection
    createCompatibleKeyboardHandler() {
        return (e) => {
            const isTyping = e.target.matches('input, textarea, [contenteditable="true"]');
            const pressedCombo = this.app.getKeyCombo(e);
            
            if (e.key === 'Escape') {
                this.app.closeAllDropdowns();
                this.app.hideSearch();
                this.app.hideSettings();
                this.app.hideTagsModal();
                this.app.hideShortcutsCheatsheet();
                return;
            }
            
            if (!isTyping) {
                // Handle shortcuts that are unlikely to conflict first
                if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    e.preventDefault();
                    this.app.showShortcutsCheatsheet();
                    return;
                }
                
                if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    e.preventDefault();
                    this.app.toggleFocusMode();
                    return;
                }

                // Try original shortcuts first, with fallback to alternatives
                if (this.handleTabManagement(e, pressedCombo)) return;
                if (this.handleOtherShortcuts(e, pressedCombo)) return;
            }
        };
    }

    handleTabManagement(e, pressedCombo) {
        // Try primary shortcuts first
        if (pressedCombo === 'Ctrl+W' || pressedCombo === 'Cmd+W') {
            if (this.tryPreventDefault(e, pressedCombo)) {
                this.app.closeCurrentTab();
                return true;
            }
        }
        
        // Try alternative shortcuts
        if (pressedCombo === 'Alt+W') {
            e.preventDefault();
            this.app.closeCurrentTab();
            this.showAlternativeShortcutMessage('Ctrl+W', 'Alt+W', 'close tab');
            return true;
        }
        
        // Tab switching - try primary first
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
            if (this.tryPreventDefault(e, pressedCombo)) {
                const tabIndex = parseInt(e.key) - 1;
                this.app.switchToTabByIndex(tabIndex);
                return true;
            }
        }
        
        // Try alternative tab switching
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            this.app.switchToTabByIndex(tabIndex);
            this.showAlternativeShortcutMessage(`Ctrl+${e.key}`, `Alt+${e.key}`, `switch to tab ${e.key}`);
            return true;
        }
        
        // Tab navigation
        if (pressedCombo === 'Ctrl+PageUp' || pressedCombo === 'Cmd+PageUp') {
            if (this.tryPreventDefault(e, pressedCombo)) {
                this.app.switchToPreviousTab();
                return true;
            }
        }
        
        if (pressedCombo === 'Ctrl+PageDown' || pressedCombo === 'Cmd+PageDown') {
            if (this.tryPreventDefault(e, pressedCombo)) {
                this.app.switchToNextTab();
                return true;
            }
        }
        
        // Alternative tab navigation
        if (pressedCombo === 'Alt+PageUp') {
            e.preventDefault();
            this.app.switchToPreviousTab();
            this.showAlternativeShortcutMessage('Ctrl+PageUp', 'Alt+PageUp', 'previous tab');
            return true;
        }
        
        if (pressedCombo === 'Alt+PageDown') {
            e.preventDefault();
            this.app.switchToNextTab();
            this.showAlternativeShortcutMessage('Ctrl+PageDown', 'Alt+PageDown', 'next tab');
            return true;
        }
        
        return false;
    }

    handleOtherShortcuts(e, pressedCombo) {
        // Ctrl+F with conflict detection
        if (pressedCombo === 'Ctrl+F' || pressedCombo === 'Cmd+F') {
            const hasOpenModal = document.querySelector('.settings-modal.active, .tags-modal.active, .shortcuts-modal.active');
            if (hasOpenModal) return false;
            
            if (this.tryPreventDefault(e, pressedCombo)) {
                if (this.app.currentNote) {
                    this.app.showNoteSearch();
                } else {
                    this.app.showTagsModal();
                }
                return true;
            } else {
                // Fallback: show a message that Ctrl+F opened browser find
                this.showBrowserConflictMessage('Ctrl+F', 'Use the search button or press Ctrl+K instead');
                return false;
            }
        }
        
        // Handle other configurable shortcuts
        for (const [action, shortcut] of Object.entries(this.app.settings.keyboardShortcuts)) {
            if (pressedCombo === shortcut) {
                if (this.tryPreventDefault(e, pressedCombo)) {
                    this.executeShortcutAction(action);
                    return true;
                }
            }
        }
        
        return false;
    }

    tryPreventDefault(e, combo) {
        try {
            e.preventDefault();
            
            // Track conflicts for user feedback
            if (this.conflictingShortcuts.has(combo)) {
                this.detectConflict(combo);
            }
            
            return true;
        } catch (error) {
            console.warn(`Could not prevent default for ${combo}:`, error);
            return false;
        }
    }

    detectConflict(combo) {
        if (!this.detectedConflicts.has(combo)) {
            this.detectedConflicts.add(combo);
            console.warn(`Browser shortcut conflict detected: ${combo}`);
            // Could show user notification here
        }
    }

    executeShortcutAction(action) {
        switch(action) {
            case 'new-tab':
                this.app.createNewTab();
                break;
            case 'search':
                this.app.closeAllDropdowns();
                this.app.showSearch();
                break;
            case 'settings':
                this.app.showSettings();
                break;
            case 'filter':
                this.app.showTagsModal();
                break;
            case 'bookmark':
                this.app.bookmarkCurrentNote();
                break;
        }
    }

    showAlternativeShortcutMessage(original, alternative, action) {
        // Show a subtle notification that alternative shortcut was used
        this.app.showToast(`Using ${alternative} to ${action} (${original} conflicts with browser)`);
    }

    showBrowserConflictMessage(shortcut, suggestion) {
        this.app.showToast(`${shortcut} opened browser function. ${suggestion}`);
    }

    // Update shortcuts modal to show alternative shortcuts
    updateShortcutsDisplay() {
        const shortcuts = [
            { element: 'shortcut-new-tab', primary: 'Ctrl+T', alternative: 'Alt+T' },
            { element: 'shortcut-close-tab', primary: 'Ctrl+W', alternative: 'Alt+W' },
            { element: 'shortcut-tab-1', primary: 'Ctrl+1', alternative: 'Alt+1' },
            // ... etc
        ];

        shortcuts.forEach(shortcut => {
            const element = document.getElementById(shortcut.element);
            if (element) {
                if (this.detectedConflicts.has(shortcut.primary)) {
                    element.innerHTML = `<span class="shortcut-conflict">${shortcut.primary}</span> or <span class="shortcut-alternative">${shortcut.alternative}</span>`;
                } else {
                    element.textContent = shortcut.primary;
                }
            }
        });
    }
}

// Usage: Replace the existing keyboard handler
// const compatibilityLayer = new BrowserCompatibleShortcuts(notesWiki);
// notesWiki.keyboardHandler = compatibilityLayer.createCompatibleKeyboardHandler();