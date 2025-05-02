// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  typescript: true,
  vue: true,
  regexp: true,
  markdown: false, // Do not lint code blocks in Markdown.
  jsonc: true,
  yaml: true,

  formatters: {
    html: 'prettier',
    graphql: 'prettier',
    css: 'prettier',
    markdown: 'dprint',
  },

  ignores: [
    'src/gql/**/*',
    'schema.graphql',
    'design/*.json',
    'src/assets/css/_icons.scss',
    'src/assets/css/_reset.scss',
    'puzzles.json',
  ],

  rules: {
    'no-console': 'warn',
    'ts/consistent-type-definitions': 'off',

    // Vue 3 officially supports fragments:
    // https://v3-migration.vuejs.org/new/fragments.html
    'vue/no-multiple-template-root': 'off',

    // To enforce "multi-attribute elements" rule:
    // https://vuejs.org/style-guide/rules-strongly-recommended.html#multi-attribute-elements
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 1 },
      multiline: { max: 1 },
    }],

    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside',
      multiline: 'below',
    }],

    'vue/slot-name-casing': ['error', 'kebab-case'],

    'perfectionist/sort-imports': ['error', {
      type: 'natural',
      order: 'asc',
      internalPattern: ['^~/.+'],
      ignoreCase: true,
      newlinesBetween: 'never',
      customGroups: {
        value: {
          vue: ['^vue$'],
          zod: ['^zod$'],
        },
        type: {
          vue: ['^vue$'],
          zod: ['^zod$'],
        },
      },
      groups: [
        'builtin',

        'vue',
        'zod',

        'external-type',
        'external',

        'internal-type',
        'parent-type',
        'sibling-type',
        'index-type',

        'internal',
        'parent',
        'sibling',
        'index',

        'side-effect-style',
        'style',
        'side-effect',
        'object',
        'unknown',
      ],
    }],

    // Правила для TypeScript файлов
    'no-unused-vars': 'off',
    'ts/no-unused-vars': ['error', {
      args: 'all',
      caughtErrors: 'all',
      vars: 'all',
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      ignoreRestSiblings: false,
    }],
  },
})
