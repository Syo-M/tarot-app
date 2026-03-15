import type { DeckMode, DrawnCard, ResultMode, SpreadType } from '../types/tarot';
import { getPositionLabel, getSpreadLabel } from './readingSummary';

const orientationLabelMap = {
  upright: '正位置',
  reversed: '逆位置',
} as const;

const deckLabelMap: Record<DeckMode, string> = {
  major: '大アルカナのみ',
  minor: '小アルカナのみ',
  mixed: '大アルカナ＋小アルカナ',
};

const buildCardDetails = (drawnCards: DrawnCard[]): string => {
  return drawnCards
    .map((drawnCard) => {
      const meaning = drawnCard.orientation === 'upright'
        ? drawnCard.card.uprightMeaning
        : drawnCard.card.reversedMeaning;

      return [
        `- 位置: ${getPositionLabel(drawnCard.position)}`,
        `- カード名: ${drawnCard.card.nameJa} / ${drawnCard.card.nameEn}`,
        `- 向き: ${orientationLabelMap[drawnCard.orientation]}`,
        `- 意味: ${meaning}`,
        `- キーワード: ${drawnCard.card.keywords.join(' / ')}`,
      ].join('\n');
    })
    .join('\n\n');
};

export const buildAiPrompt = ({
  spreadType,
  deckMode,
  question,
  resultMode,
  drawnCards,
  summary,
}: {
  spreadType: SpreadType;
  deckMode: DeckMode;
  question: string;
  resultMode: ResultMode;
  drawnCards: DrawnCard[];
  summary: string;
}): string => {
  const spreadLabel = getSpreadLabel(spreadType);
  const topicText = question.trim() ? `相談テーマ: ${question.trim()}` : '相談テーマ: 特に未入力';

  if (resultMode === 'summary') {
    return [
      '以下はタロット占いアプリの結果です。',
      topicText,
      `使用カード: ${deckLabelMap[deckMode]}`,
      `占い方法: ${spreadLabel}`,
      `総合結果: ${summary}`,
      '',
      'この占い結果をもとに、相談テーマに沿ってやさしく具体的にアドバイスをしてください。',
      'カードごとの詳しい解説は不要で、全体の流れと実践しやすい助言を簡潔にまとめてください。',
    ].join('\n');
  }

  return [
    '以下はタロット占いアプリの結果です。',
    topicText,
    `使用カード: ${deckLabelMap[deckMode]}`,
    `占い方法: ${spreadLabel}`,
    '',
    'カード情報:',
    buildCardDetails(drawnCards),
    '',
    `総合結果: ${summary}`,
    '',
    'この結果をもとに、相談テーマに沿って、カード同士の関係も踏まえながら、やさしく具体的にアドバイスをしてください。',
  ].join('\n');
};
