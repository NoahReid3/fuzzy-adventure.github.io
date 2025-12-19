import { useState, useEffect } from 'react'

interface Question {
  compound: string
  answer: 'soluble' | 'insoluble'
}

interface IonChargeQuestion {
  ion: string
  correctCharge: string
  options: string[]
}

const ionChargeQuestionsBase: Omit<IonChargeQuestion, 'options'>[] = [
  // Group 1 metals (+1)
  { ion: 'Sodium (Na)', correctCharge: '+1' },
  { ion: 'Potassium (K)', correctCharge: '+1' },
  { ion: 'Lithium (Li)', correctCharge: '+1' },
  
  // Group 2 metals (+2)
  { ion: 'Magnesium (Mg)', correctCharge: '+2' },
  { ion: 'Calcium (Ca)', correctCharge: '+2' },
  { ion: 'Barium (Ba)', correctCharge: '+2' },
  
  // Group 3 metals (+3)
  { ion: 'Aluminum (Al)', correctCharge: '+3' },
  
  // Group 5 non-metals (-3)
  { ion: 'Nitride (N)', correctCharge: '-3' },
  
  // Group 6 non-metals (-2)
  { ion: 'Oxide (O)', correctCharge: '-2' },
  { ion: 'Sulfide (S)', correctCharge: '-2' },
  
  // Group 7 non-metals (-1)
  { ion: 'Chloride (Cl)', correctCharge: '-1' },
  { ion: 'Fluoride (F)', correctCharge: '-1' },
  { ion: 'Bromide (Br)', correctCharge: '-1' },
  
  // Specific metal ions
  { ion: 'Silver (Ag)', correctCharge: '+1' },
  { ion: 'Copper (Cu)', correctCharge: '+2' },
  { ion: 'Iron(II) (Fe)', correctCharge: '+2' },
  { ion: 'Iron(III) (Fe)', correctCharge: '+3' },
  { ion: 'Lead(II) (Pb)', correctCharge: '+2' },
  { ion: 'Zinc (Zn)', correctCharge: '+2' },
  
  // Polyatomic ions
  { ion: 'Hydrogen (H)', correctCharge: '+1' },
  { ion: 'Hydroxide (OH)', correctCharge: '-1' },
  { ion: 'Ammonium (NH₄)', correctCharge: '+1' },
  { ion: 'Carbonate (CO₃)', correctCharge: '-2' },
  { ion: 'Nitrate (NO₃)', correctCharge: '-1' },
  { ion: 'Sulfate (SO₄)', correctCharge: '-2' },
]

const questions: Question[] = [
  // Sodium, potassium, ammonium compounds - soluble
  { compound: 'Sodium chloride (NaCl)', answer: 'soluble' },
  { compound: 'Potassium nitrate (KNO₃)', answer: 'soluble' },
  { compound: 'Ammonium sulfate ((NH₄)₂SO₄)', answer: 'soluble' },
  
  // Nitrates - all soluble
  { compound: 'Silver nitrate (AgNO₃)', answer: 'soluble' },
  { compound: 'Lead(II) nitrate (Pb(NO₃)₂)', answer: 'soluble' },
  { compound: 'Calcium nitrate (Ca(NO₃)₂)', answer: 'soluble' },
  
  // Chlorides - soluble except silver and lead(II)
  { compound: 'Magnesium chloride (MgCl₂)', answer: 'soluble' },
  { compound: 'Calcium chloride (CaCl₂)', answer: 'soluble' },
  { compound: 'Silver chloride (AgCl)', answer: 'insoluble' },
  { compound: 'Lead(II) chloride (PbCl₂)', answer: 'insoluble' },
  
  // Sulfates - soluble except barium, calcium, lead(II)
  { compound: 'Sodium sulfate (Na₂SO₄)', answer: 'soluble' },
  { compound: 'Magnesium sulfate (MgSO₄)', answer: 'soluble' },
  { compound: 'Barium sulfate (BaSO₄)', answer: 'insoluble' },
  { compound: 'Calcium sulfate (CaSO₄)', answer: 'insoluble' },
  { compound: 'Lead(II) sulfate (PbSO₄)', answer: 'insoluble' },
  
  // Carbonates - insoluble except sodium, potassium, ammonium
  { compound: 'Calcium carbonate (CaCO₃)', answer: 'insoluble' },
  { compound: 'Magnesium carbonate (MgCO₃)', answer: 'insoluble' },
  { compound: 'Barium carbonate (BaCO₃)', answer: 'insoluble' },
  { compound: 'Sodium carbonate (Na₂CO₃)', answer: 'soluble' },
  { compound: 'Potassium carbonate (K₂CO₃)', answer: 'soluble' },
  { compound: 'Ammonium carbonate ((NH₄)₂CO₃)', answer: 'soluble' },
  
  // Hydroxides - insoluble except sodium, potassium, calcium
  { compound: 'Magnesium hydroxide (Mg(OH)₂)', answer: 'insoluble' },
  { compound: 'Aluminum hydroxide (Al(OH)₃)', answer: 'insoluble' },
  { compound: 'Iron(II) hydroxide (Fe(OH)₂)', answer: 'insoluble' },
  { compound: 'Sodium hydroxide (NaOH)', answer: 'soluble' },
  { compound: 'Potassium hydroxide (KOH)', answer: 'soluble' },
  { compound: 'Calcium hydroxide (Ca(OH)₂)', answer: 'soluble' },
]

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type GameType = 'solubility' | 'game2' | 'game3' | 'game4' | 'game5' | 'game6' | null

const gameTitles: Record<Exclude<GameType, null>, string> = {
  solubility: 'Solubility Quiz',
  game2: 'Ion Charges Quiz',
  game3: 'Game 3',
  game4: 'Game 4',
  game5: 'Game 5',
  game6: 'Game 6',
}

// Helper function to generate multiple choice options for ion charges
const generateChargeOptions = (correctCharge: string): string[] => {
  const allCharges = ['+1', '+2', '+3', '-1', '-2', '-3']
  const wrongOptions = allCharges.filter(c => c !== correctCharge)
  const shuffled = shuffleArray(wrongOptions)
  return shuffleArray([correctCharge, ...shuffled.slice(0, 3)])
}

function App() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedGame, setSelectedGame] = useState<GameType>(null)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [shuffledIonQuestions, setShuffledIonQuestions] = useState<IonChargeQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedIonCharge, setSelectedIonCharge] = useState<string | null>(null)

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

  useEffect(() => {
    if (selectedGame === 'solubility') {
      setShuffledQuestions(shuffleArray(questions))
      setCurrentQuestionIndex(0)
    } else if (selectedGame === 'game2') {
      const questionsWithOptions = ionChargeQuestionsBase.map(q => ({
        ...q,
        options: generateChargeOptions(q.correctCharge)
      }))
      setShuffledIonQuestions(shuffleArray(questionsWithOptions))
      setCurrentQuestionIndex(0)
    }
  }, [selectedGame])

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

  const handleGameSelect = (game: GameType) => {
    if (game === 'solubility' || game === 'game2') {
      setSelectedGame(game)
    }
    // Other games will be implemented later
  }

  const handleBackToMenu = () => {
    setSelectedGame(null)
    setFlashColor(null)
    setIsAnswered(false)
    setCurrentQuestionIndex(0)
    setSelectedIonCharge(null)
  }

  const handleAnswer = (answer: 'soluble' | 'insoluble') => {
    if (isAnswered || shuffledQuestions.length === 0) return

    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const isCorrect = answer === currentQuestion.answer

    setIsAnswered(true)
    setFlashColor(isCorrect ? 'green' : 'red')

    setTimeout(() => {
      setFlashColor(null)
      setIsAnswered(false)
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        // Quiz complete - reshuffle and restart
        setShuffledQuestions(shuffleArray(questions))
        setCurrentQuestionIndex(0)
      }
    }, 1000)
  }

  const handleIonChargeAnswer = (selectedCharge: string) => {
    if (isAnswered || shuffledIonQuestions.length === 0) return

    const currentQuestion = shuffledIonQuestions[currentQuestionIndex]
    const isCorrect = selectedCharge === currentQuestion.correctCharge

    setSelectedIonCharge(selectedCharge)
    setIsAnswered(true)
    setFlashColor(isCorrect ? 'green' : 'red')

    setTimeout(() => {
      setFlashColor(null)
      setIsAnswered(false)
      setSelectedIonCharge(null)
      if (currentQuestionIndex < shuffledIonQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        // Quiz complete - reshuffle and restart
        const questionsWithOptions = ionChargeQuestionsBase.map(q => ({
          ...q,
          options: generateChargeOptions(q.correctCharge)
        }))
        setShuffledIonQuestions(shuffleArray(questionsWithOptions))
        setCurrentQuestionIndex(0)
      }
    }, 1000)
  }

  const text = 'Hello World'
  const currentQuestion = shuffledQuestions[currentQuestionIndex] || questions[0]
  const currentIonQuestion = shuffledIonQuestions[currentQuestionIndex] || (ionChargeQuestionsBase.length > 0 ? { ...ionChargeQuestionsBase[0], options: generateChargeOptions(ionChargeQuestionsBase[0].correctCharge) } : null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 relative px-4">
      {/* Centered content with password box */}
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

        {/* Game Menu */}
        {showMenu && !selectedGame && (
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                Select a Game
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(['solubility', 'game2', 'game3', 'game4', 'game5', 'game6'] as Exclude<GameType, null>[]).map((game) => (
                  <button
                    key={game}
                    onClick={() => handleGameSelect(game)}
                    disabled={game !== 'solubility' && game !== 'game2'}
                    className={`px-6 py-4 text-xl font-semibold rounded-xl shadow-lg transition-all transform ${
                      game === 'solubility' || game === 'game2'
                        ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {gameTitles[game as Exclude<GameType, null>]}
                    {game !== 'solubility' && game !== 'game2' && (
                      <span className="block text-sm mt-1 font-normal">Coming Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Solubility Quiz Game */}
        {selectedGame === 'solubility' && (
          <div 
            className="flex flex-col items-center justify-center mt-8 transition-all duration-300"
            style={{
              backgroundColor: flashColor === 'green' ? 'rgba(34, 197, 94, 0.3)' : flashColor === 'red' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-2xl w-full">
              <button
                onClick={handleBackToMenu}
                className="mb-4 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                ← Back to Menu
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Question {currentQuestionIndex + 1} of {shuffledQuestions.length || questions.length}
                </h2>
                <p className="text-3xl font-semibold text-gray-900">
                  Is {currentQuestion.compound} soluble or insoluble in water?
                </p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleAnswer('soluble')}
                  disabled={isAnswered}
                  className={`px-8 py-4 text-xl font-bold rounded-xl shadow-lg transition-all transform ${
                    isAnswered 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105 active:scale-95'
                  } ${
                    flashColor === 'green' && currentQuestion.answer === 'soluble'
                      ? 'bg-green-500 text-white'
                      : flashColor === 'red' && currentQuestion.answer === 'soluble'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Soluble
                </button>
                
                <button
                  onClick={() => handleAnswer('insoluble')}
                  disabled={isAnswered}
                  className={`px-8 py-4 text-xl font-bold rounded-xl shadow-lg transition-all transform ${
                    isAnswered 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105 active:scale-95'
                  } ${
                    flashColor === 'green' && currentQuestion.answer === 'insoluble'
                      ? 'bg-green-500 text-white'
                      : flashColor === 'red' && currentQuestion.answer === 'insoluble'
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  Insoluble
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ion Charges Quiz Game */}
        {selectedGame === 'game2' && currentIonQuestion && (
          <div 
            className="flex flex-col items-center justify-center mt-8 transition-all duration-300"
            style={{
              backgroundColor: flashColor === 'green' ? 'rgba(34, 197, 94, 0.3)' : flashColor === 'red' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-2xl w-full">
              <button
                onClick={handleBackToMenu}
                className="mb-4 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                ← Back to Menu
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Question {currentQuestionIndex + 1} of {shuffledIonQuestions.length || ionChargeQuestionsBase.length}
                </h2>
                <p className="text-3xl font-semibold text-gray-900">
                  What is the charge of {currentIonQuestion.ion}?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {currentIonQuestion.options.map((charge, index) => {
                  const isCorrect = charge === currentIonQuestion.correctCharge
                  const isSelected = charge === selectedIonCharge
                  const showGreen = isAnswered && isCorrect
                  const showRed = isAnswered && isSelected && !isCorrect
                  const showLightRed = isAnswered && flashColor === 'red' && !isCorrect && !isSelected
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleIonChargeAnswer(charge)}
                      disabled={isAnswered}
                      className={`px-6 py-4 text-2xl font-bold rounded-xl shadow-lg transition-all transform ${
                        isAnswered 
                          ? 'cursor-not-allowed' 
                          : 'hover:scale-105 active:scale-95'
                      } ${
                        showGreen
                          ? 'bg-green-500 text-white'
                          : showRed
                          ? 'bg-red-500 text-white'
                          : showLightRed
                          ? 'bg-red-200 text-white opacity-70'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {charge}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
