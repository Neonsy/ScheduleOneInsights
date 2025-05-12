import notFoundImage from '@/assets/404.webp';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className='h-[90vh] flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 px-4'>
            <div className='flex flex-col items-center gap-6 max-w-3xl w-full'>
                <Image
                    src={notFoundImage}
                    alt='404'
                    className='rounded-xl drop-shadow-[0_0_15px_var(--color-primary),0_0_30px_var(--color-secondary)]/5'
                />
                <h1 className='text-3xl font-bold tracking-tight text-center'>Page Not Found</h1>
                <p className='text-base text-neutral-400 text-center'>
                    The page you tried to access does not exist.
                    <br />
                    It might have been moved or deleted.
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
