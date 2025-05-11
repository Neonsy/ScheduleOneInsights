import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/shadcn/navigation-menu';
import { siteLinks } from '@/lib/navigation/links';

import Logo from '@/assets/brand-base-no-bg.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
    return (
        <nav className='py-1 flex items-center justify-between'>
            <Link href={siteLinks.home.href} className='flex items-center gap-x-2.5'>
                <Image
                    src={Logo}
                    alt='ScheduleOne Insights Logo'
                    width={64}
                    height={64}
                    className='drop-shadow-[0_0_9px_theme(colors.primary.DEFAULT)]/35'
                />
                <div className='flex gap-x-1'>
                    <span className='font-bold drop-shadow-[0_0_18px_rgba(255,255,255)]'>Schedule</span>
                    <span className='font-bold text-secondary drop-shadow-[0_0_18px_theme(colors.secondary.DEFAULT)]'>
                        One
                    </span>
                    <span className='font-bold text-primary drop-shadow-[0_0_18px_theme(colors.primary.DEFAULT)]'>
                        Insights
                    </span>
                </div>
            </Link>
            <div className='flex items-center gap-x-6'>
                {siteLinks.mainNav.map((item) => (
                    <NavigationMenu key={item.name}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                                <NavigationMenuContent className='bg-slate-100 p-4 min-w-max'>
                                    <ul className='grid gap-2'>
                                        {item.subPaths?.map((subPath) => (
                                            <li key={subPath.name}>
                                                <NavigationMenuLink
                                                    asChild
                                                    className='block px-4 py-3 border-b-2 border-black/30 transition-colors hover:bg-blue-100 focus:bg-blue-100 outline-none'>
                                                    <Link href={subPath.href}>
                                                        <div className='font-semibold text-gray-900 text-base'>
                                                            {subPath.name}
                                                        </div>
                                                        {subPath.description && (
                                                            <div className='text-xs text-gray-500 mt-1 leading-snug line-clamp-2'>
                                                                {subPath.description}
                                                            </div>
                                                        )}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                ))}
            </div>
        </nav>
    );
}
