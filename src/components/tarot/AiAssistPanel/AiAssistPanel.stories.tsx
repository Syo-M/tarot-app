import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { AiAssistPanel } from './AiAssistPanel';

const samplePrompt = [
  '# タロット総合鑑定の依頼',
  '',
  '## 相談内容',
  '仕事の転機について',
].join('\n');

const meta = {
  component: AiAssistPanel,
  args: { prompt: samplePrompt },
} satisfies Meta<typeof AiAssistPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ChatGptLinkCarriesPrompt: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /ChatGPTで相談する（新しいタブで開きます）/ });

    await expect(link).toHaveAttribute('href', expect.stringMatching(/^https:\/\/chatgpt\.com\/\?q=/));
    await expect(link).toHaveAttribute('rel', 'noreferrer');
  },
};

export const CopyAnnouncesResult: Story = {
  play: async ({ canvas, step }) => {
    await step('コピー実行で aria-live 領域に結果が通知される', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'プロンプトをコピー' }));

      // 実行環境の clipboard 権限により成功/失敗いずれかのメッセージが出る
      await waitFor(async () => {
        await expect(canvas.getByRole('status')).toHaveTextContent(/コピー(しました|に失敗しました)/);
      });
    });
  },
};
