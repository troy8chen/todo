# Todo App - Developer Onboarding Guide

## 🚀 Quick Start

1. **Clone and Install**

```bash
git clone [https://github.com/troy8chen/todo.git]
cd todo-app
npm install
npm run dev
```

2. **Environment Setup**

- Copy .env.example to .env.local
- Fill in required environment variables
- Make sure Node.js version >= 18.17.0

## 🏗️ Project Architecture

```bash
Core Technologies
Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
State Management: React Context + Hooks
Fonts: Geist Sans & Geist Mono
```

## 🧩 Key Components

1. Theme System
Located in contexts/ThemeContext
Supports dark/light mode
Usage:

```bash
import { useTheme } from '@/contexts/ThemeContext';
const { isDarkMode, toggleTheme } = useTheme();
```

2. Todo Management
Core functionality in hooks/useTodos
CRUD operations for todo items
Local storage persistence
Usage:

```bash
import { useTodos } from '@/hooks/useTodos';
const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
```

## 💅 Styling Guidelines
1. Tailwind CSS
Use utility classes whenever possible
Custom styles in globals.css for specific needs
Dark mode using dark: prefix

2. Component Structure
```bash
// Component template
import React from 'react';
import { ComponentProps } from '@/types';

export const Component: React.FC<ComponentProps> = () => {
  return (
    <div className="[tailwind-classes]">
      {/* content */}
    </div>
  );
};
```

## 🔧 Development Workflow

1. Running the App: 

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Type checking
npm run type-check
```

2. Code Quality Tools
ESLint for code linting
Prettier for code formatting
TypeScript for type checking

3. Git Workflow
```bash
# Feature development
git checkout -b feature/feature-name
# Make changes
git commit -m "feat: description"
git push origin feature/feature-name
```

## 📱 Responsive Design
```bash
Mobile-first approach
Breakpoints:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

## 🔑 Key Features Implementation

1. Adding a New Todo
```bash
const addTodo = async (text: string) => {
  const newTodo = {
    id: generateId(),
    text,
    completed: false,
    createdAt: new Date()
  };
  // Implementation in useTodos hook
};
```

2. Theme Toggle
```bash
const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
  // Implementation in ThemeContext
};
```

## 🚨 Common Issues & Solutions

1. Hydration Mismatch
Use suppressHydrationWarning on theme-sensitive elements
Ensure server and client markup match

2. Type Errors
Check types/ directory for proper type definitions
Use proper type imports from '@/types'

## 🧪 Testing Guide

1. Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

2. Component Testing Example

```bash
describe('TodoItem Component', () => {
  const mockTodo = {
    id: '1',
    text: 'Test Todo',
    completed: false
  };

  it('renders todo text', () => {
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });
});
```

3. Hook Testing Example

```bash
describe('useTodos Hook', () => {
  it('should add new todo', async () => {
    const { result } = renderHook(() => useTodos());
    
    await act(async () => {
      result.current.addTodo('New Todo');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('New Todo');
  });
});
```

4. Mocking Example: 

```bash
// Mock generateId utility
jest.mock('@/utils/generateId', () => ({
  generateId: jest.fn().mockReturnValue('mock-id')
}));
```

