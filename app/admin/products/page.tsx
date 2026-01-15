"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, EyeOff } from "lucide-react";
import { useProductStore } from "@/lib/store";

export default function AdminProducts() {
    // 1. Get state and actions from the store
    const { products, addProduct, deleteProduct, toggleStock: toggleStockStore } = useProductStore();
    const [hydrated, setHydrated] = useState(false);

    // 2. Handle hydration to match server/client HTML
    useEffect(() => {
        useProductStore.persist.rehydrate();
        setHydrated(true);
    }, []);

    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: '',
        category: 'kurtis',
        price: 0,
        inStock: true,
        images: [],
        description: ''
    });

    // 3. Handle File Upload -> Convert to Base64 (Multiple Images)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setNewProduct(prev => ({
                        ...prev,
                        images: [...(prev.images || []), base64String]
                    }));
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (indexToRemove: number) => {
        setNewProduct(prev => ({
            ...prev,
            images: prev.images?.filter((_, index) => index !== indexToRemove)
        }));
    };

    // 4. Submit New Product
    const handleAddProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product: Product = {
            id: Date.now().toString(),
            slug: newProduct.name?.toLowerCase().replace(/\s+/g, '-') || 'product',
            name: newProduct.name || 'New Product',
            price: Number(newProduct.price) || 0,
            category: newProduct.category || 'kurtis',
            inStock: true,
            images: newProduct.images?.length ? newProduct.images : ['/placeholder.jpg'],
            description: newProduct.description || 'No description',
            sizes: ['S', 'M', 'L']
        };

        addProduct(product);
        setIsAdding(false);
        setNewProduct({ name: '', category: 'kurtis', price: 0, inStock: true, images: [], description: '' });
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    }

    const toggleStock = (id: string) => {
        toggleStockStore(id);
    }

    if (!hydrated) {
        return <div className="p-8">Loading products...</div>;
    }

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold">Products</h1>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancel' : (
                        <><Plus className="w-4 h-4 mr-2" /> Add Product</>
                    )}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-background p-6 rounded-lg border border-border shadow-sm mb-8 animate-in slide-in-from-top-4">
                    <h2 className="text-xl font-medium mb-4">Add New Product</h2>
                    <form onSubmit={handleAddProductSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-md bg-background"
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option value="kurtis">Kurtis</option>
                                    <option value="workwear">Workwear</option>
                                    <option value="festive">Festive</option>
                                    <option value="sets">Sets</option>
                                    <option value="maxis">Maxis</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Product Images (Upload Multiple)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple // Enable multiple files
                                    onChange={handleImageUpload}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                {/* Image Preview Grid */}
                                {newProduct.images && newProduct.images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-4 gap-4">
                                        {newProduct.images.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                                                <img src={img} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remove Image"
                                                >
                                                    <Trash className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button type="submit">Save Product</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-muted/10">
                                <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                                    {/* Preview Image in Table */}
                                    <div className="w-10 h-10 rounded bg-muted overflow-hidden relative border border-border">
                                        {/* Display image if available, else placeholder */}
                                        {product.images[0] ? (
                                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-stone-200" />
                                        )}
                                    </div>
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 capitalize">{product.category}</td>
                                <td className="px-6 py-4">{formatPrice(product.price)}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => toggleStock(product.id)} title="Toggle Stock">
                                        <EyeOff className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(product.id)}>
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
