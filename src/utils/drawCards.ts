import type { CardOrientation, DeckType, DrawnCard, SpreadType, TarotCard } from '../types/tarot';
import { getSpreadPositions } from '../constants/spreads';
import { shuffleCards } from './shuffleCards';

const getRandomOrientation = (): CardOrientation => (Math.random() > 0.5 ? 'upright' : 'reversed');

export const filterCardsByDeckType = (cards: TarotCard[], deckType: DeckType): TarotCard[] => {
    if (deckType === 'major') return cards.filter((card) => card.arcana === 'major');
    if (deckType === 'minor') return cards.filter((card) => card.arcana === 'minor');
    return cards;
};

export const drawCards = (cards: TarotCard[], spreadType: SpreadType, deckType: DeckType): DrawnCard[] => {
    const pool = filterCardsByDeckType(cards, deckType);
    const positions = getSpreadPositions(spreadType);
    const shuffledCards = shuffleCards(pool).slice(0, positions.length);

    return shuffledCards.flatMap((card, index) => {
        const position = positions[index];

        // shuffledCards は positions.length 枚に slice 済みのため position は常に存在する
        if (position === undefined) {
            return [];
        }

        return [{ card, orientation: getRandomOrientation(), position }];
    });
};
