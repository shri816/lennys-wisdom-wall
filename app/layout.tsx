import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lenny's Podcast - Wisdom Wall",
  description: "Explore key insights from 286 episodes of Lenny's Podcast. An interactive knowledge base featuring wisdom from the world's best product leaders including Shreyas Doshi, Elena Verna, Casey Winters, and more.",
  openGraph: {
    title: "Lenny's Podcast - Wisdom Wall",
    description: "Explore 58 key product concepts and 50 curated contradictions from Lenny's podcast guests. Learn nuanced thinking from the world's best product leaders.",
    url: "https://lennys-wisdom-wall.vercel.app",
    siteName: "Lenny's Wisdom Wall",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lenny's Wisdom Wall - Product wisdom from Lenny's Podcast",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lenny's Podcast - Wisdom Wall",
    description: "Explore 58 key product concepts and 50 curated contradictions from Lenny's podcast guests.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
