/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',

  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],
    'no-multiple-empty-lines':['error',{ max:1 }],
    "no-var": 1
  },

};
