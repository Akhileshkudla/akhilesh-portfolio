import { useEffect, useState } from 'react';

const USERNAME = 'Akhileshkudla';
const BASE = 'https://api.github.com';

export interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
}

export interface GitHubProfile {
  public_repos: number;
  followers: number;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { commits?: Array<{ message: string }> };
}

export interface GitHubData {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  events: GitHubEvent[];
}

export function useGitHub(): GitHubData {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function run(): Promise<void> {
      try {
        const [pr, rr, er] = await Promise.all([
          fetch(`${BASE}/users/${USERNAME}`),
          fetch(`${BASE}/users/${USERNAME}/repos?sort=updated&per_page=16`),
          fetch(`${BASE}/users/${USERNAME}/events/public?per_page=10`),
        ]);
        const pd = await pr.json() as GitHubProfile;
        const rd = await rr.json() as GitHubRepo[];
        const ed = await er.json() as GitHubEvent[];
        if (!cancelled) {
          if (pd && typeof pd === 'object' && 'public_repos' in pd) setProfile(pd);
          if (Array.isArray(rd)) setRepos(rd);
          if (Array.isArray(ed)) setEvents(ed);
        }
      } catch { /* graceful: wallpaper works without data */ }
    }
    void run();
    return () => { cancelled = true; };
  }, []);

  return { profile, repos, events };
}
