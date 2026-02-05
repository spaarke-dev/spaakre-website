# design-to-spec

---
description: Transform human design documents into AI-optimized spec.md files
tags: [project-init, design, spec, planning, transformation]
techStack: [nextjs, typescript, azure, tailwind, mdx]
appliesTo: ["projects/*/design.md", "transform spec", "design to spec"]
alwaysApply: false
---

## Purpose

**Tier 1 Skill** - Transforms verbose human design documents into structured, AI-optimized `spec.md` files that the `project-pipeline` skill can consume.

**Key Features**:
- Ingests design documents (markdown, rough notes, pasted text)
- Extracts and structures requirements, scope, and acceptance criteria
- Flags ambiguities for human resolution via targeted interview
- Outputs standardized spec.md for project-pipeline consumption

---

## When to Use

- User says "transform spec", "design to spec", or "create AI spec"
- Explicitly invoked with `/design-to-spec {project-path}`
- A design document exists at `projects/{project-name}/design.md`
- Before running `project-pipeline` (this skill feeds into that workflow)

## Input/Output

**Input** (one of):
- `projects/{project-name}/design.md` - Markdown design doc
- User-provided text/notes (via conversation)

**Output**:
- `projects/{project-name}/spec.md` - AI-optimized spec file
- Both files kept as project artifacts

## Workflow Position

```
Human Design Document
    |
    v
+------------------+
|  design-to-spec  |  <-- THIS SKILL
+------------------+
    |
    v
projects/{name}/spec.md (AI-optimized)
    |
    v
+------------------+
| project-pipeline |  <-- NEXT SKILL
+------------------+
    |
    v
README.md, plan.md, tasks/, branch
```

---

## Steps

### Step 1: Locate Design Document

```
SEARCH for design document at:
  1. projects/{project-name}/design.md
  2. projects/{project-name}/*.md (if only one non-spec markdown)

IF not found:
  -> ASK user: "Where is your design document?"
  -> Accept: file path, pasted text, or description

IF found:
  -> READ document content
  -> Report: "Found design document: {filename} ({word-count} words)"
```

---

### Step 2: Extract Core Elements

```
EXTRACT from design document:

1. PURPOSE
   - What problem does this solve?
   - What is the business value?
   - Who are the users/stakeholders?

2. SCOPE
   - What's IN scope (explicit features/changes)
   - What's OUT of scope (explicit exclusions)
   - System boundaries

3. REQUIREMENTS
   - Functional requirements (what it must do)
   - Non-functional requirements (performance, security, etc.)
   - Technical constraints

4. SUCCESS CRITERIA
   - How do we know it's done?
   - Acceptance criteria
   - Quality gates

5. TECHNICAL APPROACH (if present)
   - Architecture decisions
   - Technology choices
   - Integration points

FLAG any missing elements for human input
```

**Output to User:**
```
Extracted from design document:

Found:
  - Purpose: [summary]
  - Scope: {X} features in scope
  - Requirements: {Y} functional, {Z} non-functional
  - Success criteria: {N} criteria identified

Gaps identified - proceeding to targeted clarification...
```

---

### Step 2.5: Gap-Targeted Clarification Interview

**Purpose:** Ask **specific, actionable questions** derived from gaps discovered in THIS design document. Each question must directly impact implementation decisions.

**Principle:** Questions are NOT generic checklists. They are intelligent probes based on:
- Undefined terms found in the design
- Implicit assumptions that need validation
- Missing behavior specifications
- Conflicting or ambiguous requirements
- Scope boundaries that are unclear

**Action:**
```
ANALYZE extracted content for specific gaps:

FOR EACH gap discovered, generate a TARGETED question that:
  - References the EXACT text or concept that's unclear
  - Explains WHY the answer matters (implementation impact)
  - Offers concrete options where applicable
  - Can be answered in 1-2 sentences

GAP TYPES -> QUESTION PATTERNS:

1. UNDEFINED TERMS
   Gap: Design uses "{term}" without defining it
   Question: "You mention '{term}' - what's the specific threshold/value?
             This determines [implementation choice]."

2. IMPLICIT ASSUMPTIONS
   Gap: Design assumes {behavior} without stating it
   Question: "The design seems to assume {assumption}. Is this correct?"

3. UNSPECIFIED BEHAVIOR
   Gap: Design mentions {feature} but not how it works
   Question: "When {specific scenario}, what should happen?
             Options: [A] {option} or [B] {option}"

4. MISSING ERROR HANDLING
   Gap: Happy path only for {feature}
   Question: "What should happen when {specific failure scenario}?"

5. CONFLICTING REQUIREMENTS
   Gap: {Requirement A} conflicts with {Requirement B}
   Question: "Which takes priority? This affects [implementation]."

6. SCOPE BOUNDARY UNCLEAR
   Gap: Unclear if {capability} is in/out of scope
   Question: "Is {specific capability} in scope for this release?"

7. MISSING QUANTITATIVE REQUIREMENTS
   Gap: No numbers for {performance/scale requirement}
   Question: "What's the expected {metric}?"

PRESENT questions grouped by impact:

BLOCKING (must answer before spec):
  {Questions where wrong assumption = wrong implementation}

IMPORTANT (should answer, can proceed with noted assumptions):
  {Questions that affect approach but have reasonable defaults}
```

**Wait for User**: Answers to blocking questions (required), optional answers to important questions.

**Incorporate Answers:**
```
FOR EACH answer received:
  -> Update extracted requirements with concrete values
  -> Note source: "Per owner clarification: {answer}"
  -> Add to spec.md requirements section

IF user skips IMPORTANT questions:
  -> Proceed with stated assumptions
  -> Flag assumptions in spec.md "Assumptions" section
```

---

### Step 3: Identify Technical Context

**Purpose:** Note the tech stack and architectural decisions relevant to spec generation.

```
FROM design document, IDENTIFY:

1. TECH STACK
   - Framework: Next.js (App Router, TypeScript)
   - Styling: Tailwind CSS
   - Content: MDX
   - Hosting: Azure Static Web Apps
   - API: Azure Functions (SWA integrated)
   - Storage: Azure Table Storage / Blob
   - Email: SendGrid / Postmark / Azure Communication Services

2. KEY ARCHITECTURAL DECISIONS
   - SWA vs App Service (with fallback plan)
   - Git-based content (MDX in repo)
   - No CRM in v1
   - Honeypot + rate limiting for spam

3. DEPLOYMENT MODEL
   - GitHub -> Azure SWA CI/CD
   - PR preview environments
   - main -> production

NOTE these for inclusion in spec.md Technical Constraints section.
```

---

### Step 4: Generate Structured spec.md

```
CREATE: projects/{project-name}/spec.md

FOLLOW template structure:

# {Project Name} - AI Implementation Specification

> **Status**: Ready for Implementation
> **Created**: {date}
> **Source**: {design-document-filename}

## Executive Summary

{2-3 sentences from extracted PURPOSE}

## Scope

### In Scope
{Bulleted list of features/changes}

### Out of Scope
{Explicit exclusions}

### Affected Areas
{List of code areas with paths}
- `app/` - Next.js pages and routing
- `src/components/` - React components
- `src/lib/` - Utility functions
- `content/blog/` - MDX content

## Requirements

### Functional Requirements
{Numbered list with clear acceptance criteria}
1. **FR-01**: {requirement} - Acceptance: {criteria}

### Non-Functional Requirements
{Performance, security, accessibility, etc.}
- **NFR-01**: {requirement}

## Technical Constraints

### Tech Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- MDX for blog content
- Azure Static Web Apps
- Azure Functions (SWA integrated API)

### Key Decisions
{Architecture decisions from design}

## Success Criteria

{Numbered list with verification method}
1. [ ] {criterion} - Verify by: {method}

## Dependencies

### Prerequisites
{What must exist/be done first}

### External Dependencies
{APIs, services, Azure resources needed}

## Owner Clarifications

{Answers captured from Step 2.5 interview}

| Topic | Question | Answer | Impact |
|-------|----------|--------|--------|
| {topic} | {question asked} | {owner's response} | {implementation decision made} |

## Assumptions

{Items where owner did not specify - proceeding with stated assumptions}

- **{topic}**: Assuming {value/behavior} - affects {component/decision}

## Unresolved Questions

{Still blocking or need answers during implementation}

- [ ] {question} - Blocks: {what this blocks}

---

*AI-optimized specification. Original design: {filename}*
```

---

### Step 5: Present for Review

```
OUTPUT spec.md content to user

SHOW summary:
  - Word count
  - Number of requirements
  - Number of unresolved questions

ASK for review:
  "Please review the spec.md. Any changes needed before proceeding to project-pipeline?"
```

**Output to User:**
```
spec.md generated:
  - {X} words
  - {Y} functional requirements
  - {N} unresolved questions flagged

File created: projects/{project-name}/spec.md

Next Steps:
  1. Review spec.md for accuracy
  2. Resolve any flagged questions
  3. Run: /project-pipeline {project-name}

[Y to proceed to project-pipeline / edit to make changes / done to finish]
```

**Wait for User**: `y` (proceed) | `edit` (make changes) | `done` (stop here)

---

### Step 6: Handoff to project-pipeline (Optional)

```
IF user said 'y':
  -> INVOKE project-pipeline projects/{project-name}

IF user said 'done':
  -> OUTPUT: "spec.md ready at projects/{project-name}/spec.md
             Run /project-pipeline {project-name} when ready."
```

---

## Error Handling

| Situation | Response |
|-----------|----------|
| Design document not found | Ask user for file path or pasted content |
| Design doc too vague | List missing elements, offer to clarify or proceed with assumptions |
| User skips blocking questions | Cannot proceed - explain why answers are needed |

---

## Integration with Other Skills

```
design-to-spec (THIS SKILL)
    |
    +-> Generates spec.md
           |
           v
    project-pipeline (NEXT)
           |
           +-> plan.md, tasks/, README.md, branch
```

---

*This skill transforms human design documents into structured specs optimized for AI-driven implementation.*
