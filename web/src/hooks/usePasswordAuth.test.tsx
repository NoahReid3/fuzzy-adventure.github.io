import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePasswordAuth } from './usePasswordAuth'

describe('usePasswordAuth', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('has initial state with empty password, no message, showMenu false', () => {
    const { result } = renderHook(() => usePasswordAuth())
    
    expect(result.current.password).toBe('')
    expect(result.current.message).toBe('')
    expect(result.current.isCorrect).toBe(false)
    expect(result.current.showMessage).toBe(false)
    expect(result.current.showMenu).toBe(false)
  })

  describe('handlePasswordChange', () => {
    it('updates password state', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('test')
      })
      
      expect(result.current.password).toBe('test')
    })

    it('clears error message when typing after incorrect password', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      // First, set an incorrect password
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
        result.current.handlePasswordChange('wrong')
      })
      
      // This should trigger the incorrect password flow
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      expect(result.current.message).toBe('Incorrect, try again')
      
      // Now type again - should clear message
      act(() => {
        result.current.handlePasswordChange('new')
      })
      
      expect(result.current.message).toBe('')
    })
  })

  describe('handleKeyDown', () => {
    it('correct password (HelloWorld) sets correct state', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('HelloWorld')
      })
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      expect(result.current.message).toBe('Password correct')
      expect(result.current.isCorrect).toBe(true)
      expect(result.current.password).toBe('HelloWorld')
    })

    it('incorrect password shows error and clears password', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('wrong')
      })
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      expect(result.current.message).toBe('Incorrect, try again')
      expect(result.current.isCorrect).toBe(false)
      expect(result.current.password).toBe('')
    })

    it('non-Enter keys are ignored', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('HelloWorld')
      })
      
      act(() => {
        const event = {
          key: 'Space',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      expect(result.current.message).toBe('')
      expect(result.current.isCorrect).toBe(false)
    })
  })

  describe('useEffect for showMessage/showMenu', () => {
    it('shows message when password is correct', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('HelloWorld')
      })
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      // Message should be set
      expect(result.current.message).toBe('Password correct')
      expect(result.current.isCorrect).toBe(true)
      
      // Advance timer to trigger useEffect
      act(() => {
        vi.advanceTimersByTime(100)
      })
      
      expect(result.current.showMessage).toBe(true)
    })

    it('hides message after timeout', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('HelloWorld')
      })
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      act(() => {
        vi.advanceTimersByTime(100)
      })
      
      expect(result.current.showMessage).toBe(true)
      
      // Advance past 1500ms timeout
      act(() => {
        vi.advanceTimersByTime(1500)
      })
      
      expect(result.current.showMessage).toBe(false)
    })

    it('shows menu after message timeout', () => {
      const { result } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('HelloWorld')
      })
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      act(() => {
        vi.advanceTimersByTime(100)
      })
      
      expect(result.current.showMessage).toBe(true)
      expect(result.current.showMenu).toBe(false)
      
      // Advance past 1500ms (message timeout) + 1000ms (menu delay)
      act(() => {
        vi.advanceTimersByTime(2500)
      })
      
      expect(result.current.showMessage).toBe(false)
      expect(result.current.showMenu).toBe(true)
    })

    it('cleans up timers on unmount', () => {
      const { result, unmount } = renderHook(() => usePasswordAuth())
      
      act(() => {
        result.current.handlePasswordChange('HelloWorld')
      })
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      act(() => {
        vi.advanceTimersByTime(100)
      })
      
      expect(result.current.showMessage).toBe(true)
      
      // Unmount should clean up timers
      unmount()
      
      // Advance time - should not cause errors
      act(() => {
        vi.advanceTimersByTime(5000)
      })
    })
  })
})

