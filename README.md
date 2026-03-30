# Akhilesh K — Portfolio

> A personal portfolio website that looks and feels like a Windows 11 desktop OS in the browser.

**Live:** [akhileshk.vercel.app](https://akhileshk.vercel.app) *(coming soon)*

---

## What Is This?

Instead of a traditional scroll-based portfolio, this site simulates a **Windows 11 desktop**. Visitors interact with it by:
- Clicking desktop icons to open "app" windows
- Dragging windows around the screen
- Using the Start menu to navigate
- Toggling between dark and light mode via the taskbar

Each "app" is a section of the portfolio:
| App | Content |
|-----|---------|
| ⚙️ Settings | About Me — bio, experience, career timeline |
| 📁 File Explorer | Projects — F.A.S.T, Unified Substation Visualiser |
| 📊 Task Manager | Skills — .NET, Azure, Docker/K8s, AI |
| ✉️ Mail | Contact — email, LinkedIn, GitHub |

---

## Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** (dark mode via `class` strategy)
- **Framer Motion** (window animations)
- **react-draggable** (window drag)
- **Zustand** (window state, theme)
- **react-hot-toast** (Win11-style notifications)
- **Vercel** (deploy)

---

## Getting Started

```bash
# Clone
git clone https://github.com/akhikudla/akhilesh-portfolio.git
cd akhilesh-portfolio

# Install
npm install

# Dev
npm run dev

# Build
npm run build
```

---

## Project Structure

```
src/
  components/
    desktop/        # Wallpaper, icon grid, window layer
    taskbar/        # Taskbar, start menu, system tray
    window/         # Reusable draggable window shell
    apps/           # About, Projects, Skills, Contact
    notifications/  # Toast manager
  store/            # Zustand: window state + theme
  config/           # App definitions (APP_CONFIG)
  data/             # Projects, skills data
  types/            # Shared TypeScript types
```

---

## GitHub Copilot Setup

This project is fully configured for GitHub Copilot in VS Code.

| File | Purpose |
|------|---------|
| `.github/copilot-instructions.md` | Always-on project context |
| `.github/chatmodes/developer.chatmode.md` | React dev persona (Claude Opus) |
| `.github/chatmodes/architect.chatmode.md` | Planning & design persona |
| `.github/chatmodes/reviewer.chatmode.md` | Code review persona |
| `.github/instructions/react-components.instructions.md` | Component patterns |
| `.github/instructions/tailwind-win11.instructions.md` | Win11 design tokens |
| `.github/instructions/zustand-store.instructions.md` | Store patterns |
| `.github/prompts/new-app-window.prompt.md` | Scaffold a new app window |
| `.github/prompts/scaffold-story.prompt.md` | Generate a story file |

### Using Chat Modes in VS Code
1. Open GitHub Copilot Chat (`Ctrl+Shift+I`)
2. Click the mode selector dropdown
3. Choose **Developer**, **Architect**, or **Reviewer**
4. Start chatting — the mode gives Copilot the right persona

### Implementing a Story
1. Open `docs/stories/S-XX-name.md`
2. Switch to **Developer** mode
3. Type: `Implement #file:docs/stories/S-XX-name.md`

---

## Build Order

See `docs/PRD.md` Section 6 (Story Map) for the full ordered list of stories.

---

## Deploy

Connected to Vercel. Every push to `main` auto-deploys.

```bash
# Manual deploy
npx vercel --prod
```
