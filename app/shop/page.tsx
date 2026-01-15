"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { CATEGORIES } from "@/data/products"; // PRODUCTS removed
import { useProductStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Check, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category");

    const { products } = useProductStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        useProductStore.persist.rehydrate();
        setHydrated(true);
    }, []);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<"new" | "price_asc" | "price_desc">("new");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (sortBy === "price_asc") {
            result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        } else {
            // Newest (just reverse ID or mock logic)
            result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        }

        return result;
    }, [selectedCategory, sortBy]);

    return (
        <div className="min-h-screen bg-background/60 backdrop-blur-sm">
            <Navbar />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-medium">Shop All</h1>
                        <p className="text-muted-foreground mt-1">
                            {filteredProducts.length} Products
                        </p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="md:hidden flex-1" onClick={() => setShowFilters(!showFilters)}>
                            <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                        </Button>

                        <select
                            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                        >
                            <option value="new">New Arrivals</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className={cn(
                        "w-full md:w-64 space-y-8 md:block",
                        showFilters ? "block" : "hidden"
                    )}>
                        <div>
                            <h3 className="font-medium mb-4">Categories</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={cn(
                                        "flex items-center justify-between w-full text-sm text-left hover:text-primary transition-colors",
                                        !selectedCategory && "font-semibold text-primary"
                                    )}
                                >
                                    All Products
                                    {!selectedCategory && <Check className="w-4 h-4" />}
                                </button>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={cn(
                                            "flex items-center justify-between w-full text-sm text-left hover:text-primary transition-colors",
                                            selectedCategory === cat.id && "font-semibold text-primary"
                                        )}
                                    >
                                        {cat.name}
                                        {selectedCategory === cat.id && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter Mockup */}
                        <div>
                            <h3 className="font-medium mb-4">Price</h3>
                            <div className="text-sm text-muted-foreground">Price filtering not implemented in demo.</div>
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center text-muted-foreground">
                                No products found in this category.
                            </div>
                        )}

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-48" />
                        <div className="grid grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <Skeleton key={i} className="h-96 rounded-lg" />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
