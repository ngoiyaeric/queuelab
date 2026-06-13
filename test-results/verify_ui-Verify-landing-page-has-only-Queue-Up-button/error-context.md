# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verify_ui.spec.ts >> Verify landing page has only Queue Up button
- Location: verify_ui.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('Verify landing page has only Queue Up button', async ({ page }) => {
> 4  |   await page.goto('http://localhost:3000');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  5  |
  6  |   // Wait for the header to be visible
  7  |   await page.waitForSelector('header');
  8  |
  9  |   // Check for "Queue Up" button
  10 |   const queueUpButtons = page.getByText('Queue Up');
  11 |   await expect(queueUpButtons.first()).toBeVisible();
  12 |
  13 |   // Ensure "Sign In" button is NOT visible in the desktop header
  14 |   // (It was previously a separate button)
  15 |   const signInButton = page.getByRole('button', { name: 'Sign In', exact: true });
  16 |   await expect(signInButton).not.toBeVisible();
  17 |
  18 |   await page.screenshot({ path: 'landing_page.png', fullPage: true });
  19 | });
  20 |
  21 | test('Verify onboarding page layout', async ({ page }) => {
  22 |   // We can't easily mock auth for Clerk here without deep integration,
  23 |   // but we can check if the page exists and redirects correctly or shows content if we bypass middleware for testing.
  24 |   // However, I'll just check if it renders the UI correctly if we visit it (it should redirect if not logged in, but let's see).
  25 |   await page.goto('http://localhost:3000/onboarding');
  26 |
  27 |   // It will likely redirect to Clerk login if middleware is working.
  28 |   await page.waitForTimeout(2000);
  29 |   console.log('Current URL:', page.url());
  30 |   await page.screenshot({ path: 'onboarding_redirect.png' });
  31 | });
  32 |
```