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
  title: 'Software Architect | AI Systems Engineer',
  location: 'Bangalore, India 🇮🇳',
  initials: 'AK',
  about:
    'Software Architect with 12+ years of progressive experience in enterprise software, AI systems, and critical infrastructure. Currently spearheading AI-powered transformation initiatives at Siemens, architecting multi-agent systems, RAG pipelines, and MCP integrations on Azure AI Foundry. Deep domain expertise in IEC 61850-based substation protection (SIPROTEC ecosystem) and a strong track record leading cross-functional, globally distributed teams.',
} as const;

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: 'Apr 2016 – Present',
    title: 'Software Architect — Siemens Technology Services',
    description:
      'Team Architect for SIPROTEC V — next-gen virtual substation protection platform scaling to 60 IEDs on a single server. Creator of FAST (Fully Autonomous Software Transformation), an AI-powered SDLC automation tool using multi-agent orchestration, RAG pipelines, and MCP on Azure AI Foundry. Previously led DIGSI 5 engineering — the flagship tool for configuring Siemens protection devices — from developer to architect. 🏆 Received "Instant Puraskar" Award for outstanding contribution to usability and performance.',
  },
  {
    period: 'Jan 2014 – Mar 2016',
    title: 'Software Developer — NTT Data',
    description:
      'Developed modules for InfoImage, a high-volume Enterprise Content Management and document management system. Performed HLD/LLD, developed in C++, C#, .NET 4.0, and SQL. Collaborated with distributed teams across India, US, and Germany. 🏆 Received "Best Team Award" — InfoImage 2014.',
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    degree: 'B.E. in Electronics & Communication Engineering',
    details: 'Dr. MV Shetty Institute of Technology, Mangalore, Karnataka.',
  },
];

export const CERTIFICATIONS: string[] = [
  'Microsoft Certified: Azure Solutions Architect Expert',
  'Certified Kubernetes Application Developer (CKAD) — CNCF / Linux Foundation',
];
