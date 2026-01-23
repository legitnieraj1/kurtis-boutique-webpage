import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

export type Review = {
    id: number;
    name: string;
    designation: string;
    quote: string;
    src: string;
};

interface ReviewsState {
    reviews: Review[];
    addReview: (review: Omit<Review, 'id'>) => void;
    deleteReview: (id: number) => void;
    reorderReviews: (startIndex: number, endIndex: number) => void;
}

const INITIAL_REVIEWS: Review[] = [
    {
        id: 1,
        name: "Priya Sharma",
        designation: "Verified Buyer",
        quote: "The quality of the silk kurti amazed me. It feels so premium and the fit is just perfect!",
        src: ""
    },
    {
        id: 2,
        name: "Anjali Gupta",
        designation: "Regular Customer",
        quote: "I wore the festive set to my sister's wedding and got so many compliments. Truly elegant.",
        src: ""
    },
    {
        id: 3,
        name: "Sneha Reddy",
        designation: "Fashion Blogger",
        quote: "Finally a brand that understands modern ethnic wear. Minimal, classy, and super comfortable.",
        src: ""
    }
];

export const useReviewsStore = create<ReviewsState>()(
    persist(
        (set) => ({
            reviews: INITIAL_REVIEWS,
            addReview: (review) =>
                set((state) => ({
                    reviews: [...state.reviews, { ...review, id: Date.now() }],
                })),
            deleteReview: (id) =>
                set((state) => ({
                    reviews: state.reviews.filter((r) => r.id !== id),
                })),
            reorderReviews: (startIndex, endIndex) =>
                set((state) => {
                    const newReviews = [...state.reviews];
                    const [removed] = newReviews.splice(startIndex, 1);
                    newReviews.splice(endIndex, 0, removed);
                    return { reviews: newReviews };
                }),
        }),
        {
            name: 'reviews-storage',
            storage: createJSONStorage(() => localStorage), // Default to localStorage
        }
    )
);
