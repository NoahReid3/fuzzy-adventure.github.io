import { useState, useEffect } from 'react'

export const usePasswordAuth = () => {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (isCorrect && message) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
        setTimeout(() => {
          setShowMenu(true)
        }, 1000)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isCorrect, message])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (password === 'HelloWorld') {
        setMessage('Password correct')
        setIsCorrect(true)
      } else {
        setMessage('Incorrect, try again')
        setIsCorrect(false)
        setPassword('') // Clear the password field
      }
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (message && !isCorrect) {
      setMessage('') // Clear error message when user starts typing
    }
  }

  return {
    password,
    message,
    isCorrect,
    showMessage,
    showMenu,
    handleKeyDown,
    handlePasswordChange,
  }
}

