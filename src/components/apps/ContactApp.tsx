import type { ReactElement } from 'react';

interface SidebarItem {
  icon: string;
  label: string;
  badge?: number;
  active?: boolean;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: '📥', label: 'Inbox', badge: 1, active: true },
  { icon: '📤', label: 'Sent' },
  { icon: '📝', label: 'Drafts' },
];

export function ContactApp(): ReactElement {
  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-44 border-r border-zinc-200 dark:border-zinc-700 py-2 flex-shrink-0">
        {SIDEBAR_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-3 py-2 text-sm cursor-default transition-colors ${
              item.active
                ? 'bg-[#0078d4]/10 text-[#0078d4]'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <span>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && (
              <span className="text-xs bg-[#0078d4] text-white rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Main panel */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          {/* Email header */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-14">From:</span>
              <span className="text-sm text-zinc-800 dark:text-zinc-200">visitor@world.com</span>
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-14">To:</span>
              <span className="text-sm text-zinc-800 dark:text-zinc-200">akhikudla@gmail.com</span>
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-14">Subject:</span>
              <span className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                Let&apos;s Connect 👋
              </span>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-700 my-4" />

          {/* Email body */}
          <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4">
            <p>Hi there,</p>
            <p>
              I&apos;m <strong>Akhilesh K</strong> — Software Architect &amp; AI Systems Engineer at Siemens.
            </p>
            <p>
              If you&apos;d like to discuss a project, collaboration, or just say hello, reach out
              via any of the channels below.
            </p>
            <p>I&apos;m particularly interested in:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>AI-driven systems and autonomous pipelines</li>
              <li>Backend architecture and distributed systems</li>
              <li>Consulting on complex engineering challenges</li>
            </ul>
            <p>Looking forward to hearing from you.</p>
            <p>— Akhilesh K</p>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-700 my-4" />

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <a
              href="mailto:akhismail@ymail.com"
              className="flex items-center gap-2 px-4 py-2 bg-[#0078d4] hover:bg-[#006cbd] text-white text-sm rounded"
            >
              📧 Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/akhileshkudla/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-sm text-zinc-800 dark:text-zinc-200 rounded"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com/Akhileshkudla"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-sm text-zinc-800 dark:text-zinc-200 rounded"
            >
              🐙 GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
