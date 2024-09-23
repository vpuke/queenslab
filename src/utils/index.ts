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
      .regex(/^(202[3-4]|202[0-9])$/, { message: 'Invalid year' })
      .refine(
        (value) => value === '' || parseInt(value) >= new Date().getFullYear(),
        {
          message: 'Year cannot be in the past',
        }
      ),
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
export function maxSumOfTwoNumbersThatHaveOddSum(arr: number[]): number {
  const digitSum = (num: number): number => {
    let sum = 0
    num = Math.abs(num)
    while (num > 0) {
      sum += num % 10
      num = Math.floor(num / 10)
    }
    return sum
  }

  let maxEven1 = -1,
    maxEven2 = -1
  let maxOdd1 = -1,
    maxOdd2 = -1

  for (const num of arr) {
    const sumDigits = digitSum(num)

    if (sumDigits % 2 === 0) {
      if (num > maxEven1) {
        maxEven2 = maxEven1
        maxEven1 = num
      } else if (num > maxEven2) {
        maxEven2 = num
      }
    } else {
      if (num > maxOdd1) {
        maxOdd2 = maxOdd1
        maxOdd1 = num
      } else if (num > maxOdd2) {
        maxOdd2 = num
      }
    }
  }

  let maxSum = -1

  if (maxEven2 !== -1) {
    maxSum = maxEven1 + maxEven2
  }
  if (maxOdd2 !== -1) {
    maxSum = Math.max(maxSum, maxOdd1 + maxOdd2)
  }

  return maxSum
}
