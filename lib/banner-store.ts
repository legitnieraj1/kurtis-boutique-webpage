import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Banner = {
    id: number;
    image: string;
    link: string;
    isActive: boolean;
};

interface BannerState {
    banners: Banner[];
    addBanner: (banner: Omit<Banner, 'id'>) => void;
    updateBanner: (id: number, banner: Partial<Banner>) => void;
    deleteBanner: (id: number) => void;
    reorderBanners: (startIndex: number, endIndex: number) => void;
    toggleBannerStatus: (id: number) => void;
}

const INITIAL_BANNERS: Banner[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop",
        link: "/shop?category=new-arrivals",
        isActive: true,
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2500&auto=format&fit=crop",
        link: "/shop?category=festive",
        isActive: true,
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=2335&auto=format&fit=crop",
        link: "/shop?category=custom",
        isActive: true,
    },
];

export const useBannerStore = create<BannerState>()(
    persist(
        (set) => ({
            banners: INITIAL_BANNERS,
            addBanner: (banner) =>
                set((state) => ({
                    banners: [...state.banners, { ...banner, id: Date.now() }],
                })),
            updateBanner: (id, updatedBanner) =>
                set((state) => ({
                    banners: state.banners.map((b) =>
                        b.id === id ? { ...b, ...updatedBanner } : b
                    ),
                })),
            deleteBanner: (id) =>
                set((state) => ({
                    banners: state.banners.filter((b) => b.id !== id),
                })),
            reorderBanners: (startIndex, endIndex) =>
                set((state) => {
                    const newBanners = Array.from(state.banners);
                    const [removed] = newBanners.splice(startIndex, 1);
                    newBanners.splice(endIndex, 0, removed);
                    return { banners: newBanners };
                }),
            toggleBannerStatus: (id) =>
                set((state) => ({
                    banners: state.banners.map((b) =>
                        b.id === id ? { ...b, isActive: !b.isActive } : b
                    ),
                })),
        }),
        {
            name: 'hero-banner-storage',
        }
    )
);
