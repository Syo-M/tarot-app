import type { DeckType, ResultMode, SpreadType } from '../../../types/tarot';
import { deckDefinitions, spreadDefinitions } from '../../../constants/spreads';
import styles from './SpreadSelector.module.css';

interface SpreadSelectorProps {
  spreadType: SpreadType;
  deckType: DeckType;
  resultMode: ResultMode;
  onChangeSpreadType: (spreadType: SpreadType) => void;
  onChangeDeckType: (deckType: DeckType) => void;
  onChangeResultMode: (resultMode: ResultMode) => void;
}

const resultModeOptions: Array<{ value: ResultMode; title: string; description: string }> = [
  { value: 'summary', title: '結果だけを見る', description: '総合結果を先に表示。AI相談用の文面もシンプルになります。' },
  { value: 'full', title: '詳しく見る', description: 'カードごとの意味やキーワードも確認できます。' },
];

export const SpreadSelector = ({
  spreadType,
  deckType,
  resultMode,
  onChangeSpreadType,
  onChangeDeckType,
  onChangeResultMode,
}: SpreadSelectorProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.label}>使用するカード</p>
        <div className={styles.grid}>
          {deckDefinitions.map((option) => {
            const isSelected = deckType === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.card} ${isSelected ? styles.selected : ''}`.trim()}
                onClick={() => onChangeDeckType(option.id)}
                aria-pressed={isSelected}
              >
                <strong>{option.label}</strong>
                <span>{option.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className={styles.label}>占い方法</p>
        <div className={styles.grid}>
          {spreadDefinitions.map((option) => {
            const isSelected = spreadType === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.card} ${isSelected ? styles.selected : ''}`.trim()}
                onClick={() => onChangeSpreadType(option.id)}
                aria-pressed={isSelected}
              >
                <strong>{option.label}</strong>
                <span>{option.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className={styles.label}>表示スタイル</p>
        <div className={styles.grid}>
          {resultModeOptions.map((option) => {
            const isSelected = resultMode === option.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.card} ${isSelected ? styles.selected : ''}`.trim()}
                onClick={() => onChangeResultMode(option.value)}
                aria-pressed={isSelected}
              >
                <strong>{option.title}</strong>
                <span>{option.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
