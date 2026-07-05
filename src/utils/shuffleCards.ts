import type { TarotCard } from '../types/tarot';

export const shuffleCards = (cards: TarotCard[]): TarotCard[] => {
  const copiedCards = [...cards];

  for (let index = copiedCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = copiedCards[index];
    const swapped = copiedCards[randomIndex];

    // index / randomIndex は常に配列範囲内（noUncheckedIndexedAccess 対応のガード）
    if (current === undefined || swapped === undefined) {
      continue;
    }

    copiedCards[index] = swapped;
    copiedCards[randomIndex] = current;
  }

  return copiedCards;
};
