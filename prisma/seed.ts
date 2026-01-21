import { PrismaClient } from '@prisma/client';
import { PRODUCTS, CATEGORIES } from '../data/products';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Seed Categories
    console.log('Seeding Categories...');
    const categoryMap = new Map<string, string>();

    for (const cat of CATEGORIES) {
        // We use the 'name' from the data file. 
        // The 'id' in the data file is more like a slug (e.g., 'kurtis'), which we'll use for mapping.
        const createdCategory = await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: {
                name: cat.name,
            },
        });
        console.log(`Created category: ${createdCategory.name}`);
        categoryMap.set(cat.id, createdCategory.id);
    }

    // 2. Seed Products
    console.log('Seeding Products...');
    for (const product of PRODUCTS) {
        const categoryId = categoryMap.get(product.category);

        if (!categoryId) {
            console.warn(`Category '${product.category}' not found for product '${product.name}'. Skipping.`);
            continue;
        }

        await prisma.product.upsert({
            where: { id: product.id }, // Assuming we want to keep the same IDs if possible, but schema uses CUID. 
            // If the schema ID is CUID and data ID is '1', '2', etc., it might be fine to use them as IDs 
            // providing they are strings. The schema says id is String @default(cuid()).
            // We can use the ID from the file to ensure idempotency.
            update: {
                name: product.name,
                description: product.description,
                price: product.price,
                discountPrice: product.discountPrice,
                images: product.images,
                sizes: product.sizes,
                inStock: product.inStock,
                categoryId: categoryId,
            },
            create: {
                id: product.id, // Explicitly set ID from data file
                name: product.name,
                description: product.description,
                price: product.price,
                discountPrice: product.discountPrice,
                images: product.images,
                sizes: product.sizes,
                inStock: product.inStock,
                categoryId: categoryId,
            },
        });
        console.log(`Created product: ${product.name}`);
    }

    // 3. Create Admin User (Optional / Placeholder)
    // Ideally, you'd check if an admin exists, or ask the user to create one.
    // We won't auto-create a user to avoid password security issues in a public repo, 
    // but let's at least log that it's done.

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
