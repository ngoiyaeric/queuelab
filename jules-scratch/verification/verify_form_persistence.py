from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3001/careers")

        # Wait for the form to be visible
        form_locator = page.locator('form')
        expect(form_locator).to_be_visible()

        # Fill out the form
        email_input = page.get_by_label("What is your email address? *")
        email_input.fill("test@example.com")

        identity_radio = page.get_by_label("Engineering")
        identity_radio.check()

        message_textarea = page.get_by_label("Evidence of Exceptional Ability *")
        message_textarea.fill("This is a test message.")

        # Reload the page
        page.reload()

        # Verify that the form data is still present
        email_input = page.get_by_label("What is your email address? *")
        identity_radio = page.get_by_label("Engineering")
        message_textarea = page.get_by_label("Evidence of Exceptional Ability *")

        expect(email_input).to_have_value("test@example.com")
        expect(identity_radio).to_be_checked()
        expect(message_textarea).to_have_value("This is a test message.")

        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
