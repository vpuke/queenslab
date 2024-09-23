import { describe, expect, test } from 'vitest'
import { maxSumOfTwoNumbersThatHaveOddSum } from '../src/utils/index'

describe('maxSumOfTwoNumbersThatHaveOddSum functionality test', () => {
  test('Array of numbers should return 61', () => {
    expect(maxSumOfTwoNumbersThatHaveOddSum([19, 2, 42, 18])).toBe(61)
  })
  test('Array of numbers should return 93', () => {
    expect(maxSumOfTwoNumbersThatHaveOddSum([61, 32, 51])).toBe(93)
  })
})
