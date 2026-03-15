import type { CardOrientation, TarotCard } from '../../../types/tarot';
import styles from './TarotCardView.module.css';

interface TarotCardViewProps {
  card: TarotCard;
  orientation: CardOrientation;
}

export const TarotCardView = ({ card, orientation }: TarotCardViewProps) => {
  return (
    <div className={`${styles.card} ${orientation === 'reversed' ? styles.reversed : ''}`.trim()}>
      <div className={styles.art}>
        <span className={styles.moon}>☾</span>
        <span className={styles.nameEn}>{card.nameEn}</span>
      </div>
      <div className={styles.caption}>
        <strong>{card.nameJa}</strong>
        <span>{orientation === 'upright' ? '正位置' : '逆位置'}</span>
      </div>
    </div>
  );
};
