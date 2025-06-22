---
title: Confirmation Dialogs
tags: [safety, interface, settings, productivity]
author: Wiki Admin
created: 2025-06-22
description: Smart confirmation dialogs prevent accidental data loss and improve user experience
---

# Confirmation Dialogs

Confirmation dialogs provide a safety net against accidental actions that could result in lost work. These intelligent prompts help prevent mishaps while staying out of your way during normal workflows.

## 🛡️ What Gets Protected

### Tab Closure Protection
**Close Single Tab:**
- **Triggers**: Clicking tab × button, Ctrl+W, or middle-click
- **Condition**: Only when confirmation dialogs are enabled
- **Exception**: Empty tabs close immediately without confirmation

**Close All Tabs:**
- **Triggers**: Ctrl+Shift+W or "Close All" button
- **Smart behavior**: Adapts message based on pinned tabs
- **Protection**: Warns before closing multiple tabs simultaneously

### Sticky Notes Protection
**Sticky Note Deletion:**
- **Triggers**: Clicking × button on sticky note
- **Condition**: Only when confirmation dialogs are enabled
- **Warning**: Alerts that content will be permanently lost

## ⚙️ Settings Control

### Enabling/Disabling Confirmations
Access via **Settings** → **General** → **Confirmation Dialogs**:

- **Default state**: Enabled (recommended)
- **User choice**: Can be disabled for faster workflows
- **Immediate effect**: Changes apply instantly
- **Persistence**: Setting saved in browser localStorage

### Smart Default Behavior
The system ships with confirmations **enabled by default** because:
- **New users** often accidentally close tabs
- **Data protection** prevents frustration from lost work
- **Easy to disable** for power users who prefer speed
- **Mobile safety** especially important on touch devices

## 🎯 Smart Dialog Behavior

### Context-Aware Messages

**Standard Tab Close:**
```
⚠️ Close Tab?
Are you sure you want to close this tab?
[Cancel] [Close Tab]
```

**Close All - No Pinned Tabs:**
```
⚠️ Close All Tabs?
This will close all 5 open tabs.
[Cancel] [Close All]
```

**Close All - Some Pinned Tabs:**
```
⚠️ Close Non-Pinned Tabs?
This will close 3 tabs. 2 pinned tabs will remain open.
[Cancel] [Close Non-Pinned]
```

**All Tabs Are Pinned:**
```
⚠️ Cannot Close Tabs
All tabs are pinned. Unpin them first to close.
[Understood]
```

**Sticky Note Deletion:**
```
⚠️ Delete Sticky Note?
This sticky note and its content will be permanently deleted.
[Cancel] [Delete]
```

## 🎨 Visual Design

### Dialog Appearance
- **Theme integration** - Matches current theme colors
- **Blur backdrop** - Focuses attention on dialog
- **Clear hierarchy** - Title, message, and actions clearly separated
- **Accessible colors** - High contrast for readability

### Button Design
- **Primary action** - Destructive action (red/warning color)
- **Secondary action** - Safe action (cancel button)
- **Clear labels** - Descriptive button text
- **Keyboard accessible** - Tab navigation supported

## ⌨️ Keyboard Interactions

### Dialog Navigation
- **Tab key** - Navigate between buttons
- **Enter** - Activates focused button
- **Escape** - Cancels dialog (same as Cancel button)
- **Arrow keys** - Alternative navigation

### Quick Actions
- **Enter** - Usually triggers the safe/cancel action
- **Alt+key** - Access accelerator keys where available
- **Space** - Activates focused button

## 📱 Mobile Considerations

### Touch-Friendly Design
- **Large buttons** - Minimum 44px touch targets
- **Adequate spacing** - Prevents accidental taps
- **Thumb zones** - Important actions within easy reach

### Mobile-Specific Behaviors
- **Auto-position** - Dialogs center within viewport
- **Scroll protection** - Prevents background scrolling
- **Safe area** - Respects device notches and safe zones

## 🔧 Developer Technical Details

### Event Handling
- **Event prevention** - Blocks original action until confirmation
- **Async handling** - Uses promises for clean code structure
- **Memory management** - Dialogs cleaned up after use

### Accessibility Features
- **ARIA labels** - Proper screen reader support
- **Focus management** - Logical focus flow
- **High contrast** - Respects accessibility preferences
- **Screen reader** - Announces dialog content

## 💡 Best Practices

### When to Use Confirmations
**Enable confirmations if you:**
- Are new to the wiki system
- Work on mobile devices frequently  
- Often have many tabs open
- Share devices with others
- Work in distracting environments

**Consider disabling if you:**
- Are an experienced power user
- Prefer maximum speed over safety
- Rarely make accidental clicks
- Use keyboard shortcuts primarily

### Workflow Integration
- **Learn shortcuts** - Keyboard users can navigate dialogs quickly
- **Understand contexts** - Different scenarios show different messages
- **Use pinned tabs** - Pin important tabs to get smarter close-all behavior

### Team Recommendations
- **Default enabled** - Keep confirmations on for shared devices
- **User training** - Teach team members about pinned tabs
- **Consistent settings** - Consider organization-wide standards

## 🎯 Smart Features

### Intelligent Detection
The system intelligently detects when confirmations are most helpful:

- **Multiple tabs** - More likely to show confirmation
- **Pinned tab logic** - Adapts messaging for pinned tabs
- **Content awareness** - Empty tabs skip confirmations
- **Mobile detection** - More cautious on touch devices

### Performance Optimizations
- **Lazy loading** - Dialog components loaded only when needed
- **Minimal DOM** - Efficient dialog creation and cleanup
- **Event delegation** - Optimized event handling

## 🔄 Future Enhancements

### Planned Features
- **Undo support** - "Undo close tab" functionality
- **Smart timing** - Learn user patterns to adjust confirmation timing
- **Gesture support** - Swipe gestures for confirm/cancel
- **Bulk operations** - More granular control for multiple actions

---

## Safety First

Confirmation dialogs strike the perfect balance between safety and speed. They protect against common accidents while learning your workflow patterns to stay out of your way.

**Key Benefits:**
- 🛡️ **Accident prevention** - Stops costly mistakes
- 🧠 **Smart adaptation** - Context-aware messaging  
- ⚡ **Performance** - Minimal impact on workflow speed
- 🎯 **User choice** - Complete control over when they appear

Enable confirmations for peace of mind, or disable them for maximum speed - the choice is yours!