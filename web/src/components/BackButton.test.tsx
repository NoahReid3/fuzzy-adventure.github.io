import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BackButton } from './BackButton'

describe('BackButton', () => {
  it('renders back button with correct text', () => {
    const onClick = vi.fn()
    render(<BackButton onClick={onClick} />)
    
    const button = screen.getByText(/back to menu/i)
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<BackButton onClick={onClick} />)
    
    const button = screen.getByText(/back to menu/i)
    await user.click(button)
    
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has correct styling classes', () => {
    const onClick = vi.fn()
    const { container } = render(<BackButton onClick={onClick} />)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('mb-4', 'px-4', 'py-2')
  })
})

