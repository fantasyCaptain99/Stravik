import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail, verifyTurnstile, isEmailConfigured } from "@/lib/email";

/**
 * Contact form endpoint.
 *
 * Order of checks matters: honeypot first (cheapest), then schema, then the
 * Turnstile network call, then delivery. Each failure returns an honest
 * status — the client never shows success for an undelivered message.
 */

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a filled hidden field means a bot. Return 200 so the bot does
  // not learn it was detected, but send nothing.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const humanVerified = await verifyTurnstile(data.turnstileToken);
  if (!humanVerified) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  // Be explicit when email is not wired up rather than faking a success.
  if (!isEmailConfigured()) {
    console.warn(
      "[contact] Submission received but email is not configured. " +
        "Set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Our contact form isn't connected to email yet. Please reach out directly in the meantime.",
        reason: "not_configured",
      },
      { status: 503 },
    );
  }

  const result = await sendContactEmail(data);

  if (!result.ok) {
    console.error("[contact] Send failed:", result.detail ?? result.reason);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong sending your message. Please try again, or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
