import type {
    CardPosition,
    DeckDefinition,
    DeckType,
    SpreadDefinition,
    SpreadType,
} from '../types/tarot';

/**
 * デッキ・スプレッド定義の単一情報源。
 * ラベル・説明文・ポジション構成はここだけで管理し、
 * UI（SpreadSelector / ShufflePage）とロジック（drawCards / promptBuilder）が共有する。
 */
const deckDetailMap: Record<DeckType, Omit<DeckDefinition, 'id'>> = {
    major: { label: '大アルカナ', description: '象徴性が強いテーマを見たい時に。', cardCount: 22 },
    minor: {
        label: '小アルカナ',
        description: '日常的な流れや具体的な状況を見たい時に。',
        cardCount: 56,
    },
    mixed: { label: '複合', description: '全体をバランスよく見たい時に。', cardCount: 78 },
};

const spreadPositionsMap: Record<SpreadType, CardPosition[]> = {
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

const spreadDetailMap: Record<SpreadType, { label: string; description: string }> = {
    single: { label: '1枚引き', description: '今のテーマをサクッと知りたい時に。' },
    two: { label: '2枚引き', description: '比較や二つの視点を見たい時に。' },
    three: { label: '3枚引き', description: '過去・現在・これからの流れを見たい時に。' },
    four: { label: '4枚引き', description: '複数の要素を整理して見たい時に。' },
    celticCross: { label: 'ケルト十字', description: 'より詳しく全体像を読みたい時に。' },
};

const deckOrder: DeckType[] = ['major', 'minor', 'mixed'];
const spreadOrder: SpreadType[] = ['single', 'two', 'three', 'four', 'celticCross'];

export const deckDefinitions: DeckDefinition[] = deckOrder.map((id) => ({
    id,
    ...deckDetailMap[id],
}));

export const spreadDefinitions: SpreadDefinition[] = spreadOrder.map((id) => ({
    id,
    ...spreadDetailMap[id],
    cardCount: spreadPositionsMap[id].length,
}));

export const getDeckLabel = (deckType: DeckType): string => deckDetailMap[deckType].label;

export const getDeckLabelWithCount = (deckType: DeckType): string => {
    const { label, cardCount } = deckDetailMap[deckType];
    return `${label}（${cardCount}枚）`;
};

export const getSpreadLabel = (spreadType: SpreadType): string => spreadDetailMap[spreadType].label;

export const getSpreadPositions = (spreadType: SpreadType): CardPosition[] =>
    spreadPositionsMap[spreadType];
