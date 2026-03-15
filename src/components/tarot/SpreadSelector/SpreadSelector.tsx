import type { DeckType, ResultMode, SpreadType } from '../../../types/tarot';
import styles from './SpreadSelector.module.css';

interface SpreadSelectorProps {
  spreadType: SpreadType;
  deckType: DeckType;
  resultMode: ResultMode;
  onChangeSpreadType: (spreadType: SpreadType) => void;
  onChangeDeckType: (deckType: DeckType) => void;
  onChangeResultMode: (resultMode: ResultMode) => void;
}

const deckOptions: Array<{ value: DeckType; title: string; description: string }> = [
  { value: 'major', title: '大アルカナ', description: '象徴性が強いテーマを見たい時に。' },
  { value: 'minor', title: '小アルカナ', description: '日常的な流れや具体的な状況を見たい時に。' },
  { value: 'mixed', title: '複合', description: '全体をバランスよく見たい時に。' },
];

const spreadOptions: Array<{ value: SpreadType; title: string; description: string }> = [
  { value: 'single', title: '1枚引き', description: '今のテーマをサクッと知りたい時に。' },
  { value: 'two', title: '2枚引き', description: '比較や二つの視点を見たい時に。' },
  { value: 'three', title: '3枚引き', description: '過去・現在・これからの流れを見たい時に。' },
  { value: 'four', title: '4枚引き', description: '複数の要素を整理して見たい時に。' },
  { value: 'celticCross', title: 'ケルト十字', description: 'より詳しく全体像を読みたい時に。' },
];

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
          {deckOptions.map((option) => {
            const isSelected = deckType === option.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.card} ${isSelected ? styles.selected : ''}`.trim()}
                onClick={() => onChangeDeckType(option.value)}
                aria-pressed={isSelected}
              >
                <strong>{option.title}</strong>
                <span>{option.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className={styles.label}>占い方法</p>
        <div className={styles.grid}>
          {spreadOptions.map((option) => {
            const isSelected = spreadType === option.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.card} ${isSelected ? styles.selected : ''}`.trim()}
                onClick={() => onChangeSpreadType(option.value)}
                aria-pressed={isSelected}
              >
                <strong>{option.title}</strong>
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
