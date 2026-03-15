import styles from './ShuffleDeck.module.css';

interface ShuffleDeckProps {
  spreadLabel: string;
}

export const ShuffleDeck = ({ spreadLabel }: ShuffleDeckProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards} aria-hidden="true">
        <span className={styles.card} />
        <span className={styles.card} />
        <span className={styles.card} />
      </div>
      <p className={styles.text}>{spreadLabel} を静かに展開しています…</p>
    </div>
  );
};
