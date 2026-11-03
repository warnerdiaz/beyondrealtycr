import type { Language } from "../i18n";
import type { Property } from "../types/Property";

/**
 * Pure, dependency-free WhatsApp click-to-chat URL builder. No React, no
 * I/O — safe to unit test directly and reuse from the detail page button.
 */

/** Localized, property-specific inquiry message templates. */
const MESSAGE_TEMPLATES: Record<Language, (title: string, location: string) => string> = {
  en: (title, location) =>
    `Hi, I'm interested in the property: ${title} (${location}).`,
  es: (title, location) =>
    `Hola, me interesa la propiedad: ${title} (${location}).`,
};

/** Strips everything but digits from a phone number, e.g. "+506 6000-0000" -> "50660000000". */
function toDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Builds a `https://wa.me/<digits>?text=<encoded message>` URL prefilled
 * with a localized, property-specific inquiry message referencing the
 * property's title and location in the active language.
 */
export function buildWhatsAppUrl(
  phone: string,
  property: Property,
  lang: Language,
): string {
  const { title, location } = property.translations[lang];
  const message = MESSAGE_TEMPLATES[lang](title, location);
  const digits = toDigits(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
