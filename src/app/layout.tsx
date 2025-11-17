import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmony - Binaural Beats for Focus & Relaxation",
  description: "Open-source binaural beat generator. Use scientifically-backed audio frequencies to improve focus, reduce stress, and enhance productivity.",
  keywords: ["binaural beats", "focus music", "productivity", "meditation", "study music", "concentration"],
  authors: [{ name: "Harmony" }],
  creator: "Harmony",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harmony.app",
    title: "Harmony - Binaural Beats Generator",
    description: "Free, open-source binaural beat generator for better focus and relaxation.",
    siteName: "Harmony",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmony - Binaural Beats Generator",
    description: "Free binaural beat generator for focus and relaxation.",
    creator: "@harmony",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7aa2f7" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0f1729 100%)',
          minHeight: '100vh'
        }}
      >
        {children}
      </body>
    </html>
  );
}
