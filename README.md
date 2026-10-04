# Top Reach Pro landing page

Next.js landing page with a Neon-backed registration form, WhatsApp handoff, and private team dashboard.

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `ADMIN_SLUG`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET`. A configured local `.env.local` already exists in this workspace and is gitignored.
3. Run the SQL in `db/schema.sql` against Neon. This has already been applied to the provided database.
4. Run `npm run dev` and open `http://localhost:3000`.

## Admin access

Open `/team/<ADMIN_SLUG>` and enter the admin email and password. The route is intentionally absent from public navigation. A successful login sets a signed, HTTP-only, SameSite=Strict cookie for seven days. Use **Download CSV** to save the complete current list.

To change the password, generate a new salt and scrypt hash, then replace `ADMIN_PASSWORD_HASH`. Replacing it invalidates existing sessions. Changing `SESSION_SECRET` also invalidates sessions.

## Registration handoff

After a successful registration, the thank-you page offers a WhatsApp group invite and automatically opens it after eight seconds. The student's name is kept in session storage for this one handoff and is removed when the thank-you page loads. WhatsApp group invite links cannot prefill a message in the group chat, so the page offers a separate copy button for the personalized introduction.

## Deployment

Use a Next.js-capable Node or serverless host. Set the five environment variables on the host; never commit `.env.local`. Run over HTTPS so production session cookies are secure. The supplied videos are served from `public/media`; move them to an object storage or video CDN if bandwidth grows.

## Content awaiting confirmation

- Confirm which supplied video is the introduction and which is the community story.
- Confirm the exact wording and evidence for the 45-day income statement.
- Supply a public contact address and privacy/retention policy for production use.
