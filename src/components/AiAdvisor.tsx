import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateAiReply } from "@/lib/ai-reply.functions";
import { Button } from "@/components/ui/button";

const types = [
  ["prestation", "Prestations montage vidéo"],
  ["accompagnement", "Accompagnement montage vidéo"],
  ["formation", "Formation montage vidéo"],
] as const;

export function AiAdvisor() {
  const run = useServerFn(generateAiReply);
  const [type, setType] = useState<(typeof types)[number][0]>("prestation");
  const [need, setNeed] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (need.trim().length < 10) return setError("Décrivez votre besoin en quelques phrases.");
    setError("");
    setReply("");
    setLoading(true);
    try {
      const r = await run({ data: { request_type: type, need } });
      if (r.reply) setReply(r.reply);
      else setError(r.error ?? "Erreur inconnue");
    } catch {
      setError("Le service est momentanément indisponible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-w-0 border border-pure/15 p-4 sm:p-10">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Assistant</p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-pure">Obtenez une première réponse personnalisée</h3>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="flex flex-wrap gap-2">
          {types.map(([v, l]) => (
            <Button variant="ghost" aria-pressed={type === v} key={v} type="button" onClick={() => setType(v)}
              className={`h-auto min-h-11 max-w-full whitespace-normal rounded-none border px-4 py-2 text-base hover:bg-pure/5 hover:text-gold ${type === v ? "border-gold text-gold" : "border-pure/20 text-pure/70 hover:border-pure/50"}`}>
              {l}
            </Button>
          ))}
        </div>
        <textarea value={need} onChange={(e) => setNeed(e.target.value)} rows={4} maxLength={1500}
          placeholder="Ex. : je lance ma marque de vêtements et j’ai besoin de vidéos pour TikTok…"
          className="w-full resize-none border-0 border-b border-pure/25 bg-transparent px-0 py-3 text-pure placeholder:text-pure/40 focus:border-gold focus:outline-none" />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button variant="ghost" type="submit" disabled={loading}
          className="h-auto min-h-12 w-full whitespace-normal rounded-none border border-gold px-6 py-4 text-sm font-semibold uppercase text-gold hover:bg-gold hover:text-ink disabled:opacity-50 sm:w-auto">
          {loading ? "Rédaction…" : "Générer ma réponse"}
        </Button>
      </form>
      {reply && (
        <div className="mt-8 border-l-2 border-gold bg-pure/5 p-6">
          <p className="whitespace-pre-line leading-relaxed text-pure/90">{reply}</p>
        </div>
      )}
    </div>
  );
}
