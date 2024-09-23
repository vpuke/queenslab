import { describe, expect, test } from 'vitest'
import { removeConsecutiveFours } from '../src/utils/index'

describe('Remove consecutive fours functionality test', () => {
  test('Should remove characters occurring more than three times', () => {
    expect(removeConsecutiveFours('ttttffwwwwddd')).toBe('tttffwwwddd')
  })

  test('Should handle strings with no four consecutive characters', () => {
    expect(removeConsecutiveFours('abcdefg')).toBe('abcdefg')
  })

  test('Should be case-insensitive and remove fourth occurrence', () => {
    expect(removeConsecutiveFours('AAAAbbbbCCCC')).toBe('aaabbbccc')
  })

  test('Should handle an empty string', () => {
    expect(removeConsecutiveFours('')).toBe('')
  })
})
