# 静的エクスポート時の画像最適化について

## 問題点

`output: 'export'`を使用している場合、Next.jsの画像最適化APIは使用できません。そのため、`images: { unoptimized: true }`を設定する必要があります。

## 現在の設定

```typescript
// next.config.ts
images: {
  unoptimized: true,
}
```

## next/imageコンポーネントの利点

`unoptimized: true`でも、`next/image`コンポーネントは以下の利点があります：

1. **自動的なlazy loading**: ビューポート外の画像は自動的に遅延読み込み
2. **レスポンシブ画像**: `sizes`属性による適切な画像サイズの選択
3. **パフォーマンス最適化**: 画像の読み込みタイミングの最適化
4. **レイアウトシフト防止**: 画像のサイズが事前に定義される

## 画像最適化のオプション

### オプション1: ビルド前の画像最適化スクリプト

`scripts/optimize-images.js`を実行して、画像をWebP形式に変換：

```bash
npm install --save-dev sharp
npm run optimize-images
```

### オプション2: 画像CDNの使用

Cloudinary、ImageKit、またはVercelの画像最適化サービスを使用：

```typescript
// next.config.ts
images: {
  loader: 'custom',
  loaderFile: './lib/image-loader.ts',
}
```

### オプション3: 手動での画像最適化

画像編集ソフト（Photoshop、GIMP等）またはオンラインツール（Squoosh、TinyPNG等）で画像を最適化してから配置。

## 推奨事項

1. **現在の設定を維持**: `unoptimized: true`のまま、`next/image`を使用
2. **画像の事前最適化**: ビルド前に画像をWebP形式に変換
3. **画像サイズの最適化**: 必要以上の解像度の画像は使用しない
4. **lazy loadingの活用**: ビューポート外の画像は自動的に遅延読み込みされる

## パフォーマンスへの影響

`unoptimized: true`でも、`next/image`を使用することで：

- ✅ Lazy loadingによる初期読み込み時間の短縮
- ✅ レスポンシブ画像による適切なサイズの選択
- ✅ レイアウトシフトの防止

画像の形式変換（WebP/AVIF）は別途必要ですが、上記の最適化によりパフォーマンスは大幅に改善されます。

