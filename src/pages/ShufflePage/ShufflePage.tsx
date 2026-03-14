import { ScreenContainer } from '../../components/common/ScreenContainer/ScreenContainer';
import { ShuffleDeck } from '../../components/tarot/ShuffleDeck/ShuffleDeck';
import { SPREADS } from '../../constants/spreads';
import type { SpreadType } from '../../types/tarot';

interface ShufflePageProps {
  spreadType: SpreadType;
  isShuffling: boolean;
  onComplete: () => void;
}

export const ShufflePage = ({
  spreadType,
  isShuffling,
  onComplete,
}: ShufflePageProps) => {
  const spread = SPREADS.find((item) => item.key === spreadType);

  return (
    <ScreenContainer
      title="Shuffling the deck"
      description="カードを整え、今回のスプレッドに必要な枚数を引いています。"
    >
      <ShuffleDeck
        drawCount={spread?.drawCount ?? 1}
        onComplete={onComplete}
        isShuffling={isShuffling}
      />
    </ScreenContainer>
  );
};
