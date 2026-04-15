import asyncio
from playwright.async_api import async_playwright

async def take_screenshot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        await page.goto("http://localhost:3004/", wait_until="load", timeout=60000)

        await page.screenshot(path="screenshot-button.png")

        # We need to evaluate JS to bypass the text element blocking the click
        await page.evaluate("""() => {
           const sphere = document.querySelector('[data-testid="sphere"]');
           if (sphere) sphere.click();
        }""")

        await asyncio.sleep(2)
        await page.screenshot(path="screenshot-map.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(take_screenshot())
