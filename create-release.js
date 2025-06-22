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
    'DEPLOYMENT-GUIDE.md',
    'GITLAB-DEPLOYMENT.md',
    '_config.yml',
    '.gitlab-ci.yml',
    '.nojekyll',  // Include Jekyll bypass file
    'notes-index.json'  // Include the built index
];

// Create zip command
const zipCommand = `zip -r ${releaseName}.zip ${includes.join(' ')}`;

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
    console.log('  - 70 themes');
    console.log('  - All documentation and notes');
    console.log('  - Build tools and configuration');
    console.log('  - GitLab CI/CD configuration');
    console.log('  - Jekyll bypass file (.nojekyll)');
    console.log('');
    console.log('🚀 Ready for deployment to GitLab Pages!');
} catch (error) {
    console.error('❌ Error creating release package:', error.message);
    process.exit(1);
}