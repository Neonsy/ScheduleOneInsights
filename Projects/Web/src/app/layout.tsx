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
    width: 'device-width',
    initialScale: 1,
};

interface RootLayoutProps {
    children: ReactNode;
    authModal: ReactNode;
}

export default function RootLayout({ children, authModal }: RootLayoutProps) {
    return (
        <Providers>
            <html lang='en'>
                <body className={`${montserrat.className} bg-body-main text-slate-50 antialiased`}>
                    <Header />
                    {children}
                    {authModal}
                    <Analytics />
                    <SpeedInsights />
                </body>
            </html>
        </Providers>
    );
}
