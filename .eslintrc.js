module.exports = {
  root: true,
  env: {
    jest: true,
  },
  ignorePatterns: [
    'storybook-static',
  ],
  extends: [
    '@nf-team/eslint-config',
  ],
  plugins: [
    '@emotion',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        'jest/no-identical-title': 'off',
        'testing-library/no-unnecessary-act': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      extends: ['plugin:cypress/recommended'],
      files: ['cypress/**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./cypress/tsconfig.json'],
      },
    },
    {
      extends: ['plugin:storybook/recommended'],
      files: ['**/*.stories.tsx'],
      rules: {
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.tsx', '.json'],
      },
    },
  },
  rules: {
    'import/order': 'off',
    '@emotion/pkg-renaming': 'error',
    'react/function-component-definition': 'off',
    'no-console': ['warn', {
      allow: ['warn', 'error'],
    }],
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        ['^\\u0000'],
        ['^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'],
        ['^react'],
        ['^next'],
        ['^@?\\w'],
        ['^(@|@hooks|@ui|components|utils|models|pages|services)(/.*|$)'],
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ['^.+\\.svg$'],
        ['^.+\\.s?css$'],
      ],
    }],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-undef': 'off',
    'react/jsx-props-no-spreading': ['error', {
      exceptions: ['input', 'SelectBox', 'Textarea', 'Input'],
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'jest.setup.js',
        'cypress/**',
      ],
    }],
    'jsx-a11y/label-has-associated-control': [2, {
      labelAttributes: ['label'],
      depth: 3,
    }],
    'react/require-default-props': [2, {
      ignoreFunctionalComponents: true,
    }],
    'react/jsx-no-useless-fragment': ['error', {
      allowExpressions: true,
    }],
  },
};
