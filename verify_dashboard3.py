from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to dashboard directly to test bypass...")
            page.goto("http://localhost:3000/dashboard", timeout=60000)

            # Print page content to debug why "Welcome Back" wasn't found
            time.sleep(5)
            print("Page title:", page.title())

            # Take a screenshot to show you what it looks like
            print("Taking screenshot...")
            page.screenshot(path="dashboard_look.png", full_page=True)
            print("Screenshot saved to dashboard_look.png")

        except Exception as e:
            print(f"Error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
