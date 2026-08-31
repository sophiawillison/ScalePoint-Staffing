import type { Metadata } from 'next';
import './globals.css';
import { config } from '@/lib/config';
import { AudienceProvider } from '@/components/layout/AudienceProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: `${config.brandName} — U.S. Executive Recruitment & Talent Intelligence`,
    template: `%s — ${config.brandName}`,
  },
  description:
    'Confidential access to senior leadership opportunities across the United States, and mandate-led executive search for organizations hiring critical leaders.',
  openGraph: {
    title: `${config.brandName} — U.S. Executive Recruitment`,
    description: 'Confidential U.S. executive search and talent intelligence. No account required.',
    type: 'website',
    url: config.siteUrl,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts loaded at runtime; system fallbacks keep type intact offline. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AudienceProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-mineral"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </AudienceProvider>
      </body>
    </html>
  );
}
