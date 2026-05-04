import { useState } from 'react'
import { GameType } from './types'
import { usePasswordAuth } from './hooks/usePasswordAuth'
import { PasswordScreen } from './components/PasswordScreen'
import { GameMenu } from './components/GameMenu'
import { SolubilityQuiz } from './components/SolubilityQuiz'
import { IonChargeQuiz } from './components/IonChargeQuiz'
import { FactsGame } from './components/FactsGame'
import { factsQuestions } from './data/factsQuestions'
import { chemistryQuestions } from './data/chemistryQuestions'
import { computerScienceQuestions } from './data/computerScienceQuestions'

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

        {selectedGame === 'game4' && (
          <FactsGame
            onBackToMenu={handleBackToMenu}
            questions={factsQuestions}
            showDontKnow
            timerSeconds={10}
          />
        )}

        {selectedGame === 'game5' && (
          <FactsGame
            onBackToMenu={handleBackToMenu}
            questions={chemistryQuestions}
            showDontKnow
          />
        )}

        {selectedGame === 'game6' && (
          <FactsGame
            onBackToMenu={handleBackToMenu}
            questions={computerScienceQuestions}
            showDontKnow
          />
        )}
      </div>
    </div>
  )
}

export default App
