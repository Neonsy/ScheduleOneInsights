// DesktopAccountArea: Handles user account actions (sign in, sign out, profile) for desktop navigation only.
// ---
// Why: This file exists to keep desktop account logic separate from mobile, improving maintainability and onboarding.
// - If you need to change desktop account logic, do it here. For mobile, see MobileAccountArea.
// - Uses Clerk for authentication and neverthrow for error handling in event handlers.
// - All imports use the @/ alias for consistency.
// ---

'use client';

import { Spinner } from '@/components/LoadingSpinner';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/shadcn/navigation-menu';
import { siteLinks } from '@/lib/navigation/links';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { FiGithub, FiMoreVertical } from 'react-icons/fi';
import { SiKofi } from 'react-icons/si';
import { useDesktopAccountAreaHandlers } from '@/layout/header/nav/desktop/useDesktopAccountAreaHandlers';

export default function DesktopAccountArea() {
    const { openUserProfile, loaded, openSignIn, openSignUp } = useClerk();
    const { user } = useUser();
    const [signingOut, setSigningOut] = useState(false);
    const { handleManageAccountClick, handleSignIn, handleSignUp, handleSignOut } = useDesktopAccountAreaHandlers({
        loaded,
        openUserProfile,
        openSignIn,
        openSignUp,
        setSigningOut,
    });

    return (
        <>
            <ClerkLoading>
                <div className='flex h-[48px] w-[48px] items-center justify-center'>
                    <Spinner size='small' className='h-8 w-8' />
                </div>
            </ClerkLoading>
            <ClerkLoaded>
                <div className='flex h-[48px] w-[48px] items-center justify-center px-4'>
                    <NavigationMenu className='flex h-full w-full items-center justify-center' viewport={false}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger asChild>
                                    <button
                                        aria-label='Account menu'
                                        className='m-0 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-transparent p-0'>
                                        {user?.imageUrl ? (
                                            <Image
                                                src={user.imageUrl}
                                                alt={user.fullName || 'User profile picture'}
                                                width={40}
                                                height={40}
                                                className='h-10 w-10 rounded-full object-cover'
                                                priority
                                            />
                                        ) : (
                                            <FiMoreVertical className='h-8 w-8 text-slate-300' />
                                        )}
                                    </button>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className='bg-header-main-darker z-50 w-max min-w-[12rem] rounded-xl border border-slate-700 p-2 px-4 shadow-xl md:right-0 md:left-auto'>
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
                                                    className={`$${
                                                        link.name === 'GitHub Repository'
                                                            ? 'hover:text-github'
                                                            : link.name === 'Discord Server'
                                                              ? 'hover:text-discord'
                                                              : 'hover:text-kofi'
                                                    } text-slate-300 transition-colors`}>
                                                    {Icon && <Icon className='size-5' />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <hr className='my-2 border-white/80' />
                                    <SignedOut>
                                        <button
                                            type='button'
                                            onClick={handleSignIn}
                                            className='border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)/50,0_0_35px_theme(colors.primary.DEFAULT)/30,inset_0_0_8px_theme(colors.primary.DEFAULT)/40] focus-visible:ring-primary/50 mb-2 block w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                                            Sign In
                                        </button>
                                        <button
                                            type='button'
                                            onClick={handleSignUp}
                                            className='border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.secondary.DEFAULT)/50,0_0_35px_theme(colors.secondary.DEFAULT)/30,inset_0_0_8px_theme(colors.secondary.DEFAULT)/40] focus-visible:ring-secondary/50 block w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                                            Sign Up
                                        </button>
                                    </SignedOut>
                                    <SignedIn>
                                        <button
                                            type='button'
                                            onClick={handleManageAccountClick}
                                            className='border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)/50,0_0_35px_theme(colors.primary.DEFAULT)/30,inset_0_0_8px_theme(colors.primary.DEFAULT)/40] focus-visible:ring-primary/50 mb-2 w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                                            Settings
                                        </button>
                                        <button
                                            type='button'
                                            className='border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.secondary.DEFAULT)/50,0_0_35px_theme(colors.secondary.DEFAULT)/30,inset_0_0_8px_theme(colors.secondary.DEFAULT)/40] focus-visible:ring-secondary/50 w-full cursor-pointer rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'
                                            disabled={signingOut}
                                            onClick={handleSignOut}>
                                            {signingOut ? <Spinner size='small' /> : 'Sign Out'}
                                        </button>
                                    </SignedIn>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </ClerkLoaded>
        </>
    );
}
