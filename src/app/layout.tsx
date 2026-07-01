import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anasharma.com"),
  title: {
    default: "Ana Sharma — On AI, Internet Culture & Digital Life",
    template: "%s — Ana Sharma",
  },
  description:
    "A platform documenting the AI transition era through essays, observations, and cultural analysis. Exploring how artificial intelligence reshapes human thought, behavior, identity, and power.",
  keywords: [
    "AI",
    "artificial intelligence",
    "internet culture",
    "digital sociology",
    "cognitive inequality",
    "human behavior",
    "technology",
    "essays",
  ],
  authors: [{ name: "Ana Sharma" }],
  creator: "Ana Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anasharma.com",
    siteName: "Ana Sharma",
    title: "Ana Sharma — On AI, Internet Culture & Digital Life",
    description:
      "A platform documenting the AI transition era through essays, observations, and cultural analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ana Sharma — On AI, Internet Culture & Digital Life",
    description:
      "A platform documenting the AI transition era through essays, observations, and cultural analysis.",
    creator: "@anasharma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
