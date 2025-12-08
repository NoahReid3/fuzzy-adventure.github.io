import { useState, useEffect } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showBoxes, setShowBoxes] = useState(false)

  useEffect(() => {
    if (isCorrect && message) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
        // Show boxes after message fades out
        setTimeout(() => {
          setShowBoxes(true)
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

  const text = 'Hello World'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 relative">
      {/* Centered content with password box */}
      <div className="text-center w-full relative z-20">
        {/* Text that drifts to top left */}
        <h1 
          className="text-6xl font-bold text-white mb-4 drop-shadow-lg text-center whitespace-nowrap relative"
          style={{
            position: isCorrect ? 'fixed' : 'relative',
            top: isCorrect ? '2rem' : 'auto',
            left: isCorrect ? '2rem' : 'auto',
            transition: 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: isCorrect ? 'translate(0, 0) scale(0.9)' : 'translate(0, 0) scale(1)',
          }}
        >
          {text}
        </h1>
        <input
          type="password"
          placeholder={message && !isCorrect ? message : "Enter password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (message && !isCorrect) {
              setMessage('') // Clear error message when user starts typing
            }
          }}
          onKeyDown={handleKeyDown}
          className="text-xl px-4 py-2 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
          style={{
            opacity: isCorrect ? 0 : 1,
            transition: 'opacity 1s ease-in-out',
            pointerEvents: isCorrect ? 'none' : 'auto'
          }}
        />
        {message && isCorrect && (
          <p 
            className="text-xl text-white mt-4 drop-shadow-lg"
            style={{
              opacity: showMessage ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            {message}
          </p>
        )}
      </div>

      {/* Three rounded rectangles that appear after message fades */}
      {showBoxes && (
        <div className="absolute" style={{ top: '8rem', left: '2rem', display: 'flex', gap: '1.5rem' }}>
          {/* Shorter rectangle on the left, aligned under Hello World */}
          <div
            className="rounded-3xl"
            style={{
              width: '8rem',
              height: '12rem',
              backgroundColor: '#0d9488', // Dark teal
              opacity: showBoxes ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
          {/* Taller rectangle in the middle */}
          <div
            className="rounded-3xl"
            style={{
              width: '10rem',
              height: '20rem',
              backgroundColor: '#0d9488', // Dark teal
              opacity: showBoxes ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
          {/* Taller rectangle on the right */}
          <div
            className="rounded-3xl"
            style={{
              width: '10rem',
              height: '20rem',
              backgroundColor: '#0d9488', // Dark teal
              opacity: showBoxes ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default App
