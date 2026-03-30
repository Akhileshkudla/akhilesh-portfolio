# Story S-08: Contact App (Mail Style)

## Goal
Implement the Contact app window styled like Windows 11 Mail — with a sidebar inbox tree, a pre-composed "message" showing Akhilesh's contact info, and action buttons for email, LinkedIn, and GitHub.

## Acceptance Criteria
- [ ] Window opens with Mail-style two-panel layout
- [ ] Left sidebar shows: Inbox, Sent, Drafts (decorative — no interaction needed)
- [ ] Main panel shows a pre-composed email card
- [ ] Email button opens `mailto:akhikudla@gmail.com`
- [ ] LinkedIn and GitHub buttons are visible (link to `#` placeholder until real URLs added)
- [ ] Dark and light mode styled correctly

## Component to Create

### `src/components/apps/ContactApp.tsx`

#### Left Sidebar (decorative)
```
📥 Inbox (1)     ← "1" unread badge
📤 Sent
📝 Drafts
```
Width: `w-44 border-r`
Active item (Inbox): `bg-[#0078d4]/10 text-[#0078d4]`

#### Main Panel
Looks like an open email:

```
From:    visitor@world.com
To:      akhikudla@gmail.com
Subject: Let's Connect 👋
────────────────────────────────

Hi there,

I'm Akhilesh K — Software Architect & AI Systems Builder.

If you'd like to discuss a project, collaboration, or just 
say hello, reach out via any of the channels below.

I'm particularly interested in:
  • AI-driven systems and autonomous pipelines
  • Backend architecture and distributed systems  
  • Consulting on complex engineering challenges

Looking forward to hearing from you.

— Akhilesh K

────────────────────────────────
[📧 Send Email]  [💼 LinkedIn]  [🐙 GitHub]
```

#### Action Buttons
```tsx
<a href="mailto:akhikudla@gmail.com"
   className="flex items-center gap-2 px-4 py-2 bg-[#0078d4] hover:bg-[#006cbd] text-white text-sm rounded">
  📧 Send Email
</a>
<a href="#" // replace with real LinkedIn URL
   className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-sm rounded">
  💼 LinkedIn
</a>
<a href="#" // replace with real GitHub URL
   className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-sm rounded">
  🐙 GitHub
</a>
```

## Styling Notes
- Email card background: `bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6`
- Email header fields: `text-xs text-zinc-500 dark:text-zinc-400` label + `text-sm text-zinc-800 dark:text-zinc-200` value
- Divider: `border-t border-zinc-200 dark:border-zinc-700 my-4`
- Body text: `text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed`
- Bullet points: use `ul` with `list-disc list-inside`

## Data
No separate data file needed — content is static and lives directly in the component.
Update `src/config/apps.ts` when real LinkedIn/GitHub URLs are known.

## Definition of Done
- [ ] Mail layout renders with sidebar and main panel
- [ ] Pre-composed email displays correctly with all content
- [ ] Email button opens mail client
- [ ] LinkedIn and GitHub buttons render (link to # for now)
- [ ] Dark and light mode correct
- [ ] No TypeScript errors
