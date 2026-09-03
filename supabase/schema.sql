-- richPort — database schema
--
-- Paste this whole file into the Supabase SQL editor and run it once.
-- It is safe to run again: every statement is guarded.
--
-- Two tables, both written by anonymous visitors and both protected by
-- row-level security rather than by anything in the front end. The rules
-- that matter are here, in the database, where a person holding the public
-- anon key cannot argue with them.

-- ══════════════════════════════════════════════════════════════════════
-- TESTIMONIALS
--
-- A visitor leaves one at /testimonial. Three stars and above appear on the
-- site straight away; one and two stars are stored and never shown.
--
-- `published` is a GENERATED column, so that rule is a property of the row
-- rather than a decision made at write time. Posting `published: true`
-- alongside a one-star rating is not possible — Postgres computes the
-- column itself and rejects any attempt to supply it.
-- ══════════════════════════════════════════════════════════════════════

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  name        text,
  initials    text not null,
  service     text not null,
  rating      smallint not null,
  feedback    text not null,

  -- Set this true to pull a published testimonial down without deleting it.
  hidden      boolean not null default false,

  published   boolean generated always as (rating >= 3 and not hidden) stored,

  constraint testimonials_rating_range   check (rating between 1 and 5),
  constraint testimonials_initials_len   check (char_length(initials) between 1 and 4),
  constraint testimonials_service_len    check (char_length(service) between 1 and 60),
  constraint testimonials_name_len       check (name is null or char_length(name) <= 80),
  -- A floor and a ceiling on the text. The floor turns away one-word
  -- submissions; the ceiling stops anyone pasting an essay onto the homepage.
  constraint testimonials_feedback_len   check (char_length(feedback) between 20 and 1200)
);

create index if not exists testimonials_published_idx
  on public.testimonials (published, created_at desc);

alter table public.testimonials enable row level security;

drop policy if exists "anyone may leave a testimonial" on public.testimonials;
create policy "anyone may leave a testimonial"
  on public.testimonials for insert to anon
  with check (true);

-- The only rows the public can read are the published ones. A one-star
-- review is invisible to the site and to anyone holding the anon key; it is
-- readable in the Supabase dashboard, which is where you want it.
drop policy if exists "only published testimonials are readable" on public.testimonials;
create policy "only published testimonials are readable"
  on public.testimonials for select to anon
  using (published);

-- ══════════════════════════════════════════════════════════════════════
-- BOOKING REQUESTS
--
-- The brand questionnaire, the website brief and the flyer pack form all
-- land here. The answers go in as jsonb rather than as columns: the three
-- forms ask different questions, those questions change, and a schema
-- migration every time a question is reworded is a poor trade for a form
-- that gets a few submissions a month.
--
-- Write-only for the public. Nobody can read what anyone else submitted.
-- ══════════════════════════════════════════════════════════════════════

create table if not exists public.booking_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  service     text not null,          -- brand | website | flyer
  plan        text,                   -- gold, business, five, …
  name        text,
  email       text,
  answers     jsonb not null default '{}'::jsonb,

  constraint booking_service_valid check (service in ('brand', 'website', 'flyer')),
  constraint booking_email_len     check (email is null or char_length(email) <= 160)
);

create index if not exists booking_requests_created_idx
  on public.booking_requests (created_at desc);

alter table public.booking_requests enable row level security;

drop policy if exists "anyone may submit a booking" on public.booking_requests;
create policy "anyone may submit a booking"
  on public.booking_requests for insert to anon
  with check (true);

-- Deliberately no select policy. With RLS on and no policy granting it,
-- reads are refused, so the anon key cannot enumerate other people's briefs
-- and contact details. Read them in the dashboard.
