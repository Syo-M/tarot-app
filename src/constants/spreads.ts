import type { DeckDefinition, SpreadDefinition } from '../types/tarot';

export const deckDefinitions: DeckDefinition[] = [
    { id: 'major', label: '大アルカナ' },
    { id: 'minor', label: '小アルカナ' },
    { id: 'mixed', label: '複合' },
];

export const spreadDefinitions: SpreadDefinition[] = [
    { id: 'single', label: '1枚引き', cardCount: 1 },
    { id: 'two', label: '2枚引き', cardCount: 2 },
    { id: 'three', label: '3枚引き', cardCount: 3 },
    { id: 'four', label: '4枚引き', cardCount: 4 },
    { id: 'celticCross', label: 'ケルト十字', cardCount: 10 },
];
