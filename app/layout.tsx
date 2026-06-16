import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Agriculture Blogs - Expert Farming & Crop Management Tips",
  description: "Discover comprehensive agricultural insights, farming techniques, crop management, and sustainable agriculture practices. Expert blogs for modern farmers.",
  keywords: ["agriculture", "farming", "crop management", "sustainable farming", "agricultural techniques"],
  authors: [{ name: "Agriculture Blogs Team" }],
  creator: "Agriculture Blogs",
  publisher: "Agriculture Blogs",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agriculture-blogs.example.com",
    siteName: "Agriculture Blogs",
    title: "Agriculture Blogs - Expert Farming & Crop Management Tips",
    description: "Discover comprehensive agricultural insights, farming techniques, crop management, and sustainable agriculture practices.",
    images: [
      {
        url: "https://agriculture-blogs.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agriculture Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agriculture Blogs - Expert Farming & Crop Management Tips",
    description: "Discover comprehensive agricultural insights and farming techniques.",
    creator: "@agricultureblogs",
    images: ["https://agriculture-blogs.example.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://agriculture-blogs.example.com",
    languages: {
      "en-US": "https://agriculture-blogs.example.com/en",
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Agriculture Blogs",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://agriculture-blogs.example.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Agriculture Blogs" />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}     

