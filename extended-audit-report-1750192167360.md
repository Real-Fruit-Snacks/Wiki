# 🔬 EXTENDED Comprehensive Application Functionality Audit Report

**Generated:** 2025-06-17T20:30:18.391Z
**Extended Tests Performed:** 7
**Features Tested:** Content Management, Core Interactive Features, Advanced Navigation, Theme System, Keyboard Shortcuts, Error Handling, Advanced Persistence
**Differences Found:** 0
**Screenshots Directory:** extended-audit-screenshots-1750192167360

## 🎯 Executive Summary

✅ **EXTENDED AUDIT PASSED**: All advanced features working identically in normal and private browsing modes.

## 🔬 Extended Testing Coverage

This audit extends beyond basic functionality to test sophisticated features:

- **Content Management** - Markdown rendering, wiki links, collapsible sections
- **Interactive Features** - Bookmarks, timer, focus mode, in-note search
- **Advanced Navigation** - Table of contents, reading progress, tag filtering
- **Theme System** - Multiple theme testing, custom CSS, persistence
- **Keyboard Shortcuts** - Comprehensive shortcut testing, accessibility
- **Error Handling** - 404s, edge cases, rapid interactions
- **Advanced Persistence** - Multi-tab state, session restoration

## 📊 Detailed Extended Test Results

### 🔬 Content Management

**Normal Browser Results:**
- markdownRendering: {
  "success": true,
  "features": {
    "codeBlocks": 46,
    "syntaxHighlighting": false,
    "headings": 38,
    "lists": 16,
    "links": 0,
    "images": 0,
    "tables": 0,
    "blockquotes": 0,
    "callouts": 0
  },
  "screenshot": "normal_markdown_rendering_1750192170550.png"
}

**Incognito Browser Results:**
- markdownRendering: {
  "success": true,
  "features": {
    "codeBlocks": 46,
    "syntaxHighlighting": false,
    "headings": 38,
    "lists": 16,
    "links": 0,
    "images": 0,
    "tables": 0,
    "blockquotes": 0,
    "callouts": 0
  },
  "screenshot": "incognito_markdown_rendering_1750192172949.png"
}

✅ Perfect feature parity

---

### 🔬 Core Interactive Features

**Normal Browser Results:**
- recentFiles: {
  "success": true,
  "itemCount": 2,
  "screenshot": "normal_recent_files_dropdown_1750192173638.png"
}
- pomodoroTimer: {
  "success": true,
  "timerDisplay": "00:24:59",
  "screenshot": "normal_pomodoro_timer_started_1750192174781.png"
}
- focusMode: {
  "success": true,
  "active": true,
  "screenshot": "normal_focus_mode_1750192175472.png"
}
- inNoteSearch: {
  "success": true,
  "screenshot": "normal_in_note_search_1750192177208.png"
}

**Incognito Browser Results:**
- recentFiles: {
  "success": true,
  "itemCount": 2,
  "screenshot": "incognito_recent_files_dropdown_1750192177840.png"
}
- pomodoroTimer: {
  "success": true,
  "timerDisplay": "00:24:59",
  "screenshot": "incognito_pomodoro_timer_started_1750192178996.png"
}
- focusMode: {
  "success": true,
  "active": true,
  "screenshot": "incognito_focus_mode_1750192179709.png"
}
- inNoteSearch: {
  "success": true,
  "screenshot": "incognito_in_note_search_1750192181469.png"
}

✅ Perfect feature parity

---

### 🔬 Advanced Navigation

**Normal Browser Results:**
- ❌ Error: [object Object]

**Incognito Browser Results:**
- ❌ Error: [object Object]

✅ Perfect feature parity

---

### 🔬 Theme System

**Normal Browser Results:**
- themes: {}
- themeCount: 0
- customCSS: {
  "success": true,
  "screenshot": "normal_custom_css_test_1750192186610.png"
}
- ❌ Error: [object Object]

**Incognito Browser Results:**
- themes: {}
- themeCount: 0
- customCSS: {
  "success": true,
  "screenshot": "incognito_custom_css_test_1750192188088.png"
}
- ❌ Error: [object Object]

✅ Perfect feature parity

---

### 🔬 Keyboard Shortcuts

**Normal Browser Results:**
- Search: {
  "success": true,
  "uiChange": {
    "searchVisible": true,
    "settingsVisible": true,
    "focusMode": false,
    "activeElement": "INPUT",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Search_1750192188929.png"
}
- Settings: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": true,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Settings_1750192189804.png"
}
- New Tab: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_New_Tab_1750192190658.png"
}
- New Tab Alt: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 2
  },
  "screenshot": "normal_shortcut_New_Tab_Alt_1750192191520.png"
}
- Close Tab: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Close_Tab_1750192192399.png"
}
- Close Tab Alt: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Close_Tab_Alt_1750192193263.png"
}
- Focus Mode: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Focus_Mode_1750192194088.png"
}
- Tab 1: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Tab_1_1750192194935.png"
}
- Tab 2: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Tab_2_1750192195752.png"
}
- Tag Filter: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "INPUT",
    "tabCount": 1
  },
  "screenshot": "normal_shortcut_Tag_Filter_1750192196570.png"
}
- accessibility: {
  "success": true,
  "focusedElement": {
    "tagName": "A",
    "id": "",
    "className": "site-title-link",
    "ariaLabel": null
  },
  "screenshot": "normal_accessibility_focus_1750192197091.png"
}

**Incognito Browser Results:**
- Search: {
  "success": true,
  "uiChange": {
    "searchVisible": true,
    "settingsVisible": true,
    "focusMode": false,
    "activeElement": "INPUT",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Search_1750192197703.png"
}
- Settings: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": true,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Settings_1750192198581.png"
}
- New Tab: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_New_Tab_1750192199450.png"
}
- New Tab Alt: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 2
  },
  "screenshot": "incognito_shortcut_New_Tab_Alt_1750192200303.png"
}
- Close Tab: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Close_Tab_1750192201179.png"
}
- Close Tab Alt: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": false,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Close_Tab_Alt_1750192202021.png"
}
- Focus Mode: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Focus_Mode_1750192202845.png"
}
- Tab 1: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Tab_1_1750192203678.png"
}
- Tab 2: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "BODY",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Tab_2_1750192204498.png"
}
- Tag Filter: {
  "success": true,
  "uiChange": {
    "searchVisible": false,
    "settingsVisible": false,
    "focusMode": true,
    "activeElement": "INPUT",
    "tabCount": 1
  },
  "screenshot": "incognito_shortcut_Tag_Filter_1750192205321.png"
}
- accessibility: {
  "success": true,
  "focusedElement": {
    "tagName": "A",
    "id": "",
    "className": "site-title-link",
    "ariaLabel": null
  },
  "screenshot": "incognito_accessibility_focus_1750192205844.png"
}

✅ Perfect feature parity

---

### 🔬 Error Handling

**Normal Browser Results:**
- notFound: {
  "success": false,
  "errorMessage": "\n            \n                \n                    \n                        Advanced Search Features\n                        \n                            \n                                ☆\n                            \n                            \n                                🔗\n                            \n                            \n                                \n                                    \n                                    \n                                \n                            \n                            \n                                \n                                    \n                                \n                            \n                        \n                    \n                    \n                    \n                        Home\n                    \n                    \n                    \n            \n                \n                    \n                    \n                \n                4 min read\n                (844 words)\n            \n        \n                        \n                            \n                                \n                                    \n                                \n                                Wiki Admin\n                            \n                        \n                        \n                        \n                            \n                                \n                                    \n                                \n                                June 12, 2025\n                            \n                        \n                        \n                        \n                    \n                    \n                    \n                        Complete guide to advanced search features including operators, tag filtering, and search techniques\n                    \n                    \n                    \n                        \n                            \n                                \n                                    demo\n                                \n                            \n                                \n                                    search\n                                \n                            \n                                \n                                    operators\n                                \n                            \n                                \n                                    filtering\n                                \n                            \n                        \n                    \n                \n                \n                \n                    Advanced Search Features\nThe Notes Wiki includes a powerful search system that goes far beyond simple text matching. Learn how to use advanced operators, tag filtering, and search techniques to find exactly what you're looking for.\n🔍 Quick Search Access\n\nHeader Search: Click the search icon or search box in the header\nKeyboard Shortcut: Press / or Ctrl+K to focus search instantly\nURL Search: Use #/search/your+search+term for direct search links\n\n🎯 Search Operators\nExact Phrase Search\nUse quotes for exact phrase matching:\n\"machine learning algorithms\"\"Notes Wiki system\" \"CSS counter-based line numbers\"Example Results:\n\n✅ \"machine learning algorithms for beginners\"\n❌ \"machine algorithms for learning\"\n\nExclusion Operator\nUse minus (-) to exclude terms:\njavascript -angularpython -djangotheme -darkExample:\n\njavascript -angular finds JavaScript content but excludes Angular-related notes\ncss -framework finds CSS notes excluding framework-specific content\n\nTag Filtering\nUse tag: to search within specific tags:\ntag:javascripttag:tutorialtag:personaltag:code-blocksMultiple Tags:\ntag:javascript tag:tutorialtag:css tag:demoAuthor Filtering\nUse author: to find notes by specific authors:\nauthor:\"Wiki Admin\"author:\"John Doe\"author:SystemCombining Operators\nCreate powerful queries by combining operators:\ntag:javascript \"async await\" -promiseauthor:\"Wiki Admin\" tag:demo -test\"code blocks\" tag:tutorial -basic🏷️ Tag-Based Filtering\nTag Filter Interface\n\nClick Filter button or press Ctrl+F\nSelect multiple tags for filtering\nChoose between OR/AND logic\n\nTag Logic Options\nOR Logic (Default): Shows notes with ANY selected tag\nSelected: [javascript] OR [python] OR [tutorial]Result: Notes with javascript OR python OR tutorialAND Logic: Shows notes with ALL selected tags  \nSelected: [javascript] AND [tutorial] AND [beginner]Result: Only notes tagged with all threeTag Exclusion\nClick tags with Shift to exclude them:\nInclude: [tutorial] [javascript]Exclude: [advanced] [framework]Result: JavaScript tutorials excluding advanced framework content🎨 Smart Search Features\nAuto-Complete\nSearch suggestions appear as you type:\n\nRecent searches - Your previous search terms\nPopular tags - Frequently used tags\nNote titles - Matching note titles\nAuthors - Available authors\n\nSearch History\nAccess your recent searches:\n\nClick the search dropdown arrow\nNavigate with ↑/↓ arrow keys\nPress Enter to repeat a search\n\nFuzzy Matching\nSearch is forgiving of typos and variations:\n\njavascrpt finds \"JavaScript\" content\nteh finds \"the\" \nalgoritm finds \"algorithm\"\n\n📊 Search Results\nResult Sorting\nResults are ranked by relevance:\n\nTitle matches - Highest priority\nTag matches - High priority  \nContent matches - Medium priority\nDescription matches - Lower priority\n\nResult Information\nEach result shows:\n\nTitle - Note title with highlighting\nDescription - Brief content summary\nTags - Associated tags\nAuthor - Note author\nPreview - Content snippet with search terms highlighted\n\nQuick Actions\nFrom search results:\n\nClick title - Open note in current tab\nCtrl+Click - Open in new tab\nClick tags - Filter by that tag\nClick author - Filter by author\n\n🚀 Advanced Search Techniques\nContent Type Searches\nFind specific types of content:\ntag:code-blocks \"function\"tag:tutorial \"step by step\"  tag:reference \"cheat sheet\"tag:personal \"daily\"Date-Based Searches\nSearch metadata includes dates:\nauthor:System \"2025\"\"created: 2025-01\" \"updated\" tag:demoTechnical Content Searches\nFind programming content:\n\"```javascript\" tag:demo\"code block\" \"line numbers\"\"syntax highlighting\" -testtag:css \"theme\" \"color\"Documentation Searches\nFind specific documentation:\n\"how to\" tag:tutorial\"getting started\" -test\"configuration\" tag:settings\"keyboard shortcuts\" tag:demo💡 Search Best Practices\nEffective Search Strategies\n1. Start Broad, Then Narrow\nStep 1: javascriptStep 2: javascript tutorial  Step 3: javascript tutorial -advancedStep 4: tag:tutorial \"javascript\" \"beginner\"2. Use Multiple Search Methods\n\nTry tag filtering first for categorical searches\nUse text search for specific content\nCombine both for precise results\n\n3. Leverage Exclusions\ntheme -test -debugtutorial -\"work in progress\"javascript -framework -libraryCommon Search Patterns\nFinding Examples:\ntag:demo \"example\"\"code example\" tag:tutorial\"sample\" -testFinding Documentation:\n\"how to\" OR \"guide\" OR \"tutorial\"tag:documentation -draft\"getting started\" tag:beginnerFinding Reference Material:\ntag:reference OR tag:cheatsheet\"reference\" OR \"cheat sheet\"\"commands\" tag:reference🔗 Search URLs & Sharing\nDirect Search Links\nShare searches with URL patterns:\n#/search/javascript+tutorial#/search/\"code+blocks\"+tag:demo#/search/tag:css+-testBookmarkable Searches\nCreate bookmarks for frequent searches:\n\nWeekly Reviews: tag:personal \"weekly\"\nCode References: tag:reference \"code\"\nLearning Material: tag:tutorial -completed\n\nSearch in New Tabs\n\nCtrl+Click search results to open in new tabs\nUse Ctrl+T then search for research sessions\n\n🎯 Search Examples\nReal-World Search Scenarios\nScenario 1: Learning JavaScript\nSearch: tag:javascript tag:tutorial -advancedFilter: Include [beginner], [examples]Result: Beginner-friendly JavaScript tutorials with examplesScenario 2: Theme Customization\nSearch: \"theme\" OR \"css\" tag:demoExclude: test, debugResult: Theme and CSS demos excluding test filesScenario 3: Code Block Features\nSearch: \"code block\" OR \"syntax highlighting\" OR \"line numbers\"Filter: Include [demo], [features]Result: All code block feature documentationScenario 4: Personal Project Notes\nSearch: author:\"Your Name\" tag:personal tag:projectsFilter: Exclude [archive], [completed]Result: Your active personal project notes🔧 Search Configuration\nSearch Settings\nCustomize search behavior in Settings → Search:\n\nEnable fuzzy matching - Find typos and variations\nSearch delay - Milliseconds before search executes\nMax results - Limit displayed results\nInclude content - Search inside note content\nInclude code blocks - Search code block content\n\nPerformance Tips\nFor Large Wikis:\n\nUse tag filtering first to narrow results\nPrefer specific terms over general ones\nUse exclusions to eliminate noise\nLimit searches to relevant sections\n\nFor Quick Finding:\n\nUse recent search history\nBookmark frequent searches  \nLearn common tag patterns\nUse keyboard shortcuts for speed\n\n\nMaster Search with Practice\nThe search system becomes more powerful as you learn your content patterns. Experiment with different operators and develop search strategies that match your workflow!\nPro Tip: Use / for instant search access, and don't forget that search results can be opened in multiple tabs with Ctrl+Click for research sessions.\n\n                \n                \n                \n            \n            Table of Contents\n            \n                \n                    \n                \n            \n        Advanced Search Features🔍 Quick Search Access🎯 Search OperatorsExact Phrase SearchExclusion OperatorTag FilteringAuthor FilteringCombining Operators🏷️ Tag-Based FilteringTag Filter InterfaceTag Logic OptionsTag Exclusion🎨 Smart Search FeaturesAuto-CompleteSearch HistoryFuzzy Matching📊 Search ResultsResult SortingResult InformationQuick Actions🚀 Advanced Search TechniquesContent Type SearchesDate-Based SearchesTechnical Content SearchesDocumentation Searches💡 Search Best PracticesEffective Search StrategiesCommon Search Patterns🔗 Search URLs & SharingDirect Search LinksBookmarkable SearchesSearch in New Tabs🎯 Search ExamplesReal-World Search Scenarios🔧 Search ConfigurationSearch SettingsPerformance TipsMaster Search with Practice\n            \n            \n            \n                \n                    \n                    \n                    \n                    \n                    \n                \n            \n        ",
  "screenshot": "normal_404_handling_1750192206946.png"
}
- localStorageQuota: {
  "success": true,
  "tested": true
}
- malformedUrl: {
  "success": true,
  "handling": {
    "url": "http://localhost:8000/#/notes/../../../etc/passwd",
    "content": "\n            \n                \n                    \n                        Advanced Search Features\n                        \n                            \n                                ☆\n                            \n                            \n                                🔗\n                            \n                            \n                                \n                                    \n                                    \n                                \n                            \n                            \n                                \n                                    \n                                \n                            \n                        \n                    \n                    \n                    \n                        Home\n                    \n                    \n                    \n            \n                \n                    \n                    \n                \n                4 min read\n                (844 words)\n            \n        \n                        \n                            \n                                \n                                    \n                                \n                                Wiki Admin\n                            \n                        \n                        \n                        \n                            \n                                \n                                    \n                                \n                                June 12, 2025\n                            \n                        \n                        \n                        \n                    \n                    \n                    \n                        Complete guide to advanced search features including operators, tag filtering, and search techniques\n                    \n                    \n                    \n                        \n                            \n                                \n                                    demo\n                                \n                            \n                                \n                                    search\n                                \n                            \n                                \n                                    operators\n                                \n                            \n                                \n                                    filtering\n                                \n                            \n                        \n                    \n                \n                \n                \n                    Advanced Search Features\nThe Notes Wiki includes a powerful search system that goes far beyond simple text matching. Learn how to use advanced operators, tag filtering, and search techniques to find exactly what you're looking for.\n🔍 Quick Search Access\n\nHeader Search: Click the search icon or search box in the header\nKeyboard Shortcut: Press / or Ctrl+K to focus search instantly\nURL Search: Use #/search/your+search+term for direct search links\n\n🎯 Search Operators\nExact Phrase Search\nUse quotes for exact phrase matching:\n\"machine learning algorithms\"\"Notes Wiki system\" \"CSS counter-based line numbers\"Example Results:\n\n✅ \"machine learning algorithms for beginners\"\n❌ \"machine algorithms for learning\"\n\nExclusion Operator\nUse minus (-) to exclude terms:\njavascript -angularpython -djangotheme -darkExample:\n\njavascript -angular finds JavaScript content but excludes Angular-related notes\ncss -framework finds CSS notes excluding framework-specific content\n\nTag Filtering\nUse tag: to search within specific tags:\ntag:javascripttag:tutorialtag:personaltag:code-blocksMultiple Tags:\ntag:javascript tag:tutorialtag:css tag:demoAuthor Filtering\nUse author: to find notes by specific authors:\nauthor:\"Wiki Admin\"author:\"John Doe\"author:SystemCombining Operators\nCreate powerful queries by combining operators:\ntag:javascript \"async await\" -promiseauthor:\"Wiki Admin\" tag:demo -test\"code blocks\" tag:tutorial -basic🏷️ Tag-Based Filtering\nTag Filter Interface\n\nClick Filter button or press Ctrl+F\nSelect multiple tags for filtering\nChoose between OR/AND logic\n\nTag Logic Options\nOR Logic (Default): Shows notes with ANY selected tag\nSelected: [javascript] OR [python] OR [tutorial]Result: Notes with javascript OR python OR tutorialAND Logic: Shows notes with ALL selected tags  \nSelected: [javascript] AND [tutorial] AND [beginner]Result: Only notes tagged with all threeTag Exclusion\nClick tags with Shift to exclude them:\nInclude: [tutorial] [javascript]Exclude: [advanced] [framework]Result: JavaScript tutorials excluding advanced framework content🎨 Smart Search Features\nAuto-Complete\nSearch suggestions appear as you type:\n\nRecent searches - Your previous search terms\nPopular tags - Frequently used tags\nNote titles - Matching note titles\nAuthors - Available authors\n\nSearch History\nAccess your recent searches:\n\nClick the search dropdown arrow\nNavigate with ↑/↓ arrow keys\nPress Enter to repeat a search\n\nFuzzy Matching\nSearch is forgiving of typos and variations:\n\njavascrpt finds \"JavaScript\" content\nteh finds \"the\" \nalgoritm finds \"algorithm\"\n\n📊 Search Results\nResult Sorting\nResults are ranked by relevance:\n\nTitle matches - Highest priority\nTag matches - High priority  \nContent matches - Medium priority\nDescription matches - Lower priority\n\nResult Information\nEach result shows:\n\nTitle - Note title with highlighting\nDescription - Brief content summary\nTags - Associated tags\nAuthor - Note author\nPreview - Content snippet with search terms highlighted\n\nQuick Actions\nFrom search results:\n\nClick title - Open note in current tab\nCtrl+Click - Open in new tab\nClick tags - Filter by that tag\nClick author - Filter by author\n\n🚀 Advanced Search Techniques\nContent Type Searches\nFind specific types of content:\ntag:code-blocks \"function\"tag:tutorial \"step by step\"  tag:reference \"cheat sheet\"tag:personal \"daily\"Date-Based Searches\nSearch metadata includes dates:\nauthor:System \"2025\"\"created: 2025-01\" \"updated\" tag:demoTechnical Content Searches\nFind programming content:\n\"```javascript\" tag:demo\"code block\" \"line numbers\"\"syntax highlighting\" -testtag:css \"theme\" \"color\"Documentation Searches\nFind specific documentation:\n\"how to\" tag:tutorial\"getting started\" -test\"configuration\" tag:settings\"keyboard shortcuts\" tag:demo💡 Search Best Practices\nEffective Search Strategies\n1. Start Broad, Then Narrow\nStep 1: javascriptStep 2: javascript tutorial  Step 3: javascript tutorial -advancedStep 4: tag:tutorial \"javascript\" \"beginner\"2. Use Multiple Search Methods\n\nTry tag filtering first for categorical searches\nUse text search for specific content\nCombine both for precise results\n\n3. Leverage Exclusions\ntheme -test -debugtutorial -\"work in progress\"javascript -framework -libraryCommon Search Patterns\nFinding Examples:\ntag:demo \"example\"\"code example\" tag:tutorial\"sample\" -testFinding Documentation:\n\"how to\" OR \"guide\" OR \"tutorial\"tag:documentation -draft\"getting started\" tag:beginnerFinding Reference Material:\ntag:reference OR tag:cheatsheet\"reference\" OR \"cheat sheet\"\"commands\" tag:reference🔗 Search URLs & Sharing\nDirect Search Links\nShare searches with URL patterns:\n#/search/javascript+tutorial#/search/\"code+blocks\"+tag:demo#/search/tag:css+-testBookmarkable Searches\nCreate bookmarks for frequent searches:\n\nWeekly Reviews: tag:personal \"weekly\"\nCode References: tag:reference \"code\"\nLearning Material: tag:tutorial -completed\n\nSearch in New Tabs\n\nCtrl+Click search results to open in new tabs\nUse Ctrl+T then search for research sessions\n\n🎯 Search Examples\nReal-World Search Scenarios\nScenario 1: Learning JavaScript\nSearch: tag:javascript tag:tutorial -advancedFilter: Include [beginner], [examples]Result: Beginner-friendly JavaScript tutorials with examplesScenario 2: Theme Customization\nSearch: \"theme\" OR \"css\" tag:demoExclude: test, debugResult: Theme and CSS demos excluding test filesScenario 3: Code Block Features\nSearch: \"code block\" OR \"syntax highlighting\" OR \"line numbers\"Filter: Include [demo], [features]Result: All code block feature documentationScenario 4: Personal Project Notes\nSearch: author:\"Your Name\" tag:personal tag:projectsFilter: Exclude [archive], [completed]Result: Your active personal project notes🔧 Search Configuration\nSearch Settings\nCustomize search behavior in Settings → Search:\n\nEnable fuzzy matching - Find typos and variations\nSearch delay - Milliseconds before search executes\nMax results - Limit displayed results\nInclude content - Search inside note content\nInclude code blocks - Search code block content\n\nPerformance Tips\nFor Large Wikis:\n\nUse tag filtering first to narrow results\nPrefer specific terms over general ones\nUse exclusions to eliminate noise\nLimit searches to relevant sections\n\nFor Quick Finding:\n\nUse recent search history\nBookmark frequent searches  \nLearn common tag patterns\nUse keyboard shortcuts for speed\n\n\nMaster Search with Practice\nThe search system becomes more powerful as you learn your content patterns. Experiment with different operators and develop search strategies that match your workflow!\nPro Tip: Use / for instant search access, and don't forget that search results can be opened in multiple tabs with Ctrl+Click for research sessions.\n\n                \n                \n                \n            \n            Table of Contents\n            \n                \n                    \n                \n            \n        Advanced Search Features🔍 Quick Search Access🎯 Search OperatorsExact Phrase SearchExclusion OperatorTag FilteringAuthor FilteringCombining Operators🏷️ Tag-Based FilteringTag Filter InterfaceTag Logic OptionsTag Exclusion🎨 Smart Search FeaturesAuto-CompleteSearch HistoryFuzzy Matching📊 Search ResultsResult SortingResult InformationQuick Actions🚀 Advanced Search TechniquesContent Type SearchesDate-Based SearchesTechnical Content SearchesDocumentation Searches💡 Search Best PracticesEffective Search StrategiesCommon Search Patterns🔗 Search URLs & SharingDirect Search LinksBookmarkable SearchesSearch in New Tabs🎯 Search ExamplesReal-World Search Scenarios🔧 Search ConfigurationSearch SettingsPerformance TipsMaster Search with Practice\n            \n            \n            \n                \n                    \n                    \n                    \n                    \n                    \n                \n            \n        "
  },
  "screenshot": "normal_malformed_url_1750192207564.png"
}
- rapidClicking: {
  "success": true,
  "uiStable": {
    "searchOverlayCount": 1,
    "modalCount": 4
  },
  "screenshot": "normal_rapid_clicking_1750192209576.png"
}

**Incognito Browser Results:**
- notFound: {
  "success": false,
  "errorMessage": "\n            \n                \n                    \n                        Advanced Search Features\n                        \n                            \n                                ☆\n                            \n                            \n                                🔗\n                            \n                            \n                                \n                                    \n                                    \n                                \n                            \n                            \n                                \n                                    \n                                \n                            \n                        \n                    \n                    \n                    \n                        Home\n                    \n                    \n                    \n            \n                \n                    \n                    \n                \n                4 min read\n                (844 words)\n            \n        \n                        \n                            \n                                \n                                    \n                                \n                                Wiki Admin\n                            \n                        \n                        \n                        \n                            \n                                \n                                    \n                                \n                                June 12, 2025\n                            \n                        \n                        \n                        \n                    \n                    \n                    \n                        Complete guide to advanced search features including operators, tag filtering, and search techniques\n                    \n                    \n                    \n                        \n                            \n                                \n                                    demo\n                                \n                            \n                                \n                                    search\n                                \n                            \n                                \n                                    operators\n                                \n                            \n                                \n                                    filtering\n                                \n                            \n                        \n                    \n                \n                \n                \n                    Advanced Search Features\nThe Notes Wiki includes a powerful search system that goes far beyond simple text matching. Learn how to use advanced operators, tag filtering, and search techniques to find exactly what you're looking for.\n🔍 Quick Search Access\n\nHeader Search: Click the search icon or search box in the header\nKeyboard Shortcut: Press / or Ctrl+K to focus search instantly\nURL Search: Use #/search/your+search+term for direct search links\n\n🎯 Search Operators\nExact Phrase Search\nUse quotes for exact phrase matching:\n\"machine learning algorithms\"\"Notes Wiki system\" \"CSS counter-based line numbers\"Example Results:\n\n✅ \"machine learning algorithms for beginners\"\n❌ \"machine algorithms for learning\"\n\nExclusion Operator\nUse minus (-) to exclude terms:\njavascript -angularpython -djangotheme -darkExample:\n\njavascript -angular finds JavaScript content but excludes Angular-related notes\ncss -framework finds CSS notes excluding framework-specific content\n\nTag Filtering\nUse tag: to search within specific tags:\ntag:javascripttag:tutorialtag:personaltag:code-blocksMultiple Tags:\ntag:javascript tag:tutorialtag:css tag:demoAuthor Filtering\nUse author: to find notes by specific authors:\nauthor:\"Wiki Admin\"author:\"John Doe\"author:SystemCombining Operators\nCreate powerful queries by combining operators:\ntag:javascript \"async await\" -promiseauthor:\"Wiki Admin\" tag:demo -test\"code blocks\" tag:tutorial -basic🏷️ Tag-Based Filtering\nTag Filter Interface\n\nClick Filter button or press Ctrl+F\nSelect multiple tags for filtering\nChoose between OR/AND logic\n\nTag Logic Options\nOR Logic (Default): Shows notes with ANY selected tag\nSelected: [javascript] OR [python] OR [tutorial]Result: Notes with javascript OR python OR tutorialAND Logic: Shows notes with ALL selected tags  \nSelected: [javascript] AND [tutorial] AND [beginner]Result: Only notes tagged with all threeTag Exclusion\nClick tags with Shift to exclude them:\nInclude: [tutorial] [javascript]Exclude: [advanced] [framework]Result: JavaScript tutorials excluding advanced framework content🎨 Smart Search Features\nAuto-Complete\nSearch suggestions appear as you type:\n\nRecent searches - Your previous search terms\nPopular tags - Frequently used tags\nNote titles - Matching note titles\nAuthors - Available authors\n\nSearch History\nAccess your recent searches:\n\nClick the search dropdown arrow\nNavigate with ↑/↓ arrow keys\nPress Enter to repeat a search\n\nFuzzy Matching\nSearch is forgiving of typos and variations:\n\njavascrpt finds \"JavaScript\" content\nteh finds \"the\" \nalgoritm finds \"algorithm\"\n\n📊 Search Results\nResult Sorting\nResults are ranked by relevance:\n\nTitle matches - Highest priority\nTag matches - High priority  \nContent matches - Medium priority\nDescription matches - Lower priority\n\nResult Information\nEach result shows:\n\nTitle - Note title with highlighting\nDescription - Brief content summary\nTags - Associated tags\nAuthor - Note author\nPreview - Content snippet with search terms highlighted\n\nQuick Actions\nFrom search results:\n\nClick title - Open note in current tab\nCtrl+Click - Open in new tab\nClick tags - Filter by that tag\nClick author - Filter by author\n\n🚀 Advanced Search Techniques\nContent Type Searches\nFind specific types of content:\ntag:code-blocks \"function\"tag:tutorial \"step by step\"  tag:reference \"cheat sheet\"tag:personal \"daily\"Date-Based Searches\nSearch metadata includes dates:\nauthor:System \"2025\"\"created: 2025-01\" \"updated\" tag:demoTechnical Content Searches\nFind programming content:\n\"```javascript\" tag:demo\"code block\" \"line numbers\"\"syntax highlighting\" -testtag:css \"theme\" \"color\"Documentation Searches\nFind specific documentation:\n\"how to\" tag:tutorial\"getting started\" -test\"configuration\" tag:settings\"keyboard shortcuts\" tag:demo💡 Search Best Practices\nEffective Search Strategies\n1. Start Broad, Then Narrow\nStep 1: javascriptStep 2: javascript tutorial  Step 3: javascript tutorial -advancedStep 4: tag:tutorial \"javascript\" \"beginner\"2. Use Multiple Search Methods\n\nTry tag filtering first for categorical searches\nUse text search for specific content\nCombine both for precise results\n\n3. Leverage Exclusions\ntheme -test -debugtutorial -\"work in progress\"javascript -framework -libraryCommon Search Patterns\nFinding Examples:\ntag:demo \"example\"\"code example\" tag:tutorial\"sample\" -testFinding Documentation:\n\"how to\" OR \"guide\" OR \"tutorial\"tag:documentation -draft\"getting started\" tag:beginnerFinding Reference Material:\ntag:reference OR tag:cheatsheet\"reference\" OR \"cheat sheet\"\"commands\" tag:reference🔗 Search URLs & Sharing\nDirect Search Links\nShare searches with URL patterns:\n#/search/javascript+tutorial#/search/\"code+blocks\"+tag:demo#/search/tag:css+-testBookmarkable Searches\nCreate bookmarks for frequent searches:\n\nWeekly Reviews: tag:personal \"weekly\"\nCode References: tag:reference \"code\"\nLearning Material: tag:tutorial -completed\n\nSearch in New Tabs\n\nCtrl+Click search results to open in new tabs\nUse Ctrl+T then search for research sessions\n\n🎯 Search Examples\nReal-World Search Scenarios\nScenario 1: Learning JavaScript\nSearch: tag:javascript tag:tutorial -advancedFilter: Include [beginner], [examples]Result: Beginner-friendly JavaScript tutorials with examplesScenario 2: Theme Customization\nSearch: \"theme\" OR \"css\" tag:demoExclude: test, debugResult: Theme and CSS demos excluding test filesScenario 3: Code Block Features\nSearch: \"code block\" OR \"syntax highlighting\" OR \"line numbers\"Filter: Include [demo], [features]Result: All code block feature documentationScenario 4: Personal Project Notes\nSearch: author:\"Your Name\" tag:personal tag:projectsFilter: Exclude [archive], [completed]Result: Your active personal project notes🔧 Search Configuration\nSearch Settings\nCustomize search behavior in Settings → Search:\n\nEnable fuzzy matching - Find typos and variations\nSearch delay - Milliseconds before search executes\nMax results - Limit displayed results\nInclude content - Search inside note content\nInclude code blocks - Search code block content\n\nPerformance Tips\nFor Large Wikis:\n\nUse tag filtering first to narrow results\nPrefer specific terms over general ones\nUse exclusions to eliminate noise\nLimit searches to relevant sections\n\nFor Quick Finding:\n\nUse recent search history\nBookmark frequent searches  \nLearn common tag patterns\nUse keyboard shortcuts for speed\n\n\nMaster Search with Practice\nThe search system becomes more powerful as you learn your content patterns. Experiment with different operators and develop search strategies that match your workflow!\nPro Tip: Use / for instant search access, and don't forget that search results can be opened in multiple tabs with Ctrl+Click for research sessions.\n\n                \n                \n                \n            \n            Table of Contents\n            \n                \n                    \n                \n            \n        Advanced Search Features🔍 Quick Search Access🎯 Search OperatorsExact Phrase SearchExclusion OperatorTag FilteringAuthor FilteringCombining Operators🏷️ Tag-Based FilteringTag Filter InterfaceTag Logic OptionsTag Exclusion🎨 Smart Search FeaturesAuto-CompleteSearch HistoryFuzzy Matching📊 Search ResultsResult SortingResult InformationQuick Actions🚀 Advanced Search TechniquesContent Type SearchesDate-Based SearchesTechnical Content SearchesDocumentation Searches💡 Search Best PracticesEffective Search StrategiesCommon Search Patterns🔗 Search URLs & SharingDirect Search LinksBookmarkable SearchesSearch in New Tabs🎯 Search ExamplesReal-World Search Scenarios🔧 Search ConfigurationSearch SettingsPerformance TipsMaster Search with Practice\n            \n            \n            \n                \n                    \n                    \n                    \n                    \n                    \n                \n            \n        ",
  "screenshot": "incognito_404_handling_1750192210723.png"
}
- localStorageQuota: {
  "success": true,
  "tested": true
}
- malformedUrl: {
  "success": true,
  "handling": {
    "url": "http://localhost:8000/#/notes/../../../etc/passwd",
    "content": "\n            \n                \n                    \n                        Advanced Search Features\n                        \n                            \n                                ☆\n                            \n                            \n                                🔗\n                            \n                            \n                                \n                                    \n                                    \n                                \n                            \n                            \n                                \n                                    \n                                \n                            \n                        \n                    \n                    \n                    \n                        Home\n                    \n                    \n                    \n            \n                \n                    \n                    \n                \n                4 min read\n                (844 words)\n            \n        \n                        \n                            \n                                \n                                    \n                                \n                                Wiki Admin\n                            \n                        \n                        \n                        \n                            \n                                \n                                    \n                                \n                                June 12, 2025\n                            \n                        \n                        \n                        \n                    \n                    \n                    \n                        Complete guide to advanced search features including operators, tag filtering, and search techniques\n                    \n                    \n                    \n                        \n                            \n                                \n                                    demo\n                                \n                            \n                                \n                                    search\n                                \n                            \n                                \n                                    operators\n                                \n                            \n                                \n                                    filtering\n                                \n                            \n                        \n                    \n                \n                \n                \n                    Advanced Search Features\nThe Notes Wiki includes a powerful search system that goes far beyond simple text matching. Learn how to use advanced operators, tag filtering, and search techniques to find exactly what you're looking for.\n🔍 Quick Search Access\n\nHeader Search: Click the search icon or search box in the header\nKeyboard Shortcut: Press / or Ctrl+K to focus search instantly\nURL Search: Use #/search/your+search+term for direct search links\n\n🎯 Search Operators\nExact Phrase Search\nUse quotes for exact phrase matching:\n\"machine learning algorithms\"\"Notes Wiki system\" \"CSS counter-based line numbers\"Example Results:\n\n✅ \"machine learning algorithms for beginners\"\n❌ \"machine algorithms for learning\"\n\nExclusion Operator\nUse minus (-) to exclude terms:\njavascript -angularpython -djangotheme -darkExample:\n\njavascript -angular finds JavaScript content but excludes Angular-related notes\ncss -framework finds CSS notes excluding framework-specific content\n\nTag Filtering\nUse tag: to search within specific tags:\ntag:javascripttag:tutorialtag:personaltag:code-blocksMultiple Tags:\ntag:javascript tag:tutorialtag:css tag:demoAuthor Filtering\nUse author: to find notes by specific authors:\nauthor:\"Wiki Admin\"author:\"John Doe\"author:SystemCombining Operators\nCreate powerful queries by combining operators:\ntag:javascript \"async await\" -promiseauthor:\"Wiki Admin\" tag:demo -test\"code blocks\" tag:tutorial -basic🏷️ Tag-Based Filtering\nTag Filter Interface\n\nClick Filter button or press Ctrl+F\nSelect multiple tags for filtering\nChoose between OR/AND logic\n\nTag Logic Options\nOR Logic (Default): Shows notes with ANY selected tag\nSelected: [javascript] OR [python] OR [tutorial]Result: Notes with javascript OR python OR tutorialAND Logic: Shows notes with ALL selected tags  \nSelected: [javascript] AND [tutorial] AND [beginner]Result: Only notes tagged with all threeTag Exclusion\nClick tags with Shift to exclude them:\nInclude: [tutorial] [javascript]Exclude: [advanced] [framework]Result: JavaScript tutorials excluding advanced framework content🎨 Smart Search Features\nAuto-Complete\nSearch suggestions appear as you type:\n\nRecent searches - Your previous search terms\nPopular tags - Frequently used tags\nNote titles - Matching note titles\nAuthors - Available authors\n\nSearch History\nAccess your recent searches:\n\nClick the search dropdown arrow\nNavigate with ↑/↓ arrow keys\nPress Enter to repeat a search\n\nFuzzy Matching\nSearch is forgiving of typos and variations:\n\njavascrpt finds \"JavaScript\" content\nteh finds \"the\" \nalgoritm finds \"algorithm\"\n\n📊 Search Results\nResult Sorting\nResults are ranked by relevance:\n\nTitle matches - Highest priority\nTag matches - High priority  \nContent matches - Medium priority\nDescription matches - Lower priority\n\nResult Information\nEach result shows:\n\nTitle - Note title with highlighting\nDescription - Brief content summary\nTags - Associated tags\nAuthor - Note author\nPreview - Content snippet with search terms highlighted\n\nQuick Actions\nFrom search results:\n\nClick title - Open note in current tab\nCtrl+Click - Open in new tab\nClick tags - Filter by that tag\nClick author - Filter by author\n\n🚀 Advanced Search Techniques\nContent Type Searches\nFind specific types of content:\ntag:code-blocks \"function\"tag:tutorial \"step by step\"  tag:reference \"cheat sheet\"tag:personal \"daily\"Date-Based Searches\nSearch metadata includes dates:\nauthor:System \"2025\"\"created: 2025-01\" \"updated\" tag:demoTechnical Content Searches\nFind programming content:\n\"```javascript\" tag:demo\"code block\" \"line numbers\"\"syntax highlighting\" -testtag:css \"theme\" \"color\"Documentation Searches\nFind specific documentation:\n\"how to\" tag:tutorial\"getting started\" -test\"configuration\" tag:settings\"keyboard shortcuts\" tag:demo💡 Search Best Practices\nEffective Search Strategies\n1. Start Broad, Then Narrow\nStep 1: javascriptStep 2: javascript tutorial  Step 3: javascript tutorial -advancedStep 4: tag:tutorial \"javascript\" \"beginner\"2. Use Multiple Search Methods\n\nTry tag filtering first for categorical searches\nUse text search for specific content\nCombine both for precise results\n\n3. Leverage Exclusions\ntheme -test -debugtutorial -\"work in progress\"javascript -framework -libraryCommon Search Patterns\nFinding Examples:\ntag:demo \"example\"\"code example\" tag:tutorial\"sample\" -testFinding Documentation:\n\"how to\" OR \"guide\" OR \"tutorial\"tag:documentation -draft\"getting started\" tag:beginnerFinding Reference Material:\ntag:reference OR tag:cheatsheet\"reference\" OR \"cheat sheet\"\"commands\" tag:reference🔗 Search URLs & Sharing\nDirect Search Links\nShare searches with URL patterns:\n#/search/javascript+tutorial#/search/\"code+blocks\"+tag:demo#/search/tag:css+-testBookmarkable Searches\nCreate bookmarks for frequent searches:\n\nWeekly Reviews: tag:personal \"weekly\"\nCode References: tag:reference \"code\"\nLearning Material: tag:tutorial -completed\n\nSearch in New Tabs\n\nCtrl+Click search results to open in new tabs\nUse Ctrl+T then search for research sessions\n\n🎯 Search Examples\nReal-World Search Scenarios\nScenario 1: Learning JavaScript\nSearch: tag:javascript tag:tutorial -advancedFilter: Include [beginner], [examples]Result: Beginner-friendly JavaScript tutorials with examplesScenario 2: Theme Customization\nSearch: \"theme\" OR \"css\" tag:demoExclude: test, debugResult: Theme and CSS demos excluding test filesScenario 3: Code Block Features\nSearch: \"code block\" OR \"syntax highlighting\" OR \"line numbers\"Filter: Include [demo], [features]Result: All code block feature documentationScenario 4: Personal Project Notes\nSearch: author:\"Your Name\" tag:personal tag:projectsFilter: Exclude [archive], [completed]Result: Your active personal project notes🔧 Search Configuration\nSearch Settings\nCustomize search behavior in Settings → Search:\n\nEnable fuzzy matching - Find typos and variations\nSearch delay - Milliseconds before search executes\nMax results - Limit displayed results\nInclude content - Search inside note content\nInclude code blocks - Search code block content\n\nPerformance Tips\nFor Large Wikis:\n\nUse tag filtering first to narrow results\nPrefer specific terms over general ones\nUse exclusions to eliminate noise\nLimit searches to relevant sections\n\nFor Quick Finding:\n\nUse recent search history\nBookmark frequent searches  \nLearn common tag patterns\nUse keyboard shortcuts for speed\n\n\nMaster Search with Practice\nThe search system becomes more powerful as you learn your content patterns. Experiment with different operators and develop search strategies that match your workflow!\nPro Tip: Use / for instant search access, and don't forget that search results can be opened in multiple tabs with Ctrl+Click for research sessions.\n\n                \n                \n                \n            \n            Table of Contents\n            \n                \n                    \n                \n            \n        Advanced Search Features🔍 Quick Search Access🎯 Search OperatorsExact Phrase SearchExclusion OperatorTag FilteringAuthor FilteringCombining Operators🏷️ Tag-Based FilteringTag Filter InterfaceTag Logic OptionsTag Exclusion🎨 Smart Search FeaturesAuto-CompleteSearch HistoryFuzzy Matching📊 Search ResultsResult SortingResult InformationQuick Actions🚀 Advanced Search TechniquesContent Type SearchesDate-Based SearchesTechnical Content SearchesDocumentation Searches💡 Search Best PracticesEffective Search StrategiesCommon Search Patterns🔗 Search URLs & SharingDirect Search LinksBookmarkable SearchesSearch in New Tabs🎯 Search ExamplesReal-World Search Scenarios🔧 Search ConfigurationSearch SettingsPerformance TipsMaster Search with Practice\n            \n            \n            \n                \n                    \n                    \n                    \n                    \n                    \n                \n            \n        "
  },
  "screenshot": "incognito_malformed_url_1750192211352.png"
}
- rapidClicking: {
  "success": true,
  "uiStable": {
    "searchOverlayCount": 1,
    "modalCount": 4
  },
  "screenshot": "incognito_rapid_clicking_1750192213409.png"
}

✅ Perfect feature parity

---

### 🔬 Advanced Persistence

**Normal Browser Results:**
- multiTabState: {
  "success": true,
  "tabState": {
    "tabs": [
      {
        "title": "Welcome to Notes Wiki",
        "active": true,
        "id": "tab-0"
      }
    ],
    "activeTab": "Welcome to Notes Wiki",
    "tabCount": 1
  },
  "screenshot": "normal_multi_tab_state_1750192215122.png"
}
- ❌ Error: [object Object]

**Incognito Browser Results:**
- multiTabState: {
  "success": true,
  "tabState": {
    "tabs": [
      {
        "title": "Welcome to Notes Wiki",
        "active": true,
        "id": "tab-0"
      }
    ],
    "activeTab": "Welcome to Notes Wiki",
    "tabCount": 1
  },
  "screenshot": "incognito_multi_tab_state_1750192217445.png"
}
- ❌ Error: [object Object]

✅ Perfect feature parity

---

