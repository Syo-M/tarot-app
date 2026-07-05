import { describe, expect, it, vi } from 'vitest';
import { tarotCards } from '../data/tarotCards';
import { drawCards, filterCardsByDeckType } from './drawCards';

describe('filterCardsByDeckType', () => {
    it('major を指定すると大アルカナ22枚だけを返す', () => {
        const filtered = filterCardsByDeckType(tarotCards, 'major');

        expect(filtered).toHaveLength(22);
        expect(filtered.every((card) => card.arcana === 'major')).toBe(true);
    });

    it('minor を指定すると小アルカナ56枚だけを返す', () => {
        const filtered = filterCardsByDeckType(tarotCards, 'minor');

        expect(filtered).toHaveLength(56);
        expect(filtered.every((card) => card.arcana === 'minor')).toBe(true);
    });

    it('mixed を指定すると全78枚を返す', () => {
        expect(filterCardsByDeckType(tarotCards, 'mixed')).toHaveLength(78);
    });
});

describe('drawCards', () => {
    it('1枚引きは single ポジションのカードを1枚返す', () => {
        const drawn = drawCards(tarotCards, 'single', 'mixed');

        expect(drawn).toHaveLength(1);
        expect(drawn.map((card) => card.position)).toEqual(['single']);
    });

    it('3枚引きは過去・現在・未来のポジション順で3枚返す', () => {
        const drawn = drawCards(tarotCards, 'three', 'mixed');

        expect(drawn.map((card) => card.position)).toEqual(['past', 'present', 'future']);
    });

    it('ケルト十字は定義された10ポジション順で10枚返す', () => {
        const drawn = drawCards(tarotCards, 'celticCross', 'mixed');

        expect(drawn.map((card) => card.position)).toEqual([
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
        ]);
    });

    it('同じカードは重複して引かれない', () => {
        const drawn = drawCards(tarotCards, 'celticCross', 'mixed');

        const ids = drawn.map((card) => card.card.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('major デッキ指定なら大アルカナだけから引く', () => {
        const drawn = drawCards(tarotCards, 'four', 'major');

        expect(drawn.every((card) => card.card.arcana === 'major')).toBe(true);
    });

    it('乱数が0.5より大きい場合は正位置になる', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.9);

        const drawn = drawCards(tarotCards, 'single', 'mixed');

        expect(drawn[0]?.orientation).toBe('upright');
    });

    it('乱数が0.5以下の場合は逆位置になる', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.1);

        const drawn = drawCards(tarotCards, 'single', 'mixed');

        expect(drawn[0]?.orientation).toBe('reversed');
    });
});
