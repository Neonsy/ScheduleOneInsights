import Image from 'next/image';
import brandBaseNoBg from '@/assets/brand-base-no-bg.png';

interface LogoProps {
    size?: number;
    className?: string;
}

export default function Logo({ size = 55, className = '' }: LogoProps) {
    return (
        <>
            <Image
                src={brandBaseNoBg}
                alt='ScheduleOneInsights Logo'
                width={size}
                height={size}
                className={className}
                priority
            />
        </>
    );
}
