'use client';
import React, { useState } from "react";
import { Todo } from "@/types/todo";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { useTheme } from "@/contexts/ThemeContext";

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isDarkMode } = useTheme();

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
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
        <Header />
        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <TodoInput onAdd={addTodo} />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
        <Footer todoCount={todos.length} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}