import { describe, expect, test } from 'vitest'
import { expirationDateCheck } from '../src/utils/index'

describe('Expiration date test', () => {
  test('Should return false, expired card', () => {
    expect(expirationDateCheck('03', '2023')).toBe(false)
  })

  test('Should return true for a valid future date', () => {
    expect(expirationDateCheck('12', '2025')).toBe(true)
  })

  test('Should return false for an invalid month', () => {
    expect(expirationDateCheck('13', '2024')).toBe(false)
  })
})
