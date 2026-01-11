import { describe, it, expect } from 'vitest'
import { generateChargeOptions } from './ionChargeUtils'

describe('generateChargeOptions', () => {
  it('returns array with 4 options', () => {
    const options = generateChargeOptions('+1')
    expect(options).toHaveLength(4)
  })

  it('always includes correct charge', () => {
    const allCharges = ['+1', '+2', '+3', '-1', '-2', '-3']
    
    allCharges.forEach(charge => {
      const options = generateChargeOptions(charge)
      expect(options).toContain(charge)
    })
  })

  it('does not include duplicate correct charge', () => {
    const options = generateChargeOptions('+1')
    const count = options.filter(opt => opt === '+1').length
    expect(count).toBe(1)
  })

  it('returns different options on multiple calls (shuffled)', () => {
    const results: string[][] = []
    
    // Generate options multiple times
    for (let i = 0; i < 10; i++) {
      results.push(generateChargeOptions('+1'))
    }
    
    // Check that at least some results have different order
    const allSame = results.every(arr => 
      results[0].every((val, idx) => val === arr[idx])
    )
    
    // It's very unlikely all 10 calls would produce the same order
    expect(allSame).toBe(false)
  })

  it('handles all possible charge values', () => {
    const allCharges = ['+1', '+2', '+3', '-1', '-2', '-3']
    
    allCharges.forEach(charge => {
      const options = generateChargeOptions(charge)
      expect(options).toHaveLength(4)
      expect(options).toContain(charge)
      
      // All options should be valid charges
      options.forEach(opt => {
        expect(allCharges).toContain(opt)
      })
    })
  })

  it('options are shuffled correctly', () => {
    const options = generateChargeOptions('+1')
    
    // Should contain the correct charge
    expect(options).toContain('+1')
    
    // Should contain 3 other charges (not the correct one)
    const otherCharges = options.filter(opt => opt !== '+1')
    expect(otherCharges).toHaveLength(3)
    
    // All other charges should be different from +1
    otherCharges.forEach(charge => {
      expect(charge).not.toBe('+1')
    })
  })

  it('includes correct charge in different positions across calls', () => {
    const positions: number[] = []
    
    for (let i = 0; i < 20; i++) {
      const options = generateChargeOptions('+1')
      const index = options.indexOf('+1')
      positions.push(index)
    }
    
    // The correct charge should appear in different positions
    // (not always at the same index)
    const uniquePositions = new Set(positions)
    expect(uniquePositions.size).toBeGreaterThan(1)
  })
})

