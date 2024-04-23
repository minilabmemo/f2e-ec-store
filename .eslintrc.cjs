/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  "plugins": ["vuejs-accessibility"],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    "plugin:vuejs-accessibility/recommended",
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
   'no-console': ["error",{ allow: ["warn", "error"] }],
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
    "no-var": 1,
    "vuejs-accessibility/label-has-for": [
      "error",
      {
        "required": {
          "every": ["id"]
        },
        "allowChildren": false
      }
    ]
  },

};
