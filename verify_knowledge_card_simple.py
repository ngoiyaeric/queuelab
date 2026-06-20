from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            page.goto("http://localhost:3000/demo/knowledge-card")
            page.wait_for_selector("text=Global Supply Chain Resilience", timeout=10000)
            page.screenshot(path="knowledge-card-front.png")
            print("Captured front face")

            page.click("text=Global Supply Chain Resilience")
            time.sleep(1)

            page.wait_for_selector("text=Cost", timeout=10000)
            page.screenshot(path="knowledge-card-back.png")
            print("Captured back face")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
