# Story S-07: Skills App (Task Manager Style)

## Goal
Implement the Skills app window styled like Windows 11 Task Manager — with animated progress bars, tab navigation by skill category, and a "CPU load" style header that gives it personality.

## Acceptance Criteria
- [ ] Window opens with Task Manager styling (dark header, tabbed content)
- [ ] Header shows "Skill Load: High" with a live-updating fake CPU graph (optional)
- [ ] 4 tabs: Overview, .NET Ecosystem, Cloud & DevOps, AI & ML
- [ ] Overview tab: all top skills as animated horizontal progress bars
- [ ] Progress bars animate from 0% to the target value on window open (Framer Motion)
- [ ] Each skill row shows: icon + name + bar + percentage
- [ ] Tab switching shows the correct skill subset
- [ ] Dark and light mode correct

## Component to Create

### `src/components/apps/SkillsApp.tsx`
Structure:
```
[ Header — "Skill Utilization" + fake uptime ]
[ Tab bar: Overview | .NET | Cloud & DevOps | AI & ML ]
[ Skill list for active tab ]
```

### Header
```tsx
<div className="bg-zinc-900 dark:bg-zinc-950 text-green-400 font-mono text-xs p-3 flex justify-between items-center">
  <span>Skill Utilization Monitor</span>
  <span>Status: <span className="text-green-300">ACTIVE</span> | Load: HIGH</span>
</div>
```

### Tab Bar
```tsx
<div className="flex border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
  {tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors
        ${activeTab === tab.id 
          ? 'border-[#0078d4] text-[#0078d4]' 
          : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
        }`}
    >
      {tab.label}
    </button>
  ))}
</div>
```

### Skill Row
```tsx
<div className="flex items-center gap-3 py-2">
  <span className="text-base w-6 flex-shrink-0">{skill.icon}</span>
  <span className="text-sm w-36 flex-shrink-0 dark:text-zinc-200">{skill.name}</span>
  <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
    <motion.div
      className="bg-[#0078d4] h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${skill.level}%` }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
    />
  </div>
  <span className="text-xs text-zinc-500 dark:text-zinc-400 w-8 text-right">{skill.level}%</span>
</div>
```

## Skills Data
Create `src/data/skills.ts`:

```typescript
export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number; // 0-100
  category: 'overview' | 'dotnet' | 'cloud' | 'ai';
  yearsExp?: number;
}

export const SKILLS: Skill[] = [
  // Overview (top skills across all categories)
  { id: 'csharp',     name: 'C# / .NET',           icon: '⚙️', level: 95, category: 'overview' },
  { id: 'azure',      name: 'Microsoft Azure',      icon: '☁️', level: 90, category: 'overview' },
  { id: 'arch',       name: 'System Architecture',  icon: '🏗️', level: 95, category: 'overview' },
  { id: 'docker',     name: 'Docker / Kubernetes',  icon: '🐳', level: 85, category: 'overview' },
  { id: 'ai',         name: 'AI / LLM Engineering', icon: '🤖', level: 80, category: 'overview' },
  { id: 'python',     name: 'Python',               icon: '🐍', level: 72, category: 'overview' },

  // .NET Ecosystem
  { id: 'aspnet',     name: 'ASP.NET Core',         icon: '🔷', level: 95, category: 'dotnet' },
  { id: 'ef',         name: 'Entity Framework',     icon: '🗄️', level: 88, category: 'dotnet' },
  { id: 'signalr',    name: 'SignalR',               icon: '⚡', level: 80, category: 'dotnet' },
  { id: 'blazor',     name: 'Blazor',               icon: '🔥', level: 70, category: 'dotnet' },
  { id: 'grpc',       name: 'gRPC / Protobuf',      icon: '🔗', level: 82, category: 'dotnet' },

  // Cloud & DevOps
  { id: 'aks',        name: 'Azure Kubernetes (AKS)', icon: '☸️', level: 85, category: 'cloud' },
  { id: 'azfunc',     name: 'Azure Functions',      icon: '⚡', level: 88, category: 'cloud' },
  { id: 'azdevops',   name: 'Azure DevOps',         icon: '🔄', level: 90, category: 'cloud' },
  { id: 'terraform',  name: 'Terraform / IaC',      icon: '🏗️', level: 75, category: 'cloud' },
  { id: 'cicd',       name: 'CI/CD Pipelines',      icon: '🚀', level: 88, category: 'cloud' },

  // AI & ML
  { id: 'llm',        name: 'LLM / Prompt Engineering', icon: '🧠', level: 82, category: 'ai' },
  { id: 'langchain',  name: 'LangChain / Agents',   icon: '🔗', level: 78, category: 'ai' },
  { id: 'openai',     name: 'OpenAI / Azure OpenAI', icon: '✨', level: 85, category: 'ai' },
  { id: 'mlops',      name: 'MLOps',                icon: '⚙️', level: 65, category: 'ai' },
  { id: 'rag',        name: 'RAG Pipelines',        icon: '📚', level: 80, category: 'ai' },
];
```

## Tab Config
```typescript
const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'dotnet',   label: '.NET Ecosystem' },
  { id: 'cloud',    label: 'Cloud & DevOps' },
  { id: 'ai',       label: 'AI & ML' },
];
```

## Animation Notes
- Use `AnimatePresence` + `motion.div` on the skill list so switching tabs fades the list out/in
- Progress bars use `initial={{ width: 0 }}` + `animate={{ width: skill.level + '%' }}` with staggered `delay: index * 0.08`
- Re-trigger animation on tab switch by using tab id as the `key` prop on the list wrapper

## Definition of Done
- [ ] All 4 tabs render correct skills
- [ ] Progress bars animate on open and on tab switch
- [ ] Header "Skill Utilization Monitor" renders with monospace green text
- [ ] Dark and light mode correct
- [ ] No TypeScript errors
