from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/login", timeout=60000)

        # Take screenshot of whatever is there
        time.sleep(2)
        page.screenshot(path="verification/screenshot-login4.png")

        browser.close()

if __name__ == "__main__":
    run()
