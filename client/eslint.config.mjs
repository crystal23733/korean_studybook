// eslint.config.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 옛날(.eslintrc) 형식의 공유 설정을 Flat Config로 변환해 주는 래퍼
const compat = new FlatCompat({
  baseDirectory: __dirname, // 공유 설정을 찾을 기준 경로
});

export default [
  // 무시할 경로
  {
    ignores: ["node_modules", ".next", "out", "dist"],
  },

  // ⬇️ Next의 'next' / 'next/core-web-vitals' 옛날 프리셋을 Flat으로 변환해서 불러옴
  ...compat.extends("next", "next/core-web-vitals"),

  // JS/TS 권장 설정
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 프로젝트 공통 규칙
  {
    plugins: {
      prettier: prettierPlugin, // Flat Config에선 객체로 등록
    },
    languageOptions: {
      parser: tseslint.parser, // Flat Config는 여기에서 parser 지정
      ecmaVersion: 2023,
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": "error",
      "import/no-anonymous-default-export": "off",
      "prefer-const": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];
