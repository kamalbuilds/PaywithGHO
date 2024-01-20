/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.resolve.fallback = { fs: false, net: false, tls: false }
		return config
	},
	typescript: {
		ignoreBuildErrors: true,
		},
		output: 'export',
}

module.exports = nextConfig
