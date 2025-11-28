from playwright.sync_api import sync_playwright, expect
import time

def verify_search_feature():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate a desktop viewport
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for hydration
            page.wait_for_timeout(3000)

            print("Opening search overlay...")
            # Click the search button in the header
            # The button contains the Search icon
            page.locator("header button").filter(has=page.locator("svg.lucide-search")).click()

            # Wait for overlay animation
            page.wait_for_timeout(1000)

            print("Verifying overlay elements...")
            # Check for input placeholder
            input_field = page.get_by_placeholder("Поиск товаров...")
            expect(input_field).to_be_visible()

            # Check for Concern Tags
            expect(page.get_by_text("Browse by Concern")).to_be_visible()
            expect(page.get_by_text("Сухая кожа")).to_be_visible()

            # Take screenshot of Empty State (Discovery Mode)
            page.screenshot(path="verification/search_empty_desktop.png")
            print("Screenshot saved: search_empty_desktop.png")

            print("Testing search functionality...")
            # Type into search
            input_field.fill("lamp")

            # Wait for debounce and results
            page.wait_for_timeout(1000)

            # Verify results appear
            # We expect "Professional LED Lamp" or similar from mock data
            expect(page.get_by_text("Professional LED Lamp")).to_be_visible()

            # Take screenshot of Results State
            page.screenshot(path="verification/search_results_desktop.png")
            print("Screenshot saved: search_results_desktop.png")

            # Close search
            page.keyboard.press("Escape")
            page.wait_for_timeout(500)

            # Verify closed
            expect(input_field).not_to_be_visible()
            print("Search closed successfully.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_search_feature()
