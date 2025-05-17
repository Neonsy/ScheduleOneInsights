'use client';

import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    useClerk,
    useUser,
} from '@clerk/nextjs';
import Image from 'next/image';
import { Spinner } from '@/components/LoadingSpinner';

interface AccountAreaProps {
    readonly isMobile?: boolean;
    readonly closeMobileNav?: () => void;
}

export default function AccountArea({ isMobile = false, closeMobileNav }: AccountAreaProps) {
    const { openUserProfile, signOut, loaded } = useClerk();
    const { user } = useUser();

    const baseButtonClasses =
        'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl font-semibold transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none clamp-[py,1,1.5] clamp-[px,3,4] clamp-[text,base,lg] tracking-wide leading-snug min-h-0';

    const primaryButtonClasses = `${baseButtonClasses} border border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)/30] hover:text-white hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)/50,0_0_35px_theme(colors.primary.DEFAULT)/30,inset_0_0_8px_theme(colors.primary.DEFAULT)/40] focus-visible:ring-4 focus-visible:ring-primary/50 hover:[transform:perspective(500px)_rotateX(5deg)]`;
    const secondaryButtonClasses = `${baseButtonClasses} border border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)/30] hover:text-white hover:shadow-[0_0_20px_theme(colors.secondary.DEFAULT)/50,0_0_35px_theme(colors.secondary.DEFAULT)/30,inset_0_0_8px_theme(colors.secondary.DEFAULT)/40] focus-visible:ring-4 focus-visible:ring-secondary/50 hover:[transform:perspective(500px)_rotateX(5deg)]`;

    const handleManageAccountClick = () => {
        if (closeMobileNav && isMobile) closeMobileNav();
        if (loaded && typeof openUserProfile === 'function') {
            openUserProfile();
        }
    };

    const handleSignOut = async () => {
        if (closeMobileNav && isMobile) closeMobileNav();
        if (typeof signOut === 'function') {
            await signOut();
        }
    };

    return (
        <div className={isMobile ? 'w-full' : 'flex w-auto min-w-[340px] justify-center'}>
            <ClerkLoading>
                <div
                    className={`flex min-h-[44px] items-center ${isMobile ? 'w-full flex-col items-center space-y-3' : 'justify-center gap-x-3 md:min-w-[320px]'}`}>
                    {isMobile ? (
                        <div className={`h-12 w-48 animate-pulse rounded-lg bg-white/70`}></div>
                    ) : (
                        <Spinner className='size-10' />
                    )}
                </div>
            </ClerkLoading>
            <ClerkLoaded>
                <SignedOut>
                    <div
                        className={`flex min-h-[44px] ${isMobile ? 'w-full flex-col items-center space-y-3' : 'items-center gap-x-3'}`}>
                        <div onClick={() => closeMobileNav && closeMobileNav()}>
                            <SignInButton>
                                <button type='button' className={`${primaryButtonClasses} px-5 py-2`}>
                                    <span className='relative z-10'>Sign In</span>
                                </button>
                            </SignInButton>
                        </div>
                        <div onClick={() => closeMobileNav && closeMobileNav()}>
                            <SignUpButton>
                                <button type='button' className={`${secondaryButtonClasses} px-5 py-2`}>
                                    <span className='relative z-10'>Sign Up</span>
                                </button>
                            </SignUpButton>
                        </div>
                    </div>
                </SignedOut>
                <SignedIn>
                    {isMobile ? (
                        <div className='flex w-full flex-col items-center space-y-3'>
                            {user?.imageUrl && (
                                <Image
                                    src={user.imageUrl}
                                    alt={user.fullName || 'User profile picture'}
                                    width={64}
                                    height={64}
                                    className='ring-primary/70 clamp-[w,14,16] clamp-[h,14,16] rounded-full shadow-md ring-2'
                                />
                            )}
                            {loaded && (
                                <button
                                    type='button'
                                    onClick={handleManageAccountClick}
                                    className='clamp-[text,base,lg] cursor-pointer rounded-md bg-slate-700/50 px-5 py-2 text-center font-semibold text-white hover:bg-slate-600/50 focus:outline-none'>
                                    Manage Account
                                </button>
                            )}
                            <button
                                type='button'
                                onClick={handleSignOut}
                                className='clamp-[text,base,lg] cursor-pointer rounded-md bg-slate-700/50 px-5 py-2 text-center font-semibold text-white hover:bg-slate-600/50 focus:outline-none'>
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className={`flex min-h-[44px] items-center justify-center`}>
                            <span className='text-white'>Desktop Account (UserButton placeholder)</span>
                        </div>
                    )}
                </SignedIn>
            </ClerkLoaded>
        </div>
    );
}
