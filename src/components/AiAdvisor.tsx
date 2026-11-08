import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateAiReply } from "@/lib/ai-reply.functions";

const types = [
  ["prestation", "Prestation"],
  ["accompagnement", "Accompagnement"],
  ["formation", "Formation"],
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
    <div className="border border-pure/15 p-6 sm:p-10">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Assistant</p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-pure">Obtenez une première réponse personnalisée</h3>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="flex flex-wrap gap-2">
          {types.map(([v, l]) => (
            <button key={v} type="button" onClick={() => setType(v)}
              className={`border px-5 py-2 text-sm transition-colors ${type === v ? "border-gold text-gold" : "border-pure/20 text-pure/70 hover:border-pure/50"}`}>
              {l}
            </button>
          ))}
        </div>
        <textarea value={need} onChange={(e) => setNeed(e.target.value)} rows={4} maxLength={1500}
          placeholder="Ex. : je lance ma marque de vêtements et j’ai besoin de vidéos pour TikTok…"
          className="w-full resize-none border-0 border-b border-pure/25 bg-transparent px-0 py-3 text-pure placeholder:text-pure/40 focus:border-gold focus:outline-none" />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={loading}
          className="border border-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-50">
          {loading ? "Rédaction…" : "Générer ma réponse"}
        </button>
      </form>
      {reply && (
        <div className="mt-8 border-l-2 border-gold bg-pure/5 p-6">
          <p className="whitespace-pre-line leading-relaxed text-pure/90">{reply}</p>
        </div>
      )}
    </div>
  );
}
