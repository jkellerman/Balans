const path = require("path");

const buildEslintCommand = (filenames) => `eslint ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

module.exports = {
	// Type check TypeScript files
	"*/.(ts|tsx)": () => "yarn tsc --noEmit",
	"*.{js,jsx,ts,tsx,json,md,prettierrc,css,scss}": "prettier --write --config .prettierrc",
	"*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
