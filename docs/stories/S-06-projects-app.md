# Story S-06: Projects App (File Explorer Style)

## Goal
Implement the Projects app window styled like Windows 11 File Explorer — with a sidebar tree, folder grid, and a detail panel that shows project info when a folder is clicked.

## Acceptance Criteria
- [ ] Left sidebar shows "This PC > Portfolio > Projects" tree
- [ ] Main area shows 2 project folders as icon cards
- [ ] Clicking a folder opens a detail panel on the right
- [ ] Detail panel shows: project name, description, tech stack badges, status, and a GitHub link
- [ ] Breadcrumb bar at top updates when navigating
- [ ] Both projects display correctly with all content
- [ ] Dark and light mode styled correctly

## Component to Create

### `src/components/apps/ProjectsApp.tsx`
Three-column layout:
- Left sidebar `w-44 border-r` — navigation tree
- Center `flex-1` — folder grid or selected folder content
- Right panel `w-64 border-l` — project detail (shows when a folder is selected)

### Layout Structure
```
[ Toolbar / Breadcrumb                              ]
[ Sidebar | Folder Grid           | Detail Panel   ]
```

### Sidebar Content
```
📁 This PC
  └── 📂 Portfolio
        └── 📁 Projects  ← active
```

### Breadcrumb Bar
`This PC > Portfolio > Projects > {selectedProject?.name || ''}`
Style: `text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1`

### Folder Icons (center grid)
Each project shown as a folder card:
```tsx
<button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer w-28">
  <span className="text-5xl">📁</span>
  <span className="text-xs text-center">{project.name}</span>
</button>
```

Selected state: `bg-[#0078d4]/10 border border-[#0078d4]/40`

### Detail Panel (right)
Shows when a project folder is selected:
- Project name (bold)
- Short description
- Tech stack (badges)
- Status badge (In Progress / Completed)
- GitHub link button (even if placeholder `#`)

## Project Data
Create `src/data/projects.ts`:

```typescript
export interface Project {
  id: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  techStack: string[];
  status: 'In Progress' | 'Completed' | 'Archived';
  githubUrl?: string;
  liveUrl?: string;
  domain: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'fast',
    name: 'F.A.S.T',
    shortName: 'F.A.S.T',
    description: 'Fully Automated Software Transformation',
    longDescription: 'An AI-driven system that automates the complete Software Development Lifecycle (SDLC) — from requirements gathering and architecture design to code generation, testing, and deployment. Powered by LLM agents orchestrated in a multi-step pipeline.',
    techStack: ['.NET', 'Python', 'Azure', 'OpenAI', 'LangChain', 'Docker'],
    status: 'In Progress',
    domain: 'AI / Developer Tools',
    githubUrl: '#',
  },
  {
    id: 'substation',
    name: 'Unified Substation Visualiser',
    shortName: 'Substation Viz',
    description: 'Visualize entire electrical substations from equipment to communication',
    longDescription: 'A unified visualization platform for electrical substations that renders the complete picture — from physical equipment and topology to communication protocols and data flows. Supports real-time monitoring and interactive drill-down from substation level to individual device.',
    techStack: ['.NET', 'Azure', 'TypeScript', 'React', 'IEC 61850', 'Docker'],
    status: 'Completed',
    domain: 'Energy / Industrial',
    githubUrl: '#',
  },
];
```

## Styling Notes
- Tech badges: `text-xs px-2 py-0.5 rounded-full bg-[#0078d4]/10 text-[#0078d4] dark:bg-[#0078d4]/20`
- Status "In Progress": `bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300`
- Status "Completed": `bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`
- GitHub button: `bg-[#0078d4] hover:bg-[#006cbd] text-white text-xs px-3 py-1.5 rounded`

## Definition of Done
- [ ] Both project folders visible in the grid
- [ ] Clicking a folder selects it and shows detail panel
- [ ] All project content displays correctly
- [ ] Breadcrumb updates on selection
- [ ] Tech badges render for both projects
- [ ] Dark and light mode correct
- [ ] No TypeScript errors
