// src/api/bookings.js
//
// Where the brand questionnaire, the website brief and the flyer pack form
// end up.
//
// All three used to POST to the Render backend. That service has been retired
// and answers 503, so a client could complete a seven-step questionnaire and
// watch it fail at the last screen. Now they land in Supabase.
//
// The answers go in as one jsonb blob rather than as columns. The three forms
// ask different questions, the questions get reworded, and a schema migration
// per reworded question is a bad trade for a form with a handful of
// submissions a month. Read them in the dashboard.

import { insert } from "../config/supabase";

const TABLE = "booking_requests";

/* Pull the contact details up into their own columns, so the dashboard is
   scannable without opening every blob to find out who sent it. */
const pickName = (a) =>
  a.full_name || a.name || a.contact_name || a.brand_name || null;
const pickEmail = (a) => a.email || a.contact_email || null;

export async function submitBooking({ service, plan, answers }) {
  const a = answers || {};
  await insert(TABLE, {
    service,
    plan: plan || null,
    name: pickName(a),
    email: pickEmail(a),
    answers: a,
  });
  return true;
}
