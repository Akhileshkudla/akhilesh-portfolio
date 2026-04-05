import { useState, useCallback, useRef } from 'react';
import { getCommand, getAllCommands, type CommandOutput, WELCOME_BANNER } from '@/data/terminal';

export interface HistoryEntry {
  input: string;
  output: CommandOutput[];
}

interface UseTerminalReturn {
  history: HistoryEntry[];
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (i: number) => void;
  executeCommand: (input: string) => { openApp?: string; toggleTheme?: string } | void;
  clear: () => void;
  getHistoryEntry: (index: number) => string;
}

export function useTerminal(): UseTerminalReturn {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { input: '', output: [{ type: 'ascii', content: WELCOME_BANNER }] },
  ]);
  const commandHistory = useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const clear = useCallback(() => {
    setHistory([]);
  }, []);

  const executeCommand = useCallback(
    (raw: string): { openApp?: string; toggleTheme?: string } | void => {
      const input = raw.trim();
      if (!input) return;

      // Track command in history (avoid consecutive duplicates)
      if (commandHistory.current[0] !== input) {
        commandHistory.current = [input, ...commandHistory.current].slice(0, 100);
      }
      setHistoryIndex(-1);

      // Parse
      const parts = input.split(/\s+/);
      const cmdName = parts[0] ?? '';
      const args = parts.slice(1);
      const cmd = getCommand(cmdName.toLowerCase());

      let output: CommandOutput[];
      if (!cmd) {
        // Fuzzy suggestion
        const all = getAllCommands().map((c) => c.name);
        const firstChar = cmdName.toLowerCase()[0] ?? '';
        const suggestion = firstChar ? all.find((n) => n.startsWith(firstChar)) : undefined;
        const hint = suggestion ? ` Did you mean '${suggestion}'?` : '';
        output = [{
          type: 'error',
          content: `'${cmdName}' is not recognized as a command. Type 'help' for a list.${hint}`,
        }];
      } else {
        output = cmd.execute(args);
      }

      // Handle special signals
      let openApp: string | undefined;
      let toggleTheme: string | undefined;

      const processedOutput = output.filter((o) => {
        if (o.content.startsWith('__CLEAR__')) {
          setHistory([]);
          return false;
        }
        if (o.content.startsWith('__OPEN__:')) {
          openApp = o.content.replace('__OPEN__:', '');
          return false;
        }
        if (o.content.startsWith('__THEME__:')) {
          toggleTheme = o.content.replace('__THEME__:', '');
          return false;
        }
        return true;
      });

      setHistory((prev) => [...prev, { input, output: processedOutput }]);

      if (openApp || toggleTheme) {
        return { openApp, toggleTheme };
      }
    },
    []
  );

  const getHistoryEntry = useCallback((index: number): string => {
    return commandHistory.current[index] ?? '';
  }, []);

  return {
    history,
    commandHistory: commandHistory.current,
    historyIndex,
    setHistoryIndex,
    executeCommand,
    clear,
    getHistoryEntry,
  };
}
