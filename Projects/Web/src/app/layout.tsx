import { rootMetadata } from '@/meta/root';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { ReactNode } from 'react';

import Providers from '@/providers';
import Header from '@/layout/header';

import '@/styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = rootMetadata;
export const viewport: Viewport = {
    themeColor: '#09090b',
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <Providers>
            <html lang='en'>
                <body className={`${montserrat.className} antialiased bg-body-main text-slate-50`}>
                    <Header />
                    {children}
                    <Analytics />
                    <SpeedInsights />
                </body>
            </html>
        </Providers>
    );
}
