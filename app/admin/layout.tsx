"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, LogOut, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useStore();
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Protect admin routes
    useEffect(() => {
        if (mounted && pathname !== "/admin/login") {
            if (!user || user.role !== "admin") {
                router.replace("/admin/login");
            }
        }
    }, [user, pathname, router, mounted]);

    // Don't render anything until mounted to prevent hydration mismatch
    // or if verifying auth for protected routes
    if (!mounted) return null;

    // Login page should not have the sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If trying to access admin routes without auth, don't render layout content
    // validation is handled by useEffect above
    if (!user || user.role !== "admin") return null;

    const navItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/banners", label: "Banners", icon: Images },
    ];

    return (
        <div className="flex min-h-screen bg-muted/20 text-foreground font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-background hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <span className="font-serif text-xl font-bold">KB Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => {
                            useStore.getState().logout();
                            router.push("/admin/login");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
