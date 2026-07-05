import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { getSpreadPositions } from '../../../constants/spreads';
import { tarotCards } from '../../../data/tarotCards';
import type { DrawnCard, SpreadType } from '../../../types/tarot';
import { SpreadLayoutView } from './SpreadLayoutView';

// ストーリーは決定的に: 実データ先頭から順に、交互の向きで割り当てる
const buildDrawnCards = (spreadType: SpreadType): DrawnCard[] =>
  getSpreadPositions(spreadType).map((position, index) => {
    const card = tarotCards[index];
    if (card === undefined) {
      throw new Error('fixture: tarotCards が不足しています');
    }

    return { card, orientation: index % 2 === 0 ? 'upright' : 'reversed', position };
  });

const meta = {
  component: SpreadLayoutView,
  args: {
    spreadType: 'three',
    drawnCards: buildDrawnCards('three'),
  },
} satisfies Meta<typeof SpreadLayoutView>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeCards: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);

    // 公開演出（順次リビール）が完了してから可視状態を検証する
    await waitFor(
      async () => {
        await expect(canvas.getByText('1. 過去')).toBeVisible();
        await expect(canvas.getByText('3. これから')).toBeVisible();
      },
      { timeout: 3000 },
    );
  },
};

export const Single: Story = {
  args: { spreadType: 'single', drawnCards: buildDrawnCards('single') },
};

export const TwoCards: Story = {
  args: { spreadType: 'two', drawnCards: buildDrawnCards('two') },
};

export const FourCards: Story = {
  args: { spreadType: 'four', drawnCards: buildDrawnCards('four') },
};

export const CelticCross: Story = {
  args: { spreadType: 'celticCross', drawnCards: buildDrawnCards('celticCross') },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')).toHaveLength(10);

    // 10枚目のリビール完了（約1.8秒）まで自動リトライで待つ
    await waitFor(
      async () => {
        await expect(canvas.getByText('2. 障害')).toBeVisible();
        await expect(canvas.getByText('10. 最終結果')).toBeVisible();
      },
      { timeout: 4000 },
    );
  },
};

export const Empty: Story = {
  args: { drawnCards: [] },
};
