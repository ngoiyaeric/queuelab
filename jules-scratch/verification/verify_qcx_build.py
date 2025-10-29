from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000")

    # Click the sphere to trigger the animation
    page.click('[data-testid="sphere"]', force=True)

    # Wait for the new section to be visible
    page.wait_for_selector('#qcx-build')

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
