module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.tests.ts{,x}'],
  collectCoverageFrom: [
    '!**/node_modules/**',
    '{tools,conf,src}/**/*.(j|t)s{,x}',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tools/jest/setup.ts'],
  moduleNameMapper: {
    '.css$': '<rootDir>/tools/jest/css-transformer.ts',
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
