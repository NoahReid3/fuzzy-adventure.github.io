import type { FactItem } from '../types'
import { useFactsGame } from '../hooks/useFactsGame'
import { BackButton } from './BackButton'

type FactsGameProps = {
  onBackToMenu: () => void
  questions: FactItem[]
}

export const FactsGame = ({ onBackToMenu, questions }: FactsGameProps) => {
  const { current, total, currentIndex, answerVisible, pickRandom, goNext, revealAnswer, reset } =
    useFactsGame(questions)

  const handleBack = () => {
    reset()
    onBackToMenu()
  }

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full text-center">
          <BackButton onClick={handleBack} />
          <p className="text-lg text-gray-700">No facts are loaded yet. Add questions to the data file.</p>
        </div>
      </div>
    )
  }

  if (!current) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full text-left">
        <BackButton onClick={handleBack} />

        <p className="text-sm text-gray-500 mb-2 text-center">Card {currentIndex + 1} of {total} (shuffled order)</p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center leading-snug">
          {current.question}
        </h2>

        {answerVisible && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border-2 border-blue-200" role="region" aria-label="Model answer">
            <p className="text-sm font-semibold text-blue-800 mb-1">Answer</p>
            <p className="text-lg text-gray-900 leading-relaxed">{current.answer}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-center sm:flex-wrap">
          <button
            type="button"
            onClick={pickRandom}
            className="px-6 py-3 text-lg font-semibold rounded-xl bg-blue-500 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:bg-blue-600"
          >
            Random question
          </button>
          <button
            type="button"
            onClick={revealAnswer}
            className="px-6 py-3 text-lg font-semibold rounded-xl bg-blue-500 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:bg-blue-600"
          >
            Display answer
          </button>
          <button
            type="button"
            onClick={goNext}
            className="px-6 py-3 text-lg font-semibold rounded-xl bg-blue-500 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:bg-blue-600"
          >
            Next question
          </button>
        </div>
      </div>
    </div>
  )
}
