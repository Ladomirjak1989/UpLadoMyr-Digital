// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: './tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint', 'prettier'],
//   extends: [
//     'next',
//     'next/core-web-vitals',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ],
//   rules: {
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
//     '@typescript-eslint/no-explicit-any': 'off',
//     'prettier/prettier': 'error',
//     'react/react-in-jsx-scope': 'off',
//     'no-console': ['error', { allow: ['warn', 'error'] }],
//   },
//   ignorePatterns: ['*.config.js', 'node_modules/'],
// };


// .eslintrc.js

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'es5',
      },
    ],
  },
  ignorePatterns: ['*.config.js', 'node_modules/'],
};

