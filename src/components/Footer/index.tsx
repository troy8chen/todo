'use client';
import { useTheme } from '@/contexts/ThemeContext';

interface FooterProps {
  todoCount: number;
}

export function Footer({ todoCount }: FooterProps) {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`px-4 py-3 border-t
      ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
      <p className="text-sm text-center">
        {todoCount} {todoCount === 1 ? 'task' : 'tasks'} total
      </p>
    </footer>
  );
}