# Releasing the site

Production is release-driven. Merging an ordinary PR into `main` updates the
pending release PR; it does not deploy the site. Merging the release PR creates a
versioned GitHub release and starts the production deployment.

## Versioning and PR titles

Use **Squash and merge**, with the PR title as the squash commit subject. The
`Validate PR title` check enforces Conventional Commits. Development commits can
use any format.

| PR title | Version effect |
| --- | --- |
| `feat(blog): add category filtering` | Minor |
| `fix(header): correct mobile spacing` | Patch |
| `fix(content): publish a new article` | Patch |
| `fix(content): update featured projects` | Patch |
| `fix(deps): update Next.js` | Patch |
| `perf(images): reduce image payloads` | Patch |
| `revert: undo the last navigation change` | Patch |
| `feat!: remove legacy routes without redirects` | Major |
| `docs: update setup instructions` | No release by itself |
| `test: expand component coverage` | No release by itself |
| `chore(ci): simplify build configuration` | No release by itself |

Other accepted maintenance types are `style`, `refactor`, `build`, and `ci`.
Any type with `!` denotes a breaking change and can cause a major release.
The highest-impact change determines the version for the whole release.

Use `fix(content)` for additions, edits, and removals that should be published,
including blogs, quick notes, projects, and work experience. Use `fix(deps)` for
dependency updates that need to reach production. These scopes use the standard
patch-release behavior without a custom commit parser.

Non-breaking maintenance changes ship with the next release-triggering change,
but are hidden from the generated changelog. If an internal improvement needs to
ship on its own, describe its production effect in a `fix` or `perf` PR title.

The `v5` in the repository name identifies the site's fifth iteration. Release
versions are independent and use tags such as `v1.1.0`.

## Repository setup

Before activating the workflows:

1. Add a fine-grained PAT as the Actions secret `RELEASE_PLEASE_TOKEN`, scoped to
   this repository. Grant **Contents**, **Issues**, and **Pull requests** read/write
   access. If the token owner needs organization approval, obtain it first.
   Set an expiry and renew the secret before it expires.
2. In **Settings → Actions → General**, allow GitHub Actions to create and approve
   pull requests. The workflow itself does not automatically approve or merge PRs.
3. In **Settings → General → Pull Requests**, enable squash merging and select
   **Default to pull request title**. Use an empty default squash commit body to
   avoid development commit messages accidentally affecting version detection.
   Disable merge commits and rebase merging to enforce the title-based convention.
4. Protect `main` with a branch rule or ruleset requiring pull requests and the
   `Validate PR title` and `next` (YehezGun CI) checks. Enable the title check as a
   required check after its first run: it uses the workflow on the base branch and
   becomes active once this setup has merged.
5. Retain `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as repository Actions
   secrets. Keep the existing Giscus and analytics `NEXT_PUBLIC_*` secrets where
   those integrations are enabled.
6. Keep full release tags immutable; a tag ruleset can prevent updates and deletion.

The release workflow deliberately requires the PAT rather than falling back to
`GITHUB_TOKEN`. GitHub suppresses downstream workflows for PRs created using the
built-in token, preventing the generated PR from receiving normal CI checks.

## Publish a release

1. Open a PR with a Conventional Commit title, pass checks, then squash-merge it.
2. Wait for the **Release** workflow to create or refresh the release PR.
3. Review its proposed version, `package.json`, `.release-please-manifest.json`,
   and `CHANGELOG.md`. Check that all changes intended for publication are included.
4. Wait for the release PR's checks to pass, then squash-merge it when ready to
   publish. Preserve its generated Conventional Commit title and release labels.
5. The **Release** workflow creates the Git tag and GitHub release, then calls
   **Deploy to Cloudflare Workers** with that tag and its expected commit SHA.
6. Confirm that the deployment job succeeds, including its production smoke checks.
   Its Actions summary records the release version, full commit SHA, and outcome.

Release Please manages package versions and changelog entries. Do not bump them
manually during normal development. The site remains a private application and
is not published to npm.

Both workflows run production operations only from `main`. Deployment verifies
that the input names a published stable GitHub release, checks out its exact tag,
and requires matching package and manifest versions. Automatic deployments also
verify the expected commit SHA. Lint, coverage tests, the Next.js build, and the
Cloudflare build must succeed before Wrangler deploys.

The production smoke check requests the homepage and `/blog`. It checks HTTP
availability, not the version served by every edge cache. A successful GitHub
release alone does not mean production deployment succeeded.

## First release after migration

The manifest starts at the existing `1.0.0` version. The bootstrap boundary is
`75e738cb8595f9f9b482681fb9929c4317f4678a`, the original
`chore(main): release 1.0.0` commit. The first release PR collects subsequent
conventional commits without regenerating the original `1.0.0` entry.

Review this first PR carefully: older non-conventional messages may be missing
from its generated notes. Add a short migration summary to its changelog if
needed, after the final automatic refresh and before merging. The version is
calculated from the collected changes rather than forced to a new major version.

After the first successful release, the bootstrap boundary is ignored and may be
removed in a maintenance PR. Subsequent releases use the tracked release history.

## Retry and rollback

If deployment fails after the release has been created, the tag and GitHub release
remain valid. For an unchanged workflow, use **Re-run failed jobs** on the original
**Release** run. Re-running the whole release job may report no newly created
release and therefore skip deployment.

For an explicit retry or rollback, run the deployment workflow from `main` with
an existing stable release tag:

```bash
gh workflow run cloudflare-deploy.yaml --ref main -f release_tag=v1.1.0
```

To roll back, choose the previous known-good release tag instead. This rebuilds
that tagged source using its declared dependencies and the current repository
secrets; it does not restore an archived binary or historical secret values.
Tags from before this migration may not contain the required manifest and cannot
use this deployment path.

Production deployments share a concurrency group. An active deployment is never
automatically cancelled. GitHub keeps only one pending job in that group, so a
newer request can replace an older pending request; this is not a FIFO queue.
Wait for the active run before requesting recovery and check which tag is running.

If the deploy step succeeds but the smoke check fails, production may already be
running the new version. Inspect the run before deciding to retry or roll back.
Do not move or delete a published tag to fix a release; publish a new patch.

## Local checks

Before merging release-management changes, run:

```bash
pnpm biome:lint:ci
pnpm build
pnpm cloudflare:build:ci
pnpm test:coverage
```

If available, validate workflow syntax with:

```bash
actionlint .github/workflows/*.yaml
```
