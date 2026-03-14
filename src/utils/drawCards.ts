import { SPREADS } from '../constants/spreads';
import { getCardsByDeck } from '../data/tarotCards';
import type {
  CardOrientation,
  DeckType,
  DrawnCard,
  ReadingOptions,
  SpreadType,
} from '../types/tarot';
import { pickUniqueItems } from './random';

const randomOrientation = (): CardOrientation =>
  Math.random() > 0.5 ? 'upright' : 'reversed';

export const drawCards = ({
  spreadType,
  deckType,
}: Pick<ReadingOptions, 'spreadType' | 'deckType'>): DrawnCard[] => {
  const spread = SPREADS.find((item) => item.key === spreadType);

  if (!spread) {
    return [];
  }

  const deck = getCardsByDeck(deckType);

  if (deck.length < spread.drawCount) {
    throw new Error(`Deck is too small for spread: ${spreadType}`);
  }

  const selectedCards = pickUniqueItems(deck, spread.drawCount);

  return selectedCards.map((card, index) => ({
    card,
    orientation: randomOrientation(),
    position: spread.positions[index].key,
    label: spread.positions[index].label,
  }));
};

export const getAvailableCardsCount = (deckType: DeckType): number =>
  getCardsByDeck(deckType).length;

export const getRequiredDrawCount = (spreadType: SpreadType): number =>
  SPREADS.find((item) => item.key === spreadType)?.drawCount ?? 0;
