// src/pages/TestimonialPage.jsx — public "leave a testimonial" form
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageMeta from "../components/common/PageMeta";
import {
  Button,
  Input,
  Textarea,
  Select,
  Label,
  Field,
  buttonClasses,
} from "../components/ui";
import { fetchJson } from "../api/http";
import { TESTIMONIAL_SERVICES } from "../data/testimonialOptions";
import { OWNER } from "../config/plans";

const StarButton = ({ filled, onClick, onHover, onLeave }) => (
  <button
    type="button"
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className="p-1 transition-transform hover:scale-110"
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill={filled ? "#84cc16" : "rgba(255,255,255,0.12)"}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  </button>
);

const deriveInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 4);

const TestimonialPage = () => {
  const hpRef = useRef(null);
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [initialsTouched, setInitialsTouched] = useState(false);
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  /* The API this form posts to is not currently running. Rather than lose
     someone's words to a "please try again", a failed post hands them the
     testimonial they just wrote, addressed and ready to send. */
  const [handoff, setHandoff] = useState(false);

  const composed = [
    "Testimonial for Richard Enoch",
    "",
    `Name: ${name.trim() || "—"}`,
    `Project: ${service || "—"}`,
    `Rating: ${rating}/5`,
    "",
    feedback.trim(),
  ].join("\n");

  const waHref = `https://wa.me/${OWNER.whatsappIntl}?text=${encodeURIComponent(composed)}`;
  const mailHref = `mailto:${OWNER.email}?subject=${encodeURIComponent(
    "Testimonial for Richard Enoch",
  )}&body=${encodeURIComponent(composed)}`;

  const onNameChange = (v) => {
    setName(v);
    if (!initialsTouched) setInitials(deriveInitials(v));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!initials.trim()) return setError("Please enter your initials.");
    if (!service) return setError("Please pick the project we worked on.");
    if (!rating) return setError("Please pick a star rating.");
    if (!feedback.trim())
      return setError("Please write a few words of feedback.");

    setSubmitting(true);
    try {
      await fetchJson("/api/testimonials", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          initials: initials.trim().toUpperCase(),
          service,
          rating,
          feedback: feedback.trim(),
          _hp: hpRef.current?.value || "",
        }),
      });
      setDone(true);
    } catch {
      /* No error message. The words are written; the job now is to get them
         delivered, not to tell someone their effort failed. */
      setHandoff(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 pt-28 pb-24">
      <PageMeta
        title="Leave a Testimonial"
        description="Worked with Richard Enoch? Share how it went — your feedback shapes the studio."
        url="/testimonial"
      />

      <div className="mx-auto max-w-[560px]">
        {handoff ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface card-surface-lg px-8 py-12"
          >
            <h1 className="type-h1 text-white">One more tap</h1>
            <p className="type-measure mt-4 text-[15px] leading-[1.6] text-white/55">
              Your testimonial is written and ready — it just needs sending.
              Either button below opens with the whole thing already filled in.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses("primary", "md", "flex-1")}
              >
                Send on WhatsApp
              </a>
              <a
                href={mailHref}
                className={buttonClasses("secondary", "md", "flex-1")}
              >
                Send by email
              </a>
            </div>

            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(composed)}
              className="mt-5 text-[14px] text-white/40 underline-offset-4 transition-colors hover:text-lime-400 hover:underline"
            >
              Or copy it and send however you like
            </button>

            <pre className="mt-8 max-h-52 overflow-auto whitespace-pre-wrap rounded-2xl bg-white/[0.03] p-5 text-[13px] leading-[1.6] text-white/50">
              {composed}
            </pre>
          </motion.div>
        ) : done ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-lime-400/30 bg-[#0d0f12] px-8 py-14 text-center"
          >
            <div className="mx-auto mb-6 flex h-[74px] w-[74px] items-center justify-center rounded-full border-2 border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 stroke-lime-400"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Thank you!</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-white/55">
              Your feedback means a lot — it's what keeps this studio growing.
            </p>
            <Link
              to="/"
              className={buttonClasses(
                "primary",
                "lg",
                "mt-8 inline-flex items-center gap-1",
              )}
            >
              Back to home →
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-lime-400 mb-4">
              Feedback
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-[-0.02em]">
              How was it,{" "}
              <span className="text-lime-400">working together?</span>
            </h1>
            <p className="mt-3 mb-10 text-[15px] leading-[1.65] text-white/50">
              A minute of your time, and your words help the next client take
              the leap.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* honeypot */}
              <input
                ref={hpRef}
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
                <Field label="Name (optional)">
                  <Input
                    value={name}
                    placeholder="Your name"
                    maxLength={80}
                    onChange={(e) => onNameChange(e.target.value)}
                  />
                </Field>
                <Field label="Initials *">
                  <Input
                    value={initials}
                    placeholder="e.g. DA"
                    maxLength={4}
                    onChange={(e) => {
                      setInitialsTouched(true);
                      setInitials(e.target.value.toUpperCase());
                    }}
                  />
                </Field>
              </div>

              <Field label="The project we worked on *">
                <Select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {TESTIMONIAL_SERVICES.map((s) => (
                    <option
                      key={s}
                      value={s}
                      className="bg-[#111318] text-white"
                    >
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>

              <div>
                <Label>Rating *</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <StarButton
                      key={n}
                      filled={n <= (hoverRating || rating)}
                      onClick={() => setRating(n)}
                      onHover={() => setHoverRating(n)}
                      onLeave={() => setHoverRating(0)}
                    />
                  ))}
                  {rating > 0 && (
                    <span className="ml-3 text-[13px] text-white/40">
                      {rating} / 5
                    </span>
                  )}
                </div>
              </div>

              <Field label="Your feedback *">
                <Textarea
                  value={feedback}
                  maxLength={1200}
                  placeholder="What was the experience like? What did the work do for you?"
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Field>

              {error && (
                <p className="rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-[13px] text-orange-300">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {submitting ? "Sending…" : "Submit testimonial"}
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestimonialPage;
