"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useProductStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

import { CategoryBubbles } from "@/components/home/CategoryBubbles";
import { HeroBannerCarousel } from "@/components/ui/HeroBannerCarousel";
import { NewArrivalsSection } from "@/components/NewArrivalsSection";
import { useEffect, useState } from "react";

export default function Home() {
  const { products } = useProductStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    useProductStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  // Filter products for New Arrivals section if needed, 
  // but NewArrivalsSection handles its own filtering based on tabs using the full list.
  // We can pass the full product list to it.

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20">
      <Navbar />

      <main>
        {/* Category Bubbles */}
        <CategoryBubbles />

        {/* HERO SECTION */}
        <section className="relative w-full h-[80vh] flex flex-col items-center pt-8 overflow-hidden">
          {/* Logo */}
          <div className="z-10 mb-6 px-4">
            <img
              src="/kurtis-logo-large.png"
              alt="Kurtis Boutique"
              className="w-48 sm:w-64 md:w-80 h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Full Width Image-Only Carousel Banner */}
          <div className="w-full flex-1 min-h-0 relative">
            <HeroBannerCarousel />
          </div>
        </section>

        {/* CATEGORY GRID */}
        <section className="py-20 container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif">Shop by Category</h2>
            <Link href="/shop" className="text-primary hover:underline underline-offset-4 hidden sm:block">View All</Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <Link key={cat.id} href={`/shop?category=${cat.id}`} className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary/50">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 bg-stone-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-medium text-lg leading-tight">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* NEW ARRIVALS (REPLACING BEST SELLERS) */}
        <NewArrivalsSection products={products} />

        {/* FESTIVE HIGHLIGHT */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-multiply" />
          <div className="container relative z-10 text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif">The Festive Edit</h2>
            <p className="max-w-xl mx-auto text-primary-foreground/90 text-lg font-light">
              Handpicked ensembles for weddings, parties, and special occasions.
              Shine brighter this season.
            </p>
            <Link href="/shop?category=festive">
              <LiquidButton className="rounded-full mt-4 px-8 text-foreground bg-secondary hover:bg-secondary/90">
                Shop Collection
              </LiquidButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
