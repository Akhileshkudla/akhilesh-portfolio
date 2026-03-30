# Story S-10: Notifications + Polish + Vercel Deploy

## Goal
Add Windows 11-style toast notifications that fire on page load, apply final visual polish across all components, and deploy the site to Vercel.

## Acceptance Criteria
- [ ] Welcome toast fires 500ms after page load
- [ ] "New project" toast fires 2500ms after page load
- [ ] Toasts appear bottom-right, slide in from the right
- [ ] Toasts auto-dismiss after 4 seconds
- [ ] All windows have consistent Win11 polish (shadows, glass, border radius)
- [ ] Desktop icons have a subtle glow on hover
- [ ] Taskbar icons animate on click (scale down briefly)
- [ ] Site deployed to Vercel and accessible via URL
- [ ] Passing build with no TypeScript errors (`npm run build` succeeds)

---

## Part 1: Notifications

### `src/components/notifications/NotificationManager.tsx`
Mount this once in `App.tsx`. Uses `react-hot-toast`.

```tsx
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export const NotificationManager = () => {
  useEffect(() => {
    const t1 = setTimeout(() => {
      toast('👋 Welcome to Akhilesh\'s OS', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: 'rgba(30,30,30,0.9)',
          color: '#fff',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          fontSize: '13px',
          padding: '10px 14px',
        },
      });
    }, 500);

    const t2 = setTimeout(() => {
      toast('📁 New project added: F.A.S.T v1.0', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: 'rgba(30,30,30,0.9)',
          color: '#fff',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          fontSize: '13px',
          padding: '10px 14px',
        },
      });
    }, 2500);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return <Toaster position="bottom-right" />;
};
```

---

## Part 2: Polish Checklist

### Desktop Icons
- Add `drop-shadow-lg` on hover: `hover:drop-shadow-[0_0_8px_rgba(0,120,212,0.5)]`
- Ensure double-click does not also trigger single-click event

### Window
- Verify `shadow-2xl` is on all windows
- Ensure `border border-white/20 dark:border-white/10` is consistent
- Window close button hover: red circle `hover:bg-red-500`
- Window minimize button hover: yellow circle `hover:bg-yellow-400`
- Add `select-none` to TitleBar to prevent text selection during drag

### Taskbar Icons
- Add `active:scale-90` for click press effect
- Active dot should only show when window `isOpen && !isMinimized`

### Start Menu
- Verify backdrop blur is `backdrop-blur-2xl` (stronger than windows)
- Section headers: `text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3`

### About App — Timeline
- Ensure dots are perfectly centered on the timeline line
- Add `transition-colors` to nav items

### Skills App — Progress Bars
- Re-trigger animation (reset to 0 then animate) when switching tabs
  - Solution: use `key={activeTab}` on the skill list wrapper

### Contact App
- Add hover effect on sidebar items even though they're decorative
- Ensure mailto link opens correctly on all browsers

---

## Part 3: Vercel Deploy

### Step 1 — Push to GitHub
```bash
git add .
git commit -m "feat: complete Windows 11 portfolio v1.0"
git push origin main
```

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `akhilesh-portfolio` repository
4. Framework preset: **Vite** (auto-detected)
5. Build command: `npm run build` (default)
6. Output directory: `dist` (default)
7. Click **Deploy**

### Step 3 — Custom Domain (optional)
In Vercel project settings → Domains:
- Add `akhileshk.dev` or similar
- Follow DNS instructions

### Step 4 — Verify
- Open the Vercel URL
- Test all 4 windows open correctly
- Test dark/light toggle persists on reload
- Test on Chrome, Firefox, and Safari

---

## Final `package.json` scripts to verify
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx"
  }
}
```

## Definition of Done
- [ ] Both toasts fire on page load with correct timing
- [ ] `npm run build` completes with 0 errors
- [ ] Site is live on Vercel URL
- [ ] All 4 app windows open, drag, minimize, and close
- [ ] Dark/light toggle works and persists
- [ ] Start Menu opens and closes
- [ ] Tested in Chrome and Firefox
