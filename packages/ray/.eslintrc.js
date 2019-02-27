module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true
      }
    ]
  }
};
