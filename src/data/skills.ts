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
  { id: 'azure',     name: 'Microsoft Azure',       icon: '☁️', level: 90, category: 'overview' },
  { id: 'arch',      name: 'System Architecture',   icon: '🏗️', level: 95, category: 'overview' },
  { id: 'docker',    name: 'Docker / Kubernetes',   icon: '🐳', level: 85, category: 'overview' },
  { id: 'ai',        name: 'AI / LLM Engineering',  icon: '🤖', level: 80, category: 'overview' },
  { id: 'python',    name: 'Python',                icon: '🐍', level: 72, category: 'overview' },

  // .NET Ecosystem
  { id: 'aspnet',    name: 'ASP.NET Core',          icon: '🔷', level: 95, category: 'dotnet' },
  { id: 'ef',        name: 'Entity Framework',      icon: '🗄️', level: 88, category: 'dotnet' },
  { id: 'signalr',   name: 'SignalR',               icon: '⚡', level: 80, category: 'dotnet' },
  { id: 'blazor',    name: 'Blazor',                icon: '🔥', level: 70, category: 'dotnet' },
  { id: 'grpc',      name: 'gRPC / Protobuf',       icon: '🔗', level: 82, category: 'dotnet' },

  // Cloud & DevOps
  { id: 'aks',       name: 'Azure Kubernetes (AKS)', icon: '☸️', level: 85, category: 'cloud' },
  { id: 'azfunc',    name: 'Azure Functions',       icon: '⚡', level: 88, category: 'cloud' },
  { id: 'azdevops',  name: 'Azure DevOps',          icon: '🔄', level: 90, category: 'cloud' },
  { id: 'terraform', name: 'Terraform / IaC',       icon: '🏗️', level: 75, category: 'cloud' },
  { id: 'cicd',      name: 'CI/CD Pipelines',       icon: '🚀', level: 88, category: 'cloud' },

  // AI & ML
  { id: 'llm',       name: 'LLM / Prompt Engineering', icon: '🧠', level: 82, category: 'ai' },
  { id: 'langchain', name: 'LangChain / Agents',    icon: '🔗', level: 78, category: 'ai' },
  { id: 'openai',    name: 'OpenAI / Azure OpenAI',  icon: '✨', level: 85, category: 'ai' },
  { id: 'mlops',     name: 'MLOps',                 icon: '⚙️', level: 65, category: 'ai' },
  { id: 'rag',       name: 'RAG Pipelines',         icon: '📚', level: 80, category: 'ai' },
];
