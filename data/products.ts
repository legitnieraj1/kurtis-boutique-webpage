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
    { id: 'sets', name: '3-Piece Sets', image: 'https://images.unsplash.com/photo-1631233859262-43642340d8aa?auto=format&fit=crop&w=800&q=80' },
    { id: 'daily', name: 'Daily Wear', image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80' },
    { id: 'dresses', name: 'Dresses', image: 'https://images.unsplash.com/photo-1596783074918-c84cb06c929e?auto=format&fit=crop&w=800&q=80' },
    { id: 'traditional', name: 'Traditional', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
    { id: 'maxis', name: 'Maxis', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80' },
    { id: 'aline', name: 'A-Line', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80' },
    { id: 'short', name: 'Short Tops', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80' },
    { id: 'tot', name: 'TOT Wear', image: 'https://images.unsplash.com/photo-1529139574466-a302d27f819b?auto=format&fit=crop&w=800&q=80' },
    { id: 'workwear', name: 'Workwear', image: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?auto=format&fit=crop&w=800&q=80' },
];

export const PRODUCTS: Product[] = [
    {
        id: '1',
        slug: 'nigeen-kashmiri-aari-light-green-kurti',
        name: 'Nigeen Kashmiri Aari Light Green Kurti',
        description: 'Light Green Kashmiri Aari Embroidery Kurti, crafted from Cotton with intricate green and white embroidery.',
        price: 1299,
        discountPrice: 999,
        images: [
            'https://images.unsplash.com/photo-1583391733958-e026ce199d25?auto=format&fit=crop&w=800&q=80'
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
        category: 'traditional',
        isNew: true,
    },
    {
        id: '3',
        slug: 'office-chic-coord',
        name: 'Office Chic Co-ord',
        description: 'Modern minimalist co-ord set for the professional woman.',
        price: 2499,
        images: [
            'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'workwear',
    },
    {
        id: '4',
        slug: 'blue-floral-ruffle-maxi',
        name: 'Blue Floral Ruffle Maxi',
        description: 'Stunning blue floral maxi dress featuring off-shoulder ruffle details.',
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
        description: 'Elegant 3-piece cotton suit set with dupatta.',
        price: 2999,
        images: [
            'https://images.unsplash.com/photo-1631233859262-43642340d8aa?auto=format&fit=crop&w=800&q=80'
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
            'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'daily',
    },
    {
        id: '7',
        slug: 'summer-floral-dress',
        name: 'Summer Floral Dress',
        description: 'Breezy floral dress for casual outings.',
        price: 1499,
        discountPrice: 1299,
        images: [
            'https://images.unsplash.com/photo-1596783074918-c84cb06c929e?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'dresses',
    },
    {
        id: '8',
        slug: 'traditional-silk-anarkali',
        name: 'Traditional Silk Anarkali',
        description: 'Rich silk anarkali suit with heavy embroidery.',
        price: 5999,
        images: [
            'https://images.unsplash.com/photo-1580820759082-5ce8c0bc1353?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
        inStock: true,
        category: 'traditional',
    },
    {
        id: '9',
        slug: 'pink-aline-kurta',
        name: 'Pink A-Line Kurta',
        description: 'Stylish A-line kurta in pastel pink.',
        price: 1199,
        images: [
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'aline',
    },
    {
        id: '10',
        slug: 'casual-short-tunic',
        name: 'Casual Short Tunic',
        description: 'Trendy short tunic top that pairs perfectly with jeans.',
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
        description: 'Contemporary fusion wear featuring a stylish jacket.',
        price: 3499,
        images: [
            'https://images.unsplash.com/photo-1529139574466-a302d27f819b?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'tot',
        isNew: true,
    },
    {
        id: '12',
        slug: 'maroon-velvet-kurti',
        name: 'Maroon Velvet Kurti',
        description: 'Luxurious maroon velvet kurti with golden embroidery.',
        price: 1999,
        images: [
            'https://images.unsplash.com/photo-1550614000-4b9519e09d6f?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['M', 'L', 'XL'],
        inStock: true,
        category: 'kurtis',
    },
    {
        id: '13',
        slug: 'georgette-gown-set',
        name: 'Georgette Gown Set',
        description: 'Flowy georgette gown with heavy embellished dupatta.',
        price: 4999,
        images: [
            'https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'sets',
        isNew: true,
    },
    {
        id: '14',
        slug: 'cotton-daily-print',
        name: 'Cotton Daily Print',
        description: 'Soft cotton printed kurti, ideal for summer days.',
        price: 699,
        images: [
            'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'daily',
    },
    {
        id: '15',
        slug: 'elegant-evening-dress',
        name: 'Elegant Evening Dress',
        description: 'Sophisticated evening dress in midnight blue.',
        price: 2599,
        images: [
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'dresses',
        isNew: true,
    },
    {
        id: '16',
        slug: 'festive-sharara-set',
        name: 'Festive Sharara Set',
        description: 'Vibrant yellow sharara set with mirror work.',
        price: 3999,
        images: [
            'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['M', 'L', 'XL'],
        inStock: true,
        category: 'traditional',
        isNew: true,
    },
    {
        id: '17',
        slug: 'boho-maxi-dress',
        name: 'Boho Maxi Dress',
        description: 'Bohemian style maxi dress with earthy tones.',
        price: 2199,
        images: [
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'maxis',
    },
    {
        id: '18',
        slug: 'indigo-aline-kurta',
        name: 'Indigo A-Line Kurta',
        description: 'Classic indigo printed A-line kurta.',
        price: 1099,
        images: [
            'https://images.unsplash.com/photo-1547900723-cd875b7b0553?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'aline',
    },
    {
        id: '19',
        slug: 'modern-crop-top',
        name: 'Modern Crop Top',
        description: 'Chic crop top with embroidery details.',
        price: 899,
        images: [
            'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['XS', 'S', 'M'],
        inStock: true,
        category: 'short',
    },
    {
        id: '20',
        slug: 'urban-tot-ensemble',
        name: 'Urban TOT Ensemble',
        description: 'Edgy urban wear set for the modern youth.',
        price: 2799,
        images: [
            'https://images.unsplash.com/photo-1529139574466-a302d27f819b?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        category: 'tot',
    },
    {
        id: '21',
        slug: 'executive-blazer-set',
        name: 'Executive Blazer Set',
        description: 'Professional blazer and trouser set in charcoal grey.',
        price: 3499,
        images: [
            'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'workwear',
        isNew: true,
    }
];
