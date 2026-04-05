export interface TechCard {
  techId: string;
  icon: string;
  label: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_CONFIG: Record<Difficulty, { pairs: number; cols: number; label: string }> = {
  easy:   { pairs: 6,  cols: 4, label: 'Easy'   },
  medium: { pairs: 8,  cols: 4, label: 'Medium'  },
  hard:   { pairs: 12, cols: 6, label: 'Hard'    },
};

export const TECH_CARDS: TechCard[] = [
  { techId: 'csharp',     icon: '⚙️',  label: 'C#'         },
  { techId: 'typescript', icon: '🔷',  label: 'TypeScript' },
  { techId: 'python',     icon: '🐍',  label: 'Python'     },
  { techId: 'docker',     icon: '🐳',  label: 'Docker'     },
  { techId: 'kubernetes', icon: '☸️',  label: 'Kubernetes' },
  { techId: 'azure',      icon: '☁️',  label: 'Azure'      },
  { techId: 'react',      icon: '⚛️',  label: 'React'      },
  { techId: 'nodejs',     icon: '🟩',  label: 'Node.js'    },
  { techId: 'rust',       icon: '🦀',  label: 'Rust'       },
  { techId: 'kafka',      icon: '📨',  label: 'Kafka'      },
  { techId: 'redis',      icon: '🔴',  label: 'Redis'      },
  { techId: 'postgres',   icon: '🐘',  label: 'PostgreSQL' },
];

export interface GameCard {
  id: string;
  techId: string;
  icon: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

export function buildDeck(difficulty: Difficulty): GameCard[] {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];
  const pool = TECH_CARDS.slice(0, pairs);
  const cards: GameCard[] = pool.flatMap((tech) => [
    { id: `${tech.techId}-a`, techId: tech.techId, icon: tech.icon, label: tech.label, isFlipped: false, isMatched: false },
    { id: `${tech.techId}-b`, techId: tech.techId, icon: tech.icon, label: tech.label, isFlipped: false, isMatched: false },
  ]);
  return shuffle(cards);
}
