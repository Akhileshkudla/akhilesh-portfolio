import { type ReactElement, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIdle } from '@/hooks/useIdle';
import { useRotatingQuote } from '@/hooks/useRotatingQuote';
import { useQuotesStore } from '@/store/quotesStore';

function Clock(): ReactElement {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');
  const date = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="text-center text-white/80 select-none">
      <div className="text-7xl font-thin tracking-widest tabular-nums">{hh}:{mm}</div>
      <div className="text-sm font-light tracking-widest mt-1 text-white/50">{date}</div>
    </div>
  );
}

const DISMISS_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart'] as const;

export function IdleOverlay(): ReactElement {
  const isIdle = useIdle(15_000);
  const { isPinned, unpin } = useQuotesStore();
  const { quote, index, total } = useRotatingQuote(8_000);
  const isVisible = isIdle || isPinned;

  // Unpin on any interaction when manually opened
  useEffect(() => {
    if (!isPinned) return;
    const dismiss = () => unpin();
    DISMISS_EVENTS.forEach((e) => window.addEventListener(e, dismiss, { once: true, passive: true }));
    return () => DISMISS_EVENTS.forEach((e) => window.removeEventListener(e, dismiss));
  }, [isPinned, unpin]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="quotes-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[500] flex flex-col items-center justify-between py-16 px-8"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, #0f172a 0%, #000000 100%)' }}
        >
          {/* Clock */}
          <Clock />

          {/* Quote card */}
          <div className="max-w-2xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="text-center"
              >
                {/* Quote icon */}
                <div className="text-4xl mb-6 opacity-40 select-none">"</div>

                <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed italic mb-6">
                  {quote.text}
                </p>
                <p className="text-white/40 text-sm tracking-widest uppercase">
                  — {quote.author}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 mt-10">
              {Array.from({ length: Math.min(total, 10) }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    i === index % 10
                      ? 'w-4 h-1.5 bg-white/60'
                      : 'w-1.5 h-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dismiss hint */}
          <p className="text-white/25 text-xs tracking-widest uppercase select-none">
            Move mouse or press any key to dismiss
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
