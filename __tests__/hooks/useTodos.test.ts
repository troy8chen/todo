import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useTodos } from '@/hooks/useTodos'
import { generateId } from '@/utils/generateId'

jest.mock('@/utils/generateId', () => ({
  generateId: jest.fn()
}))

describe('useTodos Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with empty todos array', () => {
      const { result } = renderHook(() => useTodos())
      expect(result.current.todos).toEqual([])
    })

    it('should provide all required functions', () => {
      const { result } = renderHook(() => useTodos())
      expect(result.current.addTodo).toBeInstanceOf(Function)
      expect(result.current.toggleTodo).toBeInstanceOf(Function)
      expect(result.current.deleteTodo).toBeInstanceOf(Function)
    })
  })

  describe('addTodo', () => {
    it('should add a new todo with trimmed text', () => {
      (generateId as jest.Mock).mockReturnValue('mock-id')
      const { result } = renderHook(() => useTodos())
      
      act(() => {
        result.current.addTodo('  New Todo  ')
      })

      expect(result.current.todos).toEqual([{
        id: 'mock-id',
        text: 'New Todo',
        completed: false
      }])
      expect(generateId).toHaveBeenCalledTimes(1)
    })

    it('should not add todo when input is empty or only whitespace', () => {
      const { result } = renderHook(() => useTodos())
      const emptyInputs = ['', '   ', '\n', '\t']
      
      emptyInputs.forEach(input => {
        act(() => {
          result.current.addTodo(input)
        })
      })

      expect(result.current.todos).toEqual([])
      expect(generateId).not.toHaveBeenCalled()
    })

    it('should maintain correct order when adding multiple todos', async () => {
      const { result } = renderHook(() => useTodos());
      
      // Setup mock IDs
      (generateId as jest.Mock)
        .mockReturnValueOnce('id-1')
        .mockReturnValueOnce('id-2')
        .mockReturnValueOnce('id-3')

      // Add todos one by one
      await act(async () => {
        result.current.addTodo('First Todo')
      })
      await act(async () => {
        result.current.addTodo('Second Todo')
      })
      await act(async () => {
        result.current.addTodo('Third Todo')
      })

      // Verify the final state
      expect(result.current.todos).toEqual([
        { id: 'id-1', text: 'First Todo', completed: false },
        { id: 'id-2', text: 'Second Todo', completed: false },
        { id: 'id-3', text: 'Third Todo', completed: false }
      ])
    })
  })

  describe('toggleTodo', () => {
    it('should toggle todo completed status', async () => {
      (generateId as jest.Mock).mockReturnValue('mock-id')
      const { result } = renderHook(() => useTodos())
      
      // Add a todo first
      await act(async () => {
        result.current.addTodo('Test Todo')
      })

      // Toggle it to complete
      await act(async () => {
        result.current.toggleTodo('mock-id')
      })
      
      expect(result.current.todos[0].completed).toBe(true)

      // Toggle it back to incomplete
      await act(async () => {
        result.current.toggleTodo('mock-id')
      })
      
      expect(result.current.todos[0].completed).toBe(false)
    })
  })

  describe('deleteTodo', () => {
    it('should remove the specified todo', async () => {
      (generateId as jest.Mock).mockReturnValue('mock-id')
      const { result } = renderHook(() => useTodos())
      
      // Add a todo
      await act(async () => {
        result.current.addTodo('Test Todo')
      })

      expect(result.current.todos).toHaveLength(1)

      // Delete the todo
      await act(async () => {
        result.current.deleteTodo('mock-id')
      })

      expect(result.current.todos).toHaveLength(0)
    })

    it('should handle deleting non-existent todos', async () => {
      (generateId as jest.Mock).mockReturnValue('mock-id')
      const { result } = renderHook(() => useTodos())
      
      // Add a todo
      await act(async () => {
        result.current.addTodo('Test Todo')
      })

      // Try to delete non-existent todo
      await act(async () => {
        result.current.deleteTodo('non-existent-id')
      })

      expect(result.current.todos).toHaveLength(1)
    })
  })
})