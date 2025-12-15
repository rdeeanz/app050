import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GameVerse - Play Free Online Games",
  description: "Discover thousands of free browser-based games. No downloads, no installs – just pure gaming joy. Play action, puzzle, racing, and more games instantly!",
  keywords: "free games, online games, browser games, no download games, play games online",
  openGraph: {
    title: "GameVerse - Play Free Online Games",
    description: "Discover thousands of free browser-based games. No downloads required!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
