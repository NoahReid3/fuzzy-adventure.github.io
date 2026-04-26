import { describe, it, expect, vi, beforeEach } from 'vitest'
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
    expect(screen.getByText(/igcse geography facts/i)).toBeInTheDocument()
    expect(screen.getByText(/igcse chemistry facts/i)).toBeInTheDocument()
  })

  it('displays correct game titles', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)

    expect(screen.getByText('Solubility Quiz')).toBeInTheDocument()
    expect(screen.getByText('Ion Charges Quiz')).toBeInTheDocument()
    expect(screen.getByText('Geography Case Studies Quiz')).toBeInTheDocument()
    expect(screen.getByText('IGCSE Geography Facts')).toBeInTheDocument()
    expect(screen.getByText('IGCSE Chemistry Facts')).toBeInTheDocument()
  })

  it('calls onGameSelect with correct game type for enabled games', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)

    const solubilityButton = screen.getByText('Solubility Quiz')
    await user.click(solubilityButton)

    expect(onGameSelect).toHaveBeenCalledWith('solubility')
    expect(onGameSelect).toHaveBeenCalledTimes(1)
  })

  it('disables game 6', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)

    const game6Button = screen.getByText('Game 6').closest('button')

    expect(game6Button).toBeDisabled()
  })

  it('shows "Coming Soon" for disabled games', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)

    expect(screen.getAllByText('Coming Soon')).toHaveLength(1)
  })

  it('does not call onGameSelect for disabled games', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)

    const game6Button = screen.getByText('Game 6').closest('button')
    if (game6Button) {
      await user.click(game6Button)
    }

    expect(onGameSelect).not.toHaveBeenCalled()
  })

  it('enables games 1, 2, 3, 4, 5', () => {
    render(<GameMenu onGameSelect={onGameSelect} />)

    const solubilityButton = screen.getByText('Solubility Quiz').closest('button')
    const ionButton = screen.getByText('Ion Charges Quiz').closest('button')
    const caseStudyButton = screen.getByText('Geography Case Studies Quiz').closest('button')
    const factsButton = screen.getByText('IGCSE Geography Facts').closest('button')
    const chemistryButton = screen.getByText('IGCSE Chemistry Facts').closest('button')

    expect(solubilityButton).not.toBeDisabled()
    expect(ionButton).not.toBeDisabled()
    expect(caseStudyButton).not.toBeDisabled()
    expect(factsButton).not.toBeDisabled()
    expect(chemistryButton).not.toBeDisabled()
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

  it('calls onGameSelect for game4', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)

    const factsButton = screen.getByText('IGCSE Geography Facts')
    await user.click(factsButton)

    expect(onGameSelect).toHaveBeenCalledWith('game4')
  })

  it('calls onGameSelect for game5', async () => {
    const user = userEvent.setup()
    render(<GameMenu onGameSelect={onGameSelect} />)

    const chemistryButton = screen.getByText('IGCSE Chemistry Facts')
    await user.click(chemistryButton)

    expect(onGameSelect).toHaveBeenCalledWith('game5')
  })
})
