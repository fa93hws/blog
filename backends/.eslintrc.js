module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'babel', 'import', 'jest'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    // import
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/extensions': 'off',

    'class-methods-use-this': 'off',
  },
};
