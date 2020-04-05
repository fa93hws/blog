module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    'eslint-plugin-react',
    'react-hooks',
    'jsx-a11y',
  ],
  extends: [
    '../tools/eslint/config/eslint-config.js',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'conf/**/*.ts',
          'tools/**/*.ts',
          'src/**/stories/*.ts{,x}',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
