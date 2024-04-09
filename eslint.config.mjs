import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [".config/*", "./node_modules/", ".git/", "./dist"],
  },
  {
    rules: {
      semi: ["error", "always"],
      "prefer-const": "warn",
      "no-console": "warn",
    },
  },
];
