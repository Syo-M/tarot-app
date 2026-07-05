import { describe, expect, it } from 'vitest';
import type { DrawnCard, TarotCard } from '../types/tarot';
import { buildAiPrompt } from './promptBuilder';

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

const threeCardDraw: DrawnCard[] = [
    { card: makeCard(1), orientation: 'upright', position: 'past' },
    { card: makeCard(2), orientation: 'reversed', position: 'present' },
    { card: makeCard(3), orientation: 'upright', position: 'future' },
];

const setup = (overrides: Partial<Parameters<typeof buildAiPrompt>[0]> = {}) => {
    return buildAiPrompt({
        spreadType: 'three',
        deckType: 'mixed',
        resultMode: 'full',
        drawnCards: threeCardDraw,
        consultationTopic: '仕事の転機',
        ...overrides,
    });
};

describe('buildAiPrompt', () => {
    it('相談内容が空のときは「特になし」と記載する', () => {
        const prompt = setup({ consultationTopic: '   ' });

        expect(prompt).toContain('## 相談内容\n特になし');
    });

    it('スプレッド情報にラベルと枚数付きデッキ名を含む', () => {
        const prompt = setup();

        expect(prompt).toContain('- スプレッド: 3枚引き');
        expect(prompt).toContain('- 使用デッキ: 複合（78枚）');
    });

    it('full モードはカードごとのセクション（###）で構成する', () => {
        const prompt = setup({ resultMode: 'full' });

        expect(prompt).toContain('### 1. 過去');
        expect(prompt).toContain('### 2. 現在');
        expect(prompt).toContain('### 3. これから');
        expect(prompt).toContain('- カード名: カード1 / Card 1');
        expect(prompt).toContain('- 向き: 逆位置');
    });

    it('summary モードは1行リスト形式で構成し、解説の省略を指示する', () => {
        const prompt = setup({ resultMode: 'summary' });

        expect(prompt).toContain('- 1. 過去 / カード1 / 正位置');
        expect(prompt).toContain('- 3. これから / カード3 / 正位置');
        expect(prompt).toContain('省略、または必要最小限');
        expect(prompt).not.toContain('### 1.');
    });

    it('画面表示と同じ position ラベルを使う（future は「これから」）', () => {
        const prompt = setup();

        expect(prompt).not.toContain('未来');
    });
});
