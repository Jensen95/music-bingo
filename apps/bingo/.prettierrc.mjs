import companyPrettierConfig from "@repo/prettier-config";

/** @type {import("prettier").Config} */
export default {
  ...companyPrettierConfig,

  plugins: ["prettier-plugin-svelte"],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
};