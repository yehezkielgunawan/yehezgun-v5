import { execFileSync } from "node:child_process";
import {
	existsSync,
	mkdtempSync,
	readFileSync,
	readdirSync,
	rmSync,
	symlinkSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RootLayout from "@/app/layout";

vi.mock("next/font/google", () => ({
	Plus_Jakarta_Sans: () => ({
		className: "mocked-font-class",
		subsets: ["latin"],
	}),
}));

vi.mock("@/context/ThemeProvider", () => ({
	ThemeProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="theme-provider-mock">{children}</div>
	),
}));

vi.mock("next/script", () => ({
	__esModule: true,
	default: (props: Record<string, unknown>) => (
		<div data-testid="next-script-mock" {...props} />
	),
}));

vi.mock("@/services/metadata", () => ({
	metadataContent: vi.fn().mockReturnValue({
		title: "Mocked Title",
		description: "Mocked Description",
	}),
}));

vi.mock("@/constants/baseConst", () => ({
	umamiId: undefined,
	umamiURL: undefined,
}));

vi.mock("@/app/globals.css", () => ({}));

describe("RootLayout configuration", () => {
	it("does not render analytics when Umami is not configured", () => {
		render(
			<RootLayout>
				<div>Test Content</div>
			</RootLayout>,
		);

		expect(screen.queryByTestId("next-script-mock")).not.toBeInTheDocument();
	});
});

describe("Cloudflare build configuration", () => {
	it("keeps deployment credentials out of OpenNext build inputs", () => {
		const packageJson = JSON.parse(
			readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
		) as { scripts: Record<string, string> };

		for (const scriptName of [
			"cloudflare:preview",
			"cloudflare:deploy",
			"cloudflare:build:ci",
		]) {
			const script = packageJson.scripts[scriptName];

			expect(script).toContain("assert-no-deployment-secrets.mjs");
			expect(script).toContain("env -u CLOUDFLARE_ACCOUNT_ID");
			expect(script).toContain("-u CLOUDFLARE_API_TOKEN");
		}

		expect(packageJson.scripts["cf-typegen"]).toContain("--env-file /dev/null");

		for (const envFileName of readdirSync(process.cwd()).filter((fileName) =>
			/^\.env(?:\..+)?$/.test(fileName),
		)) {
			const envFilePath = resolve(process.cwd(), envFileName);
			if (!existsSync(envFilePath)) continue;

			const envFile = readFileSync(envFilePath, "utf8");

			expect(envFile).not.toMatch(/^CLOUDFLARE_ACCOUNT_ID=/m);
			expect(envFile).not.toMatch(/^CLOUDFLARE_API_TOKEN=/m);
		}
	});

	it("rejects deployment credentials in symlinked dotenv files", () => {
		const temporaryDirectory = mkdtempSync(join(tmpdir(), "cloudflare-env-"));
		const sourceEnvPath = join(temporaryDirectory, ".credentials");
		const linkedEnvPath = join(temporaryDirectory, ".env.local");

		try {
			writeFileSync(
				sourceEnvPath,
				"CLOUDFLARE_API_TOKEN=SHOULD_NOT_APPEAR_IN_BUNDLE\n",
			);
			symlinkSync(sourceEnvPath, linkedEnvPath);

			expect(() =>
				execFileSync(
					process.execPath,
					[resolve(process.cwd(), "scripts/assert-no-deployment-secrets.mjs")],
					{ cwd: temporaryDirectory, stdio: "pipe" },
				),
			).toThrow();
		} finally {
			rmSync(temporaryDirectory, { recursive: true, force: true });
		}
	});
});
