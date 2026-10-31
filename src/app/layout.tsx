import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for the logo, headings and taglines (matches the reference UI).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// Variable fonts only accept a single style per instance, so italic needs
// its own load (used by the hero tagline).
const playfairItalic = Playfair_Display({
  variable: "--font-playfair-italic",
  subsets: ["latin"],
  style: "italic",
});

export const metadata: Metadata = {
  title: "BookNook — Your Personal Book Library",
  description:
    "Discover thousands of books, from timeless classics to the latest releases. Find your next favorite read!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${playfairItalic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
