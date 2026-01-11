import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SolubilityQuiz } from './SolubilityQuiz'

// Mock the hook
const mockHandleAnswer = vi.fn()
const mockReset = vi.fn()

const mockUseSolubilityQuiz = vi.fn(() => ({
  shuffledQuestions: [
    { compound: 'Test Compound 1', answer: 'soluble' },
    { compound: 'Test Compound 2', answer: 'insoluble' },
  ],
  currentQuestion: { compound: 'Test Compound 1', answer: 'soluble' },
  currentQuestionIndex: 0,
  flashColor: null,
  isAnswered: false,
  score: 0,
  totalAnswered: 0,
  handleAnswer: mockHandleAnswer,
  reset: mockReset,
}))

vi.mock('../hooks/useSolubilityQuiz', () => ({
  useSolubilityQuiz: () => mockUseSolubilityQuiz(),
}))

describe('SolubilityQuiz', () => {
  const onBackToMenu = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders current question', () => {
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByText(/is test compound 1 soluble or insoluble in water\?/i)).toBeInTheDocument()
  })

  it('displays question number and total', () => {
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByText(/question 1 of 2/i)).toBeInTheDocument()
  })

  it('renders both answer buttons', () => {
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    const buttons = screen.getAllByRole('button')
    const solubleButton = buttons.find(btn => btn.textContent?.includes('Soluble'))
    const insolubleButton = buttons.find(btn => btn.textContent?.includes('Insoluble'))
    
    expect(solubleButton).toBeInTheDocument()
    expect(insolubleButton).toBeInTheDocument()
  })

  it('calls handleAnswer with correct answer when button clicked', async () => {
    const user = userEvent.setup()
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    const solubleButton = screen.getByText('Soluble').closest('button')
    if (!solubleButton) throw new Error('Soluble button not found')
    await user.click(solubleButton)
    
    expect(mockHandleAnswer).toHaveBeenCalledWith('soluble')
  })

  it('disables buttons when answered', () => {
    mockUseSolubilityQuiz.mockReturnValue({
      shuffledQuestions: [{ compound: 'Test', answer: 'soluble' }],
      currentQuestion: { compound: 'Test', answer: 'soluble' },
      currentQuestionIndex: 0,
      flashColor: 'green',
      isAnswered: true,
      score: 1,
      totalAnswered: 1,
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    const solubleButton = screen.getByText('Soluble').closest('button')
    const insolubleButton = screen.getByText('Insoluble').closest('button')
    
    expect(solubleButton).toBeDisabled()
    expect(insolubleButton).toBeDisabled()
  })

  it('shows flash color background', () => {
    mockUseSolubilityQuiz.mockReturnValue({
      shuffledQuestions: [{ compound: 'Test', answer: 'soluble' }],
      currentQuestion: { compound: 'Test', answer: 'soluble' },
      currentQuestionIndex: 0,
      flashColor: 'green',
      isAnswered: true,
      score: 1,
      totalAnswered: 1,
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    const { container } = render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    const quizContainer = container.firstChild as HTMLElement
    expect(quizContainer).toHaveStyle({ backgroundColor: 'rgba(34, 197, 94, 0.3)' })
  })

  it('displays score via ScoreDisplay', () => {
    mockUseSolubilityQuiz.mockReturnValue({
      shuffledQuestions: [{ compound: 'Test', answer: 'soluble' }],
      currentQuestion: { compound: 'Test', answer: 'soluble' },
      currentQuestionIndex: 0,
      flashColor: null,
      isAnswered: false,
      score: 5,
      totalAnswered: 10,
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByText(/score: 5 \/ 10/i)).toBeInTheDocument()
  })

  it('calls onBackToMenu when back button clicked', async () => {
    const user = userEvent.setup()
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    const backButton = screen.getByText(/back to menu/i)
    await user.click(backButton)
    
    expect(onBackToMenu).toHaveBeenCalledTimes(1)
  })

  it('resets quiz when back button clicked', async () => {
    const user = userEvent.setup()
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    const backButton = screen.getByText(/back to menu/i)
    await user.click(backButton)
    
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('shows correct button colors based on flash state', () => {
    mockUseSolubilityQuiz.mockReturnValue({
      shuffledQuestions: [{ compound: 'Test', answer: 'soluble' }],
      currentQuestion: { compound: 'Test', answer: 'soluble' },
      currentQuestionIndex: 0,
      flashColor: 'green',
      isAnswered: true,
      score: 1,
      totalAnswered: 1,
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    const solubleButton = screen.getByText('Soluble').closest('button')
    expect(solubleButton).toHaveClass('bg-green-500')
  })

  it('shows red button color for incorrect answer', () => {
    mockUseSolubilityQuiz.mockReturnValue({
      shuffledQuestions: [{ compound: 'Test', answer: 'soluble' }],
      currentQuestion: { compound: 'Test', answer: 'soluble' },
      currentQuestionIndex: 0,
      flashColor: 'red',
      isAnswered: true,
      score: 0,
      totalAnswered: 1,
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<SolubilityQuiz onBackToMenu={onBackToMenu} />)
    
    // When answer is soluble but flashColor is red, it means user selected wrong answer
    // The component shows red on the button that matches the answer when flashColor is red
    // So if answer is soluble and flashColor is red, the soluble button shows red
    // But actually, looking at the component logic:
    // - flashColor === 'red' && currentQuestion.answer === 'soluble' -> soluble button is red
    // - flashColor === 'red' && currentQuestion.answer === 'insoluble' -> insoluble button is red
    // So when answer is soluble and flash is red, the soluble button should be red
    const solubleButton = screen.getByText('Soluble').closest('button')
    expect(solubleButton).toHaveClass('bg-red-500')
  })
})

