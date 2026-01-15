export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    images: string[];
    sizes: string[];
    inStock: boolean;
    category: string;
    isNew?: boolean;
    isBestSeller?: boolean;
}

export const CATEGORIES = [
    { id: 'kurtis', name: 'Kurtis', image: 'https://images.unsplash.com/photo-1583391733958-e026ce199d25?auto=format&fit=crop&w=800&q=80' },
    { id: 'sets', name: '3-Piece Sets', image: 'https://images.unsplash.com/photo-1623609163859-ca93c959b98a?auto=format&fit=crop&w=800&q=80' },
    { id: 'daily', name: 'Daily Wear', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80' },
    { id: 'dresses', name: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80' },
    { id: 'traditional', name: 'Traditional', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
    { id: 'maxis', name: 'Maxis', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80' },
    { id: 'aline', name: 'A-Line', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80' },
    { id: 'short', name: 'Short Tops', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80' },
    { id: 'tot', name: 'TOT Wear', image: 'https://images.unsplash.com/photo-1529139574466-a302d27f819b?auto=format&fit=crop&w=800&q=80' },
    { id: 'workwear', name: 'Workwear', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80' },
];

export const PRODUCTS: Product[] = [
    {
        id: '1',
        slug: 'nigeen-kashmiri-aari-light-green-kurti',
        name: 'Nigeen Kashmiri Aari Light Green Kurti',
        description: 'Light Green Kashmiri Aari Embroidery Kurti, crafted from Cotton with intricate green and white embroidery. Featuring a pentagon neck and full sleeves, this comfort-fitted kurti is perfect for casual occasions.',
        price: 1299,
        discountPrice: 999,
        images: [
            'https://images.unsplash.com/photo-1583391733958-e026ce199d25?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80' // Back/Different Angle for now
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'kurtis',
        isBestSeller: true,
    },
    {
        id: '2',
        slug: 'royal-silk-festive-set',
        name: 'Royal Silk Festive Set',
        description: 'Premium silk three-piece set with heavy gold zari work. Ideal for weddings and festivals.',
        price: 4599,
        images: [
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['M', 'L', 'XL'],
        inStock: true,
        category: 'festive',
        isNew: true,
    },
    {
        id: '3',
        slug: 'office-chic-coord',
        name: 'Office Chic Co-ord',
        description: 'Modern minimalist co-ord set for the professional woman. Wrinkle-free fabric.',
        price: 2499,
        images: [
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'workwear',
    },
    {
        id: '4',
        slug: 'blue-floral-ruffle-maxi',
        name: 'Blue Floral Ruffle Maxi',
        description: 'Stunning blue floral maxi dress featuring off-shoulder ruffle details and a flowing tiered skirt.',
        price: 1899,
        discountPrice: 1599,
        images: [
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
        category: 'maxis',
    },
    {
        id: '5',
        slug: 'embroidered-cotton-suit-set',
        name: 'Embroidered Cotton Suit Set',
        description: 'Elegant 3-piece cotton suit set with dupatta. perfect for summer gatherings.',
        price: 2999,
        images: [
            'https://images.unsplash.com/photo-1623609163859-ca93c959b98a?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['M', 'L', 'XL'],
        inStock: true,
        category: 'sets',
    },
    {
        id: '6',
        slug: 'block-print-daily-kurta',
        name: 'Block Print Daily Kurta',
        description: 'Comfortable daily wear kurti with traditional hand block prints.',
        price: 899,
        images: [
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'daily',
    },
    {
        id: '7',
        slug: 'summer-floral-dress',
        name: 'Summer Floral Dress',
        description: 'Breezy floral dress for casual outings and beach vacations.',
        price: 1499,
        discountPrice: 1299,
        images: [
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'dresses',
    },
    {
        id: '8',
        slug: 'traditional-silk-anarkali',
        name: 'Traditional Silk Anarkali',
        description: 'Rich silk anarkali suit with heavy embroidery, perfect for weddings.',
        price: 5999,
        images: [
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
        inStock: true,
        category: 'traditional',
    },
    {
        id: '9',
        slug: 'pink-aline-kurta',
        name: 'Pink A-Line Kurta',
        description: 'Stylish A-line kurta in pastel pink, suitable for office or casual wear.',
        price: 1199,
        images: [
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'aline',
    },
    {
        id: '10',
        slug: 'casual-short-tunic',
        name: 'Casual Short Tunic',
        description: 'Trendy short tunic top that pairs perfectly with jeans or trousers.',
        price: 799,
        images: [
            'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        inStock: true,
        category: 'short',
    },
    {
        id: '11',
        slug: 'fusion-jacket-set',
        name: 'Fusion Jacket Set',
        description: 'Contemporary fusion wear featuring a stylish jacket and pant set.',
        price: 3499,
        images: [
            'https://images.unsplash.com/photo-1529139574466-a302d27f819b?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'tot',
        isNew: true,
    },
];
