#!/bin/bash

# Font Download Script for Notes Wiki
# This script downloads open-source fonts for self-contained usage

echo "Font Download Script for Notes Wiki"
echo "==================================="
echo ""
echo "This script will download open-source fonts."
echo "Make sure you have wget or curl installed."
echo ""

# Create font directory if it doesn't exist
mkdir -p .

# Function to download with either wget or curl
download_file() {
    local url=$1
    local output=$2
    
    if command -v wget &> /dev/null; then
        wget -O "$output" "$url"
    elif command -v curl &> /dev/null; then
        curl -L -o "$output" "$url"
    else
        echo "Error: Neither wget nor curl is installed."
        exit 1
    fi
}

echo "Downloading JetBrains Mono fonts..."
# JetBrains Mono is available from their GitHub releases
# Latest version as of writing: 3.0.0
JETBRAINS_VERSION="v3.0.0"
JETBRAINS_BASE="https://github.com/JetBrains/JetBrainsMono/releases/download/${JETBRAINS_VERSION}"

download_file "${JETBRAINS_BASE}/JetBrainsMono-3.0.0.zip" "JetBrainsMono.zip"

echo ""
echo "Downloading Inter fonts..."
# Inter is available from their GitHub releases
# Latest version as of writing: 4.0
INTER_VERSION="v4.0"
INTER_BASE="https://github.com/rsms/inter/releases/download/${INTER_VERSION}"

download_file "${INTER_BASE}/Inter-4.0.zip" "Inter.zip"

echo ""
echo "Extracting fonts..."

# Extract JetBrains Mono
if command -v unzip &> /dev/null; then
    unzip -q JetBrainsMono.zip
    # Copy only the web fonts we need
    cp -f fonts/webfonts/JetBrainsMono-Regular.woff2 ./
    cp -f fonts/webfonts/JetBrainsMono-Bold.woff2 ./
    cp -f fonts/webfonts/JetBrainsMono-Italic.woff2 ./
    cp -f fonts/webfonts/JetBrainsMono-BoldItalic.woff2 ./
    
    # Extract Inter
    unzip -q Inter.zip
    # Copy only the web fonts we need
    cp -f web/Inter-Regular.woff2 ./
    cp -f web/Inter-Bold.woff2 ./
    cp -f web/Inter-Italic.woff2 ./
    cp -f web/Inter-BoldItalic.woff2 ./
    
    # Clean up
    rm -rf fonts/ web/ JetBrainsMono.zip Inter.zip
    rm -f *.pdf *.txt  # Remove documentation files
    
    echo ""
    echo "Fonts successfully downloaded and extracted!"
    echo ""
    echo "The following font files are now available:"
    ls -la *.woff2
else
    echo "Error: unzip is not installed. Please extract the zip files manually."
    exit 1
fi

echo ""
echo "Next steps:"
echo "1. The fonts are now in the fonts/ directory"
echo "2. The fonts.css file is already configured to use these fonts"
echo "3. Test the fonts by opening test-fonts.html in your browser"
echo ""
echo "Done!"