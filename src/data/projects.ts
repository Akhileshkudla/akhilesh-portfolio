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
    longDescription:
      'An AI-driven system that automates the complete Software Development Lifecycle (SDLC) — from requirements gathering and architecture design to code generation, testing, and deployment. Powered by LLM agents orchestrated in a multi-step pipeline.',
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
    longDescription:
      'A unified visualization platform for electrical substations that renders the complete picture — from physical equipment and topology to communication protocols and data flows. Supports real-time monitoring and interactive drill-down from substation level to individual device.',
    techStack: ['.NET', 'Azure', 'TypeScript', 'React', 'IEC 61850', 'Docker'],
    status: 'Completed',
    domain: 'Energy / Industrial',
    githubUrl: '#',
  },
];
