import type { Metadata } from "next";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: siteTitle,
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "전세사기",
    "전세사기 도움집",
    "전세사기 대응",
    "보증보험",
    "임차권등기명령",
    "전세보증금",
    "전세 계약"
  ],
  authors: [{ name: "JeonseHelper" }],
  creator: "JeonseHelper",
  publisher: "JeonseHelper",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/jeonsehelper-header.png",
        width: 1774,
        height: 887,
        alt: siteTitle
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/jeonsehelper-header.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
