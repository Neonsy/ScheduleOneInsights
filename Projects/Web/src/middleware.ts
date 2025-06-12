import { siteLinks } from '@/lib/navigation/links';
import type { NavItem, NavSubItem } from '@/types/navigation/index';
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const WIP_PATH = '/wip';

// Extract all hrefs from mainNav that are marked as WIP
const pathsToRewrite: string[] = [];
siteLinks.mainNav.forEach((item: NavItem) => {
    // Check if the main item itself is WIP and has an href
    if (item.isWip && item.href) {
        pathsToRewrite.push(item.href);
    }
    // Check subPaths for WIP items
    if (item.subPaths) {
        item.subPaths.forEach((subItem: NavSubItem) => {
            if (subItem.isWip && subItem.href) {
                pathsToRewrite.push(subItem.href);
            }
        });
    }
});

export default clerkMiddleware(async (auth, req) => {
    const { pathname } = req.nextUrl;
    const { sessionClaims } = await auth();
    const isLoggedIn = !!sessionClaims?.sub;
    const publicMetadata = sessionClaims?.publicMetadata ?? {};
    const isAdmin = (publicMetadata as Record<string, unknown>).wip_bypass === true;

    // 1. Handle direct access to /wip
    if (pathname === WIP_PATH) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // 2. Check if the current path needs to be rewritten to /wip for non-admins
    if (pathsToRewrite.includes(pathname)) {
        if (!isLoggedIn || !isAdmin) {
            const url = req.nextUrl.clone();
            url.pathname = WIP_PATH;
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
