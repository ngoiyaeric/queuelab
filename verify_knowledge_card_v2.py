from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to demo page...")
            page.goto("http://localhost:3000/demo/knowledge-card", wait_until="networkidle")
            print(f"Page title: {page.title()}")

            # Check for heading
            heading = page.query_selector("h1")
            if heading:
                print(f"Heading found: {heading.inner_text()}")

            print("Waiting for card title...")
            # Use a more generic selector if text matching fails
            card_title = page.wait_for_selector("h3", timeout=10000)
            if card_title:
                print(f"Card title found: {card_title.inner_text()}")
                page.screenshot(path="knowledge-card-front.png")
                print("Captured front face")

                # Click the card to flip
                card_title.click()
                time.sleep(2) # Wait for animation

                print("Checking for back face content...")
                cost_label = page.wait_for_selector("text=Cost", timeout=10000)
                if cost_label:
                    print("Cost label found on back face")
                    page.screenshot(path="knowledge-card-back.png")
                    print("Captured back face")
            else:
                print("Card title NOT found")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_v2.png")
            with open("page_content.html", "w") as f:
                f.write(page.content())
        finally:
            browser.close()

if __name__ == "__main__":
    run()
