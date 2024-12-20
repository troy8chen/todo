"use client";
import React, { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system dark mode preference
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handler);
    return () => darkModeQuery.removeEventListener('change', handler);
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: generateId(),
        text: input.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`min-h-screen py-6 px-4 sm:py-10 transition-colors duration-300
      ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-md mx-auto shadow-lg rounded-lg overflow-hidden max-h-[80vh] flex flex-col
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <header className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
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

        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
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
              onClick={addTodo}
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

          <div role="list" aria-label="Todo list" className={`rounded-lg overflow-hidden
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {todos.map(todo => (
              <div
                key={todo.id}
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
                    onChange={() => toggleTodo(todo.id)}
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
                  onClick={() => deleteTodo(todo.id)}
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
            ))}
          </div>

          {todos.length === 0 && (
            <div className={`text-center py-8
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              role="status"
            >
              <p className="text-base sm:text-lg mb-2">No tasks yet</p>
              <p className="text-sm sm:text-base">Add your first task above!</p>
            </div>
          )}
        </div>

        <footer className={`px-4 py-3 border-t
          ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
          <p className="text-sm text-center">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
          </p>
        </footer>
      </div>
    </div>
  );
}