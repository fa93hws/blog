module.exports = {
  root: true,
  extends: '@fa93hws-blog/eslint-config',
  rules: {
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['workflow/**/*.ts'],
      },
    ],
  },
};
