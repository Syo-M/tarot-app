import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { SpreadSelector } from './SpreadSelector';

const meta = {
  component: SpreadSelector,
  args: {
    spreadType: 'single',
    deckType: 'mixed',
    resultMode: 'full',
    onChangeSpreadType: fn(),
    onChangeDeckType: fn(),
    onChangeResultMode: fn(),
  },
} satisfies Meta<typeof SpreadSelector>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CelticCrossSelected: Story = {
  args: { spreadType: 'celticCross', deckType: 'major', resultMode: 'summary' },
};

export const SelectionState: Story = {
  play: async ({ canvas, step }) => {
    await step('選択中の項目は aria-pressed=true になる', async () => {
      await expect(canvas.getByRole('button', { name: /1枚引き/ })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      await expect(canvas.getByRole('button', { name: /複合/ })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      await expect(canvas.getByRole('button', { name: /3枚引き/ })).toHaveAttribute(
        'aria-pressed',
        'false',
      );
    });
  },
};

export const ChangesSpreadOnClick: Story = {
  play: async ({ canvas, args, step }) => {
    await step('スプレッドを選ぶとその id でコールバックされる', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /ケルト十字/ }));

      await expect(args.onChangeSpreadType).toHaveBeenCalledWith('celticCross');
    });

    await step('デッキを選ぶとその id でコールバックされる', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /大アルカナ/ }));

      await expect(args.onChangeDeckType).toHaveBeenCalledWith('major');
    });

    await step('表示スタイルを選ぶとその値でコールバックされる', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /結果だけを見る/ }));

      await expect(args.onChangeResultMode).toHaveBeenCalledWith('summary');
    });
  },
};
