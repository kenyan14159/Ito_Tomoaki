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
  verification: {
    google: "_vkrt5VYZwh4thT0rUd7cyQaLnNyHJ6t_nuyEzwsHaY",
  },
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
  // 構造化データ（JSON-LD）
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "伊藤智章",
    "alternateName": "ITO TOMOAKI",
    "jobTitle": "鍼灸師・あん摩マッサージ指圧師",
    "worksFor": {
      "@type": "MedicalBusiness",
      "name": "ライラック治療院 生麦",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "神奈川県横浜市鶴見区生麦3-8-7 1F",
        "addressLocality": "横浜市",
        "addressRegion": "神奈川県",
        "addressCountry": "JP"
      },
      "telephone": "045-504-0399",
      "openingHours": "Mo-Sa 10:00-20:00",
      "priceRange": "$$"
    },
    "image": "https://ito-tomoaki.pages.dev/itotomoaki.jpg",
    "sameAs": [
      "https://www.facebook.com/lilac.namamugi/",
      "https://www.instagram.com/lilac.namamugi/",
    ],
    "knowsAbout": ["鍼灸", "コンディショニング", "スポーツケア", "あん摩マッサージ指圧"],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "呉竹鍼灸柔整専門学校"
      },
      {
        "@type": "EducationalOrganization",
        "name": "関東学院大学"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "ライラック治療院 生麦",
    "image": "https://ito-tomoaki.pages.dev/rairakku.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "神奈川県横浜市鶴見区生麦3-8-7 1F",
      "addressLocality": "横浜市",
      "addressRegion": "神奈川県",
      "postalCode": "230-0000",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.4978,
      "longitude": 139.6758
    },
    "url": "http://lilac-namamugi.com/",
    "telephone": "045-504-0399",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <html lang="ja" className={`${cormorantGaramond.variable} ${notoSerifJP.variable} ${zenKakuGothicNew.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="grain-effect">
        {children}
      </body>
    </html>
  );
}
