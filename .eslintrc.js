module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint-config-airbnb-base',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-underscore-dangle': 'off',
  },
  globals: {
    fetch: false,
    document: false,
  },
  overrides: [
    {
      files: [
        '**/src/**/*.spec.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
