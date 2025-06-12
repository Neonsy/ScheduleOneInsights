// DesktopNavArea: Handles the navigation menu for desktop screens only.
// ---
// Why: This file only handles desktop navigation. For mobile, see MobileNavArea. This separation keeps code focused and maintainable.
// If you need to change desktop nav logic, do it here. For account area, use DesktopAccountArea.
// ---

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/shadcn/navigation-menu';
import { siteLinks } from '@/lib/navigation/links';
import { NavItem, NavSubItem } from '@/types/navigation';
import Link from 'next/link';
import { Fragment } from 'react';
import ListItem from '@/layout/header/nav/desktop/ListItem';

export default function DesktopNavArea() {
    return (
        <NavigationMenu className='hidden md:flex'>
            <NavigationMenuList className='clamp-[gap-x,3,5]'>
                {/* Loop through main nav sections */}
                {siteLinks.mainNav.map((section: NavItem) => {
                    // Simple link (no submenu)
                    if (section.href && (!section.subPaths || section.subPaths.length === 0)) {
                        return (
                            <NavigationMenuItem key={section.name}>
                                <Link href={section.href} passHref>
                                    <NavigationMenuLink className='clamp-[px,3,4] clamp-[py,1,2] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground clamp-[text,1rem,1.5rem,md,2xl] inline-flex h-auto items-center justify-center rounded-md font-semibold transition-colors'>
                                        {section.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        );
                    }
                    // Dropdown menu for sections with subPaths
                    if (section.subPaths && section.subPaths.length > 0) {
                        return (
                            <NavigationMenuItem key={section.name}>
                                <NavigationMenuTrigger className='group clamp-[px,3,4] clamp-[py,1,2] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent/50 inline-flex h-auto items-center justify-center rounded-md font-semibold transition-colors'>
                                    <span className='clamp-[text,base,3xl,768px,1536px]'>{section.name}</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className='w-full mt-5'>
                                    <ul className='flex w-full flex-col items-center gap-3 p-4'>
                                        {section.subPaths?.map((item: NavSubItem, index: number) => (
                                            <Fragment key={item.name}>
                                                <ListItem href={item.href} title={item.name}>
                                                    {item.description}
                                                </ListItem>
                                                {/* Divider between submenu items */}
                                                {section.subPaths && index < section.subPaths.length - 1 && (
                                                    <hr className='w-3/4 border-slate-50' />
                                                )}
                                            </Fragment>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        );
                    }
                    return null;
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
