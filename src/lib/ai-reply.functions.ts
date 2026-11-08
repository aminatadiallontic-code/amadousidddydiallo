import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const input = z.object({
  request_type: z.enum(["prestation", "accompagnement", "formation"]),
  need: z.string().trim().min(10).max(1500),
});

const SYSTEM = `Tu es l'assistant d'Amadou Siddy Diallo (Mindset & Leadership), monteur vidéo, créateur de contenu, coach en mindset & leadership et formateur basé à Conakry.
Services : montage vidéo, spots publicitaires, accompagnement de contenu, coaching mindset & leadership, formations (dont le programme CRÉATEUR 360).
Rédige en français une réponse personnalisée, chaleureuse et professionnelle (120 à 200 mots) au besoin du client : reformule son besoin, propose une approche concrète en 2 à 4 points, puis invite-le à envoyer sa demande via le formulaire ou WhatsApp.
N'invente jamais de prix, de délais ni de garanties. Pas de markdown lourd : texte simple, puces "•" autorisées.`;

export const generateAiReply = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: SYSTEM,
        input: `Type de demande : ${data.request_type}\nBesoin du client : ${data.need}`,
      });
      const text = (res.output ?? [])
        .flatMap((o: any) => (o.type === "message" ? o.content ?? [] : []))
        .filter((c: any) => c.type === "output_text")
        .map((c: any) => c.text)
        .join("\n")
        .trim();
      if (!text) return { reply: null, error: "Aucune réponse générée." };
      return { reply: text, error: null };
    } catch (e) {
      console.error("AI reply failed", e instanceof GatewayError ? e.code : e);
      return { reply: null, error: "Le service est momentanément indisponible. Réessayez plus tard." };
    }
  });
