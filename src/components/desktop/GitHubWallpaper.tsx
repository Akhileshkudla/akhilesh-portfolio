import { type ReactElement, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGitHub, type GitHubRepo } from '@/hooks/useGitHub';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f0db4f',
  'C#': '#68217a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Java: '#b07219',
  Go: '#00add8',
  Rust: '#dea584',
};
const ACCENT = '#0078d4';

function getLangColor(lang: string | null): string {
  if (!lang) return ACCENT;
  return LANG_COLORS[lang] ?? ACCENT;
}

function nodeRadius(stars: number): number {
  return Math.min(4 + Math.sqrt(stars) * 1.5, 14);
}

function repoPos(i: number): { x: number; y: number } {
  const angle = i * 2.399963;
  const r = Math.min(160 + 65 * Math.sqrt(i + 1), 400);
  return { x: 960 + r * Math.cos(angle), y: 540 + r * 0.62 * Math.sin(angle) };
}

function timeAgo(dateStr: string): string {
  const h = Math.floor((Date.now() - new Date(dateStr).getTime()) / 3600000);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d < 30 ? `${d}d ago` : `${Math.floor(d / 30)}mo ago`;
}

function wasRecent(dateStr: string): boolean {
  return Date.now() - new Date(dateStr).getTime() < 30 * 24 * 3600000;
}

interface NodeProps {
  repo: GitHubRepo;
  pos: { x: number; y: number };
  idx: number;
}

function RepoNode({ repo, pos, idx }: NodeProps): ReactElement {
  const color = getLangColor(repo.language);
  const r = nodeRadius(repo.stargazers_count);
  const origin = `${pos.x}px ${pos.y}px`;

  return (
    <g>
      {wasRecent(repo.pushed_at) && (
        <motion.g
          style={{ transformOrigin: origin }}
          animate={{ scale: [0.5, 2.6], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.28, ease: 'easeOut' }}
        >
          <circle cx={pos.x} cy={pos.y} r={r + 10} fill="none" stroke={color} strokeWidth={0.8} />
        </motion.g>
      )}
      <motion.g
        style={{ transformOrigin: origin }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05 * idx, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle cx={pos.x} cy={pos.y} r={r + 6} fill={color} opacity={0.1} />
        <circle cx={pos.x} cy={pos.y} r={r} fill={color} opacity={0.88} />
      </motion.g>
      <motion.text
        x={pos.x}
        y={pos.y + r + 13}
        textAnchor="middle"
        fontSize={8.5}
        fill={color}
        style={{ fontFamily: 'ui-monospace, monospace' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 0.05 * idx + 0.4 }}
      >
        {repo.name.length > 18 ? `${repo.name.slice(0, 16)}\u2026` : repo.name}
      </motion.text>
    </g>
  );
}

export function GitHubWallpaper(): ReactElement {
  const { profile, repos, events } = useGitHub();

  const positions = useMemo(() => repos.map((_, i) => repoPos(i)), [repos]);

  const lines = useMemo(() => {
    const out: Array<{ key: string; x1: number; y1: number; x2: number; y2: number; color: string }> = [];
    for (let i = 0; i < repos.length; i++) {
      for (let j = i + 1; j < repos.length; j++) {
        const a = repos[i]; const b = repos[j];
        if (!a || !b || !a.language || a.language !== b.language) continue;
        const pa = positions[i]; const pb = positions[j];
        if (!pa || !pb) continue;
        const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
        if (d < 270) {
          out.push({ key: `${i}-${j}`, x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y, color: getLangColor(a.language) });
        }
      }
    }
    return out;
  }, [repos, positions]);

  const feed = useMemo(() =>
    events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 4)
      .map((e) => ({
        id: e.id,
        repo: e.repo.name.split('/')[1] ?? e.repo.name,
        msg: (e.payload.commits?.[0]?.message ?? '').split('\n')[0] ?? 'Update',
        when: timeAgo(e.created_at),
      })),
    [events],
  );

  const totalStars = useMemo(
    () => repos.reduce((s, r) => s + r.stargazers_count, 0),
    [repos],
  );

  return (
    <div className="absolute inset-0">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#dbeeff] via-[#c8e6f7] to-[#b8d4f0] dark:from-[#050510] dark:via-[#0a0a1a] dark:to-[#0d0d20] transition-colors duration-500" />
      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,rgba(0,120,212,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,rgba(0,120,212,0.18)_0%,transparent_70%)]" />

      {/* Constellation SVG */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Windows logo watermark */}
        <g className="opacity-[0.05] dark:opacity-[0.08]" fill="#0078d4">
          <rect x="822" y="430" width="116" height="116" rx="13" />
          <rect x="952" y="430" width="116" height="116" rx="13" />
          <rect x="822" y="560" width="116" height="116" rx="13" />
          <rect x="952" y="560" width="116" height="116" rx="13" />
        </g>

        {/* Language connection lines */}
        {lines.map((l) => (
          <motion.line
            key={l.key}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={l.color} strokeWidth={0.7}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8 }}
          />
        ))}

        {/* Repo nodes */}
        {repos.map((repo, i) => {
          const pos = positions[i];
          if (!pos) return null;
          return <RepoNode key={repo.id} repo={repo} pos={pos} idx={i} />;
        })}
      </svg>

      {/* Stats — top right */}
      {profile && (
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-amber-500 dark:text-amber-400">&#11088; {totalStars}</span>
          <span className="text-zinc-300 dark:text-zinc-600">·</span>
          <span className="text-[#0078d4]">&#128230; {profile.public_repos} repos</span>
          <span className="text-zinc-300 dark:text-zinc-600">·</span>
          <span>&#128101; {profile.followers}</span>
        </motion.div>
      )}

      {/* Activity feed — above taskbar */}
      {feed.length > 0 && (
        <div className="absolute bottom-16 left-4 flex flex-col gap-1.5 pointer-events-none">
          {feed.map((item, i) => (
            <motion.div
              key={item.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 dark:bg-black/25 backdrop-blur-md border border-white/20 dark:border-white/[0.08] text-[11px] font-mono max-w-sm"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.12 }}
            >
              <span className="text-green-500 dark:text-green-400 shrink-0">&#8250;</span>
              <span className="text-[#0078d4] shrink-0">{item.repo}</span>
              <span className="text-zinc-700 dark:text-zinc-300 truncate">{item.msg}</span>
              <span className="text-zinc-400 shrink-0 text-[10px]">{item.when}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
