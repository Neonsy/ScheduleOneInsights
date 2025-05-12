import wipImage from '@/assets/wip.webp';
import Image from 'next/image';
import Link from 'next/link';

export default function Wip() {
    return (
        <main className='h-[90vh] flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 px-4'>
            <div className='flex flex-col items-center gap-6 max-w-3xl w-full'>
                <Image
                    src={wipImage}
                    alt='WIP'
                    className='rounded-xl drop-shadow-[0_0_15px_var(--color-primary),0_0_30px_var(--color-secondary)]/5'
                />
                <h1 className='text-3xl font-bold tracking-tight text-center'>Work In Progress</h1>
                <p className='text-base text-neutral-400 text-center'>
                    The page you tried to access is currently under construction.
                    <br />
                    We&apos;re working hard to bring it to you soon!
                </p>
                <Link
                    href='/'
                    className='mt-4 inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow transition hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary'>
                    Go back home
                </Link>
            </div>
        </main>
    );
}
