import { siteLinks } from '@/lib/navigation/links';
import Link from 'next/link';
import Image from 'next/image';
import brandBaseNoBg from '@/assets/brand-base-no-bg.png';

interface LogoAreaProps {
    onlyLogo?: boolean;
    onlyText?: boolean;
}

export default function LogoArea({ onlyLogo = false, onlyText = false }: LogoAreaProps) {
    if (onlyLogo) {
        return (
            <Link href={siteLinks.home.href} className='group select-none'>
                <Image
                    src={brandBaseNoBg}
                    alt='ScheduleOneInsights Logo'
                    width={80}
                    height={80}
                    className='clamp-[w,16,20] clamp-[h,16,20] drop-shadow-[0_0_9px_theme(colors.primary.DEFAULT)]/35'
                    priority
                />
            </Link>
        );
    }
    if (onlyText) {
        return (
            <Link href={siteLinks.home.href} className='group select-none'>
                <span className='flex flex-col items-center justify-center leading-tight'>
                    <span className='clamp-[text,1rem,1.5rem,@md,@2xl] flex flex-row gap-1 font-extrabold'>
                        <span className='text-primary drop-shadow-[0_0_8px_theme(colors.primary.DEFAULT)/80]'>
                            Schedule
                        </span>
                        <span className='text-slate-50 drop-shadow-[0_0_8px_theme(colors.slate.50)/80]'>One</span>
                    </span>
                    <span className='clamp-[text,1rem,1.5rem,@md,@2xl] text-secondary drop-shadow-[0_0_8px_theme(colors.secondary.DEFAULT)/80] mt-0.5 font-extrabold'>
                        Insights
                    </span>
                </span>
            </Link>
        );
    }
    // Default: both logo and text
    return (
        <Link href={siteLinks.home.href} className='group flex items-center gap-2 select-none'>
            <Image
                src={brandBaseNoBg}
                alt='ScheduleOneInsights Logo'
                width={56}
                height={56}
                className='clamp-[w,12,14] clamp-[h,12,14] drop-shadow-[0_0_9px_theme(colors.primary.DEFAULT)]/35'
                priority
            />
            <span className='flex flex-col items-center justify-center leading-tight lg:flex-row'>
                <span className='clamp-[text,1rem,1.5rem,@md,@2xl] flex flex-row gap-1 font-extrabold'>
                    <span className='text-primary drop-shadow-[0_0_8px_theme(colors.primary.DEFAULT)/80]'>
                        Schedule
                    </span>
                    <span className='text-slate-50 drop-shadow-[0_0_8px_theme(colors.slate.50)/80]'>One</span>
                </span>
                <span className='clamp-[text,1rem,1.5rem,@md,@2xl] text-secondary drop-shadow-[0_0_8px_theme(colors.secondary.DEFAULT)/80] mt-0.5 font-extrabold'>
                    Insights
                </span>
            </span>
        </Link>
    );
}
