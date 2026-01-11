import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameMenu } from './GameMenu'

describe('GameMenu', () => {
  const onGameSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all game buttons', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    expect(screen.getByText(/solubility quiz/i)).toBeInTheDocument()
    expect(screen.getByText(/ion charges quiz/i)).toBeInTheDocument()
    expect(screen.getByText(/geography case studies quiz/i)).toBeInTheDocument()
  })

  it('displays correct game titles', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    expect(screen.getByText('Solubility Quiz')).toBeInTheDocument()
    expect(screen.getByText('Ion Charges Quiz')).toBeInTheDocument()
    expect(screen.getByText('Geography Case Studies Quiz')).toBeInTheDocument()
  })

  it('calls onGameSelect with correct game type for enabled games', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    const solubilityButton = screen.getByText('Solubility Quiz')
    await user.click(solubilityButton)
    
    expect(onGameSelect).toHaveBeenCalledWith('solubility')
    expect(onGameSelect).toHaveBeenCalledTimes(1)
  })

  it('disables games 4, 5, 6', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    const game4Button = screen.getByText('Game 4').closest('button')
    const game5Button = screen.getByText('Game 5').closest('button')
    const game6Button = screen.getByText('Game 6').closest('button')
    
    expect(game4Button).toBeDisabled()
    expect(game5Button).toBeDisabled()
    expect(game6Button).toBeDisabled()
  })

  it('shows "Coming Soon" for disabled games', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    expect(screen.getAllByText('Coming Soon')).toHaveLength(3)
  })

  it('does not call onGameSelect for disabled games', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    const game4Button = screen.getByText('Game 4').closest('button')
    if (game4Button) {
      await user.click(game4Button)
    }
    
    expect(onGameSelect).not.toHaveBeenCalled()
  })

  it('enables games 1, 2, 3', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    const solubilityButton = screen.getByText('Solubility Quiz').closest('button')
    const ionButton = screen.getByText('Ion Charges Quiz').closest('button')
    const caseStudyButton = screen.getByText('Geography Case Studies Quiz').closest('button')
    
    expect(solubilityButton).not.toBeDisabled()
    expect(ionButton).not.toBeDisabled()
    expect(caseStudyButton).not.toBeDisabled()
  })

  it('calls onGameSelect for game2', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    const ionButton = screen.getByText('Ion Charges Quiz')
    await user.click(ionButton)
    
    expect(onGameSelect).toHaveBeenCalledWith('game2')
  })

  it('calls onGameSelect for game3', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)
    
    const caseStudyButton = screen.getByText('Geography Case Studies Quiz')
    await user.click(caseStudyButton)
    
    expect(onGameSelect).toHaveBeenCalledWith('game3')
  })
})

