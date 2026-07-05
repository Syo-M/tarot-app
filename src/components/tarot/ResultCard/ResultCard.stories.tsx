import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { tarotCards } from '../../../data/tarotCards';
import type { TarotCard } from '../../../types/tarot';
import { ResultCard } from './ResultCard';

// 実データの先頭カード（愚者）を使用。存在は data の構造上保証される
const sampleCard: TarotCard = tarotCards[0] ?? {
  id: 0,
  nameJa: '愚者',
  nameEn: 'The Fool',
  image: '',
  uprightMeaning: '自由と新しい始まり。',
  reversedMeaning: '無計画さへの注意。',
  keywords: ['自由', '始まり'],
  arcana: 'major',
};

const meta = {
  component: ResultCard,
  args: {
    drawnCard: { card: sampleCard, orientation: 'upright', position: 'single' },
  },
} satisfies Meta<typeof ResultCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Upright: Story = {
  play: async ({ canvas }) => {
    // 向きラベルはメタ行とカードキャプションの2箇所に表示される
    await expect(canvas.getAllByText(/正位置/)).toHaveLength(2);
    await expect(canvas.getByRole('heading', { name: sampleCard.nameJa })).toBeVisible();
    await expect(canvas.getByText(sampleCard.uprightMeaning)).toBeVisible();
  },
};

export const Reversed: Story = {
  args: {
    drawnCard: { card: sampleCard, orientation: 'reversed', position: 'single' },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText(/逆位置/)).toHaveLength(2);
    await expect(canvas.getByText(sampleCard.reversedMeaning)).toBeVisible();
  },
};

export const CelticCrossPosition: Story = {
  args: {
    drawnCard: { card: sampleCard, orientation: 'upright', position: 'hopesFears' },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/希望と不安/)).toBeVisible();
  },
};
