import { describe, it, expect } from 'vitest'
import { levenshteinDistance, calculateStringSimilarity } from './stringSimilarity'

describe('levenshteinDistance', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshteinDistance('hello', 'hello')).toBe(0)
    expect(levenshteinDistance('', '')).toBe(0)
  })

  it('returns correct distance for single character differences', () => {
    expect(levenshteinDistance('hello', 'hallo')).toBe(1)
    expect(levenshteinDistance('cat', 'bat')).toBe(1)
  })

  it('returns correct distance for multiple character differences', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3)
    expect(levenshteinDistance('saturday', 'sunday')).toBe(3)
  })

  it('handles empty strings', () => {
    expect(levenshteinDistance('', '')).toBe(0)
    expect(levenshteinDistance('', 'hello')).toBe(5)
    expect(levenshteinDistance('hello', '')).toBe(5)
  })

  it('handles strings of different lengths', () => {
    expect(levenshteinDistance('abc', 'abcd')).toBe(1)
    expect(levenshteinDistance('abcd', 'abc')).toBe(1)
    expect(levenshteinDistance('a', 'abc')).toBe(2)
  })

  it('is case sensitive', () => {
    expect(levenshteinDistance('Hello', 'hello')).toBe(1)
    expect(levenshteinDistance('ABC', 'abc')).toBe(3)
  })
})

describe('calculateStringSimilarity', () => {
  it('returns 1.0 for exact matches', () => {
    expect(calculateStringSimilarity('hello', 'hello')).toBe(1.0)
    expect(calculateStringSimilarity('test', 'test')).toBe(1.0)
  })

  it('returns 1.0 for exact matches with different case', () => {
    expect(calculateStringSimilarity('Hello', 'hello')).toBe(1.0)
    expect(calculateStringSimilarity('TEST', 'test')).toBe(1.0)
    expect(calculateStringSimilarity('HeLLo', 'hElLo')).toBe(1.0)
  })

  it('returns 1.0 for exact matches with different whitespace', () => {
    expect(calculateStringSimilarity('hello world', 'hello  world')).toBe(1.0)
    expect(calculateStringSimilarity('  test  ', 'test')).toBe(1.0)
  })

  it('returns 0 for completely different strings', () => {
    const similarity = calculateStringSimilarity('hello', 'xyzabc')
    expect(similarity).toBeLessThan(0.1)
  })

  it('returns correct similarity for single-word strings', () => {
    const similarity1 = calculateStringSimilarity('hello', 'hallo')
    expect(similarity1).toBeGreaterThan(0.5)
    expect(similarity1).toBeLessThan(1.0)
    
    const similarity2 = calculateStringSimilarity('test', 'best')
    expect(similarity2).toBeGreaterThan(0.3)
    expect(similarity2).toBeLessThan(1.0)
  })

  it('returns correct similarity for multi-word strings', () => {
    const similarity1 = calculateStringSimilarity('hello world', 'hello world')
    expect(similarity1).toBe(1.0)
    
    const similarity2 = calculateStringSimilarity('hello world', 'hello there')
    expect(similarity2).toBeGreaterThan(0.3)
    expect(similarity2).toBeLessThan(1.0)
    
    const similarity3 = calculateStringSimilarity('high birth rate', 'High Birth Rate')
    expect(similarity3).toBe(1.0)
  })

  it('handles empty strings', () => {
    expect(calculateStringSimilarity('', '')).toBe(1.0)
    expect(calculateStringSimilarity('hello', '')).toBe(0)
    expect(calculateStringSimilarity('', 'hello')).toBe(0)
  })

  it('handles strings with extra whitespace', () => {
    expect(calculateStringSimilarity('hello world', '  hello   world  ')).toBe(1.0)
    expect(calculateStringSimilarity('test string', 'test  string')).toBe(1.0)
  })

  it('handles strings with special characters', () => {
    expect(calculateStringSimilarity('test@123', 'test@123')).toBe(1.0)
    expect(calculateStringSimilarity('hello-world', 'hello world')).toBeGreaterThan(0.2)
  })

  it('handles similarity threshold edge cases (0.85 threshold)', () => {
    // Test cases that should be above 0.85
    const highSimilarity = calculateStringSimilarity('High Infant Mortality Rate', 'high infant mortality rate')
    expect(highSimilarity).toBe(1.0)
    
    // Test cases that might be below 0.85
    const lowSimilarity = calculateStringSimilarity('High Infant Mortality Rate', 'Low Death Rate')
    expect(lowSimilarity).toBeLessThan(0.85)
    
    // Test similar but not exact
    const mediumSimilarity = calculateStringSimilarity('High Infant Mortality Rate', 'High Infant Mortality')
    expect(mediumSimilarity).toBeGreaterThan(0.5)
  })

  it('handles word order differences', () => {
    const similarity = calculateStringSimilarity('hello world', 'world hello')
    // Should have some similarity due to word overlap
    expect(similarity).toBeGreaterThan(0.3)
  })

  it('handles partial word matches', () => {
    const similarity = calculateStringSimilarity('mortality', 'mortal')
    expect(similarity).toBeGreaterThan(0.5)
  })
})

