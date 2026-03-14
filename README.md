# Moonlit Tarot - Expanded Edition

既存の公開版では 1枚引き / 3枚引き中心だった構成を、次の内容へ拡張した React + Vite + TypeScript プロジェクトです。

## 追加した主な内容

- 1枚引き
- 2枚引き
- 3枚引き
- 4枚引き
- ケルト十字
- 大アルカナのみ
- 小アルカナのみ
- 複合（全78枚）
- AI に渡すための Markdown テキスト生成
- コピーボタン
- ChatGPT / Gemini への外部リンク

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## デプロイ

GitHub Pages を前提に `vite.config.ts` の `base` を `/tarot-app/` に設定しています。
リポジトリ名を変える場合はここも合わせて変更してください。

## カード画像について

今回は UI 一式をすぐ動かせることを優先し、画像なしでも成立するようにカード面を CSS で表現しています。
実画像を使う場合は以下のどちらかで差し替えできます。

1. `src/assets/images/cards/` に画像を置き、`src/data/tarotCards.ts` の `image` を更新する
2. `TarotCardView.tsx` を `img` 表示に切り替える
