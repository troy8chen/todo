'use client';
import { FC } from 'react';
import { Todo } from '@/types/todo';
import { TodoItem } from '../TodoItem';
import { useTheme } from '@/contexts/ThemeContext';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  const { isDarkMode } = useTheme();

  if (todos.length === 0) {
    return (
      <div className={`text-center py-8
        ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
        role="status"
      >
        <p className="text-base sm:text-lg mb-2">No tasks yet</p>
        <p className="text-sm sm:text-base">Add your first task above!</p>
      </div>
    );
  }

  return (
    <div 
      role="list" 
      aria-label="Todo list" 
      className={`rounded-lg overflow-hidden
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isDarkMode={isDarkMode}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};