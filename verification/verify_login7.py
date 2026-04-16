from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/login", timeout=60000)

        # Wait for the page to load
        page.wait_for_selector("text=Queue In", timeout=30000)
        time.sleep(2)
        page.screenshot(path="verification/screenshot-login7.png")

        browser.close()

if __name__ == "__main__":
    run()
