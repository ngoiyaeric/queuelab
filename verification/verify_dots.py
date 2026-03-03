from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000", timeout=60000)

        # Wait for the page to load, but don't click the sphere.
        # This way we can see the initial state with the rotating dots.
        time.sleep(2)
        page.screenshot(path="verification/screenshot-dots.png")

        browser.close()

if __name__ == "__main__":
    run()
