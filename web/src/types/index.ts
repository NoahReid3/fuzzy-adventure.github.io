export interface Question {
  compound: string
  answer: 'soluble' | 'insoluble'
}

export interface IonChargeQuestion {
  ion: string
  correctCharge: string
  options: string[]
}

export type GameType = 'solubility' | 'game2' | 'game4' | 'game5' | 'game6' | null

export interface FactItem {
  question: string
  answer: string
}

