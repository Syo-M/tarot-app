import type { DrawnCard, SpreadType } from '../types/tarot';
import { getPositionLabel } from '../constants/labels';

const closingSentenceMap: Record<SpreadType, string> = {
    single: 'いま一番気になっていることに意識を向けると、流れをつかみやすくなります。',
    two: '二つの要素を見比べることで、迷いの整理や優先順位の確認がしやすくなります。',
    three: '過去から現在、そしてこれからの流れを見ると、今の選択が次の展開につながっていきます。',
    four: '複数の材料を並べて見ることで、感情と現実の両面から落ち着いて判断しやすくなります。',
    celticCross: '全体を通して見ると、今は状況を丁寧に整理しながら一歩ずつ進めることが大切な流れです。',
};

const buildCardSentence = (drawnCard: DrawnCard): string => {
    const meaning =
        drawnCard.orientation === 'upright' ? drawnCard.card.uprightMeaning : drawnCard.card.reversedMeaning;

    return `${getPositionLabel(drawnCard.position)}には「${drawnCard.card.nameJa}」が出ています。${meaning}`;
};

export const buildReadingSummary = (drawnCards: DrawnCard[], spreadType: SpreadType): string => {
    if (drawnCards.length === 0) {
        return 'まだカードが引かれていません。';
    }

    return drawnCards.map(buildCardSentence).concat(closingSentenceMap[spreadType]).join('\n\n');
};
