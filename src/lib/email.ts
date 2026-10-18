import { Resend } from "resend";
import type { ContactInput } from "./validation";

/**
 * Email delivery via Resend.
 *
 * Critically: when the service is not configured this returns an explicit
 * failure. It never reports success for a message that was not sent — a
 * silent drop is worse than an honest error, because the sender believes
 * they have made contact.
 */

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed"; detail?: string };

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.CONTACT_TO_EMAIL,
  );
}

export async function sendContactEmail(data: ContactInput): Promise<SendResult> {
  if (!isEmailConfigured()) {
    return { ok: false, reason: "not_configured" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Service", data.service || "—"],
    ["Budget", data.budget || "—"],
    ["Timeline", data.timeline || "—"],
  ];

  const text = [
    "New project inquiry via stravik.com",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px;color:#061511">
      <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#15A67B;margin:0 0 16px">
        New project inquiry
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 16px 8px 0;color:#81958C;white-space:nowrap;vertical-align:top">${k}</td>
              <td style="padding:8px 0;border-bottom:1px solid #D9E8E0">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:24px 0 8px;color:#81958C;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Message</p>
      <div style="white-space:pre-wrap;line-height:1.6;font-size:15px">${escapeHtml(data.message)}</div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: data.email,
      subject: `New inquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text,
      html,
    });

    if (error) {
      return { ok: false, reason: "send_failed", detail: error.message };
    }

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: "send_failed",
      detail: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

/** Verify a Cloudflare Turnstile token server-side. */
export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Not configured — skip the check rather than blocking all submissions.
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
