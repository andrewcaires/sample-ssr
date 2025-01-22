import js from "@eslint/js";
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";

export default defineConfigWithVueTs(

  js.configs.recommended,
  ...ts.configs.recommended,

  skipFormattingConfig,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    "files": ["src/**/*"],
    "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "no-undef": ["error"],
      "no-multi-spaces": ["error"],
      "no-unused-vars": ["warn"],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "vue/no-unused-vars": ["warn", {
        "ignorePattern": "^_"
      }],
    },
  },
  {
    "ignores": [
      "dist/**/*",
      "node_modules/**/*",
    ],
  },

);
