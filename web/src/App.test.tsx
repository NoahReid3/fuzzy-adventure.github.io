import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the hooks
const mockUsePasswordAuth = vi.fn()

vi.mock('./hooks/usePasswordAuth', () => ({
  usePasswordAuth: () => mockUsePasswordAuth(),
}))

vi.mock('./components/SolubilityQuiz', () => ({
  SolubilityQuiz: ({ onBackToMenu }: { onBackToMenu: () => void }) => (
    <div data-testid="solubility-quiz">
      <button onClick={onBackToMenu}>Back</button>
    </div>
  ),
}))

vi.mock('./components/IonChargeQuiz', () => ({
  IonChargeQuiz: ({ onBackToMenu }: { onBackToMenu: () => void }) => (
    <div data-testid="ion-charge-quiz">
      <button onClick={onBackToMenu}>Back</button>
    </div>
  ),
}))

vi.mock('./components/CaseStudyQuiz', () => ({
  CaseStudyQuiz: ({ onBackToMenu }: { onBackToMenu: () => void }) => (
    <div data-testid="case-study-quiz">
      <button onClick={onBackToMenu}>Back</button>
    </div>
  ),
}))

vi.mock('./components/FactsGame', () => ({
  FactsGame: ({
    onBackToMenu,
    showDontKnow,
    timerSeconds,
  }: {
    onBackToMenu: () => void
    questions: { question: string; answer: string }[]
    showDontKnow?: boolean
    timerSeconds?: number
  }) => (
    <div data-testid="facts-game">
      {showDontKnow ? <span data-testid="facts-show-dont-know">show-dont-know</span> : null}
      {timerSeconds ? <span data-testid="facts-timer-seconds">{timerSeconds}</span> : null}
      <button onClick={onBackToMenu}>Back</button>
    </div>
  ),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders PasswordScreen initially', () => {
    mockUsePasswordAuth.mockReturnValue({
      password: '',
      message: '',
      isCorrect: false,
      showMessage: false,
      showMenu: false,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument()
  })

  it('shows GameMenu after correct password', async () => {
    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    expect(screen.getByText(/select a game/i)).toBeInTheDocument()
  })

  it('handles game selection correctly', async () => {
    const user = userEvent.setup()
    
    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    const solubilityButton = screen.getByText('Solubility Quiz')
    await user.click(solubilityButton)
    
    expect(screen.getByTestId('solubility-quiz')).toBeInTheDocument()
  })

  it('renders SolubilityQuiz when solubility selected', async () => {
    const user = userEvent.setup()
    
    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    const solubilityButton = screen.getByText('Solubility Quiz')
    await user.click(solubilityButton)
    
    expect(screen.getByTestId('solubility-quiz')).toBeInTheDocument()
  })

  it('renders IonChargeQuiz when game2 selected', async () => {
    const user = userEvent.setup()
    
    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    const ionButton = screen.getByText('Ion Charges Quiz')
    await user.click(ionButton)
    
    expect(screen.getByTestId('ion-charge-quiz')).toBeInTheDocument()
  })

  it('renders CaseStudyQuiz when game3 selected', async () => {
    const user = userEvent.setup()

    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)

    const caseStudyButton = screen.getByText('Geography Case Studies Quiz')
    await user.click(caseStudyButton)

    expect(screen.getByTestId('case-study-quiz')).toBeInTheDocument()
  })

  it('renders FactsGame when game4 selected', async () => {
    const user = userEvent.setup()

    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)

    const factsButton = screen.getByText('IGCSE Geography Facts')
    await user.click(factsButton)

    expect(screen.getByTestId('facts-game')).toBeInTheDocument()
    expect(screen.getByTestId('facts-show-dont-know')).toBeInTheDocument()
    expect(screen.getByTestId('facts-timer-seconds')).toHaveTextContent('10')
  })

  it('renders FactsGame when game5 selected', async () => {
    const user = userEvent.setup()

    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)

    const chemistryButton = screen.getByText('IGCSE Chemistry Facts')
    await user.click(chemistryButton)

    expect(screen.getByTestId('facts-game')).toBeInTheDocument()
  })

  it('renders FactsGame when game6 selected', async () => {
    const user = userEvent.setup()

    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)

    const computerScienceButton = screen.getByText('IGCSE Computer Science Facts')
    await user.click(computerScienceButton)

    expect(screen.getByTestId('facts-game')).toBeInTheDocument()
  })

  it('returns to menu when back button clicked', async () => {
    const user = userEvent.setup()
    
    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    // Select a game
    const solubilityButton = screen.getByText('Solubility Quiz')
    await user.click(solubilityButton)
    
    expect(screen.getByTestId('solubility-quiz')).toBeInTheDocument()
    
    // Click back button
    const backButton = screen.getByText('Back')
    await user.click(backButton)
    
    // Should return to menu
    expect(screen.getByText(/select a game/i)).toBeInTheDocument()
  })

  it('resets selected game when back clicked', async () => {
    const user = userEvent.setup()
    
    mockUsePasswordAuth.mockReturnValue({
      password: 'HelloWorld',
      message: 'Password correct',
      isCorrect: true,
      showMessage: false,
      showMenu: true,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    // Select a game
    const solubilityButton = screen.getByText('Solubility Quiz')
    await user.click(solubilityButton)
    
    expect(screen.getByTestId('solubility-quiz')).toBeInTheDocument()
    
    // Click back button
    const backButton = screen.getByText('Back')
    await user.click(backButton)
    
    // Should not show quiz anymore
    expect(screen.queryByTestId('solubility-quiz')).not.toBeInTheDocument()
  })

  it('does not show menu when showMenu is false', () => {
    mockUsePasswordAuth.mockReturnValue({
      password: '',
      message: '',
      isCorrect: false,
      showMessage: false,
      showMenu: false,
      handleKeyDown: vi.fn(),
      handlePasswordChange: vi.fn(),
    })

    render(<App />)
    
    expect(screen.queryByText(/select a game/i)).not.toBeInTheDocument()
  })
})

