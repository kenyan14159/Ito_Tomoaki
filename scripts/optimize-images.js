/**
 * ビルド前に画像を最適化するスクリプト
 * 使用例: node scripts/optimize-images.js
 * 
 * 必要なパッケージ:
 * npm install --save-dev sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_DIR = path.join(process.cwd(), 'public/optimized');

// 最適化する画像ディレクトリ
const IMAGE_DIRS = [
  'ito_gallery',
  '', // ルートの画像
];

// 画像を最適化する関数
async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = await fs.promises.stat(inputPath);
    if (!stats.isFile()) return;

    const ext = path.extname(inputPath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

    console.log(`Optimizing: ${inputPath}`);

    // WebP形式で最適化
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    // AVIF形式で最適化（オプション）
    // await sharp(inputPath)
    //   .avif({ quality: 80 })
    //   .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.avif'));

    console.log(`✓ Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

// ディレクトリを再帰的に処理
async function processDirectory(dirPath, outputDir) {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(PUBLIC_DIR, fullPath);
    const outputPath = path.join(outputDir, relativePath);

    if (entry.isDirectory()) {
      await fs.promises.mkdir(outputPath, { recursive: true });
      await processDirectory(fullPath, outputDir);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath, outputPath);
    }
  }
}

// メイン処理
async function main() {
  console.log('Starting image optimization...');
  
  // 出力ディレクトリを作成
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });

  // 各画像ディレクトリを処理
  for (const dir of IMAGE_DIRS) {
    const dirPath = path.join(PUBLIC_DIR, dir);
    if (fs.existsSync(dirPath)) {
      await processDirectory(dirPath, OUTPUT_DIR);
    }
  }

  console.log('Image optimization complete!');
}

main().catch(console.error);

