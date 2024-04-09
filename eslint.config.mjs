import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    ignores: [".config/*", "node_modules/", ".git/", "dist"],
  },
  {
    rules: {
      semi: ["error", "always"],
      "prefer-const": "warn",
      "no-console": "warn",
    },
  },
];
