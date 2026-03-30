---
mode: agent
description: Generate a BMad-style story file for the next feature to implement
---

Generate a new story file for the portfolio project.

## Steps

1. Read `docs/PRD.md` to find the next unimplemented story from the Story Map table.

2. Read `docs/ARCHITECTURE.md` to understand the correct component location.

3. Create `docs/stories/S-[XX]-[name].md` with this exact structure:

```markdown
# Story S-XX: [Title]

## Goal
One sentence — what does this story deliver to the user?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Components to Create
- `src/components/[path]/[Name].tsx` — description

## Components to Modify
- `src/components/[path]/[Name].tsx` — what changes

## Types / Interfaces Needed
List any new TypeScript types required

## Implementation Notes
Key decisions, gotchas, or patterns to follow

## Definition of Done
- [ ] No TypeScript errors
- [ ] Dark and light mode tested
- [ ] Renders correctly at 1280px width
- [ ] Console has no errors
```

4. Print the file path so the user can open it.
