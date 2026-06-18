import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
	...nextConfig,
	{
		ignores: ["Hindjal CMS portal/**"],
	},
];

export default config;