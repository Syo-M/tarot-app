import type { DrawnCard } from '../../types/tarot';
import styles from './TarotCardView.module.css';

interface TarotCardViewProps {
  drawnCard: DrawnCard;
  large?: boolean;
}

export const TarotCardView = ({ drawnCard, large = false }: TarotCardViewProps) => {
  const isReversed = drawnCard.orientation === 'reversed';

  return (
    <div className={large ? styles.largeWrapper : styles.wrapper}>
      <div className={isReversed ? styles.reversedCard : styles.card}>
        <div className={styles.inner}>
          <span className={styles.arcana}>
            {drawnCard.card.arcana === 'major' ? 'Major Arcana' : drawnCard.card.suit}
          </span>
          <strong className={styles.nameJa}>{drawnCard.card.nameJa}</strong>
          <span className={styles.nameEn}>{drawnCard.card.nameEn}</span>
          <span className={styles.separator} />
          <span className={styles.rankLabel}>
            {drawnCard.orientation === 'upright' ? '正位置' : '逆位置'}
          </span>
        </div>
      </div>
    </div>
  );
};
