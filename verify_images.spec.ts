import { test, expect } from '@playwright/test';

test('verify images for Environment Aware and Fluidity Index', async ({ page }) => {
  await page.goto('http://localhost:3002');

  // Wait for the features section to be visible
  await page.waitForSelector('section.py-20');

  // 1. Click Environment Aware tab
  const evaTab = page.locator('div').filter({ hasText: /^Environment Aware$/ }).first();
  await evaTab.click();
  // Wait a bit for animation
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification/eva_tab_active.png' });

  // 2. Click Fluidity Index tab
  const fixTab = page.locator('div').filter({ hasText: /^Fluidity Index$/ }).first();
  await fixTab.click();
  // Wait a bit for animation
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification/fix_tab_active.png' });
});
