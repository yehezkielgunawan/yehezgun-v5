import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const envFilePattern = /^\.env(?:\..+)?$/;
const deploymentCredentialPattern =
	/^\s*(?:export\s+)?CLOUDFLARE_(?:ACCOUNT_ID|API_TOKEN)\s*=/m;

export function findDeploymentCredentialFiles(rootDir = process.cwd()) {
	return readdirSync(rootDir, { withFileTypes: true })
		.filter(
			(entry) =>
				(entry.isFile() || entry.isSymbolicLink()) &&
				envFilePattern.test(entry.name),
		)
		.filter((entry) =>
			deploymentCredentialPattern.test(
				readFileSync(resolve(rootDir, entry.name), "utf8"),
			),
		)
		.map((entry) => entry.name);
}

if (
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	const credentialFiles = findDeploymentCredentialFiles();

	if (credentialFiles.length > 0) {
		console.error(
			"Remove Cloudflare deployment credentials from dotenv files before building:",
			credentialFiles.join(", "),
		);
		process.exitCode = 1;
	}
}
