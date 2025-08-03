'use client';

import { Moon, Sun } from 'lucide-react';
import { IconButton } from './button';
import { useTheme } from './theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      icon={
        theme === 'dark' ? (
          <Sun className="w-5 h-5 group-hover:text-danke-900" />
        ) : (
          <Moon className="w-5 h-5 group-hover:text-danke-900" />
        )
      }
      onClick={toggleTheme}
      className="group cursor-pointer"
      aria-label="Toggle theme"
    />
  );
}
