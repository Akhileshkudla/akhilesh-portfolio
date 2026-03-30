import type { AppId, AppConfig } from '@/types';
import { AboutApp } from '@/components/apps/AboutApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { SkillsApp } from '@/components/apps/SkillsApp';
import { ContactApp } from '@/components/apps/ContactApp';

export const APP_CONFIG: Record<AppId, AppConfig> = {
  about: {
    id: 'about',
    label: 'About Me',
    icon: '⚙️',
    windowTitle: 'Settings',
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
};

export const APP_ORDER: AppId[] = ['about', 'projects', 'skills', 'contact'];
