import { ReactNode } from 'react';

// Treatment データの外部化
export interface Treatment {
  id: string;
  title: string;
  titleEn: string;
  image: string;
  icon?: ReactNode;
  description: string;
  benefits: string[];
  detail: string;
}

// アイコンはコンポーネント内で定義する必要があるため、
// データ構造のみを定義し、アイコンはTreatment.tsxで追加
export const TREATMENT_DATA: Omit<Treatment, 'icon'>[] = [
  {
    id: 'acupuncture',
    title: '鍼治療',
    titleEn: 'Acupuncture',
    image: '/haritiryo.png',
    description: '極細の鍼を使用し、筋肉の深部にアプローチ。血流改善、筋緊張の緩和、自然治癒力の活性化を促します。',
    benefits: ['筋肉の緊張緩和', '血流促進', '自律神経調整', '疲労回復促進'],
    detail: 'スポーツ選手の場合、競技特性に応じた部位への施術を行い、パフォーマンス向上と怪我の予防をサポート。一般の方には、肩こり・腰痛などの慢性症状の改善に効果的です。',
  },
  {
    id: 'moxibustion',
    title: 'お灸',
    titleEn: 'Moxibustion',
    image: '/okyu.png',
    description: 'もぐさを燃焼させた温熱刺激により、冷えの改善、免疫力向上、リラクゼーション効果をもたらします。',
    benefits: ['冷え性改善', '免疫力向上', 'リラックス効果', '代謝促進'],
    detail: '直接灸、間接灸、温灸など、症状や体質に合わせて最適な方法を選択。温熱効果で深部まで温め、慢性的な不調を根本から改善します。',
  },
  {
    id: 'electro',
    title: '電気治療',
    titleEn: 'Electrotherapy',
    image: '/denki.png',
    description: '低周波・中周波電気刺激により、筋肉の収縮を促し、痛みの軽減と機能回復をサポートします。',
    benefits: ['痛み軽減', '筋力強化', '炎症抑制', '回復促進'],
    detail: '鍼通電療法（パルス治療）を中心に、怪我の急性期から慢性期まで幅広く対応。EMSによる筋トレ効果も期待できます。',
  },
  {
    id: 'cupping',
    title: 'カッピング',
    titleEn: 'Cupping',
    image: '/kappingu.png',
    description: '吸引カップで皮膚を吸い上げ、血流を促進。深部組織のコリや老廃物の排出を促します。',
    benefits: ['血行促進', '筋膜リリース', 'デトックス効果', '可動域改善'],
    detail: '古来からの伝統療法を現代的にアレンジ。アスリートのリカバリーに特に効果的で、練習後の疲労回復に多くの選手が利用しています。',
  },
];
