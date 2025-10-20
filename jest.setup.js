// Testing Library and DOM matchers
import '@testing-library/jest-dom'

// Provide a noop fetch by default; tests can override
if (typeof global.fetch === 'undefined') {
  global.fetch = () => Promise.reject(new Error('fetch not mocked'))
}

// Basic mock for Next.js router if needed
jest.mock('next/router', () => require('next-router-mock'))

