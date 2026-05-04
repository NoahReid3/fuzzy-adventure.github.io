import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordScreen } from './PasswordScreen'

describe('PasswordScreen', () => {
  const defaultProps = {
    password: '',
    message: '',
    isCorrect: false,
    showMessage: false,
    onPasswordChange: vi.fn(),
    onKeyDown: vi.fn(),
  }

  it('renders input field', () => {
    render(<PasswordScreen {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/enter password/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renders "If not now, when?" text', () => {
    render(<PasswordScreen {...defaultProps} />)
    
    expect(screen.getByText('If not now, when?')).toBeInTheDocument()
  })

  it('calls onPasswordChange when input changes', async () => {
    const user = userEvent.setup()
    const onPasswordChange = vi.fn()
    render(<PasswordScreen {...defaultProps} onPasswordChange={onPasswordChange} />)
    
    const input = screen.getByPlaceholderText(/enter password/i)
    await user.type(input, 'test')
    
    expect(onPasswordChange).toHaveBeenCalled()
  })

  it('calls onKeyDown when key is pressed', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    render(<PasswordScreen {...defaultProps} onKeyDown={onKeyDown} />)
    
    const input = screen.getByPlaceholderText(/enter password/i)
    await user.type(input, 'test{Enter}')
    
    expect(onKeyDown).toHaveBeenCalled()
  })

  it('shows message when showMessage is true', () => {
    render(
      <PasswordScreen
        {...defaultProps}
        message="Password correct"
        isCorrect={true}
        showMessage={true}
      />
    )
    
    expect(screen.getByText('Password correct')).toBeInTheDocument()
  })

  it('hides input when isCorrect is true', () => {
    const { container } = render(
      <PasswordScreen
        {...defaultProps}
        isCorrect={true}
      />
    )
    
    const input = container.querySelector('input')
    expect(input).toHaveStyle({ opacity: '0' })
    expect(input).toHaveStyle({ pointerEvents: 'none' })
  })

  it('applies correct styling based on isCorrect state', () => {
    const { container, rerender } = render(
      <PasswordScreen {...defaultProps} isCorrect={false} />
    )
    
    let h1 = container.querySelector('h1')
    expect(h1).toHaveStyle({ position: 'relative' })
    
    rerender(<PasswordScreen {...defaultProps} isCorrect={true} />)
    
    h1 = container.querySelector('h1')
    expect(h1).toHaveStyle({ position: 'fixed' })
  })

  it('shows placeholder message when incorrect', () => {
    render(
      <PasswordScreen
        {...defaultProps}
        message="Incorrect, try again"
        isCorrect={false}
      />
    )
    
    const input = screen.getByPlaceholderText('Incorrect, try again')
    expect(input).toBeInTheDocument()
  })

  it('displays password value', () => {
    render(<PasswordScreen {...defaultProps} password="test123" />)
    
    const input = screen.getByPlaceholderText(/enter password/i) as HTMLInputElement
    expect(input.value).toBe('test123')
  })
})

