// src/api/testimonials.js
//
// Someone fills the form, and a three-, four- or five-star testimonial
// appears on the site. One and two stars are kept but never shown.
//
// The star rule is not applied here. `published` is a generated column in
// Postgres — `rating >= 3 AND NOT hidden` — and the read policy only returns
// published rows, so the rule holds no matter what is posted to the API.
// Anything this file did instead would be a client-side suggestion that a
// person with the anon key could ignore.

import { insert, select, isConfigured } from "../config/supabase";

export { isConfigured };

const TABLE = "testimonials";

/* The shape the scroll-stack renders. Kept identical to the objects that
   used to be hard-coded in Testimonials.jsx, so the display code did not
   have to change when the data started arriving from elsewhere. */
const toCard = (row) => ({
  id: row.id,
  name: row.name || row.initials,
  initials: row.initials,
  title: row.service,
  tag: row.service,
  stars: row.rating,
  text: row.feedback,
});

export async function submitTestimonial({
  name,
  initials,
  service,
  rating,
  feedback,
}) {
  await insert(TABLE, {
    name: name || null,
    initials,
    service,
    rating,
    feedback,
  });
  /* Below three stars the row is stored and stays invisible. The person is
     thanked either way — telling someone their feedback was filtered is a
     worse experience than simply receiving it. */
  return { willPublish: rating >= 3 };
}

export async function fetchPublished() {
  if (!isConfigured) return [];
  const rows = await select(
    TABLE,
    "select=id,name,initials,service,rating,feedback,created_at" +
      "&order=created_at.desc" +
      "&limit=8",
  );
  return rows.map(toCard);
}
