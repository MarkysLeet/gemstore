from playwright.sync_api import sync_playwright

def verify_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for the server to be ready
            page.goto("http://localhost:3000", timeout=30000)

            # Wait for Hero text to be visible (Digital Perfection)
            page.wait_for_selector('text=DIGITAL', timeout=10000)
            page.wait_for_selector('text=PERFECTION', timeout=10000)

            # Take screenshot of Hero Section
            page.screenshot(path="verification/hero.png")

            # Scroll to Product Grid
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            page.wait_for_timeout(1000) # Wait for animation
            page.screenshot(path="verification/products.png")

            # Scroll to Bottom
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/footer.png")

            print("Screenshots taken successfully")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_homepage()
