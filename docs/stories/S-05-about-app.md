# Story S-05: About Me App (Settings Style)

## Goal
Implement the "About Me" app window that opens when the user double-clicks the Settings icon — styled to look like the Windows 11 Settings app, showing Akhilesh's profile, career experience, and background.

## Acceptance Criteria
- [ ] Window opens with Settings-style two-panel layout (left nav + right content)
- [ ] Three nav sections: Profile, Experience, Education
- [ ] Profile section: avatar placeholder, name, tagline, location
- [ ] Experience section: timeline of career milestones
- [ ] Content panel scrolls independently if content overflows
- [ ] Fully styled in dark and light mode

## Component to Create

### `src/components/apps/AboutApp.tsx`
Two-column layout:
- Left: nav list `w-52 border-r`
- Right: scrollable content area

Nav items (clicking sets active section):
- 👤 Profile
- 💼 Experience  
- 🎓 Education

## Content Data

### Profile Section
```
Name: Akhilesh K
Title: Software Architect & AI Systems Builder
Location: India 🇮🇳
About: 10+ years of experience designing and building scalable, 
high-performance backend systems. Currently focused on building 
intelligent AI applications and autonomous pipelines that transform 
how software is conceived, designed, and delivered.
```

Avatar: A styled div with initials "AK" — `w-20 h-20 rounded-full bg-[#0078d4] flex items-center justify-center text-white text-2xl font-medium`

### Experience Section (Timeline)
```
2023 – Present  |  AI Systems Architect
  Building AI-driven applications, LLM pipelines, and autonomous 
  software engineering tools. Creator of F.A.S.T — Fully Automated 
  Software Transformation system.

2018 – 2023  |  Senior Software Architect
  Designed and led development of enterprise-scale backend platforms.
  Expertise in .NET, Azure cloud-native architecture, and 
  microservices.

2013 – 2018  |  Software Developer → Lead Developer
  Built backend systems and APIs across multiple domains including 
  energy, finance, and enterprise SaaS. 
  Progressed from developer to technical lead.
```

### Education Section
```
B.E. / B.Tech in Computer Science or related field
(Add your actual qualification here)

Certifications (add if applicable):
- Microsoft Azure Solutions Architect
- Any AI/ML certifications
```

## Styling Notes
- Left nav active state: `bg-[#0078d4]/10 text-[#0078d4] border-r-2 border-[#0078d4]`
- Timeline: left border `border-l-2 border-[#0078d4]` with circle dots at each entry
- Section headings: `text-lg font-medium text-zinc-800 dark:text-zinc-100 mb-4`
- Timeline dot: `w-3 h-3 rounded-full bg-[#0078d4] -ml-1.5 mt-1.5 flex-shrink-0`

## Data File
Create `src/data/about.ts` with all content as typed constants (no hardcoding in JSX).

## Definition of Done
- [ ] All three sections render with correct content
- [ ] Nav switching works (clicking nav item shows correct section)
- [ ] Timeline renders with dots and left border
- [ ] Dark and light mode both look correct
- [ ] Content scrolls if window is resized small
- [ ] No TypeScript errors
