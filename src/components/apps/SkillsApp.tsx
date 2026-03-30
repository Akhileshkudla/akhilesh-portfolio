import { type ReactElement, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type SkillCategory, SKILL_TABS, SKILLS } from '@/data/skills';

export function SkillsApp(): ReactElement {
  const [activeTab, setActiveTab] = useState<SkillCategory>('overview');
  const filteredSkills = SKILLS.filter((s) => s.category === activeTab);

  return (
    <div className="flex h-full flex-col">
      {/* Task Manager header */}
      <div className="flex shrink-0 items-center justify-between bg-zinc-900 dark:bg-zinc-950 px-3 py-2.5 font-mono text-xs text-green-400">
        <span>Skill Utilization Monitor</span>
        <span>
          Status: <span className="text-green-300">ACTIVE</span> | Load: HIGH
        </span>
      </div>

      {/* Tab bar */}
      <div role="tablist" className="flex shrink-0 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
        {SKILL_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => { setActiveTab(tab.id); }}
            className={`border-b-2 px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-[#0078d4] text-[#0078d4]'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skill list */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {filteredSkills.map((skill, index) => (
              <div key={skill.id} className="flex items-center gap-3 py-2">
                <span className="w-6 shrink-0 text-center text-base">{skill.icon}</span>
                <span className="w-36 shrink-0 text-sm text-zinc-700 dark:text-zinc-200">{skill.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <motion.div
                    className="h-2 rounded-full bg-[#0078d4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${String(skill.level)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.08 }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-xs text-zinc-500 dark:text-zinc-400">
                  {skill.level}%
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
