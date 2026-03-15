import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { SpreadSelector } from '../../components/tarot/SpreadSelector/SpreadSelector';
import type { DeckMode, ResultMode, SpreadType } from '../../types/tarot';
import styles from './HomePage.module.css';

interface HomePageProps {
  spreadType: SpreadType;
  deckMode: DeckMode;
  question: string;
  resultMode: ResultMode;
  availableCardsCount: number;
  onChangeSpreadType: (spreadType: SpreadType) => void;
  onChangeDeckMode: (deckMode: DeckMode) => void;
  onChangeQuestion: (question: string) => void;
  onChangeResultMode: (resultMode: ResultMode) => void;
  onStartReading: () => void;
  onStartQuickReading: () => void;
}

export const HomePage = ({
  spreadType,
  deckMode,
  question,
  resultMode,
  availableCardsCount,
  onChangeSpreadType,
  onChangeDeckMode,
  onChangeQuestion,
  onChangeResultMode,
  onStartReading,
  onStartQuickReading,
}: HomePageProps) => {
  return (
    <ScreenContainer
      title="気軽に占えるタロット"
      subtitle="サクッと占う入口を残しつつ、1〜4枚引き・ケルト十字・大アルカナ/小アルカナ/複合も選べる形に戻しています。"
    >
      <section className={styles.heroCard}>
        <div>
          <p className={styles.kicker}>今すぐ占う</p>
          <h2>迷ったらワンタップで。</h2>
          <p>
            「気軽に占う」は大アルカナ1枚引き・結果だけ表示で始まります。設定を細かく選びたい場合は下のカスタマイズから進めてください。
          </p>
        </div>
        <div className={styles.quickActions}>
          <PrimaryButton fullWidth onClick={onStartQuickReading}>
            気軽に占う
          </PrimaryButton>
          <PrimaryButton variant="secondary" fullWidth onClick={onStartReading}>
            この設定で占う
          </PrimaryButton>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>占いをカスタマイズ</h2>
          <p>占いたい内容も入力でき、AI相談用の文章にも自動で反映されます。</p>
        </div>

        <SpreadSelector
          spreadType={spreadType}
          deckMode={deckMode}
          question={question}
          resultMode={resultMode}
          availableCardsCount={availableCardsCount}
          onChangeSpreadType={onChangeSpreadType}
          onChangeDeckMode={onChangeDeckMode}
          onChangeQuestion={onChangeQuestion}
          onChangeResultMode={onChangeResultMode}
        />

        <div className={styles.bottomCta}>
          <PrimaryButton fullWidth onClick={onStartReading}>
            占いを始める
          </PrimaryButton>
        </div>
      </section>

      <details className={styles.details}>
        <summary>説明を見る</summary>
        <p>
          1〜4枚引きとケルト十字から占い方法を選べます。大アルカナは大きなテーマ、小アルカナは日常的な動き、複合は両方を合わせて見たい時に向いています。
        </p>
      </details>
    </ScreenContainer>
  );
};
