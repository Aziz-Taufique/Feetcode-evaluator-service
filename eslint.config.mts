import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores([
        "node_modules/**",
        "dist/**",
        "build/**",
        ".env",
        "*.log"
    ]),
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js, "simple-import-sort": simpleImportSort, },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
        rules: {
            semi: ["error", "always"],
            indent: ["error", 4],
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "no-unused-vars": "off",
        }
    },
    tseslint.configs.recommended,
]);