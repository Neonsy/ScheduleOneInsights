import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import SignOutClient from '@/app/(clerk)/sign-out/SignOutClient';

export default async function SignOutPage() {
    const user = await currentUser();
    if (!user) {
        redirect('/');
    }
    // End the session and redirect to home
    // Clerk does not provide a direct server-side signOut, so we must use a client-side fallback
    // Instead, render a minimal client component to trigger signOut
    return <SignOutClient />;
}
