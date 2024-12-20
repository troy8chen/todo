"use client";
import React, { useState } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden max-h-[80vh] flex flex-col">
        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Todo List
          </h1>
          <div className="flex mb-4 group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out placeholder:text-gray-400 placeholder:transition-opacity placeholder:duration-200 group-hover:placeholder:opacity-75"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
          <ul className="divide-y divide-gray-200 overflow-y-auto">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition-all duration-200 ease-in-out todo-item"
              >
                <div className="flex items-center group">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="form-checkbox mr-3 transition-all duration-200 ease-in-out"
                  />
                  <span
                    className={`${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    } transition-all duration-200 ease-in-out`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md px-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No tasks yet. Feel free to add anything!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}