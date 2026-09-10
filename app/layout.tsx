import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#E4543C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aahed.vercel.app"),
  title: {
    default: "مشروع عهد القرآنيّ",
    template: "%s | مشروع عهد القرآنيّ",
  },
  description:
    "مشروع ينظّم طريقة وخطة حفظ القرآن الكريم للمشاركين، ويتيح لهم متابعة تقدمهم وإنجازاتهم وإدارة مواعيد التسميع بكل سهولة.",
  keywords: [
    "حفظ القرآن",
    "تسميع القرآن",
    "متابعة الحفظ",
    "عهد القرآني",
    "القرآن الكريم",
    "خطة حفظ القرآن",
  ],
  authors: [{ name: "مشروع عهد" }],
  creator: "مشروع عهد القرآنيّ",
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "/",
    title: "مشروع عهد القرآنيّ",
    description: "نظّم خطة حفظك، وتابع إنجازاتك ومواعيد تسميعك للقرآن الكريم.",
    siteName: "مشروع عهد القرآنيّ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "شعار مشروع عهد القرآنيّ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مشروع عهد القرآنيّ | متابعة الحفظ والتسميع",
    description: "نظّم خطة حفظك، وتابع إنجازاتك ومواعيد تسميعك للقرآن الكريم.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
