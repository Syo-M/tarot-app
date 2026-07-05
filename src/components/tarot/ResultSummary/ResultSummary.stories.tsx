import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ResultSummary } from './ResultSummary';

const sampleSummary = [
  '過去には「ソードの4」が出ています。守りに入りすぎて動きづらい時。',
  '現在には「星」が出ています。希望が見えてくる時期です。',
  'これからには「太陽」が出ています。物事が明るく展開していきます。',
  '過去から現在、そしてこれからの流れを見ると、今の選択が次の展開につながっていきます。',
].join('\n\n');

const meta = {
  component: ResultSummary,
  args: {
    summary: sampleSummary,
    resultMode: 'full',
  },
} satisfies Meta<typeof ResultSummary>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FullMode: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('総合結果')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: '今回のリーディング' })).toBeVisible();
  },
};

export const SummaryMode: Story = {
  args: { resultMode: 'summary' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('シンプル表示')).toBeVisible();
  },
};

export const EmptyReading: Story = {
  args: { summary: 'まだカードが引かれていません。' },
};
