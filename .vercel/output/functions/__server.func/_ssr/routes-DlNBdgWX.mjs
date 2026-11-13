import { r as __toESM } from "../_runtime.mjs";
import { Bt as isRedirect, b as useNavigate, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as contactEmailSchema } from "./formsubmit-DgS0m__Y.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { n as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as siddy_portrait_default } from "./siddy-portrait-BmvNE8KX.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BWT7K0NR.mjs";
import { t as supabase } from "./client--IXHfFCw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DlNBdgWX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var notifyContactOwner = createServerFn({ method: "POST" }).validator((input) => contactEmailSchema.parse(input)).handler(createSsrRpc("a94249e6e3072afec8f23760f5a09c4572a7d0b6fd7cd3e94af752bbad8efec5"));
var satisfactionOptions = [
	{
		value: 1,
		emoji: "😞",
		label: "Très insatisfait"
	},
	{
		value: 2,
		emoji: "🙁",
		label: "Insatisfait"
	},
	{
		value: 3,
		emoji: "😐",
		label: "Moyen"
	},
	{
		value: 4,
		emoji: "🙂",
		label: "Satisfait"
	},
	{
		value: 5,
		emoji: "😄",
		label: "Très satisfait"
	}
];
var schema = objectType({
	name: stringType().trim().min(1, "Indiquez votre nom").max(100),
	email: stringType().trim().email("Email invalide").max(255),
	phone: stringType().trim().max(30).optional(),
	request_type: enumType([
		"prestation",
		"accompagnement",
		"formation"
	]),
	message: stringType().trim().min(1, "Décrivez votre besoin").max(2e3),
	satisfaction: numberType().int().min(1).max(5).default(5)
});
var types = [
	["prestation", "Prestation"],
	["accompagnement", "Accompagnement"],
	["formation", "Formation"]
];
var field = "w-full min-w-0 border-0 border-b border-pure/25 bg-transparent px-0 py-3 text-base text-pure placeholder:text-pure/40 focus:border-gold focus:outline-none";
function Field({ id, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-pure/55",
			children: label
		}), children]
	});
}
function ContactForm() {
	const navigate = useNavigate();
	const notifyOwner = useServerFn(notifyContactOwner);
	const [type, setType] = (0, import_react.useState)("prestation");
	const [satisfaction, setSatisfaction] = (0, import_react.useState)(5);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const parsed = schema.safeParse({
			name: fd.get("name"),
			email: fd.get("email"),
			phone: fd.get("phone") || void 0,
			request_type: type,
			message: fd.get("message"),
			satisfaction: Number(fd.get("satisfaction") ?? satisfaction)
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
			message: parsed.data.message
		});
		if (error) {
			setStatus("error");
			setError("L’envoi a échoué. Réessayez ou écrivez sur WhatsApp.");
			return;
		}
		try {
			await notifyOwner({ data: parsed.data });
		} catch {}
		try {
			sessionStorage.setItem("contact-confirmation", JSON.stringify({
				name: parsed.data.name,
				type: parsed.data.request_type
			}));
		} catch {}
		await navigate({ to: "/merci" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-6",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "group",
				"aria-label": "Type de demande",
				className: "flex flex-wrap gap-2",
				children: types.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					"aria-pressed": type === v,
					type: "button",
					onClick: () => setType(v),
					className: `h-auto min-h-11 max-w-full whitespace-normal rounded-none border px-4 py-2 text-base hover:bg-pure/5 hover:text-gold ${type === v ? "border-gold text-gold" : "border-pure/20 text-pure/70 hover:border-pure/50"}`,
					children: l
				}, v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "contact-name",
					label: "Nom complet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "contact-name",
						name: "name",
						type: "text",
						autoComplete: "name",
						autoCapitalize: "words",
						enterKeyHint: "next",
						placeholder: "Votre nom",
						maxLength: 100,
						className: field
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "contact-email",
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "contact-email",
						name: "email",
						type: "email",
						autoComplete: "email",
						inputMode: "email",
						autoCapitalize: "off",
						autoCorrect: "off",
						spellCheck: false,
						enterKeyHint: "next",
						placeholder: "vous@exemple.com",
						maxLength: 255,
						className: field
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "contact-phone",
				label: "Téléphone / WhatsApp (facultatif)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "contact-phone",
					name: "phone",
					type: "tel",
					autoComplete: "tel",
					inputMode: "tel",
					autoCapitalize: "off",
					enterKeyHint: "next",
					placeholder: "+224 …",
					maxLength: 30,
					className: field
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "contact-message",
				label: "Votre besoin",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "contact-message",
					name: "message",
					rows: 4,
					enterKeyHint: "send",
					autoCapitalize: "sentences",
					placeholder: "Décrivez votre projet ou votre besoin",
					maxLength: 2e3,
					className: `${field} min-h-28 resize-none`
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-pure/55",
					children: "Votre satisfaction"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "group",
					"aria-label": "Note de satisfaction",
					className: "flex flex-wrap items-center gap-2",
					children: satisfactionOptions.map(({ value, emoji, label }) => {
						const active = satisfaction === value;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSatisfaction(value),
							"aria-label": `${value} étoile${value > 1 ? "s" : ""} — ${label}`,
							"aria-pressed": active,
							className: `flex items-center gap-2 border px-3 py-2 text-sm transition-colors ${active ? "border-gold bg-gold/10 text-gold" : "border-pure/20 text-pure/75 hover:border-pure/40 hover:text-gold"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base",
								"aria-hidden": "true",
								children: value <= satisfaction ? "★" : "☆"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: emoji
							})]
						}, value);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					name: "satisfaction",
					value: satisfaction
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-pure/70",
					children: satisfactionOptions.find((option) => option.value === satisfaction)?.label
				})
			] }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: "contact-error",
				role: "alert",
				className: "text-sm text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				type: "submit",
				disabled: status === "sending",
				"aria-busy": status === "sending",
				className: "h-auto min-h-12 w-full whitespace-normal rounded-none border border-gold px-6 py-4 text-sm font-semibold uppercase text-gold hover:bg-gold hover:text-ink disabled:opacity-50 sm:w-auto",
				children: status === "sending" ? "Envoi…" : "Envoyer la demande"
			})
		]
	});
}
var services = [
	["Montage vidéo professionnel", "Montage et valorisation de contenus pour personnalités publiques, entrepreneurs, créateurs et entreprises."],
	["Spots publicitaires", "Contenus audiovisuels pour promouvoir produits, services, marques et activités commerciales."],
	["Accompagnement contenu", "Prise en charge du montage pour développer votre présence sur les réseaux tout en gagnant du temps."],
	["Coaching Mindset & Leadership", "Discipline, confiance en soi, développement du potentiel, vision et leadership personnel."],
	["Formation montage vidéo", "Partir de zéro, maîtriser les fondamentaux, constituer ses réalisations et décrocher son premier client."],
	["Conseil & formation contenu", "Avec CRÉATEUR 360, apprendre à concevoir, réaliser et diffuser ses propres contenus."]
];
var f1 = [
	"Identification du domaine et du positionnement",
	"Définition du public cible",
	"Choix des plateformes numériques",
	"Outils et équipements nécessaires",
	"Stratégie de contenu",
	"Bonnes pratiques de communication digitale"
];
var f2 = [
	"Préparation et organisation d’un contenu",
	"Tournage avec un smartphone",
	"Cadrage, lumière et prise de son",
	"Montage vidéo avec CapCut",
	"Textes, effets, transitions et sous-titres",
	"Préparation et diffusion des publications"
];
var formation = [
	"Découverte de l’univers du montage",
	"Fonctionnalités essentielles de CapCut",
	"Techniques de montage professionnel",
	"Projets pratiques",
	"Constitution d’un portfolio",
	"Prospection de clients",
	"Positionnement de ses services",
	"Monétisation de ses compétences"
];
var skills = [
	"Montage CapCut",
	"Spots publicitaires",
	"TikTok · Reels · YouTube",
	"Tournage smartphone",
	"Cadrage, lumière, son",
	"Structuration de contenus",
	"Conseil en création",
	"Coaching Mindset",
	"Leadership",
	"Prospection en ligne",
	"Formation numérique"
];
var projects = [
	["Personnalités & entrepreneurs", "Valorisation de leur image, interventions et prises de parole."],
	["Publicité audiovisuelle", "Contenus promotionnels qui captent l’attention et renforcent la visibilité."],
	["Créateurs & professionnels", "Publier régulièrement sans consacrer son temps au montage."],
	["CRÉATEUR 360", "Conseil et initiation pratique, en individuel ou en petits groupes."],
	["Formation montage", "Des premiers projets jusqu’aux premiers clients."]
];
var contacts = [
	[
		"Email",
		"amadousiddyd0@gmail.com",
		"mailto:amadousiddyd0@gmail.com"
	],
	[
		"WhatsApp",
		"+224 613 474 418",
		"https://wa.me/224613474418"
	],
	[
		"TikTok",
		"@siddy.mindset",
		"https://www.tiktok.com/@siddy.mindset"
	],
	[
		"YouTube",
		"@siddy.mindset",
		"https://www.youtube.com/@siddy.mindset"
	],
	[
		"Facebook",
		"Siddy Mindset",
		"https://www.facebook.com/share/1CEnbzrUwm/"
	]
];
function Label({ n, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-3 text-sm font-semibold uppercase text-gold md:mb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold md:w-16" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0",
				children: t
			})
		]
	});
}
function List({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i })]
		}, i))
	});
}
function Index() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const links = [
		["#apropos", "À propos"],
		["#services", "Services"],
		["#createur360", "Créateur 360"],
		["#temoignages", "Avis"],
		["#vision", "Vision"],
		["#contact", "Contact"]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "portfolio font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 top-0 z-20 border-b border-gold/20 bg-ink/85 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-6 py-3 lg:flex lg:justify-between lg:py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#top",
							onClick: () => setMenuOpen(false),
							className: "min-w-0 font-display text-sm font-semibold uppercase leading-snug text-gold",
							children: "SIDDY MINDSET & LEADERSHIP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-11 w-11 shrink-0 rounded-none text-gold hover:bg-pure/5 hover:text-gold lg:hidden",
							"aria-label": menuOpen ? "Fermer le menu" : "Ouvrir le menu",
							"aria-expanded": menuOpen,
							"aria-controls": "mobile-menu",
							onClick: () => setMenuOpen(!menuOpen),
							children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden gap-5 text-sm text-pure/80 lg:flex",
							children: links.map(([h, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: h,
								className: "py-2 transition-colors hover:text-gold",
								children: l
							}, h))
						})
					]
				}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "mobile-menu",
					className: "max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-gold/20 bg-ink px-6 pb-4 lg:hidden",
					children: links.map(([h, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: h,
						onClick: () => setMenuOpen(false),
						className: "block border-b border-pure/10 py-3 text-base text-pure hover:text-gold",
						children: l
					}, h))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "top",
				className: "relative flex items-center bg-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid w-full max-w-6xl items-center gap-6 px-6 pb-8 pt-24 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-32",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl font-bold leading-tight text-pure md:text-5xl",
								children: "SIDDY MINDSET - LEADERSHIP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-4 h-px w-24 bg-gold md:my-8 md:w-32" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-base leading-relaxed text-pure/80 md:text-lg",
								children: "Monteur vidéo professionnel · Créateur de contenu · Coach Mindset & Leadership · Formateur"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								className: "mt-5 h-auto min-h-12 rounded-none border border-gold px-8 py-3 text-sm font-semibold uppercase text-gold hover:bg-gold hover:text-ink md:mt-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#contact",
									children: "Collaborer"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-full max-w-96 md:max-w-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: siddy_portrait_default,
							alt: "Amadou Siddy Diallo — Siddy Mindset & Leadership",
							width: 1254,
							height: 1254,
							className: "h-auto w-full"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "apropos",
				className: "bg-cream py-28 text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1fr_1.4fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						n: "01",
						t: "À propos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-semibold tracking-tight leading-tight",
						children: "Créer, transmettre, accompagner."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 text-lg leading-relaxed text-ink/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Je suis Amadou Siddy Diallo, connu sous le nom de Siddy. Monteur vidéo professionnel, créateur de contenu et coach en Mindset & Leadership." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ma mission est double : accompagner personnalités publiques, entrepreneurs et entreprises dans la valorisation de leur image, et aider les jeunes à développer des compétences numériques qui ouvrent de nouvelles perspectives." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Je réalise des montages, des spots publicitaires et des contenus adaptés à chaque plateforme, et je transmets mon savoir-faire aux débutants jusqu’à leurs premiers clients." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
								className: "border-l-2 border-gold pl-6 font-display text-2xl italic text-ink",
								children: "Transformer le potentiel en compétence, la compétence en opportunité et l’opportunité en impact."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "services",
				className: "bg-ink py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						n: "02",
						t: "Mes services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-px bg-gold/25 md:grid-cols-2 lg:grid-cols-3",
						children: services.map(([t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group bg-ink p-10 transition-colors hover:bg-pure/5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-3xl font-semibold text-gold",
									children: ["0", i + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-6 text-xl font-semibold text-pure",
									children: t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 leading-relaxed text-pure/70",
									children: d
								})
							]
						}, t))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "createur360",
				className: "bg-cream py-28 text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							n: "03",
							t: "Programme de formation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-5xl font-bold tracking-tight",
							children: ["CRÉATEUR ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: "360"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-2xl italic text-ink/70",
							children: "« De l’idée à la création. De la création à l’impact. »"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 grid gap-8 md:grid-cols-2",
							children: [[
								"Formule 1",
								"Conseil & orientation",
								"Structurer votre projet et définir votre stratégie.",
								f1
							], [
								"Formule 2",
								"Initiation pratique",
								"Concevoir, réaliser et publier vos propres contenus.",
								f2
							]].map(([k, t, d, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t-2 border-gold bg-pure p-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-[0.3em] text-gold",
										children: k
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-3 font-display text-3xl font-semibold",
										children: t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-6 mt-2 text-ink/70",
										children: d
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { items })
								]
							}, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 grid gap-8 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-4 text-sm font-semibold uppercase tracking-widest",
								children: "Modalités"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { items: [
								"Individuel",
								"Petits groupes",
								"Présentiel à Conakry",
								"À distance"
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-4 text-sm font-semibold uppercase tracking-widest",
								children: "Public"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-ink/80",
								children: "Débutants, jeunes, étudiants, entrepreneurs, commerçants, professionnels, créateurs en devenir — toute personne souhaitant développer ses compétences en création de contenu."
							})] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-ink py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							n: "04",
							t: "Formation montage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl font-semibold tracking-tight leading-tight text-pure",
							children: ["De zéro à ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: "premier client."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-pure/70",
							children: "Acquérir une compétence professionnelle en montage vidéo et en faire une source de revenus — des premiers montages jusqu’à la recherche du premier client."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-pure/85",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { items: formation })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-ink py-28 text-pure",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							n: "05",
							t: "Compétences"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-3",
							children: skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "border border-pure/20 px-5 py-2 text-sm text-pure/85",
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-24",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								n: "06",
								t: "Réalisations & projets"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-pure/15 border-y border-pure/15",
							children: projects.map(([t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 py-8 md:grid-cols-[80px_1fr_1.5fr]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-display text-3xl text-gold",
										children: ["0", i + 1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-semibold",
										children: t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-pure/70",
										children: d
									})
								]
							}, t))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "temoignages",
				className: "bg-ink py-28 text-pure",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						n: "08",
						t: "Témoignages clients"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-px bg-gold/25 md:grid-cols-3",
						children: [
							[
								"Mariam D.",
								"Entrepreneur",
								5,
								"Le montage donne vraiment du poids à notre image. J’ai reçu plus de demandes après la publication.",
								"😄"
							],
							[
								"Awa K.",
								"Créatrice de contenu",
								5,
								"Très bon travail, rapide, propre et orienté résultats. Les visuels attirent immédiatement l’attention.",
								"🙂"
							],
							[
								"Ibrahima S.",
								"Étudiant - Formation montage",
								5,
								"J’ai appris les bases du montage et j’ai réussi à créer mon premier portfolio de projets.",
								"😄"
							]
						].map(([n, r, s, q, e], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "bg-ink p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-lg tracking-widest text-gold",
									"aria-label": `${s} étoiles sur 5`,
									children: ["★".repeat(s), "☆".repeat(5 - s)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-2xl",
									"aria-label": `Satisfaction ${e}`,
									children: e
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "mt-6 leading-relaxed text-pure/80",
									children: [
										"« ",
										q,
										" »"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "mt-8 border-t border-pure/15 pt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-pure/50",
										children: r
									})]
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "vision",
				className: "bg-ink py-32 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								n: "07",
								t: "Ma vision"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-medium leading-snug text-pure md:text-3xl",
							children: "Chaque personne possède un potentiel qui ne demande qu’à être développé. Mais il faut une vision, des compétences, de la discipline — et le courage de passer à l’action."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto my-10 h-px w-24 bg-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl italic text-gold",
							children: "Du potentiel à l’impact."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "contact",
				className: "border-t border-gold/30 bg-ink py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								n: "08",
								t: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-4xl font-semibold tracking-tight text-pure",
								children: "Parlons de votre projet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-pure/70",
								children: "Tarifs, formules et modalités : chaque proposition est étudiée selon vos besoins, vos objectifs et la nature du projet."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-gold/20",
							children: contacts.map(([k, v, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: h,
								target: "_blank",
								rel: "noreferrer",
								className: "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 py-5 transition-colors hover:text-gold sm:flex sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 whitespace-nowrap text-sm font-semibold uppercase text-gold",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 text-right text-sm text-pure/90 sm:text-base",
									children: [v, " →"]
								})]
							}, k))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-20 max-w-3xl px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-8 font-display text-2xl font-semibold text-pure",
							children: "Demander une prestation, un accompagnement ou une formation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mx-auto mt-24 max-w-6xl px-6 text-center text-sm text-pure/50",
						children: "MINDSET & LEADERSHIP — De zéro à une source de revenus grâce au montage vidéo."
					})
				]
			})
		]
	});
}
//#endregion
export { Index as component };
