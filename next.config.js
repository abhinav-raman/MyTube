/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ["assets.example.com", "lh3.googleusercontent.com", "i.ytimg.com"],
	},
	env: {
		API_KEY: "AIzaSyAXRG-cnh_ajhT2gDGLkmWZG-w2d0mfnVo",
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule) => rule.test && rule.test.test(".svg")
		);
		fileLoaderRule.exclude = /\.svg$/;
		config.module.rules.push({
			test: /\.svg$/,
			loader: require.resolve("@svgr/webpack"),
		});
		return config;
	},
};

module.exports = nextConfig;
