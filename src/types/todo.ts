export interface Todo {
    id: string;
    text: string;
    description?: string;
    completed: boolean;
  }
  
  export type TodoAction = 
    | { type: 'ADD'; payload: string }
    | { type: 'TOGGLE'; payload: string }
    | { type: 'DELETE'; payload: string };
  
  export interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  export interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
  }