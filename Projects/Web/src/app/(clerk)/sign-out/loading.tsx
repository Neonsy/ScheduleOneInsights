import { Spinner } from '@/components/LoadingSpinner';

export default function Loading() {
    return (
        <main className='flex h-[90svh] items-center justify-center'>
            <Spinner size='large' />
        </main>
    );
}
