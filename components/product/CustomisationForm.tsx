"use client";

import { useState } from "react";
import { useStore, CustomisationRequest } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CustomisationFormProps {
    productId: string;
    productName: string;
}

const CUSTOMISATION_TYPES = [
    "Feeding Zip",
    "Sleeve Length",
    "Size Adjustment",
    "Neck Design",
    "Fabric Change",
    "Other"
];

const PREFERRED_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Custom Measurement"];

export function CustomisationForm({ productId, productName }: CustomisationFormProps) {
    const { user, addCustomisationQuery } = useStore();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [preferredSize, setPreferredSize] = useState("");
    const [contactPreference, setContactPreference] = useState<"WhatsApp" | "Email" | "Call">("WhatsApp");
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!user) {
        return (
            <div className="bg-stone-50 rounded-xl p-8 border border-stone-200 text-center space-y-4 my-8">
                <Lock className="w-8 h-8 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-serif font-medium">Looking for Customisation?</h3>
                <p className="text-muted-foreground">
                    Please log in to submit a customisation request for this product.
                </p>
                <Button asChild variant="default">
                    <Link href="/login">Login to Request</Link>
                </Button>
            </div>
        );
    }

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedTypes.length === 0 && !message.trim()) {
            alert("Please select a customisation type or describe your request.");
            return;
        }

        const newQuery: CustomisationRequest = {
            id: Date.now().toString(),
            productId,
            productName,
            userId: user.email, // Using email as ID for demo simplicity
            userEmail: user.email,
            status: "New",
            createdAt: new Date().toISOString(),
            customisationTypes: selectedTypes,
            message,
            preferredSize,
            contactPreference
        };

        addCustomisationQuery(newQuery);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 rounded-xl p-8 border border-green-200 text-center space-y-4 my-8 animate-in fade-in zoom-in">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-serif font-medium text-green-800">Request Submitted!</h3>
                <p className="text-green-700">
                    Thank you. Our team will review your request and contact you shortly via {contactPreference}.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="bg-white">
                    Submit Another Request
                </Button>
            </div>
        );
    }

    return (
        <section className="my-12 py-8 border-t border-b border-border bg-stone-50/50">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-medium">Looking for Customisation?</h2>
                    <p className="text-muted-foreground mt-2">
                        Tell us your requirements and our team will get back to you.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Types */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">What do you need customised?</label>
                        <div className="flex flex-wrap gap-2">
                            {CUSTOMISATION_TYPES.map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => toggleType(type)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm border transition-all",
                                        selectedTypes.includes(type)
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background border-input hover:border-primary/50"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Preferred Size (Optional)</label>
                            <select
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={preferredSize}
                                onChange={(e) => setPreferredSize(e.target.value)}
                            >
                                <option value="">Select Size...</option>
                                {PREFERRED_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Contact Preference</label>
                            <div className="flex bg-background border border-input rounded-md p-1 h-10 items-center">
                                {["WhatsApp", "Email", "Call"].map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        onClick={() => setContactPreference(method as any)}
                                        className={cn(
                                            "flex-1 text-sm font-medium rounded-sm h-full transition-all",
                                            contactPreference === method
                                                ? "bg-stone-200 text-stone-900 shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Customisation Details</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Describe your customisation request in detail..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="pt-2">
                        <Button type="submit" size="lg" className="w-full md:w-auto">
                            Submit Request
                        </Button>
                    </div>

                </form>
            </div>
        </section>
    );
}
