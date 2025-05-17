import { SignUp } from '@clerk/nextjs';

import { Spinner } from '@/components/LoadingSpinner';

export default function Page() {
    return (
        <main className='flex h-[90svh] w-screen items-center justify-center'>
            <SignUp fallback={<Spinner className='overflow-hidden' size={'large'} />} />
        </main>
    );
}
