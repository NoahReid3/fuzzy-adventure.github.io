import { useCallback, useEffect, useState } from 'react'
import type { FactItem } from '../types'
import { shuffleArray } from '../utils/arrayUtils'

type HookResult = {
  current: FactItem | null
  shuffled: FactItem[]
  currentIndex: number
  answerVisible: boolean
  total: number
  pickRandom: () => void
  goNext: () => void
  revealAnswer: () => void
  reset: () => void
}

export const useFactsGame = (questions: FactItem[]): HookResult => {
  const [shuffled, setShuffled] = useState<FactItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answerVisible, setAnswerVisible] = useState(false)

  useEffect(() => {
    if (questions.length === 0) {
      setShuffled([])
      return
    }
    const next = shuffleArray(questions)
    setShuffled(next)
    setCurrentIndex(0)
    setAnswerVisible(false)
  }, [questions])

  const current = shuffled.length > 0 ? shuffled[currentIndex] ?? shuffled[0] : null

  const pickRandom = useCallback(() => {
    if (shuffled.length === 0) return
    setCurrentIndex(Math.floor(Math.random() * shuffled.length))
    setAnswerVisible(false)
  }, [shuffled])

  const goNext = useCallback(() => {
    if (shuffled.length === 0) return
    setCurrentIndex((i) => (i + 1) % shuffled.length)
    setAnswerVisible(false)
  }, [shuffled])

  const revealAnswer = useCallback(() => {
    setAnswerVisible(true)
  }, [])

  const reset = useCallback(() => {
    setShuffled([])
    setCurrentIndex(0)
    setAnswerVisible(false)
  }, [])

  return {
    current: current ?? null,
    shuffled,
    currentIndex,
    answerVisible,
    total: shuffled.length,
    pickRandom,
    goNext,
    revealAnswer,
    reset,
  }
}
