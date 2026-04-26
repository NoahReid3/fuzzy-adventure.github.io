import { useState } from 'react'
import type { FactItem } from '../types'
import { useFactsGame } from '../hooks/useFactsGame'
import { BackButton } from './BackButton'

type FactsGameProps = {
  onBackToMenu: () => void
  questions: FactItem[]
  /** When set, "Random question" is replaced with "Don't know" and a review list is available. */
  showDontKnow?: boolean
}

export const FactsGame = ({ onBackToMenu, questions, showDontKnow = false }: FactsGameProps) => {
  const {
    current,
    total,
    currentIndex,
    answerVisible,
    unknownList,
    studyingUnknown,
    pickRandom,
    markDontKnow,
    goNext,
    revealAnswer,
    startStudyUnknown,
    exitStudyUnknown,
    reset,
  } = useFactsGame(questions)

  const [showUnknownPanel, setShowUnknownPanel] = useState(false)

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

        <p className="text-sm text-gray-500 mb-2 text-center">
          {showDontKnow && studyingUnknown
            ? `Card ${currentIndex + 1} of ${total} (don't-know list only)`
            : `Card ${currentIndex + 1} of ${total} (shuffled order)`}
        </p>
        {showDontKnow && studyingUnknown && (
          <p className="text-sm font-medium text-amber-800 text-center mb-2">
            You are testing yourself on your don&apos;t-know list.
          </p>
        )}

        {showDontKnow && !studyingUnknown && unknownList.length > 0 && (
          <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:justify-center">
            <button
              type="button"
              onClick={startStudyUnknown}
              className="px-4 py-2 text-base font-semibold rounded-lg bg-amber-600 text-white shadow hover:bg-amber-700 transition-colors"
            >
              Test yourself on the don&apos;t-know list
            </button>
          </div>
        )}

        {showDontKnow && studyingUnknown && (
          <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:justify-center">
            <button
              type="button"
              onClick={exitStudyUnknown}
              className="px-4 py-2 text-base font-medium rounded-lg border-2 border-gray-400 text-gray-800 bg-white hover:bg-gray-50 transition-colors"
            >
              Back to all questions
            </button>
          </div>
        )}

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
          {showDontKnow ? (
            <button
              type="button"
              onClick={markDontKnow}
              className="px-6 py-3 text-lg font-semibold rounded-xl bg-amber-500 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:bg-amber-600"
            >
              Don&apos;t know
            </button>
          ) : (
            <button
              type="button"
              onClick={pickRandom}
              className="px-6 py-3 text-lg font-semibold rounded-xl bg-blue-500 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:bg-blue-600"
            >
              Random question
            </button>
          )}
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

        {showDontKnow && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => setShowUnknownPanel((v) => !v)}
              className="w-full sm:w-auto px-4 py-2 text-base font-medium rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              aria-expanded={showUnknownPanel}
            >
              Questions I don&apos;t know ({unknownList.length})
            </button>
            {showUnknownPanel && (
              <>
                {unknownList.length > 0 && !studyingUnknown && (
                  <div className="mt-2 mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        startStudyUnknown()
                        setShowUnknownPanel(false)
                      }}
                      className="text-sm font-semibold text-amber-800 hover:text-amber-950 underline"
                    >
                      Test yourself on this list
                    </button>
                  </div>
                )}
                <ul
                  className="mt-4 max-h-64 overflow-y-auto space-y-4 text-left"
                  role="list"
                  aria-label="Saved questions to review"
                >
                  {unknownList.length === 0 ? (
                    <li className="text-sm text-gray-500">No questions saved yet.</li>
                  ) : (
                    unknownList.map((item, i) => (
                      <li
                        key={`${item.question.slice(0, 48)}-${i}`}
                        className="p-3 rounded-lg bg-amber-50 border border-amber-100"
                      >
                        <p className="font-medium text-gray-800">{item.question}</p>
                        <p className="mt-1 text-sm text-gray-600">
                          <span className="font-semibold text-amber-900">Answer: </span>
                          {item.answer}
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
