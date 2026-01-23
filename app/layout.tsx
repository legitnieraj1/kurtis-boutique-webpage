import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurtis Boutique | Elegant Indian Fashion",
  description: "Premium Indian women's boutique offering Kurtis, Co-ords, and Festive wear.",
};

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased text-foreground relative min-h-screen`}
      >
        <div className="fixed inset-0 -z-10 bg-background pointer-events-none">
          <BackgroundGradientAnimation
            containerClassName="h-full w-full pointer-events-none"
            // Interactive is true but pointer-events-none on container prevents blocking scrolls
            // However, we want the "blob" to follow mouse? If pointer-events-none, it won't receive mouse events.
            // We need to allow mouse events but let clicks pass through? 
            // "pointer-events-none" on the container stops it from capturing mouse events, so the interactive blob won't move.
            // If we want interactivity, we need to allow events but be careful not to block content.
            // Since this is z-index -10, content on z-index 0+ will capture events first. 
            // So removing pointer-events-none from container should be fine.
            className="absolute inset-0"
            interactive={true}
            firstColor="128, 24, 72"
            secondColor="176, 84, 128"
            thirdColor="212, 140, 168"
            fourthColor="180, 120, 150"
            fifthColor="150, 60, 100"
            pointerColor="176, 84, 128"
            size="80%"
          />
        </div>
        <div className="relative z-0">
          {children}
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
