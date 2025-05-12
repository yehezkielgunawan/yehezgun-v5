import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

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
			include: ["src/app/**", "src/service/**"],
			exclude: ["src/__test__/**"],
		},
	},
});
