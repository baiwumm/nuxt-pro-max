import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  stylistic: true,
  tailwindcss: true,
  rules: {
    'n/prefer-global/process': 'off',
  },
})
