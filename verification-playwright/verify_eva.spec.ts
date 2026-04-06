import { test, expect } from '@playwright/test';

test('verify EVA tab image', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Find the Environment Aware tab. It has the text "Environment Aware" initially.
  const evaTab = page.locator('div:has-text("Environment Aware")').last();
  await evaTab.click();

  // Wait for the animation
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'verification/eva_selected.png' });
});
