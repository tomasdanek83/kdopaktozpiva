module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'multiline-ternary': ['error', 'never'],
    '@typescript-eslint/indent': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
