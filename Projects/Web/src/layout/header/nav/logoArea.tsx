import { siteLinks } from '@/lib/navigation/links';

import Logo from '@/assets/brand-base-no-bg.png';
import Image from 'next/image';
import Link from 'next/link';

export default function LogoArea() {
    return (
        <Link href={siteLinks.home.href} className='flex items-center gap-x-2.5 py-1'>
            <Image
                src={Logo}
                alt='ScheduleOne Insights Logo'
                width={64}
                height={64}
                className='drop-shadow-[0_0_9px_theme(colors.primary.DEFAULT)]/35'
            />
            <div className='flex gap-x-1'>
                <span className='font-bold text-3xl text-secondary drop-shadow-[0_0_18px_theme(colors.secondary.DEFAULT)]'>
                    Schedule
                </span>
                <span className='font-bold text-3xl drop-shadow-[0_0_18px_rgba(255,255,255)]'>One</span>
                <span className='font-bold text-3xl text-primary drop-shadow-[0_0_18px_theme(colors.primary.DEFAULT)]'>
                    Insights
                </span>
            </div>
        </Link>
    );
}
