export default {
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  coverageReporters: ['text', 'html'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
