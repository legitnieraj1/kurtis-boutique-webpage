export default function AdminDashboard() {
    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-serif font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Sales", value: "₹45,231", change: "+12%" },
                    { label: "Active Orders", value: "24", change: "" },
                    { label: "Products in Stock", value: "156", change: "+4" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-background p-6 rounded-lg border border-border shadow-sm">
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{stat.value}</span>
                            {stat.change && <span className="text-green-600 text-sm font-medium">{stat.change}</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-background rounded-lg border border-border p-6 h-96 flex items-center justify-center text-muted-foreground">
                Chart Placeholder (Sales Overview)
            </div>
        </div>
    );
}
