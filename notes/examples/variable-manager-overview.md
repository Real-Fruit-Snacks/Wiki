---
title: "Variable Manager - Feature Overview & Examples"
tags: ["examples", "variables", "overview", "getting-started"]
created: 2024-01-15
modified: 2024-01-15
pinned: true
---

# 🔧 Variable Manager - Feature Overview & Examples

The **Variable Manager** is a powerful feature that allows you to define and manage variables within your notes using the `$VariableName` syntax. Perfect for creating reusable templates, configuration files, and dynamic content.

## 🎯 What is the Variable Manager?

Transform static code blocks into dynamic templates by defining variables with `$VariableName` syntax. The Variable Manager provides a clean interface to set values for these variables, making your notes more flexible and reusable.

### ✨ Key Features

- **🔤 Simple Syntax**: Use `$VariableName` anywhere in code blocks
- **🎛️ Visual Interface**: Dedicated panel to manage all variables
- **💾 Persistent Storage**: Variable values are saved per note in localStorage
- **🔄 Real-time Updates**: Code blocks update instantly as you type
- **📊 Usage Tracking**: See how many times each variable is used
- **⚡ Keyboard Shortcuts**: Quick access with `Ctrl+Shift+V`

## 🚀 Quick Start Guide

### 1. **Access the Variable Manager**
Click the **$** button in the header or press `Ctrl+Shift+V`

### 2. **Define Variables in Code Blocks**
```bash
# Example with variables
echo "Hello $UserName!"
echo "Environment: $Environment"
echo "Port: $ServerPort"
```

### 3. **Set Variable Values**
- Open the Variable Manager panel
- Enter values for each detected variable
- Watch your code blocks update in real-time!

### 4. **Manage Variables**
- **🔄 Refresh**: Re-scan note for new variables
- **🗑️ Reset**: Clear all variable values
- **❓ Help**: View usage instructions

## 📚 Example Collections

### 🖥️ [Programming Examples](variable-examples-programming.md)
Comprehensive programming examples including:
- **Python & JavaScript**: Database connections, API configurations
- **Docker**: Dockerfiles and Docker Compose templates
- **Shell Scripts**: Deployment automation and system administration
- **Configuration Files**: Environment-specific settings

**Perfect for:** Developers, DevOps engineers, system administrators

### 📄 [Documentation Templates](variable-examples-documentation.md)
Professional documentation templates:
- **README Templates**: Project documentation with dynamic values
- **API Documentation**: Endpoint documentation with examples
- **Bug Reports**: Standardized issue reporting templates
- **Meeting Notes**: Structured meeting minutes and action items

**Perfect for:** Technical writers, project managers, team leads

### 📊 [Data Analysis Examples](variable-examples-data-analysis.md)
Scientific and business analysis templates:
- **Financial Calculations**: Investment analysis, loan calculators
- **Statistical Analysis**: Hypothesis testing, confidence intervals
- **Business Metrics**: Customer analytics, KPI dashboards
- **Scientific Formulas**: Physics calculations, chemistry equations

**Perfect for:** Analysts, researchers, data scientists, finance professionals

### ⚡ [Quick Configuration Examples](variable-examples-quick-configs.md)
Simple, everyday configuration templates:
- **Server Configs**: Development and production environment setup
- **Security**: SSL certificates, firewall rules
- **Personal Templates**: Shopping lists, travel checklists
- **Email Templates**: Welcome emails, meeting invitations

**Perfect for:** Everyone! Great starting point for beginners

## 🎨 Variable Manager Interface

### Panel Layout
```
┌─ Variable Manager ──────────────┐
│ Variable Manager            ❓ ✕ │
├──────────────────────────────────┤
│ 🔄 Refresh  🗑️ Reset           │
├──────────────────────────────────┤
│ VariableName1: [input field]    │
│ Usage: 3 times                   │
│                                  │
│ VariableName2: [input field]    │
│ Usage: 1 time                    │
│                                  │
│ VariableName3: [input field]    │
│ Usage: 5 times                   │
└──────────────────────────────────┘
```

### Control Buttons
- **🔄 Refresh Variables**: Re-scan the current note for new `$Variable` patterns
- **🗑️ Reset Variables**: Clear all variable values for the current note
- **❓ Help**: Show/hide usage instructions and tips
- **✕ Close Panel**: Hide the Variable Manager panel

## 💡 Pro Tips & Best Practices

### 🎯 Variable Naming
```markdown
✅ Good variable names:
- $DatabaseHost, $ServerPort, $UserName
- $ProjectName, $Environment, $Version
- Clear, descriptive, CamelCase

❌ Avoid:
- $x, $temp, $var1 (not descriptive)
- $user-name (use CamelCase instead)
- $123abc (don't start with numbers)
```

### 📁 Template Organization
1. **Create template notes** with variables but no values set
2. **Copy templates** when starting new projects
3. **Set project-specific values** in the Variable Manager
4. **Save time** by reusing proven templates

### 🔄 Workflow Integration
```bash
# Example development workflow
git checkout -b feature/$FeatureName
# Set $FeatureName in Variable Manager
# All git commands now use the feature name automatically
```

### 🎨 Creative Uses
- **Configuration Management**: Different values for dev/staging/prod
- **Code Generation**: Template code with variable parameters
- **Documentation**: Dynamic examples that update with your project
- **Personal Organization**: Checklists and templates for daily tasks

## 🛠️ Technical Details

### Variable Syntax
- **Pattern**: `$VariableName` (dollar sign + identifier)
- **Scope**: Variables are scoped to individual notes
- **Storage**: Values saved in browser localStorage
- **Updates**: Real-time rendering with 300ms debouncing

### Performance
- **Efficient Scanning**: Only scans code blocks, not regular text
- **Scroll Preservation**: Maintains scroll position during updates
- **Memory Management**: Variables cleaned up when notes are closed

## 🎬 Getting Started

1. **Browse the examples** above to see what's possible
2. **Open an example note** that matches your use case
3. **Click the $ button** to open the Variable Manager
4. **Enter some values** and watch the magic happen!
5. **Create your own templates** using the `$Variable` syntax

## 🚀 Advanced Features

### Keyboard Shortcuts
- `Ctrl+Shift+V`: Toggle Variable Manager panel
- `Tab`: Navigate between variable input fields
- `Escape`: Close Variable Manager panel

### Integration Features
- **Search Integration**: Variables included in search results
- **Export**: Variable values preserved when copying notes
- **Themes**: Variable Manager follows your selected theme

---

## 🎯 Ready to Start?

Choose an example that matches your needs and start experimenting with the Variable Manager. The feature is designed to be intuitive and powerful - perfect for both simple configurations and complex templates.

**Happy variable managing!** 🚀

---

*Pro tip: Bookmark this overview note for quick reference to all Variable Manager examples and features.* 