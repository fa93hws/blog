module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.tests.ts{,x}'],
  collectCoverageFrom: ['!**/node_modules/**', '!*.d.ts'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tools/jest/setup.ts'],
  moduleNameMapper: {
    '.css$': 'identity-obj-proxy',
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
