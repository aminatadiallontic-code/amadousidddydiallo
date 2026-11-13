import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as forwardContactEmail, t as contactEmailSchema } from "./formsubmit-DgS0m__Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-email.functions-4bdnZvlO.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var notifyContactOwner_createServerFn_handler = createServerRpc({
	id: "a94249e6e3072afec8f23760f5a09c4572a7d0b6fd7cd3e94af752bbad8efec5",
	name: "notifyContactOwner",
	filename: "src/lib/contact-email.functions.ts"
}, (opts) => notifyContactOwner.__executeServer(opts));
var notifyContactOwner = createServerFn({ method: "POST" }).validator((input) => contactEmailSchema.parse(input)).handler(notifyContactOwner_createServerFn_handler, async ({ data }) => {
	try {
		return await forwardContactEmail(data);
	} catch {
		console.warn("Contact email relay unavailable; stored request retained.");
		return { accepted: false };
	}
});
//#endregion
export { notifyContactOwner_createServerFn_handler };
