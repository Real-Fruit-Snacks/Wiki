---
title: Feature Compatibility Matrix
tags: [reference, compatibility, features, platforms]
author: Wiki Admin
created: 2025-06-22
description: Comprehensive compatibility matrix for all wiki features across different platforms and browsers
---

# Feature Compatibility Matrix

This reference guide shows which features work where, helping you understand compatibility across different platforms, browsers, and deployment methods.

## 🌐 Browser Compatibility

| Feature | Chrome 66+ | Firefox 63+ | Safari 13.1+ | Edge 79+ | Mobile Browsers |
|---------|------------|-------------|---------------|----------|-----------------|
| **Core Navigation** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Search & Filtering** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Tab Management** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Limited¹ |
| **Drag & Drop** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ❌ No |
| **Keyboard Shortcuts** | ✅ Full | ✅ Full | ⚠️ Limited² | ✅ Full | ❌ No |
| **Themes** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Settings Persistence** | ✅ Full | ✅ Full | ⚠️ Limited³ | ✅ Full | ✅ Full |
| **Sticky Notes** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Touch⁴ |
| **Split View** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ⚠️ Single⁵ |
| **Context Menus** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Long-press |
| **Mobile Interface** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Optimized |
| **PWA Features** | ✅ Full | ✅ Full | ⚠️ Limited⁶ | ✅ Full | ✅ Varies |

**Notes:**
1. Mobile tabs use horizontal scrolling instead of visual reordering
2. Safari blocks some Ctrl shortcuts; use Cmd equivalents
3. Safari Private Mode has localStorage limitations
4. Touch-optimized drag/resize for sticky notes
5. Mobile automatically shows single pane; tap to switch
6. Safari PWA support varies by iOS version

## 📱 Device Type Compatibility

### Desktop Features
| Feature | Windows | macOS | Linux | ChromeOS |
|---------|---------|-------|-------|----------|
| **Full Keyboard Shortcuts** | ✅ Ctrl | ✅ Cmd | ✅ Ctrl | ✅ Ctrl |
| **Drag & Drop Tabs** | ✅ | ✅ | ✅ | ✅ |
| **Multi-Window Support** | ✅ | ✅ | ✅ | ✅ |
| **File System Access** | ⚠️ Limited⁷ | ⚠️ Limited⁷ | ⚠️ Limited⁷ | ❌ |
| **Local Server** | ✅ | ✅ | ✅ | ⚠️ Limited |

### Mobile/Tablet Features
| Feature | iOS Safari | iOS Chrome | Android Chrome | Android Firefox |
|---------|------------|------------|----------------|-----------------|
| **Touch Navigation** | ✅ | ✅ | ✅ | ✅ |
| **Responsive Menu** | ✅ | ✅ | ✅ | ✅ |
| **Long-press Context** | ✅ | ✅ | ✅ | ✅ |
| **Pinch Zoom** | ✅ | ✅ | ✅ | ✅ |
| **Add to Home Screen** | ✅ | ✅ | ✅ | ✅ |
| **Offline Mode** | ✅ | ✅ | ✅ | ✅ |

**Note 7:** Browser security limits direct file system access; use web server for development

## 🚀 Deployment Platform Compatibility

### Static Hosting
| Platform | Search Index | Theme Loading | Path Detection | Custom Domains |
|----------|--------------|---------------|----------------|----------------|
| **GitHub Pages** | ✅ Auto | ✅ CDN | ✅ Auto | ✅ |
| **GitLab Pages** | ✅ CI/CD | ✅ Fast | ✅ Auto | ✅ |
| **Netlify** | ✅ Build | ✅ CDN | ✅ Auto | ✅ |
| **Vercel** | ✅ Build | ✅ Edge | ✅ Auto | ✅ |
| **AWS S3** | ⚠️ Manual⁸ | ✅ | ⚠️ Manual | ✅ |
| **Azure Static** | ✅ Action | ✅ | ✅ Auto | ✅ |
| **Firebase Hosting** | ⚠️ Manual⁸ | ✅ | ⚠️ Manual | ✅ |

### Self-Hosted
| Environment | Python Build | PHP Server | Node.js | Docker |
|-------------|--------------|------------|---------|--------|
| **Ubuntu/Debian** | ✅ | ✅ | ✅ | ✅ |
| **CentOS/RHEL** | ✅ | ✅ | ✅ | ✅ |
| **Windows Server** | ✅ | ✅ | ✅ | ✅ |
| **macOS Server** | ✅ | ✅ | ✅ | ✅ |
| **Shared Hosting** | ⚠️ Limited⁹ | ✅ | ⚠️ Limited | ❌ |

**Note 8:** Requires manual `python3 build.py` before upload
**Note 9:** Depends on host Python/Node.js support

## ⚙️ Feature Implementation Status

### Search Features
| Feature | Status | Notes |
|---------|--------|--------|
| **Exact Phrases** | ✅ Implemented | Use `"quoted text"` |
| **Exclusion** | ✅ Implemented | Use `-excluded` |
| **Tag Filtering** | ✅ Implemented | Use `tag:name` |
| **Author Filtering** | ✅ Implemented | Use `author:name` |
| **Fuzzy Matching** | ❌ Not Available | Exact matching only |
| **Result Ranking** | ❌ Not Available | Results in index order |
| **Auto-complete** | ❌ Not Available | Manual typing required |

### Keyboard Shortcuts
| Shortcut Category | Status | Availability |
|------------------|---------|--------------|
| **Basic Navigation** | ✅ Full | All platforms |
| **Tab Management** | ✅ Full | Desktop only |
| **Search & Filter** | ✅ Full | All platforms |
| **Settings Access** | ✅ Full | All platforms |
| **Custom Shortcuts** | ✅ Limited¹⁰ | 5 customizable |
| **Vim Mode** | ❌ Not Available | Future consideration |
| **Chord Shortcuts** | ❌ Not Available | Future consideration |

**Note 10:** Only basic shortcuts customizable: new-tab, search, settings, filter, bookmark

### Interface Features
| Feature | Desktop | Tablet | Mobile | Notes |
|---------|---------|--------|--------|--------|
| **Multi-tab Interface** | ✅ Full | ✅ Full | ✅ Horizontal | Scrollable on mobile |
| **Split View** | ✅ Full | ✅ Full | ⚠️ Single | Auto-adapts |
| **Drag & Drop** | ✅ Full | ⚠️ Touch | ❌ | Touch gestures on tablet |
| **Context Menus** | ✅ Right-click | ✅ Long-press | ✅ Long-press | Platform-appropriate |
| **Responsive Design** | ✅ Adaptive | ✅ Optimized | ✅ Optimized | Breakpoint: 768px |

## 🔧 Technical Requirements

### Minimum Requirements
| Component | Requirement | Notes |
|-----------|-------------|--------|
| **Browser** | Modern browser (2018+) | ES6+ support required |
| **JavaScript** | Enabled | Core functionality depends on JS |
| **Local Storage** | 5MB+ available | For settings and cache |
| **Screen Resolution** | 320px minimum width | Mobile-first design |
| **Network** | Initial load only | Fully offline after load |

### Recommended Specifications
| Component | Recommendation | Benefits |
|-----------|----------------|----------|
| **RAM** | 4GB+ | Smooth performance with many tabs |
| **Storage** | 50MB+ | Space for offline cache |
| **CPU** | Dual-core+ | Faster search and rendering |
| **Connection** | Broadband | Initial theme/asset loading |

### Development Requirements
| Component | Version | Purpose |
|-----------|---------|---------|
| **Python** | 3.6+ | Build script (search index) |
| **PyYAML** | Latest | YAML frontmatter parsing |
| **Git** | 2.0+ | Version control (optional) |
| **Web Server** | Any | Local development |

## 🌍 Geographic & Network Considerations

### CDN Performance
| Region | GitHub Pages | GitLab Pages | Netlify | Notes |
|--------|--------------|--------------|---------|--------|
| **North America** | ✅ Fast | ✅ Fast | ✅ Fastest | All perform well |
| **Europe** | ✅ Fast | ✅ Fastest | ✅ Fast | GitLab EU servers |
| **Asia Pacific** | ✅ Good | ✅ Good | ✅ Fast | Some latency |
| **Other Regions** | ⚠️ Variable | ⚠️ Variable | ✅ Good | Netlify global CDN |

### Network Conditions
| Connection | Initial Load | Subsequent Use | Recommendations |
|------------|--------------|----------------|-----------------|
| **Broadband** | < 3 seconds | Instant | All features available |
| **Mobile 4G** | < 10 seconds | Instant | Disable animation themes |
| **Mobile 3G** | < 30 seconds | Instant | Use light themes |
| **Slow/Satellite** | 1-2 minutes | Instant | Minimal themes only |

## 🔒 Security & Privacy Features

### Data Protection
| Feature | Status | Details |
|---------|--------|---------|
| **No External Requests** | ✅ Guaranteed | Zero tracking/analytics |
| **Offline Operation** | ✅ Full | Works without internet |
| **Local Storage Only** | ✅ Yes | No cloud data storage |
| **HTTPS Support** | ✅ Platform-dependent | Most hosts provide SSL |
| **Content Security** | ✅ Sanitized | XSS prevention |

### Privacy Compliance
| Regulation | Compliance | Notes |
|------------|------------|--------|
| **GDPR** | ✅ Compliant | No personal data collection |
| **CCPA** | ✅ Compliant | No data sharing |
| **COPPA** | ✅ Compliant | No age verification needed |
| **Enterprise** | ✅ Suitable | Air-gap compatible |

## 🚨 Known Limitations

### Search Limitations
- No fuzzy/approximate matching
- No search result ranking
- No advanced Boolean operators (AND/OR beyond tags)
- No search within date ranges
- No wildcard or regex support

### Mobile Limitations
- No drag & drop tab reordering
- Limited keyboard shortcut support
- Context menus require long-press
- Split view shows single pane only

### Browser-Specific Issues
- **Safari Private Mode**: Limited localStorage
- **iOS WebKit**: Some PWA limitations
- **Chrome Mobile**: Aggressive memory management
- **Firefox**: Occasional theme loading delays

### Platform Limitations
- **Static Hosting**: No server-side processing
- **File System**: No direct file access from browser
- **Build Process**: Requires Python for index generation

---

## 🎯 Compatibility Summary

**✅ Universally Compatible:**
- Core reading and navigation
- Search and filtering
- Theme switching
- Settings management
- Offline operation

**⚠️ Platform-Dependent:**
- Keyboard shortcuts (desktop vs. mobile)
- Drag & drop (mouse vs. touch)
- Context menus (right-click vs. long-press)
- Split view (adaptive behavior)

**❌ Not Available:**
- Advanced search features (fuzzy, ranking)
- Complex keyboard shortcuts
- File system integration
- Real-time collaboration

This compatibility matrix helps you understand what to expect when using the wiki across different environments and platforms!