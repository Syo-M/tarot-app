import type { CardOrientation, TarotCard } from '../../../types/tarot';
import styles from './TarotCardView.module.css';

interface TarotCardViewProps {
  card: TarotCard;
  orientation: CardOrientation;
  /** sm はスプレッド配置ビューなど小さく敷き詰める用途 */
  size?: 'md' | 'sm';
  /** ケルト十字の「障害」のように横向きに重ねる表現（絵柄のみ回転） */
  crossing?: boolean;
}

export const TarotCardView = ({
  card,
  orientation,
  size = 'md',
  crossing = false,
}: TarotCardViewProps) => {
  return (
    <div
      className={`${styles.card} ${orientation === 'reversed' ? styles.reversed : ''}`.trim()}
      data-size={size}
      data-crossing={crossing}
    >
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
