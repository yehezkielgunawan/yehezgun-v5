import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		include: [
			"src/__test__/*.test.ts",
			"src/__test__/*.test.tsx",
			"src/__test__/services/*.test.ts",
		],
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/__test__/setup.ts"],
		alias: {
			"@": "/src",
			"content-collections": "/src/__test__/mocks/content-collections.ts",
		},
		coverage: {
			include: ["src/**/*.ts", "src/**/*.tsx"],
			exclude: [
				"src/__test__/**",
				"src/**/*.d.ts",
			],
			reporter: ["text", "html"],
			provider: "v8",
			thresholds: {
				branches: 40,
				functions: 50,
				lines: 50,
				statements: 50,
			},
		},
	},
});
