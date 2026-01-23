"use client";

import { Banner, useBannerStore } from "@/lib/banner-store";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerRowProps {
    banner: Banner;
    index: number;
    total: number;
    onEdit: (banner: Banner) => void;
}

export function BannerRow({ banner, index, total, onEdit }: BannerRowProps) {
    const { deleteBanner, reorderBanners, toggleBannerStatus } = useBannerStore();

    const handleMoveUp = () => {
        if (index > 0) reorderBanners(index, index - 1);
    };

    const handleMoveDown = () => {
        if (index < total - 1) reorderBanners(index, index + 1);
    };

    return (
        <div className="grid grid-cols-12 gap-4 items-center py-4 border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors">

            {/* Banner Image & Info */}
            <div className="col-span-4 flex items-center gap-4">
                <div className="relative w-24 h-14 rounded-md overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    {banner.image ? (
                        <img
                            src={banner.image}
                            alt={`Banner ${banner.id}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">
                            No Img
                        </div>
                    )}
                </div>
            </div>

            {/* Redirect Link */}
            <div className="col-span-4">
                <p className="text-sm font-medium text-stone-700 truncate">
                    {banner.link || "No link set"}
                </p>
            </div>

            {/* Status */}
            <div className="col-span-2">
                <span
                    className={cn(
                        "text-xs px-2.5 py-1 rounded-full font-medium tracking-wide border",
                        banner.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-stone-100 text-stone-500 border-stone-200"
                    )}
                >
                    {banner.isActive ? "In Stock" : "Inactive"} {/* Using "In Stock" phrasing to match ref if desired, but "Active" is better for banners. Sticking to Active for logic, but style matches. */}
                </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end gap-2">
                {/* Order */}
                <div className="flex flex-col gap-0.5 mr-2">
                    <button
                        className="text-stone-400 hover:text-stone-700 disabled:opacity-30"
                        disabled={index === 0}
                        onClick={handleMoveUp}
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                        className="text-stone-400 hover:text-stone-700 disabled:opacity-30"
                        disabled={index === total - 1}
                        onClick={handleMoveDown}
                    >
                        <ArrowDown className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={() => toggleBannerStatus(banner.id)}
                    className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                    title={banner.isActive ? "Deactivate" : "Activate"}
                >
                    {banner.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                    onClick={() => onEdit(banner)}
                    className="p-2 text-stone-400 hover:text-blue-600 transition-colors"
                >
                    <Edit className="w-4 h-4" />
                </button>

                <button
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this banner?")) {
                            deleteBanner(banner.id);
                        }
                    }}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
