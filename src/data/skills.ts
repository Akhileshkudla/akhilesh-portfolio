export type SkillCategory = 'overview' | 'dotnet' | 'cloud' | 'ai';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  category: SkillCategory;
}

export interface SkillTab {
  id: SkillCategory;
  label: string;
}

export const SKILL_TABS: SkillTab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'dotnet', label: '.NET Ecosystem' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ai', label: 'AI & ML' },
];

export const SKILLS: Skill[] = [
  // Overview
  { id: 'csharp',    name: 'C# / .NET',            icon: '⚙️', level: 95, category: 'overview' },
  { id: 'azure',     name: 'Microsoft Azure',       icon: '☁️', level: 92, category: 'overview' },
  { id: 'arch',      name: 'System Architecture',   icon: '🏗️', level: 95, category: 'overview' },
  { id: 'docker',    name: 'Docker / Kubernetes',   icon: '🐳', level: 88, category: 'overview' },
  { id: 'ai',        name: 'AI / LLM Engineering',  icon: '🤖', level: 88, category: 'overview' },
  { id: 'python',    name: 'Python',                icon: '🐍', level: 75, category: 'overview' },

  // .NET Ecosystem
  { id: 'dotnet-fw', name: '.NET / WPF / WinForms', icon: '🔷', level: 95, category: 'dotnet' },
  { id: 'wcf',       name: 'WCF / REST APIs',       icon: '🔗', level: 90, category: 'dotnet' },
  { id: 'grpc',      name: 'gRPC / Protobuf',       icon: '⚡', level: 82, category: 'dotnet' },
  { id: 'microsvcs', name: 'Microservices',         icon: '🧩', level: 88, category: 'dotnet' },
  { id: 'nunit',     name: 'NUnit / Mocking',       icon: '🧪', level: 85, category: 'dotnet' },

  // Cloud & DevOps
  { id: 'aks',       name: 'Azure Kubernetes (AKS)', icon: '☸️', level: 88, category: 'cloud' },
  { id: 'azfunc',    name: 'Azure Functions',       icon: '⚡', level: 88, category: 'cloud' },
  { id: 'azdevops',  name: 'Azure DevOps',          icon: '🔄', level: 90, category: 'cloud' },
  { id: 'cosmosdb',  name: 'Cosmos DB / Service Bus', icon: '🗄️', level: 82, category: 'cloud' },
  { id: 'cicd',      name: 'CI/CD Pipelines',       icon: '🚀', level: 90, category: 'cloud' },

  // AI & ML
  { id: 'llm',       name: 'LLM / Prompt Engineering',  icon: '🧠', level: 88, category: 'ai' },
  { id: 'multiagent',name: 'Multi-Agent Systems',       icon: '🤝', level: 85, category: 'ai' },
  { id: 'rag',       name: 'RAG Pipelines',             icon: '📚', level: 85, category: 'ai' },
  { id: 'mcp',       name: 'Model Context Protocol',    icon: '🔌', level: 82, category: 'ai' },
  { id: 'openai',    name: 'Azure OpenAI / AI Foundry', icon: '✨', level: 88, category: 'ai' },
  { id: 'langchain', name: 'LangChain / Semantic Kernel', icon: '🔗', level: 80, category: 'ai' },
];
