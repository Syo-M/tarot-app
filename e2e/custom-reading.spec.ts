import { expect, test } from '@playwright/test';

test('カスタマイズ設定で占い、詳細カードまで確認できる', async ({ page }) => {
  await page.goto('/');

  // 相談内容を入力し、3枚引き・詳しく見るを選択
  await page.getByLabel('相談内容').fill('仕事の転機について');
  await page.getByRole('button', { name: /3枚引き/ }).click();
  await expect(page.getByRole('button', { name: /3枚引き/ })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /詳しく見る/ }).click();

  await page.getByRole('button', { name: 'この設定で占う' }).click();

  // シャッフル画面（自動送りを待たずスキップ）
  await expect(page.getByRole('heading', { name: 'カードを整えています' })).toBeVisible();
  await page.getByRole('button', { name: '結果を見る' }).click();

  // 結果画面: 総合リーディングと3枚のカード詳細
  await expect(page.getByRole('heading', { name: '占い結果' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '今回のリーディング' })).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(3);

  // 3枚引きの結果には「これから」の位置ラベルが含まれる（画面とプロンプトの統一表記）
  await expect(page.getByText(/これからには「/)).toBeVisible();
});

test('結果画面からトップへ戻れる', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'この設定で占う' }).click();
  await page.getByRole('button', { name: '結果を見る' }).click();
  await page.getByRole('button', { name: 'トップへ戻る' }).click();

  await expect(
    page.getByRole('heading', { name: /生成AI連携型タロット占い/ }),
  ).toBeVisible();
});
