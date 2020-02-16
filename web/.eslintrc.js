module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  plugins: [
    '@typescript-eslint',
    'babel',
    'eslint-plugin-react',
    'import',
    'jest',
    'react-hooks',
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    // import
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['conf/**/*.ts', 'tools/**/*.ts']
    }],
    'import/extensions': 'off',
  }
}