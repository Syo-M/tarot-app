import { useMemo, useState } from 'react';
import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { AiAssistPanel } from '../../components/tarot/AiAssistPanel/AiAssistPanel';
import { ResultCard } from '../../components/tarot/ResultCard/ResultCard';
import { ResultSummary } from '../../components/tarot/ResultSummary/ResultSummary';
import type { DeckMode, DrawnCard, ResultMode, SpreadType } from '../../types/tarot';
import { buildAiPrompt } from '../../utils/promptBuilder';
import { buildReadingSummary } from '../../utils/readingSummary';
import styles from './ResultPage.module.css';

interface ResultPageProps {
  spreadType: SpreadType;
  deckMode: DeckMode;
  question: string;
  drawnCards: DrawnCard[];
  resultMode: ResultMode;
  onRetry: () => void;
  onBackHome: () => void;
}

export const ResultPage = ({ spreadType, deckMode, question, drawnCards, resultMode, onRetry, onBackHome }: ResultPageProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(resultMode === 'full');

  const summary = useMemo(() => buildReadingSummary(drawnCards, spreadType), [drawnCards, spreadType]);
  const prompt = useMemo(
    () => buildAiPrompt({ spreadType, deckMode, question, resultMode, drawnCards, summary }),
    [spreadType, deckMode, question, resultMode, drawnCards, summary],
  );

  const detailLabel = isDetailOpen ? 'カードの詳細を閉じる' : 'カードの詳細を見る';

  return (
    <ScreenContainer
      title="占い結果"
      subtitle="まずは総合結果、そのあと必要に応じてカードの意味も確認できます。"
      footer={
        <div className={styles.footerButtons}>
          <PrimaryButton fullWidth onClick={onRetry}>
            もう一度占う
          </PrimaryButton>
          <PrimaryButton variant="secondary" fullWidth onClick={onBackHome}>
            トップへ戻る
          </PrimaryButton>
        </div>
      }
    >
      <ResultSummary summary={summary} resultMode={resultMode} />

      <div className={styles.inlineActions}>
        <PrimaryButton variant="secondary" fullWidth onClick={() => setIsDetailOpen((prevState) => !prevState)}>
          {detailLabel}
        </PrimaryButton>
      </div>

      {isDetailOpen ? (
        <section className={styles.cardsSection}>
          {drawnCards.map((drawnCard) => (
            <ResultCard key={`${drawnCard.position}-${drawnCard.card.id}`} drawnCard={drawnCard} />
          ))}
        </section>
      ) : null}

      <AiAssistPanel prompt={prompt} question={question} />
    </ScreenContainer>
  );
};
