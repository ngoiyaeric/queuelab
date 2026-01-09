from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3002", timeout=60000)

    # Scroll to the "Our trusted partners" section
    page.locator("text=Our trusted partners").scroll_into_view_if_needed()

    page.screenshot(path="screenshot.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
