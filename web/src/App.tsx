import { useState, useEffect } from 'react'

interface Question {
  compound: string
  answer: 'soluble' | 'insoluble'
}

interface IonChargeQuestion {
  ion: string
  correctCharge: string
  options: string[]
}

interface CaseStudy {
  title: string
  point1: string
  point2: string
  point3: string
  psi: string
}

const ionChargeQuestionsBase: Omit<IonChargeQuestion, 'options'>[] = [
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

const caseStudies: CaseStudy[] = [
  {
    title: 'Overpopulation - Nigeria - Causes',
    point1: 'High Infant Mortality Rate',
    point2: 'Decreasing Death Rate',
    point3: 'High Birth Rate',
    psi: 'IMR is 100/1000 births'
  },
  {
    title: 'Overpopulation - Nigeria - Impacts',
    point1: 'Desertification',
    point2: 'Epidemics',
    point3: 'Unemployment',
    psi: '70% of Nigerians live in rural areas'
  },
  {
    title: 'Underpopulation - Australia - Causes',
    point1: 'Extreme Drought and Arid Conditions',
    point2: 'Arid Relief and Soil Fertility',
    point3: 'Low Birth Rate',
    psi: '70% of land is classes as arid or semi-arid'
  },
  {
    title: 'Underpopulation - Australia - Impacts',
    point1: 'Lack of Workforce',
    point2: 'Lack of Taxes',
    point3: 'Exporting',
    psi: 'Lack of 100,000 nurses and 2,700 doctors'
  },
  {
    title: 'High Natural Increase - Niger - Causes',
    point1: 'Death rates falling',
    point2: 'Birth Rate Increasing',
    point3: 'Desire for Children',
    psi: 'Number of children per woman is 7.1'
  },
  {
    title: 'Low Natural Increase - Italy - Causes',
    point1: 'Low Birth Rate',
    point2: 'Ageing Population',
    point3: 'Low Social Pressure for Marriage',
    psi: 'Less than 1/3 mothers have children before 28 years old'
  },
  {
    title: 'Low Natural Increase - Italy - Impacts',
    point1: 'Increase Tax',
    point2: 'Less Jobs',
    point3: 'Increased Pressure on Healthcare',
    psi: 'Projected population decrease of 20% by 2070'
  },
  {
    title: 'Population Management Policy - China',
    point1: 'Cash Child Benefit',
    point2: 'Parental Leave',
    point3: 'Childcare',
    psi: 'Cash Child Benefit is €900/Child/Year'
  },
  {
    title: 'International Migration - Mexico to USA - Causes',
    point1: 'Higher Quality of Life',
    point2: 'Established Communities',
    point3: 'Remittances',
    psi: '28% of the population is under 15 years of age'
  },
  {
    title: 'High Dependency Ratio (ED) - Japan - Impacts',
    point1: 'Increased cost of healthcare',
    point2: 'Raised Pension Age',
    point3: 'Cost for care',
    psi: 'Pension Age raised from 60 to 65'
  },
  {
    title: 'High Dependency Ratio (YD) - Mexico - Impacts',
    point1: 'Lack of employment',
    point2: 'Lack of education',
    point3: 'Lack of housing',
    psi: '47% of the population are reaching child-bearing age'
  },
  {
    title: 'Densely Populated Area - Kobe, Japan - Casues',
    point1: 'Terrain',
    point2: 'Convenience',
    point3: 'Land reclamation',
    psi: '2/3 of Japan is mountainous'
  },
  {
    title: 'Sparsely Populated Area - Mali - Causes',
    point1: 'Extreme Climate',
    point2: 'Limited Water Supply',
    point3: 'Terrain and Relief',
    psi: 'Less than 200mm annually in Timbuktu'
  },
  {
    title: 'Settlement Hierarchy - Greater London and Essex',
    point1: 'Central London',
    point2: 'Northeast London (Walthamstow)',
    point3: 'Rural Essex (Ongar)',
    psi: 'Harrods and Selfridges in Central London'
  },
  {
    title: 'Causes and consequences of urban sprawl - Atlanta, Georgia',
    point1: 'Urban Spawl',
    point2: 'Air Pollution',
    point3: 'Housing Pressures',
    psi: 'Atlanta Beltline uses 22 miles of abandoned railway tracks'
  },
  {
    title: 'Management of urban problems - London',
    point1: 'Congestion Charge',
    point2: 'ULEZ',
    point3: 'Public Transport',
    psi: 'More than 454 stations on the London Underground'
  },
  {
    title: 'Changing Land use - Stratford, London',
    point1: 'Urban Regeneration',
    point2: 'Gentrification',
    point3: 'Positive Multiplier Effect',
    psi: 'New Apartment in Stratford is £550,000/year'
  },
  {
    title: 'Improving Squatter Settlements - Rocinha, Rio de Janeiro',
    point1: 'Unsuitable Locations',
    point2: 'Risk of disease and ineffective sewage',
    point3: 'Lack of access to education',
    psi: 'Amigos de Escola allow volunteers to teach skills'
  },
  {
    title: 'Earthquake - Haiti 2010 - Impacts',
    point1: 'Farming Industry',
    point2: 'Buildings',
    point3: 'Social',
    psi: '230,000 Killed, 33% of buildings destroyed'
  },
  {
    title: 'Earthquake - Haiti 2010 - Responses',
    point1: 'Technological Aid',
    point2: 'International Aid',
    point3: 'International Funding',
    psi: 'UK Government increased funding from £6.2 million to £20 million'
  },
  {
    title: 'Earthquake - Japan - Reducing Impacts',
    point1: 'Prediction',
    point2: 'Seismic Gap Theory',
    point3: 'Technology',
    psi: 'Tokyo experiences a major seismic event every 70 years'
  },
  {
    title: 'Volcano - Soufriere Hills, Monserrat - Impacts',
    point1: 'Settlements',
    point2: 'Cholera Outbreak',
    point3: 'Evacuation',
    psi: 'Plymouth covered in Ash'
  },
  {
    title: 'Volcano - Soufriere Hills, Monserrat - Responses',
    point1: 'Northern redevelopment',
    point2: 'Foreign Aid',
    point3: 'Exclusion Zones',
    psi: 'UK donated $120 million in aid'
  },
  {
    title: 'Volcano - Soufriere Hills, Monserrat - Opportunities',
    point1: 'Tourism',
    point2: 'Agriculture',
    point3: 'Geothermal Energy',
    psi: '1995-1997 eruptions led to the creation of the Montserrat Volcano Observatory in 1996, providing scientific and monitoring jobs.'
  },
  {
    title: 'River - The Nile - Opportunities',
    point1: 'Tourism',
    point2: 'Agriculture and Irrigation',
    point3: 'HEP and Flood Control',
    psi: 'Over 270 cruises (feluccas) between Luxor and Aswan'
  },
  {
    title: 'River - The Elbe - Management to reduce the risk of flooding',
    point1: 'Protective Metal Barriers',
    point2: 'Sandbags',
    point3: 'Dykes',
    psi: 'Dykes were raised by 6.5m in Magdeburg'
  },
  {
    title: 'River - The Elbe - Causes',
    point1: 'Deforestation',
    point2: 'Urbanisation',
    point3: 'Heavy Rainfall',
    psi: 'Precipitation during the flooding reached 178% of the average monthly amount'
  },
  {
    title: 'River - The Elbe - Impacts',
    point1: 'Deaths and Injuries',
    point2: 'Loss of Infrastructure',
    point3: 'Agriculture',
    psi: 'Over 400 homes destroyed, and 1000 made homeless'
  },
  {
    title: 'Opportunities of the coast - Holderness',
    point1: 'Beaches (Leisure and Tourism)',
    point2: 'Fishing',
    point3: 'Agriculture',
    psi: 'Tourism contributes £5.6 billion to the economy in 2021'
  },
  {
    title: 'Management of costal erosion - Holderness',
    point1: 'Mappleton (Rock Groynes)',
    point2: 'Hornsea(Rock Armour)',
    point3: 'Withernsea (Sea Walls/Groynes/Rock Armour/Revetments)',
    psi: 'In 1991 almost £2 million was spent on two rock groynes at Mappleton'
  },
  {
    title: 'Impacts of a tropical storm - East Samar Island, Philippines (Typhoon Haiyan)',
    point1: 'Loss of land and life',
    point2: 'Transport',
    point3: 'Livelihoods',
    psi: '195mph winds damaged and closed Tacloban Airport'
  },
  {
    title: 'Area of Tropical Rainforest - Amazon Basin - Causes',
    point1: 'Mining',
    point2: 'Logging',
    point3: 'Cattle Ranching',
    psi: 'The Carajas Project, near Manus, is an iron ore project that extracts resources'
  },
  {
    title: 'Area of Tropical Rainforest - Amazon Basin - Impacts',
    point1: 'Wildlife Biodiversity',
    point2: 'Damage to the local humus cycle',
    point3: 'Disrupts the local hydrological cycle',
    psi: 'A Typical 10 squared km could contain 1500 species of flowering plant'
  },
  {
    title: 'Area of Hot Desert - Namib Desert, Southern Africa',
    point1: 'Cold Ocean Currents',
    point2: 'High Pressure Belt',
    point3: 'Rain Shadow Effect',
    psi: 'Cold Benguela Current cools air directly above'
  },
  {
    title: 'TNC and its global links - Apple - Operations',
    point1: 'Headquarters in HIC',
    point2: 'Outsources production across LICs',
    point3: 'Physical shops and businesses are built in HICs',
    psi: 'Apple manafactures most products in China : Foxconn'
  },
  {
    title: 'TNC and its global links - Apple - Why it locates in LEDCs',
    point1: 'Abundant workforce',
    point2: 'Less environmental laws',
    point3: 'Trade barriers',
    psi: 'China and Taiwan have far fewer environmental laws to HICs'
  },
  {
    title: 'TNC and its global links - Apple - Positive Impacts on the LEDC',
    point1: 'Employment',
    point2: 'Economic growth',
    point3: 'Improve local services and infrastructure',
    psi: 'Most areas around Apple\'s manafacturers have become rapidly industrialised'
  },
  {
    title: 'TNC and its global links - Apple - Negative Impacts on the LEDC',
    point1: 'Air Pollution',
    point2: 'Money is not kept in the host country',
    point3: 'Exploitation of workers',
    psi: 'Apple outsources to companies like Foxconn, who may exploit workers'
  }
]

const questions: Question[] = [
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

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type GameType = 'solubility' | 'game2' | 'game3' | 'game4' | 'game5' | 'game6' | null

const gameTitles: Record<Exclude<GameType, null>, string> = {
  solubility: 'Solubility Quiz',
  game2: 'Ion Charges Quiz',
  game3: 'Geography Case Studies Quiz',
  game4: 'Game 4',
  game5: 'Game 5',
  game6: 'Game 6',
}

// Helper function to generate multiple choice options for ion charges
const generateChargeOptions = (correctCharge: string): string[] => {
  const allCharges = ['+1', '+2', '+3', '-1', '-2', '-3']
  const wrongOptions = allCharges.filter(c => c !== correctCharge)
  const shuffled = shuffleArray(wrongOptions)
  return shuffleArray([correctCharge, ...shuffled.slice(0, 3)])
}

// Levenshtein distance calculation
const levenshteinDistance = (str1: string, str2: string): number => {
  const len1 = str1.length
  const len2 = str2.length
  const matrix: number[][] = []
  
  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j
  }
  
  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      )
    }
  }
  
  return matrix[len1][len2]
}

// String similarity function using word overlap and character similarity
const calculateStringSimilarity = (str1: string, str2: string): number => {
  const normalize = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ')
  const normalized1 = normalize(str1)
  const normalized2 = normalize(str2)
  
  // Exact match
  if (normalized1 === normalized2) return 1.0
  
  // Calculate word overlap similarity
  const words1 = normalized1.split(/\s+/).filter(w => w.length > 0)
  const words2 = normalized2.split(/\s+/).filter(w => w.length > 0)
  
  if (words1.length === 0 || words2.length === 0) return 0
  
  // Count matching words
  const set1 = new Set(words1)
  const set2 = new Set(words2)
  const intersection = new Set([...set1].filter(w => set2.has(w)))
  const union = new Set([...set1, ...set2])
  
  // Jaccard similarity (intersection over union)
  const wordSimilarity = intersection.size / union.size
  
  // Calculate character-based similarity using proper Levenshtein distance
  const maxLength = Math.max(normalized1.length, normalized2.length)
  if (maxLength === 0) return 1.0
  
  const editDistance = levenshteinDistance(normalized1, normalized2)
  const charSimilarity = 1 - (editDistance / maxLength)
  
  // For single-word answers, rely more on character similarity
  // For multi-word answers, combine both
  if (words1.length === 1 && words2.length === 1) {
    // Single word: primarily character similarity
    return charSimilarity
  } else {
    // Multiple words: weighted combination
    return wordSimilarity * 0.7 + charSimilarity * 0.3
  }
}

function App() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedGame, setSelectedGame] = useState<GameType>(null)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [shuffledIonQuestions, setShuffledIonQuestions] = useState<IonChargeQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedIonCharge, setSelectedIonCharge] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  
  // Game3 state
  const [shuffledCaseStudies, setShuffledCaseStudies] = useState<CaseStudy[]>([])
  const [currentCaseStudy, setCurrentCaseStudy] = useState<CaseStudy | null>(null)
  const [caseStudyAnswers, setCaseStudyAnswers] = useState({
    point1: '',
    point2: '',
    point3: '',
    psi: ''
  })
  const [caseStudyChecked, setCaseStudyChecked] = useState({
    point1: false,
    point2: false,
    point3: false,
    psi: false
  })
  const [caseStudyResults, setCaseStudyResults] = useState<{
    point1: 'correct' | 'incorrect' | null
    point2: 'correct' | 'incorrect' | null
    point3: 'correct' | 'incorrect' | null
    psi: 'correct' | 'incorrect' | null
  }>({
    point1: null,
    point2: null,
    point3: null,
    psi: null
  })

  useEffect(() => {
    if (isCorrect && message) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
        setTimeout(() => {
          setShowMenu(true)
        }, 1000)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isCorrect, message])

  useEffect(() => {
    if (selectedGame === 'solubility') {
      setShuffledQuestions(shuffleArray(questions))
      setCurrentQuestionIndex(0)
      setScore(0)
      setTotalAnswered(0)
    } else if (selectedGame === 'game2') {
      const questionsWithOptions = ionChargeQuestionsBase.map(q => ({
        ...q,
        options: generateChargeOptions(q.correctCharge)
      }))
      setShuffledIonQuestions(shuffleArray(questionsWithOptions))
      setCurrentQuestionIndex(0)
    } else if (selectedGame === 'game3') {
      const shuffled = shuffleArray(caseStudies)
      setShuffledCaseStudies(shuffled)
      setCurrentCaseStudy(shuffled[0] || null)
      setCaseStudyAnswers({ point1: '', point2: '', point3: '', psi: '' })
      setCaseStudyChecked({ point1: false, point2: false, point3: false, psi: false })
      setCaseStudyResults({ point1: null, point2: null, point3: null, psi: null })
    }
  }, [selectedGame])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (password === 'HelloWorld') {
        setMessage('Password correct')
        setIsCorrect(true)
      } else {
        setMessage('Incorrect, try again')
        setIsCorrect(false)
        setPassword('') // Clear the password field
      }
    }
  }

  const handleGameSelect = (game: GameType) => {
    if (game === 'solubility' || game === 'game2' || game === 'game3') {
      setSelectedGame(game)
    }
    // Other games will be implemented later
  }

  const handleBackToMenu = () => {
    setSelectedGame(null)
    setFlashColor(null)
    setIsAnswered(false)
    setCurrentQuestionIndex(0)
    setSelectedIonCharge(null)
    setScore(0)
    setTotalAnswered(0)
    // Reset game3 state
    setCaseStudyAnswers({ point1: '', point2: '', point3: '', psi: '' })
    setCaseStudyChecked({ point1: false, point2: false, point3: false, psi: false })
    setCaseStudyResults({ point1: null, point2: null, point3: null, psi: null })
    setCurrentCaseStudy(null)
  }

  const checkCaseStudyAnswers = () => {
    if (!currentCaseStudy) return
    
    // Similarity threshold (0.85 = 85% similarity required)
    // Lowered to 0.85 to allow single character typos while still catching wrong answers
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

  const handleCaseStudyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !caseStudyChecked.point1) {
      checkCaseStudyAnswers()
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

  const handleIonChargeAnswer = (selectedCharge: string) => {
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

  const text = 'Hello World'
  const currentQuestion = shuffledQuestions[currentQuestionIndex] || questions[0]
  const currentIonQuestion = shuffledIonQuestions[currentQuestionIndex] || (ionChargeQuestionsBase.length > 0 ? { ...ionChargeQuestionsBase[0], options: generateChargeOptions(ionChargeQuestionsBase[0].correctCharge) } : null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 relative px-4">
      {/* Centered content with password box */}
      <div className="text-center w-full relative z-20">
        {/* Text that drifts to top left */}
        <h1 
          className="text-6xl font-bold text-white mb-4 drop-shadow-lg text-center whitespace-nowrap relative transition-opacity duration-700"
          style={{
            position: isCorrect ? 'fixed' : 'relative',
            top: isCorrect ? '2rem' : 'auto',
            left: isCorrect ? '2rem' : 'auto',
            transition: 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: isCorrect ? 'translate(0, 0) scale(0.9)' : 'translate(0, 0) scale(1)',
            opacity: isCorrect ? 0 : 1,
          }}
        >
          {text}
        </h1>
        <input
          type="password"
          placeholder={message && !isCorrect ? message : "Enter password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (message && !isCorrect) {
              setMessage('') // Clear error message when user starts typing
            }
          }}
          onKeyDown={handleKeyDown}
          className="text-xl px-4 py-2 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
          style={{
            opacity: isCorrect ? 0 : 1,
            transition: 'opacity 1s ease-in-out',
            pointerEvents: isCorrect ? 'none' : 'auto'
          }}
        />
        {message && isCorrect && (
          <p 
            className="text-xl text-white mt-4 drop-shadow-lg"
            style={{
              opacity: showMessage ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            {message}
          </p>
        )}

        {/* Game Menu */}
        {showMenu && !selectedGame && (
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                Select a Game
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(['solubility', 'game2', 'game3', 'game4', 'game5', 'game6'] as Exclude<GameType, null>[]).map((game) => (
                  <button
                    key={game}
                    onClick={() => handleGameSelect(game)}
                    disabled={game !== 'solubility' && game !== 'game2' && game !== 'game3'}
                    className={`px-6 py-4 text-xl font-semibold rounded-xl shadow-lg transition-all transform ${
                      game === 'solubility' || game === 'game2' || game === 'game3'
                        ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {gameTitles[game as Exclude<GameType, null>]}
                    {game !== 'solubility' && game !== 'game2' && game !== 'game3' && (
                      <span className="block text-sm mt-1 font-normal">Coming Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Solubility Quiz Game */}
        {selectedGame === 'solubility' && (
          <div 
            className="flex flex-col items-center justify-center mt-8 transition-all duration-300"
            style={{
              backgroundColor: flashColor === 'green' ? 'rgba(34, 197, 94, 0.3)' : flashColor === 'red' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-2xl w-full">
              <button
                onClick={handleBackToMenu}
                className="mb-4 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                ← Back to Menu
              </button>
              {totalAnswered > 0 && (
                <div className="mb-4 text-center">
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                    Score: {score} / {totalAnswered} ({totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0}%)
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Question {currentQuestionIndex + 1} of {shuffledQuestions.length || questions.length}
                </h2>
                <p className="text-3xl font-semibold text-gray-900">
                  Is {currentQuestion.compound} soluble or insoluble in water?
                </p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleAnswer('soluble')}
                  disabled={isAnswered}
                  className={`px-8 py-4 text-xl font-bold rounded-xl shadow-lg transition-all transform ${
                    isAnswered 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105 active:scale-95'
                  } ${
                    flashColor === 'green' && currentQuestion.answer === 'soluble'
                      ? 'bg-green-500 text-white'
                      : flashColor === 'red' && currentQuestion.answer === 'soluble'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Soluble
                </button>
                
                <button
                  onClick={() => handleAnswer('insoluble')}
                  disabled={isAnswered}
                  className={`px-8 py-4 text-xl font-bold rounded-xl shadow-lg transition-all transform ${
                    isAnswered 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105 active:scale-95'
                  } ${
                    flashColor === 'green' && currentQuestion.answer === 'insoluble'
                      ? 'bg-green-500 text-white'
                      : flashColor === 'red' && currentQuestion.answer === 'insoluble'
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  Insoluble
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ion Charges Quiz Game */}
        {selectedGame === 'game2' && currentIonQuestion && (
          <div 
            className="flex flex-col items-center justify-center mt-8 transition-all duration-300"
            style={{
              backgroundColor: flashColor === 'green' ? 'rgba(34, 197, 94, 0.3)' : flashColor === 'red' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-2xl w-full">
              <button
                onClick={handleBackToMenu}
                className="mb-4 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                ← Back to Menu
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Question {currentQuestionIndex + 1} of {shuffledIonQuestions.length || ionChargeQuestionsBase.length}
                </h2>
                <p className="text-3xl font-semibold text-gray-900">
                  What is the charge of {currentIonQuestion.ion}?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {currentIonQuestion.options.map((charge, index) => {
                  const isCorrect = charge === currentIonQuestion.correctCharge
                  const isSelected = charge === selectedIonCharge
                  const showGreen = isAnswered && isCorrect
                  const showRed = isAnswered && isSelected && !isCorrect
                  const showLightRed = isAnswered && flashColor === 'red' && !isCorrect && !isSelected
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleIonChargeAnswer(charge)}
                      disabled={isAnswered}
                      className={`px-6 py-4 text-2xl font-bold rounded-xl shadow-lg transition-all transform ${
                        isAnswered 
                          ? 'cursor-not-allowed' 
                          : 'hover:scale-105 active:scale-95'
                      } ${
                        showGreen
                          ? 'bg-green-500 text-white'
                          : showRed
                          ? 'bg-red-500 text-white'
                          : showLightRed
                          ? 'bg-red-200 text-white opacity-70'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {charge}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Geography Case Studies Quiz Game */}
        {selectedGame === 'game3' && currentCaseStudy && (
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full">
              <button
                onClick={handleBackToMenu}
                className="mb-4 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                ← Back to Menu
              </button>
              
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                  {currentCaseStudy.title}
                </h2>
              </div>

              <div className="space-y-4">
                {/* Point 1 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Point 1
                  </label>
                  <input
                    type="text"
                    value={caseStudyAnswers.point1}
                    onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, point1: e.target.value })}
                    onKeyDown={handleCaseStudyKeyDown}
                    disabled={caseStudyChecked.point1}
                    className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                      caseStudyChecked.point1
                        ? caseStudyResults.point1 === 'correct'
                          ? 'bg-green-100 border-green-500 text-green-900'
                          : 'bg-red-100 border-red-500 text-red-900'
                        : 'border-gray-300 focus:border-blue-500 focus:outline-none'
                    }`}
                    placeholder="Enter Point 1"
                  />
                  {caseStudyChecked.point1 && caseStudyResults.point1 === 'incorrect' && (
                    <p className="mt-1 text-sm text-red-700 font-medium">
                      Correct answer: {currentCaseStudy.point1}
                    </p>
                  )}
                </div>

                {/* Point 2 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Point 2
                  </label>
                  <input
                    type="text"
                    value={caseStudyAnswers.point2}
                    onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, point2: e.target.value })}
                    onKeyDown={handleCaseStudyKeyDown}
                    disabled={caseStudyChecked.point2}
                    className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                      caseStudyChecked.point2
                        ? caseStudyResults.point2 === 'correct'
                          ? 'bg-green-100 border-green-500 text-green-900'
                          : 'bg-red-100 border-red-500 text-red-900'
                        : 'border-gray-300 focus:border-blue-500 focus:outline-none'
                    }`}
                    placeholder="Enter Point 2"
                  />
                  {caseStudyChecked.point2 && caseStudyResults.point2 === 'incorrect' && (
                    <p className="mt-1 text-sm text-red-700 font-medium">
                      Correct answer: {currentCaseStudy.point2}
                    </p>
                  )}
                </div>

                {/* Point 3 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Point 3
                  </label>
                  <input
                    type="text"
                    value={caseStudyAnswers.point3}
                    onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, point3: e.target.value })}
                    onKeyDown={handleCaseStudyKeyDown}
                    disabled={caseStudyChecked.point3}
                    className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                      caseStudyChecked.point3
                        ? caseStudyResults.point3 === 'correct'
                          ? 'bg-green-100 border-green-500 text-green-900'
                          : 'bg-red-100 border-red-500 text-red-900'
                        : 'border-gray-300 focus:border-blue-500 focus:outline-none'
                    }`}
                    placeholder="Enter Point 3"
                  />
                  {caseStudyChecked.point3 && caseStudyResults.point3 === 'incorrect' && (
                    <p className="mt-1 text-sm text-red-700 font-medium">
                      Correct answer: {currentCaseStudy.point3}
                    </p>
                  )}
                </div>

                {/* PSI */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    PSI (Place Specific Information)
                  </label>
                  <input
                    type="text"
                    value={caseStudyAnswers.psi}
                    onChange={(e) => setCaseStudyAnswers({ ...caseStudyAnswers, psi: e.target.value })}
                    onKeyDown={handleCaseStudyKeyDown}
                    disabled={caseStudyChecked.psi}
                    className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all ${
                      caseStudyChecked.psi
                        ? caseStudyResults.psi === 'correct'
                          ? 'bg-green-100 border-green-500 text-green-900'
                          : 'bg-red-100 border-red-500 text-red-900'
                        : 'border-gray-300 focus:border-blue-500 focus:outline-none'
                    }`}
                    placeholder="Enter PSI"
                  />
                  {caseStudyChecked.psi && caseStudyResults.psi === 'incorrect' && (
                    <p className="mt-1 text-sm text-red-700 font-medium">
                      Correct answer: {currentCaseStudy.psi}
                    </p>
                  )}
                </div>
              </div>

              {caseStudyChecked.point1 && (
                <div className="mt-6">
                  <button
                    onClick={resetCaseStudy}
                    className="w-full px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
                  >
                    Next Case Study
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
