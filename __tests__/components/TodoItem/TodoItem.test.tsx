import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from '@/components/TodoItem/index'

describe('TodoItem Component', () => {
  const mockTodo = {
    id: '1',
    text: 'Test Todo',
    completed: false,
  }

  const mockToggle = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderTodoItem = (props = {}) => {
    return render(
      <TodoItem 
        todo={mockTodo}
        isDarkMode={false}
        onToggle={mockToggle}
        onDelete={mockDelete}
        {...props}
      />
    )
  }

  it('renders todo text correctly', () => {
    renderTodoItem()
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })

  it('calls onToggle when checkbox is clicked', () => {
    renderTodoItem()
    fireEvent.click(screen.getByRole('checkbox', {
      name: 'Mark "Test Todo" as complete'
    }))
    expect(mockToggle).toHaveBeenCalledWith('1')
  })

  it('calls onDelete when delete button is clicked', () => {
    renderTodoItem()
    fireEvent.click(screen.getByRole('button', {
      name: 'Delete "Test Todo"'
    }))
    expect(mockDelete).toHaveBeenCalledWith('1')
  })

  it('applies completed styles when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    renderTodoItem({ todo: completedTodo })
    expect(screen.getByText('Test Todo')).toHaveClass('line-through')
  })

  it('applies correct light mode styles', () => {
    renderTodoItem({ isDarkMode: false })
    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveClass('border-gray-100')
    expect(screen.getByText('Test Todo')).toHaveClass('text-gray-800')
    expect(screen.getByRole('button')).toHaveClass('text-red-500')
  })

  it('applies correct dark mode styles', () => {
    renderTodoItem({ isDarkMode: true })
    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveClass('border-gray-700')
    expect(screen.getByText('Test Todo')).toHaveClass('text-white')
    expect(screen.getByRole('button')).toHaveClass('text-red-400')
  })

  it('handles long todo text correctly', () => {
    const longTodo = {
      ...mockTodo,
      text: 'This is a very long todo item that should still be displayed properly'
    }
    renderTodoItem({ todo: longTodo })
    expect(screen.getByText(longTodo.text)).toHaveClass('break-all')
  })

  it('has correct accessibility attributes', () => {
    renderTodoItem()
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-label',
      'Mark "Test Todo" as complete'
    )
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Delete "Test Todo"'
    )
  })
})