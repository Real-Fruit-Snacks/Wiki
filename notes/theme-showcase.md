---
title: Theme Showcase & Test
tags: [themes, test, showcase]
created: 2025-01-06
author: Wiki Admin
description: Comprehensive test of all 28 themes with various code examples
---

# Theme Showcase & Test

This page tests all 28 available themes with various code examples to ensure syntax highlighting works correctly.

## Available Themes

1. **Light** - Clean light theme
2. **Dark** - Easy on the eyes dark theme
3. **VSCode Dark+** - Popular VSCode dark theme
4. **Monokai** - Vibrant colors on dark background
5. **Dracula** - Dark theme with vibrant colors
6. **One Dark Pro** - Atom-inspired dark theme
7. **Solarized Light** - Precision colors for machines and people
8. **Solarized Dark** - Dark variant of Solarized
9. **GitHub Light** - GitHub's clean light theme
10. **GitHub Dark** - GitHub's dark theme
11. **Nord** - Arctic, north-bluish color palette
12. **Gruvbox Dark** - Retro groove dark theme
13. **Gruvbox Light** - Retro groove light theme
14. **Tokyo Night** - A clean dark theme that celebrates Tokyo at night
15. **Palenight** - An elegant and juicy material-like theme
16. **Hot Dog Stand** - Windows 3.1 classic - Bold red & yellow!
17. **Catppuccin Mocha** - Dark theme with soft pastel colors
18. **Catppuccin Latte** - Light theme with warm colors
19. **Rosé Pine** - Dark theme with muted colors
20. **Rosé Pine Dawn** - Light variant of Rosé Pine
21. **Material Ocean** - Material design dark theme
22. **Ayu Dark** - Modern dark theme
23. **Ayu Light** - Modern light theme
24. **Everforest Dark** - Forest-inspired dark theme
25. **Kanagawa** - Japanese aesthetic inspired dark theme
26. **Zenburn** - Low contrast theme for reduced eye strain
27. **Tomorrow Night** - Popular dark theme from the Tomorrow theme family
28. **Cobalt2** - Wes Bos's popular blue-based dark theme

## How to Test

1. Open the theme picker (sun/moon icon in header)
2. Hover over each theme to preview it
3. Click to apply the theme permanently
4. Check that all code blocks below render correctly

## JavaScript Example

```javascript title:"JavaScript Class Example"
// ES6 Class with various syntax elements
class ThemeManager {
    constructor(options = {}) {
        this.themes = options.themes || [];
        this.currentTheme = options.defaultTheme || 'light';
        this.callbacks = new Map();
        this._initialized = false;
    }

    async initialize() {
        try {
            // Load saved theme from localStorage
            const saved = localStorage.getItem('theme');
            if (saved && this.themes.includes(saved)) {
                this.currentTheme = saved;
            }
            
            // Apply the theme
            await this.applyTheme(this.currentTheme);
            this._initialized = true;
            
            return { success: true, theme: this.currentTheme };
        } catch (error) {
            console.error('Failed to initialize theme:', error);
            return { success: false, error: error.message };
        }
    }

    applyTheme(themeName) {
        // Validate theme exists
        if (!this.themes.includes(themeName)) {
            throw new Error(`Theme "${themeName}" not found`);
        }

        // Apply theme to DOM
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Save preference
        localStorage.setItem('theme', themeName);
        
        // Trigger callbacks
        this.callbacks.forEach(callback => callback(themeName));
    }

    // Arrow function property
    onChange = (callback) => {
        const id = Date.now();
        this.callbacks.set(id, callback);
        return () => this.callbacks.delete(id);
    }
}

// Usage
const manager = new ThemeManager({
    themes: ['light', 'dark', 'monokai'],
    defaultTheme: 'dark'
});

manager.initialize().then(result => {
    console.log('Theme initialized:', result);
});
```

## Python Example

```python title:"Python Data Processing"
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Union
import asyncio

class DataProcessor:
    """Process and analyze time series data with various transformations."""
    
    def __init__(self, data_path: str, cache_size: int = 1000):
        self.data_path = data_path
        self.cache_size = cache_size
        self._cache: Dict[str, pd.DataFrame] = {}
        self._metadata = {
            'created': datetime.now(),
            'version': '1.0.0',
            'author': 'System'
        }
    
    @property
    def is_cached(self) -> bool:
        """Check if data is currently cached."""
        return len(self._cache) > 0
    
    async def load_data_async(self, 
                            file_path: str, 
                            columns: Optional[List[str]] = None) -> pd.DataFrame:
        """Asynchronously load data from CSV file."""
        try:
            # Simulate async operation
            await asyncio.sleep(0.1)
            
            df = pd.read_csv(file_path, usecols=columns)
            
            # Cache the result
            if len(self._cache) < self.cache_size:
                self._cache[file_path] = df
            
            return df
            
        except FileNotFoundError as e:
            print(f"Error: File {file_path} not found")
            raise e
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            raise
    
    def process_timeseries(self, 
                          df: pd.DataFrame, 
                          window_size: int = 7,
                          aggregation: str = 'mean') -> pd.DataFrame:
        """Apply rolling window calculations to time series data."""
        
        # Validate inputs
        if window_size <= 0:
            raise ValueError("Window size must be positive")
        
        valid_aggregations = ['mean', 'sum', 'min', 'max', 'std']
        if aggregation not in valid_aggregations:
            raise ValueError(f"Aggregation must be one of {valid_aggregations}")
        
        # Apply rolling calculation
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        result = df.copy()
        for col in numeric_cols:
            if aggregation == 'mean':
                result[f'{col}_rolling_{window_size}d'] = df[col].rolling(window_size).mean()
            elif aggregation == 'sum':
                result[f'{col}_rolling_{window_size}d'] = df[col].rolling(window_size).sum()
            # ... etc
        
        return result
    
    @staticmethod
    def generate_sample_data(n_rows: int = 1000) -> pd.DataFrame:
        """Generate sample time series data for testing."""
        dates = pd.date_range(
            start='2024-01-01', 
            periods=n_rows, 
            freq='D'
        )
        
        data = {
            'date': dates,
            'value': np.random.randn(n_rows).cumsum() + 100,
            'volume': np.random.randint(1000, 10000, n_rows),
            'category': np.random.choice(['A', 'B', 'C'], n_rows)
        }
        
        return pd.DataFrame(data)

# Example usage
if __name__ == "__main__":
    processor = DataProcessor("./data")
    
    # Generate and process sample data
    df = DataProcessor.generate_sample_data(365)
    processed = processor.process_timeseries(df, window_size=30)
    
    print(f"Data shape: {processed.shape}")
    print(f"Columns: {list(processed.columns)}")
```

## HTML/CSS Example

```html title:"Responsive Card Component"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Theme Card Component</title>
    <style>
        /* CSS Custom Properties for theming */
        :root {
            --card-bg: #ffffff;
            --card-border: #e5e7eb;
            --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --accent-color: #3b82f6;
        }

        /* Dark theme override */
        [data-theme="dark"] {
            --card-bg: #1f2937;
            --card-border: #374151;
            --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            --text-primary: #f3f4f6;
            --text-secondary: #9ca3af;
            --accent-color: #60a5fa;
        }

        /* Card component styles */
        .card {
            background-color: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 0.5rem;
            box-shadow: var(--card-shadow);
            padding: 1.5rem;
            margin: 1rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .card-title {
            color: var(--text-primary);
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
        }

        .card-description {
            color: var(--text-secondary);
            line-height: 1.5;
            margin: 0 0 1rem 0;
        }

        .card-link {
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }

        .card-link:hover {
            text-decoration: underline;
        }

        /* Responsive grid */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }

        @media (max-width: 768px) {
            .card {
                padding: 1rem;
            }
            
            .card-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="card-grid">
        <article class="card">
            <h2 class="card-title">Theme System</h2>
            <p class="card-description">
                A comprehensive theming system with CSS custom properties 
                that supports multiple color schemes and automatic theme switching.
            </p>
            <a href="#" class="card-link">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
                </svg>
            </a>
        </article>
    </div>
</body>
</html>
```

## Bash/Shell Example

```bash title:"Deployment Script"
#!/bin/bash
# Theme deployment and build script

set -euo pipefail

# Color output helpers
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
THEMES_DIR="./themes"
BUILD_DIR="./dist"
THEME_FILES=(
    "light.css"
    "dark.css"
    "vscode-dark-plus.css"
    "monokai.css"
    "dracula.css"
    "one-dark-pro.css"
    "solarized-light.css"
    "solarized-dark.css"
    "github-light.css"
    "github-dark.css"
    "nord.css"
    "gruvbox-dark.css"
    "gruvbox-light.css"
    "tokyo-night.css"
    "palenight.css"
)

# Function to print colored output
log() {
    local level=$1
    shift
    case "$level" in
        "error")
            echo -e "${RED}[ERROR]${NC} $*" >&2
            ;;
        "success")
            echo -e "${GREEN}[SUCCESS]${NC} $*"
            ;;
        "warning")
            echo -e "${YELLOW}[WARNING]${NC} $*"
            ;;
        *)
            echo "[INFO] $*"
            ;;
    esac
}

# Validate theme files exist
validate_themes() {
    log "info" "Validating theme files..."
    
    local missing_themes=()
    
    for theme in "${THEME_FILES[@]}"; do
        if [[ ! -f "$THEMES_DIR/$theme" ]]; then
            missing_themes+=("$theme")
        fi
    done
    
    if [[ ${#missing_themes[@]} -gt 0 ]]; then
        log "error" "Missing theme files:"
        printf '%s\n' "${missing_themes[@]}"
        return 1
    fi
    
    log "success" "All ${#THEME_FILES[@]} theme files found"
    return 0
}

# Minify CSS files
minify_themes() {
    log "info" "Minifying theme files..."
    
    # Create build directory if it doesn't exist
    mkdir -p "$BUILD_DIR/themes"
    
    for theme in "${THEME_FILES[@]}"; do
        local input="$THEMES_DIR/$theme"
        local output="$BUILD_DIR/themes/${theme%.css}.min.css"
        
        # Simple CSS minification (remove comments and extra whitespace)
        if command -v csso &> /dev/null; then
            csso "$input" -o "$output"
        else
            # Fallback: basic minification with sed
            sed -e 's/\/\*[^*]*\*\///g' \
                -e 's/\s\+/ /g' \
                -e 's/:\s/:/g' \
                -e 's/;\s/;/g' \
                -e 's/{\s/{/g' \
                -e 's/}\s/}/g' \
                -e 's/\n//g' \
                "$input" > "$output"
        fi
        
        log "success" "Minified: ${theme%.css}.min.css"
    done
}

# Generate theme metadata
generate_metadata() {
    log "info" "Generating theme metadata..."
    
    cat > "$BUILD_DIR/themes/themes.json" << EOF
{
    "themes": [
        $(for i in "${!THEME_FILES[@]}"; do
            theme="${THEME_FILES[$i]}"
            theme_id="${theme%.css}"
            
            # Add comma except for last item
            if [[ $i -lt $((${#THEME_FILES[@]} - 1)) ]]; then
                echo "        \"$theme_id\","
            else
                echo "        \"$theme_id\""
            fi
        done)
    ],
    "count": ${#THEME_FILES[@]},
    "generated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
    
    log "success" "Generated theme metadata"
}

# Main execution
main() {
    log "info" "Starting theme build process..."
    
    # Validate themes
    if ! validate_themes; then
        log "error" "Theme validation failed"
        exit 1
    fi
    
    # Minify themes
    minify_themes
    
    # Generate metadata
    generate_metadata
    
    log "success" "Theme build completed successfully!"
    log "info" "Output directory: $BUILD_DIR"
}

# Run main function
main "$@"
```

## JSON Configuration Example

```json title:"Theme Configuration"
{
    "themes": {
        "light": {
            "id": "light",
            "name": "Light",
            "description": "Clean light theme for daytime use",
            "type": "light",
            "colors": {
                "primary": "#3b82f6",
                "secondary": "#10b981",
                "background": "#ffffff",
                "surface": "#f9fafb",
                "text": {
                    "primary": "#111827",
                    "secondary": "#6b7280",
                    "muted": "#9ca3af"
                },
                "syntax": {
                    "keyword": "#2563eb",
                    "string": "#059669",
                    "number": "#dc2626",
                    "function": "#7c3aed",
                    "comment": "#6b7280"
                }
            },
            "customizations": {
                "scrollbar": true,
                "selection": true,
                "forms": true
            }
        },
        "dracula": {
            "id": "dracula",
            "name": "Dracula",
            "description": "Dark theme with vibrant colors",
            "type": "dark",
            "colors": {
                "primary": "#bd93f9",
                "secondary": "#50fa7b",
                "background": "#282a36",
                "surface": "#21222c",
                "text": {
                    "primary": "#f8f8f2",
                    "secondary": "#6272a4",
                    "muted": "#6272a4"
                },
                "syntax": {
                    "keyword": "#ff79c6",
                    "string": "#f1fa8c",
                    "number": "#bd93f9",
                    "function": "#50fa7b",
                    "comment": "#6272a4"
                }
            },
            "customizations": {
                "scrollbar": true,
                "selection": true,
                "forms": true
            }
        }
    },
    "defaultTheme": "light",
    "autoDetect": true,
    "transitions": {
        "enabled": true,
        "duration": "250ms",
        "easing": "ease-in-out"
    }
}
```

## SQL Example

```sql title:"Theme Usage Analytics"
-- Create tables for theme usage tracking
CREATE TABLE IF NOT EXISTS theme_usage (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    theme_id VARCHAR(50) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_duration INTEGER, -- in seconds
    device_type VARCHAR(20),
    browser VARCHAR(50),
    system_theme VARCHAR(10) -- 'light' or 'dark'
);

-- Index for performance
CREATE INDEX idx_theme_usage_user_theme ON theme_usage(user_id, theme_id);
CREATE INDEX idx_theme_usage_applied_at ON theme_usage(applied_at);

-- View for theme popularity
CREATE OR REPLACE VIEW theme_popularity AS
SELECT 
    theme_id,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(*) as total_applications,
    AVG(session_duration) as avg_session_duration,
    MAX(applied_at) as last_used
FROM theme_usage
WHERE applied_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY theme_id
ORDER BY unique_users DESC;

-- Function to get user's theme history
CREATE OR REPLACE FUNCTION get_user_theme_history(p_user_id INTEGER)
RETURNS TABLE (
    theme_id VARCHAR(50),
    applied_at TIMESTAMP,
    duration_hours NUMERIC,
    device_type VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    WITH theme_sessions AS (
        SELECT 
            tu.theme_id,
            tu.applied_at,
            tu.device_type,
            LEAD(tu.applied_at) OVER (
                PARTITION BY tu.user_id 
                ORDER BY tu.applied_at
            ) as next_applied_at
        FROM theme_usage tu
        WHERE tu.user_id = p_user_id
    )
    SELECT 
        ts.theme_id,
        ts.applied_at,
        ROUND(
            EXTRACT(EPOCH FROM (
                COALESCE(ts.next_applied_at, CURRENT_TIMESTAMP) - ts.applied_at
            )) / 3600, 
            2
        ) as duration_hours,
        ts.device_type
    FROM theme_sessions ts
    ORDER BY ts.applied_at DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Query to find most popular themes by time of day
WITH hourly_usage AS (
    SELECT 
        theme_id,
        EXTRACT(HOUR FROM applied_at) as hour_of_day,
        COUNT(*) as usage_count
    FROM theme_usage
    WHERE applied_at >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY theme_id, hour_of_day
),
ranked_themes AS (
    SELECT 
        hour_of_day,
        theme_id,
        usage_count,
        ROW_NUMBER() OVER (
            PARTITION BY hour_of_day 
            ORDER BY usage_count DESC
        ) as rank
    FROM hourly_usage
)
SELECT 
    hour_of_day,
    theme_id as most_popular_theme,
    usage_count
FROM ranked_themes
WHERE rank = 1
ORDER BY hour_of_day;
```

## YAML Configuration

```yaml title:"Theme Build Configuration"
# Theme build configuration file
version: 1.0.0
build:
  input_dir: ./themes
  output_dir: ./dist/themes
  
  # Minification settings
  minify:
    enabled: true
    remove_comments: true
    remove_whitespace: true
    merge_media_queries: true
    
  # Optimization settings
  optimize:
    merge_similar_rules: true
    remove_unused_css: false
    inline_critical_css: false

# Theme definitions
themes:
  - id: light
    file: light.css
    type: light
    default: true
    
  - id: dark
    file: dark.css
    type: dark
    
  - id: vscode-dark-plus
    file: vscode-dark-plus.css
    type: dark
    category: editor
    
  - id: monokai
    file: monokai.css
    type: dark
    category: editor
    
  - id: dracula
    file: dracula.css
    type: dark
    category: popular
    
  - id: one-dark-pro
    file: one-dark-pro.css
    type: dark
    category: editor
    
  - id: solarized-light
    file: solarized-light.css
    type: light
    category: classic
    
  - id: solarized-dark
    file: solarized-dark.css
    type: dark
    category: classic
    
  - id: github-light
    file: github-light.css
    type: light
    category: git
    
  - id: github-dark
    file: github-dark.css
    type: dark
    category: git
    
  - id: nord
    file: nord.css
    type: dark
    category: nordic
    
  - id: gruvbox-dark
    file: gruvbox-dark.css
    type: dark
    category: retro
    
  - id: gruvbox-light
    file: gruvbox-light.css
    type: light
    category: retro
    
  - id: tokyo-night
    file: tokyo-night.css
    type: dark
    category: modern
    
  - id: palenight
    file: palenight.css
    type: dark
    category: material

# Auto theme detection
auto_theme:
  enabled: true
  light_themes: [light, solarized-light, github-light, gruvbox-light]
  dark_themes: [dark, vscode-dark-plus, monokai, dracula, one-dark-pro, 
                solarized-dark, github-dark, nord, gruvbox-dark, 
                tokyo-night, palenight]
  
  # Time-based switching (optional)
  schedule:
    enabled: false
    light_start: "06:00"
    dark_start: "18:00"

# Theme preview settings
preview:
  delay_ms: 200
  restore_on_leave: true
  show_color_swatches: true
```

## Collapsible Code Example

```javascript title:"Collapsible Example" collapse:"true"
// This code block is collapsible!
// Click the arrow to expand/collapse

function generateThemeCSS(theme) {
    const { colors, typography, spacing } = theme;
    
    return `
        :root[data-theme="${theme.id}"] {
            /* Color System */
            --color-primary: ${colors.primary};
            --color-secondary: ${colors.secondary};
            --color-accent: ${colors.accent};
            --color-background: ${colors.background};
            --color-surface: ${colors.surface};
            --color-text: ${colors.text};
            --color-text-muted: ${colors.textMuted};
            
            /* Typography */
            --font-family: ${typography.fontFamily};
            --font-size-base: ${typography.sizeBase};
            --line-height-base: ${typography.lineHeight};
            
            /* Spacing */
            --spacing-unit: ${spacing.unit};
            --spacing-xs: calc(var(--spacing-unit) * 0.25);
            --spacing-sm: calc(var(--spacing-unit) * 0.5);
            --spacing-md: var(--spacing-unit);
            --spacing-lg: calc(var(--spacing-unit) * 1.5);
            --spacing-xl: calc(var(--spacing-unit) * 2);
        }
    `;
}

// Generate CSS for all themes
const themes = getThemeDefinitions();
const cssOutput = themes.map(generateThemeCSS).join('\n\n');

console.log('Generated theme CSS:', cssOutput);
```

## Testing Notes

When testing themes, pay attention to:

1. **Color Contrast** - Ensure text is readable against backgrounds
2. **Syntax Highlighting** - All token types should be distinguishable
3. **UI Elements** - Buttons, links, and interactive elements should be visible
4. **Code Blocks** - Headers, titles, and copy buttons should be styled appropriately
5. **Transitions** - Theme switching should be smooth without flashing
6. **Hover States** - Interactive elements should have clear hover feedback
7. **Selection Colors** - Text selection should be visible and pleasant
8. **Scrollbars** - Custom scrollbar styling should match the theme

## Theme Implementation Complete!

All 15 themes have been successfully implemented with:

- ✅ Full CSS custom property definitions
- ✅ Comprehensive syntax highlighting for all languages
- ✅ Smooth theme preview on hover
- ✅ System theme detection (auto light/dark)
- ✅ Persistent theme selection
- ✅ Responsive and accessible design
- ✅ Beautiful, consistent styling across all themes

Try switching between themes using the theme picker in the header to see the magic happen! 🎨