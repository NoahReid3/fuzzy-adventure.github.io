import { shuffleArray } from './arrayUtils'

// Helper function to generate multiple choice options for ion charges
export const generateChargeOptions = (correctCharge: string): string[] => {
  const allCharges = ['+1', '+2', '+3', '-1', '-2', '-3']
  const wrongOptions = allCharges.filter(c => c !== correctCharge)
  const shuffled = shuffleArray(wrongOptions)
  return shuffleArray([correctCharge, ...shuffled.slice(0, 3)])
}

