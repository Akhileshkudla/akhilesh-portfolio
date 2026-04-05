import { useState, useEffect, useCallback } from 'react';
import { PROGRAMMING_QUOTES } from '@/data/quotes';

function randomIndex(exclude: number, max: number): number {
  let next: number;
  do { next = Math.floor(Math.random() * max); } while (next === exclude && max > 1);
  return next;
}

export function useRotatingQuote(intervalMs = 8_000) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * PROGRAMMING_QUOTES.length));

  const advance = useCallback(() => {
    setIndex((prev) => randomIndex(prev, PROGRAMMING_QUOTES.length));
  }, []);

  useEffect(() => {
    const id = setInterval(advance, intervalMs);
    return () => clearInterval(id);
  }, [advance, intervalMs]);

  return { quote: PROGRAMMING_QUOTES[index]!, index, total: PROGRAMMING_QUOTES.length, advance };
}
