"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Share2, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useStore, useProductStore } from "@/lib/store";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { products } = useProductStore();
    const [hydrated, setHydrated] = useState(false);

    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

    // Find product immediately to initialize state if possible, or handle safely
    const product = products.find((p) => p.slug === slug);
    const isWishlisted = product ? isInWishlist(product.id) : false;

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState<string>("");

    useEffect(() => {
        useProductStore.persist.rehydrate();
        setHydrated(true);
    }, []);

    // Set active image when product is found/hydrated
    useEffect(() => {
        if (product && product.images.length > 0) {
            setActiveImage(product.images[0]);
        }
    }, [product]);

    // Show loading state while rehydrating
    if (!hydrated) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
                        <div className="w-full md:w-1/2 aspect-[3/4] bg-muted animate-pulse rounded-lg" />
                        <div className="w-full md:w-1/2 space-y-8">
                            <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                            <div className="h-32 w-full bg-muted animate-pulse rounded" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }
        addToCart({ productId: product.id, size: selectedSize, quantity });
        toast.success("Added to Cart");
    };

    const toggleWishlist = () => {
        if (isWishlisted) removeFromWishlist(product.id);
        else addToWishlist(product.id);
    };

    return (
        <div className="min-h-screen bg-background/60 backdrop-blur-sm">
            <Navbar />

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-16">

                    {/* IMAGE GALLERY */}
                    <div className="w-full md:w-1/2 space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-[3/4] bg-secondary/20 rounded-lg overflow-hidden group">
                            <div className="absolute inset-0 bg-stone-200 animate-pulse-slow" />
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={cn(
                                        "relative w-20 aspect-[3/4] rounded-md overflow-hidden bg-muted border-2 transition-all flex-shrink-0",
                                        activeImage === img ? "border-primary" : "border-transparent"
                                    )}
                                >
                                    <img
                                        src={img}
                                        alt={`Product view ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="sr-only">View image {idx + 1}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <div>
                            <nav className="text-sm text-muted-foreground mb-4">
                                <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span className="text-foreground capitalize">{product.name}</span>
                            </nav>
                            <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground tracking-tight">{product.name}</h1>

                            <div className="mt-4 flex items-center gap-4">
                                {product.discountPrice ? (
                                    <div className="text-2xl font-semibold">
                                        <span className="text-foreground">{formatPrice(product.discountPrice)}</span>
                                        <span className="text-muted-foreground line-through text-lg ml-2 font-normal">{formatPrice(product.price)}</span>
                                        <span className="text-green-600 text-sm ml-2 font-medium">Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%</span>
                                    </div>
                                ) : (
                                    <div className="text-2xl font-semibold text-foreground">{formatPrice(product.price)}</div>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-stone text-muted-foreground">
                            <p>{product.description}</p>
                        </div>

                        {/* Sizes */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-sm">Select Size</span>
                                <button className="text-xs underline text-muted-foreground hover:text-primary">Size Chart</button>
                            </div>
                            <div className="flex gap-3">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        disabled={!product.inStock}
                                        className={cn(
                                            "w-10 h-10 rounded-full border flex items-center justify-center text-sm transition-all",
                                            selectedSize === size
                                                ? "border-primary bg-primary text-white"
                                                : "border-input hover:border-primary/50",
                                            !product.inStock && "opacity-50 cursor-not-allowed decoration-slice"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {!selectedSize && <p className="text-red-500 text-xs mt-2 h-4"></p>}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                            <div className="flex items-center border border-input rounded-md w-max">
                                <button
                                    className="px-3 py-2 hover:bg-muted"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                                <button
                                    className="px-3 py-2 hover:bg-muted"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <Button
                                size="lg"
                                className="flex-1 rounded-md"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className={cn("h-12 w-12 rounded-md", isWishlisted && "text-red-500 border-red-200 bg-red-50")}
                                onClick={toggleWishlist}
                            >
                                <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                            </Button>
                        </div>

                        {/* Features Info */}
                        <div className="grid grid-cols-1 gap-4 pt-6">
                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                <Truck className="w-5 h-5 text-muted-foreground" />
                                <span>Free Shipping on orders above ₹999</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                <RefreshCw className="w-5 h-5 text-muted-foreground" />
                                <span>Easy 7-day Exchange Policy</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                                <span>100% Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                <span className="font-semibold text-red-500">*</span>
                                <span className="text-xs text-muted-foreground">360 degree opening video must for any issue</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
