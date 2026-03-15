import type { CardOrientation, CardPosition, DeckMode, DrawnCard, SpreadType, TarotCard } from '../types/tarot';
import { shuffleCards } from './shuffleCards';

const spreadPositions: Record<SpreadType, CardPosition[]> = {
    single: ['single'],
    two: ['first', 'second'],
    three: ['past', 'present', 'future'],
    four: ['first', 'second', 'third', 'fourth'],
    celticCross: [
        'situation',
        'challenge',
        'conscious',
        'subconscious',
        'pastFoundation',
        'nearFuture',
        'self',
        'environment',
        'hopesFears',
        'outcome',
    ],
};

const getRandomOrientation = (): CardOrientation => (Math.random() > 0.5 ? 'upright' : 'reversed');

export const filterCardsByDeckMode = (cards: TarotCard[], deckMode: DeckMode): TarotCard[] => {
    if (deckMode === 'major') return cards.filter((card) => card.arcana === 'major');
    if (deckMode === 'minor') return cards.filter((card) => card.arcana === 'minor');
    return cards;
};

export const drawCards = (cards: TarotCard[], spreadType: SpreadType, deckMode: DeckMode): DrawnCard[] => {
    const pool = filterCardsByDeckMode(cards, deckMode);
    const positions = spreadPositions[spreadType];
    const shuffledCards = shuffleCards(pool).slice(0, positions.length);

    return shuffledCards.map((card, index) => ({
        card,
        orientation: getRandomOrientation(),
        position: positions[index],
    }));
};
