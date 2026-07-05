import { expect, test } from '@playwright/test';

test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

test('AIプロンプトのコピーと ChatGPT リンクが機能する', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('相談内容').fill('転職のタイミング');
  await page.getByRole('button', { name: 'この設定で占う' }).click();
  await page.getByRole('button', { name: '結果を見る' }).click();
  await expect(page.getByRole('heading', { name: '占い結果' })).toBeVisible();

  // ChatGPT リンク: chatgpt.com への ?q= 付き URL
  const chatgptLink = page.getByRole('link', { name: 'ChatGPTで相談する' });
  await expect(chatgptLink).toHaveAttribute('href', /^https:\/\/chatgpt\.com\/\?q=/);

  // コピー: aria-live 領域に完了通知が出て、クリップボードにプロンプトが入る
  await page.getByRole('button', { name: 'プロンプトをコピー' }).click();
  await expect(page.getByRole('status')).toHaveText('プロンプトをコピーしました。');

  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText).toContain('# タロット総合鑑定の依頼');
  expect(clipboardText).toContain('転職のタイミング');
});
