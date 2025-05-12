import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/shadcn/navigation-menu';
import { siteLinks } from '@/lib/navigation/links';

import Link from 'next/link';

export default function NavArea() {
    return (
        <div className='flex items-center gap-x-6'>
            {siteLinks.mainNav.map((item) => (
                <NavigationMenu key={item.name}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='text-xl'>{item.name}</NavigationMenuTrigger>
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
    );
}
