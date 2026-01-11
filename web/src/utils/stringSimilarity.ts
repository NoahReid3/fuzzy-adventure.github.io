// Levenshtein distance calculation
export const levenshteinDistance = (str1: string, str2: string): number => {
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
export const calculateStringSimilarity = (str1: string, str2: string): number => {
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

