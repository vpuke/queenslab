import { describe, expect, test } from 'vitest'
import { luhnCheck } from '../src/utils/index'

describe('Luhn functionality test', () => {
  test('Should validate a valid Visa card number', () => {
    expect(luhnCheck('4035501428146300')).toBe(true)
  })

  test('Should not validate an invalid card number', () => {
    expect(luhnCheck('1234567890123456')).toBe(false)
  })

  test('Should return false for a string with letters', () => {
    expect(luhnCheck('4035A01428146300')).toBe(false)
  })

  test('Should return false for a short number', () => {
    expect(luhnCheck('123')).toBe(false)
  })
})
