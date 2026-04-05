import { type ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemoryGame } from '@/hooks/useMemoryGame';
import { DIFFICULTY_CONFIG, type Difficulty } from '@/data/memoryGame';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function starRating(moves: number, pairs: number): number {
  const ratio = moves / pairs;
  if (ratio <= 1.5) return 3;
  if (ratio <= 2.5) return 2;
  return 1;
}

interface CardProps {
  id: string;
  icon: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: string) => void;
}

function Card({ id, icon, label, isFlipped, isMatched, onClick }: CardProps): ReactElement {
  const show = isFlipped || isMatched;
  return (
    <button
      onClick={() => onClick(id)}
      className={`relative w-full h-full rounded-xl transition-all duration-200 focus:outline-none ${
        isMatched
          ? 'cursor-default'
          : isFlipped
          ? 'cursor-default'
          : 'cursor-pointer hover:scale-105 active:scale-95'
      }`}
      style={{ perspective: '600px' }}
      disabled={isFlipped || isMatched}
    >
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateY: show ? 180 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#0078d4] to-[#004e99] border border-[#106ebe] shadow-md"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-white text-2xl font-bold opacity-60">?</span>
        </div>

        {/* Front */}
        <div
          className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1 border shadow-md ${
            isMatched
              ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-500'
              : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-3xl leading-none">{icon}</span>
          <span
            className={`text-[10px] font-medium text-center px-1 leading-tight ${
              isMatched
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {label}
          </span>
          {isMatched && (
            <span className="absolute top-1 right-1.5 text-emerald-500 text-xs">✓</span>
          )}
        </div>
      </motion.div>
    </button>
  );
}

export function MemoryGameApp(): ReactElement {
  const { state, difficulty, flipCard, resetGame, setDifficulty } = useMemoryGame();
  const { cols } = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 gap-3 flex-shrink-0">
        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
          <span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{state.moves}</span> moves
          </span>
          <span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatTime(state.elapsedSeconds)}</span>
          </span>
          <span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{state.matches}</span>
            <span>/{state.totalPairs} matched</span>
          </span>
        </div>

        {/* Difficulty tabs */}
        <div className="flex rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-600 text-xs">
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 transition-colors ${
                difficulty === d
                  ? 'bg-[#0078d4] text-white'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              {DIFFICULTY_CONFIG[d].label}
            </button>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={() => resetGame()}
          className="text-xs px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 transition-colors"
        >
          New Game
        </button>
      </div>

      {/* Card grid */}
      <div className="flex-1 overflow-auto p-4 flex items-start justify-center">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 80px)`, gridAutoRows: '80px' }}
        >
          {state.cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              icon={card.icon}
              label={card.label}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={flipCard}
            />
          ))}
        </div>
      </div>

      {/* Win overlay */}
      <AnimatePresence>
        {state.isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10"
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-2xl text-center max-w-xs w-full mx-4 border border-zinc-200 dark:border-zinc-700"
            >
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">You Won!</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                {'⭐'.repeat(starRating(state.moves, state.totalPairs))}
                {'☆'.repeat(3 - starRating(state.moves, state.totalPairs))}
              </p>
              <div className="flex justify-center gap-6 text-sm mb-6 text-zinc-600 dark:text-zinc-300">
                <div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-100 text-lg">{state.moves}</div>
                  <div className="text-xs">moves</div>
                </div>
                <div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-100 text-lg">{formatTime(state.elapsedSeconds)}</div>
                  <div className="text-xs">time</div>
                </div>
              </div>
              <button
                onClick={() => resetGame()}
                className="w-full py-2 rounded-lg bg-[#0078d4] hover:bg-[#006cbd] text-white text-sm font-medium transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
