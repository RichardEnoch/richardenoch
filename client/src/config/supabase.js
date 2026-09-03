// src/config/supabase.js
//
// The site's datastore, reached over PostgREST with plain fetch.
//
// No client library. @supabase/supabase-js is ~120 kB for what amounts to
// two REST calls, and the auth and realtime machinery inside it is not used
// here — the site has no accounts and nothing to subscribe to.
//
// The anon key is meant to be public. It grants exactly what row-level
// security allows and nothing else, which for this project is: insert a
// testimonial, insert a booking request, read the testimonials that are
// published. The rules live in supabase/schema.sql and are enforced by the
// database, not by this file — a client-side rule is a suggestion.

const URL = import.meta.env.VITE_SUPABASE_URL || "";
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

/* Both must be present. Without them every call below refuses rather than
   firing a request that would 401, so callers can offer something sensible
   instead of showing an error nobody can act on. */
export const isConfigured = Boolean(URL && ANON);

const base = String(URL).replace(/\/+$/, "");

const headers = (extra) => ({
  apikey: ANON,
  Authorization: `Bearer ${ANON}`,
  "Content-Type": "application/json",
  ...extra,
});

/* Timeouts, because a hanging fetch is worse than a failed one: the person
   is left watching a spinner with no way to tell whether it is working. */
const withTimeout = async (run, ms = 8000) => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await run(ctrl.signal);
  } finally {
    clearTimeout(timer);
  }
};

export async function insert(table, row) {
  if (!isConfigured) throw new Error("supabase-not-configured");
  return withTimeout(async (signal) => {
    const res = await fetch(`${base}/rest/v1/${table}`, {
      method: "POST",
      signal,
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      throw new Error(`insert ${table} failed: ${res.status}`);
    }
    return true;
  });
}

export async function select(table, query) {
  if (!isConfigured) throw new Error("supabase-not-configured");
  return withTimeout(async (signal) => {
    const res = await fetch(`${base}/rest/v1/${table}?${query}`, {
      signal,
      headers: headers(),
    });
    if (!res.ok) throw new Error(`select ${table} failed: ${res.status}`);
    return res.json();
  });
}
