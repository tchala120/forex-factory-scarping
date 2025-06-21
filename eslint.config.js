import playwright from "eslint-plugin-playwright";

export default [
  {
    ...playwright.configs["flat/recommended"],
    files: ["src/tests/**"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
    },
  },
];
