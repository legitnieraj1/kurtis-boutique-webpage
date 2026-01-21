import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth'; // Ensure this exists and is correct relative path

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Auth check
        const token = request.headers.get('Cookie')?.split('session=')[1]?.split(';')[0];
        const session = await verifyToken(token || '');
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, price, categoryName, images, sizes, inStock } = body;

        // Auto-create category if not exists
        let category = await prisma.category.findUnique({ where: { name: categoryName } });
        if (!category) {
            category = await prisma.category.create({ data: { name: categoryName } });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                categoryId: category.id,
                images,
                sizes,
                inStock
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
