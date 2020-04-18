module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.tests.ts{,x}'],
  collectCoverageFrom: [
    '!**/node_modules/**',
    'src/**/*.(j|t)s{,x}',
    '!**/*.d.ts',
    '!**/*.stories.tsx',
    '!**/fake/**',
    '!src/components/storybook/**',
    '!src/index.tsx',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tools/jest/setup.ts'],
  moduleNameMapper: {
    '.css$': '<rootDir>/tools/jest/css-transformer.ts',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  transform: {
    '.svg$': '<rootDir>/tools/jest/svg-transformer.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-serializer-html'],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
};
