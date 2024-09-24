import { UseFormRegister, FieldError } from 'react-hook-form'
import { Schema } from '../../App'
import { FocusEventHandler } from 'react'
export interface InputProps {
  label: string
  name: 'cardNumber' | 'cardName' | 'cardCVV'
  type: string
  register: UseFormRegister<Schema>
  error: FieldError | undefined
  handleBlur?: FocusEventHandler<HTMLInputElement> | undefined
  handleFocus?: () => void
  handleOnChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  maxLength?: number
}
