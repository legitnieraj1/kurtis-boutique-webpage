"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link as HomeLink } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            router.push("/admin/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
            <div className="w-full max-w-md p-8 bg-background rounded-lg shadow-lg border border-border">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold">Admin Login</h1>
                    <p className="text-muted-foreground mt-2">Enter your credentials to access the panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input type="email" required className="w-full px-3 py-2 border rounded-md" placeholder="admin@kurtis.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" required className="w-full px-3 py-2 border rounded-md" placeholder="••••••••" />
                    </div>
                    <Button className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Return to Store</Link>
                </div>
            </div>
        </div>
    );
}
