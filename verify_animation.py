import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:3000")

        # Wait for the h1 to be visible
        await page.wait_for_selector("h1")

        # Click the h1 element
        await page.click("h1")

        # Wait for the animation to complete
        await asyncio.sleep(2)

        await page.screenshot(path="screenshot.png")
        await browser.close()

asyncio.run(main())
