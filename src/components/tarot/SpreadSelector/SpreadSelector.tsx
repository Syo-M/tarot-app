import type { DeckMode, ResultMode, SpreadType } from '../../../types/tarot';
import styles from './SpreadSelector.module.css';

interface SpreadSelectorProps {
  spreadType: SpreadType;
  deckMode: DeckMode;
  resultMode: ResultMode;
  question: string;
  availableCardsCount: number;
  onChangeSpreadType: (spreadType: SpreadType) => void;
  onChangeDeckMode: (deckMode: DeckMode) => void;
  onChangeResultMode: (resultMode: ResultMode) => void;
  onChangeQuestion: (question: string) => void;
}

const spreadOptions = [
  { value: 'single' as const, title: '1枚引き', description: '今のテーマをサクッと見たい時に。' },
  { value: 'two' as const, title: '2枚引き', description: '二択や相手とのバランスを見たい時に。' },
  { value: 'three' as const, title: '3枚引き', description: '過去・現在・これからの流れを見たい時に。' },
  { value: 'four' as const, title: '4枚引き', description: '複数の視点から整理したい時に。' },
  { value: 'celticCross' as const, title: 'ケルト十字', description: 'じっくり全体像を読みたい時に。' },
];

const deckOptions = [
  { value: 'major' as const, title: '大アルカナのみ', description: '大きな流れやテーマを見やすい構成です。' },
  { value: 'minor' as const, title: '小アルカナのみ', description: '日常的な出来事や現実面を細かく見たい時に。' },
  { value: 'mixed' as const, title: '複合', description: '大アルカナと小アルカナを混ぜて占います。' },
];

const resultModeOptions = [
  { value: 'summary' as const, title: '結果だけ見る', description: '総合結果を先に表示。AI相談用の文面もシンプルになります。' },
  { value: 'full' as const, title: '詳しく見る', description: 'カードごとの意味やキーワードも確認できます。' },
];

export const SpreadSelector = ({
  spreadType,
  deckMode,
  resultMode,
  question,
  availableCardsCount,
  onChangeSpreadType,
  onChangeDeckMode,
  onChangeResultMode,
  onChangeQuestion,
}: SpreadSelectorProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.label}>占いたい内容</p>
        <textarea
          className={styles.textarea}
          placeholder="恋愛、仕事、人間関係など、占いたい内容を入力してください"
          value={question}
          onChange={(event) => onChangeQuestion(event.target.value)}
        />
      </div>

      <div>
        <div className={styles.rowHeader}>
          <p className={styles.label}>使用するカード</p>
          <p className={styles.helper}>現在選択中: {availableCardsCount} 枚</p>
        </div>
        <div className={styles.gridThree}>
          {deckOptions.map((option) => {
            const isSelected = deckMode === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.card} ${isSelected ? styles.selected : ''}`.trim()}
                onClick={() => onChangeDeckMode(option.value)}
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
        <div className={styles.gridThree}>
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
