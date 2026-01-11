import { useState } from 'react'
import { GameType } from './types'
import { usePasswordAuth } from './hooks/usePasswordAuth'
import { PasswordScreen } from './components/PasswordScreen'
import { GameMenu } from './components/GameMenu'
import { SolubilityQuiz } from './components/SolubilityQuiz'
import { IonChargeQuiz } from './components/IonChargeQuiz'
import { CaseStudyQuiz } from './components/CaseStudyQuiz'

function App() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null)
  
  const {
    password,
    message,
    isCorrect,
    showMessage,
    showMenu,
    handleKeyDown,
    handlePasswordChange,
  } = usePasswordAuth()

  const handleGameSelect = (game: GameType) => {
    setSelectedGame(game)
  }

  const handleBackToMenu = () => {
    setSelectedGame(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 relative px-4">
      <div className="text-center w-full relative z-20">
        {!showMenu && (
          <PasswordScreen
            password={password}
            message={message}
            isCorrect={isCorrect}
            showMessage={showMessage}
            onPasswordChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
        )}

        {showMenu && !selectedGame && (
          <GameMenu onGameSelect={handleGameSelect} />
        )}

        {selectedGame === 'solubility' && (
          <SolubilityQuiz onBackToMenu={handleBackToMenu} />
        )}

        {selectedGame === 'game2' && (
          <IonChargeQuiz onBackToMenu={handleBackToMenu} />
        )}

        {selectedGame === 'game3' && (
          <CaseStudyQuiz onBackToMenu={handleBackToMenu} />
        )}
      </div>
    </div>
  )
}

export default App
