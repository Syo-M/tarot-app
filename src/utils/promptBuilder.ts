import type { CardPosition, DeckType, DrawnCard, ResultMode, SpreadType } from '../types/tarot';

const orientationLabelMap = {
    upright: '正位置',
    reversed: '逆位置',
} as const;

const spreadLabelMap: Record<SpreadType, string> = {
    single: '1枚引き',
    two: '2枚引き',
    three: '3枚引き',
    four: '4枚引き',
    celticCross: 'ケルト十字',
};

const deckLabelMap: Record<DeckType, string> = {
    major: '大アルカナ（22枚）',
    minor: '小アルカナ（56枚）',
    mixed: '複合（全78枚）',
};

const positionLabelMap: Record<CardPosition, string> = {
    single: '今回のテーマ',
    first: '1枚目',
    second: '2枚目',
    third: '3枚目',
    fourth: '4枚目',
    past: '過去',
    present: '現在',
    future: '未来',
    situation: '現状',
    challenge: '障害',
    conscious: '顕在意識',
    subconscious: '潜在意識',
    pastFoundation: '過去の土台',
    nearFuture: '近未来',
    self: '本人',
    environment: '周囲',
    hopesFears: '希望と不安',
    outcome: '最終結果',
};

const buildCardSection = (drawnCards: DrawnCard[]): string => {
    return drawnCards
        .map((drawnCard, index) => {
            const meaning =
                drawnCard.orientation === 'upright' ? drawnCard.card.uprightMeaning : drawnCard.card.reversedMeaning;

            return [
                `### ${index + 1}. ${positionLabelMap[drawnCard.position]}`,
                `- カード名: ${drawnCard.card.nameJa} / ${drawnCard.card.nameEn}`,
                `- 向き: ${orientationLabelMap[drawnCard.orientation]}`,
                `- キーワード: ${drawnCard.card.keywords.join(' / ')}`,
                `- そのカード単体の意味: ${meaning}`,
            ].join('\n');
        })
        .join('\n\n');
};

export const buildAiPrompt = ({
    spreadType,
    deckType,
    resultMode,
    drawnCards,
    summary,
    consultationTopic,
}: {
    spreadType: SpreadType;
    deckType: DeckType;
    resultMode: ResultMode;
    drawnCards: DrawnCard[];
    summary: string;
    consultationTopic: string;
}): string => {
    const consultation = consultationTopic.trim() || '特になし';

    if (resultMode === 'summary') {
        return [
            '# タロット総合鑑定の依頼',
            '',
            'あなたは落ち着いた口調で、やさしく具体的に解釈するタロット占い師です。',
            '以下の占い結果をもとに、相談内容に対して総合的に鑑定してください。',
            '',
            '## 相談内容',
            consultation,
            '',
            '## 占い結果',
            summary,
            '',
            '## 出力してほしい内容',
            '1. 全体の総合評価',
            '2.相談内容に対する具体的なアドバイス',
            '3.直近で意識すると良い行動を3つ',
            '4.カードの意味とカード同士のつながりの解説',
            '5. 最後にまとめとどうすべきかのメッセージ',
            '',
            '※ 日本語で、わかりやすく、やや神秘的だが過度に断定しない文体でお願いします。',
        ].join('\n');
    }

    return [
        '# タロット総合鑑定の依頼',
        '',
        'あなたは落ち着いた口調で、やさしく具体的に解釈するタロット占い師です。',
        '以下のスプレッド結果をもとに、カード同士の関係性を読み解きながら総合鑑定をしてください。',
        '',
        '## 相談内容',
        consultation,
        '',
        '## スプレッド情報',
        `- スプレッド: ${spreadLabelMap[spreadType]}`,
        `- 使用デッキ: ${deckLabelMap[deckType]}`,
        '',
        '## 引いたカード',
        buildCardSection(drawnCards),
        '',
        '## 出力してほしい内容',
        '1. 全体の総合評価',
        '2.相談内容に対する具体的なアドバイス',
        '3.直近で意識すると良い行動を3つ',
        '4.カードの意味とカード同士のつながりの解説',
        '5. 最後にまとめとどうすべきかのメッセージ',
        '',
        '※ 日本語で、わかりやすく、やや神秘的だが過度に断定しない文体でお願いします。',
    ].join('\n');
};
