# PROMPT FOR CLAUDE CODE — Integrate "Book a Plan" questionnaire into RichPort

HOW TO RUN THIS HANDS-OFF (do this before pasting the prompt):
Launch Claude Code from the RichPort repo root with all permission prompts disabled:

    claude --dangerously-skip-permissions

This is "bypass permissions" mode — no approval prompts at all. It's appropriate here
because this is your own trusted repo on your own machine. (Safer alternative if you
prefer some guardrails: create `.claude/settings.json` in the repo with
`{ "permissions": { "allow": ["Bash(npm:*)", "Bash(npx:*)", "Bash(node:*)", "Bash(git:*)", "Bash(ls:*)", "Bash(mkdir:*)", "Bash(cat:*)", "Edit(*)", "Write(*)", "Read(*)"] } }`
— that auto-approves the common operations and only prompts for anything unusual.)

Copy everything below this line into Claude Code.

---

## Context

My portfolio **RichPort** (rich-port.vercel.app) is a MERN app:
- **Client:** Vite + React + Tailwind
- **Server:** Express + MongoDB (Mongoose) + Cloudinary

I have a standalone file, `book-a-plan.html`, placed in the repo root. It is a complete,
working multi-step booking questionnaire (plan selection → 5 questionnaire sections →
review → submit) with its own vanilla JS. **Treat it as the source of truth for content,
flow, logic, and copy** — your job is to port it into the React app properly and build
the backend that powers it. Do not redesign the questions, the step order, or the copy.

## Design system rules (NON-NEGOTIABLE: the form must look native to the portfolio)

The `/book` page must be indistinguishable from the rest of RichPort — same tokens,
same components, same spacing rhythm. Inspect existing pages first and reuse before
writing any new styles.

- Font: **Outfit** (already used across the site). Script accents: Great Vibes (logo style).
- Dark theme: near-black backgrounds, neon green accent `#b9ff2c`, purple accent `#c4a7ff`
  for highlighted values, muted greys for secondary text. Reuse the exact color tokens /
  Tailwind config already in the codebase — inspect existing components (e.g. the Rate
  Card page) and match them rather than inventing new values.
- **Buttons and inputs use ROUNDER corners (~10px radius), NOT fully-rounded pills.**
- Reuse existing button, card, and section components where they exist. The HTML file's
  styling approximates the system; where it differs from existing components, the
  existing components win.

## Task 1 — Frontend: port the form into React

1. Create a route `/book` (page component, e.g. `BookPlan.jsx`) that reproduces the
   `book-a-plan.html` experience:
   - Reads `?plan=silver|gold|platinum` from the URL. If present, pre-select that plan
     and land on the plan step with it highlighted (user can still change).
   - Multi-step flow with the sticky progress bar, autosave to localStorage,
     review screen with per-section "Edit" jumps, and required-field validation
     (email, phone, brand name only).
   - **Plans without a website (Silver) skip the Website section entirely** and section
     numbers renumber — this logic exists in the HTML file; preserve it.
   - The success overlay with dynamic next steps (exactly as in the HTML).
2. Wire the **Rate Card page**: every "Book this plan" CTA navigates to
   `/book?plan=<plan-key>`.
3. Move the plan/deliverables data into a single shared config module
   (`src/config/plans.js` or similar) imported by both the Rate Card and the form, so
   plans are defined ONCE. Use the `CONFIG.PLANS` + `CONFIG.PRICING` objects in the
   HTML file as the data source.
4. **Pricing model — USD source of truth, converted to NGN.** Plan prices are the
   rate-card USD figures (Silver $150, Gold $350, Platinum $450). NGN display price =
   USD x exchange rate, rounded to the nearest 1,000. The HTML file implements this
   exactly (`planPrice`, `fetchLiveRate`): a `RATE_OVERRIDE` pins the rate (currently
   1285.72 so Gold = NGN 450,000 as quoted to the current client); when override is
   null, fetch the live rate from `https://open.er-api.com/v6/latest/USD` with a
   configured fallback. Port this logic as-is. Show the USD price as a secondary
   reference on plan cards, and print the rate used on the invoice.
5. Keep a `duration` question (client's *preferred* duration) — it is informational;
   final timeline is confirmed by me. Do not present it as a commitment.

6. **Plan badges:** the Silver/Gold/Platinum badge images already exist in the repo's
   **"Extra" folder** — locate it (search the repo for the folder/asset names), import
   the matching badge per plan, and use it on the plan-selection cards (replacing the
   text-only card header) and on the success screen. Use the appropriate badge for the
   plan — do not generate new badge graphics.

## Task 2 — Backend: questionnaire endpoint + email delivery

Create `POST /api/questionnaire` on the Express server:

1. **Validate** body (email, phone, brand_name, plan key required; reject unknown plan
   keys; sanitize strings).
2. **Recompute money server-side.** Never trust price/deposit/rate from the client
   payload — keep a server-side copy of the USD prices + the same conversion logic
   (RATE_OVERRIDE / live fetch with fallback, rounded to nearest 1,000), recompute the
   NGN price, `deposit = 70%`, `balance = 30%`, and **store the rate and USD price used
   on the booking record** so every invoice is auditable.
3. **Invoice numbering:** maintain a counter collection (e.g. `counters`) and issue
   sequential invoice numbers in my existing format `000-00X` (next is **000-004**;
   confirm with me at integration time). Store the assigned number on the record.
4. **Persist** to MongoDB in a `questionnaires` collection: full responses, plan
   snapshot (label, price, deliverables at time of booking), invoice number, timestamps,
   status field (`submitted` → later `deposit_received`, `in_progress`, `delivered`).
5. **Send two emails** (Nodemailer with Gmail App Password, or Resend if a key is
   provided — put credentials in env vars, never in code):
   - **To the client:** greeting → NEXT STEPS box (pay 70% deposit → send proof of
     payment to WhatsApp 0903 852 2066 → project begins once acknowledged) → dynamic
     invoice (plan-aware: hosting/domain "billed separately" line only for plans with a
     website) → dynamic Terms of Agreement → full copy of their responses.
   - **To me** (enochrichard6@gmail.com): "NEW BOOKING" subject with plan + brand name →
     summary line (name, contacts, preferred duration, amounts, invoice no.) → full
     responses → invoice copy → **a raw JSON block of the entire submission** so I can
     paste it straight into a Claude session when starting the project.
   - Optionally include the plan badge image in the emails: upload the badge PNGs from
     the "Extra" folder to Cloudinary once and reference the absolute URLs (email
     clients can't load local/bundled assets). Skip if it adds friction.
   - The HTML file contains complete, working email template builders
     (`buildClientEmail`, `buildOwnerEmail`, `buildInvoiceHTML`, `buildTermsHTML`,
     `buildResponsesHTML`). **Port these to the server** (email-client-safe inline
     styles, table-based, light background — keep them that way; dark-theme emails
     render unreliably).
6. **Terms content is plan-dynamic** (already implemented in `buildTermsHTML`):
   scope list = plan deliverables; revision count varies by plan (Silver 2, Gold 3,
   Platinum as-required); hosting/domain clause only for website plans; timeline clause
   states the client's preferred duration and that the final timeline is confirmed by
   me after review; 70/30 payment terms; files clause (exports + website source code
   only, no editable design files); IP transfers on full payment with my portfolio
   rights retained; deposit non-refundable once work begins; payment of deposit =
   acceptance.
7. Respond `200 { ok: true, invoice_no }` — the frontend success overlay uses it.
8. Add basic abuse protection: rate-limit the endpoint (e.g. express-rate-limit,
   5/hour/IP) and a honeypot field.

## Task 3 — Cleanup & wiring

- In the ported React form, replace the HTML file's `CONFIG.ENDPOINT` logic with a
  direct call to `/api/questionnaire`; remove the EmailJS branch entirely (that was a
  stopgap for the standalone file).
- Keep the localStorage draft clearing on successful submit.
- Add a minimal `/admin/bookings` protected view ONLY if trivial with existing auth;
  otherwise skip — the email + DB record is enough for now.

## Env vars to add (ask me for values)

```
MAIL_PROVIDER=gmail            # or resend
GMAIL_USER=enochrichard6@gmail.com
GMAIL_APP_PASSWORD=...
# or RESEND_API_KEY=...
```

## Acceptance checklist (verify all before finishing)

- [ ] Rate Card "Book this plan" → `/book?plan=X` with plan pre-selected
- [ ] Silver flow has NO website section; Gold/Platinum do; numbering adjusts
- [ ] Refresh mid-form restores answers (localStorage)
- [ ] Submit stores record in MongoDB with sequential invoice number
- [ ] Client receives email: next steps + invoice + terms + responses, all matching the
      selected plan and amounts (70/30 of server-side price)
- [ ] I receive the owner email including the raw JSON block
- [ ] Prices derive from USD x rate in exactly one shared config (client) + one server
      config; rate pinned via RATE_OVERRIDE = 1285.72 unless I say otherwise; rate and
      USD price stored on each booking
- [ ] Plan badges from the "Extra" folder appear on plan cards (correct badge per plan)
- [ ] Buttons/inputs use ~10px corner radius and match existing site components
- [ ] No secrets committed; env vars documented in `.env.example`
