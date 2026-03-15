import type { TarotCard } from '../types/tarot';

export const shuffleCards = (cards: TarotCard[]): TarotCard[] => {
  const copiedCards = [...cards];

  for (let index = copiedCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copiedCards[index], copiedCards[randomIndex]] = [copiedCards[randomIndex], copiedCards[index]];
  }

  return copiedCards;
};
