import { IonChargeQuestion } from '../types'

export const ionChargeQuestionsBase: Omit<IonChargeQuestion, 'options'>[] = [
  // Group 1 metals (+1)
  { ion: 'Sodium (Na)', correctCharge: '+1' },
  { ion: 'Potassium (K)', correctCharge: '+1' },
  { ion: 'Lithium (Li)', correctCharge: '+1' },
  
  // Group 2 metals (+2)
  { ion: 'Magnesium (Mg)', correctCharge: '+2' },
  { ion: 'Calcium (Ca)', correctCharge: '+2' },
  { ion: 'Barium (Ba)', correctCharge: '+2' },
  
  // Group 3 metals (+3)
  { ion: 'Aluminum (Al)', correctCharge: '+3' },
  
  // Group 5 non-metals (-3)
  { ion: 'Nitride (N)', correctCharge: '-3' },
  
  // Group 6 non-metals (-2)
  { ion: 'Oxide (O)', correctCharge: '-2' },
  { ion: 'Sulfide (S)', correctCharge: '-2' },
  
  // Group 7 non-metals (-1)
  { ion: 'Chloride (Cl)', correctCharge: '-1' },
  { ion: 'Fluoride (F)', correctCharge: '-1' },
  { ion: 'Bromide (Br)', correctCharge: '-1' },
  
  // Specific metal ions
  { ion: 'Silver (Ag)', correctCharge: '+1' },
  { ion: 'Copper (Cu)', correctCharge: '+2' },
  { ion: 'Iron(II) (Fe)', correctCharge: '+2' },
  { ion: 'Iron(III) (Fe)', correctCharge: '+3' },
  { ion: 'Lead(II) (Pb)', correctCharge: '+2' },
  { ion: 'Zinc (Zn)', correctCharge: '+2' },
  
  // Polyatomic ions
  { ion: 'Hydrogen (H)', correctCharge: '+1' },
  { ion: 'Hydroxide (OH)', correctCharge: '-1' },
  { ion: 'Ammonium (NH₄)', correctCharge: '+1' },
  { ion: 'Carbonate (CO₃)', correctCharge: '-2' },
  { ion: 'Nitrate (NO₃)', correctCharge: '-1' },
  { ion: 'Sulfate (SO₄)', correctCharge: '-2' },
]

