import { useEffect } from 'react';
import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { ShuffleDeck } from '../../components/tarot/ShuffleDeck/ShuffleDeck';
import type { DeckMode, ResultMode, SpreadType } from '../../types/tarot';
import { getSpreadLabel } from '../../utils/readingSummary';
import styles from './ShufflePage.module.css';

interface ShufflePageProps {
    spreadType: SpreadType;
    deckMode: DeckMode;
    resultMode: ResultMode;
    onComplete: () => void;
}

const deckLabelMap = {
    major: '大アルカナ',
    minor: '小アルカナ',
    mixed: '複合',
} as const;

export const ShufflePage = ({ spreadType, deckMode, onComplete }: ShufflePageProps) => {
    useEffect(() => {
        const timerId = window.setTimeout(() => {
            onComplete();
        }, 3200);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [onComplete]);

    const spreadLabel = getSpreadLabel(spreadType);

    return (
        <ScreenContainer
            title="カードを整えています"
            subtitle={`${deckLabelMap[deckMode]}・${spreadLabel} の準備をしています。`}
        >
            <div className={styles.page}>
                <ShuffleDeck spreadLabel={spreadLabel} />
                <div className={styles.actions}>
                    <PrimaryButton onClick={onComplete}>結果を見る</PrimaryButton>
                    <p className={styles.note}>数秒後に自動で結果へ進みます。</p>
                </div>
            </div>
        </ScreenContainer>
    );
};
