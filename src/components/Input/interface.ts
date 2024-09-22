import { FocusEventHandler } from 'react'

export interface InputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  error: string | undefined
  handleBlurCVV?: FocusEventHandler<HTMLInputElement> | undefined
  handleFocusCVV?: () => void
}
