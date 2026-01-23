"use client";

import { useState } from "react";
import { useReviewsStore } from "@/lib/reviews-store";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, GripVertical } from "lucide-react";

export default function ReviewsAdminPage() {
    const { reviews, addReview, deleteReview } = useReviewsStore();
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [quote, setQuote] = useState("");
    const [src, setSrc] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        addReview({
            name,
            designation,
            quote,
            src: src || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" // Default avatar
        });

        // Reset form
        setName("");
        setDesignation("");
        setQuote("");
        setSrc("");
        setIsAdding(false);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Manage Reviews</h1>
                    <p className="text-muted-foreground mt-1">Add, remove, or reorder customer testimonials.</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    {isAdding ? "Cancel" : "Add Review"}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-lg border shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">New Testimonial</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Customer Name</label>
                                <input
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="e.g. Sarah Jones"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Designation</label>
                                <input
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={designation}
                                    onChange={e => setDesignation(e.target.value)}
                                    placeholder="e.g. Verified Buyer"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Review Quote</label>
                            <textarea
                                required
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={quote}
                                onChange={e => setQuote(e.target.value)}
                                placeholder="Enter the review text here..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reviewer Image</label>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    {src && (
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border">
                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-600 file:border-0 file:bg-primary file:text-white file:text-sm file:font-medium file:rounded-md file:mr-4 hover:file:bg-primary/90 cursor-pointer"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setSrc(reader.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">Upload an image (max 1MB recommended)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                            <Button type="submit">Save Review</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="flex items-center gap-4 bg-white p-4 rounded-lg border group hover:border-primary/50 transition-colors">
                        <GripVertical className="text-muted-foreground cursor-grab" />

                        {review.src ? (
                            <img src={review.src} alt={review.name} className="w-12 h-12 rounded-full object-cover bg-gray-100" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-400 font-bold text-xs uppercase">
                                {review.name.charAt(0)}
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{review.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{review.designation}</p>
                            <p className="text-sm text-gray-600 line-clamp-1 mt-1">"{review.quote}"</p>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => deleteReview(review.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}

                {reviews.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed">
                        No reviews yet. Add one to get started!
                    </div>
                )}
            </div>
        </div>
    );
}
