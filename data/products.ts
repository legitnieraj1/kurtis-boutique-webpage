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
    { id: 'kurtis', name: 'Kurtis', image: '' },
    { id: 'sets', name: '3-Piece Sets', image: '' },
    { id: 'daily', name: 'Daily Wear', image: '' },
    { id: 'dresses', name: 'Dresses', image: '' },
    { id: 'traditional', name: 'Traditional', image: '' },
    { id: 'maxis', name: 'Maxis', image: '' },
    { id: 'aline', name: 'A-Line', image: '' },
    { id: 'short', name: 'Short Tops', image: '' },
    { id: 'tot', name: 'TOT Wear', image: '' },
    { id: 'workwear', name: 'Workwear', image: '' },
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
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
            ''
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        category: 'workwear',
        isNew: true,
    }
];
