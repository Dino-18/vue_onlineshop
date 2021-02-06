module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/essential',
      // '@vue/standard'
    ],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      // "space-before-function-paren": ["error", "never"],
      "space-before-function-paren": 0,
      'no-irregular-whitespace': 'off',
      "no-unused-vars": 'off'
    }
  }