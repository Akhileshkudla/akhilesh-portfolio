export type AboutSection = 'profile' | 'experience' | 'education';

export interface NavItem {
  id: AboutSection;
  label: string;
  icon: string;
}

export interface ExperienceEntry {
  period: string;
  title: string;
  description: string;
}

export interface EducationEntry {
  degree: string;
  details: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
];

export const PROFILE = {
  name: 'Akhilesh K',
  title: 'Software Architect & AI Systems Builder',
  location: 'India 🇮🇳',
  initials: 'AK',
  about:
    '10+ years of experience designing and building scalable, high-performance backend systems. Currently focused on building intelligent AI applications and autonomous pipelines that transform how software is conceived, designed, and delivered.',
} as const;

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2023 – Present',
    title: 'AI Systems Architect',
    description:
      'Building AI-driven applications, LLM pipelines, and autonomous software engineering tools. Creator of F.A.S.T — Fully Automated Software Transformation system.',
  },
  {
    period: '2018 – 2023',
    title: 'Senior Software Architect',
    description:
      'Designed and led development of enterprise-scale backend platforms. Expertise in .NET, Azure cloud-native architecture, and microservices.',
  },
  {
    period: '2013 – 2018',
    title: 'Software Developer → Lead Developer',
    description:
      'Built backend systems and APIs across multiple domains including energy, finance, and enterprise SaaS. Progressed from developer to technical lead.',
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    degree: 'B.E. in Computer Science',
    details: 'Focused on software engineering, algorithms, and systems design.',
  },
];

export const CERTIFICATIONS: string[] = [
  'Microsoft Azure Solutions Architect',
];
