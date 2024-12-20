import type { Metadata } from "next";
import { ThemeProviderWrapper } from "@/components/ThemeProviderWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List",
  description: "Minimalist task manager",
  keywords: ["todo", "task manager", "productivity", "minimalist"],
  authors: [{ name: "Your Name" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen antialiased">
        <div 
          className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 
            dark:from-gray-900 dark:to-gray-800 transition-all duration-200"
        />
        <ThemeProviderWrapper>
          <div className="relative z-10">
            <main className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
              <div className="animate-fade-in">
                {children}
              </div>
            </main>
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}