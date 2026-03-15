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

export const ShufflePage = ({ spreadType, deckMode, resultMode, onComplete }: ShufflePageProps) => {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [onComplete]);

  const spreadLabel = getSpreadLabel(spreadType);

  return (
    <ScreenContainer
      title="カードを展開しています"
      subtitle={`${deckLabelMap[deckMode]} / ${spreadLabel} / ${resultMode === 'summary' ? '結果だけ表示' : '詳しく表示'} で準備しています。`}
      footer={
        <PrimaryButton fullWidth onClick={onComplete}>
          結果を見る
        </PrimaryButton>
      }
    >
      <div className={styles.body}>
        <ShuffleDeck spreadLabel={spreadLabel} />
        <p>数秒後に自動で結果へ進みます。</p>
      </div>
    </ScreenContainer>
  );
};
