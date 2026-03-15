import type { CardPosition, DrawnCard, SpreadType } from '../types/tarot';

const positionLabelMap: Record<CardPosition, string> = {
  single: '今回のテーマ',
  first: '1枚目',
  second: '2枚目',
  third: '3枚目',
  fourth: '4枚目',
  past: '過去',
  present: '現在',
  future: 'これから',
  situation: '現状',
  challenge: '障害',
  conscious: '顕在意識',
  subconscious: '潜在意識',
  pastFoundation: '過去の土台',
  nearFuture: '近い未来',
  self: '自分自身',
  environment: '周囲の状況',
  hopesFears: '希望と不安',
  outcome: '最終結果',
};

const spreadLabelMap: Record<SpreadType, string> = {
  single: '1枚引き',
  two: '2枚引き',
  three: '3枚引き',
  four: '4枚引き',
  celticCross: 'ケルト十字',
};

const buildCardSentence = (drawnCard: DrawnCard): string => {
  const meaning = drawnCard.orientation === 'upright'
    ? drawnCard.card.uprightMeaning
    : drawnCard.card.reversedMeaning;

  return `${positionLabelMap[drawnCard.position]}には「${drawnCard.card.nameJa}」が出ています。${meaning}`;
};

const closingSentenceMap: Record<SpreadType, string> = {
  single: 'いま一番大切なのは、広げすぎず、気になっていることを一つに絞って受け止めることです。',
  two: '二つの要素を見比べることで、今の迷いの整理や優先順位の確認がしやすくなります。',
  three: '過去から現在、そしてこれからの流れを見ると、今の選択が次の展開を丁寧に育てていく流れです。',
  four: '複数の材料を並べて見ることで、感情と現実の両方から落ち着いて判断しやすくなります。',
  celticCross: '全体を通して見ると、すぐに結論を急ぐよりも、現状の課題と周囲の流れを整理しながら一歩ずつ進めることで道が見えやすくなります。',
};

export const getPositionLabel = (position: CardPosition): string => positionLabelMap[position];
export const getSpreadLabel = (spreadType: SpreadType): string => spreadLabelMap[spreadType];

export const buildReadingSummary = (drawnCards: DrawnCard[], spreadType: SpreadType): string => {
  if (drawnCards.length === 0) {
    return 'まだカードが引かれていません。';
  }

  return drawnCards
    .map(buildCardSentence)
    .concat(closingSentenceMap[spreadType])
    .join(' ');
};
