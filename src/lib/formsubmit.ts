import { z } from "zod";

export const contactEmailSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  request_type: z.enum(["prestation", "accompagnement", "formation"]),
  message: z.string().trim().min(1).max(2000),
});

const labels = {
  prestation: "Prestation",
  accompagnement: "Accompagnement",
  formation: "Formation",
};

export async function forwardContactEmail(input: unknown) {
  const data = contactEmailSchema.parse(input);
  const response = await fetch("https://formsubmit.co/ajax/amadousiddyd0@gmail.com", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      "Téléphone / WhatsApp": data.phone || "Non renseigné",
      "Type de demande": labels[data.request_type],
      message: data.message,
      _subject: `Nouvelle demande — ${labels[data.request_type]} — Mindset & Leadership`,
      _template: "table",
      _url: "https://amadousidddydiallo.lovable.app/",
    }),
  });
  if (!response.ok) throw new Error("FormSubmit unavailable");
  const result: unknown = await response.json();
  if (typeof result !== "object" || result === null || !("success" in result) || (result.success !== true && result.success !== "true")) {
    throw new Error("FormSubmit did not accept the request");
  }
  // Acceptance does not prove inbox delivery: the owner must activate FormSubmit.
  return { accepted: true };
}