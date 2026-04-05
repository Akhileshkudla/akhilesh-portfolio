import type { AppId, AppConfig } from '@/types';
import { AboutApp } from '@/components/apps/AboutApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { SkillsApp } from '@/components/apps/SkillsApp';
import { ContactApp } from '@/components/apps/ContactApp';
import { ResumeApp } from '@/components/apps/ResumeApp';
import { TerminalApp } from '@/components/apps/TerminalApp';
import { MemoryGameApp } from '@/components/apps/MemoryGameApp';

export const APP_CONFIG: Record<AppId, AppConfig> = {
  about: {
    id: 'about',
    label: 'About Me',
    icon: '👤',
    windowTitle: 'About Me',
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 80, y: 60 },
    component: AboutApp,
  },
  projects: {
    id: 'projects',
    label: 'Projects',
    icon: '📁',
    windowTitle: 'File Explorer',
    defaultSize: { width: 750, height: 500 },
    defaultPosition: { x: 140, y: 80 },
    component: ProjectsApp,
  },
  skills: {
    id: 'skills',
    label: 'Skills',
    icon: '📊',
    windowTitle: 'Task Manager',
    defaultSize: { width: 650, height: 500 },
    defaultPosition: { x: 200, y: 100 },
    component: SkillsApp,
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    icon: '✉️',
    windowTitle: 'Mail',
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 260, y: 120 },
    component: ContactApp,
  },
  resume: {
    id: 'resume',
    label: 'Resume',
    icon: '📄',
    windowTitle: 'Resume — Akhilesh K',
    defaultSize: { width: 420, height: 280 },
    defaultPosition: { x: 320, y: 140 },
    component: ResumeApp,
  },
  terminal: {
    id: 'terminal',
    label: 'Terminal',
    icon: '>_',
    windowTitle: 'Windows Terminal',
    defaultSize: { width: 720, height: 480 },
    defaultPosition: { x: 100, y: 80 },
    component: TerminalApp,
  },
  memoryGame: {
    id: 'memoryGame',
    label: 'Memory Game',
    icon: '🎮',
    windowTitle: 'Memory Game — Tech Edition',
    defaultSize: { width: 620, height: 560 },
    defaultPosition: { x: 160, y: 60 },
    component: MemoryGameApp,
  },
};

export const APP_ORDER: AppId[] = ['about', 'projects', 'skills', 'contact', 'resume', 'terminal', 'memoryGame'];
