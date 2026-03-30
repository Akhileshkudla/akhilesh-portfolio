import { type ReactElement, useState } from 'react';
import {
  type AboutSection,
  NAV_ITEMS,
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
} from '@/data/about';

export function AboutApp(): ReactElement {
  const [activeSection, setActiveSection] = useState<AboutSection>('profile');

  return (
    <div className="flex h-full">
      {/* Left nav */}
      <nav className="flex w-52 shrink-0 flex-col gap-1 border-r border-zinc-200 dark:border-zinc-700 p-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => { setActiveSection(item.id); }}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors text-left ${
              activeSection === item.id
                ? 'bg-[#0078d4]/10 text-[#0078d4] border-r-2 border-[#0078d4] font-medium'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            aria-current={activeSection === item.id ? 'true' : undefined}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Right content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'experience' && <ExperienceSection />}
        {activeSection === 'education' && <EducationSection />}
      </div>
    </div>
  );
}

function ProfileSection(): ReactElement {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-800 dark:text-zinc-100 mb-4">Profile</h2>
      <div className="flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0078d4] text-white text-2xl font-medium">
          {PROFILE.initials}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{PROFILE.name}</h3>
          <p className="text-sm text-[#0078d4]">{PROFILE.title}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{PROFILE.location}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">About</h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{PROFILE.about}</p>
      </div>
    </div>
  );
}

function ExperienceSection(): ReactElement {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-800 dark:text-zinc-100 mb-4">Experience</h2>
      <div className="relative border-l-2 border-[#0078d4] ml-2 pl-6 space-y-6">
        {EXPERIENCE.map((entry) => (
          <div key={entry.period} className="relative">
            <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-[#0078d4] shrink-0" />
            <p className="text-xs font-medium text-[#0078d4] mb-1">{entry.period}</p>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{entry.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1">{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection(): ReactElement {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-800 dark:text-zinc-100 mb-4">Education</h2>
      <div className="space-y-4">
        {EDUCATION.map((entry) => (
          <div key={entry.degree}>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{entry.degree}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{entry.details}</p>
          </div>
        ))}
      </div>
      {CERTIFICATIONS.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Certifications</h3>
          <ul className="list-disc list-inside space-y-1">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert} className="text-sm text-zinc-600 dark:text-zinc-400">{cert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
