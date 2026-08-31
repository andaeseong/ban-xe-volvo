import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { MainLayout } from "@/components/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Volvo Cars Việt Nam | Xe điện, Hybrid, Plug-in Hybrid an toàn nhất",
    template: "%s | Volvo Cars Việt Nam",
  },
  description: "Khám phá dòng xe Volvo mới nhất 2026-2020: EX90, EX30, XC90, XC60, XC40, S90, V90, C40. Xe điện, Hybrid, Plug-in Hybrid với công nghệ an toàn tiên tiến. Tính toán trả góp, đặt lịch lái thử.",
  keywords: ["Volvo", "xe điện", "hybrid", "plug-in hybrid", "EX90", "XC90", "XC60", "XC40", "S90", "V90", "an toàn", "trả góp", "Volvo Việt Nam"],
  authors: [{ name: "Volvo Cars Việt Nam" }],
  creator: "Volvo Cars Việt Nam",
  publisher: "Volvo Cars Việt Nam",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://volvocars.vn",
    siteName: "Volvo Cars Việt Nam",
    title: "Volvo Cars Việt Nam | Xe điện, Hybrid an toàn nhất",
    description: "Khám phá dòng xe Volvo mới nhất với công nghệ an toàn tiên tiến. Xe điện, Hybrid, Plug-in Hybrid.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Volvo Cars Việt Nam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volvo Cars Việt Nam",
    description: "Khám phá dòng xe Volvo mới nhất với công nghệ an toàn tiên tiến.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}