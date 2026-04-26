import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FactItem } from '../types'
import { shuffleArray } from '../utils/arrayUtils'

const sameFact = (a: FactItem, b: FactItem) =>
  a.question === b.question && a.answer === b.answer

type HookResult = {
  current: FactItem | null
  currentIndex: number
  answerVisible: boolean
  total: number
  unknownList: FactItem[]
  studyingUnknown: boolean
  pickRandom: () => void
  markDontKnow: () => void
  goNext: () => void
  revealAnswer: () => void
  startStudyUnknown: () => void
  exitStudyUnknown: () => void
  reset: () => void
}

export const useFactsGame = (questions: FactItem[]): HookResult => {
  const [mainShuffled, setMainShuffled] = useState<FactItem[]>([])
  const [studyDeck, setStudyDeck] = useState<FactItem[]>([])
  const [studyingUnknown, setStudyingUnknown] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answerVisible, setAnswerVisible] = useState(false)
  const [unknownList, setUnknownList] = useState<FactItem[]>([])

  const activeDeck = useMemo(
    () => (studyingUnknown ? studyDeck : mainShuffled),
    [studyingUnknown, studyDeck, mainShuffled]
  )

  useEffect(() => {
    if (questions.length === 0) {
      setMainShuffled([])
      return
    }
    const next = shuffleArray(questions)
    setMainShuffled(next)
    setStudyDeck([])
    setStudyingUnknown(false)
    setCurrentIndex(0)
    setAnswerVisible(false)
    setUnknownList([])
  }, [questions])

  const current =
    activeDeck.length > 0 ? activeDeck[currentIndex] ?? activeDeck[0] : null

  const pickRandom = useCallback(() => {
    if (activeDeck.length === 0) return
    setCurrentIndex(Math.floor(Math.random() * activeDeck.length))
    setAnswerVisible(false)
  }, [activeDeck])

  const goNext = useCallback(() => {
    if (activeDeck.length === 0) return
    setCurrentIndex((i) => (i + 1) % activeDeck.length)
    setAnswerVisible(false)
  }, [activeDeck])

  const markDontKnow = useCallback(() => {
    if (activeDeck.length === 0) return
    const card = activeDeck[currentIndex] ?? activeDeck[0]
    if (!card) return
    setUnknownList((prev) => (prev.some((x) => sameFact(x, card)) ? prev : [...prev, card]))
    setAnswerVisible(false)
    setCurrentIndex((i) => (i + 1) % activeDeck.length)
  }, [activeDeck, currentIndex])

  const revealAnswer = useCallback(() => {
    setAnswerVisible(true)
  }, [])

  const startStudyUnknown = useCallback(() => {
    if (unknownList.length === 0) return
    setStudyDeck(shuffleArray([...unknownList]))
    setStudyingUnknown(true)
    setCurrentIndex(0)
    setAnswerVisible(false)
  }, [unknownList])

  const exitStudyUnknown = useCallback(() => {
    setStudyingUnknown(false)
    setCurrentIndex(0)
    setAnswerVisible(false)
  }, [])

  const reset = useCallback(() => {
    setMainShuffled([])
    setStudyDeck([])
    setStudyingUnknown(false)
    setCurrentIndex(0)
    setAnswerVisible(false)
    setUnknownList([])
  }, [])

  return {
    current: current ?? null,
    currentIndex,
    answerVisible,
    total: activeDeck.length,
    unknownList,
    studyingUnknown,
    pickRandom,
    markDontKnow,
    goNext,
    revealAnswer,
    startStudyUnknown,
    exitStudyUnknown,
    reset,
  }
}
