module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    'indent': ['error', 2],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    'no-async-promise-executor': 0,
    'no-case-declarations': 0,
    'no-control-regex': 0,
    'no-new-func': 0,
    'no-prototype-builtins': 0,
    'no-useless-call': 0,
    'no-useless-catch': 0,
    'no-useless-rename': 0,
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
  },
}
