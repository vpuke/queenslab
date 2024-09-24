import { FieldError, UseFormRegister } from 'react-hook-form'
import { Schema } from '../../App'
import { FocusEventHandler } from 'react'

export interface Option {
  text: string
  value: string
}
export interface SelectProps {
  label: string
  name: 'cardMonth' | 'cardYear'
  register: UseFormRegister<Schema>
  error: FieldError | undefined
  options: Option[]
  defaultValue: string
  handleOnBlur?: FocusEventHandler<HTMLSelectElement> | undefined
}
