/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// …
		serverComponentsExternalPackages: ['@react-pdf/renderer']
	},
	images: {
		domains: [
			'crm-storm-traffic.s3.eu-central-1.amazonaws.com',
			'crm-storm-traffic.s3.amazonaws.com'
		]
	}
};

export default nextConfig;
