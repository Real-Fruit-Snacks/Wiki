# Release Notes - v2.4.0

## 🎉 Notes Wiki v2.4.0 - Productivity Update

### 📦 Download

**[📥 Download Offline Package](https://github.com/yourusername/notes-wiki/releases/download/v2.4.0/notes-wiki-v2.4.0.tar.gz)** (272 KB)

### ✨ New Features

#### 📌 Enhanced Recent Files
- **Pin/Unpin Files**: Keep frequently used notes at the top of your recent files list
- **Grouped Display**: Files organized by context with collapsible sections
- **Quick Actions Menu**: Hover over files to access pin/unpin and remove actions
- **Persistent Pins**: Pinned files stay at the top across sessions
- **Visual Organization**: Context badges for better file identification

#### ⌨️ Keyboard Shortcuts Cheatsheet
- **Press `?` Key**: Opens comprehensive shortcuts reference modal
- **6 Categories**: Navigation, Tab Management, Search, Content, Mouse, and Timer controls
- **Live Bindings**: Shows your current custom key configurations
- **Interactive Design**: Clean, organized layout with visual grouping

#### 🍅 Pomodoro Timer Mode
- **Work/Break Sessions**: Default 25-minute work sessions with 5/15-minute breaks
- **Automatic Progression**: Seamlessly switch between work and break modes
- **Visual Indicators**: Progress bars and mode text (Work/Short Break/Long Break)
- **Sound Notifications**: Audio alerts when sessions complete
- **Fully Customizable**: Adjust all durations and behaviors in settings
- **Smart Sessions**: Tracks sessions before long break (default: 4)

### 🐛 Bug Fixes
- Fixed timer pause icon not rendering correctly
- Removed redundant timer settings button
- Fixed timer layout issues when Pomodoro mode is enabled
- Improved number input styling to match theme colors
- Fixed spacing in keyboard shortcuts settings
- Changed text colors to black for better contrast on accent backgrounds
- Removed search dropdown/datalist functionality per user feedback

### 🎨 UI/UX Improvements
- Timer mode indicator now appears below timer for better layout
- Number inputs in settings now have theme-aware styling
- Improved contrast for file tree active states and tag counts
- Better spacing in keyboard shortcuts configuration
- Removed tomato emoji from Pomodoro settings for cleaner interface

### 📊 Release Statistics
- **Compressed Size**: 272 KB
- **Uncompressed Size**: 1.3 MB  
- **Total Files**: 85
- **Themes**: 50 professional themes
- **Sample Notes**: 18 examples
- **Dependencies**: None (all bundled)

### 🚀 Quick Start

```bash
# Extract the archive
tar -xzf notes-wiki-v2.4.0.tar.gz
cd notes-wiki-v2.4.0

# Start local server
python3 -m http.server 8000

# Open in browser
http://localhost:8000
```

### 💡 Productivity Tips

1. **Pin Important Files**: Hover over recent files and click the pin icon
2. **Learn Shortcuts**: Press `?` anytime to see all keyboard shortcuts
3. **Try Pomodoro**: Enable in Settings > Pomodoro Timer for focused work sessions
4. **Customize Shortcuts**: Go to Settings > Advanced to change key bindings

### 🔧 Technical Details

#### New localStorage Keys
- `notesWiki_recentFiles`: Enhanced structure with pinning support
- `notesWiki_preferences.pomodoroEnabled`: Pomodoro mode toggle
- `notesWiki_preferences.pomodoroWorkMinutes`: Work duration
- `notesWiki_preferences.pomodoroShortBreakMinutes`: Short break duration
- `notesWiki_preferences.pomodoroLongBreakMinutes`: Long break duration
- `notesWiki_preferences.pomodoroSessionsBeforeLongBreak`: Sessions count
- `notesWiki_preferences.pomodoroAutoStart`: Auto-start toggle
- `notesWiki_preferences.pomodoroPlaySounds`: Sound notifications toggle

### 📝 Changelog Summary

**Added**
- Recent files pinning and grouping functionality
- Keyboard shortcuts cheatsheet modal (? key)
- Full Pomodoro timer implementation
- Theme-aware number input styling
- Quick actions menu for recent files

**Fixed**
- Timer pause icon rendering issue
- Timer layout with Pomodoro mode
- Text contrast on accent backgrounds
- Keyboard shortcuts settings spacing

**Removed**
- Search dropdown/datalist feature
- Redundant timer settings button
- Tomato emoji from Pomodoro UI

### 🙏 Acknowledgments

Thanks to all users who provided feedback and feature requests. Special thanks for the detailed bug reports that helped improve the timer functionality and UI consistency.

### 📄 License

MIT License - Free for personal and commercial use.

---

**Enjoy the productivity boost!** 🚀

*For detailed documentation, see README.md in the package.*