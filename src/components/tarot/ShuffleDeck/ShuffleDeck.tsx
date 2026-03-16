import styles from './ShuffleDeck.module.css';

interface ShuffleDeckProps {
  spreadLabel: string;
}

const deckCards = Array.from({ length: 7 }, (_, index) => index);

export const ShuffleDeck = ({ spreadLabel }: ShuffleDeckProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.cards}>
          {deckCards.map((cardIndex) => (
            <div
              key={cardIndex}
              className={styles.card}
              style={{ ['--index' as string]: cardIndex } as React.CSSProperties}
            >
              <span className={styles.cardInner} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.title}>カードをシャッフルしています…</p>
        <p className={styles.text}>{spreadLabel} を静かに展開しています。</p>
      </div>
    </div>
  );
};
