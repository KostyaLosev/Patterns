module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    jest: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint', 'import'],

  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],

  rules: {
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
};
