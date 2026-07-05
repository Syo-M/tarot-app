# Moonlit Tarot — fable_skills 準拠化 要件定義書

- **作成日**: 2026-07-05
- **対象ブランチ**: `ver_2`（正式版として採用。`main`＝現稼働版を完全に含む上位互換 / main + 16 コミット）
- **成果物のステータス**: 要件定義・ロードマップ（実装は各フェーズ着手時に個別承認のうえ実施）

---

## 1. 背景・目的

### 1.1 背景

本アプリ（Moonlit Tarot）は、ハーネス（Claude Code のような統合開発環境）を使わず、ChatGPT 等で 1 ファイルずつ手作りされた React 製のタロット占い SPA である。今回、Claude Code 用フロントエンド開発規約群 **`fable_skills/`** をリポジトリ内に取り込んだ。

`fable_skills` は以下で構成される `.claude` フル構成の規約セットである:

| 構成要素 | 内容 |
| --- | --- |
| `CLAUDE.md`（常駐コア） | セキュリティ / a11y の「床」となる不変原則（80 行未満） |
| `.claude/skills/`（31 スキル） | React・CSS Modules・テスト・a11y・motion 等の詳細規約（作業内容マッチで発動） |
| `.claude/rules/` | ファイルパス発動のトリップワイヤー（styling / tests / forms 等） |
| `.claude/agents/` | セキュリティ・a11y の敵対的レビュー用サブエージェント |
| `.claude/hooks/` | センシティブパス変更を人間承認へエスカレートする PreToolUse フック |
| `templates/` | ESLint / Stylelint / gitleaks / size-limit / Semgrep / CI の雛形 |

### 1.2 目的（ゴール）

> **既存の占い機能を壊さずに、fable_skills 準拠の品質基盤（Lint・型・テスト・a11y・motion・セキュリティ・CI）へ引き上げ、あわせて UI/UX をブラッシュアップする。完了後、ver_2 を正式版として main へ昇格する。**

### 1.3 確定済みの方針

| 項目 | 決定 |
| --- | --- |
| スコープ | 品質整備 + UI/UX ブラッシュアップ（新機能追加は対象外） |
| ベースブランチ | `ver_2` を正式版として採用（作業は ver_2 または派生ブランチ） |
| fable_skills 適用方法 | `./fable_skills/install.sh` でプロジェクトルートへ導入（`--styling css-modules`） |
| 実行モデル | 実装フェーズは Fable 5（claude-fable-5）で実行 |

---

## 2. 現状分析（As-Is）

### 2.1 技術スタック

| 項目 | 現状 | fable_skills 想定との一致 |
| --- | --- | --- |
| フレームワーク | React 19.1.1（関数コンポーネント + named export） | ✅ 一致 |
| 言語 | TypeScript 5.9.2（`strict: true`, `noUnusedLocals/Parameters`） | ✅ ほぼ一致（追加フラグ不足 → §5.5） |
| ビルド | Vite 7.1.3（`@vitejs/plugin-react-swc`） | ✅ 一致（`vite-react` スキル対象） |
| スタイリング | CSS Modules + CSS 変数（`variables.css`） | ✅ 一致（`css-modules` プロファイル対象） |
| デプロイ | GitHub Pages（`vite.config.ts` の `base: '/tarot-app/'`） | — |
| 依存 | react / react-dom のみ。UI ライブラリ・外部 API なし | — |

**評価**: アプリの構成は fable_skills が想定する `vite-react` + `css-modules` プロファイルにほぼ完全一致しており、フレームワーク移行等の大規模改修は不要。

### 2.2 機能一覧（ver_2 時点・すべて維持対象）

| 機能 | 内容 |
| --- | --- |
| スプレッド 5 種 | 1 枚 / 2 枚 / 3 枚（過去・現在・未来）/ 4 枚 / ケルト十字（10 枚） |
| デッキ 3 種 | 大アルカナ 22 枚 / 小アルカナ 56 枚 / 複合 78 枚 |
| 表示モード 2 種 | summary（総合結果のみ）/ full（各カードの意味・キーワード付き） |
| 相談内容入力 | textarea（結果と AI プロンプトに反映） |
| 気軽に占う | スプレッド・デッキをランダム選択し summary で即占い |
| シャッフル演出 | 3.2 秒の CSS アニメーション（7 枚カットシャッフル）＋手動スキップ |
| AI 連携 | プロンプト自動生成（summary/full 別）・クリップボードコピー・ChatGPT 直接リンク（`?q=`） |

### 2.3 ディレクトリ構成

```
src/
├── App.tsx                  … 3 画面（home/shuffle/result）の切替
├── components/
│   ├── common/              … PrimaryButton, ScreenContainer
│   └── tarot/               … AiAssistPanel, ResultCard, ResultSummary,
│                              ShuffleDeck, SpreadSelector, TarotCardView
├── pages/                   … HomePage, ShufflePage, ResultPage
├── hooks/useTarotReading.ts … 状態管理（useState ベース）
├── utils/                   … drawCards, promptBuilder, readingSummary,
│                              shuffleCards, random
├── constants/spreads.ts     … スプレッド/デッキ定義（※現在未使用 → FR-3）
├── data/tarotCards.ts       … 78 枚のカードデータ
├── types/tarot.ts           … 全型定義
└── styles/                  … globals.css, variables.css
```

責任分離・命名・型付けは良好。コード全体は約 1,200 行・28 ファイルの小規模構成。

### 2.4 既にできていること（維持すべき良い点）

- `index.html` に `lang="ja"`・`meta description` あり
- [HomePage.tsx:46](src/pages/HomePage/HomePage.tsx:46) — textarea に `<label htmlFor>` が正しく紐付け済み
- [SpreadSelector.tsx](src/components/tarot/SpreadSelector/SpreadSelector.tsx) — 選択ボタンは実 `<button type="button">` + `aria-pressed` 済み
- [PrimaryButton.tsx](src/components/common/PrimaryButton/PrimaryButton.tsx) — 実 `<button>` 要素。`ButtonHTMLAttributes` 継承で拡張性あり
- [AiAssistPanel.tsx:38](src/components/tarot/AiAssistPanel/AiAssistPanel.tsx:38) — 外部リンクは実 `<a>` + `rel="noreferrer"`、プロンプトは `encodeURIComponent` 済み
- `dangerouslySetInnerHTML` の使用なし（XSS 面の露出が小さい）
- シャッフルアニメーションは `transform` / `opacity` のみで実装（compositor フレンドリー）
- Fisher–Yates シャッフルの正確な実装（[shuffleCards.ts](src/utils/shuffleCards.ts)）

---

## 3. ギャップ分析（As-Is → To-Be）

fable_skills の各スキル領域と現状の差分。優先度: **高**＝品質基盤の前提 / **中**＝準拠必須だが独立して実施可 / **低**＝改善推奨。

| # | 領域（スキル/ルール） | 現状 | 必要対応 | 優先度 |
| --- | --- | --- | --- | --- |
| G-1 | 導入（CLAUDE.md 床・rules・hooks） | ルートに `.claude/` / `CLAUDE.md` なし。スキルが `src/` に効いていない | `install.sh . --styling css-modules` でルート導入 | **高** |
| G-2 | tooling（ESLint/Stylelint/tsconfig） | Lint 一切なし。scripts は `dev/build/preview` のみ | `templates/` の雛形導入 + scripts 追加（`lint`/`typecheck` 等） | **高** |
| G-3 | testing-vitest / storybook / testing-playwright | テスト 0 件 | 3 層整備（純ロジック→Vitest / コンポーネント→Storybook play / 導線→Playwright） | **高** |
| G-4 | DRY / 型（react-patterns） | ラベルマップ 4 種が複数ファイルに重複定義、値の不整合 1 件、不要な型キャスト、デッドコード 2 ファイル | §4 の FR-1〜FR-3 リファクタ | **高** |
| G-5 | css-modules（デザイントークン） | トークンは色 6 + shadow 1 のみ。spacing/radius/z-index/duration は生値が散在。**未定義トークン参照 1 件（実バグ）** | tokens.css 拡充・生値のトークン置換・未定義参照の修正 | **中** |
| G-6 | a11y（WCAG 2.2 AA） | 画面遷移時のフォーカス管理なし、コピー結果が `window.alert`、コントラスト未検証 | §5.1 の NFR-a11y 対応 | **中** |
| G-7 | motion | `prefers-reduced-motion` 非対応（無限ループアニメが常時再生）。duration/easing が生値 | §5.2 の NFR-motion 対応 | **中** |
| G-8 | frontend-security | バックエンドなしの静的 SPA のため CSRF/SSRF/セッション/webhook は **N/A**。該当面は「ChatGPT URL 構築」「clipboard」「secrets 非混入」のみ | §5.3 の NFR-security 対応（軽微） | **低** |
| G-9 | governance / CI | GitHub Actions は Pages デプロイのみ。品質ゲートなし | typecheck/lint/test/secrets scan の CI ゲート追加 | **中** |
| G-10 | images-media | カード画像は CSS 表現（実画像未導入・意図的） | 対応不要（実画像導入時に再評価） | 対象外 |
| G-11 | i18n | 日本語のみ・ハードコード | 対応不要（多言語化はスコープ外） | 対象外 |

---

## 4. 機能要件（FR）

> **前提: 既存のユーザー向け挙動（占いのロジック・画面フロー・生成されるプロンプトの構造）は維持する。** 以下は不整合の解消と内部品質の要件であり、FR-1 以外はユーザーから見た変化を生じない。

### FR-1: 位置ラベルの不整合を統一 【必須】

同じ `CardPosition` (`future`) に対して 2 つの日本語ラベルが存在し、**画面表示と AI プロンプトで表現が分裂している**。

| ファイル | ラベル |
| --- | --- |
| [promptBuilder.ts:30](src/utils/promptBuilder.ts:30) | `future: '未来'` |
| [readingSummary.ts:11](src/utils/readingSummary.ts:11) | `future: 'これから'` |

- UI 側の文言（[SpreadSelector.tsx:22](src/components/tarot/SpreadSelector/SpreadSelector.tsx:22) の「過去・現在・**これから**の流れ」）は「これから」を採用しているため、**統一値は「これから」を推奨**（最終決定はユーザー承認）。

### FR-2: ラベル定義の単一情報源化（Single Source of Truth） 【必須】

以下の 4 種のラベルマップが複数ファイルに重複定義されている。`src/constants/`（例: `labels.ts`）へ集約し、全参照元を差し替える。

| マップ | 重複箇所 |
| --- | --- |
| `orientationLabelMap` | [promptBuilder.ts:3](src/utils/promptBuilder.ts:3) / [ResultCard.tsx:10](src/components/tarot/ResultCard/ResultCard.tsx:10) |
| `positionLabelMap` | [promptBuilder.ts:22](src/utils/promptBuilder.ts:22) / [readingSummary.ts:3](src/utils/readingSummary.ts:3) ← FR-1 の原因 |
| `spreadLabelMap` | [promptBuilder.ts:8](src/utils/promptBuilder.ts:8) / [readingSummary.ts:24](src/utils/readingSummary.ts:24) |
| `deckLabelMap` | [promptBuilder.ts:16](src/utils/promptBuilder.ts:16)（枚数付き）/ [ShufflePage.tsx:16](src/pages/ShufflePage/ShufflePage.tsx:16)（枚数なし） |

- deckLabel の「枚数付き / なし」は用途差なので、基本ラベル + 枚数は導出（`枚数付き = `${label}（${count}枚）``）の形で一元化する。

### FR-3: `constants/spreads.ts` の活用または整理 【必須】

[constants/spreads.ts](src/constants/spreads.ts) は `deckDefinitions` / `spreadDefinitions` を定義しているが **どこからも import されていない完全なデッドコード**。一方 [SpreadSelector.tsx:13-30](src/components/tarot/SpreadSelector/SpreadSelector.tsx:13) は同じ情報（+ description）を独自にハードコードしている。

- **推奨**: `constants/spreads.ts` を正とし、`description` を追加（[types/tarot.ts:63-74](src/types/tarot.ts:63) の `DeckDefinition`/`SpreadDefinition` には `description?` フィールドが既に用意されている）。`SpreadSelector` / FR-2 のラベルマップ / [drawCards.ts:4](src/utils/drawCards.ts:4) の `spreadPositions`（cardCount と整合）から参照する。

### FR-4: 型の整理と不要キャストの撤廃 【必須】

- [useTarotReading.ts:83-87](src/hooks/useTarotReading.ts:83) の `drawCards as unknown as (...)` は **不要**。[types/tarot.ts:4](src/types/tarot.ts:4) で `DeckMode = DeckType`（単なる別名）のため、実シグネチャ [drawCards.ts:31](src/utils/drawCards.ts:31) にそのまま渡せる。キャストを削除する。
- 型別名の二重化（`DeckType` / `DeckMode`）を `DeckType` に統一し、`DeckMode` を廃止する（[ShufflePage.tsx](src/pages/ShufflePage/ShufflePage.tsx) の props 含む）。

### FR-5: デッドコードの削除 【必須】

- [utils/random.ts](src/utils/random.ts) — `shuffleArray` / `pickUniqueItems` は未使用（Fisher–Yates が [shuffleCards.ts](src/utils/shuffleCards.ts) と**二重実装**になっている）。削除する。
- [ShufflePage.tsx:12](src/pages/ShufflePage/ShufflePage.tsx:12) — props interface に `resultMode` が宣言されているが未使用。削除する。

### FR-6: UI/UX ブラッシュアップ候補 【優先度はユーザー決定】

以下は候補リスト。**Phase 4 着手前にユーザーが取捨選択・優先度付けを行う。**

| # | 候補 | 内容 |
| --- | --- | --- |
| UX-1 | コピー完了フィードバック改善 | [AiAssistPanel.tsx:17](src/components/tarot/AiAssistPanel/AiAssistPanel.tsx:17) の `window.alert` を非ブロッキングなトースト/インライン表示（`aria-live` 付き）に置換 |
| UX-2 | デザイントークン拡充とタイポスケール整理 | spacing / radius / z-index / duration / font-size のトークン化と統一（G-5 と連動） |
| UX-3 | シャッフル演出の洗練 | カード切り混ぜの動きの質感向上、シャッフル→結果への遷移アニメーション追加 |
| UX-4 | 結果画面のカード公開演出 | 結果表示時にカードが順番にめくれる/フェードインする演出 |
| UX-5 | レスポンシブ微調整 | モバイル実機での余白・タップ領域（44px 目安）・ケルト十字 10 枚表示の見やすさ改善 |
| UX-6 | 「もう一度占う」の挙動整理 | [ResultPage.tsx:44-45](src/pages/ResultPage/ResultPage.tsx:44) で `onRetry` / `onBackHome` が両方 `resetToHome` で同一挙動。「同じ設定で再シャッフル」への変更を検討 |
| UX-7 | 空状態・エラー状態の明確化 | クリップボード失敗時の案内改善、`?q=` URL が長すぎる場合のフォールバック |

---

## 5. 非機能要件（NFR）

### 5.1 NFR-a11y（WCAG 2.2 AA / `a11y` スキル準拠）

| # | 要件 | 対象 |
| --- | --- | --- |
| A-1 | 画面遷移（home→shuffle→result）時に新画面の見出しへフォーカス移動（SPA のルート変更相当） | [App.tsx](src/App.tsx) / ScreenContainer |
| A-2 | コピー結果・シャッフル完了など状態変化を `aria-live` で通知（`window.alert` 廃止 = UX-1） | AiAssistPanel / ShufflePage |
| A-3 | テキスト 4.5:1・UI コンポーネント 3:1 のコントラスト検証（紫背景 × `--color-text-muted: #c3bad9` 等） | variables.css / 各 module.css |
| A-4 | フォーカスインジケータの可視化確認（`outline: none` の代替なし禁止） | PrimaryButton / SpreadSelector / detailButton |
| A-5 | キーボードのみで全導線（占う→結果→コピー）が完結することの手動確認 | 全画面 |
| A-6 | axe による自動チェックで serious/critical 違反 0 件（テストに組込み） | Storybook a11y addon / Playwright axe scan |

### 5.2 NFR-motion（`motion` スキル準拠）

| # | 要件 | 対象 |
| --- | --- | --- |
| M-1 | `prefers-reduced-motion: reduce` 時、無限ループのシャッフル/パルスアニメを停止し、静的表示＋テキスト（「準備しています…」）へフォールバック | [ShuffleDeck.module.css:47](src/components/tarot/ShuffleDeck/ShuffleDeck.module.css:47)（`cutShuffle` 3.8s infinite）/ :29（`pulse` 3.4s infinite） |
| M-2 | duration / easing のトークン化（`--duration-*` / `--easing-*`） | variables.css + 各 module.css |
| M-3 | アニメーションは `transform` / `opacity` のみ維持（現状 OK、リグレッション防止として Stylelint で強制） | 全 module.css |

### 5.3 NFR-security（`frontend-security` スキル準拠 — 静的 SPA のため適用範囲は限定）

| # | 要件 | 対象 |
| --- | --- | --- |
| S-1 | ChatGPT URL 構築を `new URL()` ベースに変更し、ベース URL 固定・パラメータは `searchParams` で付与（現状の文字列連結 + `encodeURIComponent` でも実害はないが、規約準拠形へ） | [AiAssistPanel.tsx:11-12](src/components/tarot/AiAssistPanel/AiAssistPanel.tsx:11) |
| S-2 | secrets のバンドル/ログ非混入の継続確認（現状 secrets なし。gitleaks を CI に導入して機械的に担保） | CI |
| S-3 | `dangerouslySetInnerHTML` 不使用の継続（ESLint ルールで機械的に禁止） | ESLint 設定 |
| S-4 | 依存追加時の審査フロー（fable_skills の `dependency-vetter` エージェント）に従う | 運用 |

> CSRF / SSRF / セッション / webhook / レートリミット / アップロードは、サーバーサイドを持たない本アプリでは **N/A**。バックエンド追加時に再評価する。

### 5.4 NFR-test（3 層テスト整備）

| 層 | ツール | 対象（初期整備分） |
| --- | --- | --- |
| 純ロジック | Vitest | `drawCards`（スプレッド別枚数・デッキフィルタ・正逆の割当）/ `shuffleCards`（順列性・非破壊）/ `promptBuilder`（summary/full の出力構造・相談内容の反映）/ `readingSummary`（0 枚時・締め文） |
| コンポーネント | Storybook play 関数（CSF3, Vitest addon 実行） | PrimaryButton（variant）/ SpreadSelector(選択と `aria-pressed`) / AiAssistPanel（コピー動作）/ ResultCard / ResultSummary |
| ユーザー導線 | Playwright E2E | ①ホーム→設定→シャッフル→結果 ②気軽に占う→結果 ③プロンプトコピー（clipboard 権限スタブ） |
| 品質ゲート | axe | Storybook a11y addon + E2E axe scan、violation はテスト失敗扱い |

### 5.5 NFR-tooling / CI

| # | 要件 |
| --- | --- |
| T-1 | ESLint 導入（`fable_skills/templates/eslint.config.js` をベースに調整） |
| T-2 | Stylelint 導入（`templates/stylelint.config.mjs`。トークン強制・生値検出） |
| T-3 | tsconfig 強化: `noUncheckedIndexedAccess` / `noImplicitOverride` / `verbatimModuleSyntax` を追加。**影響予測**: [useTarotReading.ts:38](src/hooks/useTarotReading.ts:38) `getRandomItem` と [drawCards.ts:39](src/utils/drawCards.ts:39) `positions[index]` は `undefined` 可能性の対応が必要になる |
| T-4 | `package.json` scripts 追加: `typecheck` / `lint` / `stylelint` / `test` / `test:storybook` / `e2e` |
| T-5 | CI（GitHub Actions）: typecheck → lint → test → e2e → gitleaks を PR ゲート化。既存の Pages デプロイ workflow は維持 |
| T-6 | `size-limit` によるバンドル予算（fable_skills 既定: 約 170 kB gzip JS/route。現状は react + react-dom のみなので余裕十分） |

### 5.6 NFR-design-tokens（`css-modules` スキル準拠）

| # | 要件 |
| --- | --- |
| D-1 | **実バグ修正**: [ShuffleDeck.module.css:110](src/components/tarot/ShuffleDeck/ShuffleDeck.module.css:110) が未定義トークン `--color-text-main` を参照（[variables.css](src/styles/variables.css) の定義は `--color-text`）。正しいトークンへ修正 |
| D-2 | トークン体系の拡充: 現状 6 色 + 1 shadow のみ → spacing / radius / z-index / duration / easing / font-size を追加 |
| D-3 | 各 module.css に散在する生値（例: ShuffleDeck の `rgba(127,92,255,…)`、`border-radius: 18px`、z-index `2/3/4`）をトークン参照へ置換 |
| D-4 | インラインスタイル撤廃: [ResultPage.tsx:63](src/pages/ResultPage/ResultPage.tsx:63) / [AiAssistPanel.tsx:36](src/components/tarot/AiAssistPanel/AiAssistPanel.tsx:36) の `style={{ display:'flex', … }}` を `.buttonRow` クラスへ統合 |

---

## 6. 実施ロードマップ

各フェーズは独立して完結し、フェーズ末に動作確認（§8）を通す。**⚠ 印はセンシティブ変更（`.claude/` / CLAUDE.md / CI / デプロイ / ブランチ操作）を含むため、着手時にユーザーの個別承認を得る。**

### Phase 0: 基盤導入 ⚠

- **目的**: fable_skills を `src/` に効かせ、以降の全フェーズをスキル規約下で実施できる状態にする
- **作業**:
  1. `./fable_skills/install.sh . --styling css-modules --dry-run` で計画確認 → 本実行
     - ルート `.claude/`（skills/rules/agents/hooks）+ `CLAUDE.md` + settings.json 生成
     - `.claude/fable-skills-version` に導入バージョン記録
  2. `templates/` から opt-in 分を取込み: `eslint.config.js` / `stylelint.config.mjs` / `gitleaks.toml` / `size-limit.json` / `.semgrep/`
  3. devDependencies + scripts 追加（T-1/T-2/T-4）、tsconfig 強化（T-3）と型エラー解消
- **完了条件**: `npm run typecheck` / `lint` / `stylelint` が緑。`npm run build` 成功。アプリ挙動に変化なし
- **参照スキル**: governance / tooling / vite-react

### Phase 1: コード品質リファクタ（挙動非変更）

- **目的**: DRY 違反・型負債・デッドコードの一掃
- **作業**: FR-1（ラベル統一）/ FR-2（ラベル単一情報源化）/ FR-3（constants/spreads.ts 活用）/ FR-4（キャスト撤廃・DeckMode 廃止）/ FR-5（デッドコード削除）/ D-1（未定義トークン修正）/ D-4（インラインスタイル撤廃)
- **完了条件**: 全ゲート緑 + 手動での全導線確認（占い結果・プロンプト内容が従来と同等。ただし FR-1 のラベル統一分のみ差分許容）
- **参照スキル**: react-patterns / css-modules

### Phase 2: a11y / motion / security 準拠

- **目的**: WCAG 2.2 AA・reduced-motion・セキュリティ規約への適合
- **作業**: A-1〜A-5（§5.1）/ M-1〜M-3（§5.2）/ S-1〜S-3（§5.3）/ D-2〜D-3（トークン拡充）
- **完了条件**: 手動キーボードウォーク通過、`prefers-reduced-motion` 有効時の代替表示確認、コントラスト計測 4.5:1 以上
- **参照スキル**: a11y / motion / frontend-security / css-modules

### Phase 3: テスト整備

- **目的**: 3 層テスト（§5.4）の導入とリグレッション防止網の確立
- **作業**: Vitest 導入 + 純ロジックテスト → Storybook 導入 + 主要コンポーネントの stories + play 関数 → Playwright 導入 + 主要 3 導線 E2E → axe 組込み（A-6）
- **完了条件**: `npm run test` / `test:storybook` / `e2e` すべて緑。axe violation 0
- **参照スキル**: testing-vitest / storybook / testing-playwright / new-component

### Phase 4: UI/UX ブラッシュアップ

- **目的**: FR-6 候補（UX-1〜UX-7）のうちユーザーが選定した項目の実装
- **前提**: **着手前に UX-1〜UX-7 の取捨選択・優先度付けをユーザーに確認する**
- **完了条件**: 選定項目の実装 + 該当テスト（play 関数 / E2E）の追随更新
- **参照スキル**: motion / css-modules / design-system / a11y

### Phase 5: CI ゲート・正式版昇格 ⚠

- **目的**: 品質ゲートの CI 化と ver_2 の正式版化
- **作業**:
  1. GitHub Actions に品質ゲート（T-5: typecheck/lint/test/e2e/gitleaks）を追加。既存 Pages デプロイと共存
  2. `pre-ship` スキルの一括ゲートで最終確認
  3. **ver_2 → main 昇格**（マージ方式はユーザーと確認: merge / main の付け替え）
  4. GitHub Pages デプロイ導線が main（昇格後）を向くことを確認
- **完了条件**: main での CI 全緑 + 本番 URL での動作確認
- **参照スキル**: governance / pre-ship

---

## 7. スコープ外・前提

| 項目 | 扱い |
| --- | --- |
| バックエンド / API 新設 | 対象外（静的 SPA を維持。AI 連携は現行のプロンプト受け渡し方式のまま） |
| カード実画像の導入 | 対象外（現行の CSS 表現を維持。導入時は images-media スキルで別途要件化） |
| 多言語化（i18n） | 対象外 |
| 新スプレッド・新占い機能 | 対象外（今回スコープは品質整備 + UI/UX） |
| `vite.config.ts` の `base: '/tarot-app/'` / GitHub Pages | 原則維持（Phase 5 で導線確認のみ） |
| `fable_skills/` ディレクトリ自体 | 規約の配布元として維持（install 後もルールの正本はここ。更新は install.sh の再実行で反映） |

---

## 8. 検証方法（受け入れ基準）

### 各フェーズ共通

1. `npm run typecheck` / `lint` / `stylelint` / `test`（Phase 3 以降は `e2e` 含む）がすべて緑
2. `npm run build` 成功 + `npm run preview` で主要 3 導線の手動確認:
   - カスタマイズ占い: 相談内容入力 → デッキ/スプレッド/表示スタイル選択 → シャッフル → 結果 → 詳細開閉
   - 気軽に占う: ワンタップ → シャッフル → summary 結果
   - AI 連携: プロンプトコピー / ChatGPT リンクの URL 内容確認
3. 生成される AI プロンプトが従来と同等の構造であること（FR-1 のラベル統一分のみ差分許容）

### 最終（Phase 5 完了時）

- `pre-ship` スキルの一括ゲート通過（typecheck → lint → test → security → a11y）
- axe violation 0（serious/critical）
- `prefers-reduced-motion` 有効環境でのシャッフル画面確認
- 本番（GitHub Pages）URL での動作確認

---

## 付録: 検出済み事実の一覧（調査時の裏取り済み）

| 種別 | 内容 | 場所 |
| --- | --- | --- |
| 実バグ | 未定義トークン `--color-text-main` 参照 | ShuffleDeck.module.css:110 |
| 不整合 | `future` ラベル「未来」vs「これから」 | promptBuilder.ts:30 / readingSummary.ts:11 |
| 重複 | orientationLabelMap ×2 / positionLabelMap ×2 / spreadLabelMap ×2 / deckLabelMap ×2 | §4 FR-2 参照 |
| 重複 | Fisher–Yates 二重実装（片方デッド） | shuffleCards.ts（使用中）/ random.ts（未使用） |
| デッド | `constants/spreads.ts` 全体が未 import | constants/spreads.ts |
| デッド | 未使用 props `resultMode` | ShufflePage.tsx:12 |
| 冗長 | 不要な `as unknown as` キャスト（`DeckMode = DeckType` のため） | useTarotReading.ts:83-87 |
| 冗長 | インラインスタイル ×2（`.buttonRow` と併用） | ResultPage.tsx:63 / AiAssistPanel.tsx:36 |
| a11y | `window.alert` によるコピー通知 | AiAssistPanel.tsx:17,20 |
| a11y | 画面遷移時のフォーカス管理なし | App.tsx |
| motion | `prefers-reduced-motion` 非対応の無限アニメ | ShuffleDeck.module.css:29,47 |
| tsconfig | `noUncheckedIndexedAccess` 導入時に要修正 | useTarotReading.ts:38 / drawCards.ts:39 |
