import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login'); // allow admin login
    const isUserRoute = path.startsWith('/account');

    // Get session token
    const token = request.cookies.get('session')?.value;
    const session = token ? await verifyToken(token) : null;

    // 1. Admin Protection
    if (isAdminRoute) {
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // 2. User Protection
    if (isUserRoute) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/account/:path*'],
};
