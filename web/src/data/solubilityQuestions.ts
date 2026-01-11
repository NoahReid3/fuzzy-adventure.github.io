import { Question } from '../types'

export const questions: Question[] = [
  // Sodium, potassium, ammonium compounds - soluble
  { compound: 'Sodium chloride (NaCl)', answer: 'soluble' },
  { compound: 'Potassium nitrate (KNO₃)', answer: 'soluble' },
  { compound: 'Ammonium sulfate ((NH₄)₂SO₄)', answer: 'soluble' },
  
  // Nitrates - all soluble
  { compound: 'Silver nitrate (AgNO₃)', answer: 'soluble' },
  { compound: 'Lead(II) nitrate (Pb(NO₃)₂)', answer: 'soluble' },
  { compound: 'Calcium nitrate (Ca(NO₃)₂)', answer: 'soluble' },
  
  // Chlorides - soluble except silver and lead(II)
  { compound: 'Magnesium chloride (MgCl₂)', answer: 'soluble' },
  { compound: 'Calcium chloride (CaCl₂)', answer: 'soluble' },
  { compound: 'Silver chloride (AgCl)', answer: 'insoluble' },
  { compound: 'Lead(II) chloride (PbCl₂)', answer: 'insoluble' },
  
  // Sulfates - soluble except barium, calcium, lead(II)
  { compound: 'Sodium sulfate (Na₂SO₄)', answer: 'soluble' },
  { compound: 'Magnesium sulfate (MgSO₄)', answer: 'soluble' },
  { compound: 'Barium sulfate (BaSO₄)', answer: 'insoluble' },
  { compound: 'Calcium sulfate (CaSO₄)', answer: 'insoluble' },
  { compound: 'Lead(II) sulfate (PbSO₄)', answer: 'insoluble' },
  
  // Carbonates - insoluble except sodium, potassium, ammonium
  { compound: 'Calcium carbonate (CaCO₃)', answer: 'insoluble' },
  { compound: 'Magnesium carbonate (MgCO₃)', answer: 'insoluble' },
  { compound: 'Barium carbonate (BaCO₃)', answer: 'insoluble' },
  { compound: 'Sodium carbonate (Na₂CO₃)', answer: 'soluble' },
  { compound: 'Potassium carbonate (K₂CO₃)', answer: 'soluble' },
  { compound: 'Ammonium carbonate ((NH₄)₂CO₃)', answer: 'soluble' },
  
  // Hydroxides - insoluble except sodium, potassium, calcium
  { compound: 'Magnesium hydroxide (Mg(OH)₂)', answer: 'insoluble' },
  { compound: 'Aluminum hydroxide (Al(OH)₃)', answer: 'insoluble' },
  { compound: 'Iron(II) hydroxide (Fe(OH)₂)', answer: 'insoluble' },
  { compound: 'Sodium hydroxide (NaOH)', answer: 'soluble' },
  { compound: 'Potassium hydroxide (KOH)', answer: 'soluble' },
  { compound: 'Calcium hydroxide (Ca(OH)₂)', answer: 'soluble' },
  
  // Additional sodium, potassium, ammonium compounds - soluble
  { compound: 'Sodium bromide (NaBr)', answer: 'soluble' },
  { compound: 'Potassium chloride (KCl)', answer: 'soluble' },
  { compound: 'Ammonium chloride (NH₄Cl)', answer: 'soluble' },
  { compound: 'Sodium iodide (NaI)', answer: 'soluble' },
  { compound: 'Potassium bromide (KBr)', answer: 'soluble' },
  { compound: 'Ammonium nitrate (NH₄NO₃)', answer: 'soluble' },
  
  // Additional nitrates - all soluble
  { compound: 'Barium nitrate (Ba(NO₃)₂)', answer: 'soluble' },
  { compound: 'Magnesium nitrate (Mg(NO₃)₂)', answer: 'soluble' },
  { compound: 'Zinc nitrate (Zn(NO₃)₂)', answer: 'soluble' },
  { compound: 'Copper(II) nitrate (Cu(NO₃)₂)', answer: 'soluble' },
  
  // Additional chlorides - soluble
  { compound: 'Aluminum chloride (AlCl₃)', answer: 'soluble' },
  { compound: 'Zinc chloride (ZnCl₂)', answer: 'soluble' },
  { compound: 'Barium chloride (BaCl₂)', answer: 'soluble' },
  
  // Additional sulfates - soluble
  { compound: 'Potassium sulfate (K₂SO₄)', answer: 'soluble' },
  { compound: 'Aluminum sulfate (Al₂(SO₄)₃)', answer: 'soluble' },
  { compound: 'Zinc sulfate (ZnSO₄)', answer: 'soluble' },
  { compound: 'Iron(II) sulfate (FeSO₄)', answer: 'soluble' },
  
  // Additional carbonates - insoluble
  { compound: 'Zinc carbonate (ZnCO₃)', answer: 'insoluble' },
  { compound: 'Iron(II) carbonate (FeCO₃)', answer: 'insoluble' },
  { compound: 'Copper(II) carbonate (CuCO₃)', answer: 'insoluble' },
  { compound: 'Nickel carbonate (NiCO₃)', answer: 'insoluble' },
  
  // Additional hydroxides - insoluble
  { compound: 'Zinc hydroxide (Zn(OH)₂)', answer: 'insoluble' },
  { compound: 'Copper(II) hydroxide (Cu(OH)₂)', answer: 'insoluble' },
  { compound: 'Lead(II) hydroxide (Pb(OH)₂)', answer: 'insoluble' },
  { compound: 'Barium hydroxide (Ba(OH)₂)', answer: 'soluble' }, // Barium hydroxide is soluble
]

