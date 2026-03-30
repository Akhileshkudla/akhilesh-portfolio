---
mode: agent
description: Scaffold a new Windows 11 app window component for the portfolio
---

Create a new app window component for the portfolio.

## Steps

1. Ask the user for:
   - App ID (e.g., `blog`)
   - Window title (e.g., `Blog Posts`)
   - Icon emoji
   - Default size (width x height)

2. Add the app entry to `src/config/apps.ts`

3. Create `src/components/apps/[AppName]App.tsx` with:
   - The Windows 11 style matching the existing apps
   - Placeholder content with the correct heading and a "Coming soon" message
   - Full TypeScript types
   - Dark mode Tailwind classes

4. Add a desktop icon entry to `src/components/desktop/DesktopIconGrid.tsx`

5. Register the window in `src/components/desktop/WindowLayer.tsx`

6. Confirm the component renders by checking for TypeScript errors with #problems
