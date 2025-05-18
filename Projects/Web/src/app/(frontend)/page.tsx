import { homeMetadata } from '@/meta/home';
import { Metadata } from 'next';

export const metadata: Metadata = homeMetadata;

export default function Home() {
    return (
        <main className='flex h-[90svh] items-center justify-center'>
            <h1>The HomePage will being worked on Next.JS ;)</h1>
        </main>
    );
}
