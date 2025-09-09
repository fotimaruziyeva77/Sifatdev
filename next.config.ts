import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.ibb.co',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'dev.sifatdev.uz',
				port: '',
				pathname: '/media/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
