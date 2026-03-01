import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://wedding-invitation-premium.vercel.app/sitemap.xml', // Ganti dengan domain asli nanti
    };
}
