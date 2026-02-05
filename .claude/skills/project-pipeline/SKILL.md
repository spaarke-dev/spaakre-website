# project-pipeline

---
description: Automated pipeline from spec.md to ready-to-execute tasks with human-in-loop confirmation
tags: [project-pipeline, orchestration, automation]
techStack: [nextjs, typescript, azure, tailwind, mdx]
appliesTo: ["projects/*/", "start project", "initialize project"]
alwaysApply: false
---

## Purpose

**Orchestrator Skill** - Streamlined end-to-end project initialization pipeline that chains: spec.md validation -> Plan generation -> Task decomposition -> Feature branch -> Ready to execute Task 001.

**Key Features**:
- Human-in-loop confirmations after each major step
- Generates project artifacts (README, plan, tasks)
- Creates feature branch for isolation
- Optional auto-start of task 001

**Human-in-Loop**: After each step, present results and ask for confirmation before proceeding. Default to "proceed" (user just says 'y').

---

## When to Use

- User says "start project", "initialize project", or "run project pipeline"
- Explicitly invoked with `/project-pipeline {project-path}`
- A `spec.md` file exists at `projects/{project-name}/spec.md`

---

## Pipeline Steps

### Step 1: Validate spec.md

```
LOAD: projects/{project-name}/spec.md

VALIDATE:
  - File exists and is readable
  - Contains required sections:
    - Executive Summary / Purpose
    - Scope definition
    - Requirements
    - Success criteria
  - Minimum 300 words (meaningful content)

IF validation fails:
  -> STOP - List missing elements
  -> Offer to help complete spec.md or run /design-to-spec
```

**Output to User:**
```
spec.md validated:
  - {N} words
  - All required sections present
  - Ready for planning

Next Step: Generate plan.md and project artifacts

[Y to proceed / refine to make changes / stop to exit]
```

**Wait for User**: `y` | `refine {instructions}` | `stop`

---

### Step 2: Generate Project Artifacts

**Action:**
```
FROM spec.md, CREATE:

1. projects/{project-name}/README.md
   - Project overview (from spec Executive Summary)
   - Tech stack summary
   - Local development setup instructions
   - Deployment instructions
   - How to add blog posts (if applicable)
   - Status: In Progress
   - Links to plan.md and spec.md

2. projects/{project-name}/plan.md
   - Implementation plan derived from spec.md
   - Phase breakdown with deliverables
   - Milestones and acceptance criteria per phase
   - Dependencies between phases
   - Risk items from spec.md

3. projects/{project-name}/current-task.md
   - Active task state tracker (for context recovery across sessions)
   - Initial state: no active task

4. Folder structure:
   - projects/{project-name}/tasks/     (for task files)
   - projects/{project-name}/notes/     (for implementation notes)
```

**Output to User:**
```
Artifacts generated:
  - README.md (project overview)
  - plan.md ({N} phases, {M} milestones)
  - current-task.md (context recovery tracker)
  - Folder structure created

Files created:
  - projects/{project-name}/README.md
  - projects/{project-name}/plan.md
  - projects/{project-name}/current-task.md
  - projects/{project-name}/tasks/
  - projects/{project-name}/notes/

Next Step: Decompose plan into executable task files

[Y to proceed / review to view artifacts / refine {file} to edit / stop to exit]
```

**Wait for User**: `y` | `review` | `refine {instructions}` | `stop`

---

### Step 3: Generate Task Files

**Action:**
```
LOAD:
  - projects/{project-name}/plan.md (Phase Breakdown section)

FOR each phase in plan.md:
  FOR each deliverable/objective:
    DECOMPOSE into discrete tasks (2-4 hour chunks)

    APPLY numbering scheme:
      - Phase 0 tasks: 001, 002, 003...
      - Phase 1 tasks: 010, 011, 012...
      - Phase 2 tasks: 020, 021, 022...
      - Phase 3 tasks: 030, 031, 032...
      - Phase 4 tasks: 040, 041, 042...
      (10-gap allows inserting tasks later)

    GENERATE markdown task file with:
      - Title and description
      - Phase reference
      - Dependencies (which tasks must complete first)
      - Concrete steps to execute
      - Expected outputs (files to create/modify)
      - Acceptance criteria
      - Tags for context (nextjs, react, tailwind, mdx, azure, swa, api, seo, forms, etc.)

CREATE: projects/{project-name}/tasks/TASK-INDEX.md
  - Registry of all tasks with status
  - Dependencies between tasks
  - Phase groupings
```

#### Task File Format

Each task is a markdown file: `tasks/{NNN}-{task-slug}.md`

```markdown
# Task {NNN}: {Title}

**Phase:** {Phase Number} - {Phase Name}
**Status:** not-started
**Estimated:** {2-4} hours
**Dependencies:** {comma-separated task IDs or "none"}
**Tags:** {context tags}

## Goal

{Clear, measurable definition of done. What artifact(s) will exist when complete?}

## Context

{Why this task exists - business context from plan.md/spec.md}

## Steps

1. {First concrete action}
2. {Second concrete action}
3. {Continue until task is complete}
N. Verify acceptance criteria are met
N+1. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `{path/to/file}` - {description}
- `{path/to/file}` - {description}

## Acceptance Criteria

- [ ] {Testable criterion}
- [ ] {Testable criterion}
- [ ] {Testable criterion}

## Notes

{Implementation hints, gotchas, references to spec.md sections}
```

#### Task Sizing

| Granularity | Hours/Task | Tasks/Phase |
|-------------|------------|-------------|
| fine        | 1-2        | 5-10        |
| medium      | 2-4        | 3-7         |
| coarse      | 4-8        | 2-4         |

Default to "medium" unless user specifies otherwise.

#### Standard Tag Vocabulary

| Category | Tags | Purpose |
|----------|------|---------|
| **Framework** | `nextjs`, `react`, `typescript` | Next.js development |
| **Styling** | `tailwind`, `css`, `responsive` | UI styling |
| **Content** | `mdx`, `blog`, `content` | Blog/content system |
| **API** | `api`, `azure-functions`, `serverless` | Backend/API work |
| **Azure** | `azure`, `swa`, `storage`, `keyvault` | Azure infrastructure |
| **SEO** | `seo`, `metadata`, `sitemap`, `rss` | Search optimization |
| **Forms** | `forms`, `validation`, `contact` | Form handling |
| **DevOps** | `deploy`, `ci-cd`, `config` | Deployment tasks |
| **Quality** | `testing`, `accessibility`, `performance` | Quality assurance |

#### Mandatory Wrap-up Task

```
ALWAYS create a final "Project Wrap-up" task as the LAST task:

Task ID: 090 (or next available high number)

Steps:
  1. Verify all acceptance criteria from spec.md
  2. Run Lighthouse audit (performance, accessibility, SEO, best practices)
  3. Verify all pages render correctly
  4. Update README.md status to "Complete"
  5. Update plan.md milestones to complete
  6. Document any lessons learned in notes/
```

**Output to User:**
```
Task files generated:
  - {N} tasks created in tasks/
  - TASK-INDEX.md created
  - Wrap-up task added (090-project-wrap-up.md)

Task breakdown:
  Phase 0: {n} tasks (001-00{n}) - Scaffold and shell
  Phase 1: {m} tasks (010-01{m}) - Blog system
  Phase 2: {p} tasks (020-02{p}) - Video section
  Phase 3: {q} tasks (030-03{q}) - Contact form + API
  Phase 4: {r} tasks (040-04{r}) - Azure deployment
  Wrap-up: 1 task (090)
  Total: {total} tasks

Next Step: Create feature branch and initial commit

[Y to proceed / review {task-number} to view task / stop to exit]
```

**Wait for User**: `y` | `review {task-number}` | `stop`

---

### Step 4: Create Feature Branch

```
CREATE feature branch:

GIT OPERATIONS:
  1. Create and checkout branch:
     git checkout -b feature/{project-name}

  2. Stage project files:
     git add projects/{project-name}/

  3. Commit:
     git commit -m "feat(project): initialize {project-name}

     - Created project artifacts (README, plan, spec)
     - Generated {X} task files
     - Project ready for implementation

     Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

  4. Push to remote with tracking:
     git push -u origin feature/{project-name}

  5. OPTIONAL - Create draft PR for visibility:
     gh pr create --draft \
       --title "feat: {project-name}" \
       --body "## Summary
     Implementation of {project-name}

     ## Status
     - [x] Project initialized
     - [x] Tasks created ({X} tasks)
     - [ ] Implementation in progress
     - [ ] Ready for review

     ## Quick Links
     - [Project README](projects/{project-name}/README.md)
     - [Implementation Plan](projects/{project-name}/plan.md)
     - [Task Index](projects/{project-name}/tasks/TASK-INDEX.md)"
```

**Output to User:**
```
Feature branch created:
  - Branch: feature/{project-name}
  - Initial commit with project artifacts
  - Pushed to remote

Next Step: Start executing Task 001

To start: Say "execute task 001" or "work on task 001"

[Y to start task 001 / stop to exit]
```

**Wait for User**: `y` | `stop`

---

### Step 5: Execute Task 001 (Optional Auto-Start)

```
IF user said 'y':
  -> INVOKE task-execute skill with task 001
  -> task-execute will:
    1. Load task file
    2. Update current-task.md
    3. Execute steps
    4. Track progress

IF user said 'stop':
  -> OUTPUT:
    "Project initialized and ready!

     When ready to start:
     - Say: 'work on task 001' or 'execute task 001'

     To check status: Read projects/{project-name}/tasks/TASK-INDEX.md"
```

---

## Error Handling

| Situation | Response |
|-----------|----------|
| spec.md not found | Suggest running `/design-to-spec` first |
| spec.md too vague | List missing elements, offer to help complete |
| Plan generation fails | Offer retry or interactive plan writing |
| Task decomposition fails | Suggest refining plan.md with more detail |
| Git push fails | Check remote config, suggest fixes |

---

## Integration with Other Skills

```
design-to-spec (Optional Predecessor)
  +-> Transforms design.md -> spec.md
        |
        v
project-pipeline (THIS SKILL - Orchestrator)
  +-> Step 1: Validate spec.md
  +-> Step 2: Generate artifacts (README, plan, current-task)
  +-> Step 3: Generate task files (markdown format)
  +-> Step 4: Feature branch + initial commit
  +-> Step 5: Hand off to task-execute

task-execute (Execution)
  +-> Executes individual tasks with context tracking

push-to-github (Operations)
  +-> Commit and push during/after implementation
```

---

## Success Criteria

Pipeline successful when:
- [ ] spec.md validated
- [ ] README.md created
- [ ] plan.md created with phases and milestones
- [ ] current-task.md created (context recovery tracker)
- [ ] All task files created in tasks/
- [ ] TASK-INDEX.md created
- [ ] Wrap-up task included (090)
- [ ] Feature branch created and pushed
- [ ] User confirmed ready to start (or declined)

---

*Streamlined project initialization for website builds. Human confirmation at each step.*
