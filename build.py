#!/usr/bin/env python3

"""
Build script for Notes Wiki
Scans the notes directory and generates notes-index.json
"""

import os
import json
import re
from datetime import datetime
import yaml

# Configuration
NOTES_DIR = os.path.join(os.path.dirname(__file__), 'notes')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'notes-index.json')
MARKDOWN_EXTENSION = '.md'

# Initialize data structures
notes_index = {
    'notes': [],
    'tags': {},
    'authors': set(),
    'categories': set()
}

def extract_code_blocks(content):
    """Extract code blocks from markdown content"""
    code_blocks = []
    # Match both fenced code blocks with ``` and ```language
    code_block_regex = r'```(\w*)\s*(?:title:"([^"]+)")?\n([\s\S]*?)```'
    
    for match in re.finditer(code_block_regex, content):
        language = match.group(1) or 'text'
        title = match.group(2) or ''
        code = match.group(3).strip()
        
        # Limit code block size to prevent huge indices
        if len(code) > 1000:
            code = code[:1000] + '... (truncated)'
        
        code_blocks.append({
            'language': language,
            'title': title,
            'code': code
        })
    
    return code_blocks

def create_searchable_content(text_preview, code_blocks):
    """Create searchable content combining text and code"""
    # Start with text preview
    searchable_parts = [text_preview]
    
    # Add code block content (limit total size)
    total_length = len(text_preview)
    max_total_length = 2000  # Maximum total searchable content
    
    for block in code_blocks:
        # Add language and title if present
        if block['title']:
            searchable_parts.append(f"{block['language']} {block['title']}")
        
        # Add code content
        code_snippet = block['code']
        if total_length + len(code_snippet) > max_total_length:
            # Truncate to fit within limit
            remaining = max_total_length - total_length
            if remaining > 50:  # Only add if we have reasonable space
                searchable_parts.append(code_snippet[:remaining])
            break
        else:
            searchable_parts.append(code_snippet)
            total_length += len(code_snippet)
    
    return ' '.join(searchable_parts)

def parse_frontmatter(content):
    """Parse frontmatter from markdown content"""
    frontmatter_regex = r'^---\n([\s\S]*?)\n---\n([\s\S]*)$'
    match = re.match(frontmatter_regex, content)
    
    if match:
        try:
            metadata = yaml.safe_load(match.group(1))
            content_body = match.group(2)
            
            # Extract code blocks before stripping markdown
            code_blocks = extract_code_blocks(content_body)
            
            # Extract content preview (first 200 characters of content)
            content_preview = content_body
            # Remove headers
            content_preview = re.sub(r'^#+\s+.*$', '', content_preview, flags=re.MULTILINE)
            # Remove links
            content_preview = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', content_preview)
            # Remove formatting
            content_preview = re.sub(r'[*_~`]', '', content_preview)
            content_preview = content_preview.strip()[:200]
            
            # Create searchable content that includes text preview and code blocks
            searchable_content = create_searchable_content(content_preview, code_blocks)
            
            return {
                'metadata': metadata or {},
                'content': content_body,
                'contentPreview': content_preview + ('...' if len(content_preview) >= 200 else ''),
                'searchableContent': searchable_content,
                'codeBlocks': code_blocks
            }
        except Exception as e:
            print(f"Error parsing frontmatter: {e}")
            return None
    
    # No frontmatter found
    # Extract code blocks from content
    code_blocks = extract_code_blocks(content)
    content_preview = content[:200]
    searchable_content = create_searchable_content(content_preview, code_blocks)
    
    return {
        'metadata': {
            'title': 'Untitled',
            'tags': [],
            'created': datetime.now().strftime('%Y-%m-%d'),
            'author': 'Unknown'
        },
        'content': content,
        'contentPreview': content_preview + ('...' if len(content) > 200 else ''),
        'searchableContent': searchable_content,
        'codeBlocks': code_blocks
    }

def get_contexts():
    """Get all top-level directories as contexts"""
    contexts = []
    
    # Get all top-level directories in notes directory
    for item in os.listdir(NOTES_DIR):
        item_path = os.path.join(NOTES_DIR, item)
        if os.path.isdir(item_path):
            # Count notes in this context
            note_count = 0
            for root, dirs, files in os.walk(item_path):
                note_count += sum(1 for f in files if f.endswith(MARKDOWN_EXTENSION))
            
            contexts.append({
                'id': item,
                'name': item.replace('-', ' ').replace('_', ' ').title(),
                'noteCount': note_count
            })
    
    return contexts

def scan_directory(dir_path, base_dir=None):
    """Recursively scan directory for markdown files"""
    if base_dir is None:
        base_dir = NOTES_DIR
    
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith(MARKDOWN_EXTENSION):
                file_path = os.path.join(root, file)
                process_markdown_file(file_path, base_dir)

def process_markdown_file(file_path, base_dir):
    """Process a single markdown file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        parsed = parse_frontmatter(content)
        
        if not parsed:
            print(f"Skipping file with invalid frontmatter: {file_path}")
            return
        
        metadata = parsed['metadata']
        content_preview = parsed['contentPreview']
        searchable_content = parsed.get('searchableContent', content_preview)
        code_blocks = parsed.get('codeBlocks', [])
        
        # Create relative path for the index
        relative_path = '/notes/' + os.path.relpath(file_path, base_dir).replace('\\', '/')
        
        # Determine context (top-level folder) from path
        path_parts = relative_path.split('/')
        context = None
        if len(path_parts) > 2:  # /notes/context/...
            # Check if the second part is a directory (not a file in root)
            potential_context = path_parts[2]
            context_path = os.path.join(NOTES_DIR, potential_context)
            if os.path.isdir(context_path):
                context = potential_context
        
        # Add note to index
        note_entry = {
            'path': relative_path,
            'context': context,  # Add context field
            'metadata': {
                'title': metadata.get('title', 'Untitled'),
                'tags': metadata.get('tags', []) if isinstance(metadata.get('tags'), list) else [],
                'created': str(metadata.get('created', datetime.now().strftime('%Y-%m-%d'))),
                'author': metadata.get('author', 'Unknown'),
                'description': metadata.get('description', ''),
                'updated': str(metadata.get('updated')) if metadata.get('updated') else None,
                'category': metadata.get('category'),
                'status': metadata.get('status')
            },
            'content_preview': content_preview,
            'searchable_content': searchable_content,
            'code_blocks_count': len(code_blocks)
        }
        
        notes_index['notes'].append(note_entry)
        
        # Update tags count
        if metadata.get('tags') and isinstance(metadata.get('tags'), list):
            for tag in metadata['tags']:
                notes_index['tags'][tag] = notes_index['tags'].get(tag, 0) + 1
        
        # Collect authors
        if metadata.get('author'):
            notes_index['authors'].add(metadata['author'])
        
        # Collect categories
        if metadata.get('category'):
            notes_index['categories'].add(metadata['category'])
        
        print(f"✓ Processed: {relative_path}")
        
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")

def get_theme_info():
    """Get information about available themes"""
    themes_dir = os.path.join(os.path.dirname(__file__), 'themes')
    theme_files = []
    
    if os.path.exists(themes_dir):
        for filename in os.listdir(themes_dir):
            if filename.endswith('.css'):
                theme_files.append(filename)
    
    return sorted(theme_files)

def build():
    """Main build function"""
    print("Building notes index...\n")
    
    # Check if notes directory exists
    if not os.path.exists(NOTES_DIR):
        print(f"Notes directory not found: {NOTES_DIR}")
        exit(1)
    
    # Scan the notes directory
    scan_directory(NOTES_DIR)
    
    # Get contexts
    contexts = get_contexts()
    
    # Convert sets to lists for JSON serialization
    final_index = {
        'notes': notes_index['notes'],
        'tags': notes_index['tags'],
        'authors': list(notes_index['authors']),
        'categories': list(notes_index['categories']),
        'contexts': contexts,  # Add contexts to index
        'generated': datetime.now().isoformat(),
        'totalNotes': len(notes_index['notes'])
    }
    
    # Sort notes by creation date (newest first)
    final_index['notes'].sort(
        key=lambda x: x['metadata'].get('created', ''),
        reverse=True
    )
    
    # Write the index file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_index, f, indent=2)
    
    # Get theme information
    themes = get_theme_info()
    
    print(f"\n✅ Build complete!")
    print(f"📊 Stats:")
    print(f"   - Total notes: {final_index['totalNotes']}")
    print(f"   - Total contexts: {len(final_index['contexts'])}")
    print(f"   - Total tags: {len(final_index['tags'])}")
    print(f"   - Total authors: {len(final_index['authors'])}")
    print(f"   - Total categories: {len(final_index['categories'])}")
    print(f"   - Total themes: {len(themes)}")
    print(f"\n📁 Output: {OUTPUT_FILE}")
    
    # List contexts
    if contexts:
        print(f"\n📂 Contexts ({len(contexts)}):")
        for ctx in contexts:
            print(f"   - {ctx['name']} ({ctx['noteCount']} notes)")
    
    # List available themes
    if themes:
        print(f"\n🎨 Available themes ({len(themes)}):")
        for theme in themes:
            theme_name = theme.replace('.css', '').replace('-', ' ').title()
            print(f"   - {theme_name} ({theme})")

if __name__ == '__main__':
    build()