import type { DeckType, DrawnCard, ResultMode, SpreadType } from '../types/tarot';
import { getOrientationLabel, getPositionLabel } from '../constants/labels';
import { getDeckLabelWithCount, getSpreadLabel } from '../constants/spreads';

const buildCompactCardSection = (drawnCards: DrawnCard[]): string => {
    return drawnCards
        .map((drawnCard, index) => {
            return [
                `### ${index + 1}. ${getPositionLabel(drawnCard.position)}`,
                `- カード名: ${drawnCard.card.nameJa} / ${drawnCard.card.nameEn}`,
                `- 向き: ${getOrientationLabel(drawnCard.orientation)}`,
            ].join('\n');
        })
        .join('\n\n');
};

const buildSummaryCardList = (drawnCards: DrawnCard[]): string => {
    return drawnCards
        .map((drawnCard, index) => {
            return `- ${index + 1}. ${getPositionLabel(drawnCard.position)} / ${drawnCard.card.nameJa} / ${getOrientationLabel(drawnCard.orientation)}`;
        })
        .join('\n');
};

export const buildAiPrompt = ({
    spreadType,
    deckType,
    resultMode,
    drawnCards,
    consultationTopic,
}: {
    spreadType: SpreadType;
    deckType: DeckType;
    resultMode: ResultMode;
    drawnCards: DrawnCard[];
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
            '## スプレッド情報',
            `- スプレッド: ${getSpreadLabel(spreadType)}`,
            `- 使用デッキ: ${getDeckLabelWithCount(deckType)}`,
            '',
            '## 占い結果',
            buildSummaryCardList(drawnCards),
            '',
            '## 出力してほしい内容',
            '1. 全体の総合評価',
            '2.相談内容に対する具体的なアドバイス',
            '3.直近で意識すると良い行動を3つ',
            '4.まとめとして、相談者がどうすべきかのメッセージ',
            '5. カードの意味とカード同士のつながりの解説は省略、または必要最小限にしてください',
            '',
            '※ 日本語で、わかりやすく、やや神秘的だが過度に断定しない文体でなるべく端的にお願いします。',
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
        `- スプレッド: ${getSpreadLabel(spreadType)}`,
        `- 使用デッキ: ${getDeckLabelWithCount(deckType)}`,
        '',
        '## 引いたカード',
        buildCompactCardSection(drawnCards),
        '',
        '## 出力してほしい内容',
        '1. 全体の総合評価',
        '2.相談内容に対する具体的なアドバイス',
        '3.直近で意識すると良い行動を3つ',
        '4.まとめとして、相談者がどうすべきかのメッセージ',
        '5. カードの意味とカード同士のつながりの解説',
        '',
        '※ 日本語で、わかりやすく、やや神秘的だが過度に断定しない文体でなるべく端的にお願いします。',
    ].join('\n');
};
