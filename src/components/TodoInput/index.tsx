'use client';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState('');
  const { isDarkMode } = useTheme();

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Add a new task..."
        aria-label="New task input"
        className={`flex-grow px-4 py-3 sm:py-2 text-base border rounded-lg sm:rounded-r-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 ease-in-out
          ${isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
      />
      <button
        onClick={handleAdd}
        aria-label="Add task"
        className={`px-6 py-3 sm:py-2 text-base font-medium rounded-lg sm:rounded-l-none
          focus:outline-none focus:ring-2 focus:ring-offset-2
          transition-all duration-200 ease-in-out
          ${isDarkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
            : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'}`}
      >
        Add
      </button>
    </div>
  );
}