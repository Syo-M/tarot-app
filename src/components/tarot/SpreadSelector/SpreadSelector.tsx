import { DECKS, SPREADS } from '../../../constants/spreads';
import type { DeckType, SpreadType } from '../../../types/tarot';
import styles from './SpreadSelector.module.css';

interface SpreadSelectorProps {
    spreadType: SpreadType;
    deckType: DeckType;
    onSpreadChange: (spreadType: SpreadType) => void;
    onDeckChange: (deckType: DeckType) => void;
}

export const SpreadSelector = ({ spreadType, deckType, onSpreadChange, onDeckChange }: SpreadSelectorProps) => {
    return (
        <div className={styles.wrapper}>
            <section className={styles.block}>
                <div className={styles.heading}>
                    <h2>占い方を選ぶ</h2>
                    <p>1枚引きからケルト十字まで、質問の深さに合わせて選べます。</p>
                </div>
                <div className={styles.grid}>
                    {SPREADS.map((spread) => (
                        <button
                            key={spread.key}
                            type="button"
                            className={spreadType === spread.key ? styles.activeCard : styles.card}
                            onClick={() => onSpreadChange(spread.key)}
                        >
                            <strong>{spread.name}</strong>
                            <span>{spread.description}</span>
                            <small>{spread.drawCount}枚使用</small>
                        </button>
                    ))}
                </div>
            </section>

            <section className={styles.block}>
                <div className={styles.heading}>
                    <h2>デッキ種別を選ぶ</h2>
                    <p>大アルカナ・小アルカナ・複合の3種類から選択できます。</p>
                </div>
                <div className={styles.grid}>
                    {DECKS.map((deck) => (
                        <button
                            key={deck.key}
                            type="button"
                            className={deckType === deck.key ? styles.activeCard : styles.card}
                            onClick={() => onDeckChange(deck.key)}
                        >
                            <strong>{deck.name}</strong>
                            <span>{deck.description}</span>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};
