import wipImage from '@/assets/wip.webp';
import Image from 'next/image';
import Link from 'next/link';

export default function Wip() {
    return (
        <main className='flex h-svh flex-col items-center justify-center bg-neutral-950 px-4 text-neutral-100'>
            <div className='flex w-full max-w-3xl flex-col items-center gap-6'>
                <Image
                    src={wipImage}
                    alt='WIP'
                    className='rounded-xl drop-shadow-[0_0_15px_var(--color-primary),0_0_30px_var(--color-secondary)]/5'
                    width={1536}
                    height={1024}
                    priority
                />
                <h1 className='text-center text-3xl font-bold tracking-tight'>Work In Progress</h1>
                <p className='text-center text-base text-neutral-400'>
                    The page you tried to access is currently under construction.
                    <br />
                    We&apos;re working hard to bring it to you soon!
                </p>
                <Link
                    href='/'
                    className='bg-primary text-primary-foreground hover:bg-primary/80 focus:ring-primary mt-4 inline-block rounded-lg px-6 py-2 font-semibold shadow transition focus:ring-2 focus:outline-none'>
                    Go back home
                </Link>
            </div>
        </main>
    );
}
