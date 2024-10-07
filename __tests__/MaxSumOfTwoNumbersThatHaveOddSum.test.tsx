import { describe, expect, test } from 'vitest'
import { maxSumOfTwoNumbersWithOddSum } from '../src/utils/index'

describe('maxSumOfTwoNumbersThatHaveOddSum functionality test', () => {
  test('Array of numbers should return 61', () => {
    expect(maxSumOfTwoNumbersWithOddSum([19, 2, 42, 18])).toBe(61)
  })
  test('Array of numbers should return 93', () => {
    expect(maxSumOfTwoNumbersWithOddSum([61, 32, 51])).toBe(93)
  })
})
