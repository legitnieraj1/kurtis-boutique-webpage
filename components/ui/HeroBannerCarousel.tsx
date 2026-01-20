"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBannerStore } from "@/lib/banner-store";

// Mock Data Structure
// In a real app, this could come from an API or CMS
export function HeroBannerCarousel() {
    const banners = useBannerStore((state) => state.banners);
    const [currentIndex, setCurrentIndex] = useState(0);
    const activeBanners = banners.filter((b) => b.isActive);

    // Auto-slide logic
    useEffect(() => {
        if (activeBanners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeBanners.length, currentIndex]); // Depend on currentIndex to reset timer on manual interaction indirectly

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    };

    if (activeBanners.length === 0) return null;

    return (
        <div className="relative w-full h-full overflow-hidden group">
            <Link href={activeBanners[currentIndex].link} className="block w-full h-full relative">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={activeBanners[currentIndex].id}
                        src={activeBanners[currentIndex].image}
                        alt="Hero Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </Link>

            {/* Manual Navigation - Left Arrow */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                aria-label="Previous Slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Manual Navigation - Right Arrow */}
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                aria-label="Next Slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            {activeBanners.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {activeBanners.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentIndex(index);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
