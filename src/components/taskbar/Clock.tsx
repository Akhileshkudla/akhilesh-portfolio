import { type ReactElement, useEffect, useState } from 'react';

export function Clock(): ReactElement {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => { clearInterval(interval); };
  }, []);

  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const date = now.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col items-end text-[11px] leading-tight text-gray-700 dark:text-gray-300">
      <span>{time}</span>
      <span>{date}</span>
    </div>
  );
}
