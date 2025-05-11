import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteLinks } from '@/lib/navigation/links';

// Extract all hrefs from mainNav to be rewritten
const pathsToRewrite: string[] = [];
siteLinks.mainNav.forEach((item) => {
    if (item.href && !item.href.startsWith('http')) {
        // Ensure we only rewrite internal paths
        pathsToRewrite.push(item.href);
    }
    if (item.subPaths) {
        item.subPaths.forEach((subItem) => {
            if (subItem.href && !subItem.href.startsWith('http')) {
                pathsToRewrite.push(subItem.href);
            }
        });
    }
});

// Add other specific paths if needed, e.g., siteLinks.home.href if it's not '/'
// For this specific request, we only care about mainNav items.

const REWRITTEN_TO_WIP_HEADER = 'x-rewritten-to-wip';
const WIP_PATH = '/wip';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Handle direct access to /wip
    if (pathname === WIP_PATH && !request.headers.has(REWRITTEN_TO_WIP_HEADER)) {
        const url = request.nextUrl.clone();
        url.pathname = '/'; // Redirect to home for direct /wip access
        return NextResponse.redirect(url);
    }

    // 2. Check if the current path needs to be rewritten to /wip
    if (pathsToRewrite.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = WIP_PATH;

        const rewriteHeaders = new Headers(request.headers);
        rewriteHeaders.set(REWRITTEN_TO_WIP_HEADER, 'true');

        return NextResponse.rewrite(url, {
            request: {
                headers: rewriteHeaders,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/wip'],
};
