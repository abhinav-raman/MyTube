/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ["assets.example.com", "lh3.googleusercontent.com"],
	},
  env: {
    API_KEY: 'AIzaSyAXRG-cnh_ajhT2gDGLkmWZG-w2d0mfnVo',
  },
};

module.exports = nextConfig;
