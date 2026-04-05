import { type ReactElement, useEffect, useRef, useState, useCallback } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { getAllCommands } from '@/data/terminal';

const OUTPUT_COLORS: Record<string, string> = {
  text: '#cccccc',
  info: '#9cdcfe',
  success: '#4ec9b0',
  error: '#f48771',
  warn: '#dcdcaa',
  ascii: '#569cd6',
};

export function TerminalApp(): ReactElement {
  const { history, historyIndex, setHistoryIndex, executeCommand, getHistoryEntry } = useTerminal();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    const value = inputValue.trim();
    setInputValue('');
    const result = executeCommand(value);
    if (result?.openApp) {
      window.dispatchEvent(new CustomEvent('terminal:open-app', { detail: result.openApp }));
    }
    if (result?.toggleTheme) {
      window.dispatchEvent(new CustomEvent('terminal:toggle-theme', { detail: result.toggleTheme }));
    }
  }, [inputValue, executeCommand]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const nextIndex = historyIndex + 1;
        const entry = getHistoryEntry(nextIndex);
        if (entry !== undefined && entry !== '') {
          setInputValue(entry);
          setHistoryIndex(nextIndex);
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = historyIndex - 1;
        if (nextIndex < 0) {
          setInputValue('');
          setHistoryIndex(-1);
        } else {
          setInputValue(getHistoryEntry(nextIndex));
          setHistoryIndex(nextIndex);
        }
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const allCmds = getAllCommands().map((c) => c.name);
        const match = allCmds.find((n) => n.startsWith(inputValue.toLowerCase()));
        if (match) setInputValue(match);
        return;
      }

      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        executeCommand('clear');
      }
    },
    [historyIndex, inputValue, handleSubmit, getHistoryEntry, setHistoryIndex, executeCommand]
  );

  return (
    <div
      className="flex flex-col h-full select-text"
      style={{ background: '#012456', fontFamily: "'Cascadia Code', 'Consolas', 'Courier New', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-3 pt-3 pb-1 text-xs leading-relaxed"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#3a3a5c #012456' }}
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-1">
            {entry.input && (
              <div className="flex gap-1">
                <span style={{ color: '#ffff00' }}>PS</span>
                <span style={{ color: '#569cd6' }}>C:\Users\Visitor&gt;</span>
                <span style={{ color: '#ffffff' }}>{entry.input}</span>
              </div>
            )}
            {entry.output.map((o, j) => (
              <pre
                key={j}
                className="whitespace-pre-wrap break-words mt-0.5"
                style={{ color: OUTPUT_COLORS[o.type] ?? '#cccccc', fontFamily: 'inherit' }}
              >
                {o.content}
              </pre>
            ))}
          </div>
        ))}
      </div>

      {/* Input line */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-[#1a3a6c] text-xs">
        <span style={{ color: '#ffff00' }}>PS</span>
        <span style={{ color: '#569cd6' }}>C:\Users\Visitor&gt;</span>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none caret-white"
          style={{ color: '#ffffff', fontFamily: 'inherit', fontSize: 'inherit' }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <span
          className="w-2 h-3 ml-0.5 animate-pulse"
          style={{ background: '#ffffff', display: 'inline-block' }}
        />
      </div>
    </div>
  );
}
