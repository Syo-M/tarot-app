import { describe, expect, it } from 'vitest';
import type { DrawnCard, TarotCard } from '../types/tarot';
import { buildReadingSummary } from './readingSummary';

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

describe('buildReadingSummary', () => {
    it('カードが1枚も引かれていない場合は案内文を返す', () => {
        expect(buildReadingSummary([], 'single')).toBe('まだカードが引かれていません。');
    });

    it('正位置のカードは正位置の意味で文を組み立てる', () => {
        const drawn: DrawnCard[] = [{ card: makeCard(1), orientation: 'upright', position: 'single' }];

        const summary = buildReadingSummary(drawn, 'single');

        expect(summary).toContain('今回のテーマには「カード1」が出ています。正位置の意味1');
    });

    it('逆位置のカードは逆位置の意味で文を組み立てる', () => {
        const drawn: DrawnCard[] = [{ card: makeCard(1), orientation: 'reversed', position: 'single' }];

        const summary = buildReadingSummary(drawn, 'single');

        expect(summary).toContain('逆位置の意味1');
    });

    it('future ポジションは「これから」と表記する', () => {
        const drawn: DrawnCard[] = [{ card: makeCard(1), orientation: 'upright', position: 'future' }];

        const summary = buildReadingSummary(drawn, 'three');

        expect(summary).toContain('これからには「カード1」が出ています。');
        expect(summary).not.toContain('未来には');
    });

    it('スプレッドに応じた締めの文を末尾に付ける', () => {
        const drawn: DrawnCard[] = [{ card: makeCard(1), orientation: 'upright', position: 'single' }];

        const summary = buildReadingSummary(drawn, 'single');

        expect(summary.endsWith('いま一番気になっていることに意識を向けると、流れをつかみやすくなります。')).toBe(
            true,
        );
    });
});
