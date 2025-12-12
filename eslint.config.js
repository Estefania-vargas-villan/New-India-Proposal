import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginQuasar from '@quasar/app-vite/eslint'
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
   ignores: ['node_modules/**', 'dist/**']

  },

  ...pluginQuasar.configs.recommended(),
  js.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        ga: 'readonly',
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly',
        browser: 'readonly'
      }
    },

    rules: {
      'prefer-promise-reject-errors': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      // ⚡ Aquí ajustamos la regla de variables no usadas
      'no-unused-vars': ['warn', { 
        varsIgnorePattern: 'CoverRequired|Summary|handleMortgageChange|calculatedLossOfRent|calculatedRemovalDebris|resetFlag|summaryRef|handleCustomerTypeChange|combinedFormData|isReadyForCalculation|calculatePremium|submitForm|resetForm|getExcessHint',
        argsIgnorePattern: '^_' // si quieres ignorar args que comiencen con _
      }]
    }
  },

  {
    files: ['src-pwa/custom-service-worker.js'],
    languageOptions: {
      globals: {
        ...globals.serviceworker
      }
    }
  },

  prettierSkipFormatting
]
