# Deployment record

Provisioned and verified on October 5, 2026 using the authenticated GitHub account, Cloudflare MCP and Wrangler OAuth. No credentials were committed.

## Resources

| Resource              | Value                                                              |
| --------------------- | ------------------------------------------------------------------ |
| GitHub fork           | https://github.com/Aditya-Baindur/sales-crm                        |
| Upstream remote       | https://github.com/kargulstudio/sales-crm                          |
| Production URL        | https://sales-crm.adityabaindur20.workers.dev                      |
| Cloudflare account    | `e0090611946a50398df8b46cac4fca29`                                 |
| Worker                | `sales-crm`                                                        |
| Deployed version      | `0f113cdd-6de7-4527-8710-1c647703909d`                             |
| D1 database / binding | `sales-crm` / `DB`                                                 |
| D1 database ID        | `13f07d55-68d5-45f3-a50b-bcbd9abaa3f1`                             |
| D1 location           | Eastern North America                                              |
| Access application    | `Sales CRM` / `1bb4ed0a-3b50-409f-a5be-6f0affeb27b2`               |
| Access team           | `https://adityabaindur20.cloudflareaccess.com`                     |
| Access audience       | `018744051cd525e912298133f649055f325fee4960d1dcdff0e1d70ae7ad7a29` |
| Existing GitHub IdP   | `0115d3a0-f6fc-4333-98e5-37fd8c225f88`                             |
| Existing owner policy | `aditya-github` / `5d7477d6-4346-48a0-9812-5dbcc7c142aa`           |

The Access application was created **before** the first Worker deployment. Its policy allows only `abain023@uottawa.ca` and `adityabaindur20@gmail.com`; the existing policy was reused without changing other applications. The application uses HTTP-only, SameSite Lax cookies, a 24-hour app session and GitHub identity-provider redirect. The reusable policy retains its pre-existing 336-hour policy session setting. There are no bypass policies. Worker Preview URLs are disabled.

Production migrations `0001_crm.sql` and `0002_normalize_seed_segments.sql` are applied. The optional upstream examples were seeded for `abain023@uottawa.ca`: 18 companies, 90 opportunities, associated interaction history and account-scoped demo owners. Signing in with the Gmail address creates a separate empty personal CRM. Seeding never grants Access admission.

## Verification evidence

- Local lint and TypeScript checks pass.
- 15 focused tests pass, including actual repository SQL/schema and signed JWT validation.
- Both browser tests pass: create/edit company, contacts, interactions, tasks and opportunities; full reload; complete task; command search; archive/restore; mobile navigation. The desktop test also rejects browser runtime and console errors.
- Production Worker build and deployment succeeded. Upload: approximately 1.92 MiB uncompressed / 575 KiB gzip; startup 23 ms. Cloudflare API confirms the production `DB` binding references the database above.
- Real production D1 smoke test created an isolated temporary user/company/contact/interaction/task/opportunity. Separate API calls read them back, updated the company, completed the task, and changed opportunity value/probability. A further read confirmed persistence and the trigger-derived pipeline (`250`, `80%`). All temporary records were removed afterward.
- Production D1 `PRAGMA foreign_key_check` returned no violations.
- Requests to `/`, `/api/crm/bootstrap`, `/api/crm/companies` and a static asset return **302 to the configured Cloudflare Access team**. Forged identity headers also redirect, without exposing CRM data.
- The compiled production Worker, run locally with development variables still present, returns **401** for missing JWT, forged email header and forged JWT. Static assets return 200. This confirms the development identity branch is absent from production behavior.
- Credential-pattern scan found no private keys, GitHub tokens or AWS keys in tracked files; local secrets/state/artifacts are ignored. The runtime needs no deployment API token.

## Remaining owner action and verification boundary

Open the production URL and sign in with GitHub. A real authenticated owner's browser session was unavailable to the agent, so the production identity-provider round trip and authenticated production UI CRUD could **not** be observed end to end. Access was not relaxed to bypass this. Local browser CRUD and direct production D1 CRUD are separate checks, not a claim of authenticated production browser verification.

CI runs on pushes/PRs. Automatic deployment is intentionally opt-in: configure the repository variables/secret described in README, or connect Cloudflare Workers Builds. The initial deployment is already live and does not depend on enabling automatic deployment. No personal OAuth credentials were copied into GitHub secrets.

The official Deploy to Cloudflare badge points to this fork. New deployments must configure their own Access application/team/audience; the button provisions Worker/D1 resources but not Access policy.

The inherited source has no explicit upstream license grant. See README and [SECURITY.md](SECURITY.md) for this warning and the unresolved build-tool dependency advisory.
