import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CaseStudyQuiz } from './CaseStudyQuiz'

// Mock the hook
const mockSetCaseStudyAnswers = vi.fn()
const mockCheckAnswers = vi.fn()
const mockResetCaseStudy = vi.fn()
const mockReset = vi.fn()
const mockHandleKeyDown = vi.fn()

const mockUseCaseStudyQuiz = vi.fn(() => ({
  currentCaseStudy: {
    title: 'Test Case Study',
    point1: 'High Infant Mortality Rate',
    point2: 'Decreasing Death Rate',
    point3: 'High Birth Rate',
    psi: 'IMR is 100/1000 births',
  },
  caseStudyAnswers: {
    point1: '',
    point2: '',
    point3: '',
    psi: '',
  },
  caseStudyChecked: {
    point1: false,
    point2: false,
    point3: false,
    psi: false,
  },
  caseStudyResults: {
    point1: null,
    point2: null,
    point3: null,
    psi: null,
  },
  setCaseStudyAnswers: mockSetCaseStudyAnswers,
  checkAnswers: mockCheckAnswers,
  handleKeyDown: mockHandleKeyDown,
  resetCaseStudy: mockResetCaseStudy,
  reset: mockReset,
}))

vi.mock('../hooks/useCaseStudyQuiz', () => ({
  useCaseStudyQuiz: () => mockUseCaseStudyQuiz(),
}))

describe('CaseStudyQuiz', () => {
  const onBackToMenu = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: {
        title: 'Test Case Study',
        point1: 'High Infant Mortality Rate',
        point2: 'Decreasing Death Rate',
        point3: 'High Birth Rate',
        psi: 'IMR is 100/1000 births',
      },
      caseStudyAnswers: {
        point1: '',
        point2: '',
        point3: '',
        psi: '',
      },
      caseStudyChecked: {
        point1: false,
        point2: false,
        point3: false,
        psi: false,
      },
      caseStudyResults: {
        point1: null,
        point2: null,
        point3: null,
        psi: null,
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders case study title', () => {
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByText('Test Case Study')).toBeInTheDocument()
  })

  it('renders all four input fields (point1, point2, point3, psi)', () => {
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByPlaceholderText('Enter Point 1')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter Point 2')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter Point 3')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter PSI')).toBeInTheDocument()
  })

  it('updates answers via setCaseStudyAnswers', async () => {
    const user = userEvent.setup()
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const point1Input = screen.getByPlaceholderText('Enter Point 1')
    await user.type(point1Input, 'Test answer')
    
    expect(mockSetCaseStudyAnswers).toHaveBeenCalled()
  })

  it('calls checkAnswers when Enter pressed (first field)', async () => {
    const user = userEvent.setup()
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const point1Input = screen.getByPlaceholderText('Enter Point 1')
    await user.type(point1Input, 'Test{Enter}')
    
    expect(mockHandleKeyDown).toHaveBeenCalled()
  })

  it('disables inputs after checking', () => {
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: {
        title: 'Test Case Study',
        point1: 'High Infant Mortality Rate',
        point2: 'Decreasing Death Rate',
        point3: 'High Birth Rate',
        psi: 'IMR is 100/1000 births',
      },
      caseStudyAnswers: {
        point1: 'Test',
        point2: 'Test',
        point3: 'Test',
        psi: 'Test',
      },
      caseStudyChecked: {
        point1: true,
        point2: true,
        point3: true,
        psi: true,
      },
      caseStudyResults: {
        point1: 'correct',
        point2: 'incorrect',
        point3: 'correct',
        psi: 'incorrect',
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
    
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const point1Input = screen.getByPlaceholderText('Enter Point 1') as HTMLInputElement
    expect(point1Input).toBeDisabled()
  })

  it('shows green background for correct answers', () => {
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: {
        title: 'Test Case Study',
        point1: 'High Infant Mortality Rate',
        point2: 'Decreasing Death Rate',
        point3: 'High Birth Rate',
        psi: 'IMR is 100/1000 births',
      },
      caseStudyAnswers: {
        point1: 'High Infant Mortality Rate',
        point2: '',
        point3: '',
        psi: '',
      },
      caseStudyChecked: {
        point1: true,
        point2: false,
        point3: false,
        psi: false,
      },
      caseStudyResults: {
        point1: 'correct',
        point2: null,
        point3: null,
        psi: null,
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
    
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const point1Input = screen.getByPlaceholderText('Enter Point 1')
    expect(point1Input).toHaveClass('bg-green-100', 'border-green-500')
  })

  it('shows red background for incorrect answers', () => {
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: {
        title: 'Test Case Study',
        point1: 'High Infant Mortality Rate',
        point2: 'Decreasing Death Rate',
        point3: 'High Birth Rate',
        psi: 'IMR is 100/1000 births',
      },
      caseStudyAnswers: {
        point1: 'Wrong answer',
        point2: '',
        point3: '',
        psi: '',
      },
      caseStudyChecked: {
        point1: true,
        point2: false,
        point3: false,
        psi: false,
      },
      caseStudyResults: {
        point1: 'incorrect',
        point2: null,
        point3: null,
        psi: null,
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
    
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const point1Input = screen.getByPlaceholderText('Enter Point 1')
    expect(point1Input).toHaveClass('bg-red-100', 'border-red-500')
  })

  it('displays correct answer text for incorrect responses', () => {
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: {
        title: 'Test Case Study',
        point1: 'High Infant Mortality Rate',
        point2: 'Decreasing Death Rate',
        point3: 'High Birth Rate',
        psi: 'IMR is 100/1000 births',
      },
      caseStudyAnswers: {
        point1: 'Wrong answer',
        point2: '',
        point3: '',
        psi: '',
      },
      caseStudyChecked: {
        point1: true,
        point2: false,
        point3: false,
        psi: false,
      },
      caseStudyResults: {
        point1: 'incorrect',
        point2: null,
        point3: null,
        psi: null,
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
    
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByText(/correct answer: high infant mortality rate/i)).toBeInTheDocument()
  })

  it('renders "Next Case Study" button after checking', () => {
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: {
        title: 'Test Case Study',
        point1: 'High Infant Mortality Rate',
        point2: 'Decreasing Death Rate',
        point3: 'High Birth Rate',
        psi: 'IMR is 100/1000 births',
      },
      caseStudyAnswers: {
        point1: 'Test',
        point2: 'Test',
        point3: 'Test',
        psi: 'Test',
      },
      caseStudyChecked: {
        point1: true,
        point2: true,
        point3: true,
        psi: true,
      },
      caseStudyResults: {
        point1: 'correct',
        point2: 'incorrect',
        point3: 'correct',
        psi: 'incorrect',
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
    
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    expect(screen.getByRole('button', { name: /next case study/i })).toBeInTheDocument()
  })

  it('calls resetCaseStudy when next button clicked', async () => {
    const user = userEvent.setup()
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: {
        title: 'Test Case Study',
        point1: 'High Infant Mortality Rate',
        point2: 'Decreasing Death Rate',
        point3: 'High Birth Rate',
        psi: 'IMR is 100/1000 births',
      },
      caseStudyAnswers: {
        point1: 'Test',
        point2: 'Test',
        point3: 'Test',
        psi: 'Test',
      },
      caseStudyChecked: {
        point1: true,
        point2: true,
        point3: true,
        psi: true,
      },
      caseStudyResults: {
        point1: 'correct',
        point2: 'incorrect',
        point3: 'correct',
        psi: 'incorrect',
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
    
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const nextButton = screen.getByRole('button', { name: /next case study/i })
    await user.click(nextButton)
    
    expect(mockResetCaseStudy).toHaveBeenCalledTimes(1)
  })

  it('calls onBackToMenu when back button clicked', async () => {
    const user = userEvent.setup()
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const backButton = screen.getByText(/back to menu/i)
    await user.click(backButton)
    
    expect(onBackToMenu).toHaveBeenCalledTimes(1)
  })

  it('resets quiz when back button clicked', async () => {
    const user = userEvent.setup()
    render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    const backButton = screen.getByText(/back to menu/i)
    await user.click(backButton)
    
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('returns null when no current case study', () => {
    mockUseCaseStudyQuiz.mockReturnValue({
      currentCaseStudy: null,
      caseStudyAnswers: {
        point1: '',
        point2: '',
        point3: '',
        psi: '',
      },
      caseStudyChecked: {
        point1: false,
        point2: false,
        point3: false,
        psi: false,
      },
      caseStudyResults: {
        point1: null,
        point2: null,
        point3: null,
        psi: null,
      },
      setCaseStudyAnswers: mockSetCaseStudyAnswers,
      checkAnswers: mockCheckAnswers,
      handleKeyDown: mockHandleKeyDown,
      resetCaseStudy: mockResetCaseStudy,
      reset: mockReset,
    })
    
    const { container } = render(<CaseStudyQuiz onBackToMenu={onBackToMenu} />)
    
    expect(container.firstChild).toBeNull()
  })
})

