import { PROFILE, EXPERIENCE, EDUCATION, CERTIFICATIONS, CORE_EXPERTISE } from '@/data/about';
import { SKILLS } from '@/data/skills';
import { PROJECTS } from '@/data/projects';

export interface CommandOutput {
  type: 'text' | 'ascii' | 'table' | 'error' | 'success' | 'info' | 'warn';
  content: string;
}

export interface TerminalCommand {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => CommandOutput[];
}

// ─── helpers ────────────────────────────────────────────────────────────────

function bar(level: number, width = 24): string {
  const filled = Math.round((level / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

function pad(str: string, len: number): string {
  return str.length >= len ? str.slice(0, len) : str + ' '.repeat(len - str.length);
}

// ─── command registry ────────────────────────────────────────────────────────

const COMMANDS: TerminalCommand[] = [
  // ── help ──────────────────────────────────────────────────────────────────
  {
    name: 'help',
    description: 'List available commands',
    execute: () => {
      const lines = [
        'Available commands:',
        '',
        ...COMMANDS.map(
          (c) => `  ${pad(c.usage ?? c.name, 26)} ${c.description}`
        ),
        '',
        "Type any command and press Enter. Use ↑ ↓ to navigate history.",
      ];
      return [{ type: 'info', content: lines.join('\n') }];
    },
  },

  // ── clear ─────────────────────────────────────────────────────────────────
  {
    name: 'clear',
    description: 'Clear the terminal',
    execute: () => [{ type: 'text', content: '__CLEAR__' }],
  },

  // ── echo ──────────────────────────────────────────────────────────────────
  {
    name: 'echo',
    description: 'Echo text back to terminal',
    usage: 'echo <text>',
    execute: (args) => [{ type: 'text', content: args.join(' ') }],
  },

  // ── date ──────────────────────────────────────────────────────────────────
  {
    name: 'date',
    description: 'Show current date and time',
    execute: () => [{ type: 'text', content: new Date().toString() }],
  },

  // ── whoami ────────────────────────────────────────────────────────────────
  {
    name: 'whoami',
    description: 'Display current user',
    execute: () => [{ type: 'text', content: 'visitor@akhilesh-portfolio' }],
  },

  // ── about ─────────────────────────────────────────────────────────────────
  {
    name: 'about',
    description: 'Display profile summary',
    execute: () => {
      const lines = [
        `Name       : ${PROFILE.name}`,
        `Role       : ${PROFILE.title}`,
        `Location   : ${PROFILE.location}`,
        '',
        PROFILE.about,
        '',
        'Core Expertise:',
        ...CORE_EXPERTISE.map((e) => `  ${e.num}. ${e.title} — ${e.desc}`),
      ];
      return [{ type: 'success', content: lines.join('\n') }];
    },
  },

  // ── skills ────────────────────────────────────────────────────────────────
  {
    name: 'skills',
    description: 'Show skill proficiency chart',
    usage: 'skills [category]',
    execute: (args) => {
      const categoryMap: Record<string, string> = {
        languages: 'overview',
        backend: 'backend',
        cloud: 'cloud',
        devops: 'devops',
        ai: 'ai',
        messaging: 'messaging',
      };

      let filtered = SKILLS;
      const arg = args[0]?.toLowerCase();

      if (arg) {
        const mapped = categoryMap[arg] ?? arg;
        filtered = SKILLS.filter((s) => s.category === mapped);
        if (filtered.length === 0) {
          return [{
            type: 'error',
            content: `Unknown category '${arg}'. Valid: languages, backend, cloud, devops, ai, messaging`,
          }];
        }
      } else {
        // top 12 by level
        filtered = [...SKILLS].sort((a, b) => b.level - a.level).slice(0, 12);
      }

      const lines = [
        arg ? `Skills — ${arg}:` : 'Top Skills:',
        '',
        ...filtered.map(
          (s) => `  ${pad(s.name, 20)} ${bar(s.level)} ${s.level}%`
        ),
      ];
      return [{ type: 'info', content: lines.join('\n') }];
    },
  },

  // ── projects ──────────────────────────────────────────────────────────────
  {
    name: 'projects',
    description: 'List all projects',
    execute: () => {
      const lines = [
        'Projects:',
        '',
        `  ${pad('Name', 30)} ${pad('Status', 14)} Domain`,
        `  ${'─'.repeat(30)} ${'─'.repeat(14)} ${'─'.repeat(30)}`,
        ...PROJECTS.map(
          (p) => `  ${pad(p.shortName, 30)} ${pad(p.status, 14)} ${p.domain}`
        ),
        '',
        "Run 'project <name>' for details. E.g. project FAST",
      ];
      return [{ type: 'info', content: lines.join('\n') }];
    },
  },

  // ── project ───────────────────────────────────────────────────────────────
  {
    name: 'project',
    description: 'Show project details',
    usage: 'project <name>',
    execute: (args) => {
      if (!args.length) {
        return [{ type: 'error', content: "Usage: project <name>. Run 'projects' to see all." }];
      }
      const query = args.join(' ').toLowerCase();
      const p = PROJECTS.find(
        (x) => x.name.toLowerCase().includes(query) || x.shortName.toLowerCase().includes(query)
      );
      if (!p) {
        return [{ type: 'error', content: `Project '${args.join(' ')}' not found. Run 'projects' to list all.` }];
      }
      const lines = [
        `┌─ ${p.name}`,
        `│ Status : ${p.status}`,
        `│ Domain : ${p.domain}`,
        `│`,
        `│ ${p.longDescription}`,
        `│`,
        `│ Tech Stack: ${p.techStack.join(', ')}`,
        `└──────────────────────────────────────────────────`,
      ];
      return [{ type: 'success', content: lines.join('\n') }];
    },
  },

  // ── experience ────────────────────────────────────────────────────────────
  {
    name: 'experience',
    description: 'Show work history',
    execute: () => {
      const lines = EXPERIENCE.flatMap((e, i) => [
        `${i === 0 ? '┌' : '├'}─ ${e.period}`,
        `│  ${e.title}`,
        `│  ${e.description}`,
        '│',
      ]);
      lines.push('└────────────────────────────────────────────────');
      return [{ type: 'success', content: ['Work Experience:', '', ...lines].join('\n') }];
    },
  },

  // ── education ─────────────────────────────────────────────────────────────
  {
    name: 'education',
    description: 'Show education and certifications',
    execute: () => {
      const lines = [
        'Education:',
        '',
        ...EDUCATION.map((e) => `  🎓 ${e.degree}\n     ${e.details}`),
        '',
        'Certifications:',
        '',
        ...CERTIFICATIONS.map((c) => `  🏅 ${c}`),
      ];
      return [{ type: 'success', content: lines.join('\n') }];
    },
  },

  // ── contact ───────────────────────────────────────────────────────────────
  {
    name: 'contact',
    description: 'Display contact information',
    execute: () => {
      const lines = [
        'Contact Akhilesh K:',
        '',
        '  📧 Email    : akhikudla@gmail.com',
        '  💼 LinkedIn : https://www.linkedin.com/in/akhileshkudla/',
        '  🐙 GitHub   : https://github.com/Akhileshkudla',
        '  📍 Location : Bangalore, India',
        '',
        "Open the Contact window: 'open contact'",
      ];
      return [{ type: 'info', content: lines.join('\n') }];
    },
  },

  // ── open ──────────────────────────────────────────────────────────────────
  {
    name: 'open',
    description: 'Open a portfolio app window',
    usage: 'open <app>',
    execute: (args) => {
      const appMap: Record<string, string> = {
        about: 'about',
        settings: 'about',
        projects: 'projects',
        explorer: 'projects',
        skills: 'skills',
        'task manager': 'skills',
        contact: 'contact',
        mail: 'contact',
        resume: 'resume',
        terminal: 'terminal',
        game: 'memoryGame',
        memorygame: 'memoryGame',
        memory: 'memoryGame',
      };
      const key = args.join(' ').toLowerCase();
      const appId = appMap[key];
      if (!appId) {
        return [{
          type: 'error',
          content: `Unknown app '${args.join(' ')}'. Valid: about, projects, skills, contact, resume, terminal, game`,
        }];
      }
      // Return a special signal the UI will handle
      return [{ type: 'text', content: `__OPEN__:${appId}` }];
    },
  },

  // ── theme ─────────────────────────────────────────────────────────────────
  {
    name: 'theme',
    description: 'Toggle or set dark/light theme',
    usage: 'theme [dark|light]',
    execute: (args) => {
      const val = args[0]?.toLowerCase();
      if (val && val !== 'dark' && val !== 'light') {
        return [{ type: 'error', content: "Usage: theme [dark|light]" }];
      }
      return [{ type: 'text', content: `__THEME__:${val ?? 'toggle'}` }];
    },
  },

  // ── ascii ─────────────────────────────────────────────────────────────────
  {
    name: 'ascii',
    description: 'Display ASCII art banner',
    execute: () => {
      const art = [
        '',
        '   ___  _  _  _  _  _  _  ____  ____  _  _',
        '  / _ \\| || || || || || ||  __||  __|| || |',
        ' | |_| | || || || || || || |__ | |__ | __ |',
        ' |  _  | || || || || || ||  __||  __|| || |',
        ' | | | | || || || |/ // /| |__ | |__ | || |',
        ' |_| |_|_||_||__|__/_/  |____||____||_||_|',
        '',
        '  Software Architect & AI Systems Engineer',
        '  Siemens Technology Services | Bangalore, India',
        '',
      ];
      return [{ type: 'ascii', content: art.join('\n') }];
    },
  },
];

// ─── registry API ─────────────────────────────────────────────────────────

export function getCommand(name: string): TerminalCommand | undefined {
  return COMMANDS.find((c) => c.name === name);
}

export function getAllCommands(): TerminalCommand[] {
  return COMMANDS;
}

export const WELCOME_BANNER = [
  '╔══════════════════════════════════════════════════════╗',
  '║   Akhilesh K — Portfolio Terminal           v1.0.0  ║',
  '║   Windows Terminal  •  PowerShell Edition            ║',
  '╠══════════════════════════════════════════════════════╣',
  "║   Type 'help' to see available commands              ║",
  "║   Type 'about' to learn about me                    ║",
  "║   Type 'open <app>' to launch any portfolio section  ║",
  '╚══════════════════════════════════════════════════════╝',
].join('\n');
