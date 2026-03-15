import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { SpreadSelector } from '../../components/tarot/SpreadSelector/SpreadSelector';
import type { DeckType, ResultMode, SpreadType } from '../../types/tarot';
import styles from './HomePage.module.css';

interface HomePageProps {
  spreadType: SpreadType;
  deckType: DeckType;
  resultMode: ResultMode;
  consultationTopic: string;
  availableCardsCount: number;
  onChangeSpreadType: (spreadType: SpreadType) => void;
  onChangeDeckType: (deckType: DeckType) => void;
  onChangeResultMode: (resultMode: ResultMode) => void;
  onChangeConsultationTopic: (topic: string) => void;
  onStartReading: () => void;
  onStartQuickReading: () => void;
}

export const HomePage = ({
  spreadType,
  deckType,
  resultMode,
  consultationTopic,
  availableCardsCount,
  onChangeSpreadType,
  onChangeDeckType,
  onChangeResultMode,
  onChangeConsultationTopic,
  onStartReading,
  onStartQuickReading,
}: HomePageProps) => {
  return (
    <ScreenContainer
      title="気軽に占えるタロット"
      subtitle="相談内容を先に入れて、必要なら設定を選び、すぐに占える流れに整えました。"
    >
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>占いたい内容</h2>
          <p>恋愛・仕事・人間関係など、今みてほしいテーマを入れてください。ここで入力した内容は、気軽に占う時も、カスタマイズして占う時も結果とAI相談に反映されます。</p>
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
            上で入力した相談内容もそのまま反映されます。
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
          <p>収録カードは現在 {availableCardsCount} 枚です。下の設定を選んで占えます。</p>
        </div>

        <SpreadSelector
          spreadType={spreadType}
          deckType={deckType}
          resultMode={resultMode}
          onChangeSpreadType={onChangeSpreadType}
          onChangeDeckType={onChangeDeckType}
          onChangeResultMode={onChangeResultMode}
        />

        <div className={styles.bottomCta}>
          <PrimaryButton fullWidth onClick={onStartReading}>
            この設定で占う
          </PrimaryButton>
        </div>
      </section>
    </ScreenContainer>
  );
};
