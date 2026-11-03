import { useState } from "react";
import { WEB3FORMS_KEY } from "../config/contact";
import { useLanguage } from "../i18n";
import type { Property } from "../types/Property";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type SubmitState = "idle" | "submitting" | "success" | "error" | "not-configured";

/**
 * Email contact form for a single property, submitted to Web3Forms. Includes
 * a hidden field identifying the property (id + title) so inquiries arrive
 * with context. Renders even when Web3Forms isn't configured — submitting
 * in that case surfaces a friendly "not configured" state instead of
 * crashing or calling the API with an empty key.
 */
const ContactForm = ({ property }: { property: Property }) => {
  const { language, t } = useLanguage();
  const translation = property.translations[language];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    `${t("contactSectionTitle")} ${translation.title}`,
  );
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!WEB3FORMS_KEY) {
      setState("not-configured");
      return;
    }

    setState("submitting");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email,
          message,
          name,
          property_id: property.id,
          property_title: translation.title,
          subject: `New inquiry: ${translation.title}`,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const result = (await response.json()) as { success?: boolean };

      if (response.ok && result.success) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <p className="rounded-md border border-line bg-surface-muted p-4 text-sm text-ink">
        {t("contactFormSuccess")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="hidden" name="property_id" value={property.id} />
      <input type="hidden" name="property_title" value={translation.title} />

      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
          {t("contactFormName")}
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t("contactFormNamePlaceholder")}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
          {t("contactFormEmail")}
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("contactFormEmailPlaceholder")}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
          {t("contactFormMessage")}
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-600">{t("contactFormError")}</p>
      )}
      {state === "not-configured" && (
        <p className="text-sm text-red-600">{t("contactFormNotConfigured")}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-block rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-contrast transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? t("contactFormSubmitting") : t("contactFormSubmit")}
      </button>
    </form>
  );
};

export default ContactForm;
