# MedAlert + Guardian prototype

A hiring-challenge concept for MedAlert: a product-led homepage, demo authentication, and a family dashboard. Submitted by Frederick Ian Aranico; implementation, design iteration, and tests authored with OpenAI Codex. Claude Code and Claude Design were **not** used.

## Try it

Use `demo@medalert.test` / `Guardian72!`, or select **Use demo credentials** on the login page. Any other credentials produce an error. Please do not enter real credentials or personal information.

```sh
npm ci
npm run dev
npm run build
```

Stack: Next.js App Router, TypeScript, React, plain CSS, Lucide icons. No database or external AI API is needed. Deploy to Vercel with its Next.js preset.

## Context and prompts

I supplied Codex the full challenge and asked it to research [MedAlert](https://medalert.io), the [PLUS product](https://medalert.io/products/medalert-plus-medical-alert-watch-4g-with-gps), and the Guardian context in the job posting. The audience is older adults and their families; the design emphasizes independence rather than fear. The product image is MedAlert's own, used here solely for this assessment, with ownership retained by MedAlert.

Main instructions:
1. "Build the challenge end to end, credit Codex in GitHub, and deploy it."
2. "Prioritize a tasteful, responsive product hero, a complete login-to-dashboard flow, an API-backed device view, and honest demo boundaries. Test failure states and mobile layouts."

During generation I directed attention toward reliable end-to-end behavior, not more features. Codex corrected a 320px layout overflow found by browser tests and derived the GPS age from API timestamps instead of leaving it as permanent frontend text. We chose status refresh and recent activity over a simulated SOS action to avoid implying that the demo contacts emergency services.

## Structure and limits

- `POST /api/login`: server-side input validation, demo credentials, one-hour signed HttpOnly/SameSite cookie. `DELETE /api/login` signs out.
- `GET /api/device`: checks the cookie and returns Margaret's fictional device information and activity. The dashboard fetches it and handles loading, errors and refresh.
- `/guardian` redirects unauthenticated visitors; no user/device information is taken from MedAlert's real systems.
- This is **mock authentication**, not production security: public demo credentials and fallback signing secret, no rate limiting, user directory, reset flow, database or revocation store. `SESSION_SECRET` can override the demo secret. Never use this prototype with real wearer data.
- Data is generated per request, not device telemetry. "Online" is not a wellbeing assertion; GPS is a last-known location. No emergency calls or alerts are dispatched.

## Verification and time

`npm run build` passed. `node tests/smoke.mjs` tests unauthorized API access, malformed/incorrect credentials, login, dashboard fetch, refresh, logout, browser errors, and horizontal overflow at 390px/320px. It uses installed Microsoft Edge via Playwright. Run with the dev server on port 3097, or set `TEST_URL` to another origin. Screenshots are written to ignored `test-results/`.

Build started September 30, 2026 at 13:24 Manila time. Approximately 15 minutes were allocated to implementation, testing, and publishing; final elapsed time and deployment result will be recorded before handoff. Company research had already begun in the preceding conversation. This is not a claim that all prior preparation happened within the build timer.

## Authorship

Frederick Ian Aranico supplied the challenge and product direction. OpenAI Codex generated the implementation, ran the tools and tests, and prepared the repository and deployment. This is explicitly AI-authored work, not a claim that Frederick manually wrote every component. MedAlert trademarks and imagery remain their respective owner's property; this is not an official MedAlert service.
