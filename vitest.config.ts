import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		include: ["src/__test__/*.test.ts", "src/__test__/*.test.tsx"],
		environment: "jsdom",
		alias: {
			"@": "/src",
		},
	},
});
