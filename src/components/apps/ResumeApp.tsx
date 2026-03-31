import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

export function ResumeApp(): ReactElement {
  const [downloaded, setDownloaded] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current) return;
    triggered.current = true;

    const link = document.createElement('a');
    link.href = '/Resume_Akhilesh.doc';
    link.download = 'Resume_Akhilesh.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
      <span className="text-6xl">📄</span>
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        {downloaded ? 'Download Started' : 'Preparing Download…'}
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {downloaded
          ? 'Resume_Akhilesh.doc has been downloaded to your device.'
          : 'Please wait…'}
      </p>
      <a
        href="/Resume_Akhilesh.doc"
        download="Resume_Akhilesh.doc"
        className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#0078d4] hover:bg-[#006cbd] text-white text-sm rounded transition-colors"
      >
        ⬇️ Download Again
      </a>
    </div>
  );
}
