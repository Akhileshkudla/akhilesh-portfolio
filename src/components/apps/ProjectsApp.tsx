import { type ReactElement, useState, useRef, useCallback } from 'react';
import { type Project, PROJECTS } from '@/data/projects';

const STATUS_STYLES: Record<Project['status'], string> = {
  'In Progress': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
};

const MIN_PANEL_WIDTH = 220;
const MAX_PANEL_WIDTH = 520;
const DEFAULT_PANEL_WIDTH = 320;

export function ProjectsApp(): ReactElement {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = PROJECTS.find((p) => p.id === selectedId) ?? null;

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const containerRight = containerRef.current.getBoundingClientRect().right;
      const newWidth = Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, containerRight - ev.clientX));
      setPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className="flex h-full flex-col">
      {/* Breadcrumb bar */}
      <div className="flex shrink-0 items-center gap-1 border-b border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <span>This PC</span>
        <span>{'>'}</span>
        <span>Portfolio</span>
        <span>{'>'}</span>
        <span>Projects</span>
        {selected && (
          <>
            <span>{'>'}</span>
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">{selected.shortName}</span>
          </>
        )}
      </div>

      {/* Main content */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left sidebar — tree */}
        <aside className="flex w-44 shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-700 p-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>📁</span>
            <span>This PC</span>
          </div>
          <div className="ml-3 mt-1 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span>📂</span>
              <span>Portfolio</span>
            </div>
            <div className="ml-3 flex items-center gap-1.5 rounded px-1 py-0.5 bg-[#0078d4]/10 text-[#0078d4] font-medium">
              <span>📁</span>
              <span>Projects</span>
            </div>
          </div>
        </aside>

        {/* Center — folder grid */}
        <div className="flex flex-1 flex-wrap content-start gap-3 overflow-y-auto p-4">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => { setSelectedId(project.id); }}
              className={`flex w-28 flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
                selectedId === project.id
                  ? 'bg-[#0078d4]/10 border border-[#0078d4]/40'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent'
              }`}
              aria-label={`Open ${project.name}`}
              aria-pressed={selectedId === project.id}
            >
              <span className="text-5xl">📁</span>
              <span className="text-xs text-center text-zinc-700 dark:text-zinc-300">{project.shortName}</span>
            </button>
          ))}
        </div>

        {/* Right — detail panel with resize handle */}
        {selected && (
          <>
            {/* Drag handle */}
            <div
              onMouseDown={onMouseDown}
              className="w-1 shrink-0 cursor-col-resize bg-zinc-200 dark:bg-zinc-700 hover:bg-[#0078d4] transition-colors"
              title="Drag to resize"
            />
            <DetailPanel project={selected} width={panelWidth} />
          </>
        )}
      </div>
    </div>
  );
}

interface DetailPanelProps {
  project: Project;
  width: number;
}

function DetailPanel({ project, width }: DetailPanelProps): ReactElement {
  return (
    <aside
      style={{ width }}
      className="flex shrink-0 flex-col gap-4 overflow-y-auto border-l border-zinc-200 dark:border-zinc-700 p-4"
    >
      <div>
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{project.name}</h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{project.description}</p>
      </div>

      <div>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">Domain</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{project.domain}</p>
      </div>

      <div>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1.5">Details</p>
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{project.longDescription}</p>
      </div>

      <div>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1.5">Tech Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-[#0078d4]/10 px-2 py-0.5 text-xs text-[#0078d4] dark:bg-[#0078d4]/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1.5">Status</p>
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[project.status]}`}>
          {project.status}
        </span>
      </div>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded bg-[#0078d4] px-3 py-1.5 text-xs text-white hover:bg-[#006cbd] transition-colors"
        >
          View on GitHub
        </a>
      )}
    </aside>
  );
}
