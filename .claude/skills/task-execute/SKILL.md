# task-execute

---
description: Execute a task file with context loading, progress tracking, and session recovery
tags: [tasks, execution, context, knowledge]
techStack: [nextjs, typescript, azure, tailwind, mdx]
appliesTo: ["execute task", "run task", "start task", "work on task", "continue project", "resume project", "where was I"]
alwaysApply: false
---

## Purpose

Execute a single task file with **progress tracking** and **session recovery**. This skill ensures Claude Code loads the task context, tracks progress in `current-task.md`, and can resume work after session breaks or context compaction.

**Context Persistence**: All progress is tracked in `current-task.md` so work can continue after compaction or new sessions.

---

## When to Use

- User says "execute task 013" or "work on task 013"
- User provides a task file path
- User says "continue project", "resume", "where was I", "pick up where I left off"
- Continuing work on a project task
- Resuming after compaction or new session

---

## Execution Protocol

### Step 0: Context Recovery Check

```
IF resuming work (not fresh start):
  READ projects/{project-name}/current-task.md

  IF current-task.md exists AND has an active task:
    -> This is a continuation
    -> EXTRACT: completed_steps, files_modified, next_step
    -> REPORT: "Resuming task {id} from step {N}"
    -> Load the task file and SKIP to the indicated step

  IF current-task.md shows task is blocked:
    -> REPORT: "Task {id} is blocked: {reason}"
    -> ASK: "Blocker resolved? [y/n]"

  IF current-task.md shows no active task:
    -> CHECK TASK-INDEX.md for next pending task
    -> REPORT: "Next task: {id} - {title}"
    -> ASK: "Ready to start? [y]"

IF starting fresh (user specifies a task):
  -> Proceed to Step 1
```

### Step 0.5: Branch Sync (if resuming after break)

```
IF resuming in a new session:
  CHECK branch status:
    git fetch origin
    git status

  IF behind remote:
    -> WARN: "Branch is behind remote. Pull latest?"
    -> If yes: git pull

  IF uncommitted changes from previous session:
    -> SHOW: modified files
    -> ASK: "Stash, commit, or continue as-is?"

PROCEED to task loading
```

### Step 1: Load Task File

```
READ the task .md file from tasks/

EXTRACT:
  - Title and goal
  - Phase info
  - Dependencies (verify they're complete via TASK-INDEX.md)
  - Steps to execute
  - Expected outputs
  - Acceptance criteria
  - Tags for context
```

### Step 2: Initialize/Update current-task.md

```
UPDATE current-task.md with:
  - Task ID: {from filename}
  - Task File: {relative path}
  - Title: {from task}
  - Phase: {from task}
  - Status: "in-progress"
  - Started: {current timestamp}
  - Clear previous completed steps (new task)
  - Clear previous files modified (new task)
```

#### current-task.md Format

```markdown
# Current Task

## Quick Recovery
| Field | Value |
|-------|-------|
| **Task** | {NNN} - {Title} |
| **Step** | {N} of {Total}: {Current step description} |
| **Status** | in-progress |
| **Next Action** | {EXPLICIT next thing to do} |

## Details
- **Task File:** tasks/{NNN}-{slug}.md
- **Phase:** {phase}
- **Started:** {timestamp}

## Completed Steps
- [x] Step 1: {description} ({timestamp})
- [x] Step 2: {description} ({timestamp})

## Files Modified
- `{path}` - {what was changed}
- `{path}` - {what was changed}

## Decisions Made
- {decision}: {rationale}

## Notes
{Any important context for recovery}
```

### Step 3: Execute Task Steps

```
FOR each step in the task:

  BEFORE starting step:
    UPDATE current-task.md:
      - Current Step: Step {N} - {description}
      - Next Action: {what this step will do}

  EXECUTE the step

  IF step involves creating/modifying files:
    UPDATE current-task.md -> Files Modified:
      - Add each file touched with purpose

  IF implementation decision made:
    UPDATE current-task.md -> Decisions Made:
      - {decision} -- Reason: {why}

  AFTER completing step:
    UPDATE current-task.md -> Completed Steps:
      - [x] Step {N}: {description}
    UPDATE Next Step to Step {N+1}
```

### Step 4: Verify Acceptance Criteria

```
FOR each acceptance criterion in the task:
  VERIFY the criterion is met
  IF not met:
    FIX before proceeding

RUN basic quality checks (if applicable):
  - npm run build (verify build succeeds)
  - npm run lint (verify no lint errors)
  - npm run typecheck (verify no type errors)
```

### Step 5: Update Task Status

```
UPDATE task file: Status -> "completed"

UPDATE TASK-INDEX.md: Mark task as complete

DETERMINE next task:
  - Check TASK-INDEX.md for next pending task
  - Verify dependencies are satisfied

UPDATE current-task.md:
  IF next task found:
    - Task ID: {next task number}
    - Status: "not-started"
    - Next Action: "Begin task {NNN}"
  IF no more tasks:
    - Status: "none"
    - Next Action: "Project complete!"

REPORT to user:
  "Task {id} complete.

   Next task: {next_id} - {next_title}
   Ready to begin? [Y/N]"
```

---

## Session Handoff Protocol

When context is getting large or session is ending:

```
UPDATE current-task.md with full state:

1. Quick Recovery section:
   - Task: {NNN} - {Title}
   - Step: {N} of {Total}
   - Status: in-progress
   - Next Action: {EXPLICIT next thing to do}

2. Files Modified: Complete list with purposes

3. Decisions Made: All choices with rationale

4. Notes: Key context not captured elsewhere

REPORT to user:
  "State saved to current-task.md
   Ready for /compact or new session.
   Say 'where was I?' to resume."
```

---

## Recovery Examples

### Example 1: Fresh Task Start

```
User: "execute task 010"

Agent:
  1. READ tasks/010-implement-mdx-loading.md
  2. CHECK dependencies: 001-003 all complete
  3. UPDATE current-task.md: task 010, in-progress
  4. EXECUTE steps 1 through N
  5. VERIFY acceptance criteria
  6. UPDATE status: completed
  7. REPORT: "Task 010 complete. Next: 011"
```

### Example 2: Resume After Break

```
User: "where was I?"

Agent:
  1. READ current-task.md
  2. FOUND: Task 010, step 4 of 7 complete
  3. READ tasks/010-implement-mdx-loading.md
  4. REPORT:
     "Recovered context:

      Task: 010 - Implement MDX loading and post routing
      Completed: Steps 1-4
      Files modified: src/lib/blog.ts, app/blog/page.tsx

      Next: Step 5 - Add frontmatter validation

      Ready to continue?"
```

### Example 3: Blocked Task

```
User: "continue project"

Agent:
  1. READ current-task.md
  2. FOUND: Task 030, status: blocked
  3. REPORT:
     "Task 030 is blocked.

      Blocker: Need Azure Storage connection string

      Has this been resolved? [y/n]
      Or: 'skip' to move to next non-blocked task"
```

---

## Error Handling

| Situation | Response |
|-----------|----------|
| Task file not found | Check tasks/ directory, list available tasks |
| Dependencies not met | List unmet dependencies, suggest completing those first |
| current-task.md missing | Create from scratch, no recovery needed |
| Build/lint fails during task | Fix issues before marking complete |
| Multiple tasks in-progress | Ask user which to continue |
| All tasks complete | Suggest running wrap-up task (090) |

---

## Integration with Other Skills

| Skill | Integration |
|-------|-------------|
| `project-pipeline` | Creates the task files this skill executes |
| `push-to-github` | Use after completing work to commit/push |
| `design-to-spec` | Use if project doesn't have spec.md yet |

---

## Tips

- **Always check current-task.md first** when resuming - it's the source of truth
- **Update current-task.md after every step** - prevents lost progress
- **Verify build/lint after code changes** - catch issues early
- **Keep current-task.md focused** - it tracks only the active task, not history
- **Task history lives in**: TASK-INDEX.md (status), git commits (what changed)

---

*This skill ensures reliable task execution with recoverable state across sessions.*
