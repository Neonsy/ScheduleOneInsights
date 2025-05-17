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
            <nav className='clamp-[py,0.5,1] flex items-center justify-between md:justify-around'>
                {/* Mobile: Logo Icon Link (Left) */}
                {/* <Link href={siteLinks.home.href} className='p-1 md:hidden'> */}
                {/* <Image */}
                {/* src={Logo} */}
                {/* alt='ScheduleOne Insights Logo Icon' */}
                {/* width={48} */}
                {/* height={48} */}
                {/* className='clamp-[w,12,16] clamp-[h,12,16] drop-shadow-[0_0_9px_theme(colors.primary.DEFAULT)]/35' */}
                {/* /> */}
                {/* </Link> */}

                {/* Mobile: Text Link - Now a direct child for testing, not in flex-grow div */}
                <div className='md:hidden'>
                    {' '}
                    {/* Simple wrapper to apply md:hidden */}
                    <LogoArea />
                </div>

                {/* Original flex-grow container - now empty for mobile testing */}
                <div className='flex flex-grow items-center justify-center md:hidden'>
                    {/* <LogoArea /> was here */}
                </div>

                {/* Desktop: Combined Logo and Text (Placeholder - to be refined) */}
                <div className='hidden md:flex md:items-center md:clamp-[gap-x,9,12]'>
                    <LogoArea />
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex'>
                    <NavArea />
                </div>

                <div className='clamp-[gap-x,3,4] flex items-center'>
                    {/* Desktop Account Area */}
                    <div className='hidden md:block'>
                        <AccountArea />
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        type='button'
                        onClick={toggleMobileMenu}
                        className='clamp-[text,2xl,3xl] text-white focus:outline-none md:hidden'
                        aria-label='Toggle navigation menu'>
                        {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
            </nav>

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
