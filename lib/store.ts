import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    productId: string;
    size: string;
    quantity: number;
}

import { PRODUCTS, Product } from '@/data/products';

export interface User {
    name: string;
    email: string;
}

interface StoreState {
    wishlist: string[];
    cart: CartItem[];
    user: User | null;
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateCartItemQuantity: (productId: string, quantity: number) => void;
    login: (user: User) => void;
    logout: () => void;
}

interface ProductStoreState {
    products: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    toggleStock: (id: string) => void;
    updateProduct: (product: Product) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            wishlist: [],
            cart: [],
            user: null,
            addToWishlist: (productId) => set((state) => {
                if (state.wishlist.includes(productId)) return state;
                return { wishlist: [...state.wishlist, productId] };
            }),
            removeFromWishlist: (productId) => set((state) => ({
                wishlist: state.wishlist.filter((id) => id !== productId),
            })),
            isInWishlist: (productId) => get().wishlist.includes(productId),
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find(i => i.productId === item.productId && i.size === item.size);
                if (existingItem) {
                    return {
                        cart: state.cart.map(i =>
                            (i.productId === item.productId && i.size === item.size)
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        )
                    };
                }
                return { cart: [...state.cart, item] };
            }),
            removeFromCart: (productId) => set((state) => ({
                cart: state.cart.filter(item => item.productId !== productId)
            })),
            updateCartItemQuantity: (productId, quantity) => set((state) => ({
                cart: state.cart.map(item =>
                    item.productId === productId ? { ...item, quantity } : item
                )
            })),
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'kurtis-boutique-storage',
        }
    )
);

export const useProductStore = create<ProductStoreState>()(
    persist(
        (set) => ({
            products: PRODUCTS, // Initialize with mock data
            addProduct: (product) => set((state) => ({
                products: [product, ...state.products]
            })),
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter(p => p.id !== id)
            })),
            toggleStock: (id) => set((state) => ({
                products: state.products.map(p =>
                    p.id === id ? { ...p, inStock: !p.inStock } : p
                )
            })),
            updateProduct: (product) => set((state) => ({
                products: state.products.map(p =>
                    p.id === product.id ? product : p
                )
            })),
        }),
        {
            name: 'kurtis-boutique-products',
            skipHydration: true, // Handle hydration manually to prevent mismatches if needed, but standard behavior usually fine
        }
    )
);
