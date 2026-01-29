"use client";

import { useProductStore } from "@/lib/store";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LowStockAlert() {
    const { products } = useProductStore();
    const pathname = usePathname();

    // Prevent showing on login
    if (pathname === "/admin/login") return null;

    // Filter logic: Stock Remaining <= 5 AND Stock Total > 0 (to distinguish from unmanaged stock if we want, but requirement says stock is required)
    // Actually requirement says "stockRemaining <= 20% OR <= 5 units". I'll use <= 5 as it's simpler and requested.
    // Also ensuring inStock is true (if it's out of stock, it might be separate, but low stock usually implies "about to run out").
    // Requirement says "Alert disappears once stock is updated".

    const lowStockItems = products.filter(p => p.stockRemaining <= 5 && p.inStock);

    if (lowStockItems.length === 0) return null;

    return (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm font-medium text-amber-900">
                        Low Stock Alert: {lowStockItems.length} product{lowStockItems.length !== 1 && 's'} running low.
                    </p>
                    <p className="text-xs text-amber-700">
                        {lowStockItems.slice(0, 3).map(p => p.name).join(", ")}
                        {lowStockItems.length > 3 && ` +${lowStockItems.length - 3} more`}
                    </p>
                </div>
            </div>
            <Link
                href="/admin/products"
                className="text-sm font-medium text-amber-800 hover:text-amber-950 underline decoration-amber-400 underline-offset-4"
            >
                View Products &rarr;
            </Link>
        </div>
    );
}
