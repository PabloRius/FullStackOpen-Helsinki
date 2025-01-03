import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticPluginObject from '@stylistic/eslint-plugin-js'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: { '@stylistic/js': stylisticPluginObject, prettier },
    ignores: ['dist/*', '*.json'],
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'windows'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 0,
    },
  },
  pluginJs.configs.recommended,
  prettierConfig,
]
