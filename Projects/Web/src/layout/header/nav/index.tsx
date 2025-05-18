'use client';

import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import AccountArea from '@/layout/header/nav/accountArea';
import LogoArea from '@/layout/header/nav/logoArea';
import NavArea from '@/layout/header/nav/navArea';

export default function Nav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Mobile Header: full width, no container */}
            <div className='w-full md:hidden'>
                <nav className='clamp-[py,0.5,1] relative flex items-center justify-between'>
                    {/* Mobile Nav Header */}
                    <div className='relative flex h-16 w-full items-center md:hidden'>
                        {/* Logo on the left */}
                        <div className='flex h-full items-center justify-start pl-2'>
                            <LogoArea onlyLogo />
                        </div>
                        {/* Centered logo text */}
                        <div className='flex flex-1 items-center justify-center'>
                            <LogoArea onlyText />
                        </div>
                        {/* Hamburger on the right */}
                        <div className='flex h-full items-center justify-end pr-2'>
                            <button
                                type='button'
                                onClick={toggleMobileMenu}
                                className='clamp-[text,2xl,3xl] text-white focus:outline-none'
                                aria-label='Toggle navigation menu'>
                                {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Desktop Nav: constrained in Container */}
            <div className='hidden w-full md:block'>
                <nav className='clamp-[py,0.5,1] relative flex items-center justify-between md:gap-x-4 lg:gap-x-8'>
                    <div className='flex-shrink-0 md:flex md:items-center'>
                        <LogoArea />
                    </div>
                    <div className='flex-shrink-0 md:flex md:items-center md:gap-x-4 lg:gap-x-8'>
                        <NavArea />
                    </div>
                    <div className='flex-shrink-0 md:flex md:items-center'>
                        <AccountArea />
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div className='bg-header-main-darker clamp-[py,3,4] clamp-[px,1,2] absolute top-full right-0 left-0 z-50 shadow-lg md:hidden'>
                <NavArea
                    isMobile={true}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
            </div>
        </>
    );
}
