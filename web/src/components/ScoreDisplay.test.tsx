import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreDisplay } from './ScoreDisplay'

describe('ScoreDisplay', () => {
  it('renders nothing when totalAnswered is 0', () => {
    const { container } = render(<ScoreDisplay score={0} totalAnswered={0} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('displays score and totalAnswered correctly', () => {
    render(<ScoreDisplay score={5} totalAnswered={10} />)
    
    expect(screen.getByText(/score: 5 \/ 10/i)).toBeInTheDocument()
  })

  it('calculates and displays percentage correctly', () => {
    render(<ScoreDisplay score={3} totalAnswered={4} />)
    
    expect(screen.getByText(/75%/i)).toBeInTheDocument()
  })

  it('handles edge case: 0 score', () => {
    render(<ScoreDisplay score={0} totalAnswered={5} />)
    
    expect(screen.getByText(/score: 0 \/ 5/i)).toBeInTheDocument()
    expect(screen.getByText(/0%/i)).toBeInTheDocument()
  })

  it('handles edge case: 100% score', () => {
    render(<ScoreDisplay score={10} totalAnswered={10} />)
    
    expect(screen.getByText(/score: 10 \/ 10/i)).toBeInTheDocument()
    expect(screen.getByText(/100%/i)).toBeInTheDocument()
  })

  it('rounds percentage correctly', () => {
    render(<ScoreDisplay score={1} totalAnswered={3} />)
    
    // 1/3 = 33.33...%, should round to 33%
    expect(screen.getByText(/33%/i)).toBeInTheDocument()
  })
})

