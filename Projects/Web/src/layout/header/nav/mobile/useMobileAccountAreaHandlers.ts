// useMobileAccountAreaHandlers: Encapsulates all handler logic for the mobile account area.
// ---
// Why: Separating handler logic from the component keeps the render code concise and improves DX/onboarding.
// ---

import { Result, err } from 'neverthrow';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

interface UseMobileAccountAreaHandlersProps {
    closeMobileNav?: () => void;
    loaded: boolean;
    openUserProfile?: () => void;
    openSignIn?: () => void;
    openSignUp?: () => void;
}

export function useMobileAccountAreaHandlers({
    closeMobileNav,
    loaded,
    openUserProfile,
    openSignIn,
    openSignUp,
}: UseMobileAccountAreaHandlersProps) {
    const router = useRouter();

    const handleManageAccountClick = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const result = Result.fromThrowable(
            () => {
                if (closeMobileNav) closeMobileNav();
                if (!loaded) throw new Error('Clerk not loaded');
                if (typeof openUserProfile !== 'function') throw new Error('User profile function not available');
                openUserProfile();
            },
            (error) => err(error instanceof Error ? error : new Error('Unknown error'))
        )();
        if (result.isErr()) {
            // Handle error (e.g., show toast, log, etc.)
        }
    };

    const handleSignIn = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const result = Result.fromThrowable(
            () => {
                if (closeMobileNav) closeMobileNav();
                if (!loaded) throw new Error('Clerk not loaded');
                if (typeof openSignIn !== 'function') throw new Error('Sign in function not available');
                openSignIn();
            },
            (error) => err(error instanceof Error ? error : new Error('Unknown error'))
        )();
        if (result.isErr()) {
            // Handle error
        }
    };

    const handleSignUp = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const result = Result.fromThrowable(
            () => {
                if (closeMobileNav) closeMobileNav();
                if (!loaded) throw new Error('Clerk not loaded');
                if (typeof openSignUp !== 'function') throw new Error('Sign up function not available');
                openSignUp();
            },
            (error) => err(error instanceof Error ? error : new Error('Unknown error'))
        )();
        if (result.isErr()) {
            // Handle error
        }
    };

    const handleSignOut = (): void => {
        if (closeMobileNav) closeMobileNav();
        router.push('/sign-out');
    };

    return { handleManageAccountClick, handleSignIn, handleSignUp, handleSignOut };
}
