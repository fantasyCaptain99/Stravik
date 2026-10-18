"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Loader2, Check, AlertCircle, ArrowUpRight } from "lucide-react";
import { contactSchema, BUDGET_OPTIONS, TIMELINE_OPTIONS, type ContactInput } from "@/lib/validation";
import { serviceOptions } from "@/data/services";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "", budget: "", timeline: "", website: "" },
  });

  // Pre-select the service when arriving from /services?service=…
  useEffect(() => {
    const s = params.get("service");
    if (s && (serviceOptions as readonly string[]).includes(s)) {
      setValue("service", s);
    }
  }, [params, setValue]);

  // Load Turnstile only when a site key is configured.
  useEffect(() => {
    if (!SITE_KEY || !turnstileRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      if (!turnstileRef.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: SITE_KEY,
        theme: "dark",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
      });
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const onSubmit = async (values: ContactInput) => {
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });

      const payload = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !payload.ok) {
        setStatus({
          kind: "error",
          message: payload.error ?? "Something went wrong. Please try again.",
        });
        if (window.turnstile && widgetId.current) {
          window.turnstile.reset(widgetId.current);
          setToken("");
        }
        return;
      }

      setStatus({ kind: "success" });
      reset();
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach the server. Please check your connection and try again.",
      });
    }
  };

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 border border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)] p-9"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]">
          <Check className="h-6 w-6 text-[var(--color-ink)]" strokeWidth={2} aria-hidden="true" />
        </span>
        <h2 className="text-[length:var(--text-card)] font-semibold tracking-[-0.03em]">
          Message sent.
        </h2>
        <p className="max-w-[46ch] text-[0.98rem] leading-[1.65] text-[var(--color-muted)]">
          Thanks for getting in touch — we&rsquo;ve received your message and
          will reply shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="font-[family-name:var(--font-mono)] text-[0.8125rem] uppercase tracking-[0.14em] text-[var(--color-mint)] underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
      {/* Honeypot — visually hidden, not display:none, so bots still see it */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name?.message} required>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputCls(!!errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Work email" name="email" error={errors.email?.message} required>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputCls(!!errors.email)}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Company" name="company" error={errors.company?.message} optional>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className={inputCls(!!errors.company)}
            {...register("company")}
          />
        </Field>

        <Field label="Service" name="service" error={errors.service?.message} optional>
          <select id="service" className={inputCls(!!errors.service)} {...register("service")}>
            <option value="">Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Estimated budget" name="budget" optional>
          <select id="budget" className={inputCls(false)} {...register("budget")}>
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Timeline" name="timeline" optional>
          <select id="timeline" className={inputCls(false)} {...register("timeline")}>
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Project description"
        name="message"
        error={errors.message?.message}
        required
        hint="What are you building, and what problem does it solve?"
      >
        <textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={cn(inputCls(!!errors.message), "resize-y")}
          {...register("message")}
        />
      </Field>

      {/* Consent */}
      <div className="flex flex-col gap-2">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
            {...register("consent")}
          />
          <span className="text-[0.9rem] leading-[1.55] text-[var(--color-muted)]">
            I agree that Stravik may store and use the details above to respond
            to my enquiry, as described in the{" "}
            <a href="/privacy" className="text-[var(--color-mint)] underline underline-offset-4">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="flex items-center gap-1.5 text-[0.825rem] text-[#ff8a80]">
            <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      {SITE_KEY && <div ref={turnstileRef} className="min-h-[65px]" />}

      {/* Submission-level error */}
      {status.kind === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-[#ff8a80]/40 bg-[#ff8a80]/8 px-5 py-4"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a80]" strokeWidth={1.5} aria-hidden="true" />
          <p className="text-[0.9rem] leading-[1.55] text-[#ffb4ab]">{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-2 inline-flex w-fit items-center gap-4 self-start rounded-full bg-[var(--color-ink)] py-2 pr-2 pl-6 font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <span className="flex size-9 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-mint)]">
              <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </>
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your message." : ""}
      </p>
    </form>
  );
}

function inputCls(invalid: boolean): string {
  return cn(
    "w-full rounded-2xl border bg-white px-4 py-3.5 text-[0.98rem] text-[var(--color-ink)] outline-none transition-colors duration-300",
    "placeholder:text-[color-mix(in_srgb,var(--color-ink)_35%,transparent)]",
    invalid
      ? "border-[#c44848] focus:border-[#c44848] focus:ring-2 focus:ring-[#c44848]/30"
      : "border-[var(--color-rule)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]",
  );
}

function Field({
  label,
  name,
  error,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="flex items-baseline gap-2 text-sm font-medium text-[var(--color-ink)]"
      >
        {label}
        {required && <span className="text-[var(--color-primary)]" aria-hidden="true">*</span>}
        {optional && <span className="text-[var(--color-muted)] normal-case tracking-normal">(optional)</span>}
      </label>

      {children}

      {hint && !error && (
        <p id={`${name}-hint`} className="text-[0.825rem] text-[var(--color-muted)]">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${name}-error`} className="flex items-center gap-1.5 text-[0.825rem] text-[#ff8a80]">
          <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
