'use client';
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className={`p-2 rounded-lg transition-colors duration-200
            ${isDarkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <h1 className={`text-2xl sm:text-3xl font-bold text-center mb-2
        ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        role="heading"
        aria-level={1}
      >
        Todo List
      </h1>
      <p className={`text-center text-sm sm:text-base
        ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Manage your tasks effectively
      </p>
    </header>
  );
}