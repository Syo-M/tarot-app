import type { DrawnCard } from '../../../types/tarot';
import { getPositionLabel } from '../../../utils/readingSummary';
import { TarotCardView } from '../TarotCardView/TarotCardView';
import styles from './ResultCard.module.css';

interface ResultCardProps {
  drawnCard: DrawnCard;
}

const orientationLabelMap = {
  upright: '正位置',
  reversed: '逆位置',
} as const;

export const ResultCard = ({ drawnCard }: ResultCardProps) => {
  const meaning = drawnCard.orientation === 'upright'
    ? drawnCard.card.uprightMeaning
    : drawnCard.card.reversedMeaning;

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <TarotCardView card={drawnCard.card} orientation={drawnCard.orientation} />
      </div>
      <div className={styles.content}>
        <p className={styles.meta}>
          {getPositionLabel(drawnCard.position)} ・ {orientationLabelMap[drawnCard.orientation]}
        </p>
        <h3 className={styles.title}>{drawnCard.card.nameJa}</h3>
        <p className={styles.subtitle}>{drawnCard.card.nameEn}</p>
        <p className={styles.meaning}>{meaning}</p>
        <ul className={styles.keywords}>
          {drawnCard.card.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};
