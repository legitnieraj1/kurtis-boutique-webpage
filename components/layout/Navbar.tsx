"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { CartSheet } from "@/components/cart/CartSheet";
import { SearchSheet } from "@/components/layout/SearchSheet";

const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cart, user, logout } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="font-serif text-2xl font-bold tracking-tighter text-foreground">
                            Kurtis Boutique
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setIsSearchOpen(true)}>
                                <Search className="h-5 w-5" />
                            </Button>

                            {mounted && user ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium hidden lg:inline-block">Hi, {user.name}</span>
                                    <Button variant="ghost" size="icon" onClick={() => logout()}>
                                        <UserIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/login" className="hidden sm:block">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        Login
                                    </Button>
                                </Link>
                            )}

                            <Link href="/wishlist">
                                <Button variant="ghost" size="icon">
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </Link>

                            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                                <ShoppingBag className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                                {mounted && cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>

                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-border">
                        <div className="space-y-1 px-4 py-4 bg-background">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {!user && (
                                <Link
                                    href="/login"
                                    className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login / Signup
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <SearchSheet isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
