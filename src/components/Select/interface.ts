import { FocusEventHandler } from 'react'

interface Option {
  value: string
  label: string
}

export interface SelectProps {
  label?: string
  name: string
  value: string
  options: Option[]
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  error: string | undefined
  displayLabel?: boolean
  defaultValue: string
  handleBlur: FocusEventHandler<HTMLSelectElement> | undefined
}
