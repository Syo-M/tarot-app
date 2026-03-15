import type { DrawnCard, ResultMode, SpreadType } from '../types/tarot';

const orientationLabelMap = {
  upright: '正位置',
  reversed: '逆位置',
} as const;

const spreadLabelMap = {
  single: '1枚引き',
  three: '3枚引き',
} as const;

const positionLabelMap = {
  single: '今回のテーマ',
  past: '過去',
  present: '現在',
  future: '未来',
} as const;

const buildCardSection = (drawnCards: DrawnCard[]): string => {
  return drawnCards
    .map((drawnCard, index) => {
      const meaning = drawnCard.orientation === 'upright'
        ? drawnCard.card.uprightMeaning
        : drawnCard.card.reversedMeaning;

      return [
        `### ${index + 1}. ${positionLabelMap[drawnCard.position]}`,
        `- カード名: ${drawnCard.card.nameJa} / ${drawnCard.card.nameEn}`,
        `- 向き: ${orientationLabelMap[drawnCard.orientation]}`,
        `- キーワード: ${drawnCard.card.keywords.join(' / ')}`,
        `- そのカード単体の意味: ${meaning}`,
      ].join('\n');
    })
    .join('\n\n');
};

export const buildAiPrompt = ({
  spreadType,
  resultMode,
  drawnCards,
  summary,
  consultationTopic,
}: {
  spreadType: SpreadType;
  resultMode: ResultMode;
  drawnCards: DrawnCard[];
  summary: string;
  consultationTopic: string;
}): string => {
  const consultation = consultationTopic.trim() || '特になし';

  if (resultMode === 'summary') {
    return [
      '# タロット総合鑑定の依頼',
      '',
      'あなたは落ち着いた口調で、やさしく具体的に解釈するタロット占い師です。',
      '以下の占い結果をもとに、相談内容に対して総合的に鑑定してください。',
      '',
      '## 相談内容',
      consultation,
      '',
      '## 占い結果',
      summary,
      '',
      '## 出力してほしい内容',
      '1. 全体の総合評価',
      '2.相談内容に対する具体的なアドバイス',
      '3.直近で意識すると良い行動を3つ',
      '4.カードの意味とカード同士のつながりの解説',
      '5. 最後にまとめとどうすべきかのメッセージ',
      '',
      '※ 日本語で、わかりやすく、やや神秘的だが過度に断定しない文体でお願いします。',
    ].join('\n');
  }

  return [
    '# タロット総合鑑定の依頼',
    '',
    'あなたは落ち着いた口調で、やさしく具体的に解釈するタロット占い師です。',
    '以下のスプレッド結果をもとに、カード同士の関係性を読み解きながら総合鑑定をしてください。',
    '',
    '## 相談内容',
    consultation,
    '',
    '## スプレッド情報',
    `- スプレッド: ${spreadLabelMap[spreadType]}`,
    '- 使用デッキ: 大アルカナ（22枚）',
    '',
    '## 引いたカード',
    buildCardSection(drawnCards),
    '',
    '## 出力してほしい内容',
    '1. 全体の総合評価',
    '2.相談内容に対する具体的なアドバイス',
    '3.直近で意識すると良い行動を3つ',
    '4.カードの意味とカード同士のつながりの解説',
    '5. 最後にまとめとどうすべきかのメッセージ',
    '',
    '※ 日本語で、わかりやすく、やや神秘的だが過度に断定しない文体でお願いします。',
  ].join('\n');
};
