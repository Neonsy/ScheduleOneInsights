import { homeMetadata } from '@/meta/home';
import { Metadata } from 'next';

export const metadata: Metadata = homeMetadata;

export default function Home() {
    return (
        <main className='flex h-[90svh] items-center justify-center px-12'>
            <h1 className='text-center'>
                The <span className='text-secondary font-bold'>HomePage</span> will being worked on{' '}
                <span className='text-secondary font-bold'>Next.JS</span> 😜
            </h1>
        </main>
    );
}
