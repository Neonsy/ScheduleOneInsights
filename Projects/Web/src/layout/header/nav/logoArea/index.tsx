import { siteLinks } from '@/lib/navigation/links';
import Link from 'next/link';
import Logo from '@/layout/header/nav/logoArea/Logo';
import Text from '@/layout/header/nav/logoArea/Text';

interface LogoAreaProps {
    onlyLogo?: boolean;
    onlyText?: boolean;
}

export default function LogoArea({ onlyLogo = false, onlyText = false }: LogoAreaProps) {
    if (onlyLogo) {
        return (
            <Link href={siteLinks.home.href} className='group select-none'>
                <Logo
                    size={80}
                    className='clamp-[w,16,20] clamp-[h,16,20] drop-shadow-[0_0_9px_theme(colors.primary.DEFAULT)]/35'
                />
            </Link>
        );
    }
    if (onlyText) {
        return (
            <Link href={siteLinks.home.href} className='group select-none'>
                <Text layout='column' />
            </Link>
        );
    }
    // Default: both logo and text
    return (
        <Link href={siteLinks.home.href} className='group flex items-center gap-2 select-none'>
            <Logo
                size={56}
                className='clamp-[w,12,14] clamp-[h,12,14] drop-shadow-[0_0_9px_theme(colors.primary.DEFAULT)]/35'
            />
            <Text layout='row' />
        </Link>
    );
}
