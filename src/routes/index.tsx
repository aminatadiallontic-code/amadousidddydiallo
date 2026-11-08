import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import portrait from "@/assets/siddy-portrait.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siddy | Mindset & Leadership — Portfolio" },
      { name: "description", content: "Amadou Siddy Diallo : monteur vidéo, créateur de contenu, coach Mindset & Leadership et formateur à Conakry." },
      { property: "og:title", content: "Siddy | Mindset & Leadership" },
      { property: "og:description", content: "Du potentiel à l’impact. Montage vidéo, Créateur 360 et coaching à Conakry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  ["Montage vidéo professionnel", "Montage et valorisation de contenus pour personnalités publiques, entrepreneurs, créateurs et entreprises."],
  ["Spots publicitaires", "Contenus audiovisuels pour promouvoir produits, services, marques et activités commerciales."],
  ["Accompagnement contenu", "Prise en charge du montage pour développer votre présence sur les réseaux tout en gagnant du temps."],
  ["Coaching Mindset & Leadership", "Discipline, confiance en soi, développement du potentiel, vision et leadership personnel."],
  ["Formation montage vidéo", "Partir de zéro, maîtriser les fondamentaux, constituer ses réalisations et décrocher son premier client."],
  ["Conseil & formation contenu", "Avec CRÉATEUR 360, apprendre à concevoir, réaliser et diffuser ses propres contenus."],
];

const f1 = ["Identification du domaine et du positionnement", "Définition du public cible", "Choix des plateformes numériques", "Outils et équipements nécessaires", "Stratégie de contenu", "Bonnes pratiques de communication digitale"];
const f2 = ["Préparation et organisation d’un contenu", "Tournage avec un smartphone", "Cadrage, lumière et prise de son", "Montage vidéo avec CapCut", "Textes, effets, transitions et sous-titres", "Préparation et diffusion des publications"];
const formation = ["Découverte de l’univers du montage", "Fonctionnalités essentielles de CapCut", "Techniques de montage professionnel", "Projets pratiques", "Constitution d’un portfolio", "Prospection de clients", "Positionnement de ses services", "Monétisation de ses compétences"];
const skills = ["Montage CapCut", "Spots publicitaires", "TikTok · Reels · YouTube", "Tournage smartphone", "Cadrage, lumière, son", "Structuration de contenus", "Conseil en création", "Coaching Mindset", "Leadership", "Prospection en ligne", "Formation numérique"];
const projects = [
  ["Personnalités & entrepreneurs", "Valorisation de leur image, interventions et prises de parole."],
  ["Publicité audiovisuelle", "Contenus promotionnels qui captent l’attention et renforcent la visibilité."],
  ["Créateurs & professionnels", "Publier régulièrement sans consacrer son temps au montage."],
  ["CRÉATEUR 360", "Conseil et initiation pratique, en individuel ou en petits groupes."],
  ["Formation montage", "Des premiers projets jusqu’aux premiers clients."],
];
const contacts = [
  ["Email", "amadousiddyd0@gmail.com", "mailto:amadousiddyd0@gmail.com"],
  ["WhatsApp", "+224 613 474 418", "https://wa.me/224613474418"],
  ["TikTok", "@siddy.mindset", "https://www.tiktok.com/@siddy.mindset"],
  ["YouTube", "@siddy.mindset", "https://www.youtube.com/@siddy.mindset"],
  ["Facebook", "Siddy Mindset", "https://www.facebook.com/share/1CEnbzrUwm/"],
];

function Label({ n, t }: { n: string; t: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
      <span>{n}</span>
      <span className="h-px w-16 bg-gold" />
      <span>{t}</span>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Index() {
  return (
    <main className="font-sans">
      <nav className="fixed inset-x-0 top-0 z-20 border-b border-gold/20 bg-ink/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-gold">Mindset &amp; Leadership</a>
          <div className="hidden gap-8 text-sm text-pure/80 md:flex">
            {[["#apropos", "À propos"], ["#services", "Services"], ["#createur360", "Créateur 360"], ["#vision", "Vision"], ["#contact", "Contact"]].map(([h, l]) => (
              <a key={h} href={h} className="transition-colors hover:text-gold">{l}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Couverture */}
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-ink">
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-pure md:text-5xl">Amadou Siddy Diallo</h1>
            <div className="my-8 h-px w-32 bg-gold" />
            <p className="max-w-xl text-lg text-pure/80">Monteur vidéo professionnel · Créateur de contenu · Coach Mindset & Leadership · Formateur</p>
            <a href="#contact" className="mt-10 inline-block border border-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink">Collaborer</a>
          </div>
          <div className="border border-gold/30 p-2">
            <img src={portrait.url} alt="Amadou Siddy Diallo — Siddy Mindset & Leadership" width={1254} height={1254} className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="apropos" className="bg-cream py-28 text-ink">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Label n="01" t="À propos" />
            <h2 className="font-display text-4xl font-semibold tracking-tight leading-tight">Créer, transmettre, accompagner.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>Je suis Amadou Siddy Diallo, connu sous le nom de Siddy. Monteur vidéo professionnel, créateur de contenu et coach en Mindset & Leadership.</p>
            <p>Ma mission est double : accompagner personnalités publiques, entrepreneurs et entreprises dans la valorisation de leur image, et aider les jeunes à développer des compétences numériques qui ouvrent de nouvelles perspectives.</p>
            <p>Je réalise des montages, des spots publicitaires et des contenus adaptés à chaque plateforme, et je transmets mon savoir-faire aux débutants jusqu’à leurs premiers clients.</p>
            <blockquote className="border-l-2 border-gold pl-6 font-display text-2xl italic text-ink">Transformer le potentiel en compétence, la compétence en opportunité et l’opportunité en impact.</blockquote>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-ink py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Label n="02" t="Mes services" />
          <div className="grid gap-px bg-gold/25 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([t, d], i) => (
              <div key={t} className="group bg-ink p-10 transition-colors hover:bg-pure/5">
                <span className="font-display text-3xl font-semibold text-gold">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold text-pure">{t}</h3>
                <p className="mt-3 leading-relaxed text-pure/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Créateur 360 */}
      <section id="createur360" className="bg-cream py-28 text-ink">
        <div className="mx-auto max-w-6xl px-6">
          <Label n="03" t="Programme de formation" />
          <h2 className="font-display text-5xl font-bold tracking-tight">CRÉATEUR <span className="text-gold">360</span></h2>
          <p className="mt-4 font-display text-2xl italic text-ink/70">« De l’idée à la création. De la création à l’impact. »</p>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[["Formule 1", "Conseil & orientation", "Structurer votre projet et définir votre stratégie.", f1], ["Formule 2", "Initiation pratique", "Concevoir, réaliser et publier vos propres contenus.", f2]].map(([k, t, d, items]) => (
              <div key={k as string} className="border-t-2 border-gold bg-pure p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{k as string}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold">{t as string}</h3>
                <p className="mb-6 mt-2 text-ink/70">{d as string}</p>
                <List items={items as string[]} />
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest">Modalités</h4>
              <List items={["Individuel", "Petits groupes", "Présentiel à Conakry", "À distance"]} />
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest">Public</h4>
              <p className="text-ink/80">Débutants, jeunes, étudiants, entrepreneurs, commerçants, professionnels, créateurs en devenir — toute personne souhaitant développer ses compétences en création de contenu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formation */}
      <section className="bg-ink py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
          <div>
            <Label n="04" t="Formation montage" />
            <h2 className="font-display text-4xl font-semibold tracking-tight leading-tight text-pure">De zéro à <span className="text-gold">premier client.</span></h2>
            <p className="mt-6 text-pure/70">Acquérir une compétence professionnelle en montage vidéo et en faire une source de revenus — des premiers montages jusqu’à la recherche du premier client.</p>
          </div>
          <div className="text-pure/85"><List items={formation} /></div>
        </div>
      </section>

      {/* Compétences + Réalisations */}
      <section className="bg-ink py-28 text-pure">
        <div className="mx-auto max-w-6xl px-6">
          <Label n="05" t="Compétences" />
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="border border-pure/20 px-5 py-2 text-sm text-pure/85">{s}</span>
            ))}
          </div>
          <div className="mt-24"><Label n="06" t="Réalisations & projets" /></div>
          <div className="divide-y divide-pure/15 border-y border-pure/15">
            {projects.map(([t, d], i) => (
              <div key={t} className="grid gap-4 py-8 md:grid-cols-[80px_1fr_1.5fr]">
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="text-pure/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preuves de montage */}
      <section id="realisations" className="bg-cream py-28 text-ink">
        <div className="mx-auto max-w-6xl px-6">
          <Label n="07" t="Preuves de montage" />
          <h2 className="font-display text-4xl font-semibold tracking-tight">Mes montages en images.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Spot publicitaire", "Interview / prise de parole", "Contenu TikTok / Reels", "Vidéo YouTube", "Avant / après montage", "Projet client"].map((t, i) => (
              <div key={t} className="group">
                <div className="flex aspect-[9/12] items-center justify-center border border-dashed border-ink/25 bg-pure">
                  <div className="text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">▶</span>
                    <p className="mt-4 text-sm text-ink/50">Vidéo à ajouter</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold"><span className="text-gold">0{i + 1}</span> · {t}</p>
              </div>
            ))}
          </div>
          <a href="https://www.tiktok.com/@siddy.mindset" target="_blank" rel="noreferrer" className="mt-10 inline-block border-b border-gold pb-1 text-sm font-semibold uppercase tracking-widest">Voir plus sur TikTok →</a>
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="bg-ink py-28 text-pure">
        <div className="mx-auto max-w-6xl px-6">
          <Label n="08" t="Témoignages clients" />
          <div className="grid gap-px bg-gold/25 md:grid-cols-3">
            {[
              ["Nom du client", "Entrepreneur", 5, "Votre témoignage client ici : ce que Siddy a apporté à son image et à ses contenus."],
              ["Nom du client", "Créatrice de contenu", 5, "Votre témoignage client ici : la qualité du montage, la réactivité, les résultats."],
              ["Nom de l’élève", "Formation montage", 5, "Votre témoignage d’élève ici : de zéro au premier client grâce à la formation."],
            ].map(([n, r, s, q], i) => (
              <figure key={i} className="bg-ink p-10">
                <div className="text-lg tracking-widest text-gold" aria-label={`${s} étoiles sur 5`}>{"★".repeat(s as number)}{"☆".repeat(5 - (s as number))}</div>
                <blockquote className="mt-6 leading-relaxed text-pure/80">« {q as string} »</blockquote>
                <figcaption className="mt-8 border-t border-pure/15 pt-5">
                  <p className="font-semibold">{n as string}</p>
                  <p className="text-sm text-pure/50">{r as string}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="bg-ink py-32 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-center"><Label n="07" t="Ma vision" /></div>
          <p className="font-display text-2xl font-medium leading-snug text-pure md:text-3xl">Chaque personne possède un potentiel qui ne demande qu’à être développé. Mais il faut une vision, des compétences, de la discipline — et le courage de passer à l’action.</p>
          <div className="mx-auto my-10 h-px w-24 bg-gold" />
          <p className="font-display text-3xl italic text-gold">Du potentiel à l’impact.</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-gold/30 bg-ink py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
          <div>
            <Label n="08" t="Contact" />
            <h2 className="font-display text-4xl font-semibold tracking-tight text-pure">Parlons de votre projet.</h2>
            <p className="mt-6 text-pure/70">Tarifs, formules et modalités : chaque proposition est étudiée selon vos besoins, vos objectifs et la nature du projet.</p>
          </div>
          <div className="divide-y divide-gold/20">
            {contacts.map(([k, v, h]) => (
              <a key={k} href={h} target="_blank" rel="noreferrer" className="flex items-center justify-between py-5 transition-colors hover:text-gold">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{k}</span>
                <span className="text-pure/90">{v} →</span>
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-3xl px-6">
          <h3 className="mb-8 font-display text-2xl font-semibold text-pure">Demander une prestation, un accompagnement ou une formation</h3>
          <ContactForm />
        </div>
        <footer className="mx-auto mt-24 max-w-6xl px-6 text-center text-sm text-pure/50">
          MINDSET & LEADERSHIP — De zéro à une source de revenus grâce au montage vidéo.
        </footer>
      </section>
    </main>
  );
}
