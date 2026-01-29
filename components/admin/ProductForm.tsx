"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Trash, ArrowRight, ArrowLeft, Upload, Plus, X } from "lucide-react";
import { useProductStore } from "@/lib/store";

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: Product) => void;
    onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
    const { categories, addCategory } = useProductStore();

    // Form State
    const [name, setName] = useState(initialData?.name || "");
    const [category, setCategory] = useState(initialData?.category || "kurtis");
    const [price, setPrice] = useState<number>(initialData?.price || 0);
    const [description, setDescription] = useState(initialData?.description || "");
    const [images, setImages] = useState<string[]>(initialData?.images || []);

    // Stock Logic
    // If creating new, remaining matches total. If editing, they are independent (unless total is updated?)
    // Requirement: On product creation: stockRemaining = stockTotal
    const [stockTotal, setStockTotal] = useState<number>(initialData?.stockTotal || 0);
    const [stockRemaining, setStockRemaining] = useState<number>(initialData?.stockRemaining || 0);

    // Discount Logic
    const [discountType, setDiscountType] = useState<"percentage" | "flat" | null>(initialData?.discountType || null);
    const [discountValue, setDiscountValue] = useState<number>(initialData?.discountValue || 0);

    // New Category Logic
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    // --- EFFECT: Update Remaining when Total changes (ONLY FOR NEW PRODUCTS) ---
    useEffect(() => {
        if (!initialData) {
            setStockRemaining(stockTotal);
        }
    }, [stockTotal, initialData]);

    // --- CALCULATE FINAL PRICE ---
    const calculateFinalPrice = () => {
        if (!discountType || !discountValue) return price;
        if (discountType === "percentage") {
            return price - (price * (discountValue / 100));
        }
        if (discountType === "flat") {
            return Math.max(0, price - discountValue);
        }
        return price;
    };

    const finalPrice = calculateFinalPrice();

    // --- HANDLERS ---

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setImages(prev => [...prev, base64String]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const moveImage = (index: number, direction: 'left' | 'right') => {
        if (direction === 'left' && index === 0) return;
        if (direction === 'right' && index === images.length - 1) return;

        const newImages = [...images];
        const targetIndex = direction === 'left' ? index - 1 : index + 1;

        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        setImages(newImages);
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        const safeId = newCategoryName.toLowerCase().trim().replace(/[^a-z0-9]/g, '-');

        if (categories.some(c => c.id === safeId || c.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
            alert("Category already exists!");
            return;
        }

        addCategory({
            id: safeId,
            name: newCategoryName.trim(),
            image: ""
        });
        setCategory(safeId);
        setNewCategoryName("");
        setIsAddingCategory(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData: Product = {
            id: initialData?.id || Date.now().toString(),
            slug: initialData?.slug || name.toLowerCase().replace(/\s+/g, '-'),
            name,
            description,
            price,
            discountPrice: finalPrice,
            images: images.length ? images : ['/placeholder.jpg'], // Fallback
            sizes: initialData?.sizes || ['S', 'M', 'L'], // Default sizes for now
            inStock: stockRemaining > 0, // Driven by stock count
            category,
            stockTotal,
            stockRemaining,
            discountType,
            discountValue: discountType ? discountValue : undefined,
            isNew: initialData?.isNew,
            isBestSeller: initialData?.isBestSeller
        };

        onSubmit(productData);
    };

    return (
        <div className="bg-background p-6 rounded-lg border border-border shadow-md mb-8 animate-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium font-serif">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
                <Button variant="ghost" size="icon" onClick={onCancel}><X className="w-5 h-5" /></Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md bg-background focus:ring-1 focus:ring-primary"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        {!isAddingCategory ? (
                            <div className="flex gap-2">
                                <select
                                    className="w-full px-3 py-2 border rounded-md bg-background"
                                    value={category}
                                    onChange={e => {
                                        if (e.target.value === "__NEW__") setIsAddingCategory(true);
                                        else setCategory(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                    <option value="__NEW__" className="font-semibold text-primary">➕ Add New Category</option>
                                </select>
                            </div>
                        ) : (
                            <div className="flex gap-2 animate-in fadeIn">
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="New Category Name"
                                    className="flex-1 px-3 py-2 border rounded-md"
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                />
                                <Button type="button" size="sm" onClick={handleAddCategory}>Save</Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingCategory(false)}>Cancel</Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Pricing & Discount */}
                <div className="p-4 bg-muted/30 rounded-lg space-y-4 border border-border/50">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pricing Strategy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Base Price (₹)</label>
                            <input
                                type="number"
                                min="0"
                                required
                                className="w-full px-3 py-2 border rounded-md bg-background"
                                value={price || ''}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Discount Type</label>
                            <div className="flex bg-background border rounded-md p-1">
                                <button
                                    type="button"
                                    onClick={() => { setDiscountType(null); setDiscountValue(0); }}
                                    className={`flex-1 text-xs py-1.5 rounded ${!discountType ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted'}`}
                                >None</button>
                                <button
                                    type="button"
                                    onClick={() => setDiscountType("percentage")}
                                    className={`flex-1 text-xs py-1.5 rounded ${discountType === 'percentage' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted'}`}
                                >% Off</button>
                                <button
                                    type="button"
                                    onClick={() => setDiscountType("flat")}
                                    className={`flex-1 text-xs py-1.5 rounded ${discountType === 'flat' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted'}`}
                                >₹ Off</button>
                            </div>
                        </div>

                        {discountType && (
                            <div className="space-y-2 animate-in fade-in zoom-in-95">
                                <label className="text-sm font-medium">{discountType === 'percentage' ? 'Percentage (%)' : 'Flat Amount (₹)'}</label>
                                <input
                                    type="number"
                                    min="0"
                                    max={discountType === 'percentage' ? 100 : price}
                                    className="w-full px-3 py-2 border rounded-md bg-background"
                                    value={discountValue || ''}
                                    onChange={e => setDiscountValue(Number(e.target.value))}
                                />
                            </div>
                        )}
                    </div>

                    {discountType && (
                        <div className="flex justify-between items-center bg-background p-3 rounded border border-dashed border-primary/30 text-sm">
                            <span className="text-muted-foreground">Final Selling Price:</span>
                            <span className="font-bold text-lg text-primary">₹{finalPrice.toLocaleString('en-IN')}</span>
                        </div>
                    )}
                </div>

                {/* 3. Stock Management */}
                <div className="p-4 bg-muted/30 rounded-lg space-y-4 border border-border/50">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Inventory</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Total Stock (Initial)</label>
                            <input
                                type="number"
                                min="0"
                                required
                                className="w-full px-3 py-2 border rounded-md bg-background"
                                value={stockTotal || ''}
                                onChange={e => setStockTotal(Number(e.target.value))}
                            />
                            <p className="text-xs text-muted-foreground">Total units available physically.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Remaining Stock (Live)</label>
                            <input
                                type="number"
                                min="0"
                                max={stockTotal}
                                required
                                className="w-full px-3 py-2 border rounded-md bg-background"
                                value={stockRemaining}
                                onChange={e => setStockRemaining(Number(e.target.value))}
                            />
                            <p className="text-xs text-muted-foreground">Adjust manually if counting errors occur.</p>
                        </div>
                    </div>
                </div>

                {/* 4. Image Management */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Product Gallery</label>
                        <span className="text-xs text-muted-foreground">Drag or use arrows to reorder. First image is primary.</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border group bg-background shadow-sm">
                                <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />

                                {/* Overlay Controls */}
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => moveImage(idx, 'left')}
                                        disabled={idx === 0}
                                        className="text-white hover:text-primary disabled:opacity-30"
                                        title="Move Left"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="text-red-400 hover:text-red-500"
                                        title="Remove"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveImage(idx, 'right')}
                                        disabled={idx === images.length - 1}
                                        className="text-white hover:text-primary disabled:opacity-30"
                                        title="Move Right"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                                {idx === 0 && (
                                    <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full shadow-sm">Main</span>
                                )}
                            </div>
                        ))}

                        {/* Upload Button */}
                        <label className="aspect-[3/4] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-colors">
                            <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                            <span className="text-xs text-muted-foreground font-medium">Add Images</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-border">
                    <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Save Product</Button>
                </div>
            </form>
        </div>
    );
}
