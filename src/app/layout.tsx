// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import AppearanceClient from "@/components/AppearanceClient";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import ThemeTransition from "@/components/ThemeTransition";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { Inter } from "next/font/google";

export const metadata: Metadata = { /* ... exactly what you had ... */ };
export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-slate-900 font-sans">
        <ThemeProvider>
          <LocaleProvider>
            <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-white text-slate-900 px-3 py-2 rounded-md shadow">
              Skip to content
            </a>
            <Header />
            <main id="content" className="maxw container-px py-6 pb-24 overscroll-y-contain">
              {children}
            </main>
            <BottomNav />
            <AppearanceClient />
            <ThemeTransition />
            <ServiceWorkerRegistration />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
