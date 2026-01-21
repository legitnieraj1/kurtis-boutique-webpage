import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, loginUser } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await verifyPassword(password, user.password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        await loginUser({ id: user.id, email: user.email, role: user.role });
        return NextResponse.json({ success: true, role: user.role });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: `Login failed: ${error.message}` }, { status: 500 });
    }
}
