import { z } from "zod";
import { serviceOptions } from "@/data/services";

/**
 * Contact form schema — shared by the client form and the server route.
 * Validating with the same schema on both sides means the client cannot
 * submit something the server would reject for a different reason.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),

  company: z.string().trim().max(120, "That company name is too long.").optional(),

  service: z
    .enum(serviceOptions as unknown as [string, ...string[]])
    .optional()
    .or(z.literal("")),

  budget: z.string().trim().max(60).optional(),

  timeline: z.string().trim().max(60).optional(),

  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more — at least 20 characters.")
    .max(5000, "That message is too long. Please keep it under 5000 characters."),

  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy notice to continue." }),
  }),

  /**
   * Honeypot — must stay empty. Bots fill every field they find.
   *
   * Deliberately NOT constrained here: if the schema rejected a filled
   * honeypot, the response would tell the bot it had been detected. The
   * route accepts the submission, discards it, and returns a normal success.
   */
  website: z.string().optional(),

  /** Cloudflare Turnstile token, when the widget is configured. */
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const BUDGET_OPTIONS = [
  "Under £10k",
  "£10k – £25k",
  "£25k – £50k",
  "£50k – £100k",
  "£100k+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Still exploring",
] as const;
