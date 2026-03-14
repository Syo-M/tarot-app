import { DECKS, SPREADS } from '../constants/spreads';
import type { AiPromptPayload, DrawnCard, ReadingOptions } from '../types/tarot';

const orientationMap = {
  upright: '正位置',
  reversed: '逆位置',
} as const;

export const buildAiPromptPayload = (
  options: ReadingOptions,
  drawnCards: DrawnCard[],
): AiPromptPayload => {
  const spreadName = SPREADS.find((item) => item.key === options.spreadType)?.name ?? options.spreadType;
  const deckName = DECKS.find((item) => item.key === options.deckType)?.name ?? options.deckType;

  return {
    question: options.question,
    spreadName,
    deckName,
    cards: drawnCards.map((drawnCard) => ({
      position: drawnCard.label,
      nameJa: drawnCard.card.nameJa,
      nameEn: drawnCard.card.nameEn,
      orientation: orientationMap[drawnCard.orientation],
      keywords: drawnCard.card.keywords,
      meaning:
        drawnCard.orientation === 'upright'
          ? drawnCard.card.uprightMeaning
          : drawnCard.card.reversedMeaning,
    })),
  };
};

export const buildAiPromptMarkdown = (
  options: ReadingOptions,
  drawnCards: DrawnCard[],
): string => {
  const payload = buildAiPromptPayload(options, drawnCards);

  const cardLines = payload.cards
    .map(
      (card, index) => `### ${index + 1}. ${card.position}
- カード名: ${card.nameJa} / ${card.nameEn}
- 向き: ${card.orientation}
- キーワード: ${card.keywords.join(' / ')}
- そのカード単体の意味: ${card.meaning}`,
    )
    .join('\n\n');

  const questionLine = payload.question.trim().length > 0 ? payload.question.trim() : '特に質問は入力していません。現在の流れの総合鑑定をお願いします。';

  return `# タロット総合鑑定の依頼

あなたは落ち着いた口調で、やさしく具体的に解釈するタロット占い師です。
以下のスプレッド結果をもとに、カード同士の関係性を読み解きながら総合鑑定をしてください。

## 相談内容
${questionLine}

## スプレッド情報
- スプレッド: ${payload.spreadName}
- 使用デッキ: ${payload.deckName}

## 引いたカード
${cardLines}

## 出力してほしい内容
1. 全体の総合評価
2. カード同士のつながりの解説
3. 相談内容に対する具体的なアドバイス
4. 直近で意識すると良い行動を3つ
5. 最後に一言のやさしいメッセージ

※ 日本語で、わかりやすく、やや神秘的だが過度に断定しない文体でお願いします。`;
};
