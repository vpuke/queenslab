import { Dispatch, SetStateAction } from 'react'

export interface FormProps {
  onSubmit: (data: {
    cardNumber: string
    cardName: string
    cardMonth: string
    cardYear: string
    cardCVV: string
  }) => void
  errors: Record<string, string | undefined>
  setErrors: Dispatch<SetStateAction<Record<string, string | undefined>>>
  formData: {
    cardNumber: string
    cardName: string
    cardMonth: string
    cardYear: string
    cardCVV: string
  }
  setFormData: React.Dispatch<
    React.SetStateAction<{
      cardNumber: string
      cardName: string
      cardMonth: string
      cardYear: string
      cardCVV: string
    }>
  >
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}
