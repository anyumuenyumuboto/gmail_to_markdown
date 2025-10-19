/// <reference types="vitest" />
import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue"
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
	// plugins: [vue(), viteSingleFile()],
	plugins: [viteSingleFile()],
	test: {
		globals: true, // describe, it, expect を import なしで使えるように
		environment: "jsdom", // DOM API を使うなら 'jsdom'（フロントエンド向け）
		include: ["tests/**/*.ts"],
	},
});
