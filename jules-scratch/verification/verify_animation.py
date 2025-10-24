from playwright.sync_api import sync_playwright, TimeoutError

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")

            # Wait for the sphere to be visible and enabled before clicking
            sphere_selector = "[data-testid='sphere']"
            page.wait_for_selector(sphere_selector, state='visible')
            page.click(sphere_selector, force=True)

            # Wait for the animation to appear
            page.wait_for_selector("svg", state='visible')

            # Take a screenshot of the animation
            page.screenshot(path="jules-scratch/verification/verification.png")
            print("Screenshot saved to jules-scratch/verification/verification.png")

        except TimeoutError as e:
            print(f"Playwright script failed with a timeout error: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
            print("Error screenshot saved to jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
