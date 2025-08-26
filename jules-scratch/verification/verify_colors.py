from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Check if the server is running
    try:
        page.goto("http://localhost:3000", timeout=5000)
    except Exception as e:
        print("Could not connect to dev server. Is it running? Trying to read logs...")
        with open("dev_server.log", "r") as f:
            print(f.read())
        raise e

    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
