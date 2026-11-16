import globals from "globals";

const strict = {
  "no-undef": "error",
  "no-unused-vars": "error",
  "no-redeclare": "error",
  "no-dupe-keys": "error",
  "no-unreachable": "error",
  "no-constant-condition": "error",
  "no-var": "error",
  "prefer-const": "error",
  eqeqeq: ["error", "always", { null: "ignore" }],
};

export default [
  { ignores: ["dist/", "node_modules/"] },
  { files: ["js/**/*.js"], languageOptions: { ecmaVersion: 2022, sourceType: "script", globals: { ...globals.browser } }, rules: strict },
  { files: ["sw.js"], languageOptions: { ecmaVersion: 2022, sourceType: "script", globals: { ...globals.serviceworker } }, rules: strict },
  { files: ["tools/**/*.mjs", "tests/**/*.mjs", "eslint.config.mjs"], languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: { ...globals.node, ...globals.browser } }, rules: strict },
];
