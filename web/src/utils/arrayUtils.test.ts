import { describe, it, expect } from 'vitest'
import { shuffleArray } from './arrayUtils'

describe('shuffleArray', () => {
  it('shuffles array correctly and preserves all elements', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(original)
    
    expect(shuffled).toHaveLength(5)
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('returns new array and does not mutate original', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(original)
    
    expect(shuffled).not.toBe(original)
    expect(original).toEqual([1, 2, 3, 4, 5])
  })

  it('handles empty arrays', () => {
    const original: number[] = []
    const shuffled = shuffleArray(original)
    
    expect(shuffled).toEqual([])
    expect(shuffled).not.toBe(original)
  })

  it('handles single element arrays', () => {
    const original = [42]
    const shuffled = shuffleArray(original)
    
    expect(shuffled).toEqual([42])
    expect(shuffled).not.toBe(original)
  })

  it('handles arrays with duplicate values', () => {
    const original = [1, 2, 2, 3, 3, 3]
    const shuffled = shuffleArray(original)
    
    expect(shuffled).toHaveLength(6)
    expect(shuffled.sort()).toEqual([1, 2, 2, 3, 3, 3])
  })

  it('produces different order on multiple calls (statistical test)', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const results: number[][] = []
    
    // Run shuffle multiple times
    for (let i = 0; i < 10; i++) {
      results.push(shuffleArray(original))
    }
    
    // Check that at least one result is different from the original
    const allSameAsOriginal = results.every(arr => 
      arr.every((val, idx) => val === original[idx])
    )
    
    // It's very unlikely all 10 shuffles would produce the same order
    expect(allSameAsOriginal).toBe(false)
    
    // Check that results are different from each other (at least some)
    const allSame = results.every(arr => 
      results[0].every((val, idx) => val === arr[idx])
    )
    expect(allSame).toBe(false)
  })

  it('works with different types', () => {
    const strings = ['a', 'b', 'c']
    const shuffled = shuffleArray(strings)
    
    expect(shuffled).toHaveLength(3)
    expect(shuffled.sort()).toEqual(['a', 'b', 'c'])
  })
})

