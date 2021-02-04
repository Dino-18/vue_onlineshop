module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/essential',
      '@vue/standard'
    ],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      "space-before-function-paren": ["error", "never"],
      'no-irregular-whitespace': 'off'
    }
  }