import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Self-hosted fonts for the "aria" template (guaranteed to load, no reliance
// on the Google @import which can be slow/blocked).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
// Script/handwriting accent (e.g. the "memories" word in headings).
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "HOI Photographer — Photography that feels like the moment",
  description:
    "Wedding, pre-wedding, fashion, maternity and brand photography with private galleries, guided booking, and an AI assistant that answers instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} ${inter.variable} ${greatVibes.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
