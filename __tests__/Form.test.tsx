import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Form } from '../src/components/Form/Form'
import { describe, expect, test, vi } from 'vitest'

describe('Form component', () => {
  const mockSubmit = vi.fn()
  const mockSetFormData = vi.fn()
  const mockSetIsFlipped = vi.fn()

  const initialData = {
    cardNumber: '',
    cardName: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
  }

  const initialErrors = {}

  test('Renders the form and its inputs', () => {
    render(
      <Form
        onSubmit={mockSubmit}
        errors={initialErrors}
        formData={initialData}
        setFormData={mockSetFormData}
        setIsFlipped={mockSetIsFlipped}
      />
    )

    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/card name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/expiration date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('Handles input changes correctly', () => {
    render(
      <Form
        onSubmit={mockSubmit}
        errors={initialErrors}
        formData={initialData}
        setFormData={mockSetFormData}
        setIsFlipped={mockSetIsFlipped}
      />
    )

    const cardNumberInput = screen.getByLabelText(/card number/i)
    const cardNameInput = screen.getByLabelText(/card name/i)

    fireEvent.change(cardNumberInput, {
      target: { name: 'cardNumber', value: '1234567890123456' },
    })
    fireEvent.change(cardNameInput, {
      target: { name: 'cardName', value: 'John Doe' },
    })
    expect(mockSetFormData).toHaveBeenCalledTimes(2)

    const setCardNumber = mockSetFormData.mock.calls[0][0]
    const updatedCardNumberData = setCardNumber(initialData)
    expect(updatedCardNumberData).toEqual({
      ...initialData,
      cardNumber: '1234567890123456',
    })

    const setCardName = mockSetFormData.mock.calls[1][0]
    const updatedCardNameData = setCardName(initialData)
    expect(updatedCardNameData).toEqual({
      ...initialData,
      cardName: 'John Doe',
    })
  })

  test('Submits the form with values that all fail validation', () => {
    render(
      <Form
        onSubmit={mockSubmit}
        errors={initialErrors}
        formData={initialData}
        setFormData={mockSetFormData}
        setIsFlipped={mockSetIsFlipped}
      />
    )

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    expect(mockSubmit).toHaveBeenCalled()
  })

  test('Shows error messages when validation fails', () => {
    const validationErrors = {
      cardNumber: 'Card number is required',
      cardName: 'Name is required',
    }

    render(
      <Form
        onSubmit={mockSubmit}
        errors={validationErrors}
        formData={initialData}
        setFormData={mockSetFormData}
        setIsFlipped={mockSetIsFlipped}
      />
    )

    expect(screen.getByText(/card number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
  })

  test('Flips the card when focusing on and blurring the CVV input', () => {
    render(
      <Form
        onSubmit={mockSubmit}
        errors={initialErrors}
        formData={initialData}
        setFormData={mockSetFormData}
        setIsFlipped={mockSetIsFlipped}
      />
    )

    const cvvInput = screen.getByLabelText(/cvv/i)

    fireEvent.focus(cvvInput)
    expect(mockSetIsFlipped).toHaveBeenCalledWith(true)

    fireEvent.blur(cvvInput)
    expect(mockSetIsFlipped).toHaveBeenCalledWith(false)
  })
})
