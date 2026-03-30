# Product Requirements Document
## Akhilesh K — Windows 11 OS Portfolio

**Version:** 1.0  
**Owner:** Akhilesh K  
**Stack:** React + Vite + TypeScript + Tailwind CSS + Framer Motion  
**Target Deploy:** Vercel

---

## 1. Vision

Build a personal portfolio website that looks and feels like a **Windows 11 desktop operating system** running in the browser. Visitors interact with the portfolio by clicking desktop icons to open app windows — each "app" is a section of the portfolio. The experience should be memorable, interactive, and showcase Akhilesh's personality as a builder who loves systems and interfaces.

---

## 2. Users & Goals

| User | Goal |
|------|------|
| Recruiters / HRs | Quickly understand Akhilesh's experience, stack, and seniority |
| Technical leads | Explore project depth and architectural thinking |
| Collaborators | Find contact details and get a sense of personality |

**Success criteria:**
- Visitor spends > 60 seconds interacting
- All 4 app windows are openable and contain correct content
- Site loads in < 2s on Vercel
- Fully responsive down to 768px (tablet)
- Passes WCAG AA accessibility for keyboard navigation

---

## 3. Core Features

### 3.1 Desktop Shell
- Full-viewport desktop with wallpaper (dark/light variant)
- 4 desktop icons arranged in a grid (top-left area)
- Right-click on desktop → context menu (placeholder)
- Animated desktop icon hover (subtle scale + glow)

### 3.2 Taskbar
- Fixed to bottom, full width, height 48px
- **Start button** (Windows logo) on left — opens Start Menu
- **Pinned app icons** in center (mirrors desktop icons)
- **System tray** on right: theme toggle (🌙/☀️), clock (live), Wi-Fi icon
- Clicking a minimized app's taskbar icon restores the window

### 3.3 Start Menu
- Opens above taskbar on Start button click
- Frosted glass panel, ~500px wide, centered above taskbar
- **Pinned section:** 2-row grid of all 4 app icons
- **Recommended section:** Shows the 2 projects as cards
- **Footer:** Akhilesh K name + email + sign-out icon (no-op)
- Closes on outside click or pressing Escape

### 3.4 Window Shell (Reusable Component)
- Frosted glass background
- Title bar: App icon + App name on left; minimize / maximize / close on right
- Draggable via title bar (react-draggable)
- Clicking window body brings it to front (z-index)
- Minimize: hides window, keeps taskbar icon active (dot indicator)
- Maximize: fills viewport minus taskbar
- Close: removes from open windows list
- Open animation: scale from 0.8 → 1 + fade in (Framer Motion)
- Close animation: scale 1 → 0.8 + fade out

### 3.5 App: About Me (Settings style)
- Left nav panel: sections (Profile, Experience, Education)
- **Profile section:** Avatar placeholder, name, tagline, location (India)
- **Experience section:** Timeline — current AI work, 10+ yrs backend, key roles
- **Education section:** Degrees / certifications

### 3.6 App: Projects (File Explorer style)
- Left sidebar: "This PC > Portfolio > Projects"
- File/folder grid view with 2 project folders
- Clicking a folder opens a detail pane (right panel):
  - **F.A.S.T:** Name, description, tech used, status (In Progress), GitHub link placeholder
  - **Unified Substation Visualiser:** Name, description, domain, tech used
- Breadcrumb navigation at top

### 3.7 App: Skills (Task Manager style)
- Tab bar: Overview / .NET Ecosystem / Cloud & DevOps / AI & ML
- **Overview tab:** Animated bar chart of top skills (usage % bars that animate on open)
  - .NET / C#: 95%
  - Azure: 90%
  - Docker / Kubernetes: 85%
  - System Architecture: 95%
  - AI / LLM Engineering: 75%
  - Python: 70%
- CPU/memory style header showing "Skill Load: High"
- Each skill row: icon + name + animated progress bar + percentage

### 3.8 App: Contact (Mail style)
- Left sidebar: Inbox / Sent / Drafts (decorative)
- Main panel: Pre-filled "compose" window
  - **To:** akhikudla@gmail.com (mailto link)
  - **Subject:** "Let's Connect"
  - Body: short intro about Akhilesh + links
- Action buttons: LinkedIn (placeholder), GitHub (placeholder), Email (mailto)
- Social icons row at bottom

### 3.9 Notifications (Toast)
- On first load (500ms delay): "👋 Welcome to Akhilesh's OS"
- On 2s delay: "📁 New project added: F.A.S.T v1.0"
- Windows 11 style: bottom-right, slide-in from right, auto-dismiss after 4s

### 3.10 Dark / Light Theme
- Default: Dark mode
- Toggle in taskbar tray
- Wallpaper changes (dark navy ↔ light blue)
- All windows update via Tailwind `dark:` classes
- Persisted in `localStorage`

---

## 4. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | LCP < 2s, no layout shift |
| Responsive | Works on 768px+ (tablet & desktop) |
| Accessibility | Keyboard-navigable windows, ARIA labels on icons |
| Browser support | Chrome, Firefox, Safari, Edge (latest) |
| Deploy | Vercel with automatic deploys from `main` branch |

---

## 5. Out of Scope (v1)
- Mobile (< 768px) — show a "best viewed on desktop" message
- Blog section
- Real contact form (backend)
- Animations on scroll
- Sound effects

---

## 6. Story Map (Build Order)

| Story | Description | Priority |
|-------|-------------|----------|
| S-01 | Project scaffold (Vite + React + TS + Tailwind) | P0 |
| S-02 | Desktop shell + wallpaper + icon grid | P0 |
| S-03 | Taskbar (layout only, no Start menu yet) | P0 |
| S-04 | Reusable Window component (drag, z-index, open/close) | P0 |
| S-05 | Zustand windowStore + themeStore | P0 |
| S-06 | About Me app (Settings style) | P1 |
| S-07 | Projects app (File Explorer style) | P1 |
| S-08 | Skills app (Task Manager style) | P1 |
| S-09 | Contact app (Mail style) | P1 |
| S-10 | Start Menu | P2 |
| S-11 | Notifications (toasts on load) | P2 |
| S-12 | Dark/Light theme toggle + persistence | P2 |
| S-13 | Polish: animations, hover states, transitions | P3 |
| S-14 | Vercel deploy + domain config | P3 |
