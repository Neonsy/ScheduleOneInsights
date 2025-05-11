export default function Wip() {
    return (
        <main className='min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 px-4'>
            <div className='flex flex-col items-center gap-6 max-w-md w-full'>
                <div className='rounded-full bg-gradient-to-tr from-primary to-secondary p-2 shadow-lg'>
                    <svg width='64' height='64' viewBox='0 0 24 24' fill='none' className='text-primary-foreground'>
                        <path
                            d='M12 8v4l3 1'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                    </svg>
                </div>
                <h1 className='text-3xl font-bold tracking-tight text-center'>Work In Progress</h1>
                <p className='text-base text-neutral-400 text-center'>
                    The page you tried to access is currently under construction.
                    <br />
                    We&apos;re working hard to bring it to you soon!
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
