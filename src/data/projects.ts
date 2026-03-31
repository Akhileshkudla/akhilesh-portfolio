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
    id: 'siprotec',
    name: 'SIPROTEC V',
    shortName: 'SIPROTEC V',
    description: 'Next-gen virtual substation protection & control platform',
    longDescription:
      'Team Architect for SIPROTEC V — Siemens\' next-generation virtual substation protection and control platform, scaling up to 60 IEDs on a single server with proven algorithms, IEC 61850 compliance, and an AI-ready architecture layer enabling intelligent diagnostics and automation.',
    techStack: ['.NET', 'IEC 61850', 'Azure', 'C#', 'Virtualization'],
    status: 'In Progress',
    domain: 'Substation Protection / IEC 61850',
  },
  {
    id: 'fast',
    name: 'FAST — Fully Autonomous Software Transformation',
    shortName: 'FAST (ADLC)',
    description: 'AI-powered Complete SDLC Automation tool',
    longDescription:
      'Conceived and architected FAST — an AI-powered Autonomous Development Lifecycle system that automates requirements analysis, design, code generation, testing, and deployment end-to-end. Built multi-agent orchestration pipelines, RAG systems for context-aware code synthesis, and MCP integrations for structured AI-tool workflows. Deployed on Azure AI Foundry with autonomous CI/CD.',
    techStack: ['.NET', 'Python', 'Azure AI Foundry', 'Azure OpenAI', 'LangChain', 'Semantic Kernel', 'RAG', 'MCP'],
    status: 'In Progress',
    domain: 'AI / Autonomous SDLC',
  },
  {
    id: 'digsi5',
    name: 'DIGSI 5',
    shortName: 'DIGSI 5',
    description: 'Siemens engineering tool for substation protection devices',
    longDescription:
      'Led development of DIGSI 5, Siemens\' flagship engineering tool for operating and configuring protection devices in power substation networks. Progressed from developer to architect over 8 years — built the API layer, led NFR initiatives to meet IEC standards, built unit test frameworks, developed Ranorex automation modules, and managed multi-threaded device communication across substations. 🏆 Instant Puraskar Award recipient.',
    techStack: ['.NET', 'WPF', 'WCF', 'NUnit', 'Ranorex', 'IEC 61850', 'C#'],
    status: 'Completed',
    domain: 'Substation Engineering Tools',
  },
  {
    id: 'infoimage',
    name: 'InfoImage',
    shortName: 'InfoImage',
    description: 'High-volume Enterprise Content Management system',
    longDescription:
      'Developed modules for InfoImage, an enterprise-scale ECM, workflow, and record management platform at NTT Data. Performed HLD/LLD, developed in C++, C#, .NET 4.0, and SQL. Collaborated with distributed teams across India, the US, and Germany in an Agile environment. 🏆 Best Team Award — InfoImage 2014.',
    techStack: ['C#', 'C++', '.NET 4.0', 'SQL', 'Agile'],
    status: 'Completed',
    domain: 'ECM / Document Management',
  },
];
