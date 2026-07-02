import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전세 도우미",
  description: "전세와 전세사기 대응을 질문 트리형 로드맵으로 정리하는 도움집"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
