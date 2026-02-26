import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # iPhone 12 viewport
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        # Increase timeout for dev server
        try:
            await page.goto('http://localhost:3002', timeout=60000, wait_until='networkidle')
        except Exception as e:
            print(f"Error navigating: {e}")

        # Wait a bit more for animations and icon rendering
        await asyncio.sleep(5)

        # Take a screenshot of the logo ticker
        ticker = page.locator('section:has-text("Our trusted partners")')
        if await ticker.count() > 0:
            await ticker.scroll_into_view_if_needed()
            await ticker.screenshot(path='mobile_ticker.png')
            print("Screenshot saved as mobile_ticker.png")

            # Check the width of the motion.div
            width = await page.evaluate('''() => {
                const el = document.querySelector('section:has-text("Our trusted partners") div.w-max');
                return el ? el.getBoundingClientRect().width : 0;
            }''')
            print(f"Ticker motion.div width: {width}px")

            # Check if there are spans inside the ticker
            spans = await page.evaluate('''() => {
                const container = document.querySelector('section:has-text("Our trusted partners") div.w-max');
                return container ? container.querySelectorAll('span').length : 0;
            }''')
            print(f"Number of spans in ticker: {spans}")
        else:
            print("Ticker section not found")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(run())
