---
title: Git Commands Reference
tags: [git, version-control, reference, commands]
created: 2024-01-08
author: DevOps Team
description: Comprehensive Git command reference with examples
updated: 2024-03-05
category: reference
status: published
---

# Git Commands Reference

## Basic Commands

### Configuration
```bash
# Set user information
git config --global user.name "John Doe"
git config --global user.email "john@example.com"

# Set default editor
git config --global core.editor "vim"

# Enable color output
git config --global color.ui auto

# List all configurations
git config --list

# Get specific config value
git config user.name
```

### Repository Initialization
```bash
# Initialize new repository
git init

# Clone existing repository
git clone https://github.com/user/repo.git

# Clone with specific branch
git clone -b develop https://github.com/user/repo.git

# Clone with depth (shallow clone)
git clone --depth 1 https://github.com/user/repo.git
```

## Working with Changes

### Status and Differences
```bash
# Check status
git status

# Short status
git status -s

# Show changes in working directory
git diff

# Show staged changes
git diff --staged

# Show changes between commits
git diff commit1 commit2

# Show changes for specific file
git diff HEAD -- path/to/file
```

### Staging and Committing
```bash
# Stage specific files
git add file1.txt file2.txt

# Stage all changes
git add .

# Stage parts of files interactively
git add -p

# Commit with message
git commit -m "Add new feature"

# Commit with detailed message
git commit

# Amend last commit
git commit --amend

# Commit with specific author
git commit --author="Name <email@example.com>"
```

## Branching and Merging

### Branch Management
```bash
# List branches
git branch

# List all branches (including remote)
git branch -a

# Create new branch
git branch feature-branch

# Create and switch to branch
git checkout -b feature-branch

# Switch branches
git checkout main

# Delete branch
git branch -d feature-branch

# Force delete branch
git branch -D feature-branch

# Rename branch
git branch -m old-name new-name
```

### Merging
```bash
# Merge branch into current branch
git merge feature-branch

# Merge with no fast-forward
git merge --no-ff feature-branch

# Abort merge
git merge --abort

# Continue merge after conflicts
git merge --continue
```

### Rebasing
```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase
git rebase -i HEAD~3

# Continue rebase after conflicts
git rebase --continue

# Abort rebase
git rebase --abort

# Skip current commit during rebase
git rebase --skip
```

## Remote Repositories

### Remote Management
```bash
# List remotes
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream

# Show remote details
git remote show origin
```

### Pushing and Pulling
```bash
# Push to remote
git push origin main

# Push and set upstream
git push -u origin feature-branch

# Force push (use with caution!)
git push --force

# Push tags
git push --tags

# Pull from remote
git pull origin main

# Pull with rebase
git pull --rebase

# Fetch without merging
git fetch origin

# Fetch all remotes
git fetch --all
```

## History and Logs

### Viewing History
```bash
# Show commit logs
git log

# One line per commit
git log --oneline

# Show graph
git log --graph --oneline --all

# Show commits by author
git log --author="John"

# Show commits since date
git log --since="2024-01-01"

# Show commits with changes
git log -p

# Show file history
git log --follow path/to/file

# Custom format
git log --pretty=format:"%h - %an, %ar : %s"
```

### Searching
```bash
# Search commit messages
git log --grep="fix"

# Search code changes
git log -S "function_name"

# Find commits that changed specific lines
git blame path/to/file

# Binary search for bug
git bisect start
git bisect bad
git bisect good commit-hash
```

## Undoing Changes

### Reset and Revert
```bash
# Unstage files
git reset HEAD file.txt

# Reset to previous commit (keep changes)
git reset --soft HEAD~1

# Reset to previous commit (discard changes)
git reset --hard HEAD~1

# Reset specific file to HEAD
git checkout -- file.txt

# Create revert commit
git revert commit-hash

# Revert without committing
git revert -n commit-hash
```

### Stashing
```bash
# Stash changes
git stash

# Stash with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Pop latest stash
git stash pop

# Drop stash
git stash drop stash@{1}

# Clear all stashes
git stash clear
```

## Advanced Commands

### Cherry-picking
```bash
# Apply specific commit
git cherry-pick commit-hash

# Cherry-pick range
git cherry-pick commit1..commit2

# Cherry-pick without committing
git cherry-pick -n commit-hash
```

### Submodules
```bash
# Add submodule
git submodule add https://github.com/user/repo.git path/to/submodule

# Initialize submodules
git submodule init

# Update submodules
git submodule update

# Clone with submodules
git clone --recurse-submodules https://github.com/user/repo.git
```

### Worktrees
```bash
# Add worktree
git worktree add ../feature-branch feature-branch

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../feature-branch
```

## Git Aliases

```bash
# Common aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# Complex aliases
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

git config --global alias.undo "reset --soft HEAD~1"

git config --global alias.last "log -1 HEAD"
```

## Troubleshooting

### Common Fixes
```bash
# Fix wrong commit message
git commit --amend -m "New message"

# Remove file from staging
git reset HEAD file.txt

# Undo last commit but keep changes
git reset --soft HEAD~1

# Fix wrong branch commits
git cherry-pick commit-hash
git reset --hard HEAD~1

# Clean untracked files
git clean -fd

# Recover deleted branch
git reflog
git checkout -b recovered-branch commit-hash
```

### Performance
```bash
# Garbage collection
git gc

# Prune unreachable objects
git prune

# Verify repository
git fsck

# Repack repository
git repack -a -d
```

## Best Practices

1. **Commit messages**: Use imperative mood ("Add feature" not "Added feature")
2. **Branch naming**: Use descriptive names (feature/user-auth, bugfix/login-error)
3. **Small commits**: Make atomic commits that do one thing
4. **Pull before push**: Always pull latest changes before pushing
5. **Use .gitignore**: Don't track unnecessary files
6. **Review before committing**: Use `git diff --staged`