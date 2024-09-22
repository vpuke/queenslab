import { z } from 'zod'

export const formSchema = z
  .object({
    cardNumber: z
      .string()
      .min(16, { message: 'Card number must be 16 digits' })
      .max(16, { message: 'Card number must be 16 digits' })
      .regex(/^\d+$/, { message: 'Card number must contain only numbers' })
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
  let sum = 0
  let shouldDouble = false

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i])

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
