import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { getContent } from '@/lib/content';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const content = getContent();
  return {
    title: {
      template: `%s | ${content.site.name}`,
      default: content.site.name,
    },
    description: content.site.description,
    openGraph: {
      title: content.site.name,
      description: content.site.description,
      url: content.site.url,
      siteName: content.site.name,
      images: [
        {
          url: '/images/hero.jpg',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    metadataBase: new URL(content.site.url),
    icons: {
      icon: '/images/logo.jpg',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
         <script 
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const saved = localStorage.getItem('kamdhenu_products');
                  if (saved && saved.includes('//images/')) {
                    localStorage.removeItem('kamdhenu_products');
                    console.log('Cleared corrupted image cache');
                  }
                } catch (e) {}
              `
            }}
         />
      </head>
      <body className="antialiased bg-bg text-primary font-body overflow-x-hidden selection:bg-accent selection:text-bg">
        {children}
      </body>
    </html>
  );
}
