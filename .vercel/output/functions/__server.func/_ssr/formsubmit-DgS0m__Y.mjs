import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formsubmit-DgS0m__Y.js
var contactEmailSchema = objectType({
	name: stringType().trim().min(1).max(100),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().max(30).optional(),
	request_type: enumType([
		"prestation",
		"accompagnement",
		"formation"
	]),
	message: stringType().trim().min(1).max(2e3),
	satisfaction: numberType().int().min(1).max(5).optional().default(5)
});
var labels = {
	prestation: "Prestation",
	accompagnement: "Accompagnement",
	formation: "Formation"
};
var satisfactionMap = {
	1: "😞 Très insatisfait",
	2: "🙁 Insatisfait",
	3: "😐 Moyen",
	4: "🙂 Satisfait",
	5: "😄 Très satisfait"
};
var siteOrigin = "https://amadousidddydiallo.lovable.app";
var siteUrl = `${siteOrigin}/`;
async function forwardContactEmail(input) {
	const data = contactEmailSchema.parse(input);
	const response = await fetch("https://formsubmit.co/ajax/amadousiddyd0@gmail.com", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Origin: siteOrigin,
			Referer: siteUrl,
			"X-Requested-With": "XMLHttpRequest"
		},
		signal: AbortSignal.timeout(15e3),
		body: JSON.stringify({
			name: data.name,
			email: data.email,
			"Téléphone / WhatsApp": data.phone || "Non renseigné",
			"Type de demande": labels[data.request_type],
			"Niveau de satisfaction": satisfactionMap[data.satisfaction ?? 5],
			message: data.message,
			_subject: `Nouvelle demande — ${labels[data.request_type]} — Mindset & Leadership`,
			_template: "table",
			_url: siteUrl
		})
	});
	if (!response.ok) throw new Error("FormSubmit unavailable");
	const result = await response.json();
	if (typeof result !== "object" || result === null || !("success" in result) || result.success !== true && result.success !== "true") throw new Error("FormSubmit did not accept the request");
	return { accepted: true };
}
//#endregion
export { forwardContactEmail as n, contactEmailSchema as t };
