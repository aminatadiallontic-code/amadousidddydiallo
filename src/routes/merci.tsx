import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/merci")({
  head: () => ({
    meta: [
      { title: "Merci pour votre demande | Mindset & Leadership" },
      { name: "description", content: "Confirmation de votre demande de prestation, d’accompagnement ou de formation auprès d’Amadou Siddy Diallo." },
      { property: "og:title", content: "Votre demande | Mindset & Leadership" },
      { property: "og:description", content: "Merci de votre confiance pour votre projet, votre accompagnement ou votre formation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const [confirmation, setConfirmation] = useState<{ name: string; type: string } | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("contact-confirmation");
      if (!stored) return;
      const data: unknown = JSON.parse(stored);
      if (typeof data === "object" && data !== null && "name" in data && "type" in data && typeof data.name === "string" && typeof data.type === "string") {
        setConfirmation({ name: data.name.slice(0, 100), type: data.type });
      }
    } catch {
      // The page remains usable when browser storage is unavailable.
    }
  }, []);

  const subject = confirmation?.type === "formation" ? "de formation" : confirmation?.type === "accompagnement" ? "d’accompagnement" : "de prestation";

  return (
    <main className="portfolio flex min-h-dvh flex-col bg-ink font-sans text-pure">
      <header className="border-b border-gold/20 px-6 py-6">
        <Link to="/" className="font-display text-sm font-semibold uppercase text-gold">Mindset &amp; Leadership</Link>
      </header>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
        <CheckCircle2 className="mb-8 size-12 text-gold" aria-hidden="true" />
        <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">Merci{confirmation ? `, ${confirmation.name}` : " pour votre confiance"} !</h1>
        <div className="my-8 h-px w-24 bg-gold" />
        {confirmation ? (
          <>
            <p className="text-lg leading-relaxed text-pure/85">Votre demande {subject} a bien été enregistrée.</p>
            <p className="mt-4 leading-relaxed text-pure/70">Merci de partager votre besoin avec moi. Je prendrai connaissance de votre message pour échanger avec vous sur votre {confirmation.type === "formation" ? "parcours de formation" : confirmation.type === "accompagnement" ? "accompagnement et vos objectifs" : "projet"}.</p>
          </>
        ) : <p className="leading-relaxed text-pure/80">Vous souhaitez me parler d’un projet, d’un accompagnement ou d’une formation ? Retrouvez le formulaire sur la page d’accueil.</p>}
        <p className="mt-8 font-display text-sm text-gold">Amadou Siddy Diallo</p>
        <Button asChild variant="ghost" className="mt-10 h-auto min-h-12 self-start whitespace-normal rounded-none border border-gold px-6 py-3 text-gold hover:bg-gold hover:text-ink">
          <Link to="/"><ArrowLeft aria-hidden="true" />Retour à l’accueil</Link>
        </Button>
      </div>
    </main>
  );
}