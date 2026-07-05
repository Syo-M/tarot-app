import type { DrawnCard, SpreadType } from '../../../types/tarot';
import { getPositionLabel } from '../../../constants/labels';
import { TarotCardView } from '../TarotCardView/TarotCardView';
import styles from './SpreadLayoutView.module.css';

interface SpreadLayoutViewProps {
  spreadType: SpreadType;
  drawnCards: DrawnCard[];
}

/**
 * 引いたカードをスプレッド本来の並び（3枚引きの時系列、ケルト十字の十字配置など）で
 * 表示する。DOM 順は意味の順（1枚目→n枚目）のまま、視覚配置は grid-area で行う。
 */
export const SpreadLayoutView = ({ spreadType, drawnCards }: SpreadLayoutViewProps) => {
  if (drawnCards.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper} aria-label="カードの配置">
      {/* list-style:none で消える WebKit のリスト意味を role で明示的に復元する */}
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ol className={styles.layout} data-spread={spreadType} role="list">
        {drawnCards.map((drawnCard, index) => (
          <li key={drawnCard.position} className={styles.cell} data-position={drawnCard.position}>
            <span className={styles.positionLabel}>
              {index + 1}. {getPositionLabel(drawnCard.position)}
            </span>
            <div className={styles.cardHolder}>
              <TarotCardView
                card={drawnCard.card}
                orientation={drawnCard.orientation}
                size="sm"
                crossing={drawnCard.position === 'challenge'}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
