import { z } from 'zod'

export const formSchema = z
  .object({
    cardNumber: z
      .string()
      .min(19, { message: 'Card number must be 16 digits' })
      .max(19, { message: 'Card number must be 16 digits' })
      .regex(/^\d{4} \d{4} \d{4} \d{4}$/, {
        message: 'Card number must be 16 digits',
      })
      .refine((value) => luhnCheck(value), { message: 'Invalid card number' }),
    cardName: z.string().min(1, { message: 'Card name is required' }),
    cardMonth: z
      .string()
      .regex(/^(0[1-9]|1[0-2])$/, { message: 'Invalid month' }),
    cardYear: z
      .string()
      .regex(/^(202[3-4]|202[0-9])$/, { message: 'Invalid year' }),
    cardCVV: z
      .string()
      .min(3, { message: 'CVV must be 3 or 4 digits' })
      .max(4, { message: 'CVV must be 3 or 4 digits' })
      .regex(/^\d+$/, { message: 'CVV must contain only numbers' }),
  })
  .refine((data) => expirationDateCheck(data.cardMonth, data.cardYear), {
    message: 'Expired card',
    path: ['cardMonth', 'cardYear'],
  })

export function luhnCheck(cardNumber: string): boolean {
  const formatCardNumber = cardNumber.split(' ').join('')
  let sum = 0
  let shouldDouble = false

  for (let i = formatCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(formatCardNumber[i])

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

export function expirationDateCheck(month: string, year: string): boolean {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const inputYear = parseInt(year)
  const inputMonth = parseInt(month)

  if (inputYear < currentYear) return false
  if (inputMonth < 1 || inputMonth > 12) return false
  if (inputYear === currentYear && inputMonth < currentMonth) return false

  return true
}

export function formatCardNumber(number: string): string {
  return number.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const monthOptions = [...Array(12).keys()].map((month) => ({
  value: (month + 1).toString().padStart(2, '0'),
  label: (month + 1).toString().padStart(2, '0'),
}))

export const yearOptions = [2024, 2025, 2026, 2027].map((year) => ({
  value: year.toString(),
  label: year.toString(),
}))

export function removeCentury(year: string): string {
  return year.slice(2)
}

// Assignment 1. Strings
export function removeConsecutiveFours(string: string): string {
  const stringToLowerCase = string.toLowerCase()
  let result = ''
  let lastChar = ''
  let count = 0

  for (const character of stringToLowerCase) {
    if (character === lastChar) {
      count++
    } else {
      lastChar = character
      count = 1
    }

    if (count <= 3) {
      result += character
    }
  }

  return result
}

// Assignment 2. Arrays
export function maxSumOfTwoNumbersWithOddSum(arr: number[]): number {
  let maxSum = -1

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const currentSum = arr[i] + arr[j]

      if (currentSum % 2 !== 0) {
        maxSum = Math.max(maxSum, currentSum)
      }
    }
  }
  return maxSum
}

// console.log(maxSumOfTwoNumbersWithOddSum([1, 2, 3, 4, 5, 6])) returns 11
// console.log(maxSumOfTwoNumbersWithOddSum([19, 2, 42, 18])) returns 61
// console.log(maxSumOfTwoNumbersWithOddSum([61, 32, 51])) returns 93
