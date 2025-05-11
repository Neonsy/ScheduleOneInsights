import { rootMetadata } from '@/meta/root';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/layout/header';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} antialiased bg-body-main text-slate-50`}>
                <Header />
                {children}
            </body>
        </html>
    );
}
