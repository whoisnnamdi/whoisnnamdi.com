const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^fathom-client$': '<rootDir>/__mocks__/fathom-client.js',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
}

module.exports = createJestConfig(customJestConfig)

