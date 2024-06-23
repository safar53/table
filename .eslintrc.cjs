module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-undef': 0,
    'indent': ['error', 4],
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'object-curly-spacing': ['error', 'never'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single', {'avoidEscape': true}]
}
}
