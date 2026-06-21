'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface Settings {
  codeWrap: boolean;
}

interface SettingsContextType {
  settings: Settings;
  setCodeWrap: (wrap: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ codeWrap: false });

  useEffect(() => {
    const stored = localStorage.getItem('ew-settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const codeWrap = parsed.codeWrap ?? false;
        setSettings({ codeWrap });
        document.documentElement.dataset.codeWrap = String(codeWrap);
      } catch { /* ignore */ }
    }
  }, []);

  const setCodeWrap = (codeWrap: boolean) => {
    setSettings({ codeWrap });
    localStorage.setItem('ew-settings', JSON.stringify({ codeWrap }));
    document.documentElement.dataset.codeWrap = String(codeWrap);
  };

  return (
    <SettingsContext.Provider value={{ settings, setCodeWrap }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
