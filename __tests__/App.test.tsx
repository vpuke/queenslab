import { render } from '@testing-library/react'
import { App } from '../src/App'
import { describe, test } from 'vitest'
import React from 'react'

describe('App', () => {
  test('renders the App component', () => {
    render(<App />)
  })
})
