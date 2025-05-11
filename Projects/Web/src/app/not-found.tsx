export default function NotFound() {
    return (
        <main className='min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 px-4'>
            <div className='flex flex-col items-center gap-6 max-w-md w-full'>
                <div className='rounded-full bg-gradient-to-tr from-red-600 to-primary p-2 shadow-lg'>
                    <svg width='64' height='64' viewBox='0 0 24 24' fill='none' className='text-primary-foreground'>
                        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                        <path
                            d='M9.17 9.17l5.66 5.66M14.83 9.17l-5.66 5.66'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                        />
                    </svg>
                </div>
                <h1 className='text-4xl font-bold tracking-tight text-center'>404</h1>
                <p className='text-lg text-neutral-400 text-center'>
                    Sorry, the page you&apos;re looking for doesn&apos;t exist.
                    <br />
                    It might have been moved or deleted.
                </p>
                <a
                    href='/'
                    className='mt-4 inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow transition hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary'>
                    Go back home
                </a>
            </div>
        </main>
    );
}
