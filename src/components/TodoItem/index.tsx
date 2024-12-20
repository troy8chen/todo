'use client';
import React from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  isDarkMode: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isDarkMode,
  onToggle,
  onDelete
}) => {
  return (
    <div
      role="listitem"
      className={`flex items-center justify-between p-4 border-b last:border-b-0
        hover:bg-opacity-50 transition-all duration-200 ease-in-out todo-item
        ${isDarkMode 
          ? 'border-gray-700 hover:bg-gray-700' 
          : 'border-gray-100 hover:bg-gray-50'}`}
    >
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          className="form-checkbox w-5 h-5"
        />
        <span
          className={`text-base sm:text-lg break-all
            ${todo.completed 
              ? 'line-through ' + (isDarkMode ? 'text-gray-500' : 'text-gray-400')
              : isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          {todo.text}
        </span>
      </div>
      <button 
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
        className={`ml-4 p-2 rounded-md text-sm hover:bg-opacity-90
          transition-colors duration-200 ease-in-out
          ${isDarkMode
            ? 'text-red-400 hover:bg-red-900'
            : 'text-red-500 hover:bg-red-100'}`}
      >
        Delete
      </button>
    </div>
  );
};