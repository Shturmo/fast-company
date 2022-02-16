module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: [0, 2],
    // semi: [2, "always"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
    "multiline-ternary": ["off"],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    "comma-dangle": ["error", "only-multiline"],
  },
}
