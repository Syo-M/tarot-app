import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// 画面フェードイン等の演出途中に axe が走ると、薄い opacity のまま
// コントラストが計測されてしまう。有限アニメーションを完了させてから検査する
// （シャッフルの無限ループ演出はテキストを含まないため対象外）。
const settleAnimations = async (page: Page) => {
  await page.evaluate(() => {
    document.getAnimations().forEach((animation) => {
      const timing = animation.effect?.getComputedTiming();
      if (timing && Number.isFinite(Number(timing.endTime))) {
        animation.finish();
      }
    });
  });
};

const expectNoSeriousViolations = async (page: Page) => {
  await settleAnimations(page);

  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(
    serious,
    serious.map((violation) => `${violation.id}: ${violation.description}`).join('\n'),
  ).toEqual([]);
};

test('ホーム画面に serious/critical の axe violation がない', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /生成AI連携型タロット占い/ })).toBeVisible();

  await expectNoSeriousViolations(page);
});

test('シャッフル画面と結果画面に serious/critical の axe violation がない', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'この設定で占う' }).click();

  await expect(page.getByRole('heading', { name: 'カードを整えています' })).toBeVisible();
  await expectNoSeriousViolations(page);

  await page.getByRole('button', { name: '結果を見る' }).click();
  await expect(page.getByRole('heading', { name: '占い結果' })).toBeVisible();
  await expectNoSeriousViolations(page);
});

test('画面遷移時に見出しへフォーカスが移動する', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'この設定で占う' }).click();

  await expect(page.getByRole('heading', { name: 'カードを整えています' })).toBeFocused();

  await page.getByRole('button', { name: '結果を見る' }).click();
  await expect(page.getByRole('heading', { name: '占い結果' })).toBeFocused();
});

test('キーボードだけで占い開始まで操作できる', async ({ page }) => {
  await page.goto('/');

  // Tab で textarea に到達して入力できる
  await page.getByLabel('相談内容').focus();
  await page.keyboard.type('人間関係');

  // Enter でボタンを実行できる（実ボタン要素であることの検証）
  await page.getByRole('button', { name: '気軽に占う' }).focus();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('heading', { name: 'カードを整えています' })).toBeVisible();
});
