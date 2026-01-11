import { useSolubilityQuiz } from '../hooks/useSolubilityQuiz'
import { BackButton } from './BackButton'
import { ScoreDisplay } from './ScoreDisplay'
import { questions } from '../data/solubilityQuestions'

interface SolubilityQuizProps {
  onBackToMenu: () => void
}

export const SolubilityQuiz = ({ onBackToMenu }: SolubilityQuizProps) => {
  const {
    shuffledQuestions,
    currentQuestion,
    currentQuestionIndex,
    flashColor,
    isAnswered,
    score,
    totalAnswered,
    handleAnswer,
    reset,
  } = useSolubilityQuiz()

  const handleBack = () => {
    reset()
    onBackToMenu()
  }

  return (
    <div 
      className="flex flex-col items-center justify-center mt-8 transition-all duration-300"
      style={{
        backgroundColor: flashColor === 'green' ? 'rgba(34, 197, 94, 0.3)' : flashColor === 'red' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
        transition: 'background-color 0.3s ease-in-out',
      }}
    >
      <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-2xl w-full">
        <BackButton onClick={handleBack} />
        <ScoreDisplay score={score} totalAnswered={totalAnswered} />
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
  )
}

