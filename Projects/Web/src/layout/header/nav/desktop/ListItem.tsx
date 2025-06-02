// ListItem: Renders a single nav link or submenu item for desktop navigation.
// ---
// Why: Cursor rules require only one component per file. This component is used by DesktopNavArea.
// ---

import { NavigationMenuLink } from '@/components/shadcn/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils/shadcn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ListItemProps extends ComponentPropsWithoutRef<'a'> {
    readonly title: string;
    readonly children?: ReactNode;
}

export default function ListItem({ className, title, children, ...props }: ListItemProps) {
    return (
        <li className='w-full'>
            <NavigationMenuLink asChild>
                <Link
                    href={props.href || '/'}
                    className={cn(
                        'focus-visible:border-primary block w-full space-y-1 rounded-md border-2 border-transparent p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-slate-800 focus:outline-none focus-visible:outline-none',
                        className
                    )}
                    {...props}>
                    <span>
                        <div className='clamp-[text,1rem,1.5rem,md,2xl] text-center font-semibold'>{title}</div>
                        <p className='text-muted-foreground clamp-[text,base,lg] line-clamp-2 text-center'>
                            {children}
                        </p>
                    </span>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
