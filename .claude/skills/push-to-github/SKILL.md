# push-to-github

---
description: Commit changes and push to GitHub following project git conventions
alwaysApply: false
---

## Purpose

Automate the git workflow from staged changes to pull request creation. Ensures conventional commit messages and well-documented PRs.

---

## When to Use

- User wants to push code to GitHub
- Creating a pull request
- Committing completed work
- **Trigger phrases**: "push to github", "create PR", "commit and push", "ready to merge", "submit changes"

---

## Prerequisites

1. **Git configured**: `git config user.name` and `git config user.email` set
2. **On a branch**: Should NOT be on `main` for feature work
3. **GitHub CLI**: `gh` CLI for PR creation

---

## Workflow

### Step 1: Pre-flight Checks

```
CHECK current branch:
  IF on main AND has changes:
    -> WARN: "You're on the main branch. Create a feature branch first?"
    -> SUGGEST: git checkout -b feature/{description}

CHECK for uncommitted changes:
  git status --porcelain
  IF no changes:
    -> "No changes to commit."
    -> STOP
```

### Step 1.5: Check for Untracked Source Files (MANDATORY)

```
CHECK for untracked source files:
  git status --porcelain | filter for source file extensions

  IF untracked source files found:
    -> WARNING: Untracked source files detected!
    -> List all untracked source files with paths
    -> ASK: "These files are NOT staged for commit. Actions:"
      1. Add all to this commit
      2. Add to .gitignore (if intentionally excluded)
      3. Review each file individually
    -> REQUIRE explicit user decision before proceeding

  IF no untracked source files:
    -> Continue to Step 2
```

**Source file patterns to check:**
- `.ts`, `.tsx` - TypeScript/React files
- `.js`, `.jsx` - JavaScript files
- `.css` - Stylesheets
- `.mdx`, `.md` - Content/documentation
- `.json` - Configuration files (in src/ or app/ directories)

### Step 2: Review Changes

```
git status
git diff --stat

Present summary to user:
  Changes to commit:
    Modified: {N} files
    Added: {N} files
    Deleted: {N} files

  Files:
    M  app/page.tsx
    A  src/components/Hero.tsx
    ...

  Proceed with commit? (y/n)
```

### Step 3: Stage Changes

```
# Stage all changes (default)
git add .

# Or stage specific files if user requests
git add {specific files}
```

### Step 4: Generate Commit Message

Follow **Conventional Commits** format:

```
{type}({scope}): {description}
```

#### Commit Types

| Type | When to Use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change that neither fixes nor adds |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `chore` | Build process, dependencies, tooling |

#### Scope (Website-specific)

| Scope | Area |
|-------|------|
| `site` | General site/layout changes |
| `blog` | Blog/MDX content system |
| `contact` | Contact form and API |
| `seo` | SEO, metadata, sitemap, RSS |
| `video` | Video embed component |
| `infra` | Azure/deployment configuration |
| `deps` | Dependency updates |
| `ui` | Component/styling changes |

#### Generate Message

```
ANALYZE changed files to determine:
  - Primary type (feat/fix/refactor/etc.)
  - Scope (site/blog/contact/etc.)
  - Brief description (imperative mood, <50 chars)

PROPOSE commit message:
  "{type}({scope}): {description}"

ASK user to confirm or modify
```

**Example messages:**
- `feat(blog): add MDX rendering and post routing`
- `feat(contact): implement form validation and API endpoint`
- `fix(seo): add missing OpenGraph tags to blog posts`
- `chore(deps): update Next.js to 15.x`
- `feat(site): implement responsive header and footer`

### Step 5: Commit

```
git commit -m "{approved message}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Step 6: Push to Remote

```
# Push current branch to origin
git push origin HEAD

# If branch doesn't exist on remote yet
git push -u origin HEAD
```

### Step 7: Create or Update Pull Request

#### First: Check for Existing PR

```
gh pr list --head {current-branch} --state open --json number,url,title

IF PR exists:
  -> "PR #{number} already exists: {title}"
  -> "Changes pushed to existing PR."
  -> DONE

IF no PR exists:
  -> "No PR found for branch '{branch}'. Create one? (y/n)"
  -> IF no: Provide compare URL and DONE
  -> IF yes: Continue to PR creation
```

#### Create New PR

```
gh pr create --title "{title}" --body "$(cat <<'EOF'
## Summary
{Brief description of changes}

## Changes
- {Change 1}
- {Change 2}

## Testing
- [ ] Runs locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Lint passes (`npm run lint`)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

### Step 8: Summary

```
Push Complete

Branch: {branch-name}
Commit: {short-sha} - {commit message}
PR: {PR URL}

Next steps:
1. Verify build succeeds
2. Review PR preview (if SWA preview enabled)
3. Merge when ready
```

---

## Conventions

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/{description}` | `feature/blog-system` |
| Bug fix | `fix/{description}` | `fix/contact-form-validation` |
| Project | `feature/{project-name}` | `feature/website-version-1` |

### Commit Message Rules

- **Imperative mood**: "add feature" not "added feature"
- **No period** at end of subject line
- **Subject <= 50 chars**, body <= 72 chars per line
- **Reference issues** in footer: `Closes #123` or `Refs #456`

---

## Error Handling

| Situation | Response |
|-----------|----------|
| On main branch | Warn user, suggest creating feature branch |
| No changes to commit | Inform user, stop workflow |
| Push rejected (behind remote) | Suggest `git pull --rebase origin {branch}` |
| Push rejected (no upstream) | Use `git push -u origin HEAD` |
| `gh` CLI not available | Fall back to providing compare URL |
| Merge conflicts | Stop and guide user through resolution |

---

## Quick Reference

```bash
# Full workflow in commands
git status                              # Review changes
git add .                               # Stage all
git commit -m "type(scope): message"    # Commit
git push origin HEAD                    # Push
gh pr create                            # Create PR
```

---

*Streamlined git workflow for website development.*
