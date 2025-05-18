'use client';

import { useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';
import { Spinner } from '@/components/LoadingSpinner';

export default function SignOutClient() {
    'use client';
    const { signOut } = useClerk();
    useEffect(() => {
        signOut({ redirectUrl: '/' });
    }, [signOut]);
    return (
        <main className='flex h-[90svh] items-center justify-center'>
            <Spinner size='large' />
        </main>
    );
}
