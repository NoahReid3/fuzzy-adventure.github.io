import { useState, useEffect } from 'react'
import { Question } from '../types'
import { questions } from '../data/solubilityQuestions'
import { shuffleArray } from '../utils/arrayUtils'

export const useSolubilityQuiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions))
    setCurrentQuestionIndex(0)
    setScore(0)
    setTotalAnswered(0)
  }, [])

  const handleAnswer = (answer: 'soluble' | 'insoluble') => {
    if (isAnswered || shuffledQuestions.length === 0) return

    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const isCorrect = answer === currentQuestion.answer

    setIsAnswered(true)
    setFlashColor(isCorrect ? 'green' : 'red')
    setTotalAnswered(prev => prev + 1)
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      setFlashColor(null)
      setIsAnswered(false)
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        // Quiz complete - reshuffle and restart
        setShuffledQuestions(shuffleArray(questions))
        setCurrentQuestionIndex(0)
        setScore(0)
        setTotalAnswered(0)
      }
    }, 1000)
  }

  const reset = () => {
    setFlashColor(null)
    setIsAnswered(false)
    setCurrentQuestionIndex(0)
    setScore(0)
    setTotalAnswered(0)
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex] || questions[0]

  return {
    shuffledQuestions,
    currentQuestion,
    currentQuestionIndex,
    flashColor,
    isAnswered,
    score,
    totalAnswered,
    handleAnswer,
    reset,
  }
}

