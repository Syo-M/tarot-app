import { describe, expect, it } from 'vitest';
import type { TarotCard } from '../types/tarot';
import { shuffleCards } from './shuffleCards';

const makeCard = (id: number): TarotCard => ({
    id,
    nameJa: `カード${id}`,
    nameEn: `Card ${id}`,
    image: '',
    uprightMeaning: `正位置の意味${id}`,
    reversedMeaning: `逆位置の意味${id}`,
    keywords: ['キーワード'],
    arcana: 'major',
});

const setup = () => {
    const cards = Array.from({ length: 20 }, (_, index) => makeCard(index));
    return { cards };
};

describe('shuffleCards', () => {
    it('元の配列と同じカード集合を返す（欠落・重複なし）', () => {
        const { cards } = setup();

        const shuffled = shuffleCards(cards);

        const originalIds = cards.map((card) => card.id).sort((a, b) => a - b);
        const shuffledIds = shuffled.map((card) => card.id).sort((a, b) => a - b);
        expect(shuffledIds).toEqual(originalIds);
    });

    it('元の配列を破壊しない', () => {
        const { cards } = setup();
        const originalOrder = cards.map((card) => card.id);

        shuffleCards(cards);

        expect(cards.map((card) => card.id)).toEqual(originalOrder);
    });

    it('新しい配列インスタンスを返す', () => {
        const { cards } = setup();

        const shuffled = shuffleCards(cards);

        expect(shuffled).not.toBe(cards);
    });

    it('空配列を渡すと空配列を返す', () => {
        expect(shuffleCards([])).toEqual([]);
    });
});
