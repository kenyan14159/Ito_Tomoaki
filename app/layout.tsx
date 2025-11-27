import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "伊藤智章 | 鍼灸・コンディショニング",
  description: "横浜・東京エリアを拠点に、大学駅伝・実業団アスリートから一般の方まで、一人ひとりに寄り添った鍼灸治療とコンディショニングを提供。伊藤智章 - 鍼灸師・あん摩マッサージ指圧師",
  keywords: ["鍼灸", "コンディショニング", "アスリート", "スポーツケア", "横浜", "東京", "伊藤智章", "マッサージ", "治療院", "ライラック治療院"],
  authors: [{ name: "伊藤智章" }],
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/ito_tomoaki.jpg",
    apple: "/ito_tomoaki.jpg",
  },
  openGraph: {
    title: "伊藤智章 | 鍼灸・コンディショニング",
    description: "アスリートから一般の方まで、一人ひとりに寄り添った鍼灸治療",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/ito_tomoaki.jpg",
        width: 800,
        height: 600,
        alt: "伊藤智章",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="grain-effect">
        {children}
      </body>
    </html>
  );
}
