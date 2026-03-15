import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { PrimaryButton } from '../../components/common/PrimaryButton/PrimaryButton';
import { SpreadSelector } from '../../components/tarot/SpreadSelector/SpreadSelector';
import type { DeckType, SpreadType } from '../../types/tarot';
import styles from './HomePage.module.css';

interface HomePageProps {
    spreadType: SpreadType;
    deckType: DeckType;
    question: string;
    availableCardsCount: number;
    onSpreadChange: (spreadType: SpreadType) => void;
    onDeckChange: (deckType: DeckType) => void;
    onQuestionChange: (question: string) => void;
    onStart: () => void;
}

export const HomePage = ({
    spreadType,
    deckType,
    question,
    // availableCardsCount,
    onSpreadChange,
    onDeckChange,
    onQuestionChange,
    onStart,
}: HomePageProps) => {
    return (
        <ScreenContainer
            title="Moonlit Tarot"
            description="スマホで気軽に使える、静かで少し幻想的なタロット占いアプリです。占い方とデッキ構成を選び、結果を AI に相談するための Markdown まで生成できます。"
        >
            <div className={styles.layout}>
                <section className={styles.hero}>
                    <div className={styles.kicker}>Tarot Reading App</div>
                    <h2>1枚引きからケルト十字まで、流れに合った占い方を。</h2>
                    <p>
                        現在のアプリでは、1枚引き / 2枚引き / 3枚引き / 4枚引き / ケルト十字に対応。
                        さらに、大アルカナのみ・小アルカナのみ・全78枚の複合から選べます。
                    </p>

                    {/* <div className={styles.stats}>
            <div>
              <strong>{availableCardsCount}</strong>
              <span>選択中デッキの枚数</span>
            </div>
            <div>
              <strong>AI Prompt</strong>
              <span>Markdown 生成に対応</span>
            </div>
          </div> */}

                    <label className={styles.questionField}>
                        <span>相談内容（任意）</span>
                        <textarea
                            value={question}
                            onChange={(event) => onQuestionChange(event.target.value)}
                            placeholder="恋愛、仕事、人間関係、今日の流れなど。未入力でも占えます。"
                        />
                    </label>

                    <PrimaryButton fullWidth onClick={onStart}>
                        占いを始める
                    </PrimaryButton>
                </section>

                <SpreadSelector
                    spreadType={spreadType}
                    deckType={deckType}
                    onSpreadChange={onSpreadChange}
                    onDeckChange={onDeckChange}
                />
            </div>
        </ScreenContainer>
    );
};
