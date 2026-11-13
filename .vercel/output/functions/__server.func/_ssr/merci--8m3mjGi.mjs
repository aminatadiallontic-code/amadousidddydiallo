import { r as __toESM } from "../_runtime.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { i as ArrowLeft, r as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/merci--8m3mjGi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThankYou() {
	const [confirmation, setConfirmation] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const stored = sessionStorage.getItem("contact-confirmation");
			if (!stored) return;
			const data = JSON.parse(stored);
			if (typeof data === "object" && data !== null && "name" in data && "type" in data && typeof data.name === "string" && typeof data.type === "string") setConfirmation({
				name: data.name.slice(0, 100),
				type: data.type
			});
		} catch {}
	}, []);
	const subject = confirmation?.type === "formation" ? "de formation" : confirmation?.type === "accompagnement" ? "d’accompagnement" : "de prestation";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "portfolio flex min-h-dvh flex-col bg-ink font-sans text-pure",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-gold/20 px-6 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "font-display text-sm font-semibold uppercase text-gold",
				children: "Mindset & Leadership"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "mb-8 size-12 text-gold",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-semibold leading-tight sm:text-4xl",
					children: [
						"Merci",
						confirmation ? `, ${confirmation.name}` : " pour votre confiance",
						" !"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-8 h-px w-24 bg-gold" }),
				confirmation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-lg leading-relaxed text-pure/85",
					children: [
						"Votre demande ",
						subject,
						" a bien été enregistrée."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 leading-relaxed text-pure/70",
					children: [
						"Merci de partager votre besoin avec moi. Je prendrai connaissance de votre message pour échanger avec vous sur votre",
						" ",
						confirmation.type === "formation" ? "parcours de formation" : confirmation.type === "accompagnement" ? "accompagnement et vos objectifs" : "projet",
						"."
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed text-pure/80",
					children: "Vous souhaitez me parler d’un projet, d’un accompagnement ou d’une formation ? Retrouvez le formulaire sur la page d’accueil."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-display text-sm text-gold",
					children: "Amadou Siddy Diallo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					className: "mt-10 h-auto min-h-12 self-start whitespace-normal rounded-none border border-gold px-6 py-3 text-gold hover:bg-gold hover:text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "aria-hidden": "true" }), "Retour à l’accueil"]
					})
				})
			]
		})]
	});
}
//#endregion
export { ThankYou as component };
