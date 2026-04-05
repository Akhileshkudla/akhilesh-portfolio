import { useState, useCallback, useEffect, useRef } from 'react';
import { buildDeck, type GameCard, type Difficulty } from '@/data/memoryGame';

export interface GameState {
  cards: GameCard[];
  flippedIds: string[];
  moves: number;
  matches: number;
  totalPairs: number;
  isComplete: boolean;
  elapsedSeconds: number;
  isLocked: boolean; // prevent flips during match-check delay
}

interface UseMemoryGameReturn {
  state: GameState;
  difficulty: Difficulty;
  flipCard: (id: string) => void;
  resetGame: (d?: Difficulty) => void;
  setDifficulty: (d: Difficulty) => void;
}

function initialState(difficulty: Difficulty): GameState {
  const cards = buildDeck(difficulty);
  return {
    cards,
    flippedIds: [],
    moves: 0,
    matches: 0,
    totalPairs: cards.length / 2,
    isComplete: false,
    elapsedSeconds: 0,
    isLocked: false,
  };
}

export function useMemoryGame(): UseMemoryGameReturn {
  const [difficulty, setDifficultyState] = useState<Difficulty>('medium');
  const [state, setState] = useState<GameState>(() => initialState('medium'));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasStarted = useRef(false);

  // Start timer on first move
  const startTimer = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    timerRef.current = setInterval(() => {
      setState((s) => (s.isComplete ? s : { ...s, elapsedSeconds: s.elapsedSeconds + 1 }));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const resetGame = useCallback(
    (d?: Difficulty) => {
      stopTimer();
      hasStarted.current = false;
      const next = d ?? difficulty;
      setDifficultyState(next);
      setState(initialState(next));
    },
    [difficulty, stopTimer]
  );

  const setDifficulty = useCallback(
    (d: Difficulty) => {
      resetGame(d);
    },
    [resetGame]
  );

  const flipCard = useCallback(
    (id: string) => {
      setState((prev) => {
        if (prev.isLocked) return prev;
        const card = prev.cards.find((c) => c.id === id);
        if (!card || card.isFlipped || card.isMatched) return prev;
        if (prev.flippedIds.length >= 2) return prev;

        startTimer();

        const newFlipped = [...prev.flippedIds, id];
        const newCards = prev.cards.map((c) =>
          c.id === id ? { ...c, isFlipped: true } : c
        );

        if (newFlipped.length < 2) {
          return { ...prev, cards: newCards, flippedIds: newFlipped };
        }

        // Two cards flipped — check match
        const [aId, bId] = newFlipped;
        const a = newCards.find((c) => c.id === aId)!;
        const b = newCards.find((c) => c.id === bId)!;
        const isMatch = a.techId === b.techId;
        const newMoves = prev.moves + 1;

        if (isMatch) {
          const matched = newCards.map((c) =>
            c.id === aId || c.id === bId ? { ...c, isMatched: true } : c
          );
          const newMatches = prev.matches + 1;
          const isComplete = newMatches === prev.totalPairs;
          if (isComplete) stopTimer();
          return {
            ...prev,
            cards: matched,
            flippedIds: [],
            moves: newMoves,
            matches: newMatches,
            isComplete,
            isLocked: false,
          };
        }

        // No match — lock, then flip back after delay
        setTimeout(() => {
          setState((s) => ({
            ...s,
            cards: s.cards.map((c) =>
              c.id === aId || c.id === bId ? { ...c, isFlipped: false } : c
            ),
            flippedIds: [],
            isLocked: false,
          }));
        }, 900);

        return {
          ...prev,
          cards: newCards,
          flippedIds: newFlipped,
          moves: newMoves,
          isLocked: true,
        };
      });
    },
    [startTimer, stopTimer]
  );

  return { state, difficulty, flipCard, resetGame, setDifficulty };
}
