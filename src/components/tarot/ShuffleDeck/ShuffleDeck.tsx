import type { CSSProperties } from 'react';
import { useEffect } from 'react';
import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import styles from './ShuffleDeck.module.css';

interface ShuffleDeckProps {
  drawCount: number;
  onComplete: () => void;
  isShuffling: boolean;
}

export const ShuffleDeck = ({
  drawCount,
  onComplete,
  isShuffling,
}: ShuffleDeckProps) => {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.stage} aria-hidden="true">
        {Array.from({ length: Math.min(drawCount + 2, 6) }).map((_, index) => (
          <div
            key={`deck-card-${index}`}
            className={styles.cardBack}
            style={{ ['--index' as '--index']: index } as CSSProperties}
          />
        ))}
      </div>

      <div className={styles.textArea}>
        <p className={styles.label}>Shuffling...</p>
        <h2>カードの気配を整えています</h2>
        <p>
          {isShuffling
            ? '静かな呼吸で数秒お待ちください。自動で結果画面へ進みます。'
            : '結果を表示できます。'}
        </p>
      </div>

      <PrimaryButton fullWidth onClick={onComplete}>
        すぐに結果を見る
      </PrimaryButton>
    </div>
  );
};
