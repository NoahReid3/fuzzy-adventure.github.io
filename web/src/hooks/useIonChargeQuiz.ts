import { useState, useEffect } from 'react'
import { IonChargeQuestion } from '../types'
import { ionChargeQuestionsBase } from '../data/ionChargeQuestions'
import { shuffleArray } from '../utils/arrayUtils'
import { generateChargeOptions } from '../utils/ionChargeUtils'

export const useIonChargeQuiz = () => {
  const [shuffledIonQuestions, setShuffledIonQuestions] = useState<IonChargeQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedIonCharge, setSelectedIonCharge] = useState<string | null>(null)

  useEffect(() => {
    const questionsWithOptions = ionChargeQuestionsBase.map(q => ({
      ...q,
      options: generateChargeOptions(q.correctCharge)
    }))
    setShuffledIonQuestions(shuffleArray(questionsWithOptions))
    setCurrentQuestionIndex(0)
  }, [])

  const handleAnswer = (selectedCharge: string) => {
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

  const reset = () => {
    setFlashColor(null)
    setIsAnswered(false)
    setCurrentQuestionIndex(0)
    setSelectedIonCharge(null)
  }

  const currentIonQuestion = shuffledIonQuestions[currentQuestionIndex] || 
    (ionChargeQuestionsBase.length > 0 
      ? { ...ionChargeQuestionsBase[0], options: generateChargeOptions(ionChargeQuestionsBase[0].correctCharge) }
      : null)

  return {
    shuffledIonQuestions,
    currentIonQuestion,
    currentQuestionIndex,
    flashColor,
    isAnswered,
    selectedIonCharge,
    handleAnswer,
    reset,
  }
}

