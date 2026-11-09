import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(1, "Indiquez votre nom").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(30).optional(),
  request_type: z.enum(["prestation", "accompagnement", "formation"]),
  message: z.string().trim().min(1, "Décrivez votre besoin").max(2000),
});

const types = [
  ["prestation", "Prestation"],
  ["accompagnement", "Accompagnement"],
  ["formation", "Formation"],
] as const;

const field =
  "w-full border-0 border-b border-pure/25 bg-transparent px-0 py-3 text-pure placeholder:text-pure/40 focus:border-gold focus:outline-none";

export function ContactForm() {
  const [type, setType] = useState<(typeof types)[number][0]>("prestation");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
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
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    setError("");
    setStatus("sending");
    const { error } = await supabase.from("contact_requests").insert({ ...parsed.data, phone: parsed.data.phone ?? null });
    if (error) {
      setStatus("error");
      setError("L’envoi a échoué. Réessayez ou écrivez sur WhatsApp.");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="border border-gold/40 p-10 text-center">
        <p className="font-display text-2xl font-semibold text-gold">Merci !</p>
        <p className="mt-3 text-pure/80">Votre demande a bien été envoyée. Siddy vous recontactera.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="flex flex-wrap gap-2">
        {types.map(([v, l]) => (
          <Button variant="ghost" aria-pressed={type === v}
            key={v}
            type="button"
            onClick={() => setType(v)}
            className={`h-auto min-h-11 max-w-full rounded-none border px-4 py-2 text-base hover:bg-pure/5 hover:text-gold ${type === v ? "border-gold text-gold" : "border-pure/20 text-pure/70 hover:border-pure/50"}`}
          >
            {l}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="name" placeholder="Nom complet" maxLength={100} className={field} />
        <input name="email" type="email" placeholder="Email" maxLength={255} className={field} />
      </div>
      <input name="phone" placeholder="Téléphone / WhatsApp (facultatif)" maxLength={30} className={field} />
      <textarea name="message" rows={4} placeholder="Décrivez votre projet ou votre besoin" maxLength={2000} className={`${field} resize-none`} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button variant="ghost"
        type="submit"
        disabled={status === "sending"}
        className="h-auto min-h-12 w-full whitespace-normal rounded-none border border-gold px-6 py-4 text-sm font-semibold uppercase text-gold hover:bg-gold hover:text-ink disabled:opacity-50 sm:w-auto"
      >
        {status === "sending" ? "Envoi…" : "Envoyer la demande"}
      </Button>
    </form>
  );
}
