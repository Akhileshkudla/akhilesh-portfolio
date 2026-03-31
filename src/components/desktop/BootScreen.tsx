import { type ReactElement, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const QUADRANTS = [
  { initial: { x: -22, y: -22 }, delay: 0.3 },
  { initial: { x: 22, y: -22 }, delay: 0.45 },
  { initial: { x: -22, y: 22 }, delay: 0.45 },
  { initial: { x: 22, y: 22 }, delay: 0.6 },
];

export function BootScreen({ onComplete }: BootScreenProps): ReactElement {
  useEffect(() => {
    const t = setTimeout(onComplete, 3400);
    return () => { clearTimeout(t); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-[#0078d4] blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      />

      {/* Windows logo — quadrants fly in from corners */}
      <motion.div className="relative mb-10">
        <div className="grid grid-cols-2 gap-[5px] w-[72px] h-[72px]">
          {QUADRANTS.map((q, i) => (
            <motion.div
              key={i}
              className="rounded-sm bg-[#0078d4]"
              initial={{ ...q.initial, opacity: 0, scale: 0.4 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: q.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-[-10px] rounded-md border border-[#0078d4]/40"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.7, 1.3, 1.6] }}
          transition={{ delay: 1.1, duration: 0.9 }}
        />
      </motion.div>

      {/* Name blur-to-sharp reveal */}
      <motion.h1
        className="text-white text-3xl font-extralight tracking-[0.35em] mb-2"
        initial={{ opacity: 0, filter: 'blur(14px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        AKHILESH K
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-[#0078d4] text-[11px] tracking-[0.22em] uppercase mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.45, duration: 0.6 }}
      >
        Software Architect &amp; AI Systems Engineer
      </motion.p>

      {/* Progress bar */}
      <motion.div
        className="w-44 h-[2px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#0078d4] to-[#60c8f8] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.8, duration: 1.3, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.p
        className="text-white/25 text-[11px] mt-3 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
      >
        Loading portfolio...
      </motion.p>
    </motion.div>
  );
}
