import type { ComponentType } from 'react';

export type AppId = 'about' | 'projects' | 'skills' | 'contact' | 'resume';

export interface AppConfig {
  id: AppId;
  label: string;
  icon: string;
  windowTitle: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  component: ComponentType;
}
