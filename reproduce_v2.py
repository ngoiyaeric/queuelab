
import asyncio
from playwright.async_api import async_playwright
import time

async def reproduce():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Mobile view
        context = await browser.new_context(
            viewport={'width': 375, 'height': 667},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        print("Connecting to dev server...")
        try:
            await page.goto("http://localhost:3001", timeout=60000)
        except Exception as e:
            print(f"Failed to connect: {e}")
            await browser.close()
            return

        print("Waiting for logo ticker...")
        # Wait a bit for the animation to start/run
        await asyncio.sleep(5)

        # Take a screenshot
        await page.screenshot(path="logo_ticker_repro_mobile.png")
        print("Screenshot saved to logo_ticker_repro_mobile.png")

        # Check if logos are present in the DOM
        logos_count = await page.locator(".h-8.w-auto").count()
        print(f"Number of logos found in DOM: {logos_count}")

        # Check bounding box of the first few logos
        for i in range(min(logos_count, 3)):
            bbox = await page.locator(".h-8.w-auto").nth(i).bounding_box()
            print(f"Logo {i} bounding box: {bbox}")

        # Check visibility
        is_visible = await page.locator(".h-8.w-auto").first.is_visible()
        print(f"First logo is_visible: {is_visible}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(reproduce())
