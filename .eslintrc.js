module.exports = {
  extends: [
    'xo-space/esnext',
    'plugin:unicorn/recommended',
    'prettier'
  ],
  plugins: [
    'no-use-extend-native',
    'unicorn',
    'promise',
    'import',
    'node',
    'prettier'
  ],
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: 'es5',
      semi: false,
    }],
    'valid-jsdoc': ['error', {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
    }],
    'no-invalid-this': 'error',
    'no-unused-vars': 'error',
    'linebreak-style': 'error',
    'max-lines': ['warn', {
      'max': 500,
      'skipBlankLines': true,
      'skipComments': true
    }],
    'no-var': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-arrow-callback': 'error',
    'prefer-const': ['error', {
      destructuring: 'all'
    }],
    'prefer-numeric-literals': 'error',
    'camelcase': ['error', { properties: 'never' }],

    "promise/always-return": "error",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "error",
    'promise/no-return-in-finally': 'error',
    'promise/prefer-await-to-then': 'error',

    'node/process-exit-as-throw': 'error',
    'node/no-deprecated-api': 'error',
    'node/no-unpublished-require': 'error',

    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': ['error', {
      js: 'never',
      json: 'never',
      jsx: 'never'
    }],
    'import/first': 'error',
    'import/named': 'error',
    'import/no-absolute-path': 'error',
    'import/newline-after-import': 'error',
    'import/no-amd': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-as-default': 'error',
    'import/order': 'error',
    'import/prefer-default-export': 'error',

    'unicorn/number-literal-case': 'off'
  },
  overrides: [
    {
      files: [ "test/**/*.js" ],
      env: {
        jest: true,
      }
    }
  ]
}
