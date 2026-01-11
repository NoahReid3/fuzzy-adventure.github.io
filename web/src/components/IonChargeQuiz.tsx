import { useIonChargeQuiz } from '../hooks/useIonChargeQuiz'
import { BackButton } from './BackButton'
import { ionChargeQuestionsBase } from '../data/ionChargeQuestions'

interface IonChargeQuizProps {
  onBackToMenu: () => void
}

export const IonChargeQuiz = ({ onBackToMenu }: IonChargeQuizProps) => {
  const {
    shuffledIonQuestions,
    currentIonQuestion,
    currentQuestionIndex,
    flashColor,
    isAnswered,
    selectedIonCharge,
    handleAnswer,
    reset,
  } = useIonChargeQuiz()

  const handleBack = () => {
    reset()
    onBackToMenu()
  }

  if (!currentIonQuestion) return null

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
                onClick={() => handleAnswer(charge)}
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
  )
}

