/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.resolve.fallback = { fs: false, net: false, tls: false }

		if (isServer) {
			config.plugins.push(
			  new webpack.DefinePlugin({
				'window': '{}',
			  })
			);
		  }
		return config
	},
}

module.exports = nextConfig
