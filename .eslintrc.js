module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: [
    'node_modules/',
    '.pnp.cjs',
    '.pnp.loader.mjs',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: [
    'simple-import-sort',
    'unused-imports',
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
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: [
        '@typescript-eslint',
        'flowtype',
      ],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
      },
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
    '@emotion/pkg-renaming': 'error',
    'react-hooks/rules-of-hooks': 'off',
    'react/function-component-definition': 'off',
    'no-console': ['warn', {
      allow: ['warn', 'error'],
    }],
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        // Node.js builtins. You could also generate this regex if you use a `.js` config.
        // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
        ['^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'], // Packages. `react` related packages come first.
        ['^react'],
        ['^next'],
        ['^@?\\w'], // Internal packages.
        ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'], // Side effect imports.
        ['^\\u0000'], // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Style imports.
        ['^.+\\.s?css$'],
      ],
    }],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-undef': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    }],
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
