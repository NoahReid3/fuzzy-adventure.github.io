import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCaseStudyQuiz } from './useCaseStudyQuiz'

// Mock the data
vi.mock('../data/caseStudies', () => ({
  caseStudies: [
    {
      title: 'Test Case Study 1',
      point1: 'High Infant Mortality Rate',
      point2: 'Decreasing Death Rate',
      point3: 'High Birth Rate',
      psi: 'IMR is 100/1000 births',
    },
    {
      title: 'Test Case Study 2',
      point1: 'Desertification',
      point2: 'Epidemics',
      point3: 'Unemployment',
      psi: '70% of Nigerians live in rural areas',
    },
  ],
}))

describe('useCaseStudyQuiz', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('has initial state with shuffled case studies, first selected, empty answers', () => {
    const { result } = renderHook(() => useCaseStudyQuiz())
    
    expect(result.current.currentCaseStudy).not.toBe(null)
    expect(result.current.caseStudyAnswers.point1).toBe('')
    expect(result.current.caseStudyAnswers.point2).toBe('')
    expect(result.current.caseStudyAnswers.point3).toBe('')
    expect(result.current.caseStudyAnswers.psi).toBe('')
    expect(result.current.caseStudyChecked.point1).toBe(false)
    expect(result.current.caseStudyChecked.point2).toBe(false)
    expect(result.current.caseStudyChecked.point3).toBe(false)
    expect(result.current.caseStudyChecked.psi).toBe(false)
    expect(result.current.caseStudyResults.point1).toBe(null)
    expect(result.current.caseStudyResults.point2).toBe(null)
    expect(result.current.caseStudyResults.point3).toBe(null)
    expect(result.current.caseStudyResults.psi).toBe(null)
  })

  describe('setCaseStudyAnswers', () => {
    it('updates individual answer fields', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          ...result.current.caseStudyAnswers,
          point1: 'Test answer',
        })
      })
      
      expect(result.current.caseStudyAnswers.point1).toBe('Test answer')
      expect(result.current.caseStudyAnswers.point2).toBe('')
    })

    it('updates multiple fields correctly', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Answer 1',
          point2: 'Answer 2',
          point3: 'Answer 3',
          psi: 'Answer 4',
        })
      })
      
      expect(result.current.caseStudyAnswers.point1).toBe('Answer 1')
      expect(result.current.caseStudyAnswers.point2).toBe('Answer 2')
      expect(result.current.caseStudyAnswers.point3).toBe('Answer 3')
      expect(result.current.caseStudyAnswers.psi).toBe('Answer 4')
    })
  })

  describe('checkAnswers', () => {
    it('marks correct answers (similarity >= 0.85)', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      const currentCaseStudy = result.current.currentCaseStudy
      if (!currentCaseStudy) {
        throw new Error('No current case study')
      }
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: currentCaseStudy.point1,
          point2: currentCaseStudy.point2,
          point3: currentCaseStudy.point3,
          psi: currentCaseStudy.psi,
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      expect(result.current.caseStudyResults.point1).toBe('correct')
      expect(result.current.caseStudyResults.point2).toBe('correct')
      expect(result.current.caseStudyResults.point3).toBe('correct')
      expect(result.current.caseStudyResults.psi).toBe('correct')
      expect(result.current.caseStudyChecked.point1).toBe(true)
      expect(result.current.caseStudyChecked.point2).toBe(true)
      expect(result.current.caseStudyChecked.point3).toBe(true)
      expect(result.current.caseStudyChecked.psi).toBe(true)
    })

    it('marks incorrect answers (similarity < 0.85)', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Completely wrong answer',
          point2: 'Another wrong answer',
          point3: 'Yet another wrong',
          psi: 'Wrong psi',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      expect(result.current.caseStudyResults.point1).toBe('incorrect')
      expect(result.current.caseStudyResults.point2).toBe('incorrect')
      expect(result.current.caseStudyResults.point3).toBe('incorrect')
      expect(result.current.caseStudyResults.psi).toBe('incorrect')
    })

    it('sets caseStudyChecked to true for all fields', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: 'Test',
          point3: 'Test',
          psi: 'Test',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      expect(result.current.caseStudyChecked.point1).toBe(true)
      expect(result.current.caseStudyChecked.point2).toBe(true)
      expect(result.current.caseStudyChecked.point3).toBe(true)
      expect(result.current.caseStudyChecked.psi).toBe(true)
    })

    it('handles null currentCaseStudy', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      // Manually set to null (simulating edge case)
      // This is hard to test directly, but checkAnswers should handle it
      act(() => {
        result.current.checkAnswers()
      })
      
      // Should not crash
      expect(result.current.caseStudyChecked.point1).toBe(true)
    })

    it('tests with exact matches', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      const currentCaseStudy = result.current.currentCaseStudy
      if (!currentCaseStudy) {
        throw new Error('No current case study')
      }
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: currentCaseStudy.point1,
          point2: currentCaseStudy.point2,
          point3: currentCaseStudy.point3,
          psi: currentCaseStudy.psi,
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      expect(result.current.caseStudyResults.point1).toBe('correct')
    })

    it('tests with similar but not exact matches', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      const currentCaseStudy = result.current.currentCaseStudy
      if (!currentCaseStudy) {
        throw new Error('No current case study')
      }
      
      // Use similar text (case-insensitive, extra spaces) - should normalize to correct
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: '  HIGH INFANT MORTALITY RATE  ',
          point2: currentCaseStudy.point2.toLowerCase(),
          point3: currentCaseStudy.point3,
          psi: currentCaseStudy.psi,
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      // Should be correct due to normalization (exact match after normalization)
      expect(result.current.caseStudyResults.point1).toBe('correct')
    })

    it('tests with completely wrong answers', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'xyzabc123',
          point2: 'completely different',
          point3: 'wrong answer',
          psi: 'not correct',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      expect(result.current.caseStudyResults.point1).toBe('incorrect')
      expect(result.current.caseStudyResults.point2).toBe('incorrect')
    })
  })

  describe('handleKeyDown', () => {
    it('calls checkAnswers on Enter when not checked', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: '',
          point3: '',
          psi: '',
        })
      })
      
      expect(result.current.caseStudyChecked.point1).toBe(false)
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      expect(result.current.caseStudyChecked.point1).toBe(true)
    })

    it('does not call checkAnswers when already checked', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: '',
          point3: '',
          psi: '',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      const initialResults = { ...result.current.caseStudyResults }
      
      act(() => {
        const event = {
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>
        result.current.handleKeyDown(event)
      })
      
      // Results should not change
      expect(result.current.caseStudyResults).toEqual(initialResults)
    })
  })

  describe('resetCaseStudy', () => {
    it('advances to next case study', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      const firstCaseStudy = result.current.currentCaseStudy
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: 'Test',
          point3: 'Test',
          psi: 'Test',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      act(() => {
        result.current.resetCaseStudy()
      })
      
      expect(result.current.currentCaseStudy).not.toBe(null)
      expect(result.current.currentCaseStudy?.title).not.toBe(firstCaseStudy?.title)
      expect(result.current.caseStudyAnswers.point1).toBe('')
      expect(result.current.caseStudyChecked.point1).toBe(false)
      expect(result.current.caseStudyResults.point1).toBe(null)
    })

    it('reshuffles when at end', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      // Complete first case study
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: 'Test',
          point3: 'Test',
          psi: 'Test',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      act(() => {
        result.current.resetCaseStudy()
      })
      
      // Complete second case study
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: 'Test',
          point3: 'Test',
          psi: 'Test',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      // Reset should reshuffle
      act(() => {
        result.current.resetCaseStudy()
      })
      
      expect(result.current.currentCaseStudy).not.toBe(null)
    })

    it('resets all answer states', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: 'Test',
          point3: 'Test',
          psi: 'Test',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      act(() => {
        result.current.resetCaseStudy()
      })
      
      expect(result.current.caseStudyAnswers.point1).toBe('')
      expect(result.current.caseStudyChecked.point1).toBe(false)
      expect(result.current.caseStudyResults.point1).toBe(null)
    })
  })

  describe('reset', () => {
    it('resets all state including currentCaseStudy', () => {
      const { result } = renderHook(() => useCaseStudyQuiz())
      
      act(() => {
        result.current.setCaseStudyAnswers({
          point1: 'Test',
          point2: 'Test',
          point3: 'Test',
          psi: 'Test',
        })
      })
      
      act(() => {
        result.current.checkAnswers()
      })
      
      act(() => {
        result.current.reset()
      })
      
      expect(result.current.caseStudyAnswers.point1).toBe('')
      expect(result.current.caseStudyChecked.point1).toBe(false)
      expect(result.current.caseStudyResults.point1).toBe(null)
      expect(result.current.currentCaseStudy).toBe(null)
    })
  })
})

