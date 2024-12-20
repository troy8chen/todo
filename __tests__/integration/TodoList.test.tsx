import { render, screen, fireEvent } from '@testing-library/react'
import { TodoList } from '@/components/TodoList'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { TodoItem } from '@/components/TodoItem'

// Update the mock path
jest.mock('@/components/TodoItem', () => ({
  TodoItem: ({ todo, onToggle, onDelete }: any) => (
    <div data-testid={`todo-item-${todo.id}`}>
      <span>{todo.text}</span>
      <button onClick={() => onToggle(todo.id)}>Toggle</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  ),
}))

describe('TodoList', () => {
  const mockTodos = [
    { id: '1', text: 'Test Todo 1', completed: false },
    { id: '2', text: 'Test Todo 2', completed: true },
  ]
  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider>
        {component}
      </ThemeProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Empty State', () => {
    it('shows empty state message when no todos are present', () => {
      renderWithTheme(
        <TodoList 
          todos={[]} 
          onToggle={mockOnToggle} 
          onDelete={mockOnDelete} 
        />
      )

      expect(screen.getByText('No tasks yet')).toBeInTheDocument()
      expect(screen.getByText('Add your first task above!')).toBeInTheDocument()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('applies correct styling based on dark mode', () => {
      renderWithTheme(
        <TodoList 
          todos={[]} 
          onToggle={mockOnToggle} 
          onDelete={mockOnDelete} 
        />
      )

      const emptyState = screen.getByRole('status')
      expect(emptyState).toHaveClass('text-gray-500')
    })
  })

  describe('Todo List Display', () => {
    it('renders todo items when todos are present', () => {
      renderWithTheme(
        <TodoList 
          todos={mockTodos} 
          onToggle={mockOnToggle} 
          onDelete={mockOnDelete} 
        />
      )

      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getByTestId('todo-item-1')).toBeInTheDocument()
      expect(screen.getByTestId('todo-item-2')).toBeInTheDocument()
    })

    it('applies correct styling based on dark mode', () => {
      renderWithTheme(
        <TodoList 
          todos={mockTodos} 
          onToggle={mockOnToggle} 
          onDelete={mockOnDelete} 
        />
      )

      const list = screen.getByRole('list')
      expect(list).toHaveClass('rounded-lg', 'overflow-hidden')
    })
  })

  describe('Interactions', () => {
    it('calls onToggle when a todo is toggled', () => {
      renderWithTheme(
        <TodoList 
          todos={mockTodos} 
          onToggle={mockOnToggle} 
          onDelete={mockOnDelete} 
        />
      )

      fireEvent.click(screen.getByTestId('todo-item-1').querySelector('button:first-of-type')!)
      expect(mockOnToggle).toHaveBeenCalledWith('1')
    })

    it('calls onDelete when a todo is deleted', () => {
      renderWithTheme(
        <TodoList 
          todos={mockTodos} 
          onToggle={mockOnToggle} 
          onDelete={mockOnDelete} 
        />
      )

      fireEvent.click(screen.getByTestId('todo-item-1').querySelector('button:last-of-type')!)
      expect(mockOnDelete).toHaveBeenCalledWith('1')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      renderWithTheme(
        <TodoList 
          todos={mockTodos} 
          onToggle={mockOnToggle} 
          onDelete={mockOnDelete} 
        />
      )

      expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Todo list')
    })
  })
})