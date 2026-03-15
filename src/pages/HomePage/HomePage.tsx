import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { SpreadSelector } from '../../components/tarot/SpreadSelector/SpreadSelector';
import type { ResultMode, SpreadType } from '../../types/tarot';
import styles from './HomePage.module.css';

interface HomePageProps {
  spreadType: SpreadType;
  resultMode: ResultMode;
  consultationTopic: string;
  availableCardsCount: number;
  onChangeSpreadType: (spreadType: SpreadType) => void;
  onChangeResultMode: (resultMode: ResultMode) => void;
  onChangeConsultationTopic: (topic: string) => void;
  onStartReading: () => void;
  onStartQuickReading: () => void;
}

export const HomePage = ({
  spreadType,
  resultMode,
  consultationTopic,
  availableCardsCount,
  onChangeSpreadType,
  onChangeResultMode,
  onChangeConsultationTopic,
  onStartReading,
  onStartQuickReading,
}: HomePageProps) => {
  return (
    <ScreenContainer
      title="気軽に占えるタロット"
      subtitle="先に相談内容を入れて、必要なら設定を選び、すぐに占える流れに整えました。"
    >
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>占いたい内容</h2>
          <p>恋愛・仕事・人間関係など、今みてほしいテーマを入れてください。AIに相談する時の文章にも反映されます。</p>
        </div>
        <label className={styles.fieldLabel} htmlFor="consultation-topic">
          相談内容
        </label>
        <textarea
          id="consultation-topic"
          className={styles.textarea}
          value={consultationTopic}
          onChange={(event) => onChangeConsultationTopic(event.target.value)}
          rows={3}
          placeholder="例：仕事 / 恋愛 / 転職 / あの人の気持ち"
        />
      </section>

      <section className={styles.heroCard}>
        <div>
          <p className={styles.kicker}>今すぐ占う</p>
          <h2>迷ったらワンタップで。</h2>
          <p>
            「気軽に占う」は使用するカードと占い方法をランダムで選び、表示スタイルは「結果だけを見る」で始まります。
            細かい設定をしなくても、すぐに占い結果へ進めます。
          </p>
        </div>
        <div className={styles.quickActions}>
          <PrimaryButton fullWidth onClick={onStartQuickReading}>
            気軽に占う
          </PrimaryButton>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>占いをカスタマイズ</h2>
          <p>収録カードは大アルカナ {availableCardsCount} 枚です。</p>
        </div>

        <SpreadSelector
          spreadType={spreadType}
          resultMode={resultMode}
          onChangeSpreadType={onChangeSpreadType}
          onChangeResultMode={onChangeResultMode}
        />

        <div className={styles.bottomCta}>
          <PrimaryButton fullWidth onClick={onStartReading}>
            この設定で占う
          </PrimaryButton>
        </div>
      </section>

      <details className={styles.details}>
        <summary>説明を見る</summary>
        <p>
          1枚引きは「今のテーマ」を見たい時に、3枚引きは「過去・現在・これから」の流れを見たい時に向いています。
          専門的な読み解きよりも、まずは結果を受け取りやすい形を優先しています。
        </p>
      </details>
    </ScreenContainer>
  );
};
