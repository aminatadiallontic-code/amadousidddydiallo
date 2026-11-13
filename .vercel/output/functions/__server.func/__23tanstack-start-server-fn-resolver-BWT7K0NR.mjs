//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BWT7K0NR.js
var manifest = { "a94249e6e3072afec8f23760f5a09c4572a7d0b6fd7cd3e94af752bbad8efec5": {
	functionName: "notifyContactOwner_createServerFn_handler",
	importer: () => import("./_ssr/contact-email.functions-4bdnZvlO.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
