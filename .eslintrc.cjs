module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: "true"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", //resolve conflict
    "./.eslintrc-auto-import.json" //inject autoimport
  ],
  parser: "vue-eslint-parser", // parse --ext .vue
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser", //parse <script>
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    NodeJS: true
  },
  plugins: ["vue", "@typescript-eslint"]
};
