import { useEffect } from 'react';
import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { ShuffleDeck } from '../../components/tarot/ShuffleDeck/ShuffleDeck';
import type { DeckType, SpreadType } from '../../types/tarot';
import { getDeckLabel, getSpreadLabel } from '../../constants/spreads';
import styles from './ShufflePage.module.css';

interface ShufflePageProps {
    spreadType: SpreadType;
    deckType: DeckType;
    onComplete: () => void;
}

export const ShufflePage = ({ spreadType, deckType, onComplete }: ShufflePageProps) => {
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
            subtitle={`${getDeckLabel(deckType)}・${spreadLabel} の準備をしています。`}
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
