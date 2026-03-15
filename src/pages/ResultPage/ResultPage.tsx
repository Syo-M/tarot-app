import { useMemo, useState } from 'react';
import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { AiAssistPanel } from '../../components/tarot/AiAssistPanel/AiAssistPanel';
import { ResultCard } from '../../components/tarot/ResultCard/ResultCard';
import { ResultSummary } from '../../components/tarot/ResultSummary/ResultSummary';
import type { DeckType, DrawnCard, ResultMode, SpreadType } from '../../types/tarot';
import { buildAiPrompt } from '../../utils/promptBuilder';
import { buildReadingSummary } from '../../utils/readingSummary';
import styles from './ResultPage.module.css';

interface ResultPageProps {
    spreadType: SpreadType;
    deckType: DeckType;
    drawnCards: DrawnCard[];
    resultMode: ResultMode;
    consultationTopic: string;
    onRetry: () => void;
    onBackHome: () => void;
}

export const ResultPage = ({
    spreadType,
    deckType,
    drawnCards,
    resultMode,
    consultationTopic,
    onRetry,
    onBackHome,
}: ResultPageProps) => {
    const [isDetailOpen, setIsDetailOpen] = useState(resultMode === 'full');

    const summary = useMemo(() => buildReadingSummary(drawnCards, spreadType), [drawnCards, spreadType]);

    const prompt = useMemo(
        () =>
            buildAiPrompt({
                spreadType,
                deckType,
                resultMode,
                drawnCards,
                summary,
                consultationTopic,
            }),
        [spreadType, deckType, resultMode, drawnCards, summary, consultationTopic],
    );

    const detailLabel = isDetailOpen ? 'カードの詳細を閉じる' : 'カードの詳細を見る';
    const isThreeCard = spreadType === 'three';

    return (
        <ScreenContainer title="占い結果" subtitle="まずは全体の流れを見て、必要ならカードごとの意味も確認できます。">
            <div className={styles.page}>
                <ResultSummary summary={summary} resultMode={resultMode} />

                <AiAssistPanel prompt={prompt} />

                <div className={styles.buttonRow}>
                    <PrimaryButton onClick={onRetry}>もう一度占う</PrimaryButton>
                    <PrimaryButton variant="secondary" onClick={onBackHome}>
                        トップへ戻る
                    </PrimaryButton>
                </div>

                <div className={styles.detailToggle}>
                    <button
                        type="button"
                        className={styles.detailButton}
                        onClick={() => setIsDetailOpen((prevState) => !prevState)}
                    >
                        {detailLabel}
                    </button>
                </div>

                {isDetailOpen ? (
                    <section className={isThreeCard ? styles.threeCardGrid : styles.cardList}>
                        {drawnCards.map((drawnCard) => (
                            <ResultCard key={`${drawnCard.card.id}-${drawnCard.position}`} drawnCard={drawnCard} />
                        ))}
                    </section>
                ) : null}
            </div>
        </ScreenContainer>
    );
};
