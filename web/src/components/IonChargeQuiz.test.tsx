import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IonChargeQuiz } from './IonChargeQuiz'

// Mock the hook
const mockHandleAnswer = vi.fn()
const mockReset = vi.fn()

const mockUseIonChargeQuiz = vi.fn(() => ({
  shuffledIonQuestions: [
    { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
    { ion: 'Magnesium (Mg)', correctCharge: '+2', options: ['+1', '+2', '+3', '-1'] },
  ],
  currentIonQuestion: { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
  currentQuestionIndex: 0,
  flashColor: null,
  isAnswered: false,
  selectedIonCharge: null,
  handleAnswer: mockHandleAnswer,
  reset: mockReset,
}))

vi.mock('../hooks/useIonChargeQuiz', () => ({
  useIonChargeQuiz: () => mockUseIonChargeQuiz(),
}))

describe('IonChargeQuiz', () => {
  const onBackToMenu = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseIonChargeQuiz.mockReturnValue({
      shuffledIonQuestions: [
        { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      ],
      currentIonQuestion: { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      currentQuestionIndex: 0,
      flashColor: null,
      isAnswered: false,
      selectedIonCharge: null,
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders current question', () => {
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByText(/what is the charge of sodium \(na\)\?/i)).toBeInTheDocument()
  })

  it('displays question number and total', () => {
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByText(/question 1 of 1/i)).toBeInTheDocument()
  })

  it('renders all charge options as buttons', () => {
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByRole('button', { name: '+1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '-1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '-2' })).toBeInTheDocument()
  })

  it('calls handleAnswer with selected charge', async () => {
    const user = userEvent.setup()
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const chargeButton = screen.getByRole('button', { name: '+1' })
    await user.click(chargeButton)
    
    expect(mockHandleAnswer).toHaveBeenCalledWith('+1')
  })

  it('disables buttons when answered', () => {
    mockUseIonChargeQuiz.mockReturnValue({
      shuffledIonQuestions: [
        { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      ],
      currentIonQuestion: { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      currentQuestionIndex: 0,
      flashColor: 'green',
      isAnswered: true,
      selectedIonCharge: '+1',
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const buttons = screen.getAllByRole('button').filter(btn => 
      ['+1', '+2', '-1', '-2'].includes(btn.textContent || '')
    )
    
    buttons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('shows flash color background', () => {
    mockUseIonChargeQuiz.mockReturnValue({
      shuffledIonQuestions: [
        { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      ],
      currentIonQuestion: { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      currentQuestionIndex: 0,
      flashColor: 'green',
      isAnswered: true,
      selectedIonCharge: '+1',
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    const { container } = render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const quizContainer = container.firstChild as HTMLElement
    expect(quizContainer).toHaveStyle({ backgroundColor: 'rgba(34, 197, 94, 0.3)' })
  })

  it('highlights correct answer in green', () => {
    mockUseIonChargeQuiz.mockReturnValue({
      shuffledIonQuestions: [
        { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      ],
      currentIonQuestion: { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      currentQuestionIndex: 0,
      flashColor: 'green',
      isAnswered: true,
      selectedIonCharge: '+1',
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const correctButton = screen.getByRole('button', { name: '+1' })
    expect(correctButton).toHaveClass('bg-green-500')
  })

  it('highlights incorrect selected answer in red', () => {
    mockUseIonChargeQuiz.mockReturnValue({
      shuffledIonQuestions: [
        { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      ],
      currentIonQuestion: { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      currentQuestionIndex: 0,
      flashColor: 'red',
      isAnswered: true,
      selectedIonCharge: '+2',
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const incorrectButton = screen.getByRole('button', { name: '+2' })
    expect(incorrectButton).toHaveClass('bg-red-500')
  })

  it('shows light red for other incorrect options', () => {
    mockUseIonChargeQuiz.mockReturnValue({
      shuffledIonQuestions: [
        { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      ],
      currentIonQuestion: { ion: 'Sodium (Na)', correctCharge: '+1', options: ['+1', '+2', '-1', '-2'] },
      currentQuestionIndex: 0,
      flashColor: 'red',
      isAnswered: true,
      selectedIonCharge: '+2',
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const otherIncorrectButton = screen.getByRole('button', { name: '-1' })
    expect(otherIncorrectButton).toHaveClass('bg-red-200')
  })

  it('calls onBackToMenu when back button clicked', async () => {
    const user = userEvent.setup()
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const backButton = screen.getByText(/back to menu/i)
    await user.click(backButton)
    
    expect(onBackToMenu).toHaveBeenCalledTimes(1)
  })

  it('resets quiz when back button clicked', async () => {
    const user = userEvent.setup()
    render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    const backButton = screen.getByText(/back to menu/i)
    await user.click(backButton)
    
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('returns null when no current question', () => {
    mockUseIonChargeQuiz.mockReturnValue({
      shuffledIonQuestions: [],
      currentIonQuestion: null,
      currentQuestionIndex: 0,
      flashColor: null,
      isAnswered: false,
      selectedIonCharge: null,
      handleAnswer: mockHandleAnswer,
      reset: mockReset,
    })
    
    const { container } = render(<IonChargeQuiz onBackToMenu={onBackToMenu} />)
    
    expect(container.firstChild).toBeNull()
  })
})

