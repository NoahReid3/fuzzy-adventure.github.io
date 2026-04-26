import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useFactsGame } from './useFactsGame'

const { mockFacts } = vi.hoisted(() => ({
  mockFacts: [
    { question: 'Q1', answer: 'A1' },
    { question: 'Q2', answer: 'A2' },
    { question: 'Q3', answer: 'A3' },
  ],
}))

vi.mock('../utils/arrayUtils', () => ({
  shuffleArray: <T,>(a: T[]) => [...a],
}))

describe('useFactsGame', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shuffles on mount, starts at first card, total matches list length', async () => {
    const { result } = renderHook(() => useFactsGame(mockFacts))

    await waitFor(() => {
      expect(result.current.total).toBe(3)
    })

    expect(result.current.current?.question).toBe('Q1')
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.answerVisible).toBe(false)
  })

  it('revealAnswer sets answerVisible true', async () => {
    const { result } = renderHook(() => useFactsGame(mockFacts))

    await waitFor(() => {
      expect(result.current.total).toBe(3)
    })

    act(() => {
      result.current.revealAnswer()
    })

    expect(result.current.answerVisible).toBe(true)
  })

  it('goNext moves to next card and clears answer', async () => {
    const { result } = renderHook(() => useFactsGame(mockFacts))

    await waitFor(() => {
      expect(result.current.total).toBe(3)
    })

    act(() => {
      result.current.revealAnswer()
    })

    act(() => {
      result.current.goNext()
    })

    expect(result.current.current?.question).toBe('Q2')
    expect(result.current.answerVisible).toBe(false)
  })

  it('goNext wraps from last to first', async () => {
    const { result } = renderHook(() => useFactsGame(mockFacts))

    await waitFor(() => {
      expect(result.current.total).toBe(3)
    })

    act(() => {
      result.current.goNext()
      result.current.goNext()
      result.current.goNext()
    })

    expect(result.current.current?.question).toBe('Q1')
  })

  it('pickRandom uses Math.random to choose an index and hides answer', async () => {
    const { result } = renderHook(() => useFactsGame(mockFacts))

    await waitFor(() => {
      expect(result.current.total).toBe(3)
    })

    act(() => {
      result.current.revealAnswer()
    })

    vi.mocked(Math.random).mockReturnValue(0.6)
    act(() => {
      result.current.pickRandom()
    })

    expect(result.current.currentIndex).toBe(1)
    expect(result.current.current?.question).toBe('Q2')
    expect(result.current.answerVisible).toBe(false)
  })

  it('reset clears the deck and indices', async () => {
    const { result } = renderHook(() => useFactsGame(mockFacts))

    await waitFor(() => {
      expect(result.current.total).toBe(3)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.total).toBe(0)
    expect(result.current.current).toBe(null)
  })
})
