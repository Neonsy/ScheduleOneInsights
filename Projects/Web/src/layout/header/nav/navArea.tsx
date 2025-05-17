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
import { cn } from '@/lib/utils/shadcn';
import React from 'react';
import MobileNavArea from './mobile/MobileNavArea';

interface NavAreaProps {
    readonly isMobile?: boolean;
    readonly isMobileMenuOpen?: boolean;
    readonly setIsMobileMenuOpen?: (open: boolean) => void;
}

const ListItem = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'> & { readonly title: string }>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li className='w-full'>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block w-full space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                            className
                        )}
                        {...props}>
                        <div className='clamp-[text,lg,xl] text-center font-semibold'>{title}</div>
                        <p className='text-muted-foreground clamp-[text,base,lg] line-clamp-2 text-center'>
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = 'ListItem';

export default function NavArea({
    isMobile = false,
    isMobileMenuOpen = false,
    setIsMobileMenuOpen = () => {},
}: NavAreaProps) {
    if (isMobile) {
        return <MobileNavArea open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />;
    }

    return (
        <NavigationMenu className='hidden md:flex'>
            <NavigationMenuList className='clamp-[gap-x,3,5]'>
                {siteLinks.mainNav.map((section: NavItem) => {
                    if (section.href && (!section.subPaths || section.subPaths.length === 0)) {
                        return (
                            <NavigationMenuItem key={section.name}>
                                <Link href={section.href} passHref>
                                    <NavigationMenuLink className='clamp-[px,3,4] clamp-[py,1,2] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-auto items-center justify-center rounded-md text-3xl font-semibold transition-colors'>
                                        {section.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        );
                    }
                    if (section.subPaths && section.subPaths.length > 0) {
                        return (
                            <NavigationMenuItem key={section.name}>
                                <NavigationMenuTrigger className='group clamp-[px,3,4] clamp-[py,1,2] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent/50 inline-flex h-auto items-center justify-center rounded-md text-3xl font-semibold transition-colors'>
                                    {section.name}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className='w-full'>
                                    <ul className='flex w-full flex-col items-center gap-3 p-4'>
                                        {section.subPaths?.map((item: NavSubItem, index: number) => (
                                            <React.Fragment key={item.name}>
                                                <ListItem href={item.href} title={item.name}>
                                                    {item.description}
                                                </ListItem>
                                                {section.subPaths && index < section.subPaths.length - 1 && (
                                                    <hr className='w-3/4 border-slate-50' />
                                                )}
                                            </React.Fragment>
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
