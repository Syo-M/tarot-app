import { expect, test } from '@playwright/test';

test('「気軽に占う」はシャッフル後に自動でシンプル表示の結果へ進む', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('相談内容').fill('恋愛について');
  await page.getByRole('button', { name: '気軽に占う' }).click();

  await expect(page.getByRole('heading', { name: 'カードを整えています' })).toBeVisible();

  // 3.2秒の自動送りを待つ（web-first assertion が自動リトライする）
  await expect(page.getByRole('heading', { name: '占い結果' })).toBeVisible({ timeout: 10_000 });

  // summary モードで開始される（シンプル表示バッジ）
  await expect(page.getByText('シンプル表示')).toBeVisible();
  await expect(page.getByRole('heading', { name: '今回のリーディング' })).toBeVisible();
});
