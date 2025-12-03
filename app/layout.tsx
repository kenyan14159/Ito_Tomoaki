import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

// Google Fonts の最適化（セルフホスティング）
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-serif-jp",
  display: "swap",
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ito-tomoaki.pages.dev'),
  title: "伊藤智章 | 鍼灸・コンディショニング",
  description: "横浜・東京エリアを拠点に、大学駅伝・実業団アスリートから一般の方まで、一人ひとりに寄り添った鍼灸治療とコンディショニングを提供。伊藤智章 - 鍼灸師・あん摩マッサージ指圧師",
  keywords: ["鍼灸", "コンディショニング", "アスリート", "スポーツケア", "横浜", "東京", "伊藤智章", "マッサージ", "治療院", "ライラック治療院"],
  authors: [{ name: "伊藤智章" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/itotomoaki.jpg",
    apple: "/itotomoaki.jpg",
  },
  openGraph: {
    title: "伊藤智章 | 鍼灸・コンディショニング",
    description: "アスリートから一般の方まで、一人ひとりに寄り添った鍼灸治療",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/itotomoaki.jpg",
        width: 800,
        height: 600,
        alt: "伊藤智章",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "伊藤智章 | 鍼灸・コンディショニング",
    description: "アスリートから一般の方まで、一人ひとりに寄り添った鍼灸治療",
    images: ["/itotomoaki.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${cormorantGaramond.variable} ${notoSerifJP.variable} ${zenKakuGothicNew.variable}`}>
      <body className="grain-effect">
        {children}
      </body>
    </html>
  );
}
