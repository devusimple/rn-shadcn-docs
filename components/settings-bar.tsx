'use client';

import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';
import { CodeWrapToggle } from './code-wrap-toggle';

export function SettingsBar({ mode = 'light-dark-system' }: { mode?: 'light-dark' | 'light-dark-system' }) {
  return (
    <div className="flex items-center gap-2 ms-auto">
      <CodeWrapToggle />
      <ThemeToggle className="p-0" mode={mode} />
    </div>
  );
}
