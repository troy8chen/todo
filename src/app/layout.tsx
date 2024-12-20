import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProviderWrapper } from "@/components/ThemeProviderWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Minimalist task manager",
  keywords: ["todo", "task manager", "productivity", "minimalist"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
          min-h-screen antialiased
          bg-gradient-to-b from-gray-50 to-gray-100
          dark:from-gray-900 dark:to-gray-800
          transition-colors duration-300`}
      >
        <ThemeProviderWrapper>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}