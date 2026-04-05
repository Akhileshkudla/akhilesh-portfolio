export type SkillCategory = 'overview' | 'backend' | 'cloud' | 'ai' | 'messaging' | 'devops';

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
  { id: 'overview',   label: 'Languages' },
  { id: 'backend',    label: 'Backend' },
  { id: 'cloud',      label: 'Cloud & Infra' },
  { id: 'devops',     label: 'DevOps' },
  { id: 'ai',         label: 'AI & Data' },
  { id: 'messaging',  label: 'Messaging' },
];

export const SKILLS: Skill[] = [
  // Languages
  { id: 'csharp',      name: 'C#',              icon: '⚙️', level: 95, category: 'overview' },
  { id: 'typescript',  name: 'TypeScript',       icon: '🔷', level: 88, category: 'overview' },
  { id: 'javascript',  name: 'JavaScript',       icon: '🟨', level: 85, category: 'overview' },
  { id: 'python',      name: 'Python',           icon: '🐍', level: 75, category: 'overview' },
  { id: 'rust',        name: 'Rust',             icon: '🦀', level: 60, category: 'overview' },
  { id: 'sql',         name: 'SQL',              icon: '🗄️', level: 88, category: 'overview' },

  // Backend & Frameworks
  { id: 'dotnet8',     name: '.NET 8',           icon: '🔷', level: 95, category: 'backend' },
  { id: 'nodejs',      name: 'Node.js',          icon: '🟩', level: 80, category: 'backend' },
  { id: 'graphql',     name: 'GraphQL (HotChocolate)', icon: '🍫', level: 78, category: 'backend' },
  { id: 'express',     name: 'Express',          icon: '🚂', level: 78, category: 'backend' },
  { id: 'mediatr',     name: 'MediatR',          icon: '📨', level: 88, category: 'backend' },
  { id: 'ddd',         name: 'DDD',              icon: '🏗️', level: 90, category: 'backend' },
  { id: 'microsvcs',   name: 'Microservices',    icon: '🧩', level: 90, category: 'backend' },
  { id: 'grpc-be',     name: 'gRPC',             icon: '⚡', level: 85, category: 'backend' },

  // Cloud & Infrastructure
  { id: 'azure',       name: 'Azure',            icon: '☁️', level: 92, category: 'cloud' },
  { id: 'aws',         name: 'AWS',              icon: '🟠', level: 72, category: 'cloud' },
  { id: 'gcp',         name: 'GCP',              icon: '🔵', level: 65, category: 'cloud' },
  { id: 'kubernetes',  name: 'Kubernetes',       icon: '☸️', level: 88, category: 'cloud' },
  { id: 'docker',      name: 'Docker',           icon: '🐳', level: 90, category: 'cloud' },
  { id: 'helm',        name: 'Helm',             icon: '⎈',  level: 80, category: 'cloud' },
  { id: 'aks',         name: 'AKS',              icon: '🔵', level: 88, category: 'cloud' },
  { id: 'bicep',       name: 'Bicep',            icon: '💪', level: 82, category: 'cloud' },
  { id: 'terraform',   name: 'Terraform',        icon: '🏗️', level: 78, category: 'cloud' },

  // DevOps & Tooling
  { id: 'azdevops',    name: 'Azure DevOps',     icon: '🔄', level: 92, category: 'devops' },
  { id: 'jenkins',     name: 'Jenkins',          icon: '🤵', level: 75, category: 'devops' },
  { id: 'argocd',      name: 'ArgoCD',           icon: '🐙', level: 78, category: 'devops' },
  { id: 'fluxcd',      name: 'FluxCD',           icon: '🌊', level: 72, category: 'devops' },
  { id: 'cicd',        name: 'CI/CD Pipelines',  icon: '🚀', level: 92, category: 'devops' },
  { id: 'sonarqube',   name: 'SonarQube',        icon: '🔍', level: 80, category: 'devops' },
  { id: 'oauth2',      name: 'OAuth2 / OIDC',    icon: '🔐', level: 85, category: 'devops' },

  // AI & Data
  { id: 'azureopenai', name: 'Azure OpenAI',     icon: '✨', level: 90, category: 'ai' },
  { id: 'rag',         name: 'RAG Pipelines',    icon: '📚', level: 88, category: 'ai' },
  { id: 'multiagent',  name: 'Agentic AI',       icon: '🤝', level: 85, category: 'ai' },
  { id: 'mcp',         name: 'MCP',              icon: '🔌', level: 82, category: 'ai' },
  { id: 'databricks',  name: 'Databricks',       icon: '🧱', level: 70, category: 'ai' },
  { id: 'cosmosdb',    name: 'CosmosDB',         icon: '🌐', level: 85, category: 'ai' },
  { id: 'dynamodb',    name: 'DynamoDB',         icon: '⚡', level: 68, category: 'ai' },
  { id: 'redis',       name: 'Redis',            icon: '🔴', level: 80, category: 'ai' },
  { id: 'cassandra',   name: 'Cassandra',        icon: '👁️', level: 65, category: 'ai' },
  { id: 'postgres',    name: 'PostgreSQL',       icon: '🐘', level: 82, category: 'ai' },

  // Messaging & Integration
  { id: 'kafka',       name: 'Kafka',            icon: '📨', level: 82, category: 'messaging' },
  { id: 'rabbitmq',    name: 'RabbitMQ',         icon: '🐇', level: 80, category: 'messaging' },
  { id: 'servicebus',  name: 'Azure Service Bus', icon: '🚌', level: 88, category: 'messaging' },
  { id: 'pubsub',      name: 'Pub/Sub',          icon: '📡', level: 78, category: 'messaging' },
  { id: 'dapr',        name: 'Dapr',             icon: '🎭', level: 75, category: 'messaging' },
  { id: 'apim',        name: 'APIM',             icon: '🔀', level: 82, category: 'messaging' },
];
