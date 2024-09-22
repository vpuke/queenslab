import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card } from '../src/components/Card/Card'

describe('Render card component', () => {
  const mockData = {
    cardNumber: '1234567890123456',
    cardName: 'John Doe',
    cardMonth: '12',
    cardYear: '2025',
    cardCVV: '123',
  }

  test('Renders the Card component with flipped false then true', () => {
    const { container } = render(<Card formData={mockData} isFlipped={false} />)

    expect(screen.getByText(/john doe/i)).toBeInTheDocument()

    expect(screen.getByText(/1234 5678 9012 3456/i)).toBeInTheDocument()

    expect(screen.getByText('12/25')).toBeInTheDocument()

    expect(screen.getByText('123')).toBeInTheDocument()

    const notFlippedElement = container.firstChild as Element
    expect(notFlippedElement.className).not.toContain('flipped')

    const { container: flippedContainer } = render(
      <Card formData={mockData} isFlipped={true} />
    )
    const flippedElement = flippedContainer.firstChild as Element
    expect(flippedElement.className).toContain('flipped')
  })
})
