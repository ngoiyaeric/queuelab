import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:3004/blog/fluidity-index")
        # Wait for all animations to complete
        await page.wait_for_timeout(12000)
        await page.screenshot(path="blog_screenshot_final.png")
        await browser.close()

asyncio.run(main())
