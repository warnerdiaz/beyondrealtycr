/**
 * Single source of truth for lead-capture contact configuration. Reads from
 * Vite env vars (set in `.env.local` / hosting provider) with clearly-marked
 * placeholder fallbacks so the app builds and runs without any real
 * secrets. See `.env.example` for the variables an operator must set in
 * production.
 */

/** WhatsApp number in international format, digits only (no "+", spaces, or dashes). */
export const WHATSAPP_PHONE: string =
  import.meta.env.VITE_WHATSAPP_PHONE ?? "50600000000";

/** Web3Forms access key used by the contact form. Empty string = not configured. */
export const WEB3FORMS_KEY: string = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

/** Fallback contact email shown/used alongside WhatsApp + the form. */
export const CONTACT_EMAIL: string =
  import.meta.env.VITE_CONTACT_EMAIL ?? "beyondrealtycr@outlook.com";
