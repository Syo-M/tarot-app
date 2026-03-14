import type { DrawnCard } from '../../types/tarot';
import { TarotCardView } from '../TarotCardView/TarotCardView';
import styles from './ResultCard.module.css';

interface ResultCardProps {
  drawnCard: DrawnCard;
}

export const ResultCard = ({ drawnCard }: ResultCardProps) => {
  const meaning =
    drawnCard.orientation === 'upright'
      ? drawnCard.card.uprightMeaning
      : drawnCard.card.reversedMeaning;

  return (
    <article className={styles.card}>
      <div className={styles.visualArea}>
        <span className={styles.positionBadge}>{drawnCard.label}</span>
        <TarotCardView drawnCard={drawnCard} />
      </div>

      <div className={styles.body}>
        <div className={styles.names}>
          <h3>{drawnCard.card.nameJa}</h3>
          <p>{drawnCard.card.nameEn}</p>
        </div>

        <dl className={styles.meta}>
          <div>
            <dt>向き</dt>
            <dd>{drawnCard.orientation === 'upright' ? '正位置' : '逆位置'}</dd>
          </div>
          <div>
            <dt>分類</dt>
            <dd>{drawnCard.card.arcana === 'major' ? '大アルカナ' : '小アルカナ'}</dd>
          </div>
          <div>
            <dt>キーワード</dt>
            <dd>{drawnCard.card.keywords.join(' / ')}</dd>
          </div>
        </dl>

        <p className={styles.meaning}>{meaning}</p>
      </div>
    </article>
  );
};
