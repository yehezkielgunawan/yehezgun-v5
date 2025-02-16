/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		"@tailwindcss/postcss": {
			optimize: {
				// temporary disable minify due to framework bug
				minify: false,
			},
		},
	},
};

export default config;
