"use client";

import { useEffect, useState } from "react";
import { CircularTestimonials } from "./circular-testimonials";
import { useReviewsStore } from "@/lib/reviews-store";

export function CircularTestimonialsWrapper() {
    const { reviews } = useReviewsStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Brand Colors
    const colors = {
        name: "#801848", // Deep Wine
        designation: "#B05480", // Rose Mauve
        testimony: "#2D2D2D", // Soft Charcoal
        arrowBackground: "#801848", // Deep Wine
        arrowForeground: "#FDFBF7", // Ivory
        arrowHoverBackground: "#B05480", // Rose Mauve
    };

    return (
        <CircularTestimonials
            testimonials={reviews}
            colors={colors}
            fontSizes={{
                name: "1.75rem",
                designation: "1rem",
                quote: "1.25rem"
            }}
        />
    );
}
