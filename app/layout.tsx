import type { Metadata } from 'next';
import { Playfair_Display, Great_Vibes, Cormorant_Garamond, Inter, Dancing_Script, Alex_Brush } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair-display',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'], // Dancing Script has 400 and 700 weights
  variable: '--font-dancing-script',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400', // Alex Brush only has 400 weight
  variable: '--font-alex-brush',
});

export const metadata: Metadata = {
    title: 'Salma & Andri Wedding Invitation',
    description: 'You are cordially invited to celebrate the wedding of Putri Andini Maharani and Raden Mas Satria Widjaja',
    keywords: 'wedding, invitation, undangan pernikahan, Salma, Andri',
    authors: [{ name: 'Wedding Invitation' }],
    openGraph: {
        title: 'Salma & Andri Wedding Invitation',
        description: 'You are cordially invited to celebrate our special day',
        type: 'website',
        siteName: 'Wedding Invitation',
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={`antialiased ${playfairDisplay.variable} ${greatVibes.variable} ${cormorantGaramond.variable} ${inter.variable} ${dancingScript.variable} ${alexBrush.variable}`}>
                {children}
            </body>
        </html>
    );
}
