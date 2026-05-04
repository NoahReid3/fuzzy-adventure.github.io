interface PasswordScreenProps {
  password: string
  message: string
  isCorrect: boolean
  showMessage: boolean
  onPasswordChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const PasswordScreen = ({
  password,
  message,
  isCorrect,
  showMessage,
  onPasswordChange,
  onKeyDown,
}: PasswordScreenProps) => {
  const text = 'GeographicalOcto'

  return (
    <div className="text-center w-full relative z-20">
      {/* Text that drifts to top left */}
      <h1 
        className="text-6xl font-bold text-white mb-4 drop-shadow-lg text-center whitespace-nowrap relative transition-opacity duration-700"
        style={{
          position: isCorrect ? 'fixed' : 'relative',
          top: isCorrect ? '2rem' : 'auto',
          left: isCorrect ? '2rem' : 'auto',
          transition: 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: isCorrect ? 'translate(0, 0) scale(0.9)' : 'translate(0, 0) scale(1)',
          opacity: isCorrect ? 0 : 1,
        }}
      >
        {text}
      </h1>
      <input
        type="password"
        placeholder={message && !isCorrect ? message : "Enter password"}
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        onKeyDown={onKeyDown}
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
  )
}

