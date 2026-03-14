import { AiPromptPanel } from '../../components/tarot/AiPromptPanel/AiPromptPanel';
import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { ResultCard } from '../../components/tarot/ResultCard/ResultCard';
import { DECKS, SPREADS } from '../../constants/spreads';
import type { DrawnCard, ReadingOptions } from '../../types/tarot';
import styles from './ResultPage.module.css';

interface ResultPageProps {
  readingOptions: ReadingOptions;
  drawnCards: DrawnCard[];
  onRedraw: () => void;
  onReset: () => void;
}

export const ResultPage = ({
  readingOptions,
  drawnCards,
  onRedraw,
  onReset,
}: ResultPageProps) => {
  const spread = SPREADS.find((item) => item.key === readingOptions.spreadType);
  const deck = DECKS.find((item) => item.key === readingOptions.deckType);

  return (
    <ScreenContainer
      title="Reading Result"
      description={`${spread?.name ?? ''} / ${deck?.name ?? ''} の結果です。カードごとの意味と、AI用の総合鑑定テキストを確認できます。`}
    >
      <div className={styles.layout}>
        <section className={styles.summary}>
          <div className={styles.summaryCard}>
            <span>スプレッド</span>
            <strong>{spread?.name}</strong>
          </div>
          <div className={styles.summaryCard}>
            <span>デッキ</span>
            <strong>{deck?.name}</strong>
          </div>
          <div className={styles.summaryCard}>
            <span>相談内容</span>
            <strong>
              {readingOptions.question.trim().length > 0
                ? readingOptions.question.trim()
                : '未入力（現在の流れの総合鑑定）'}
            </strong>
          </div>
        </section>

        <section className={styles.results}>
          {drawnCards.map((drawnCard) => (
            <ResultCard key={`${drawnCard.card.id}-${drawnCard.position}`} drawnCard={drawnCard} />
          ))}
        </section>

        <AiPromptPanel options={readingOptions} drawnCards={drawnCards} />

        <div className={styles.actions}>
          <PrimaryButton onClick={onRedraw}>もう一度占う</PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onReset}>
            トップへ戻る
          </PrimaryButton>
        </div>
      </div>
    </ScreenContainer>
  );
};
