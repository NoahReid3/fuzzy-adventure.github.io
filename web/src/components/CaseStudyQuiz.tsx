import { useCaseStudyQuiz } from '../hooks/useCaseStudyQuiz'
import { BackButton } from './BackButton'

interface CaseStudyQuizProps {
  onBackToMenu: () => void
}

export const CaseStudyQuiz = ({ onBackToMenu }: CaseStudyQuizProps) => {
  const {
    currentCaseStudy,
    caseStudyAnswers,
    caseStudyChecked,
    caseStudyResults,
    setCaseStudyAnswers,
    handleKeyDown,
    resetCaseStudy,
    reset,
  } = useCaseStudyQuiz()

  const handleBack = () => {
    reset()
    onBackToMenu()
  }

  if (!currentCaseStudy) return null

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full">
        <BackButton onClick={handleBack} />
        
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {currentCaseStudy.title}
          </h2>
        </div>

        <div className="space-y-4">
          {/* Point 1 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Point 1
            </label>
            <input
              type="text"
              value={caseStudyAnswers.point1}
              onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, point1: e.target.value })}
              onKeyDown={handleKeyDown}
              disabled={caseStudyChecked.point1}
              className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                caseStudyChecked.point1
                  ? caseStudyResults.point1 === 'correct'
                    ? 'bg-green-100 border-green-500 text-green-900'
                    : 'bg-red-100 border-red-500 text-red-900'
                  : 'border-gray-300 focus:border-blue-500 focus:outline-none'
              }`}
              placeholder="Enter Point 1"
            />
            {caseStudyChecked.point1 && caseStudyResults.point1 === 'incorrect' && (
              <p className="mt-1 text-sm text-red-700 font-medium">
                Correct answer: {currentCaseStudy.point1}
              </p>
            )}
          </div>

          {/* Point 2 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Point 2
            </label>
            <input
              type="text"
              value={caseStudyAnswers.point2}
              onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, point2: e.target.value })}
              onKeyDown={handleKeyDown}
              disabled={caseStudyChecked.point2}
              className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                caseStudyChecked.point2
                  ? caseStudyResults.point2 === 'correct'
                    ? 'bg-green-100 border-green-500 text-green-900'
                    : 'bg-red-100 border-red-500 text-red-900'
                  : 'border-gray-300 focus:border-blue-500 focus:outline-none'
              }`}
              placeholder="Enter Point 2"
            />
            {caseStudyChecked.point2 && caseStudyResults.point2 === 'incorrect' && (
              <p className="mt-1 text-sm text-red-700 font-medium">
                Correct answer: {currentCaseStudy.point2}
              </p>
            )}
          </div>

          {/* Point 3 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Point 3
            </label>
            <input
              type="text"
              value={caseStudyAnswers.point3}
              onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, point3: e.target.value })}
              onKeyDown={handleKeyDown}
              disabled={caseStudyChecked.point3}
              className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                caseStudyChecked.point3
                  ? caseStudyResults.point3 === 'correct'
                    ? 'bg-green-100 border-green-500 text-green-900'
                    : 'bg-red-100 border-red-500 text-red-900'
                  : 'border-gray-300 focus:border-blue-500 focus:outline-none'
              }`}
              placeholder="Enter Point 3"
            />
            {caseStudyChecked.point3 && caseStudyResults.point3 === 'incorrect' && (
              <p className="mt-1 text-sm text-red-700 font-medium">
                Correct answer: {currentCaseStudy.point3}
              </p>
            )}
          </div>

          {/* PSI */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              PSI (Place Specific Information)
            </label>
            <input
              type="text"
              value={caseStudyAnswers.psi}
              onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, psi: e.target.value })}
              onKeyDown={handleKeyDown}
              disabled={caseStudyChecked.psi}
              className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                caseStudyChecked.psi
                  ? caseStudyResults.psi === 'correct'
                    ? 'bg-green-100 border-green-500 text-green-900'
                    : 'bg-red-100 border-red-500 text-red-900'
                  : 'border-gray-300 focus:border-blue-500 focus:outline-none'
              }`}
              placeholder="Enter PSI"
            />
            {caseStudyChecked.psi && caseStudyResults.psi === 'incorrect' && (
              <p className="mt-1 text-sm text-red-700 font-medium">
                Correct answer: {currentCaseStudy.psi}
              </p>
            )}
          </div>
        </div>

        {caseStudyChecked.point1 && (
          <div className="mt-6">
            <button
              onClick={resetCaseStudy}
              className="w-full px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
            >
              Next Case Study
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

