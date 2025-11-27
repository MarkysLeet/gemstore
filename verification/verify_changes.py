from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport for hero video test
        context_mobile = browser.new_context(viewport={"width": 390, "height": 844})
        page_mobile = context_mobile.new_page()

        # Desktop viewport for other tests
        context_desktop = browser.new_context(viewport={"width": 1920, "height": 1080})
        page_desktop = context_desktop.new_page()

        try:
            # 1. Verify Home Page "White on White" fix
            print("Navigating to Home Page (Desktop)...")
            page_desktop.goto("http://localhost:3000")
            page_desktop.wait_for_load_state("networkidle")

            # Scroll down to "New Arrivals" to see text color
            page_desktop.evaluate("window.scrollBy(0, 800)")
            page_desktop.wait_for_timeout(1000)
            page_desktop.screenshot(path="verification/home_desktop.png")
            print("Captured home_desktop.png")

            # 2. Verify Contacts Page Padding
            print("Navigating to Contacts Page...")
            page_desktop.goto("http://localhost:3000/contacts")
            page_desktop.wait_for_load_state("networkidle")
            page_desktop.screenshot(path="verification/contacts_padding.png")
            print("Captured contacts_padding.png")

            # 3. Verify Shop Page Padding (Header Overlap)
            print("Navigating to Shop Page...")
            page_desktop.goto("http://localhost:3000/shop")
            page_desktop.wait_for_load_state("networkidle")
            page_desktop.screenshot(path="verification/shop_padding.png")
            print("Captured shop_padding.png")

            # 4. Verify Mobile Hero Video Scaling
            print("Navigating to Home Page (Mobile)...")
            page_mobile.goto("http://localhost:3000")
            page_mobile.wait_for_load_state("networkidle")
            # Wait a bit for iframe to load/render
            page_mobile.wait_for_timeout(2000)
            page_mobile.screenshot(path="verification/home_mobile_hero.png")
            print("Captured home_mobile_hero.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
