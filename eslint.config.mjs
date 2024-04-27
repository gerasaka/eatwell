import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { globals: globals.node } },
  { languageOptions: { globals: globals.jest } },
  { ignores: [".config/*", "./node_modules/", ".git/", "./dist"] },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      semi: ["error", "always"],
      "prefer-const": "warn",
      "no-console": "warn",
    },
  },
];
