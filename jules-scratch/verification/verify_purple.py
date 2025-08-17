print("Importing playwright")
try:
    from playwright.sync_api import Page, expect
except ImportError:
    print("Playwright is not installed. Please install it with 'pip install playwright'")
    exit(1)
print("Playwright imported")

def test_purple_planet(page: Page):
    print("Running the test")
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:3000")

    # 2. Assert: Confirm the planet is purple.
    # We expect the hero section to have a purple background.
    hero_section = page.locator("div.bg-purple-500")
    expect(hero_section).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")
    print("Screenshot taken")

print("Script is running")
