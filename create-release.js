#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read version from package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const version = pkg.version;
const releaseName = `notes-wiki-v${version}-complete`;

console.log(`📦 Creating release package: ${releaseName}.zip`);
console.log('');

// Files and folders to include
const includes = [
    'index.html',
    '404.html',
    'style.css',
    'script.js',
    'libs',
    'themes',
    'fonts',  // Include fonts directory
    'notes',
    'images',
    'build.py',
    'package.json',
    'README.md',
    'CLAUDE.md',
    'CUSTOMIZATION.md',
    '_config.yml',
    '.nojekyll',  // Include Jekyll bypass file
    'notes-index.json'  // Include the built index
];

// GitLab-specific files to create for release packages
const gitlabFiles = [
    '.gitlab-ci.yml',
    'GITLAB-DEPLOYMENT.md'
];

console.log('📋 Preparing GitLab files for release...');

// Copy GitLab files from gitlab-files directory to root for packaging
try {
    gitlabFiles.forEach(file => {
        const sourcePath = path.join('gitlab-files', file);
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, file);
            console.log(`  ✓ Copied ${file} from gitlab-files/`);
        } else {
            console.log(`  ⚠️  Warning: ${sourcePath} not found`);
        }
    });
} catch (error) {
    console.error('❌ Error copying GitLab files:', error.message);
}

// Create zip command (now includes GitLab files)
const allIncludes = [...includes, ...gitlabFiles];
const zipCommand = `zip -r ${releaseName}.zip ${allIncludes.join(' ')}`;

try {
    // Run the zip command
    execSync(zipCommand, { stdio: 'inherit' });
    
    // Get file size
    const stats = fs.statSync(`${releaseName}.zip`);
    const fileSizeInMB = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log('');
    console.log(`✅ Release package created successfully!`);
    console.log(`📄 File: ${releaseName}.zip`);
    console.log(`📊 Size: ${fileSizeInMB} MB`);
    console.log('');
    console.log('📋 Package contents:');
    console.log('  - Complete application (HTML, CSS, JS)');
    console.log('  - All libraries (marked, prism, js-yaml)');
    console.log('  - 150 professional themes in 11 categories');
    console.log('  - Font files (Inter, JetBrains Mono)');
    console.log('  - All documentation and notes');
    console.log('  - Build tools and configuration');
    console.log('  - GitLab CI/CD configuration');
    console.log('  - Jekyll bypass file (.nojekyll)');
    console.log('');
    console.log('🚀 Ready for deployment to GitHub or GitLab Pages!');
    
    // Clean up temporary GitLab files
    console.log('');
    console.log('🧹 Cleaning up temporary files...');
    gitlabFiles.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
                console.log(`  ✓ Removed temporary ${file}`);
            }
        } catch (err) {
            console.log(`  ⚠️  Could not remove ${file}: ${err.message}`);
        }
    });
    
} catch (error) {
    console.error('❌ Error creating release package:', error.message);
    
    // Clean up on error too
    gitlabFiles.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        } catch (err) {
            // Silent cleanup on error
        }
    });
    
    process.exit(1);
}