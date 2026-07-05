import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { PrimaryButton } from './PrimaryButton';

const meta = {
  component: PrimaryButton,
  args: {
    children: '占いをはじめる',
    onClick: fn(),
  },
} satisfies Meta<typeof PrimaryButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'トップへ戻る' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'キャンセル' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const ClickFiresHandler: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: '占いをはじめる' }));

    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const KeyboardOperable: Story = {
  play: async ({ canvas, args, step }) => {
    await step('Tab でフォーカスし Enter で実行できる', async () => {
      await userEvent.tab();

      await expect(canvas.getByRole('button', { name: '占いをはじめる' })).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      await expect(args.onClick).toHaveBeenCalledOnce();
    });
  },
};
