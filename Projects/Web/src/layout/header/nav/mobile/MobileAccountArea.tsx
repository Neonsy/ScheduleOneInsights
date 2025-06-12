// MobileAccountArea: Handles user account actions (sign in, sign out, profile) for mobile navigation only.
// ---
// Why: This file exists to keep mobile account logic separate from desktop, improving maintainability and onboarding.
// - If you need to change mobile account logic, do it here. For desktop, see DesktopAccountArea.
// - Uses Clerk for authentication and neverthrow for error handling in event handlers.
// - All imports use the @/ alias for consistency.
// ---

'use client';

import { Spinner } from '@/components/LoadingSpinner';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { SiKofi } from 'react-icons/si';
import { siteLinks } from '@/lib/navigation/links';
import { useMobileAccountAreaHandlers } from '@/layout/header/nav/mobile/useMobileAccountAreaHandlers';

interface MobileAccountAreaProps {
    readonly closeMobileNav?: () => void;
}

export default function MobileAccountArea({ closeMobileNav }: MobileAccountAreaProps) {
    const { openUserProfile, loaded, openSignIn, openSignUp } = useClerk();
    const { user } = useUser();
    const { handleManageAccountClick, handleSignIn, handleSignUp, handleSignOut } = useMobileAccountAreaHandlers({
        closeMobileNav,
        loaded,
        openUserProfile,
        openSignIn,
        openSignUp,
    });

    return (
        <div className='clamp-[px,2,4] flex flex-col items-center space-y-3'>
            <ClerkLoading>
                <Spinner />
            </ClerkLoading>
            <ClerkLoaded>
                {/* Social links on top */}
                <div className='mb-2 flex items-center justify-center gap-x-3'>
                    {siteLinks.connectLinks.map((link) => {
                        let Icon;
                        switch (link.name) {
                            case 'GitHub Repository':
                                Icon = FiGithub;
                                break;
                            case 'Discord Server':
                                Icon = FaDiscord;
                                break;
                            case 'Ko-fi Support':
                                Icon = SiKofi;
                                break;
                            default:
                                Icon = null;
                        }
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                title={link.name.replace(/ (Repository|Server|Support)$/, '')}
                                className='text-slate-300 transition-colors'>
                                {Icon && <Icon className='size-6' />}
                            </Link>
                        );
                    })}
                </div>
                <hr className='mt-2 mb-4 w-3/4 border-white/80' />
                {/* SignedOut: Sign In, Sign Up buttons */}
                <SignedOut>
                    <button
                        type='button'
                        className='border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)/50,0_0_35px_theme(colors.primary.DEFAULT)/30,inset_0_0_8px_theme(colors.primary.DEFAULT)/40] focus-visible:ring-primary/50 mb-2 block w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'
                        onClick={handleSignIn}>
                        Sign In
                    </button>
                    <button
                        type='button'
                        className='border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.secondary.DEFAULT)/50,0_0_35px_theme(colors.secondary.DEFAULT)/30,inset_0_0_8px_theme(colors.secondary.DEFAULT)/40] focus-visible:ring-secondary/50 block w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'
                        onClick={handleSignUp}>
                        Sign Up
                    </button>
                </SignedOut>
                {/* SignedIn: Profile, Settings, Sign Out buttons */}
                <SignedIn>
                    {user?.imageUrl && (
                        <Image
                            src={user.imageUrl}
                            alt={user.fullName || 'User profile picture'}
                            width={40}
                            height={40}
                            className='clamp-[w,14,16] clamp-[h,14,16] ring-primary/70 mb-4 rounded-full shadow-md ring-2'
                        />
                    )}
                    <button
                        type='button'
                        onClick={handleManageAccountClick}
                        className='border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)/50,0_0_35px_theme(colors.primary.DEFAULT)/30,inset_0_0_8px_theme(colors.primary.DEFAULT)/40] focus-visible:ring-primary/50 mb-2 w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                        Settings
                    </button>
                    <button
                        type='button'
                        onClick={handleSignOut}
                        className='border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.secondary.DEFAULT)/50,0_0_35px_theme(colors.secondary.DEFAULT)/30,inset_0_0_8px_theme(colors.secondary.DEFAULT)/40] focus-visible:ring-secondary/50 w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                        Sign Out
                    </button>
                </SignedIn>
            </ClerkLoaded>
        </div>
    );
}
