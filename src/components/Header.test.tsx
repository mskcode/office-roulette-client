import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders title', () => {
  render(<Header />)
  const appTitle = screen.getByText(/office roulette/i)
  expect(appTitle).toBeInTheDocument()
})
