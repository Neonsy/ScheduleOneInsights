'use client';

import { SignedIn, SignedOut, useClerk, useUser, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiMoreVertical } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';
import { SiKofi } from 'react-icons/si';
import { siteLinks } from '@/lib/navigation/links';
import { Spinner } from '@/components/LoadingSpinner';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
} from '@/components/shadcn/navigation-menu';

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

    const handleSignIn = () => {
        if (closeMobileNav && isMobile) closeMobileNav();
        if (typeof window !== 'undefined') {
            window.location.href = '/sign-in';
        }
    };

    const handleSignUp = () => {
        if (closeMobileNav && isMobile) closeMobileNav();
        if (typeof window !== 'undefined') {
            window.location.href = '/sign-up';
        }
    };

    return isMobile ? (
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
                                className={`hover:text-${link.name === 'Ko-fi Support' ? 'secondary' : 'primary'} text-slate-300 transition-colors`}>
                                {Icon && <Icon className='size-6' />}
                            </Link>
                        );
                    })}
                </div>
                <hr className='mt-2 mb-4 w-3/4 border-white/80' />
                {/* SignedOut: Sign In, Sign Up buttons */}
                <SignedOut>
                    <Link
                        href='/sign-in'
                        className={`${primaryButtonClasses} px-3 py-2 text-center`}
                        onClick={handleSignIn}>
                        Sign In
                    </Link>
                    <Link
                        href='/sign-up'
                        className={`${secondaryButtonClasses} px-3 py-2 text-center`}
                        onClick={handleSignUp}>
                        Sign Up
                    </Link>
                </SignedOut>
                {/* SignedIn: Manage Account, Sign Out buttons */}
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
                    <Link
                        href='/sign-in'
                        className={`${primaryButtonClasses} px-3 py-2 text-center`}
                        onClick={handleManageAccountClick}>
                        Manage Account
                    </Link>
                    <Link
                        href='/'
                        className={`${secondaryButtonClasses} px-3 py-2 text-center`}
                        onClick={handleSignOut}>
                        Sign Out
                    </Link>
                </SignedIn>
            </ClerkLoaded>
        </div>
    ) : (
        <>
            <ClerkLoading>
                <Spinner />
            </ClerkLoading>
            <ClerkLoaded>
                <NavigationMenu className='relative' viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger asChild>
                                <button
                                    aria-label='Account menu'
                                    className='hover:bg-accent focus-visible:ring-primary/60 flex items-center justify-center rounded-full p-2 transition focus-visible:ring-2'>
                                    {user?.imageUrl ? (
                                        <Image
                                            src={user.imageUrl}
                                            alt={user.fullName || 'User profile picture'}
                                            width={32}
                                            height={32}
                                            className='clamp-[w,8,10] clamp-[h,8,10] rounded-full object-cover'
                                        />
                                    ) : (
                                        <FiMoreVertical className='size-6 text-slate-300' />
                                    )}
                                </button>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className='bg-header-main-darker z-50 w-max min-w-[12rem] rounded-xl border border-slate-700 p-2 shadow-xl'>
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
                                                className={`hover:text-${link.name === 'Ko-fi Support' ? 'secondary' : 'primary'} text-slate-300 transition-colors`}>
                                                {Icon && <Icon className='size-5' />}
                                            </Link>
                                        );
                                    })}
                                </div>
                                <hr className='my-2 border-white/80' />
                                <SignedOut>
                                    <Link
                                        href='/sign-in'
                                        className='border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)/50,0_0_35px_theme(colors.primary.DEFAULT)/30,inset_0_0_8px_theme(colors.primary.DEFAULT)/40] focus-visible:ring-primary/50 mb-2 block w-full rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                                        Sign In
                                    </Link>
                                    <Link
                                        href='/sign-up'
                                        className='border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.secondary.DEFAULT)/50,0_0_35px_theme(colors.secondary.DEFAULT)/30,inset_0_0_8px_theme(colors.secondary.DEFAULT)/40] focus-visible:ring-secondary/50 block w-full rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                                        Sign Up
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <button
                                        type='button'
                                        onClick={handleManageAccountClick}
                                        className='border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)/50,0_0_35px_theme(colors.primary.DEFAULT)/30,inset_0_0_8px_theme(colors.primary.DEFAULT)/40] focus-visible:ring-primary/50 mb-2 w-full rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                                        Manage Account
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleSignOut}
                                        className='border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)/30] hover:shadow-[0_0_20px_theme(colors.secondary.DEFAULT)/50,0_0_35px_theme(colors.secondary.DEFAULT)/30,inset_0_0_8px_theme(colors.secondary.DEFAULT)/40] focus-visible:ring-secondary/50 w-full rounded-xl border px-3 py-2 text-center hover:[transform:perspective(500px)_rotateX(5deg)] hover:text-white focus-visible:ring-4'>
                                        Sign Out
                                    </button>
                                </SignedIn>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </ClerkLoaded>
        </>
    );
}
