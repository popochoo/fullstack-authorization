import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		GOOGLE_RECAPTCHA_SITE_KEY:
			process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			}
		]
	}
}

export default nextConfig
