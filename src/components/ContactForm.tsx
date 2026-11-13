import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { notifyContactOwner } from "@/lib/contact-email.functions";

const satisfactionOptions = [
  { value: 1, emoji: "😞", label: "Très insatisfait" },
  { value: 2, emoji: "🙁", label: "Insatisfait" },
  { value: 3, emoji: "😐", label: "Moyen" },
  { value: 4, emoji: "🙂", label: "Satisfait" },
  { value: 5, emoji: "😄", label: "Très satisfait" },
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Indiquez votre nom").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(30).optional(),
  request_type: z.enum(["prestation", "accompagnement", "formation"]),
  message: z.string().trim().min(1, "Décrivez votre besoin").max(2000),
  satisfaction: z.number().int().min(1).max(5).default(5),
});

const types = [
  ["prestation", "Prestation"],
  ["accompagnement", "Accompagnement"],
  ["formation", "Formation"],
] as const;

// text-base (16px) keeps iOS from zooming the page when a field is focused.
const field =
  "w-full min-w-0 border-0 border-b border-pure/25 bg-transparent px-0 py-3 text-base text-pure placeholder:text-pure/40 focus:border-gold focus:outline-none";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-pure/55"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const navigate = useNavigate();
  const notifyOwner = useServerFn(notifyContactOwner);
  const [type, setType] = useState<(typeof types)[number][0]>("prestation");
  const [satisfaction, setSatisfaction] = useState<number>(5);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: (fd.get("phone") as string) || undefined,
      request_type: type,
      message: fd.get("message"),
      satisfaction: Number(fd.get("satisfaction") ?? satisfaction),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    setError("");
    setStatus("sending");
    const { error } = await supabase.from("contact_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      request_type: parsed.data.request_type,
      message: parsed.data.message,
    });
    if (error) {
      setStatus("error");
      setError("L’envoi a échoué. Réessayez ou écrivez sur WhatsApp.");
      return;
    }
    try {
      await notifyOwner({ data: parsed.data });
    } catch {
      // A relay failure must not lose the saved request or invite a duplicate submission.
    }
    try {
      sessionStorage.setItem(
        "contact-confirmation",
        JSON.stringify({ name: parsed.data.name, type: parsed.data.request_type }),
      );
    } catch {
      // Navigation still works if browser storage is unavailable.
    }
    await navigate({ to: "/merci" });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div role="group" aria-label="Type de demande" className="flex flex-wrap gap-2">
        {types.map(([v, l]) => (
          <Button
            variant="ghost"
            aria-pressed={type === v}
            key={v}
            type="button"
            onClick={() => setType(v)}
            className={`h-auto min-h-11 max-w-full whitespace-normal rounded-none border px-4 py-2 text-base hover:bg-pure/5 hover:text-gold ${type === v ? "border-gold text-gold" : "border-pure/20 text-pure/70 hover:border-pure/50"}`}
          >
            {l}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Nom complet">
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            placeholder="Votre nom"
            maxLength={100}
            className={field}
          />
        </Field>

        <Field id="contact-email" label="Email">
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            placeholder="vous@exemple.com"
            maxLength={255}
            className={field}
          />
        </Field>
      </div>

      <Field id="contact-phone" label="Téléphone / WhatsApp (facultatif)">
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          autoCapitalize="off"
          enterKeyHint="next"
          placeholder="+224 …"
          maxLength={30}
          className={field}
        />
      </Field>

      <Field id="contact-message" label="Votre besoin">
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          enterKeyHint="send"
          autoCapitalize="sentences"
          placeholder="Décrivez votre projet ou votre besoin"
          maxLength={2000}
          className={`${field} min-h-28 resize-none`}
        />
      </Field>

      <div>
        <p className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-pure/55">
          Votre satisfaction
        </p>
        <div
          role="group"
          aria-label="Note de satisfaction"
          className="flex flex-wrap items-center gap-2"
        >
          {satisfactionOptions.map(({ value, emoji, label }) => {
            const active = satisfaction === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSatisfaction(value)}
                aria-label={`${value} étoile${value > 1 ? "s" : ""} — ${label}`}
                aria-pressed={active}
                className={`flex items-center gap-2 border px-3 py-2 text-sm transition-colors ${active ? "border-gold bg-gold/10 text-gold" : "border-pure/20 text-pure/75 hover:border-pure/40 hover:text-gold"}`}
              >
                <span className="text-base" aria-hidden="true">
                  {value <= satisfaction ? "★" : "☆"}
                </span>
                <span aria-hidden="true">{emoji}</span>
              </button>
            );
          })}
        </div>
        <input type="hidden" name="satisfaction" value={satisfaction} />
        <p className="mt-2 text-sm text-pure/70">
          {satisfactionOptions.find((option) => option.value === satisfaction)?.label}
        </p>
      </div>

      {error && (
        <p id="contact-error" role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        variant="ghost"
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="h-auto min-h-12 w-full whitespace-normal rounded-none border border-gold px-6 py-4 text-sm font-semibold uppercase text-gold hover:bg-gold hover:text-ink disabled:opacity-50 sm:w-auto"
      >
        {status === "sending" ? "Envoi…" : "Envoyer la demande"}
      </Button>
    </form>
  );
}
