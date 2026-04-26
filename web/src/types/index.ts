export interface Question {
  compound: string
  answer: 'soluble' | 'insoluble'
}

export interface IonChargeQuestion {
  ion: string
  correctCharge: string
  options: string[]
}

export interface CaseStudy {
  title: string
  point1: string
  point2: string
  point3: string
  psi: string
}

export type GameType = 'solubility' | 'game2' | 'game3' | 'game4' | 'game5' | 'game6' | null

export interface CaseStudyAnswers {
  point1: string
  point2: string
  point3: string
  psi: string
}

export interface CaseStudyChecked {
  point1: boolean
  point2: boolean
  point3: boolean
  psi: boolean
}

export interface CaseStudyResults {
  point1: 'correct' | 'incorrect' | null
  point2: 'correct' | 'incorrect' | null
  point3: 'correct' | 'incorrect' | null
  psi: 'correct' | 'incorrect' | null
}

export interface FactItem {
  question: string
  answer: string
}

