import { useState, useEffect } from 'react'
import { CaseStudy, CaseStudyAnswers, CaseStudyChecked, CaseStudyResults } from '../types'
import { caseStudies } from '../data/caseStudies'
import { shuffleArray } from '../utils/arrayUtils'
import { calculateStringSimilarity } from '../utils/stringSimilarity'

export const useCaseStudyQuiz = () => {
  const [shuffledCaseStudies, setShuffledCaseStudies] = useState<CaseStudy[]>([])
  const [currentCaseStudy, setCurrentCaseStudy] = useState<CaseStudy | null>(null)
  const [caseStudyAnswers, setCaseStudyAnswers] = useState<CaseStudyAnswers>({
    point1: '',
    point2: '',
    point3: '',
    psi: ''
  })
  const [caseStudyChecked, setCaseStudyChecked] = useState<CaseStudyChecked>({
    point1: false,
    point2: false,
    point3: false,
    psi: false
  })
  const [caseStudyResults, setCaseStudyResults] = useState<CaseStudyResults>({
    point1: null,
    point2: null,
    point3: null,
    psi: null
  })

  useEffect(() => {
    const shuffled = shuffleArray(caseStudies)
    setShuffledCaseStudies(shuffled)
    setCurrentCaseStudy(shuffled[0] || null)
    setCaseStudyAnswers({ point1: '', point2: '', point3: '', psi: '' })
    setCaseStudyChecked({ point1: false, point2: false, point3: false, psi: false })
    setCaseStudyResults({ point1: null, point2: null, point3: null, psi: null })
  }, [])

  const checkAnswers = () => {
    if (!currentCaseStudy) return
    
    // Similarity threshold (0.85 = 85% similarity required)
    const SIMILARITY_THRESHOLD = 0.85

    const results: {
      point1: 'correct' | 'incorrect'
      point2: 'correct' | 'incorrect'
      point3: 'correct' | 'incorrect'
      psi: 'correct' | 'incorrect'
    } = {
      point1: calculateStringSimilarity(caseStudyAnswers.point1, currentCaseStudy.point1) >= SIMILARITY_THRESHOLD ? 'correct' : 'incorrect',
      point2: calculateStringSimilarity(caseStudyAnswers.point2, currentCaseStudy.point2) >= SIMILARITY_THRESHOLD ? 'correct' : 'incorrect',
      point3: calculateStringSimilarity(caseStudyAnswers.point3, currentCaseStudy.point3) >= SIMILARITY_THRESHOLD ? 'correct' : 'incorrect',
      psi: calculateStringSimilarity(caseStudyAnswers.psi, currentCaseStudy.psi) >= SIMILARITY_THRESHOLD ? 'correct' : 'incorrect',
    }
    
    setCaseStudyResults(results)
    setCaseStudyChecked({ point1: true, point2: true, point3: true, psi: true })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !caseStudyChecked.point1) {
      checkAnswers()
    }
  }

  const resetCaseStudy = () => {
    const currentIndex = shuffledCaseStudies.findIndex(cs => cs.title === currentCaseStudy?.title)
    if (currentIndex < shuffledCaseStudies.length - 1) {
      setCurrentCaseStudy(shuffledCaseStudies[currentIndex + 1])
    } else {
      // Reshuffle and start over
      const shuffled = shuffleArray(caseStudies)
      setShuffledCaseStudies(shuffled)
      setCurrentCaseStudy(shuffled[0])
    }
    setCaseStudyAnswers({ point1: '', point2: '', point3: '', psi: '' })
    setCaseStudyChecked({ point1: false, point2: false, point3: false, psi: false })
    setCaseStudyResults({ point1: null, point2: null, point3: null, psi: null })
  }

  const reset = () => {
    setCaseStudyAnswers({ point1: '', point2: '', point3: '', psi: '' })
    setCaseStudyChecked({ point1: false, point2: false, point3: false, psi: false })
    setCaseStudyResults({ point1: null, point2: null, point3: null, psi: null })
    setCurrentCaseStudy(null)
  }

  return {
    currentCaseStudy,
    caseStudyAnswers,
    caseStudyChecked,
    caseStudyResults,
    setCaseStudyAnswers,
    checkAnswers,
    handleKeyDown,
    resetCaseStudy,
    reset,
  }
}

