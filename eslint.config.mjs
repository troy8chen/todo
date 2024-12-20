// eslint.config.mjs
import nextjs from '@next/eslint-plugin-next'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import testingLibrary from 'eslint-plugin-testing-library'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      '.next/*',
      'node_modules/*',
      'dist/*',
      'coverage/*',
      'public/*'
    ]
  },
  // Base TS configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextjs,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' }
      ],

      // React rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'error',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
    }
  },
  // Test files configuration
  {
    files: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
      'jest.setup.ts'
    ],
    plugins: {
      'jest': jest,
      'testing-library': testingLibrary,
    },
    rules: {
      // Jest rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'jest/expect-expect': 'error',
      'jest/no-test-prefixes': 'error',
      'jest/no-done-callback': 'error',

      // Testing Library rules
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-container': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': ['error', 'react'],
      'testing-library/no-render-in-setup': 'error',
      'testing-library/prefer-screen-queries': 'error',
      'testing-library/prefer-presence-queries': 'error',

      // Disable certain rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-console': 'off',
    },
    settings: {
      jest: {
        version: 29
      }
    }
  },
  // Next.js specific rules
  {
    files: ['app/**/*.ts', 'app/**/*.tsx', 'components/**/*.tsx'],
    plugins: {
      '@next/next': nextjs,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-title-in-document-head': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/google-font-preconnect': 'error',
    }
  }
]